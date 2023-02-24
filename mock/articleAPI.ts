import { defineMock } from 'umi';
import { faker } from '@faker-js/faker';

export default defineMock({
  '/api/article/list': (_req, res) => {
    const articleListData = Array.from({ length: 10 }).map(() => ({
      id: faker.datatype.uuid(),
      avatar: faker.image.avatar(),
      title: faker.lorem.words(3),
      userName: faker.internet.userName(),
      description: faker.lorem.paragraph(2),
      likes: faker.datatype.number({ min: 999, max: 9999 }),
      collections: faker.datatype.number({ min: 99, max: 999 }),
      comments: faker.datatype.number({ min: 9, max: 99 }),
      img: faker.image.cats(640, 400, true),
    }));

    setTimeout(() => {
      res.end(
        JSON.stringify({
          code: 1,
          success: true,
          data: articleListData,
        }),
      );
    }, 2000);
  },

  'POST /api/article/add': (_req, res) => {
    res.end(
      JSON.stringify({
        code: 1,
        success: true,
        msg: 'add article comment success',
      }),
    );
  },

  'POST /api/article/addCover': (_req, res) => {
    res.end(
      JSON.stringify({
        code: 1,
        success: true,
        msg: 'add article cover success',
        url: faker.image.imageUrl(),
      }),
    );
  },
});
