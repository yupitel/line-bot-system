const messaging  = require('./index');
const messaging2 = require('./index').messaging2;

console.log(messaging);

console.log(messaging2);


console.log(new messaging('test1', 'test2'));


console.log(new messaging2('test1', 'test2'));

