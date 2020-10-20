<template>
    <div class="toast"  v-show="show">
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        message: {
            type: String,
            default: '你好'
        },
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    padding: 8px 10px;

    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
}
</style>