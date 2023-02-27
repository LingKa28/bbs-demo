import { request } from '@umijs/max';

export async function getArticleList({
  menuCurrent,
  searchQuery,
  size,
  target,
}: ArticleAPI.PageInfo): Promise<ArticleAPI.Response> {
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

export async function getArticleDetail(
  id: string,
): Promise<ArticleAPI.Response> {
  return request('/api/article/detail', {
    params: { id },
  });
}

export async function getArticleCommentsList(
  id: string,
): Promise<ArticleAPI.Response> {
  return request('/api/article/comment/list', {
    params: { id },
  });
}

export async function addArticleComment(
  id: string,
  comment: string,
): Promise<ArticleAPI.Response> {
  const msg = await request('/api/article/comment/add', {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { id, comment },
  });
  console.log(msg);
  return msg;
}

export default async function addArticle(
  title: string,
  description: string,
  cover: string,
  editor: any,
): Promise<ArticleAPI.Response> {
  return request('/api/article/add', {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      title,
      description,
      cover,
      editor,
    },
  });
}
