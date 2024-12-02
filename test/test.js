import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import { app, server } from '../app.js';

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

describe('Users API', function() {
  it('should return all users', function(done) {
    request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(2);
        done();
      });
  });

  it('should return a specific user by ID', function(done) {
    request(app)
      .get('/users/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal({ id: 1, name: 'John Doe' });
        done();
      });
  });

  it('should return 404 for a non-existing user', function(done) {
    request(app)
      .get('/users/99')
      .expect(404, done);
  });

  it('should create a new user', function(done) {
    const newUser = { name: 'Alice' };
    request(app)
      .post('/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.include({ name: 'Alice' });
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('should update an existing user', function(done) {
    const updatedUser = { name: 'John Smith' };
    request(app)
      .put('/users/1')
      .send(updatedUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.include({ name: 'John Smith' });
        done();
      });
  });

  it('should return 404 when updating a non-existing user', function(done) {
    const updatedUser = { name: 'Unknown' };
    request(app)
      .put('/users/99')
      .send(updatedUser)
      .expect(404, done);
  });

  it('should delete an existing user', function(done) {
    request(app)
      .delete('/users/1')
      .expect(204, done);
  });

  it('should return 404 when deleting a non-existing user', function(done) {
    request(app)
      .delete('/users/99')
      .expect(404, done);
  });
});

after(() => { if (server && server.close) { server.close(); } });