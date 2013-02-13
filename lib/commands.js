"use strict";

var path = require('path'),
    fs = require('fs'),
    ejs = require('ejs'),
    wrench = require('wrench'),
    PZ = require('promzard').PromZard,
    disectModules = require('./disect-modules');

var writeTemplate = function(template, targetPath, options) {
    wrench.mkdirSyncRecursive(path.dirname(targetPath));
    var rendered = ejs.render(fs.readFileSync(template, 'utf-8'), options);
    fs.writeFileSync(targetPath, rendered, 'utf-8');
};

var writeViewTemplate = function(templateName) {
    var template = path.join(this.viewTemplateDir, templateName + ".jade.ejs");
    var targetPath = path.join("views", this.model.singular, path.basename(template).replace('.ejs', ''));
    writeTemplate(template, targetPath, this);
};

var createApp = function(data) {
    var source = path.join(this.templateDir, 'app');
    var appTemplate = path.join(this.templateDir, 'ejs', 'app.js.ejs');

    if (!fs.existsSync(source)) {
        throw 'Directory "' + source + '" does not exist!';
    }

    if (data.mongoSessionStore == "yes" && data.dependencies.indexOf("connect-mongo") == -1) {
       data.dependencies += ", connect-mongo: 0.3.x";
    }

    data.dependencies = disectModules(data.dependencies);
    data.devDependencies = disectModules(data.devDependencies);

    // Transform scripts prompt
    data.scripts = {
        start: data.scripts
    };

    var target = data.name;

    wrench.copyDirSyncRecursive(source, target, { preserve : true });
    writeTemplate(appTemplate, path.join(target, "app.js"), data);

    fs.writeFile(path.resolve(target, 'package.json'), JSON.stringify(data, null, '  '), function(err) {
        console.log('Initialized app in directory "' + target + '"');
        console.log('To start the generated app run:\n cd ' + target + '\n npm install');
    });
};

var commands = {
    app : function(options) {
        var name = options.model.singular;
        var input = path.resolve(__dirname, 'input-files/app.js');

        PZ(input, {name : name}).on('data', createApp.bind(options));
    },

    scaffold : function(options) {
        commands.view(options);
        commands.model(options);
        commands.route(options);
    },

    "scaffold:rest" : function(options) {
        options.rest = true;
        commands.model(options);
        commands.route(options);
    },

    view : function(options) {
        options.viewTemplateDir = path.join(options.templateDir, 'scaffold', 'views');

        if (!fs.existsSync(options.viewTemplateDir)) {
            throw 'Directory "' + options.viewTemplateDir + '" does not exist!';
        }

        ['create', 'edit', 'index', 'detail', 'delete'].forEach(writeViewTemplate.bind(options));

        console.log('Views created in directory ' + path.join('views', options.model.singular));
    },

    model : function(options) {
        var templatePath = path.join(options.templateDir, 'scaffold', 'model', 'default.js.ejs');

        if (!fs.existsSync(templatePath)) {
            throw 'File "' + templatePath + '" does not exist!';
        }

        var target = path.join('models', options.model.singular + '.js');

        writeTemplate(templatePath, target, options);

        console.log('Model written to ' + target);
    },

    route : function(options) {
        var template = options.rest ? "rest.js.ejs" : "default.js.ejs";
        var templatePath = path.join(options.templateDir, 'scaffold', 'route', template);

        if (!fs.existsSync(templatePath)) {
            throw 'File "' + templatePath + '" does not exist!';
        }

        var target = path.join('routes', options.model.singular + '.js');

        writeTemplate(templatePath, target, options);

        console.log('Route written to ' + target);
    },

    rm : function(options) {
        // TODO: Implement
    }
};

module.exports = commands;
