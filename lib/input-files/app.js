"use strict";

module.exports = {
    "name" : prompt('name', name),
    "version" : prompt('version', "0.0.0"),
    "description" : prompt("description"),
    "private" : true,
    "main" : prompt("main", "app.js"),
    "dependencies" : prompt("dependencies", "express: 3.1.x, jade: >0.0.1, mongoose: 3.5.x"),
    "devDependencies" : prompt("devDependencies", "mocha: *"),
    "mongoSessionStore": prompt("Use mongodb as session store ", "yes"),
    "i18n" : prompt("i18n", "no"),
    "scripts" : prompt("scripts/start", "nodemon app.js -wmodels -wconfig -wroutes"),
    "repository" : prompt("repository", ""),
    "keywords" : prompt("keywords", "express, jade"),
    "author" : prompt("author", ""),
    "license" : prompt('license', 'BSD')
};
