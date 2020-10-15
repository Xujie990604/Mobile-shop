<template>
    <div class="detail-swiper">
        <swiper class="mySwiper">
            <swiper-item v-for="(item,index) in topImages" :key="index">
                <img :src="item" alt="轮播图">
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Swiper,SwiperItem }  from 'components/common/swiper/index.js'
export default {
    name: 'DetailSwiper',
    props: {
        topImages:{
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    }

}
</script>

<style scoped>
.mySwiper {
    height: 300px;
    overflow: hidden;
}
</style>