<template>
    <div class="fixed">
        <div class="top-gradient"></div>
        <div class="top-action">
            <div class="action-grouping">
                <div class="close">
                    <icon-button>
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
    </div>
</template>

<script>
import IconButton from "../components/IconButton"

import CaptureIcon from "../assets/plantalk/scanner/capture-icon"
import CloseIcon from "../assets/plantalk/scanner/close-icon"
import FlashOffIcon from "../assets/plantalk/scanner/flash_off-icon"
import FlashOnIcon from "../assets/plantalk/scanner/flash_on-icon"

export default {
    name: "ScannerUI",
    components: {
        IconButton,
        CaptureIcon,
        CloseIcon,
        FlashOffIcon,
        FlashOnIcon
    },
    methods: {
        capture(e) {
            this.$emit('capture:click', e)
        }
    },
    emits: ['capture:click']
}
</script>

<style lang="scss" scoped>
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

span.material-icons-outlined {
    font-size: 1.8rem;

    color: white;
}
</style>