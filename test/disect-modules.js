var should = require('should'),
    disectModules = require('../lib/disect-modules');

describe('disectModules', function() {
    it('should return an object of module names and versions', function() {
        disectModules('test:3.4.5, foo: 4.5.5 ,bar :1.2.3').should.eql({test : '3.4.5', foo : '4.5.5', bar : '1.2.3'});
    });
    it('should return an object of one module', function() {
        disectModules('test:3.4.5').should.eql({test : '3.4.5'});
    });
    it('should fill out empty version with *', function() {
        disectModules('test').should.eql({test : '*'});
    });
    it('should empty versions can be in the middle', function() {
        disectModules('test:3.4.5, foo ,bar :1.2.3').should.eql({test : '3.4.5', foo : '*', bar : '1.2.3'});
    });
    it('should empty versions with :', function() {
        disectModules('test:3.4.5, foo: ,bar :1.2.3').should.eql({test : '3.4.5', foo : '*', bar : '1.2.3'});
    });
});

