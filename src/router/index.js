import {createRouter, createWebHistory} from 'vue-router';

import Signin from "../views/Signin"
import Home from "../views/Home"
import LiveCamera from "../views/LiveCamera"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin
    },
    {
        path: '/live',
        name: 'Live Camera',
        component: LiveCamera
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router