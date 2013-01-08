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
        if (type[0] == '[' && type[type.length - 1] == ']') {
            var typeOfArray = type.substring(1, type.length - 1);
            var foundType = typeLookup[typeOfArray.toLowerCase()];
            
            if (!foundType) {
                return;
            }

            return { type: '[' + foundType.type + ']', schemaType: '[' + foundType.schemaType + ']' };
        }
        
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

