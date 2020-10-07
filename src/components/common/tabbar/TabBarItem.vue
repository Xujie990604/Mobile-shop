<template>
        <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
            <slot name="item-icon"></slot>
            <slot name="item-text"></slot>
        </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
        path:String,
        // 可以通过在使用该组件时传入activeColor属性来改变默认活跃颜色
        activeColor: {
            type: String,
            default: "red"
        }
    },
    computed: {
        isActive() {
            return this.$route.path.indexOf(this.path) !== -1;
        },
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        itemClick() {
            this.$router.push(this.path);
        }
    }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab-bar-item span  {
    display: inline-block;
    height: 24px;
    width: 24px;
    font-size: 24px;
    line-height: 24px;
    margin-top: 1px;
}

.tab-bar-item .text {
    font-size: 14px;
}

</style>