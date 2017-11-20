'use strict';

const API = {
  REPLY: {
    uri   : 'https://api.line.me/v2/bot/message/reply',
    method: 'POST'
  },
  PUSH: {
    uri   : 'https://api.line.me/v2/bot/message/push',
    method: 'POST'
  },
  MULTICAST: {
    uri   : 'https://api.line.me/v2/bot/message/multicast',
    method: 'POST'
  },
  CONTENT: {
    uri   : 'https://api.line.me/v2/bot/message/{messageId}/content',
    method: 'GET'
  },
  PROFILE: {
    uri   : 'https://api.line.me/v2/bot/profile/{userId}',
    method: 'GET',
    key   : {
      userId: null
    }
  },
  LEAVE_GROUP: {
    uri   : 'https://api.line.me/v2/bot/group/{groupId}/leave',
    method: 'POST'
  },
  LEAVE_ROOM: {
    uri   : 'https://api.line.me/v2/bot/room/{roomId}/leave',
    method: 'POST'
  }
};

module.exports = API;
