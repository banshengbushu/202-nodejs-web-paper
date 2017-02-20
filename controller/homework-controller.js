const Homework = require('../model/homework');
const async = require('async');
const httpCode = require('../config/httpCode');

class HomeController {
  getAll(req, res, next) {
    async.series({
      items: (done)=> {
        Homework.find({}).exec(done)
      },
      totalCount: (done)=> {
        Homework.count(done)
      },
    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const homeworkId = req.params.homeworkId;
    Homework.findById(homeworkId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      res.status(httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    Homework.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      const uri = `homeworks/${doc._id}`;
      return res.status(httpCode.CREATED).send(uri);
    })
  }

  delete(req, res, next) {
    const homeworkId = req.params.homeworkId;
    Homework.findByIdAndRemove(homeworkId, (err, doc)=> {
      if (!doc) {
        return res.status(httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const homeworkId = req.params.homeworkId;
    Homework.findByIdAndUpdate(homeworkId, req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      return res.sendStatus(httpCode.NO_CONTENT);
    })
  }
}

module.exports = HomeController;
