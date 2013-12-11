"use strict";

var path = require('path'),
    fs = require('fs'),
    ejs = require('ejs'),
    wrench = require('wrench'),
    prompt = require('./prompt'),
    disectModules = require('./disect-modules');

var writeTemplate = function(template, targetPath, options) {
    wrench.mkdirSyncRecursive(path.dirname(targetPath));
    var rendered = ejs.render(fs.readFileSync(template, 'utf-8'), options);
    fs.writeFileSync(targetPath, rendered, 'utf-8');
};

var writeViewTemplate = function(templateName) {
    var template = path.join(this.viewTemplateDir, templateName + ".jade.ejs");
    var targetPath = path.join("views", this.model.path, path.basename(template).replace('.ejs', ''));
    writeTemplate(template, targetPath, this);
};

var createApp = function(data) {
    var source = path.join(this.templateDir, 'app');
    var appTemplate = path.join(this.templateDir, 'ejs', 'app.js.ejs');

    if (!fs.existsSync(source)) {
        throw 'Directory "' + source + '" does not exist!';
    }
    
    data.dependencies = disectModules(data.dependencies);
    data.devDependencies = disectModules(data.devDependencies);

    // Transform scripts prompt
    data.scripts = {
        start: data.scripts
    };

    var target = data.name;

    wrench.copyDirSyncRecursive(source, target, { preserve : false });
    writeTemplate(appTemplate, path.join(target, "app.js"), data);

    // Delete prompted properties that should not be part of package
    delete data.mongoSessionStore 
    delete data.i18n

    fs.writeFile(path.resolve(target, 'package.json'), JSON.stringify(data, null, '  '), function(err) {
        console.log();
        console.log('Initialized app in directory "' + target + '"');
        console.log();
        console.log('To start the generated app run:');
        console.log(' cd ' + target);
        console.log(' npm install');
        console.log(' npm start OR node app.js');
    });
};

var commands = {
    app : function(options) {
        prompt.app({ name : options.model.singular }, options.switches, function(err, result) {
            if (err) {
                return;
            }

            createApp.bind(options)(result);
        });
    },

    scaffold : function(options) {
        commands.view(options);
        commands.model(options);
        commands.route(options);
    },

    resource : function(options) {
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

        console.log('Views created in directory ' + path.join('views', options.model.path));
    },

    model : function(options) {
        var templatePath = path.join(options.templateDir, 'scaffold', 'model', 'default.js.ejs');

        if (!fs.existsSync(templatePath)) {
            throw 'File "' + templatePath + '" does not exist!';
        }

        var target = path.join('models', options.model.path + '.js');

        writeTemplate(templatePath, target, options);

        console.log('Model written to ' + target);
    },

    route : function(options) {
        var template = options.rest ? "rest.js.ejs" : "default.js.ejs";
        var templatePath = path.join(options.templateDir, 'scaffold', 'route', template);

        if (!fs.existsSync(templatePath)) {
            throw 'File "' + templatePath + '" does not exist!';
        }

        var target = path.join('routes', options.model.path + '.js');

        writeTemplate(templatePath, target, options);

        console.log('Route written to ' + target);
    },

    rm : function(options) {
        // TODO: Implement
    }
};

module.exports = commands;
