import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      ward: false
    },
    mutations: {
      setWard (state, ward) {
        state.ward = ward
      }
    }
  })
}

export default createStore
