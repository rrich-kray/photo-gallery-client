const aws = require("aws-sdk");

// import environment variables
require("dotenv").config();

module.exports.getFile = async function (filename, username) {
  const s3Obj = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  });

  return s3Obj.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
  });
};
