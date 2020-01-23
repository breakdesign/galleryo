export const state = () => ({
  popular: [],
  latest: [],
  category: [],
  search: [],
  single: []
})

export const mutations = {
  setDataPopular(state, items) {
    state.popular = items
  },
  setDataLatest(state, items) {
    state.latest = items
  },
  setDataCategory(state, items) {
    state.category = items
  },
  setDataSearch(state, items) {
    state.search = items
  },
  setDataSingle(state, items) {
    state.single = items.data
  }
}

export const actions = {
  async getDataPopular({ commit }) {
    this.$axios.setToken(
      'Client-ID 0bf353428d17ca150dfe3ff96d5bd4cda9899223bb962aa06df6cbf9dfa99d06'
    )
    const dataFromAPI = await this.$axios.get(
      'photos/random?featured&orientation=portrait&count=5&w=400&h=600'
    )
    commit('setDataPopular', dataFromAPI.data)
  },
  async getDataPopularAll({ commit }) {
    this.$axios.setToken(
      'Client-ID 0bf353428d17ca150dfe3ff96d5bd4cda9899223bb962aa06df6cbf9dfa99d06'
    )
    const dataFromAPI = await this.$axios.get(
      'photos/random?featured&orientation=portrait&count=20'
    )
    commit('setDataPopular', dataFromAPI.data)
  },
  async getDataLatest({ commit }) {
    this.$axios.setToken(
      'Client-ID 0bf353428d17ca150dfe3ff96d5bd4cda9899223bb962aa06df6cbf9dfa99d06'
    )
    const dataFromAPI = await this.$axios.get(
      'photos/random?featured&orientation=portrait&count=10'
    )
    commit('setDataLatest', dataFromAPI.data)
  },
  async getDataCategory({ commit }, data) {
    this.$axios.setToken(
      'Client-ID 0bf353428d17ca150dfe3ff96d5bd4cda9899223bb962aa06df6cbf9dfa99d06'
    )
    const dataFromAPI = await this.$axios.get(
      `search/photos?query=${data}&orientation=portrait&per_page=10`
    )
    commit('setDataCategory', dataFromAPI.data)
  },
  async getDataSearch({ commit }, data) {
    this.$axios.setToken(
      'Client-ID 0bf353428d17ca150dfe3ff96d5bd4cda9899223bb962aa06df6cbf9dfa99d06'
    )
    const dataFromAPI = await this.$axios.get(
      `search/photos?query=${data}&orientation=portrait&per_page=20`
    )
    commit('setDataSearch', dataFromAPI.data)
  },
  getDataSingle({ commit }, data) {
    this.$axios.setToken(
      'Client-ID 0bf353428d17ca150dfe3ff96d5bd4cda9899223bb962aa06df6cbf9dfa99d06'
    )
    // await this.$axios
    //   .get(`photos/${data}`)
    //   .then((response) => {
    //     commit('setDataSingle', response.data)
    //   })
    //   .catch((e) => {
    //     console.log('Error :' + e)
    //   })
    return this.$axios.get(`photos/${data}`).catch((error) => {
      // handle error
      if (error.response.status === 404) {
        commit('setDataSingle', [])
      } else if (error.response.status === 401) {
        console.log("error don't have permission API")
      }
    })
  },
  setDataSingle({ commit }, data) {
    commit('setDataSingle', data)
  }
}
