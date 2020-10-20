import { ADD_PRODUCT_COUNT, ADD_NEW_PRODUCT} from './mutations_type'
export default {
    // 已有商品增加数量
    [ADD_PRODUCT_COUNT](state, payload) {
        payload.count += 1;
    },
    // 添加新的商品
    [ADD_NEW_PRODUCT](state, payload) {
        payload.check = true;
        state.cartList.push(payload)
    }
}