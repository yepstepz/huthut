import multer from 'multer'

export const config = {
    api: {
        bodyParser: false,
    },
}

const tmpStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/tmp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

var tmpUpload = multer({ storage: tmpStorage })

export default async (req, res) => {

    const {
        query: { name }
    } = req

    tmpUpload.array(name)(req, {}, err => {
        // do error handling here
        console.log({ err }) // do something with the files here
    })

    res.status(200).send({})
}
