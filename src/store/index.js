import Vue from 'vue'
import Vuex from 'vuex'
// 这个例子比较复杂，不适合
// import Vuex from '../myvuex/index'
import products from './products'
import cart from './cart'

Vue.use(Vuex)

const myPlugin = store => {
  // store 初始化之后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

export default new Vuex.Store({
  plugins: [myPlugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  }
})
