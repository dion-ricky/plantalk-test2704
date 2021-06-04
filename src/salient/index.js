const Util = {
  keepInsideBoundary(x, w) {
    // w - 1 to prevent x to exactly match the boundary
    // x can go negative or go beyond w (limit)
    // prevent both behavior
    let newX = x
    let moved = 0

    if (x !== null && x < 0) {
      newX = 0
      moved = x - 0
    }
    if (x > w) {
      newX = w
      moved = x - w
    }

    return {
      value: newX,
      moved: moved
    }
  }  
}

class CameraNotReadyError extends Error {
  constructor(message) {
    super(message);
    this.name = "CameraNotReadyError"
  }
}

class SalientObjectDetection {

    // Params cfg object
    // cfg{videoRef, tempCanvas, callback, workerInstance}
    constructor(cfg, performance) {
      this.videoRef = cfg.videoRef
      this.tempCanvas = cfg.emptyCanvas
      this.callbackOnReticleXY = cfg.onReticleXYCallback
      this.workerInstance = cfg.workerInstance
      
      this.performance = performance

      // Default config
      this.stopFlag = false
      this.lastXY = null
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async init() {
      try {
        this.imageBinarizer()
      } catch (err) {
        if (err.name === "CameraNotReadyError") {
          await this.sleep(1000)
          this.init()
        }
      }
    }

    async workerMsgHandler(msg) {
      const t0 = this.performance.now()
      this.getReticleXY(msg)
      const t1 = this.performance.now()

      const totalTime = msg.data.totalTime + (t0-t1)
      const fps = Math.floor(1000/totalTime)
      const preferredFPS = 1

      const delay = fps < preferredFPS ? (1000/fps) : ((1000/preferredFPS) - totalTime)

      console.log('FPS: ', fps < preferredFPS ? fps : preferredFPS)
      // console.log('delay: ', delay)
      await this.sleep(delay)
      this.imageBinarizer()
    }

    userAssist(e) {
        let elWidth = e.target.clientWidth
        let elHeight = e.target.clientHeight
        
        let canvasWidth = e.target.width
        let canvasHeight = e.target.height
  
        let posX = e.layerX
        let posY = e.layerY
  
        this.lastXY = {
          x: Math.round(posX * (canvasWidth / elWidth)),
          y: Math.round(posY * (canvasHeight / elHeight))
        }
    }

    imageBinarizer() {
      if (this.stopFlag) {
        return
      }

      const frame = this.getFrame()

      const rgba = frame['frameData'];
      const imageWidth = frame['imageWidth'];
      const imageHeight = frame['imageHeight'];
      
      this.workerInstance.postMessage({
        'action': 'binarize',
        'imageWidth': imageWidth,
        'imageHeight': imageHeight,
        'rgba': rgba
      })
    }

    getFrame() {
        const video = this.videoRef;

        const imageWidth = video.videoWidth;
        const imageHeight = video.videoHeight;

        if (imageWidth === 0 || imageHeight === 0) {
          throw new CameraNotReadyError('Camera is not ready')
        }

        const canvas = this.tempCanvas;

        canvas.width = imageWidth;
        canvas.height = imageHeight;

        canvas.getContext("2d").drawImage(video, 0, 0, imageWidth, imageHeight);

        this.tempCanvas = canvas

        return {
            'frameData': canvas.getContext('2d').getImageData(0, 0, imageWidth, imageHeight).data,
            'imageWidth': imageWidth,
            'imageHeight': imageHeight
        }
    }

    getReticleXY(e) {
        // ==============
        // Configuration
        const util = Util
        const binaryImage = e.data['binary']
        const hist = e.data['hist']
        const threshold = e.data['threshold']
  
        let blkThreshSum = 0
        let whtThreshSum = 0
  
        for (let i = 0; i<=255; i++) {
          if (i < threshold) {
            blkThreshSum += hist[i]
          } else {
            whtThreshSum += hist[i]
          }
        }
  
        // if white threshold sum > black threshold sum
        // then black should be salient object
        const salientCriteria = blkThreshSum > whtThreshSum ? 255 : 0;

        // first get XY of pixel in center of image
        const width = binaryImage.width
        const height = binaryImage.height
        const lastXY = (this.lastXY ? this.lastXY :
                        {x: Math.round(width / 2), y: Math.round(height / 2)} )
        
        this.lastXY = lastXY

        // =====================
        // Get Random Salient XY Position
        const salientXYPos = this.stochasticSalientXY(binaryImage, salientCriteria)
        const salientXY = salientXYPos['salientXY']

        this.lastXY = salientXY

        this.callbackOnReticleXY(salientXYPos)
    }

    stochasticSalientXY(imageData, salientCriteria) {
      const util = Util
      const nsThreshold = 0.5
      const ns = new NeighborSaliency(imageData, salientCriteria, nsThreshold)

      const imageWidth = imageData.width
      const imageHeight = imageData.height

      const lastX = util.keepInsideBoundary(this.lastXY['x'], imageWidth).value
      const lastY = util.keepInsideBoundary(this.lastXY['y'], imageHeight).value

      const maxIter = 250
      let iterCount = 0
      
      while(true) {
        iterCount += 1

        const {minX, minY, maxX, maxY} = ns.calcMinMaxBbox(lastX, lastY)

        // if lastXY is good
        // do nothing
        let lastXYSaliency = ns.calcNeighborSaliency(lastX, lastY)
        if (lastXYSaliency && lastXYSaliency.nsRatio >= nsThreshold || iterCount > maxIter) {
          let data = {
            salientXY: lastXYSaliency,
            bbox: {
              minX,
              minY,
              maxX,
              maxY
            }
          }

          return data
        }
        
        let randomXY = []
  
        for (let i = 0; i<100; i++) {
          let x = Math.floor(Math.random() * (maxX - minX) + minX);
          let y = Math.floor(Math.random() * (maxY - minY) + minY);
          randomXY.push({
            x: x,
            y: y
          })
        }

        // Check pixel's neighbor from randomXY
        // if the neighbors is mostly `salient`.
        // if mostly salient add to possibleSalientXY array

        let possibleSalientXY = []

        randomXY.forEach((v, i) => {
          let psxy = ns.calcNeighborSaliency(v.x, v.y)
          if (psxy)
            possibleSalientXY.push(psxy)
        })

        // Check if possibleSalientXY is empty
        // if empty then redo the scan using
        // larger bboxRadius
        if (possibleSalientXY.length !== 0) {
          let salientXY = possibleSalientXY.reduce((p,c) => (p.nsRatio > c.nsRatio) ? p : c, {nsRatio: 0})

          let data = {
            salientXY,
            bbox: {
              minX,
              minY,
              maxX,
              maxY
            }
          }

          return data
        }
      }
    }
}


class NeighborSaliency {

