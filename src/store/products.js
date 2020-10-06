import axios from 'axios'

const state = {
  products: []
}
const getters = {}
const mutations = {}
const actions = {
  async getProducts (context, payload) {
    const res = await axios.get('/products')
    context.state.products = res.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
