var prompt = require('prompt');

module.exports = function(defaults, override, cb) {
    prompt.message = 'bumm'.grey;
    prompt.delimiter = ': ';

    prompt.override = override;

    prompt.start();

    prompt.get({
        properties: {
            'name' :  { description: 'name'.green, default : defaults.name },
            'version' : { description:'version'.green, default: '0.0.0' },
            'description' : { description: 'description'.green },
            'main' : { description: 'main'.green, default: 'app.js' },
            'dependencies' : { description: 'dependencies'.green, default: 'express: 3.1.x, jade: >0.0.1, mongoose: 3.5.x' },
            'devDependencies' : { description: 'devDependencies'.green, default: 'mocha: *' },
            'mongoSessionStore': { description: 'use mongodb as session store'.green, default: 'yes' },
            'i18n' : { description: 'use i18n internationalization module'.green, default: 'no' },
            'scripts' : { description:'scripts/start'.green, default: 'nodemon -wmodels -wconfig -wroutes app.js' },
            'repository' : { description:'repository'.green }
        }
    }, function(err, result) {
        if (err) {
            return cb(err);
        }

        var rewriteTruthyInput = function(property) {
            if (result[property]) {
                result[property] = (result[property].toLowerCase() == 'yes' || result[property].toLowerCase() == 'y');
            }
        }

        rewriteTruthyInput('i18n');
        rewriteTruthyInput('mongoSessionStore');

        if (result.i18n && result.dependencies.indexOf('i18n-2') == -1) {
            result.dependencies += ', i18n-2: 0.4.x';
        }

        if (result.mongoSessionStore && result.dependencies.indexOf('connect-mongo') == -1) {
            result.dependencies += ', connect-mongo: 0.3.x';
        }

        result.private = true;

        cb(undefined, result);
    });
}

