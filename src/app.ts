// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import { RunTimeLayoutConfig } from '@umijs/max';
import { getUserInfo } from './services/user/userController';
import './app.css';

export async function getInitialState(): Promise<{
  name: string;
  avatar: string;
  isLogin: boolean;
}> {
  let userInfo;
  const defaultUserInfo = {
    isLogin: false,
    name: 'Tourist',
    avatar:
      'https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3114521287~100x100.awebp',
  };
  if (localStorage.getItem('token')) {
    const res = await getUserInfo();
    userInfo = { isLogin: true, ...res.data };
  } else {
    userInfo = defaultUserInfo;
  }

  return userInfo;
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    layout: 'top',
    pure: true,
    fixedHeader: true,
    menu: {
      locale: false,
    },
  };
};
