const jwt = require('jsonwebtoken');
const multer = require('multer')

const userAuth = async (req, res, next) => {
    if (!req.cookies.blogs_jwt_cookie) {
        return res.status(401).json({ success: false, msg: 'User not logged in / No jwt token detected' })
    }
    const token = req.cookies.blogs_jwt_cookie
    const secret = process.env.JWT_SECRET
    const reqUserID = req.params.user_id
    const updateUserID = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(400).json({ msg: 'first error', error: err })
        }
        return decoded.user_id
    })

    if (reqUserID == updateUserID) {
        req.userAuthorized = true
        next()
    } else {
        req.userAuthorized = false
        next()
    }
}


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')

        if (isValid) {
            uploadError = null
        }

        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.split(' ').join('-')
        const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${filename}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })




module.exports = { userAuth, uploadOptions, FILE_TYPE_MAP }