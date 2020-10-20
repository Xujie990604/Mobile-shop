<template>
  <div class="cart-list">
    <scroll class="content" :pullUpLoad="true">
        <div>
            <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item" />
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

import CartListItem from './CartListItem'
export default {
  name: "CartList",
  computed: {
    cartList() {
      return this.$store.getters.cartList;
    },
  },
  components: {
    Scroll,
    CartListItem
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}

.content {
  height: 100%;
}
</style>