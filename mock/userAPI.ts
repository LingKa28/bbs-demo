import { defineMock } from 'umi';
import { faker } from '@faker-js/faker';

export default defineMock({
  'POST /api/user/getUerInfo': (_req, res) => {
    const userInfo = {
      userName: faker.internet.userName(),
      avatar: faker.image.avatar(),
    };

    res.end(
      JSON.stringify({
        code: 1,
        success: true,
        data: userInfo,
      }),
    );
  },

  'POST /api/user/login': (_req, res) => {
    res.end(
      JSON.stringify({
        code: 1,
        success: true,
        token: faker.datatype.uuid(),
      }),
    );
  },
});
