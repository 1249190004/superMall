import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payLoad) {
      payLoad.count++
    },
    addToCart(state, payLoad) {
      payLoad.checked = true
      state.cartList.push(payLoad)
    }
  },
  actions: {
    addCart(context, payLoad) {
      return new Promise((resolve,reject)=>{
        let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('此商品数量+1')
        } else {
          payLoad.count = 1
          // context.state.cartList.push(payLoad)
          context.commit('addToCart', payLoad)
          resolve('商品添加成功')
        }
      })
    }
  },
  modules: {},
  getters: {
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  }
})
