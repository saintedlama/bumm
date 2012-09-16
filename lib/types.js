var definitions = [ 
    'String',
    'Number',
    'Date',
    'Buffer',
    'Boolean',
    'ObjectId',
    'Array', 
    { type : 'Datetime', schemaType : 'Date'},
    { type : 'Textarea', schemaType : 'String'}
];

var typeLookup = {
    getType : function(type) {
        return typeLookup[type.toLowerCase()];
    }
};

definitions.forEach(function(definition) {
    if (typeof definition == 'string') {
        typeLookup[definition.toLowerCase()] = {
            type : definition,
            schemaType : definition
        }
    } else {
        typeLookup[definition.type.toLowerCase()] = definition;
    }
});

module.exports = typeLookup;

