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
  scaffold <name> [Attrib]   Create a new route, model and views for <name>
  view <name> [Attrib]       Creates views for a <name>
  route <name> [Attrib]      Creates a route for a <name>
  model <name> [Attrib]      Creates a new mongoose model for a <name>

Attrib:
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
