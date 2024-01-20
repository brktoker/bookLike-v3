import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls"; // persisted state packages this package use for encrypt localstorage vuex data
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    user: null,
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,
    _userLikes: (state) => state.user?.likes || [],
    _userBookmarks: (state) => state.user?.bookmarks || [],
    _getCurrentUser(state) {
      const user = state.user;
      delete user?.password;
      return user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    toUserLogout(state) {
      state.user = null;
    },
    setUserLikes(state, userLikes) {
      if (state.user) {
        state.user.likes = userLikes;
      }
    },
    setUserBookmarks(state, userBookmarks) {
      if (state.user) {
        state.user.bookmarks = userBookmarks;
      }
    },
  },
  plugins: [
    createPersistedState({
      key: "booklike-vuex",
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
