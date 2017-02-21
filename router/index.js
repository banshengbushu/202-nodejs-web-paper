const homeworks = require('./routers/homework');
const papers = require('./routers/paper');

module.exports = function (app) {
  app.use('/homeworks', homeworks);
  app.use('/papers', papers);
};