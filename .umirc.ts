import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'BBS Demo',
    locale: false,
  },
  routes: [
    {
      path: '/',
      component: './Layout',
      routes: [
        {
          path: '/',
          component: './Home',
        },
        {
          path: '/:searchQuery',
          component: './Home',
        },
        {
          path: '/edit',
          component: './Edit',
        },
        {
          path: '/detail/:id',
          component: './Detail',
        },
      ],
    },
  ],

  npmClient: 'yarn',
  tailwindcss: {},
});
