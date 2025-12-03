const multer = require("multer");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    console.log("fileName", fileName);
    cb(null, fileName);
  },
});
const fileFilter = function (req, file, cb) {
  const fileType = file.mimetype.split("/")[0];
  {
    if (fileType === "image") {
      cb(null, true);
    } else {
      cb(appError.create("inavlid file type", 400, responsStatus.FAILED));
    }
  }
};
const upload = multer({ storage: storage, fileFilter });
module.exports = upload;
