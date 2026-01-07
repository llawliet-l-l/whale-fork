import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

export function getRootPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const __root = path.join(__dirname, '..', '..');
  return __root;
}

export async function ensureFilesExist(paths: string[]) {
  for (const filePath of paths) {
    if (!(await fs.pathExists(filePath))) {
      throw new Error(`Missing ${filePath}`);
    }
  }
}

export async function concatAndRemove(
  filePaths: string[],
  destinationPath: string,
) {
  let combined = '';
  for (const filePath of filePaths) {
    if (await fs.pathExists(filePath)) {
      combined += await fs.readFile(filePath, 'utf8');
      await fs.remove(filePath);
    }
  }
  await fs.writeFile(destinationPath, combined);
}
