const homeworks = require('./routers/homeworks');

module.exports = function (app) {
  app.use('/homeworks', homeworks);
};