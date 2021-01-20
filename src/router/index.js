import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/i-datavm'
        },
		{
		    path: '/i-design',
		    component: () => import(/* design */ '@/views/i-design.vue')
		},
		{
		    path: '/i-datavm',
		    component: () => import(/* datavm */ '@/views/i-datavm.vue')
		}
    ]
});
