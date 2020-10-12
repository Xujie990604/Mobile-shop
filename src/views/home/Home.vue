<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <span slot="center">主页</span>
    </nav-bar>
    <!-- 选项卡 -->
      <tab-control
        :tabs="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control1"
        :class="{'is-show': isTabControlFixed}"
      />
    <!-- 滚动的插件 -->
    <scroll
      class="content back-color"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="pullingUp"
    >
      <!-- 轮播图 -->
      <home-swiper :banner="banner" @homeSwiperImageLoad="homeSwiperImageLoad" />
      <!-- 推荐 -->
      <home-recommend :recommend="recommend" />
      <!-- Feature -->
      <home-feature />
      <!-- 选项卡 -->
      <tab-control
        :tabs="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <!-- 菜单列表 -->
      <good-list :goods="showGoods" />
    </scroll>
    <!-- 返回顶部的按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackBtn" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import HomeSwiper from "./childcomponents/HomeSwiper";
import HomeRecommend from "./childcomponents/HomeRecommend";
import HomeFeature from "./childcomponents/HomeFeature";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from 'common/util.js'
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
    isShowBackBtn() {
      return -this.position.y > 1000 ? true : false;
    },
    isTabControlFixed() {
      return -this.position.y > this.offsetSetTop ? true : false;
    }
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      position: { x: 0, y: 0 },
      offsetSetTop: 0
    };
  },
  created() {
    // 请求多条数据
    this.getMultidata();
    // 请求商品的数据
    this.getGoods("pop");
    this.getGoods("new");
    this.getGoods("sell");
  },
  mounted() {
    // 包装一层防抖函数
    const refresh = debounce(this.$refs.scroll.refresh,50,1,2)
    // 监听item中图片的加载完成
    this.$bus.$on('itemImageLoad',() => {
      refresh();
    });
  },
  methods: {
    // 事件监听的方法

    // 子组件传递过来的事件
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index];
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    homeSwiperImageLoad() {
      this.offsetSetTop = this.$refs.tabControl2.$el.offsetTop - 40;
    },
    // 使用native修饰符直接监听组件根元素的原生事件
    backClick() {
      // 使用refs直接访问子组件的方法
      // 回到（0,0）坐标。时间是500ms
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听滑动
    contentScroll(position) {
    // 获取现在滚动到的坐标位置
      this.position = position;
    },
    // 监听上拉加载
    pullingUp() {
      this.getGoods(this.currentType);
      // better-scroll的方法，用于重新计算可滚动区域的大小
      // ？？？会等待上面的异步函数执行完之后再执行吗
      // this.$refs.scroll.refresh();
    },

    // 网络请求的方法

    // 请求多条数据
    getMultidata() {
      getHomeMultidata()
        .then((res) => {
          // console.log(res);
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
          this.keywords = res.data.keywords.list;
          this.dKeyword = res.data.dKeyword.list;
        })
        .catch((err) => console.log(err));
    },
    // 请求商品的数据
    getGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
        // 调用scroll插件的完成上拉加载事件，以便下一次下拉加载
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding: 44px 0 49px 0;
  height: 100vh;
}

.home-nav {
  background: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.tab-control1 {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  opacity: 0;
}

.is-show  {
  opacity: 1;
  z-index: 10;
}


.content {
  height: 100%;
}

.back-color {
  background-color: #fff;
}
</style>