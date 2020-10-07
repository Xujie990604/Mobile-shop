<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="轮播图" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
      banner: {
          type: Array,
          default: function() {
              return []
          }
      }
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
</style>