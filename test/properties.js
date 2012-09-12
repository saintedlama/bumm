var should = require('should'),
    properties = require('../lib/properties');

describe('properties', function() {
    describe('#parse', function() {
        it('should not accept empty property array', function() {
            (function() {
                properties.parse([]);
            }).should.throw();
        });
        
        it('should accept single name specified', function() {
            var props = properties.parse(['name']);
            should.exist(props);
            props.model.singular.should.equal('name')
        });

        it('should pluralize single name specified', function() {
            var props = properties.parse(['name']);
            props.model.plural.should.equal('names');
        });

        it('should capitalize single name specified', function() {
            var props = properties.parse(['name']);
            props.model.singularCapitalized.should.equal('Name');
        });

        it('should pluralize and capitalize single name specified', function() {
            var props = properties.parse(['name']);
            props.model.pluralCapitalized.should.equal('Names');
        });
    });
});
