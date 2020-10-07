<template>
  <div class="good-list">
    <good-list-item
      class="good-list-item"
      v-for="(good, index) in goods"
      :key="index"
      :goods-item="good"
    />
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem";
export default {
  name: "GoodList",
  components: {
    GoodListItem,
  },
  props: {
    goods: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.good-list-item {
  flex: 1 1 150px;
  padding-right: 3px;
  padding-left: 3px;
}
</style>