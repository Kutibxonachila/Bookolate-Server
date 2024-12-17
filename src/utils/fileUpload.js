const createStorage = (uploadPath) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath || "/tmp/my-uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });

const upload = (uploadPath) => multer({ storage: createStorage(uploadPath) });

export default upload;
