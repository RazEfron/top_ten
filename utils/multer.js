const multer = require("multer");
const path = require("path");

// Setup Multer Storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        debugger
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage
}).single('image')

module.exports = {
    storage,
    upload
}