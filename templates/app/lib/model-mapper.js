var util = require('util');

var ModelMapper = function(source, opt) {
    this.source = source;
    this.opt = opt || {};
    
    this.opt.excludes = this.opt.excludes || [ 'id', '_id' ];
}

ModelMapper.prototype.to = function(model) {
    var self = this;
    model.schema.eachPath(function(key, path) {
        if (self.opt.includes) {
            if (self.opt.includes.indexOf(key) < 0) {
                return;
            }
        }
        
        if (self.opt.excludes.indexOf(key) >= 0) {
            return;
        }

        if (path.options.type == Boolean) {
            var valueRaw = self.source[key];

            if (key in self.source) {
                if (util.isArray(valueRaw)) {
                    valueRaw = valueRaw.pop();
                }
            }

            model.set(key, valueRaw=='true' || valueRaw=='1' || valueRaw=='on');
        }
        else if (key in self.source) {
            var value = self.source[key];

            model.set(key, value);
        }
    });
}

module.exports.map = function(source, opt) {
    return new ModelMapper(source, opt);
}

