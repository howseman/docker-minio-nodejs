'use strict'
const AWS = require('aws-sdk');

function uploadTestFile(bucketName, fileName, fileContent) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.MINIO_ROOT_USER,
    secretAccessKey: process.env.MINIO_ROOT_PASSWORD,
    endpoint: process.env.MINIO_ENDPOINT,
    s3ForcePathStyle: true, // needed with minio?
    signatureVersion: 'v4',
  });

  let params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent,
  };

  return s3.putObject(params).promise();

  // getObject operation.
  
  // params = { Bucket: 'testbucket', Key: 'testobject' };
  
  // var file = require('fs').createWriteStream('/tmp/mykey');
  
  // s3.getObject(params).
  //   on('httpData', function (chunk) { file.write(chunk); }).
  //   on('httpDone', function () { file.end(); }).
  //   send();
}

module.exports = {
  uploadTestFile
}
