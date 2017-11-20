'use strict';

const Action = {
  Menu   : 'menu',
  About  : 'about',
  History: 'history',
  Skill  : 'skill',
  Profile: 'profile',
  Favorite: 'favorite',
  HowToMake: 'howtomake'
};

const Subject = {
  'Helllo': Action.Menu,
  'こんにちは': Action.Menu,
  'へるぷ'  : Action.Menu,
  'ヘルプ'  : Action.Menu,
  'help'    : Action.Menu,
  'AboutMessage' : Action.About,
  'HistoryMessage' : Action.History,
  'SkillMessage' : Action.Skill,
  'ProfileMessage' : Action.Profile,
  'FavoriteMessage' : Action.Favorite,
  'HowToMakeMessage' : Action.HowToMake,


};

const Predicate = {
  Menu: null
};

module.exports = {
  DefaultSubject: Action.Menu,
  Subject       : Subject,
  Predicate     : Predicate,
  Action        : Action
};
