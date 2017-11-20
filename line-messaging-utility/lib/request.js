'use strict';

const request     = require('request');
const format      = require('string-template');
const API         = require('./constants/api');


const ApiRequest = {
  request: function (uri, method, token, signature, body, key) {
    const send = JSON.stringify(body) || null;
    let requri = uri;
    if (key) {
      requri = format(uri, key);
    }

    const options = {
      uri    : requri,
      method : method,
      headers: {
        'Content-Type'    : 'application/json; charset=UTF-8',
        'X-Line-Signature': signature,
        'Authorization'   : `Bearer ${token}`
      }
    };
    if (method === 'POST') {
      options.body = send;
      options.headers['Content-Length'] =  Buffer.byteLength(send);
    }

    console.log(options);
    return new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        if (res.statusCode !== 200) {
          //console.log(res);
          const err = new Error('invalid status code');
          err.statusCode = res.statusCode;
          console.log(err);
          reject(err);
          return;
        }
        console.log('request success');
        console.log(body);
        resolve(body);
      });
    });
  },
  reply: function (token, signature, reply, messages) {
    const conf = API.REPLY;
    const body = {};
    body.replyToken = reply;
    body.messages   = messages;
    console.log('reply');
    console.log(reply);
    console.log(messages);

    return ApiRequest.request(conf.uri, conf.method, token, signature, body);
  },
  push: function (token, signature, to, messages) {
    const conf = API.PUSH;
    const body = {};
    body.to       = to;
    body.messages = messages;

    return ApiRequest.request(conf.uri, conf.method, token, signature, body);
  },
  multicast: function (token, signature, to, messages) {
    const conf = API.MULTICAST;
    const body = {};
    body.to       = to;
    body.messages = messages;

    return ApiRequest.request(conf.uri, conf.method, token, signature, body);
  },
  content: function (token, signature, params) {
    const conf = API.CONTENT;

    return ApiRequest.request(conf.uri, conf.method, token, signature, null, params);
  },
  profile: function (token, signature, params) {
    const conf = API.PROFILE;

    return ApiRequest.request(conf.uri, conf.method, token, signature, null, params);
  }
};

module.exports = ApiRequest;
