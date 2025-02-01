export default {
    '*.{ts,tsx}': (files) => {
        return `yarn eslint --fix --quiet ${files.join(' ')}`;
    },

    '*.{ts,tsx,json}': (files) => {
        return `yarn prettier --write ${files.join(' ')}`;
    },
};
