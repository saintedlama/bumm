var util = require('util');

var errorTag = '<span class="error help-inline">%s</span>';

module.exports = function (app) {
    app.locals({
        errorFor : function (model, property) {
            var modelToValidate = this[model];

            if (modelToValidate && modelToValidate.errors) {
                if (property && modelToValidate.errors[property]) {
                    var error = modelToValidate.errors[property];

                    if (error.type == 'required') {
                        var fieldName = error.path[0].toLocaleUpperCase() + error.path.slice(1);
                        var message = util.format('%s is required', fieldName);
                        return util.format(errorTag, message);
                    }

                    return util.format(errorTag, modelToValidate.errors[property].message);
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