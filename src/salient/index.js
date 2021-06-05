const Util = {
  keepInsideBoundary(xy, cd, sd) {
    const cw = cd.w
    const ch = cd.h
    const sw = sd.w
    const sh = sd.h

    let x = xy.x
    let y = xy.y

    // w - 1 to prevent x to exactly match the boundary
    // x can go negative or go beyond w (limit)
    // prevent both behavior
    let newX = x
    let newY = y
    let xmoved = 0
    let ymoved = 0

    const wi = cw>sw ? Math.floor((cw-sw)/2) : 0
    const hi = ch>sh ? Math.floor((ch-sh)/2) : 0

    // Prevent x to go below zero
    if (x !== null && x < 0) {
      newX = 0
      xmoved = -x // Return positive value for positive movement
    }
    // Prevent y to go below zero
    if (y !== null && y < 0) {
      newY = 0
      ymoved = -y
    }

    // Enforce   x >= wi
    if (x < wi) {
      newX = wi
      xmoved = wi - x
    }
    // Enforce   x <= wi + sw
    if (x > wi+sw) {
      newX = wi+sw
      xmoved = (wi+sw) - x
    }

    // Enforce   y >= hi
    if (y < hi) {
      newY = hi
      ymoved = hi - y
    }
    // Enforce   y <= hi + sh
    if (y > hi+sh) {
      newY = hi+sh
      ymoved = (hi+sh) - y
    }

    return {
      value: [newX, newY],
      moved: [xmoved, ymoved]
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
      this.viewport = cfg.viewport

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

      // Get reticle XY position
      this.getReticleXY(msg)

      const t1 = this.performance.now()

      // Add dynamic delay to match preferred FPS
      const totalTime = msg.data.totalTime + (t1-t0)
      const fps = Math.floor(1000/totalTime)
      const preferredFPS = 2

      const delay = fps < preferredFPS ? (1000/fps) : ((1000/preferredFPS) - totalTime)

      // console.log('FPS: ', fps < preferredFPS ? fps : preferredFPS)
      // console.log('delay: ', delay)
      await this.sleep(delay)
      this.imageBinarizer()
    }

    userAssist(e) {
        let elWidth = e.target.clientWidth
        let elHeight = e.target.clientHeight
        
        let posX = e.layerX
        let posY = e.layerY

        this.lastXY = {
          x: Math.round(posX),
          y: Math.round(posY)
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
        const cw = binaryImage.width
        const ch = binaryImage.height
        const sw = this.viewport[0]
        const sh = this.viewport[1]

        const wi = cw>sw ? (cw-sw)/2 : 0
        const hi = ch>sh ? (ch-sh)/2 : 0

        const wratio = cw/sw
        const hratio = ch/sh

        const lastXY = (this.lastXY ? this.lastXY :
                        {x: Math.round(cw / 2), y: Math.round(ch / 2)} )
        
        this.lastXY = lastXY

        // =====================
        // Get Random Salient XY Position
        const salientXYPos = this.stochasticSalientXY(binaryImage, salientCriteria)

        // apply x,y ratio
        const xmod = (x) => {
          return ch<sh ? x-wi : x/wratio;
        }
        const ymod = (y) => {
          return ch<sh ? y/hratio : y-hi;
        }

        salientXYPos.salientXY.x = xmod(salientXYPos.salientXY.x)
        salientXYPos.salientXY.y = ymod(salientXYPos.salientXY.y)

        this.lastXY = salientXYPos['salientXY']

        this.callbackOnReticleXY(salientXYPos)
    }

    stochasticSalientXY(imageData, salientCriteria) {
      const util = Util
      const nsThreshold = 0.5
      const ns = new NeighborSaliency(imageData, salientCriteria, nsThreshold, this.viewport)

      const imageWidth = imageData.width
      const imageHeight = imageData.height
      const sw = this.viewport[0]
      const sh = this.viewport[1]

      let lastXY = util.keepInsideBoundary({
        x: this.lastXY['x'],
        y: this.lastXY['y']
      }, {w: imageWidth, h: imageHeight}, {w: sw, h: sh})

      const lastX = lastXY.value[0]
      const lastY = lastXY.value[1]

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

  constructor(imageData, salientCriteria, nsThreshold, viewport) {
    
    this.imageData = imageData.data
    this.imageWidth = imageData.width
    this.imageHeight = imageData.height

    this.viewportWidth = viewport[0]
    this.viewportHeight = viewport[1]
    // console.log('ns', viewport)

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
        const newXY = util.keepInsideBoundary({
          x: nminx+i,
          y: nminy+j
        },{w: width, h: height}, {w: this.viewportWidth, h: this.viewportHeight})
        let newX = newXY.value[0]
        let newY = newXY.value[1]
        
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

    let max = util.keepInsideBoundary({
      x: maxX,
      y: maxY
    },{w: width, h: height}, {w: this.viewportWidth, h: this.viewportHeight})

    // console.log('ccmbx', max)

    maxX = max.value[0]
    minX += max.moved[0]

    maxY = max.value[1]
    minY += max.moved[1]

    let min = util.keepInsideBoundary({
      x: minX,
      y: minY
    },{w: width, h: height}, {w: this.viewportWidth, h: this.viewportHeight})
    
    minX = min.value[0]
    maxX += min.moved[0]

    minY = min.value[1]
    maxY += min.moved[1]

    return {minX, minY, maxX, maxY}
  }
}


export default SalientObjectDetection