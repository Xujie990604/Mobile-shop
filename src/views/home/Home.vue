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
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childcomponents/HomeSwiper';
import HomeRecommend from './childcomponents/HomeRecommend'

import { getHomeMultidata } from "network/home.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend
  },
  data() {
    return {
      banner: [],
      recommend: [],
      keywords: [],
      dKeyword: [],
    };
  },
  created() {
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
};
</script>

<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
</style>