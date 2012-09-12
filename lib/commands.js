var path = require('path'),
    fs = require('fs'),
    ejs = require('ejs'),
    wrench = require('wrench');

// TODO: Consolidate code here - two templating methods and all that bind is MEH
// TODO: Too many parameters
var writeViewTemplate = function (template, targetDir, model, options) {
    wrench.mkdirSyncRecursive(path.join(targetDir, model));
    
    var rendered = ejs.render(fs.readFileSync(template, 'utf-8'), options);

    var targetPath = path.join(targetDir, model, path.basename(template).replace('.ejs', ''));
    fs.writeFileSync(targetPath, rendered, 'utf-8');
}

var writeTemplate = function (template, targetPath, options) {
    wrench.mkdirSyncRecursive(path.dirname(targetPath));

    var rendered = ejs.render(fs.readFileSync(template, 'utf-8'), options);

    fs.writeFileSync(targetPath, rendered, 'utf-8');
}

var commands = {
    app: function (options) {
        if (!options.model) {
            console.log('Application name is required');
            return;
        }

        var source = path.join(options.templateDir, 'app');
        
        if (!fs.existsSync(source)) {
            throw 'Directory "' + source + '" does not exist!';
        }
        
        var target = options.model.singular;
        
        wrench.copyDirSyncRecursive(source, target, { preserve : true });
        
        console.log('Initialized app in directory "' + target + '"');
        console.log('To start the generated app run:\n cd ' + target + '\n npm install');
    },

    scaffold: function(options) {
        commands.view(options);
        commands.model(options);
        commands.route(options);
    },

    view: function (options) {
        var viewTemplateDir = path.join(options.templateDir, 'scaffold', 'views');

        if (!fs.existsSync(viewTemplateDir)) {
            throw 'Directory "' + viewTemplateDir + '" does not exist!';
        }
        
        writeViewTemplate(path.join(viewTemplateDir, 'create.jade.ejs'), 'views', options.model.singular, options);
        writeViewTemplate(path.join(viewTemplateDir, 'edit.jade.ejs'), 'views', options.model.singular, options);
        writeViewTemplate(path.join(viewTemplateDir, 'index.jade.ejs'), 'views', options.model.singular, options);
        writeViewTemplate(path.join(viewTemplateDir, 'detail.jade.ejs'), 'views', options.model.singular, options);
        writeViewTemplate(path.join(viewTemplateDir, 'delete.jade.ejs'), 'views', options.model.singular, options);
        
        console.log('Views created in directory ' + path.join('views', options.model.singular));
    },

    model: function (options) {
        var templatePath = path.join(options.templateDir, 'scaffold', 'model', 'default.js.ejs');

        if (!fs.existsSync(templatePath)) {
            throw 'File "' + templatePath + '" does not exist!';
        }
        
        var target = path.join('models', options.model.singular + '.js');
        
        writeTemplate(templatePath, target, options);

        console.log('Model written to ' + target);
    },

    route: function (options) {
        var templatePath = path.join(options.templateDir, 'scaffold', 'route', 'default.js.ejs');

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
}

module.exports = commands;