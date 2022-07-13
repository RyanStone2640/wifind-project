import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userInformation: "",
  },
  getters: {},
  mutations: {
    addUserInformation(state, data) {
      state.userInformation = data;
    },
    clearInformation(state) {
      state.userInformation = "";
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
