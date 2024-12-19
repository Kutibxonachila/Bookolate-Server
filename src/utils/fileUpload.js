import multer from "multer";
import path from "path";

const createStorage = (uploadPath) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath || "uploads/"); // Ensure "uploads/" exists
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

const upload = multer({
  storage: createStorage("uploads/"),
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, and .jpeg formats are allowed!"));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
});

export default upload;
