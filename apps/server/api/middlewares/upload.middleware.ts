import multer from "multer"

const storage = multer.memoryStorage()

export const invoiceAssetUpload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, callback) => {
    const allowedTypes = ["image/png", "image/jpeg"]

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Only PNG, and JPEG images are allowed"))
    }

    callback(null, true)
  },
}).fields([
  {
    name: "logo",
    maxCount: 1,
  },
  {
    name: "signature",
    maxCount: 1,
  },
])
