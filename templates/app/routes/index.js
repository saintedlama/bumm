var path = require('path'),
    fs = require('fs');

var routes = function(app) {
    fs.readdirSync(__dirname).filter(function(file) {
        return path.join(__dirname, file) != __filename;
    }).forEach(function(file) {
        require('./' + path.basename(file))(app);
    });
}

module.exports = routes;
