const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config/dev");

aws.config.update({
  secretAccessKey: config.AWS_SECRET_KEY,
  accessKeyId: config.AWS_ACCESS_KEY,
  region: "us-east-2"
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPG and PNG is allowed!"), false);
  }
};

var upload = multer({
  storage: multerS3({
    fileFilter,
    s3,
    bucket: "bookwithangular",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
