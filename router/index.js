const homeworks = require('./routers/homework');
const papers = require('./routers/paper');
const sections = require('./routers/section');

module.exports = function (app) {
  app.use('/homeworks', homeworks);
  app.use('/papers', papers);
  app.use('/sections', sections);
};