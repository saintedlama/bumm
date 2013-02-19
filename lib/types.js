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
    },
    
    register : function(type, schemaType) {
        if (!schemaType) {
            schemaType = type;
        }

        typeLookup[type.toLowerCase()] = {
            type : type,
            schemaType : schemaType
        }
    }
};

typeLookup.register('String');
typeLookup.register('Number');
typeLookup.register('Date');
typeLookup.register('Buffer');
typeLookup.register('Boolean');
typeLookup.register('ObjectId');
typeLookup.register('Array');
typeLookup.register('Datetime', 'Date');
typeLookup.register('Textarea', 'String');

module.exports = typeLookup;