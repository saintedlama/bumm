var util = require('util');

var errorTag = '<span class="error help-inline">%s</span>';

var getMessage = function(error) {
    // Get type if specified or a more general message
    return error.type || error.message;
};

module.exports = function(app) {
    app.locals({
        errorFor : function(model, property) {
            var modelToValidate = this[model];

            if (modelToValidate && modelToValidate.errors) {
                if (property && modelToValidate.errors[property]) {
                    var error = modelToValidate.errors[property];

                    if (error.type == 'required') {
                        var fieldName = error.path[0].toLocaleUpperCase() + error.path.slice(1);
                        var message = util.format('%s is required', fieldName);
                        return util.format(errorTag, message);
                    }

                    return util.format(errorTag, getMessage(error));
                }
            }
        },

        display : function(value) {
            if (util.isDate(value)) {
                return value.toLocaleDateString();
            }

            return value;
        }
    });
};