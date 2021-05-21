import {createRouter, createWebHistory} from 'vue-router';

import SplashScreen from "../views/SplashScreen"
import MainApp from "../views/MainApp"

import Login from "../views/Auth/Login"
import Signup from "../views/Auth/Signup"

import Home from "../views/Home"
import MyPlant from "../views/MyPlant/MyPlant"
import MyPlantDetail from "../views/MyPlant/MyPlantDetail"
import Scanner from "../views/Scanner/Scanner"

import Chat from "../views/Chat/Chat"
import CommunityChat from "../views/Chat/Community"
import ExpertChat from "../views/Chat/Expert"
import ChatRoom from "../views/Chat/ChatRoom"

import Market from "../views/Market/Market"
import PlantDetail from "../views/Market/PlantDetail"

import Playground from "../views/dev/Playground"

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
            component: Chat,
            children: [{
                path: 'community',
                name: 'chat.community',
                component: CommunityChat
            },
            {
                path: 'expert',
                name: 'chat.expert',
                component: ExpertChat
            }]
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
        path: '/app/myplant/detail',
        name: 'myplantdetail',
        component: MyPlantDetail
    },
    {
        path: '/app/chat/room',
        name: 'chatroom',
        component: ChatRoom
    },
    {
        path: '/app/plant/detail',
        name: 'plantdetail',
        component: PlantDetail
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