var path = require('path'),
    fs = require('fs');

var requireRoutes = function(dir, app) {
    var files = fs.readdirSync(dir).filter(function(file) {
        return path.join(__dirname, file) != __filename;
    });

    files.forEach(function(file) {
        var absolutePath = path.join(dir, file);

        var stat = fs.statSync(absolutePath);

        if (stat.isFile()) {
            try {
                require(absolutePath)(app);
            } catch (e) {
                console.log('Could not require route "', absolutePath, '"');
            }
        } else if (stat.isDirectory()) {
            // Scan the directory recursive
            requireRoutes(path.join(dir, file), app);
        }
    });
}

var routes = function(app) {
    requireRoutes(__dirname, app);
}

module.exports = routes;
