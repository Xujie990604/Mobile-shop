<template>
  <div class="home-swiper">
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="轮播图" @load="imageLoad" />
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
  data() {
    return {
      load: false
    }
  },
  methods: {
    imageLoad(){
      if(!this.load) {
        this.$emit('homeSwiperImageLoad')
        this.load = true;
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