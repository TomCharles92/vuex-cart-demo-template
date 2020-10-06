const state = {
  cartProducts: []
}
const getters = {}
const mutations = {
  addToCart (state, product) {
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      prod.count++
      prod.isChecked = true
      prod.totalPrice = prod.count * prod.price
    } else {
      state.cartProducts.push({
        ...product,
        count: 1,
        isChecked: true,
        totalPrice: product.price
      })
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
