import { model } from '@modern-js/runtime/model';

type UserState = {
  name: string;
  avatar: string;
};

export default model<UserState>('user').define({
  state: {
    name: '',
    avatar:
      'https://p3-passport.byteimg.com/img/mosaic-legacy/3793/3114521287~100x100.awebp',
  },
  computed: {},
  actions: {
    setUser(state, name, avatar) {
      state.name = name;
      state.avatar = avatar;
    },
    // getName(state) {
    //   return state.name;
    // },
    // getAvatar(state) {
    //   return state.avatar;
    // },
  },
});
