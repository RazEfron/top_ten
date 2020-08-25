const multer = require("multer");
const path = require("path");

// Setup Multer Storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

module.exports = {
  storage,
  upload,
};
