import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { app , server } from '../app.js';

describe('GET /', function() {
  it('should return Hello, GitHub Actions!', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Hello, GitHub Actions!');
        done();
      });
  });
});

describe('GET /user', function() {
  it('should respond with JSON containing user data', function(done) {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal({ id: 1, name: 'John Doe' });
        done();
      });
  });
});

describe('POST /user', function() {
  it('should create a new user and respond with JSON', function(done) {
    const newUser = { id: 2, name: 'Jane Doe' };
    request(app)
      .post('/user')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(newUser);
        done();
      });
  });

});
after(() => { server.close(); });