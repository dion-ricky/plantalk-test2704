
const crypto = require('crypto');
  
// Generate Digest
function generateDigest(jsonBody) {
    let jsonStringHash256 = crypto.createHash('sha256').update(jsonBody,"utf-8").digest();
    
    let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    return bufferFromJsonStringHash256.toString('base64'); 
}
 
function generateSignature(clientId, requestId, requestTimestamp, requestTarget, digest, secret) {
    // Prepare Signature Component
    // console.log("----- Component Signature -----")
    let componentSignature = "Client-Id:" + clientId;
    componentSignature += "\n";
    componentSignature += "Request-Id:" + requestId;
    componentSignature += "\n";
    componentSignature += "Request-Timestamp:" + requestTimestamp;
    componentSignature += "\n";
    componentSignature += "Request-Target:" + requestTarget;
    // If body not send when access API with HTTP method GET/DELETE
    if (digest) {
        componentSignature += "\n";
        componentSignature += "Digest:" + digest;
    }
 
    // console.log(componentSignature.toString());
    // console.log();

    // Calculate HMAC-SHA256 base64 from all the components above
    let hmac256Value = crypto.createHmac('sha256', secret)
                   .update(componentSignature.toString())
                   .digest();  
      
    let bufferFromHmac256Value = Buffer.from(hmac256Value);
    let signature = bufferFromHmac256Value.toString('base64');
    // Prepend encoded result with algorithm info HMACSHA256=
    return "HMACSHA256="+signature 
}
 
// Sample of Usage

// Generate Digest from JSON Body, For HTTP Method GET/DELETE don't need generate Digest
// console.log("----- Digest -----");
// let jsonBody = '{"name": "john doe"}';
// let digest = generateDigest(jsonBody);
// console.log(digest);
// console.log();
  
// Generate Header Signature
// let headerSignature = generateSignature(
//         "yourClientId",
//         "yourRequestId",
//         "2020-10-21T03:38:28Z",
//         "/request-target/goes-here",
//         digest, // Set empty string for this argumentes if HTTP Method is GET/DELETE
//         "secret-key-from-jokul-back-office")
// console.log("----- Header Signature -----")
// console.log(headerSignature)

function getTimestampforDoku() {
    return new Date().toISOString()
}

module.exports = {
    generateDigest,
    generateSignature,
    getTimestampforDoku
}