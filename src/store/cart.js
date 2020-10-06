const state = {
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
const getters = {
  totalCount (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) sum += prod.count
      return sum
    }, 0)
  },
  totalPrice (state) {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) sum += prod.count * prod.price
      return sum
    }, 0)
  }
}
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
  },
  deleteProd (state, prodId) {
    const index = state.cartProducts.findIndex(prod => prod.id === prodId)
    if (index !== -1) {
      state.cartProducts.splice(index, 1)
    }
  },
  // 全部“选中”
  updateAllProductChecked (state, value) {
    state.cartProducts.forEach(prod => {
      prod.isChecked = value
    })
  },
  updateProductChecked (state, { id, isChecked }) {
    const prod = state.cartProducts.find(prod => prod.id === id)
    prod && (prod.isChecked = isChecked)
  },
  updateProductCount (state, { id, count }) {
    const prod = state.cartProducts.find(prod => prod.id === id)
    prod && (prod.count = count)
  }
}
const actions = {
  asyncUpdateProductCount (context, { id, count }) {
    const prod = context.state.cartProducts.find(prod => prod.id === id)
    setTimeout(() => {
      prod && (prod.count = count)
    }, 100)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
