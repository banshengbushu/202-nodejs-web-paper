const Section = require('../model/section');
const async = require('async');
const httpCode = require('../config/httpCode');

class SectionController {
  getAll(req, res, next) {
    async.series({
      sections: (done)=> {
        Section.find({})
          .populate('homeworks', 'paper')
          .exec(done)
      },
      totalCount: (done)=> {
        Section.count(done)
      },
    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findById(sectionId)
      .populate('homeworks', 'paper')
      .exec((err, doc)=> {
        if (err) {
          return next(err);
        }
        return res.status(httpCode.OK).send(doc);
      })
  }

  create(req, res, next) {
    Section.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.CREATED).send({uri: `sections/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const sectionId = req.params.sectionId;
    Section.findByIdAndRemove(sectionId, (err, doc)=> {
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
    const sectionId = req.params.sectionId;
    Section.findByIdAndUpdate(sectionId, req.body, (err, doc)=> {
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

module.exports = SectionController;
