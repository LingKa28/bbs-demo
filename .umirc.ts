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
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '编辑',
      path: '/edit',
      component: './Edit',
    },
    {
      name: '详情',
      path: '/detail/:id',
      component: './Detail',
    },
  ],

  npmClient: 'yarn',
  tailwindcss: {},
});
