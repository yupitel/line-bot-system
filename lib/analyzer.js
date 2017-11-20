'use strict';

const Config  = require('../config');

const CH_SECRET       = Config.CH_SECRET;
const CH_ACCESS_TOKEN = Config.CH_ACCESS_TOKEN;
const MessageUtil     = require('../line-messaging-utility/index');
const MessageDicts    = require('../dicts/message');
const MessageRecipe   = require('../dicts/recipe');

const EventType       = MessageUtil.EventType;
const MessageType     = MessageUtil.MessageType;

const Analyzer = {
  debug  : false,
  rootUri: null,

  end: (res) => {
    res.set('Content-Type', 'text/plain');
    res.end();
  },

  getMessage: (event) => {
    if (!event) {
      return null;
    }
    if (event.type === EventType.message) {
      if (event.message && event.message.type === MessageType.text && event.message.text) {
        return event.message.text;
      }
    } else if  (event.type === EventType.postback) {
      if (event.postback && event.postback.data) {
        return event.postback.data;
      }
    } 
    return null;
  },

  getSubject: (message) => {
    console.log('subject');
    console.log(message);
    if (!message || message.length === 0) {
      return null;
    }
    const dicts = MessageDicts.Subject;
    if (!dicts) {
      return null;
    }
    let subject = MessageDicts.DefaultSubject;
    const keys = Object.keys(dicts);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!key || key.length === 0) {
        continue;
      }
      if (message.includes(key)) {
        subject = dicts[key];
        break;
      }
    }
    return subject;
  },

  getPredicate: (message, subject) => {
    if (!message || message.length === 0) {
      return null;
    }
    if (!subject || subject.length === 0) {
      return null;
    }
    const dicts = MessageDicts.Predicate;
    if (!dicts) {
      return null;
    }
    const use = dicts[subject];
    if (!use) {
      return null;
    }
    let predicate = null;
    const keys = Object.keys(use);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!key || key.length === 0) {
        continue;
      }
      if (message.includes(key)) {
        predicate = dicts[key];
        break;
      }
    }
    return predicate;
  },

  analyze: (events) => {
    return new Promise((resolve, reject) => {
      console.log('start analysis');
      // get subject and predicate
      for (let i = 0; i < events.length; i++) {
        const event   = events[i];
        if (!event) {
          continue;
        }

        const message = Analyzer.getMessage(event);
        if (!message || message.length === 0) {
          continue;
        }

        const subject = Analyzer.getSubject(message);
        event.subject = subject;
        if (subject) {
          const predicate = Analyzer.getPredicate(message, subject);
          event.predicate = predicate;
        }
      }
      console.log(events);
      resolve(events);
    });
  },

  save: (events) => {
    return new Promise((resolve, reject) => {
      console.log('save');
      console.log(events);
      resolve(events);
    });
  },
  
  resource: (events) => {
    return new Promise((resolve, reject) => {
      if (!events || events.length === 0) {
        resolve(events);
        return;
      }
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const subject = event.subject;
        let recipe  = null;  // MessageRecipe.menu;
        if (subject) {
          recipe = MessageRecipe[subject];
        }
        event.recipe = recipe;
      }
      console.log('res');
      console.log(events);
      resolve(events);
    });
  },
  
  messaging: (events) => {
    console.log('messaging');
    console.log(events);
    return Promise.all(events.map((event) => {
      const recipe     = event.recipe;
      const replyToken = event.replyToken;

      if (recipe
        && replyToken !== '00000000000000000000000000000000'
        && replyToken !== 'ffffffffffffffffffffffffffffffff') {
        const message    = recipe.message;

        const messaging = new MessageUtil(CH_SECRET, CH_ACCESS_TOKEN);
        messaging.reply(replyToken, message)
        .then((body) => {
          console.log(body);
        })
        .then(() => {
          return event;
        });
      } else {
        console.log('is debug');
        return event;
      }
    }))
    .then((values) => {
      console.log('values');
      console.log(values);
      return values;
    });
  },
  
  action: (req, res, next) => {
    console.log('start action');
    const data = req.data;
    console.log(JSON.stringify(data));
    if (!data) {
      Analyzer.end(res);
      return;
    }
    
    // const messaging = new MessageUtil(CH_SECRET, CH_ACCESS_TOKEN);

    // get events
    const events = MessageUtil.getEventObjects(data);
    if (!events) {
      Analyzer.end(res);
      return;
    }

    console.log('event check');
    console.log(events);
    // analyze, save to db, action, prepare for reply and reply for each events.
    Promise.resolve(events)
    .then(Analyzer.analyze)  // analyze event and set next action
    .then(Analyzer.save)  // store data if needed.
    .then(Analyzer.resource)  // get resource for action
    .then(Analyzer.messaging)  // send message for action
    .then((events) => {
      console.log('end');
      Analyzer.end(res);
    });
  }
};

module.exports = Analyzer;
