import {createRouter, createWebHistory} from 'vue-router';

import Signin from "../views/Signin"
import Home from "../views/Home"
import LiveCamera from "../views/LiveCamera"
import SplashScreen from "../views/SplashScreen"
import Playground from "../views/Playground"

const routes = [
    {
        path: '/',
        name: 'Splash Screen',
        component: SplashScreen
    },
    {
        path: '/signin',
        name: "Signin",
        component: Signin
    },
    {
        path: '/play',
        name: "Playground",
        component: Playground
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
            path: '/live',
            component: LiveCamera
        }]
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