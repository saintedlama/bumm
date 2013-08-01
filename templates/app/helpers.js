var util = require('util');

var errorTag = '<span class="error help-inline">%s</span>';

module.exports = function(app) {
    app.locals({
        errorFor : function(model, property) {
            if (model && model.errors) {
                if (property && model.errors[property]) {
                    var error = model.errors[property];

                    if (error.type == 'required') {
                        var fieldName = error.path[0].toLocaleUpperCase() + error.path.slice(1);
                        var message = util.format('%s is required', fieldName);
                        return util.format(errorTag, message);
                    }

                    return util.format(errorTag, error.type || error.message);
                }
            }
        },

        display : function(value) {
            if (util.isDate(value)) {
                return value.toLocaleDateString();
            }

            return value;
        },
        
       dateAsValue : function(date) {
            // check if this is a date 
            if(util.isDate(date)){
                // if so we can format it to RFC3339 specification, 'yyyy-mm-dd'
                var day = date.getDate();
                var month = date.getMonth() + 1; //Months are zero based
                var year = date.getFullYear();
                return year + '-' + (month < 10 ? '0'+month: month) + '-' + day; 
            }

            return date;
        }
    });
};
