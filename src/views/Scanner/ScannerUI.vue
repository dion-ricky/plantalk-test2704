<template>
    <div class="fixed">
        <div class="top-gradient"></div>
        <div class="top-action">
            <div class="action-grouping">
                <div class="close">
                    <icon-button @iconbtn:click="close">
                        <span class="material-icons-outlined">close</span>
                    </icon-button>
                </div>
                <div class="action">
                    <icon-button @iconbtn:click="capture">
                        <span class="material-icons-outlined">photo_camera</span>
                    </icon-button>
                    <icon-button>
                        <span class="material-icons-outlined">flash_off</span>
                    </icon-button>
                    <icon-button>
                        <span class="material-icons-outlined">more_vert</span>
                    </icon-button>
                </div>
            </div>
        </div>

        <div class="classify-wrapper">
            <div class="thumbnail-wrapper" ref="thumbWrapper">
                <canvas ref="thumbCanvas">
                </canvas>
            </div>
            <div class="predicted-wrapper" ref="predictedWrapper">
                <div class="pw-flex" @click="goToPlantDetail(predicted.plant_id)">
                    <p class="predicted-class">{{ predicted.class }}</p>
                    <span class="material-icons-outlined">chevron_right</span>
                </div>
                <div class="retry" @click="$emit('retry:click', e)">
                    <Button text="RETRY" variant="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconButton from "../../components/IconButton"
import Button from "../../components/Button"

import CaptureIcon from "../../assets/plantalk/scanner/capture-icon"
import CloseIcon from "../../assets/plantalk/scanner/close-icon"
import FlashOffIcon from "../../assets/plantalk/scanner/flash_off-icon"
import FlashOnIcon from "../../assets/plantalk/scanner/flash_on-icon"

export default {
    name: "ScannerUI",
    components: {
        IconButton,
        Button,
        CaptureIcon,
        CloseIcon,
        FlashOffIcon,
        FlashOnIcon
    },
    props: {
        predicted: {
            class: '',
            plant_id: '',
        }
    },
    methods: {
        capture(e) {
            e.stopPropagation()
            this.$emit('capture:click', e)
        },
        close(e) {
            e.stopPropagation()
            this.$emit('close:click', e)
        },
        goToPlantDetail(plant_id) {
            this.$router.push({name: 'plantdetail', params: {id: plant_id}})
        },
        toggleThumbCanvas(show) {
            let thumbWrapper = this.$refs.thumbWrapper;

            show = show || false;

            let thumbWrapperY = show ? 0 : 300

            thumbWrapper.style.transform = `translateY(${thumbWrapperY}px)`
        },
        togglePredicted(show) {
            let predictedWrapper = this.$refs.predictedWrapper;

            show = show || false;

            let pWrapperY = show ? 0 : 200
            
            predictedWrapper.style.transform = `translateY(${pWrapperY}px)`
        }
    },
    mounted() {
        this.$emit('ui:mounted', {
            thumbCanvasRef: this.$refs.thumbCanvas,
            toggleThumbCanvas: this.toggleThumbCanvas,
            togglePredicted: this.togglePredicted
        })
    },
    emits: ['capture:click', 'close:click', 'retry:click', 'ui:mounted']
}
</script>

<style lang="scss" scoped>
@import '../../assets/theme.scss';

.fixed {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
}

.top-gradient {
    width: 100vw;
    height: min(150px, 25vh);
    position: absolute;
    z-index: -1;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) -30%, rgba(0,0,0,0) 100%);
}

.action-grouping {
    display: flex;
    margin: 1.5rem .5rem;
    justify-content: space-between;
}

.classify-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 11;

    .thumbnail-wrapper {
        width: 30vw;
        height: 30vw;
        border: 2px solid white;
        border-radius: 12px;
        margin: 1rem 1.5rem;

        transform: translateY(300px);
        transition: transform ease-in-out .25s;

        canvas {
            width: 100%;
            border-radius: 12px;
        }
    }

    .predicted-wrapper {
        background-color: white;
        padding: 1rem 1.5rem;

        border-top-left-radius: 12px;
        border-top-right-radius: 12px;

        transform: translateY(200px);
        transition: transform ease-in-out .25s;
    
        .pw-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .predicted-class {
            margin: 0;

            font-family: $body-font-stack;
            font-weight: 600;
        }

        .retry {
            display: flex;
        }

        span.material-icons-outlined {
            font-size: 1.5rem;
            color: black;
        }
    }
}

span.material-icons-outlined {
    font-size: 1.8rem;

    color: white;
}
</style>