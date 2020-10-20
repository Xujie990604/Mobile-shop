<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-btn
        class="check-btn"
        :is-check="isSelectedAll"
        @click.native="checkAll"
      />
      <span>全选</span>
    </div>
    <div class="total">
      <span>总计：{{ total | showPrice }}</span>
    </div>
    <div class="check-length">
      <span @click="payClick">去结算:{{ checkLength }}</span>
    </div>
    <toast :message="message" :show="isShow" />
  </div>
</template>

<script>
import CheckBtn from "./CheckBtn";
import Toast from 'components/common/toast/Toast.vue'

import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
//   给store中的属性或者方法进行重命名
  computed: {
    ...mapGetters({
      list: "cartList",
    }),
    //   计算总金额
    total() {
      return this.list
        .filter((item) => item.check)
        .reduce((total, good) => {
          return total + good.price * good.count;
        }, 0);
    },
    checkLength() {
      return this.list.filter((item) => item.check).length;
    },
    isSelectedAll() {
      if (this.list.length == 0) {
        return false;
      } else {
        return this.list.every((item) => item.check);
      }
    },
  },
  methods: {
    checkAll() {
      if (this.isSelectedAll) {
        this.list.forEach((item) => {item.check = false;});
      } else {
        this.list.forEach((item) => {item.check = true});
      }
    },
    payClick() {
      if(!this.isSelectedAll) {
        this.isShow = true;
        this.message = '请选择商品进行结算';
        setInterval(() => {
          this.isShow = false
          this.message = ''
        },1000)
      }
    }
  },
  filters: {
    showPrice(value) {
      return "￥" + value.toFixed(2);
    },
  },
  components: {
    CheckBtn,
    Toast
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  position: relative;

  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background-color: #eee;

  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
}

.check-btn {
  height: 22px;
  width: 22px;
  line-height: 22px;
  margin-right: 5px;
}

.total {
  margin-left: 40px;
}

.check-length {
  position: absolute;
  right: 0;
  width: 120px;
  color: #fff;
  background-color: red;
  text-align: center;
}

</style>