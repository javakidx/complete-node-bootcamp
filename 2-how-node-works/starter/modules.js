// These two are used to see some information
//console.log(arguments);
//console.log(require('module').wrapper);

const C = require('./test-module-1');
const calculator = new C();
console.log(calculator.add(3, 8));

//exports
const { add, multiply } = require('./test-module-2');
console.log(add(5, 10));

//Caching
require('./test-module-3')(); // Thanks to the caching, the module is loaded only once
require('./test-module-3')();
require('./test-module-3')();
