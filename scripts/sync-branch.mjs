import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Merge one branch into another and push the result — the `next` <-> `main`
 * syncing a release does before and after it publishes.
 *
 *   node scripts/sync-branch.mjs --source next --target main
 *
 * Works from whatever the job happens to have checked out: it fetches both
 * branches itself and switches to `--target`, so the calling job needs no `ref:`
 * on actions/checkout — only `fetch-depth: 0`, so the merge has history, and a
 * token allowed to push. Both branches must already exist on origin; neither is
 * ever created.
 *
 * The merge commit needs a git identity, which the calling job supplies via
 * ./.github/actions/setup-git. This script does not configure git.
 *
 * Deliberately dependency-free — it shells out to git and nothing else, so the
 * sync jobs need only a checkout and node, with no `yarn install` just to
 * perform a merge.
 */

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));

/** @param {...string} args */
const git = (...args) =>
  execFileSync('git', args, { cwd: REPO_ROOT, stdio: 'inherit' });

/**
 * Both branches must already exist on origin — this never creates one.
 *
 * @param {string} branch
 */
function assertRemoteBranch(branch) {
  try {
    execFileSync(
      'git',
      ['ls-remote', '--exit-code', '--heads', 'origin', `refs/heads/${branch}`],
      { cwd: REPO_ROOT },
    );
  } catch {
    throw new Error(`Branch '${branch}' does not exist on origin.`);
  }
}

/**
 * Reads `--source <branch> --target <branch>` in any order.
 *
 * @param {string[]} argv
 * @returns {{ source: string, target: string }}
 */
function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const parsed = {};

  for (let i = 0; i < argv.length; i += 2) {
    const flag = argv[i];
    const value = argv[i + 1];

    if (flag !== '--source' && flag !== '--target') {
      throw new Error(
        `Unknown argument '${flag}'. Usage: --source <branch> --target <branch>`,
      );
    }
    if (!value) {
      throw new Error(`${flag} needs a branch name.`);
    }

    parsed[flag.slice(2)] = value;
  }

  if (!parsed.source || !parsed.target) {
    throw new Error('Both --source and --target are required.');
  }

  // Both keys are guaranteed present by the check above.
  return /** @type {{ source: string, target: string }} */ (parsed);
}

function run() {
  const { source, target } = parseArgs(process.argv.slice(2));

  /*
   * Checked before anything is touched: `git push HEAD:<target>` would happily
   * create a branch that does not exist, so a typo'd --target has to fail here
   * rather than opening a new branch on the remote.
   */
  assertRemoteBranch(source);
  assertRemoteBranch(target);

  /*
   * Explicit refspecs: actions/checkout may leave `origin` configured to fetch a
   * single branch, in which case a bare `git fetch origin` would not create the
   * remote-tracking refs below.
   */
  git(
    'fetch',
    'origin',
    `+refs/heads/${source}:refs/remotes/origin/${source}`,
    `+refs/heads/${target}:refs/remotes/origin/${target}`,
  );

  /*
   * Detached, so no local branch is created either — the merge commit is built
   * on top of the fetched target and pushed straight back to it. `[skip ci]`
   * keeps the resulting push from starting another workflow; syncing `next` at
   * the end of a release would otherwise trigger a prerelease publish.
   */
  git('checkout', '--detach', `refs/remotes/origin/${target}`);
  git(
    'merge',
    '--no-ff',
    `refs/remotes/origin/${source}`,
    '-m',
    `chore: sync ${target} with ${source}`,
    '-m',
    '[skip ci]',
  );
  git('push', 'origin', `HEAD:${target}`);

  console.log(`Synced ${target} with ${source}.`);
}

try {
  run();
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
