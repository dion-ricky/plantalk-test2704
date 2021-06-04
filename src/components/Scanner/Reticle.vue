<template>
<svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle v-if="state !== 'error'" :class="'inner' + (state === 'move-closer' ? ' move-closer' : '')" cx="60.5" cy="60.5" r="12.5" stroke="white"/>
<circle v-if="state !== 'error'" class="outer" cx="60.5" cy="60.5" r="18.5" stroke="white" stroke-opacity="0.7" stroke-width="2"/>
<circle v-if="state === 'sensing'" class="sensing animate" cx="60.5" cy="60.5" r="18.5" stroke="white" stroke-opacity="0.8"/>
<circle v-if="state === 'loading'" class="loading animate" cx="60.5" cy="60.5" r="18.5" stroke="white" stroke-width="2"/>
<g v-if="state === 'error'" class="error animate">
<circle cx="47.002" cy="47.0022" r="1.5" fill="white" fill-opacity="0.7"/>
<circle cx="43.491" cy="51.8346" r="1.5" transform="rotate(-18 43.491 51.8346)" fill="white" fill-opacity="0.7"/>
<circle cx="41.6452" cy="57.5157" r="1.5" transform="rotate(-36 41.6452 57.5157)" fill="white" fill-opacity="0.7"/>
<circle cx="41.6452" cy="63.4887" r="1.5" transform="rotate(-54 41.6452 63.4887)" fill="white" fill-opacity="0.7"/>
<circle cx="43.491" cy="69.1698" r="1.5" transform="rotate(-72 43.491 69.1698)" fill="white" fill-opacity="0.7"/>
<circle cx="47.002" cy="74.0022" r="1.5" transform="rotate(-90 47.002 74.0022)" fill="white" fill-opacity="0.7"/>
<circle cx="51.8345" cy="77.5132" r="1.5" transform="rotate(-108 51.8345 77.5132)" fill="white" fill-opacity="0.7"/>
<circle cx="57.5154" cy="79.3591" r="1.5" transform="rotate(-126 57.5154 79.3591)" fill="white" fill-opacity="0.7"/>
<circle cx="63.4887" cy="79.3591" r="1.5" transform="rotate(-144 63.4887 79.3591)" fill="white" fill-opacity="0.7"/>
<circle cx="69.1696" cy="77.5132" r="1.5" transform="rotate(-162 69.1696 77.5132)" fill="white" fill-opacity="0.7"/>
<circle cx="74.002" cy="74.0022" r="1.5" transform="rotate(-180 74.002 74.0022)" fill="white" fill-opacity="0.7"/>
<circle cx="77.513" cy="69.1698" r="1.5" transform="rotate(162 77.513 69.1698)" fill="white" fill-opacity="0.7"/>
<circle cx="79.3589" cy="63.4887" r="1.5" transform="rotate(144 79.3589 63.4887)" fill="white" fill-opacity="0.7"/>
<circle cx="79.3589" cy="57.5157" r="1.5" transform="rotate(126 79.3589 57.5157)" fill="white" fill-opacity="0.7"/>
<circle cx="77.513" cy="51.8346" r="1.5" transform="rotate(108 77.513 51.8346)" fill="white" fill-opacity="0.7"/>
<circle cx="74.002" cy="47.0022" r="1.5" transform="rotate(90 74.002 47.0022)" fill="white" fill-opacity="0.7"/>
<circle cx="69.1696" cy="43.4912" r="1.5" transform="rotate(72 69.1696 43.4912)" fill="white" fill-opacity="0.7"/>
<circle cx="63.4887" cy="41.6453" r="1.5" transform="rotate(54 63.4887 41.6453)" fill="white" fill-opacity="0.7"/>
<circle cx="57.5154" cy="41.6453" r="1.5" transform="rotate(36 57.5154 41.6453)" fill="white" fill-opacity="0.7"/>
<circle cx="51.8345" cy="43.4912" r="1.5" transform="rotate(18 51.8345 43.4912)" fill="white" fill-opacity="0.7"/>
</g>
</svg>
</template>

<script>
export default {
    name: "Reticle",
    props: {
        state: String
    }
}
</script>

<style lang="scss" scoped>
    svg > * {
        transform-origin: center center;
    }

    .inner {
        transition: 1s ease;
    }

    // Initialize default reticle
    .loading {
        stroke-dasharray: 117;
        stroke-dashoffset: 117;
        transform: rotate(-90deg);
    }
    .sensing {
        stroke-opacity: 0;
    }

    // Sensing animation sequence
    .sensing {        
        &.animate {
            animation-name: sensingSequence;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-out;
        }
    }

    @keyframes sensingSequence {
        from {
            stroke-opacity: 0;
        }

        60% {
            stroke-opacity: 0.8;
        }

        70% {
            stroke-opacity: 0.8;
            transform: scale(1,1);
        }

        to {
            transform: scale(2, 2);
        }
    }

    // Inner move closer animation
    .inner {
        &.move-closer {
            animation-name: moveCloser;
            animation-duration: .5s;
            animation-fill-mode: forwards;
        }
    }

    @keyframes moveCloser {
        to {
            transform: scale(.5, .5);
        }
    }

    // Error animation
    .error {
        &.animate {
            animation-name: errorSequence;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }
    }

    @keyframes errorSequence {
        to {
            transform: rotate(90deg)
        }
    }

    // Loading animation
    .loading {
        &.animate {
            stroke-opacity: 1;

            animation-name: loadingSequence;
            animation-duration: 2s;
            animation-iteration-count: infinite;
        }
    }

    @keyframes loadingSequence {
        to {
            stroke-dashoffset: 0;
        }
    }
</style>