import type { Preview } from '@storybook/react-vite';
import '@styles/index.scss';
import { ThemeRoot } from './ThemeRoot';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, ctx) => (
      <ThemeRoot theme={ctx.globals.theme}>
        <Story />
      </ThemeRoot>
    ),
  ],
};

export default preview;
