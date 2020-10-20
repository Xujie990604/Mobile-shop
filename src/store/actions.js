
import { ADD_PRODUCT_COUNT, ADD_NEW_PRODUCT } from './mutations_type'
export default {
    addCart({ state, commit }, payload) {
        return new Promise((resolve,reject) => {
            let oldProduct = null;
            // 如果现在的数组里面已经有这条数据的话，直接给count属性加一
            for (let item of state.cartList) {
                if (item.id == payload.id) {
                    oldProduct = payload;
                    commit(ADD_PRODUCT_COUNT, item)
                    resolve('当前的商品数量加一')
                }
            }

            // 现在的数组里面没有这条数据的话，给数据添加一个count属性，并且push进去
            if (!oldProduct) {
                payload.count = 1;
                commit(ADD_NEW_PRODUCT, payload)
                resolve('添加一个新的商品')
            }
        })
        
    }
}