<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        // 创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })
        // 监听滚动事件
        this.scroll.on('scroll',(position) => {
            this.$emit('scroll',position)
        })
        // 监听上拉加载事件
        this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
        })
    },
    methods: {
        // 滚动到顶部的方法
        scrollTo(x,y,time=500) {
            this.scroll.scrollTo(x,y,time)
        },
        // 完成上拉加载更多的方法
        finishPullUp() {
            this.scroll.finishPullUp()
        },
        // 重新计算可滚动区域的大小
        refresh() {
            this.scroll.refresh()
        }
    }
}
</script>

<style scoped>

</style>