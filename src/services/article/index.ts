import { request } from '@umijs/max';

export default async function getArticleList({
  menuCurrent,
  size,
  target,
}: {
  menuCurrent: string;
  size: number;
  target: number;
}) {
  const articleListData = await request('/api/article/list', {
    params: {
      current: menuCurrent,
      size,
      target,
    },
  });
  // console.log(articleListData);
  return articleListData;
}
