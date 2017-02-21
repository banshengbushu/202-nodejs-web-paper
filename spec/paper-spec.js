const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('PaperController', ()=> {
  it('GET /papers should return papers', (done)=> {
    request
      .get('/papers')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(1);
      })
      .end(done);
  });

  it('GET /papers/:paperId should return homework', (done)=> {
    request
      .get('/papers/58ab9ed5e5227a2863b6ae64')
      .expect(200)
      .expect((res)=> {
        res.body.should.eql({
          _id: '58ab9ed5e5227a2863b6ae64',
          paperName: 'paper1',
          paperInfo: 'paperInfo1',
          __v: 0,
          sections: {
            _id: '58aaf26a39bdc0947d46e239',
            title: '编程题',
            paper: '58ab9ed5e5227a2863b6ae64',
            __v: 0,
            homeworks: []
          }
        });
      })
      .end(done);
  });

  it('PUT /papers/:paperId should return 204', (done)=> {
    const paperId = '58ab9ed5e5227a2863b6ae64';
    const paper = {
      paperName: "paper2",
      paperInfo: "paperInfo2"
    };
    request
      .put(`/papers/${paperId}`)
      .send(paper)
      .expect(204)
      .end(done)
  });

  it('POST /papers should return 201', (done)=> {
    const paper = {
      paperName: "paper3",
      paperInfo: "paperInfo3"
    };

    request
      .post('/papers')
      .send(paper)
      .expect(201)
      .end(done);
  });

  it('DELETE /papers/:paperId should return 204', (done)=> {
    request
      .delete('/papers/58ab9ed5e5227a2863b6ae64')
      .expect(204)
      .end(done);
  });
});
