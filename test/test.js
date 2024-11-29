const request = require('supertest');
const express = require('express');

const app = require('../app'); // Adjust the path as necessary

describe('GET /', function() {
  it('respond with Hello, GitHub Actions!', function(done) {
    request(app)
      .get('/')
      .expect('Hello, GitHub Actions!', done);
  });
});

describe('GET /user', function() {
  it('respond with JSON containing user data', function(done) {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        name: 'John Doe'
      }, done);
  });
});

describe('POST /user', function() {
  it('create a new user and respond with JSON', function(done) {
    const newUser = { id: 2, name: 'Jane Doe' };
    request(app)
      .post('/user')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201, newUser, done);
  });
});
