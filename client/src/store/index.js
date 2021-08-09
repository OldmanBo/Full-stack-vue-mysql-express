import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeUser: {
      status: false,
      user_id: ''
    }
  },
  getters: {
    getActiveUser: state => {
      return state.activeUser
    }
  },
  mutations: {
    setActiveUser: (state, activeUserData) => {
      state.activeUser.status = activeUserData.logedIn
      if (activeUserData.user_id) {
        state.activeUser.user_id = activeUserData.user_id
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
