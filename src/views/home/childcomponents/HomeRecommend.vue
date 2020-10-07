<template>
    <div class="home-recommend">
        <div class="recommend" v-for="(item,index) in recommend" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="推荐图片">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeRecommend',
    props: {
        recommend: {
            type: Array,
            default: function() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.home-recommend {
    display: flex;
    font-size: 12px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
}

.recommend {
    flex: 1 1 0;
    margin: 0 5px;
    text-align: center;
}

.recommend img {
    width: 100%;
}

</style>