const AWS = require("aws-sdk");

const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;

const s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

async function upload(file) {
  debugger
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  await s3bucket.upload(params).promise()
  .catch((err) => {
    throw err;
  });

  return {
    fileLink: s3FileURL + file.originalname,
    s3_key: params.Key,
  };
}

function destroy(key) {
  debugger
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  }
  debugger
  s3bucket.deleteObject(params).promise()
  .catch((err) => {
    throw err;
  });
}

module.exports = {
  upload,
  destroy
}