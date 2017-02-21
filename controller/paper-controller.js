const Paper = require('../model/paper');
const Section = require('../model/section');
const async = require('async');
const httpCode = require('../config/httpCode');

class PaperController {
  getAll(req, res, next) {
    async.series({
      papers: (done)=> {
        Paper.find({}, (err, docs)=> {
          async.map(docs, (paper, callback)=> {
            Section.findOne({paper: paper._id})
              .populate('Homeworks')
              .exec((err, doc)=> {
                const data = Object.assign({}, paper.toJSON(), {sections: doc.toJSON()});
                callback(err, data);
              })
          }, done)
        })
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
    async.waterfall([
      (done)=> {
        Paper.findById(paperId, done)
      },
      (paper, done)=> {
        if (!paper) {
          done(true, null);
        }
        Section.findOne({paper: paper._id})
          .populate('homeworks')
          .exec((err, doc)=> {
            const data = Object.assign({}, paper.toJSON(), {sections: doc.toJSON()});
            return done(err, data);
          })
      }
    ], (err, result) => {
      if (err === true) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.status(httpCode.OK).send(result);
    });
  }

  create(req, res, next) {
    Paper.create(req.body, (err, doc)=> {
      if (err) {
        return next(err);
      }
      return res.status(httpCode.CREATED).send({uri: `papers/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const paperId = req.params.paperId;
    async.waterfall([
      (done)=> {
        Paper.findByIdAndRemove(paperId, done)
      },
      (docs, done)=> {
        if (!docs) {
          return done(true, null);
        }
        Section.find({}, done)
      },
      (docs, done)=> {
        const sections = docs.filter(section => section.paper.toJSON() === paperId)
        Section.remove(sections, done)
      }
    ], (err)=> {
      if (err === true) {
        return res.sendStatus(httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(httpCode.NO_CONTENT);

    });
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


module.exports = PaperController;
