<template>
    <div class="tab-control">
        <div class="tab" :class="{active:index === currentIndex}" 
        v-for="(item,index) in tabs" :key="index"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabControl',
    data() {
        return {
            currentIndex: 0,
        }
    },
    props: {
        tabs: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style scoped>
.tab-control {
    display: flex;
    font-size: 15px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}

.tab {
    flex: 1;
}

.tab span {
    padding: 5px;
}

.active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
}

</style>