'use strict';

const ErrorCode = require('./constants/errorcode');

const MessageFactory = {

  createTextMessage: (text) => {
    if (!text) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'text' };
    obj.text = text;
    return obj;
  },
  createImageMessage: (origin, preview) => {
    if (!origin || !preview || origin.length === 0 || preview.length === 0) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'image' };
    obj.originalContentUrl = origin;
    obj.previewImageUrl    = preview;
    return obj;
  },
  createVideoMessage: (origin, preview) => {
    if (!origin || !preview || origin.length === 0 || preview.length === 0) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'video' };
    obj.originalContentUrl = origin;
    obj.previewImageUrl    = preview;
    return obj;
  },
  createAudioMessage: (content, duration) => {
    if (!content || !duration || content.length === 0) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'audio' };
    obj.originalContentUrl = content;
    obj.duration           = duration;
    return obj;
  },
  createLocationMessage: (title, address, latitude, longitude) => {
    if (!title || !address || !latitude || !longitude) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'location' };
    obj.title     = title;
    obj.address   = address;
    obj.latitude  = latitude;
    obj.longitude = longitude;
    return obj;
  },
  createStickerMessage: (packageId, stickerId) => {
    if (!packageId || !stickerId) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'sticker' };
    obj.packageId = packageId;
    obj.stickerId = stickerId;
    return obj;
  },
  createImagemap: () => {
    const err = new Error('invalid input');
    err.errorcode = ErrorCode.fail;
    throw err;
  },
  createTemplateMessage: (altText, template) => {
    if (!altText || !template) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'template' };
    obj.altText  = altText;
    obj.template = template;
    return obj;
  },
  createTemplateButtons: (imageUrl, title, text, actions) => {
    if (!text || !actions) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    if (actions.length > 4) {
      const err = new Error('actions length is out of range');
      err.errorcode = ErrorCode.outofrange;
      throw err;
    }
    const obj = { type: 'buttons' };
    if (imageUrl && imageUrl.length > 0) {
      obj.thumbnailImageUrl = imageUrl;
    }
    if (title && title.length > 0) {
      obj.title             = title;
    }
    obj.text              = text;
    obj.actions           = actions;
    return obj;
  },
  createTemplateConfirm: (text, actions) => {
    if (!text || !actions) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    if (actions.length !== 2) {
      const err = new Error('actions length is out of range');
      err.errorcode = ErrorCode.outofrange;
      throw err;
    }
    const obj = { type: 'confirm' };
    obj.text    = text;
    obj.actions = actions;
    return obj;
  },
  createTemplateCarousel: (columns) => {
    if (!columns) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    if (columns.length > 5) {
      const err = new Error('columns length is out of range');
      err.errorcode = ErrorCode.outofrange;
      throw err;
    }
    const obj = { type: 'carousel' };
    obj.columns = columns;
    return obj;
  },
  createColumn: (imageUrl, title, text, actions) => {
    if (!text || !actions) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    if (actions.length > 3) {
      const err = new Error('actions length is out of range');
      err.errorcode = ErrorCode.outofrange;
      throw err;
    }
    const obj = {};
    if (imageUrl && imageUrl.length > 0) {
      obj.thumbnailImageUrl = imageUrl;
    }
    if (title && title.length > 0) {
      obj.title             = title;
    }
    obj.text              = text;
    obj.actions           = actions;
    return obj;
  },
  createPostbackAction: (label, data, text) => {
    if (!label || !data) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'postback' };
    obj.label = label;
    obj.data  = data;
    if (text && text.length > 0) {
      obj.text  = text;
    }
    return obj;
  },
  createMessageAction: (label, text) => {
    if (!label || !text) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'message' };
    obj.label = label;
    obj.text  = text;
    return obj;
  },
  createURIAction: (label, uri) => {
    if (!label || !uri) {
      const err = new Error('invalid input');
      err.errorcode = ErrorCode.invalidinput;
      throw err;
    }
    const obj = { type: 'uri' };
    obj.label = label;
    obj.uri   = uri;
    return obj;
  }

};


module.exports = MessageFactory;
