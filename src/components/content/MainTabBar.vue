<template>
    <tab-bar>
      <tab-bar-item path="/home">
        <span slot="item-icon" class="iconfont icon-shouye"></span>
        <div slot="item-text" class="text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <span slot="item-icon" class="iconfont icon-2"></span>
        <div slot="item-text" class="text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <span slot="item-icon" class="iconfont icon-gouwuche"></span>
        <div slot="item-text" class="text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <span slot="item-icon" class="iconfont icon-wode"></span>
        <div slot="item-text" class="text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '../common/tabbar/TabBar'
import TabBarItem from '../common/tabbar/TabBarItem'
export default {
    name: 'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>