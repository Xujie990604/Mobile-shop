<template>
    <div class="check-btn" :class="{check:isCheck}" @click="checkClick">
        <img src="~assets/img/cart/tick.svg" alt="选择按钮">
    </div>
</template>

<script>
export default {
    name: 'CheckBtn',
    props: {
        isCheck: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        checkClick() {
            this.$emit('checkClick')
        }
    }
}
</script>

<style scoped>
.check-btn {
    border-radius: 50%;
    border: 2px solid #aaa;
}

.check {
    background-color: red;
}
</style>