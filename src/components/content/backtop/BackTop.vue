<template>
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="返回顶部">
    </div>
</template>

<script>
export default {
    name: 'BackTop',
    methods: {
        
    }

}
</script>


<style scoped>
.back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
    z-index: 10;
}

img {
    height: 43px;
    /* width: 43px; */
}
</style>