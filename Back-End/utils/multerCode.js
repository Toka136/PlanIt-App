const multer = require("multer");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
const { CloudinaryStorage } =require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:"planIt-app",
    format:async(req,file)=>{
      const ext=file.mimetype.split("/")[1]
      return ext
    },
    public_id:(req,file)=>{
      return `user-${ Date.now()}`
    }
  }

})
// const fileFilter = function (req, file, cb) {
//   const fileType = file.mimetype.split("/")[0];
//   {
//     if (fileType === "image") {
//       cb(null, true);
//     } else {
//       cb(new appError("inavlid file type", 400, responsStatus.FAILED));
//     }
//   }
// };
const upload = multer({ storage: storage });
module.exports = upload;
