const Paper = require('../model/paper');
const async = require('async');
const httpCode = require('../config/httpCode');

class Papercontroller {
  getAll(req, res, next) {
    async.series({
      papers: (done)=> {
        Paper.find({}).exec(done)
      },
      totalCount: (done)=> {
        Paper.count(done)
      },
    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const paperId = req.params.paperId;
    Paper.findById(paperId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      res.status(httpCode.OK).send(doc);
    })
  }

  create(req, res, next) {
    Paper.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      const uri = `homeworks/${doc._id}`;
      return res.status(httpCode.CREATED).send(uri);
    })
  }

  delete(req, res, next) {
    const paperId = req.params.paperId;
    Paper.findByIdAndRemove(paperId, (err, doc)=> {
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
    const paperId = req.params.paperId;
    Paper.findByIdAndUpdate(paperId, req.body, (err, doc)=> {
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

module.exports = Papercontroller;
