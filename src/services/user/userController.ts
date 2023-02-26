import { request } from '@umijs/max';

export async function getUserInfo(): Promise<any> {
  return request('/api/user/getUerInfo', {
    method: 'POST',
  });
}

export async function userLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<any> {
  return request('/api/user/login', {
    method: 'POST',
    data: {
      username,
      password,
    },
  });
}
