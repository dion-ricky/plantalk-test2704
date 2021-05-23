<template>
    <router-view/>
    <BottomNav>

        <NavigationItem navId="home"
            :currentActive="currentActive" @navitem:click="navClicked">
            <template v-slot:nav-default>
                <HomeIconOutline/>
            </template>
            <template v-slot:nav-active>
                <HomeIconFilled/>
            </template>
        </NavigationItem>
        <NavigationItem navId="myplant"
            :currentActive="currentActive" @navitem:click="navClicked">
            <template v-slot:nav-default>
                <MyPlantIconOutline/>
            </template>
            <template v-slot:nav-active>
                <MyPlantIconFilled/>
            </template>
        </NavigationItem>
        <NavigationItem navId="scan"
            @navitem:click="navClicked">
            <template v-slot:nav-default>
                <ScanIcon/>
            </template>
            <template v-slot:nav-active>
                <ScanIcon/>
            </template>
        </NavigationItem>
        <NavigationItem navId="chat"
            :currentActive="currentActive"

            @navitem:click="navClicked">
            <template v-slot:nav-default>
                <ChatIconOutline/>
            </template>
            <template v-slot:nav-active>
                <ChatIconFilled/>
            </template>
        </NavigationItem>
        <NavigationItem navId="market"
            :currentActive="currentActive" @navitem:click="navClicked">
            <template v-slot:nav-default>
                <MarketIconOutline/>
            </template>
            <template v-slot:nav-active>
                <MarketIconFilled/>
            </template>
        </NavigationItem>
        
    </BottomNav>
</template>

<script>
import BottomNav from "../components/Navigation/BottomNav"
import NavigationItem from "../components/Navigation/NavigationItem"

import HomeIconOutline from "../assets/plantalk/nav-icon/home-outline-navitem"
import HomeIconFilled from "../assets/plantalk/nav-icon/home-filled-navitem"
import MyPlantIconOutline from "../assets/plantalk/nav-icon/myplant-outline-navitem"
import MyPlantIconFilled from "../assets/plantalk/nav-icon/myplant-filled-navitem"
import ChatIconOutline from "../assets/plantalk/nav-icon/chat-outline-navitem"
import ChatIconFilled from "../assets/plantalk/nav-icon/chat-filled-navitem"
import MarketIconOutline from "../assets/plantalk/nav-icon/market-outline-navitem"
import MarketIconFilled from "../assets/plantalk/nav-icon/market-filled-navitem"
import ScanIcon from "../assets/plantalk/nav-icon/scan-navitem"

export default {
    name: "MainApp",
    components: {
        BottomNav,
        NavigationItem,
        HomeIconOutline,
        HomeIconFilled,
        MyPlantIconOutline,
        MyPlantIconFilled,
        ChatIconOutline,
        ChatIconFilled,
        MarketIconOutline,
        MarketIconFilled,
        ScanIcon
    },
    data: () => ({
        currentActive: '',
    }),
    methods: {
        navClicked(e) {
            this.currentActive = e;
            this.navigateTo(e);
        },
        navigateTo(routeName) {
            this.$router.push({name: routeName});
        },
        setActiveNavItem() {
            // Set current active navigation item
            // by inferring from path
            
            let currentPath = this.$route.path
            let currentRoute = this.$router.getRoutes().filter(route => route.path === currentPath)[0]

            let l = currentRoute.name.indexOf(".")
            l = l === -1 ? currentRoute.name.length : l
            
            this.currentActive = currentRoute.name.substring(0, l)
        }
    },
    created() {
        this.setActiveNavItem()
    }
}
</script>

<style lang="scss" scoped>

</style>