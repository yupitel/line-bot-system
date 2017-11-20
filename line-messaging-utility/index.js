'use strict';

const messaging    = require('./lib/messaging');
const eventtype    = require('./lib/constants/eventtype');
const messagetype  = require('./lib/constants/messagetype');
const templatetype = require('./lib/constants/templatetype');

module.exports = messaging;
module.exports.EventType    = eventtype;
module.exports.MessageType  = messagetype;
module.exports.TemplateType = templatetype;
