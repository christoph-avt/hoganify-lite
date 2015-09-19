hoganify-lite
=============

[Mustache](http://mustache.github.io/) precompiler transform plugin for
[Browserify](https://github.com/substack/node-browserify), using
[Hogan.js](https://github.com/twitter/hogan.js) as the compiler. Highly
inspired by [hbsfy](https://github.com/epeli/node-hbsfy).

Compiles Mustache templates to CommonJS modules. The compiled templates
only have one copy of the Hogan.Template object. It doesn't include the
Hogan compiler (this is the main difference with 
[hoganify](https://github.com/eliksir/hoganify)).

Usage
-----

Install hoganify locally to your project:

    npm install --save hoganify

You will also need hogan.js installed:

    npm install --save hogan.js

Then use it as Browserify transform module with `-t`:

    browserify -t hoganify main.js > bundle.js

Or through [grunt-browserify](https://github.com/jmreidy/grunt-browserify)
using the `transform` option:

    browserify: {
      options: {
        transform: ['hoganify']
      }
    }

In your CommonJS code you simply require files with `.hogan`, `.mustache`
or `.ms` extensions:

    var template = require('widget.mustache');
    document.body.innerHTML = template.render({ title: "Hulk" });

Options
-------

If you want to support other extensions than the default ones, you can use the
`--ext` option with one or more comma separated extensions:

    browserify -t [ hoganify --ext .html,.hg ] main.js > bundle.js

Or similarly in grunt-browserify:

    browserify: {
      options: {
        transform: [['hoganify', { ext: '.html,.hg' }]]
      }
    }
