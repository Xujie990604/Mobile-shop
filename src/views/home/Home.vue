<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <span slot="center">主页</span>
    </nav-bar>
    <!-- 轮播图 -->
    <home-swiper :banner="banner" />
    <!-- 推荐 -->
    <home-recommend :recommend="recommend" />
    <!-- Feature -->
    <home-feature />
    <!-- 选项卡 -->
    <tab-control
      class="tab-control"
      :tabs="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <!-- 菜单列表 -->
    <good-list :goods="showGoods" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "components/content/goods/GoodList";

import HomeSwiper from "./childcomponents/HomeSwiper";
import HomeRecommend from "./childcomponents/HomeRecommend";
import HomeFeature from "./childcomponents/HomeFeature";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodList,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
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
      currentType: 'pop',
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
  methods: {
    // 事件监听的方法

    // 子组件传递过来的事件
    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index];
    },

    // 网络请求的方法

    // 请求多条数据
    getMultidata() {
      getHomeMultidata()
        .then((res) => {
          console.log(res);
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
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding: 44px 0 0 0;
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

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
</style>