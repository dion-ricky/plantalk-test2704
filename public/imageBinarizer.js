
onmessage = (e) => {
    if (e.data['action'] === 'binarize') {
        const imageWidth = e.data['imageWidth']
        const imageHeight = e.data['imageHeight']
        const rgba = e.data['rgba']

        const grayscale = toGrayscale(imageWidth, imageHeight, rgba)
        const hist = grayscale['hist']
        const grayscaleImage = grayscale['grayscale']

        const binary = toBinary(imageWidth, imageHeight, hist, grayscaleImage.data)

        postMessage({
            'binary': binary['binarized'],
            'grayscale': grayscaleImage,
            'hist': hist,
            'threshold': binary['threshold'],
            'totalTime': grayscale['time'] + binary['time']
        })
    }
}

function toGrayscale(imageWidth, imageHeight, rgba) {
    const t0 = performance.now()

    const totalPixel = imageWidth * imageHeight

    let grayArr = []
    let hist = []
    hist.length = 256
    hist.fill(0)

    for (let pixel = 0; pixel < totalPixel; pixel++) {
     
        let pixelIndex = 4 * pixel
        let r, g, b, a, y = 0
     
        r = rgba[0 + pixelIndex]
        g = rgba[1 + pixelIndex]
        b = rgba[2 + pixelIndex]
        a = rgba[3 + pixelIndex]

        y = Math.round((0.299 * r) + (0.587 * g) + (0.114 * b))
        r = g = b = y
        hist[y] = hist[y] + 1

        grayArr.push(r, g, b, a)
    }

    const grayscaleImageData = new ImageData(Uint8ClampedArray.from(grayArr), imageWidth)

    const t1 = performance.now()
    
    return {
        'grayscale': grayscaleImageData,
        'time': (t1 - t0),
        'hist': hist
    }
}

function toBinary(imageWidth, imageHeight, hist, grayscale) {
    const t0 = performance.now()
    const totalPixel = imageWidth * imageHeight

    let threshold = otsu(hist, totalPixel)
    
    let binaryArr = []

    for (let pixel = 0; pixel < totalPixel; pixel++) {

        let pixelIndex = 4 * pixel
        let r, g, b, a, y = 0
        // let a = 255 // Set all alpha to 255

        r = grayscale[0 + pixelIndex]
        a = grayscale[3 + pixelIndex]

        y = r <= threshold ? 0 : 255
        r = g = b = y

        binaryArr.push(r, g, b, a)
    }

    const binarized = new ImageData(Uint8ClampedArray.from(binaryArr), imageWidth)
    const t1 = performance.now()

    return {
        'binarized': binarized,
        'threshold': threshold,
        'time': (t1 - t0)
    }
}

function otsu(histData, total) {
    let sum = 0;
    for (let t = 0; t < 256; t++) sum += t * histData[t];

    let sumB = 0;
    let wB = 0;
    let wF = 0;

    let varMax = 0;
    let threshold = 0;

    for (let t = 0; t < 256; t++) {
        wB += histData[t];               // Weight Background
        if (wB == 0) continue;

        wF = total - wB;                 // Weight Foreground
        if (wF == 0) break;

        sumB += t * histData[t];

        let mB = sumB / wB;            // Mean Background
        let mF = (sum - sumB) / wF;    // Mean Foreground

        // Calculate Between Class Variance
        let varBetween = wB * wF * (mB - mF) * (mB - mF);

        // Check if new maximum found
        if (varBetween > varMax) {
            varMax = varBetween;
            threshold = t;
        }
    }

    return threshold;
}