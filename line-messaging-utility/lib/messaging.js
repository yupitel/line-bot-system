'use strict';

const crypto  = require('crypto');
const request = require('./request');
const EventType   = require('./constants/eventtype');
const MessageType = require('./constants/messagetype');

class MessagingApi {
  constructor(secret, token) {
    if (!secret || !token) {
      return;
    }
    this.secret    = secret;
    this.token     = token;
    this.signature = crypto.createHmac('sha256', secret);
  }

  static getEventObjects(data) {
    if (!data || !data.events) {
      return null;
    }
    const events = data.events;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (!event) {
        continue;
      }
      // overwrite event type with constants for change of api spec
      if (event.type && EventType[event.type]) {
        event.type = EventType[event.type];
      }
      if (event.message && event.message.type && MessageType[event.message.type]) {
        event.message.type = MessageType[event.message.type];
      }
    }
    return events;
  }

  reply(replytoken, messages) {
    console.log(this.token);
    return request.reply(this.token, this.signature, replytoken, messages);
  }

  push(to, messages) {
    console.log(this.token);
    return request.push(this.token, this.signature, to, messages);
  }

  multicast(to, messages) {
    return request.multicast(this.token, this.signature, to, messages);
  }

  content(params) {
    return request.content(this.token, this.signature, params);
  }

  profile(params) {
    return request.profile(this.token, this.signature, params);
  }
}

module.exports = MessagingApi;
