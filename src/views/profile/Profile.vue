<template>
    <div>
      <!-- <xu-jie v-model="data"></xu-jie> -->
      <input v-model="fullName" />
      {{fullName}}
    </div>
</template>

<script>
import XuJie from 'views/profile/childcomponent/xujie.vue'
export default {
    name: 'Progile',
    computed: {
        fullName() {
            return this.firstName + this.lastName;
        }
    },
    data() {
        return {
            firstName: 'xiao',
            lastName: 'han'
        }
    },
    components: {
        XuJie
    }
}
</script>

<style scoped>

</style>