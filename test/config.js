var config = require('../templates/app/config'),
    should = require('should');

describe('config', function() {
   it('should define config using defaults and environment values', function() {
       config.address.should.equal('127.0.0.1'); // taken from defaults
       config.port.should.equal(3000); // taken from development env
   }) 
});
