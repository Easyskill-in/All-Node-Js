const multer = require("multer")
const path = require("path")


const Mystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "Uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})


const upload = multer({ storage: Mystorage })

module.exports = upload