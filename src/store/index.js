import { createStore } from 'vuex'
import auth from './modules/auth/auth'
import usersList from "@/store/modules/usersList/usersList";
import users from "@/store/modules/users/users";
import {dictionaries} from "@/store/modules/dictionaries";
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    usersList,
    users,
    dictionaries
  }
})
