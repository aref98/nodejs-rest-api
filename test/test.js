const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

describe('GET /', function() {
  it('respond with Hello, GitHub Actions!', function(done) {
    request(app)
      .get('/')
      .expect('Hello, GitHub Actions!', done);
  });
});
