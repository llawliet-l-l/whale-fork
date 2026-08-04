export default {
  /** @param {string[]} files */
  '*.{ts,tsx}': (files) => `yarn eslint --fix --quiet ${files.join(' ')}`,
  /** @param {string[]} files */
  '*.{ts,tsx,json}': (files) => `yarn prettier --write ${files.join(' ')}`,
};
