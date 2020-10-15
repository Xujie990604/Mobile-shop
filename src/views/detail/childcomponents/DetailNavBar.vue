<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div class="title-left" slot="left" @click="clickBack">
          <img src="~assets/img/common/back.svg" alt="返回按钮">
      </div>
      <div class="title" slot="center">
        <span
          class="title-item"
          v-for="(item, index) in data"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="itemClick(index)"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  data() {
    return {
      data: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
      itemClick(index) {
          this.currentIndex = index;
          this.$emit('itemClick',index)
      },
      clickBack() {
          this.$router.go(-1);
      }
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.title {
  display: flex;
  padding: 0 40px;
}

.title-item {
  flex: 1;
  font-size: 15px;
}

.active {
    color: var(--color-high-text);
}

.title-left img {
   margin-top: 10px; 
}
</style>