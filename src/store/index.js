import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPage: 'HomeList'
  },
  mutations: {
    toMoreSecPage (state, showPage) {
      state.showPage = showPage
    },
    toHome (state, showPage) {
      state.showPage = showPage
    }
  },
  actions: {
  },
  modules: {
  }
})
