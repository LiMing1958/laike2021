import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showPage: 'HomeList',
    secondTime: null
  },
  mutations: {
    toMoreSecPage (state, showPage) {
      state.showPage = showPage
    },
    toHome (state, showPage) {
      state.showPage = showPage
    },
    secondTime (state, secondTime) {
      state.secondTime = secondTime
    }
  },
  actions: {
  },
  modules: {
  }
})
