function getImageObject(imageData) {
  return {
    data: imageData,
    contentType: "image/png",
  };
}

module.exports = {
    getImageObject
}