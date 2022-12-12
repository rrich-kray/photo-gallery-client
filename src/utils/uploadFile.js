const aws = require("aws-sdk");
const axios = require("axios");

// I can either upload the file directly from the client, or include this logic in the server.
// For former, I will have to modify the logic below so that the file is properly renamed to conform with SQL Database.
// Latter is simpler implementation but greater strain on server resources.

// import credentials from a .env file
require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Create new instance of s3 bucket, get signed url, upload image to bucket
module.exports.uploadFile = function (file) {
  const s3 = new aws.S3();

  const params = {
    bucket: process.env.AWS_BUCKET,
    Key: file.name,
    expires: 60,
    ContentType: file.type,
  };

  // Get signed URL, then use that URL in an axios request in callback
  s3.getSignedUrl("putObject", params, (err, signedUrl) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(signedUrl);

      // Make axios request
      axios
        .put(signedUrl, file)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

      return signedUrl;
    }
  });
};
