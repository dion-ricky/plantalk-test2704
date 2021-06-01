
class SalientObjectDetection {

    constructor(videoRef, tempCanvas) {
        this.videoRef = videoRef
        this.tempCanvas = tempCanvas

        // Default config
        this.stopFlag = false
        this.lastXY = null
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

    getFrame() {
        const video = this.videoRef;

        const imageWidth = video.videoWidth;
        const imageHeight = video.videoHeight;

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

    toBinary(bWorker) {
        if (this.stopFlag) {
          return
        }
  
        const frame = this.getFrame()
  
        const rgba = frame['frameData'];
        const imageWidth = frame['imageWidth'];
        const imageHeight = frame['imageHeight'];
        
        bWorker.postMessage({
          'action': 'binarize',
          'imageWidth': imageWidth,
          'imageHeight': imageHeight,
          'rgba': rgba
        })
  
        bWorker.onmessage = (e) => {
          // TODO: refactor this plz
          // This function shouldn't call inferXYRetPos
          this.inferXYReticlePos(e)
          this.toBinary(bWorker)
        }
    }

    // TODO: Refactor this function
    // change name to getReticleXY
    getReticleXY(e) {
        // =========
        // 1. get salient object color. either 255 or 0
        // 2. set x and y to lastXY or center of image
        // 3. 

        const util = new SODUtil()

        const t0 = performance.now()
        
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
        const salient = blkThreshSum > whtThreshSum ? 255 : 0;
  
        // first get XY of pixel in center of image
        const width = binaryImage.width
        const height = binaryImage.height
        
        // TODO: this.$refs will be null
        const canvas = this.$refs.canvas;
        canvas.width = width
        canvas.height = height
  
        const lastXY = (this.lastXY ? this.lastXY :
                        {x: Math.round(width / 2), y: Math.round(height / 2)} )
        const lastX = util.keepInsideBoundary(lastXY['x'], width).value
        const lastY = util.keepInsideBoundary(lastXY['y'], height).value
        
        // TODO: function is doing too much
        // change name to getSalientXY
        const getSalientXYPos = () => {
          const maxIter = 250
          let iterCount = 0
  
          const neighborSaliencyThreshold = 0.5
  
          const getNeighborSalient = (x, y) => {
            // console.log('gns', x, y)
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
              let pixelValue = getPixelValue(v.x, v.y, width)
              neighborSalientCount += pixelValue === salient ? 1 : 0
              neighborsPV.push(pixelValue)
            })
            
            if (neighborSalientCount / neighbors.length >= neighborSaliencyThreshold) {
              return {
                  x: x,
                  y: y,
                  nsRatio: neighborSalientCount / neighbors.length,
                  // neighbors,
                  // neighborsPV
              }
            }
          }
          
          while(true) {
            iterCount += 1
  
            const {minX, minY, maxX, maxY} = util.getMinMaxBbox()
  
            // if lastXY is good
            // do nothing
            let lastXYSaliency = getNeighborSalient(lastX, lastY)
            if (lastXYSaliency && lastXYSaliency.nsRatio >= neighborSaliencyThreshold || iterCount > maxIter)
              return {
                salientXY: lastXYSaliency,
                bbox: {
                  minX,
                  minY,
                  maxX,
                  maxY
                }
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
              let psxy = getNeighborSalient(v.x, v.y)
              if (psxy)
                possibleSalientXY.push(psxy)
              // console.log('nghb', v, neighbors)
            })
  
            if (possibleSalientXY.length !== 0) {
              return {
                salientXY: util.getMaxNSRatio(possibleSalientXY),
                bbox: {
                  minX,
                  minY,
                  maxX,
                  maxY
                }
              }
            }
  
            // Check if possibleSalientXY is empty
            // if empty then redo the scan using
            // larger bboxRadius
          }
        }
        
        const salientXYPos = getSalientXYPos()
        const salientXY = salientXYPos['salientXY']
        const {minX, minY, maxX, maxY} = salientXYPos.bbox
  
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = "#FF0000"
        ctx.strokeStyle = "#FF0000"
  
        // change this x and y
        let rectRadius = 10
        ctx.fillRect(salientXY['x']-rectRadius, salientXY['y']-rectRadius,
                     rectRadius*2, rectRadius*2)
  
        ctx.strokeRect(minX, minY, maxX-minX, maxY-minY)
        
        this.lastXY = salientXY
  
        const t1 = performance.now()
        // console.log('xy', salientXY)
        // console.log('min', minX, minY)
        // console.log('max', maxX, maxY)
        
        // console.log('t', t1 - t0)
        // console.log('blk', blkThreshSum)
        // console.log('wht', whtThreshSum)
        // console.log('bi', binaryImage)
    }
}


class SODUtil {
  
  constructor() {
    
    // Default configuration
    this.bboxRadiusModifier = [0.4, 0.35, 0.3, 0.25, 0.2, 0.15];
  }
  
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

  getMinMaxBbox() {
    let bboxRadiusModifier = this.bboxRadiusModifier

    let mod = bboxRadiusModifier.length === 0 ? 0.5 : bboxRadiusModifier.pop()
    const bboxRadius = mod * height

    // console.log('bboxmod', mod)

    let minX = Math.round(lastX - bboxRadius)
    let minY = Math.round(lastY - bboxRadius)
    
    let maxX = Math.round(lastX + bboxRadius)
    let maxY = Math.round(lastY + bboxRadius)

    let maxXkib = SODUtil.keepInsideBoundary(maxX, width)
    maxX = maxXkib.value
    if (maxXkib.moved) {
      minX -= maxXkib.moved
    }

    let minXkib = SODUtil.keepInsideBoundary(minX, width)
    minX = minXkib.value
    if (minXkib.moved) {
      maxX -= minXkib.moved
    }

    // let kibX = util.keepInsideBoundary(maxX, width)
    // minX -= kibX.moved
    // maxX = kibX.value

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

    // let kibY = util.keepInsideBoundary(maxY, height)
    // minY -= kibY.moved
    // maxY = kibY.value

    // console.log('min', minX, minY)
    // console.log('max', maxX, maxY)

    return {minX, minY, maxX, maxY}
  }

  // TODO: seems useless, cuma dipanggil sekali doang nih
  getPixelValue(x, y, width) {
    let pixelIndex = (4 * width * y) + (4 * x)

    // TODO: ini binaryImage dapet darimana woy lah wkwk
    return binaryImage.data[pixelIndex]
  }

  getMaxNSRatio = (psxy) => {
    // console.log(psxy)
    let tempMax = {x: 0, y: 0, nsRatio: 0}
    psxy.forEach((v, i) => {
      tempMax = v.nsRatio > tempMax.nsRatio ? v : tempMax
    })

    return tempMax
  }
}

export default SalientObjectDetection