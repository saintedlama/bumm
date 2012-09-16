var fleck = require('fleck'),
    types = require('./types');

var buildProperty = function (name, type) {
    if (!name) {
        throw 'Property name must be given';
    }

    type = type || 'String';

    var matchingType = types.getType(type);

    if (!matchingType) {
        throw 'Type "' + type + '" is not supported';
    }
    
    // The rest are validation properties grouped pairwise together
    var validatorArguments = Array.prototype.slice.call(arguments, 2);

    if (validatorArguments.length % 2 != 0) {
        throw 'Validation properties are not grouped pairwise. For example "min:3:max:10"';
    }

    var validators = [];
    for (var i=0;i<validatorArguments.length;i+=2) {
        validators.push({ validator : validatorArguments[i], value : validatorArguments[i+1]});
    }

    return {
        name : name,
        nameCapitalized : fleck.capitalize(name),
        type : matchingType.type,
        schemaType : matchingType.schemaType,
        validators : validators
    }
}

var parse = function (args) {
    if (!args.length) {
        throw '"name" argument required';
    }
    
    var model = args[0];

    var options = {
        model: {
            singular: model,
            singularCapitalized: fleck.capitalize(model),
            plural: fleck.pluralize(model),
            pluralCapitalized: fleck.capitalize(fleck.pluralize(model))
        },
        properties: []
    }

    args.slice(1).forEach(function (arg) {
        var parts = arg.split(':');

        options.properties.push(buildProperty.apply(null, parts));
    });
    
    options.defaultProperty = options.properties.length?options.properties[0]:undefined;        

    return options;
}

module.exports.parse = parse;
