<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="conetntScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="good" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addCart" />
    <back-top v-show="isShowBtn" @click.native="backClick" />
    <toast :message="message" :show="isShow" />
  </div>
</template>

<script>
import DetailSwiper from "./childcomponents/DetailSwiper";
import DetailNavBar from "./childcomponents/DetailNavBar";
import DetailBaseInfo from "./childcomponents/DetailBaseInfo";
import DetailShopInfo from "./childcomponents/DetailShopInfo";
import DetailGoodsInfo from "./childcomponents/DetailGoodsInfo";
import DetailParamInfo from "./childcomponents/DetailParamInfo";
import DetailCommentInfo from "./childcomponents/DetailCommentInfo";
import DetailBottomBar from "./childcomponents/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodList from "components/content/goods/GoodList.vue";
import BackTop from "components/content/backtop/BackTop.vue";
import Toast from 'components/common/toast/Toast.vue'

import {
  getDetail,
  getDetailRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail.js";
import { debounce } from "common/util.js";
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  computed: {
    isShowBtn() {
      return -this.position.y > 1000 ? true : false;
    }
  },
  data() {
    return {
      id: null,
      topImages: [],
      good: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      refresh: null,
      themeTopYs: [],
      currentIndex: 0,
      position: {},
      isShow: false,
      message: '添加购物车成功'
    };
  },
  mounted() {
    //   包装一层防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    //   根据监听的事件进行方法的执行
    this.$bus.$on("detailItemImageLoad", () => {
      refresh();
    });
    //   包装一个防抖函数放到data中,就可以在监听子组件的方法时使用
    this.refresh = debounce(this.$refs.scroll.refresh, 100);
    // 包装一个防抖函数用于计算每个组件的offsetTop
    this.offsetTop_debounce = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 500);
  },
  created() {
    //   获取id
    this.id = this.$route.params.id;
    // 获取详情数据
    getDetail(this.id)
      .then((res) => {
        const data = res.result;
        // 获取轮播图的图片数据
        this.topImages = data.itemInfo.topImages;
        // 获取商品的信息
        this.good = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 获取店铺的信息
        this.shop = new Shop(data.shopInfo);
        // 获取商品的详情数据
        this.detailInfo = data.detailInfo;
        // 获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //   获取推荐信息
    getDetailRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  updated() {},
  methods: {
    ...mapActions({
      addToCart: 'addCart'
    }),
    imageLoad() {
      this.refresh();
      this.offsetTop_debounce();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 滚动获取对应的下标
    conetntScroll(position) {
      this.position = position;
      let positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if ((this.currentIndex != i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          console.log(i);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    // 点击按钮回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0,0,200);
    },
    // 点击添加到购物车中
    addCart() {
      // 获取购物车中所需要的的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.good.title;
      product.desc = this.good.desc;
      product.price = this.good.realPrice;  
      product.id = this.id;
      // 将数据添加到store中
      this.addToCart(product)
      .then(res => {
        this.isShow = true
        this.message = res;
        setTimeout(() => {
          this.isShow = false
        },2000)
      })
    }
  },
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList,
    BackTop,
    Toast
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  /* 比mainTabBar的层级多1，配合背景颜色，就是为了覆盖住mainTabBar */
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  height: calc(100% - 93px);
  background-color: #fff;
}
</style>