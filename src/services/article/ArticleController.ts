import { request } from '@umijs/max';

export async function getArticleDetail(id: string): Promise<any> {
  return request('/api/article/detail', {
    params: { id },
  });
}
// export async function getArticleDetail(id: string): Promise<any> {
//   const articleDetailData = await request('/api/article/detail', {
//     params: { id },
//   });
//   console.log(articleDetailData);
//   return articleDetailData;
// }

export async function getArticleCommentsList(id: string) {
  return request('/api/article/comment/list', {
    params: { id },
  });
}

export async function addArticleComment(id: string, comment: string) {
  const msg = await request('/api/article/comment/add', {
    method: 'POST',
    data: { id, comment },
  });
  console.log(msg);
  return msg;
}
