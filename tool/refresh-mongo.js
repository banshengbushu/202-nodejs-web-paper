const rawData = require('../raw-data/fixture');
const Homework = require('../model/homework');

const modelMap = {
  Homework
};

const docs = Object.keys(rawData);

module.exports = function refreshMongo(done) {
  docs.forEach((i)=> {
    modelMap[i].remove(()=> {
      modelMap[i].create(rawData[i], ()=> {
        docs.filter(doc=>doc !== i);
        if (docs.length === 0) {
          done();
        }
      })
    });
  })
};