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
import JoinPrompt from "../views/Chat/JoinPrompt"

import Market from "../views/Market/Market"
import PlantDetail from "../views/Market/PlantDetail"

import AfterPayment from "../views/Payment/AfterPayment"

import Playground from "../views/dev/Playground"
import InsertDb from "../views/dev/InsertDb"
import CreateChat from "../views/dev/CreateChat"

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
        path: '/app/chat/community/room/:id',
        name: 'chat.community.room',
        component: ChatRoom
    },
    {
        path: '/app/chat/expert/room/:id',
        name: 'chat.expert.room',
        component: ChatRoom
    },
    {
        path: '/app/chat/join/:type/:id',
        name: 'chatjoin',
        component: JoinPrompt
    },
    {
        path: '/app/plant/detail/:id',
        name: 'plantdetail',
        component: PlantDetail
    },
    {
        path: '/redir/after/payment',
        component: AfterPayment
    },
    {
        path: '/dev/insert/db',
        name: 'insertdb',
        component: InsertDb
    },
    {
        path: '/dev/chat',
        name: 'devchat',
        component: CreateChat
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