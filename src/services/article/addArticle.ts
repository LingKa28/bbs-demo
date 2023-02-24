import { request } from '@umijs/max';

export default async function addArticle(title: string, description: string, cover: string, editor: any) {
    const articleListData = await request('/api/article/add', {
      method: 'POST',
      data: {
        title,
        description,
        cover,
        editor,
      },
    });
    // console.log(articleListData);
    return articleListData;
  }
  