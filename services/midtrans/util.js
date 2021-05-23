
function b64encode(str) {
    return Buffer.from(str).toString('base64')
}

function b64decode(b64) {
    return Buffer.from(b64, 'base64').toString('ascii')
}

module.exports = {
    b64encode, b64decode
}