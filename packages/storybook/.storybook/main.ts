import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/foundation/src/stories/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/base/src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  typescript: {
    reactDocgen: false,
  },
  viteFinal: async (viteConfig) => {
    try {
      const { vanillaExtractPlugin } = await import(
        '@vanilla-extract/vite-plugin'
      );
      viteConfig.plugins = viteConfig.plugins || [];
      viteConfig.plugins.unshift(vanillaExtractPlugin());
    } catch (err) {
      console.warn(
        'vanilla-extract plugin not available:',
        (err as Error).message,
      );
    }

    // Configure global for browser environment
    viteConfig.define = {
      ...viteConfig.define,
      global: 'globalThis',
    };

    // Configure CSS handling
    viteConfig.css = {
      ...viteConfig.css,
      modules: {
        ...viteConfig.css?.modules,
        localsConvention: 'camelCase',
      },
    };

    return viteConfig;
  },
};

export default config;
