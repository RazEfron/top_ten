const multer = require('multer')

function getImageObject(imageData) {
  debugger
  return {
    data: imageData,
    contentType: "image/png",
  };
}

module.exports = {
    getImageObject
}