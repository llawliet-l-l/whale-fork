export default {
  '*.{ts,tsx}': (files) => `yarn eslint --fix --quiet ${files.join(' ')}`,
  '*.{ts,tsx,json}': (files) => `yarn prettier --write ${files.join(' ')}`,
};
