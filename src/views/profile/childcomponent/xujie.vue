<template>
    <div class="xujie">
        <input class="input" :value="value" @input="$emit('input',$event.target.value)">
        {{value}}
    </div>
</template>

<script>
export default {
    name: 'Xujie',
    props: {
        value:{
            type:String,
            default: '请输入内容'
        }
    }
}
</script>