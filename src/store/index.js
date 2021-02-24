import { createStore } from 'vuex'
import { UserModule } from './User'

export default createStore({
  state: {
  },

  // function that effect the state
  mutations: {
  },

  // function that you call through your app that call mutation
  actions: {
  },

  modules: {
    User: UserModule
  }
})
