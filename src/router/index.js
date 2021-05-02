import {createRouter, createWebHistory} from 'vue-router';

import Login from "../views/Auth/Login"
import Signup from "../views/Auth/Signup"
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
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/signup',
        name: "Signup",
        component: Signup
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