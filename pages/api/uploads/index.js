import multer from "multer"

export const config = {
  api: {
    bodyParser: false,
  },
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

var tmpStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/tmp")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

var upload = multer({ storage })
var tmpUpload = multer({ storage: tmpStorage })

export default (req, res) => {
  const {
    query: { multiple }
  } = req

  if (multiple) {
    tmpUpload.array("image_urls", 10)(req, {}, err => {
      // do error handling here
      console.log(err) // do something with the files here
    })
  } else {
    upload.array("main_image_url", 10)(req, {}, err => {
      // do error handling here
      console.log(err) // do something with the files here
    })
  }
  res.status(200).send({})
}