'use strict';

const MessageType = require('../line-messaging-utility/index').MessageType;
const TemplateType = require('../line-messaging-utility/index').TemplateType;

const Recipe = {
  menu  : {
    message: [
      { type: MessageType.text, text: 'こんにちは！どんな御用でしょうか？' },
      {
        type: MessageType.template,
        altText: 'どんな御用でしょう？番号を選んでご返信ください。1. About\n2. History\n3. Skill',
        template: {
          type: TemplateType.Buttons,
          title: 'Menu',
          text: 'やりたいことを選んでください',
          actions: [
            {
              type : 'postback',
              label: 'About',
              data : 'AboutMessage'
            },
            {
              type : 'postback',
              label: 'History',
              data : 'HistoryMessage'
            },
            {
              type : 'postback',
              label: 'Skill',
              data : 'SkillMessage'
            }
          ]
        }
      }
    ]
  },
  about: {
    message: [
      { type: MessageType.text, text: '簡単な自己紹介になります。知りたいことを選んでください。' },
      {
        type: MessageType.template,
        altText: '番号を選んでご返信ください。1. Profile\n2. Favorite\n3. Main menu.',
        template: {
          type: TemplateType.Buttons,
          title: 'Menu',
          text: '知りたいことを選んでください',
          actions: [
            {
              type : 'postback',
              label: 'Profile',
              data : 'ProfileMessage'
            },
            {
              type : 'postback',
              label: 'Favorite',
              data : 'FavoriteMessage'
            },
            {
              type : 'postback',
              label: 'How to make this?',
              data : 'ToolMessage'
            },
            {
              type : 'postback',
              label: 'Back',
              data : 'BackMessage'
            }
          ]
        }
      }
    ]
  },
};


module.exports = Recipe;

