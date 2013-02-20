# Bumm
Bumm is an opinionated project generator for node.js

Generated projects rely on [express](http://expressjs.com/) and [mongoose](http://mongoosejs.com/) without any persistence abstractions, 
additional libraries or frameworks. Just plain express and mongoose!

## Change Log
* 0.1.3 Add `npm init` like prompt to specify generated package.json values by [thomas peklak](https://github.com/thomaspeklak)
* 0.1.2 Minor bug fixes in views, basic support for array types, reorganizes public assets in vendor folder, remove 'x-powered-by' header
* 0.1.1 Bootstrap update, mongoose update
* 0.1.0 Initial version

# Installing Bumm

	npm install bumm -g

# Mini Tutorial

First cd to the directory where the project should be created

	cd /path/to/projects/root

Create a project skeleton via

	bumm app testapp

Next cd to testapp

	cd testapp

And install required packages through npm

	npm install

## Scaffolding
Create a model, route and views via `scaffold` command. The model
should have two properties "title" and "description" where title is required.

	bumm scaffold test title:string:required:true description


Model validators are specified after property name and type in plain mongoose syntax. In case
no type is specified the property will be of type string.

Mongoose types 'String', 'Number', 'Date', 'Buffer', 'Boolean', 'ObjectId', 'Array' are supported. Additionally
the types 'DateTime' and 'Textbox' are supported which result in a datetime html 5 input tag and a textbox tag.
Types are case insensitive.


Now start `node app.js` and navigate your browser to `http://localhost:3000/tests`

### Scaffolding restful routes

You can create a JSON REST endpoint by scaffolding a model and its corresponding routes. The arguments are the same as above, but instead of _scaffold_ use _scafffold:rest_ like this

	bumm scaffold:rest post title:string:required:true description


# Usage

```
Project generator for node.js using express and mongoose

Usage:
  bumm [options] command [arguments]

Options:
  --help, -h                 Output this usage dialog
  --version, -v              Output the version of bumm

Commands:
  app <name>                 Create a new application
  scaffold <name> [attrib]   Create a new route, model and views for <name>
  resource <name> [attrib]   Creates a model and route for resource <name>
  view <name> [attrib]       Creates views for a <name>
  route <name> [attrib]      Creates a route for a <name>
  model <name> [attrib]      Creates a new mongoose model for a <name>

name:
  Name should be provided as singular, so use `item` instead of `items`. For
  `scaffold`, `view`, `route`, `resource`, `model` commands name
  accepts a path prefix. For example `admin/item` will create model, routes and
  views in an admin directory. Routes will then point to `/admin/items`. This
  option can be useful if you plan to add some authentication based on routes
  later on.

attrib:
  Attributes are used to describe properties of models used in routes, views
  and of course models using the schema:

  [name]:[type]:[validator]:[validatorValue]:[validator]:[validatorValue]...

Examples:
  bumm app todo              Generates an express app skeleton
  bumm scaffold item         Generates item model, route and views supporting
                             basic CRUD operations
  bumm view item             Generates item views

  bumm scaffold item name:string:required:true

                             Generates item model, route and views with a single
                             property "name" that is required.
```

# What bumm creates

After executing `bumm app someappname` you'll find the following structure in your file system.

    |   app.js
    |   helpers.js
    |   package.json
    |   README.md
    |
    +---config
    |       defaults.js
    |       development.js
    |       index.js
    |       production.js
    |
    +---lib
    |       model-mapper.js
    |
    +---public
    |   +---css
    |   |       custom.css
    |   |
    |   \---vendor
    |       +---bootstrap
    |       |   +---css
    |       |   |       bootstrap-responsive.css
    |       |   |       bootstrap-responsive.min.css
    |       |   |       bootstrap.css
    |       |   |       bootstrap.min.css
    |       |   |
    |       |   +---img
    |       |   |       glyphicons-halflings-white.png
    |       |   |       glyphicons-halflings.png
    |       |   |
    |       |   \---js
    |       |           bootstrap.js
    |       |           bootstrap.min.js
    |       |
    |       \---jquery
    |           \---js
    |                   jquery.min.js
    |
    +---routes
    |       index.js
    |
    \---views
        |   index.jade
        |   layout.jade
        |
        \---mixins
                form-helpers.jade

## Application structure explained

### app.js
Creates and initializes an express app with a mongoDb connection configured. Routes will be setup by requiring the routes
directory directly. See routes below.

### helpers.js 
Defines some jade/html helpers for displaying error messages and displaying values.

### package.json 
Initial package with value entered in the prompt dialog

### README.md 
Empty readme to silence npm

### config
The config directory is required by `app.js` to load the configuration files. Bumm assumes that you have three config files

* __defaults__ Defines defaults that are used in development and production mode
* __development__ Defines configuration values used in development mode only
* __production__ Defines configuration values used in production mode only

Bumm loads defaults first, then loads the configuration file `development` or `production` depending on the current `NODE_ENV`
environment variable and overrides all default values with the development or production values.

### lib
Bumm ships with a single library file that is responsible to map values provided in request body to a mongoose
model.

### public
The public folder contains a quite up to date version of [twitter bootstrap](http://twitter.github.com/bootstrap/) under `vendor/boostrap`,
an up to date version of [jQuery](http://jquery.com/) under `vendor/jquery` and a `custom.css` file under css.

Bumm organizes all shipped 3rd party css/javascript libraries are placed in the `vendor` directory and follows a `js`, `css`, `img` schema
for vendor libraries. You are free to place your libraries wherever you want :)

### routes
All generated routes will be generated under routes. After creating an app with Bumm, you'll find a single `index.js` file in
this folder. Index.js requires all files that are in or routes or a sub directory of routes to initialize the route. In case
you require a route to be defined before another route you can always require that route in `index.js` or load routes manually
in a defined order.

### views
All generated view will be generated under views. After creating an app with Bumm, you'll find an index.jade that is a welcome
file to display some help text or defined routes, a layout.jade file that defines the layout used by all generated views and
a mixin folder that defines mixins used in Bumm generated views.
