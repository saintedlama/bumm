var should = require('should'),
    types = require('../lib/types');

describe('types', function() {
    describe('#getType', function() {
        it('should retrieve defined mongoose types as objects', function() {
            var type = types.getType('String');
            
            should.exist(type);
            type.type.should.equal('String');
            type.schemaType.should.equal('String');
        });
        
        it('should retrieve mongoose type aliases', function() {
            var type = types.getType('Datetime');

            should.exist(type);
            type.type.should.equal('Datetime');
            type.schemaType.should.equal('Date');            
        });

        it('should retrieve case insensitive', function() {
            var type = types.getType('string');

            should.exist(type);
        });
        
        it('should be "undefined" for unknown type', function() {
            var type = types.getType('sometype');

            should.not.exist(type);
        });
    });
});
