import { IncomingMessage, ServerResponse } from 'http';
import { faker } from '@faker-js/faker';

const getArticleList = (req: IncomingMessage) => {
  const params = Object.fromEntries(
    req.url
      ?.split('?')[1]
      .split('&')
      .map(s => s.split('=')) ?? [],
  );
  // console.info(params);

  const data = Array.from({ length: 5 }).map(() => ({
    id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    title: faker.lorem.words(3),
    userName: faker.internet.userName(),
    description: `These contents are based on ${JSON.stringify(
      params,
    )}. They are ${faker.lorem.paragraph(1)}`,
    // content:
    // 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    likes: faker.datatype.number({ min: 10, max: 9999 }),
    collections: faker.datatype.number({ min: 10, max: 999 }),
    comments: faker.datatype.number({ min: 1, max: 99 }),
    img: faker.image.cats(640, 400, true),
  }));

  return data;
};

export default {
  'GET /api/getArticleList': (req: IncomingMessage, res: ServerResponse) => {
    setTimeout(() => {
      res.end(JSON.stringify(getArticleList(req)));
    }, 2000);
  },

  'GET /api/getArticleReviewList': (
    req: IncomingMessage,
    res: ServerResponse,
  ) => {
    const data = Array.from({ length: 5 }).map(() => ({
      avatar: faker.image.avatar(),
      userName: faker.internet.userName(),
      content: faker.lorem.paragraph(1),
      likes: faker.datatype.number({ min: 10, max: 999 }),
      collections: faker.datatype.number({ min: 10, max: 99 }),
      comments: faker.datatype.number({ min: 1, max: 9 }),
    }));

    setTimeout(() => {
      res.end(JSON.stringify(data));
    }, 0);
  },

  'GET /api/getArticleDetail': (req: IncomingMessage, res: ServerResponse) => {
    const data = {
      state: 200,
      msg: 'request success',
      data: {
        title: faker.lorem.words(3),
        img: faker.image.cats(640, 400, true),
        content: '',
      },
    };

    setTimeout(() => {
      res.end(JSON.stringify(data));
    }, 0);
  },

  'POST /api/addArticleCover': (_req: IncomingMessage, res: ServerResponse) => {
    res.end(
      JSON.stringify({
        state: 200,
        msg: 'add article cover success',
        url: faker.image.imageUrl(),
      }),
    );
  },

  'POST /api/addArticle': (_req: IncomingMessage, res: ServerResponse) => {
    res.end(
      JSON.stringify({
        state: 200,
        msg: 'add article success',
      }),
    );
  },

  'POST /api/addArticleComment': (
    _req: IncomingMessage,
    res: ServerResponse,
  ) => {
    res.end(
      JSON.stringify({
        state: 200,
        msg: 'add article comment success',
      }),
    );
  },

  'POST /api/login': (_req: IncomingMessage, res: ServerResponse) => {
    res.end(
      JSON.stringify({
        state: 200,
        msg: 'login success',
        token: faker.datatype.uuid(),
        name: 'Ying',
        avatar: 'https://s3.bmp.ovh/imgs/2023/02/19/dcef2bd09376cc71.jpg',
      }),
    );
  },
};