  constructor(imageData, salientCriteria, nsThreshold) {
    
    this.imageData = imageData.data
    this.imageWidth = imageData.width
    this.imageHeight = imageData.height

    this.salientCriteria = salientCriteria
    this.nsThreshold = nsThreshold

    // Default configuration
    this.bboxRadiusModifier = [0.4, 0.35, 0.3, 0.25, 0.2, 0.15];
    this.util = Util
  }

  calcNeighborSaliency(x, y) {
    const util = this.util
    const width = this.imageWidth
    const height = this.imageHeight

    let neighborRadius = 3

    let nminx = x - neighborRadius
    let nminy = y - neighborRadius

    let neighbors = []
    let tempNghbrs = []

    for (let i = 0; i<2*neighborRadius+1; i++) {
      for (let j = 0; j<2*neighborRadius+1; j++) {
        let newX = util.keepInsideBoundary(nminx+i, width).value
        let newY = util.keepInsideBoundary(nminy+j, height).value
        
        if (tempNghbrs.includes(newX+' '+newY))
        break;

        tempNghbrs.push(newX+' '+newY)
        
        neighbors.push({
          x: newX,
          y: newY
        })
      }
    }
    
    let neighborSalientCount = 0
    let neighborsPV = []

    neighbors.forEach((v, i) => {
      let pixelValue = this.imageData[(4 * width * v.y) + (4 * v.x)]
      neighborSalientCount += pixelValue === this.salientCriteria ? 1 : 0
      neighborsPV.push(pixelValue)
    })
    
    if (neighborSalientCount / neighbors.length >= this.nsThreshold) {
      return {
          x: x,
          y: y,
          nsRatio: neighborSalientCount / neighbors.length,
      }
    }
  }

  calcMinMaxBbox(x,y) {
    const util = this.util
    const width = this.imageWidth
    const height = this.imageHeight

    let bboxRadiusModifier = this.bboxRadiusModifier

    let mod = bboxRadiusModifier.length === 0 ? 0.5 : bboxRadiusModifier.pop()
    const bboxRadius = mod * height

    let minX = Math.round(x - bboxRadius)
    let minY = Math.round(y - bboxRadius)
    
    let maxX = Math.round(x + bboxRadius)
    let maxY = Math.round(y + bboxRadius)

    let maxXkib = util.keepInsideBoundary(maxX, width)
    maxX = maxXkib.value
    if (maxXkib.moved) {
      minX -= maxXkib.moved
    }

    let minXkib = util.keepInsideBoundary(minX, width)
    minX = minXkib.value
    if (minXkib.moved) {
      maxX -= minXkib.moved
    }

    let maxYkib = util.keepInsideBoundary(maxY, height)
    maxY = maxYkib.value
    if (maxYkib.moved) {
      minX -= maxYkib.moved
    }

    let minYkib = util.keepInsideBoundary(minY, height)
    minY = minYkib.value
    if (minYkib.moved) {
      maxX -= minYkib.moved
    }

    return {minX, minY, maxX, maxY}
  }
}


export default SalientObjectDetection