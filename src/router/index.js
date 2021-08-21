import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'default-layout',
    },
    component: () => import('../pages/Home.vue'),
  },
  {
    path: '/form',
    props: true,
    name: 'Form',
    meta: {
      layout: 'default-layout',
    },
    children: [
      {
        path: ':contactUuid',
        props: true,
        name: 'FormEdit',
        meta: {
          layout: 'default-layout',
        },
        component: () => import('../pages/Form.vue'),
      },
    ],
    component: () => import('../pages/Form.vue'),
  },
  {
    path: '/detail/:contactUuid',
    props: true,
    name: 'Detail',
    meta: {
      layout: 'default-layout',
    },
    component: () => import('../pages/Detail.vue'),
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../pages/Error.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
