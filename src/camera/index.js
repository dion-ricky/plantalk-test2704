
class PlantalkCamera {

    constructor() {
        navigator.mediaDevices.enumerateDevices()
        .then((mediaDevices) => {
            this.mediaDevices = mediaDevices;
        })
    }

    getUserMediaStream(c) {
        const constraints = c ? c : {
            video: {
                facingMode: "environment",
                height: { ideal: 720 }
            }
            // configure video dimensions here as well
            // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        }

        return new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia(constraints)
            .then((mediaStream) => {
                // player.srcObject = stream;
                // this.mediaStream = mediaStream;
                // console.log(mediaStream);
                this.activeMediaStream = mediaStream;
                res(mediaStream)
            })
        });
    }

    stopVideo(mediaStream) {
        const activeMediaStream = mediaStream ? mediaStream : this.activeMediaStream;

        activeMediaStream.getVideoTracks()
        .forEach(track => track.stop());
    }

    toggleTorch(toggle = false) {
        const track = this.getTrackwithTorch(this.activeMediaStream);

        if (!track) {
            console.log('no track with torch')
            return;
        }

        console.log(track)

        track.applyConstraints({
            advanced: [
                {
                    torch: toggle
                }
            ]
        })
    }

    toggleFacingMode() {
        
    }

    getTrackwithTorch(mediaStream = null) {
        const activeMediaStream = mediaStream ? mediaStream : this.activeMediaStream;

        console.log('trying to find track with torch', activeMediaStream)

        let trackWithTorch = null;

        activeMediaStream.getVideoTracks()
        .forEach((track) => {
            console.log(track.getCapabilities())
            trackWithTorch = track.getCapabilities().torch ? track : null;
        });

        return trackWithTorch;
    }
}

export default PlantalkCamera