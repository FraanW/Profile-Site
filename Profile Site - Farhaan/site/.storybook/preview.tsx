import type { Preview } from '@storybook/nextjs-vite';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      options: {
        bone: { name: 'bone (ground)', value: '#F5F6EE' },
        card: { name: 'card (surface)', value: '#FBFBF5' },
        emerald: { name: 'emerald (statement field)', value: '#065F46' },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  initialGlobals: {
    backgrounds: { value: 'bone' },
  },
};

export default preview;
