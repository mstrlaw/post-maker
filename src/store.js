import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pngSrc: ''
  },
  mutations: {
    saveResult (state, value) {
      state.pngSrc = value
    }
  },
  getters: {
    pngSrc (state) {
      return state.pngSrc
    }
  }
})
