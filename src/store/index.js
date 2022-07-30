import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userInformation: {},
    filterUserName: []
  },
  getters: {},
  mutations: {
    addUserInformation(state, data) {
      state.userInformation = data;
    },
    clearInformation(state) {
      state.userInformation = "";
      state.filterUserName = ""
    },
    addFilterUserName(state, data) {
    	state.filterUserName = data;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
