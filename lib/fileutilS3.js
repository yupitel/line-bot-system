//
// FileUtilS3
//

const mime = require('mime-types');
const AWS  = require('aws-sdk');

const path = `${__dirname}/../config/awsconfig.json`;
AWS.config.loadFromPath(path);

const s3 = new AWS.S3();
const BUCKET = 'qfoori-dev';

const FileUtilS3 = {
  createReadstream: function (bucket = BUCKET, key) {
    const params = { Bucket: bucket, Key: key };
    return s3.getObject(params).createReadStream();
  },
  read: function (bucket = BUCKET, key) {
    return new Promise((resolve, reject) => {
      const params = { Bucket: bucket, Key: key };
      s3.getObject(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(data);
        resolve(data);
      });
    });
  },
  write: function (bucket = BUCKET, key, body) {
    return new Promise((resolve, reject) => {
      if (!key || key.length === 0 || !body) {
        return;
      }
      console.log(key);
  
      const params = { Bucket: bucket, Key: key, Body: body, ACL: 'public-read' };
      const mimetype = mime.lookup(key);
      if (mimetype) {
        params.ContentType = mimetype;
      }
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  },
  delete: function (bucket = BUCKET, key, cb) {
    return new Promise((resolve, reject) => {
      if (!key || key.length === 0) {
        return;
      }

      const params = { Bucket: bucket, Key: key };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
};

module.exports = FileUtilS3;

