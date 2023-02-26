import { request } from '@umijs/max';

export default async function getArticleList({
  menuCurrent,
  searchQuery,
  size,
  target,
}: {
  menuCurrent: string;
  searchQuery?: string;
  size: number;
  target: number;
}) {
  const articleListData = await request('/api/article/list', {
    params: {
      current: menuCurrent,
      search: searchQuery,
      size,
      target,
    },
  });
  // console.log(articleListData);
  return articleListData;
}
