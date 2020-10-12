import Vue from 'vue';
import vueRouter from 'vue-router';

Vue.use(vueRouter);
const cart = () => import('views/cart/Cart.vue')
const category = () => import('views/category/Category.vue')
const home = () => import('views/home/Home.vue')
const profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail.vue')


const routes = [
    {
        path:'',
        redirect: '/home'
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/category',
        component: category
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/profile',
        component: profile
    },
    {
        path: '/detail',
        component: Detail
    }
]

const router = new vueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active'
})

export default router;