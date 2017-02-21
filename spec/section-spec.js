const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('SectionController', ()=> {
  it('GET /sections should return sections', (done)=> {
    request
      .get('/sections')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(1);
      })
      .end(done);
  });

  it('GET /sections/:sectionId should return homework', (done)=> {
    request
      .get('/sections/58aaf26a39bdc0947d46e239')
      .expect(200)
      .expect((res)=> {
        res.body.should.eql({
          "_id": "58aaf26a39bdc0947d46e239",
          "title": "编程题",
          "paper": "58ab9ed5e5227a2863b6ae64",
          "__v": 0,
          "homeworks": [
            {
              "_id": "58aade036842cc5181d09a35"
            }
          ]
        });
      })
      .end(done);
  });

  it('PUT /sections/:sectionId should return 204', (done)=> {
    const sectionId = '58aaf26a39bdc0947d46e239';
    const section = {
      title: "逻辑题",
      homeworks: ["58aade036842cc5181d09a35"],
      paper: "58ab9ed5e5227a2863b6ae64"
    };
    request
      .put(`/sections/${sectionId}`)
      .send(section)
      .expect(204)
      .end(done)
  });

  it('POST /sections should return 201', (done)=> {
    const section = {
      title: "编程题",
      homeworks: ["58aade036842cc5181d09a36"],
      paper: "58ab9ed5e5227a2863b6ae64"
    };

    request
      .post('/sections')
      .send(section)
      .expect(201)
      .end(done);
  });

  it('DELETE /sections/:sectionId should return 204', (done)=> {
    request
      .delete('/sections/58aaf26a39bdc0947d46e239')
      .expect(204)
      .end(done);
  });
});
