var util = require('util');

module.exports = function (app) {
    app.locals({
        errorFor : function (model, property) {
            var modelToValidate = this[model];

            if (modelToValidate && modelToValidate.errors) {
                if (property && modelToValidate.errors[property]) {
                    return '<span class="error help-inline">' + modelToValidate.errors[property].message + '</span>';
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