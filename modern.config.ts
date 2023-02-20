import appTools, { defineConfig } from '@modern-js/app-tools';
import testPlugin from '@modern-js/plugin-testing';

// https://modernjs.dev/docs/apis/app/config
export default defineConfig({
  runtime: {
    router: true,
    state: true,
  },
  plugins: [appTools(), testPlugin()],
});
