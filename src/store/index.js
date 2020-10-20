import Vue from 'vue';
import Vuex from 'vuex'
// 注册插件
Vue.use(Vuex)
import actions from './actions';
import mutations from './mutations'
import getters from './getters'



const state = {
    cartList: []
}

// 创建store对象
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store;