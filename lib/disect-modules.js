module.exports = function(text){
  var modulesPlusVersion = text.split(',');
  var modules = {};
  modulesPlusVersion.forEach(function(module){
    var split = module.split(':');
    split = split.map(function(text){
      return trim(text);
    });

    if(split.length == 1 || split[1].length == 0){
      split[1] = '*';
    }

    modules[split[0]] = split[1];
  });

  return modules;
};

var trim = function(text){
  return text.replace(/^\s*/, '').replace(/\s*$/, '');
};
