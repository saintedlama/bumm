#!/usr/bin/env node

var path = require('path'),
    optimist = require('optimist'),
    usage = require('./usage'),
    commands = require('../lib/commands'),
    properties = require('../lib/properties'),
    version = require('../package.json').version;

var die = function(msg) {
    console.error('\n', msg, '\n');
    console.info(usage);

    process.exit(1);
}

var argv = optimist
    .usage(usage)
    .argv;

if (argv.h || argv.help) {
    console.info(usage);
    return;
}

if (argv.v || argv.version) {
    console.info('v' + version);
    return;
}

if (argv._.length == 0) {
    die('Command argument is required');
}

var commandName = argv._.shift().toLowerCase();

if (!commands[commandName]) {
    die('Command ' + commandName + ' is not known to bumm!');
}

try {
    var options = properties.parse(argv._);

    options.templateDir = path.join(__dirname, '..', 'templates');

    if (process.env.BUMM_TEMPLATE_DIR) {
        options.templateDir = process.env.BUMM_TEMPLATE_DIR;
    }

    if (argv.templateDir || argv.t) {
        options.templateDir = argv.templateDir || argv.t;
    }

    // copy switches from argv to options.switches
    options.switches = {};
    
    for (var key in argv) {
        if (key != '_' && key != '$0' && argv.hasOwnProperty(key)) {
            options.switches[key] = argv[key];
        }
    }

    commands[commandName](options);
} catch (e) {
    die(e);
}

