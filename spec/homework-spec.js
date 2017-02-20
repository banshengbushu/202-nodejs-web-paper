const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('HomeworkController', ()=> {
  it('GET /homeworks should return homeworks', (done)=> {
    request
      .get('/homeworks')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('GET /homeworks/:homeworkId should return homework', (done)=> {
    request
      .get('/homeworks/58aade036842cc5181d09a35')
      .expect(200)
      .expect((res)=> {
        res.body.should.eql({
          "_id": "58aade036842cc5181d09a35",
          "homework": "homework1",
          "stack": "Java",
          "__v": 0
        });
      })
      .end(done);
  });

  it('PUT /homeworks/:homeworkId should return 204', (done)=> {
    const homeworkId = '58aade036842cc5181d09a36';
    const homework = {
      homework: "homework2",
      stack: "JS"
    };
    request
      .put(`/homeworks/${homeworkId}`)
      .send(homework)
      .expect(204)
      .end(done)
  });

  it('POST /homeworks should return 201', (done)=> {
    const homework = {
      homework: "homework4",
      stack: "Jersey"
    };

    request
      .post('/homeworks')
      .send(homework)
      .expect(201)
      .end(done);
  });

  it('DELETE /homeworks/:homeworkId should return 204', (done)=> {
    request
      .delete('/homeworks/58aade036842cc5181d09a35')
      .expect(204)
      .end(done);
  });
});
