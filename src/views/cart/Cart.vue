<template>
    <div class="cart">
        <!-- 顶部导航栏 -->
        <nav-bar>
            <div slot="center">购物街({{cartLength}})</div>
        </nav-bar>
        <!-- 滚动区域 -->
        <cart-list />
        <!-- 底部结算栏 -->
        <cart-bottom-bar />
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childcomponents/CartList'
import CartBottomBar from './childcomponents/CartBottomBar'
export default {
    name: 'Cart',
    computed: {
        cartLength() {
           return this.$store.getters.cartLength;
        },
        cartList() {
            return this.$store.getters.cartList;
        }
    },
    components: {
        NavBar,
        CartList,
        CartBottomBar
    }
}
</script>

<style scoped>

.cart {
    height: 100vh;
}

.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 600;
}
</style>