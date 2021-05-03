import {createRouter, createWebHistory} from 'vue-router';

import SplashScreen from "../views/SplashScreen"
import MainApp from "../views/MainApp"

import Login from "../views/Auth/Login"
import Signup from "../views/Auth/Signup"

import Home from "../views/Home"
import MyPlant from "../views/MyPlant"
import Scanner from "../views/Scanner"
import Chat from "../views/Chat"
import Market from "../views/Market"

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
        path: '/app',
        name: 'MainApp',
        component: MainApp,
        children: [{
            path: 'home',
            name: 'home',
            alias: '/app',
            component: Home
        },
        {
            path: 'myplant',
            name: 'myplant',
            component: MyPlant
        },
        {
            path: 'chat',
            name: 'chat',
            component: Chat
        },
        {
            path: 'market',
            name: 'market',
            component: Market
        }]
    },
    {
        path: '/app/scan',
        name: 'scan',
        component: Scanner
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: Playground
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router