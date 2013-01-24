"use strict";

var fs = require('fs');
var path = require('path');

module.exports = {
    "name" : prompt('name', name),
    "version" : prompt('version', "0.0.0"),
    "description" : prompt("description"),
    "private" : true,
    "main" : prompt("main", "app.js"),
    "dependencies" : prompt("dependencies", "express: 3.0.x, jade: >0.0.1, mongoose: 3.4.x"),
    "devDependencies" : prompt("devDependencies", "mocha: *"),
    "scripts" : prompt("scripts/start", "nodemon app.js -wmodels -wconfig -wroutes"),
    "repository" : prompt("repository", ""),
    "keywords" : prompt("keywords", "express, jade"),
    "author" : prompt("author", ""),
    "license" : prompt('license', 'BSD')
};
