<template>
    <div class="wrapper-pg">

        <swiper
            :slides-per-view="1"
            :space-between="50"
        >
            <swiper-slide>
                <Banner
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/promotional%2Fbanner%2Fbnr_anti-stress-tips.png?alt=media&token=0eb7bad3-89ba-414b-8370-c8ac6ed07508"
                />
            </swiper-slide>
            <swiper-slide>
                <Banner
                    imgSrc="https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/promotional%2Fbanner%2Fbnr_anti-stress-tips.png?alt=media&token=0eb7bad3-89ba-414b-8370-c8ac6ed07508"
                />
            </swiper-slide>
        </swiper>
    </div>
    
  <!-- <Reticle width="250px" height="250px" :state="state" />
        <div>
            <button @click="state = 'sensing'">Sensing</button>
            <button @click="state = 'error'">Error</button>
            <button @click="state = 'loading'">Loading</button>
            <button @click="state = 'move-closer'">Move Closer</button>
        </div> -->
</template>

<script>
import Reticle from "../assets/plantalk/scanner/reticle";
import Banner from "../components/Plantalk/Banner";

import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper.scss';

export default {
  name: "Playground",
  components: {
    Reticle,
    Banner,
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    state: "sensing",
  }),
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-pg {
    position: relative;
    height: 100%;
//   width: 100vw;
//   height: 100vh;
//   padding: 2rem;
//   background-color: #eeeeee;
//   display: flex;
//   align-items: center;
//   justify-content: center;
  //     flex-direction: column;
}


</style>