var Hogan = require('hogan.js'),
    path = require('path'),
    through = require('through2');

var defaultExtensions = ['.hogan', '.mustache', '.ms'];

module.exports = function hoganify (file, options) {

  // Add extensions in 'options.ext' to supported extensions.
  var extensions = defaultExtensions.concat(options.ext &&
                      options.ext.split(',') || []);

  // Return a passthrough stream if the file extension
  // is not supported by this transform.
  if (extensions.indexOf(path.extname(file)) === -1) {
    return through();
  }

  var buffer = '';

  // Buffer file content chunks.
  function write (chunk, enc, next) {
    buffer += chunk;
    next();
  }

  function end () {
    var template = null,
        compiled = '';

    // Require the Hogan without the compiler
    compiled += 'var Template = require("hogan-template");\n';

    // Compile the template as string.
    template = Hogan.compile(buffer, { asString: true });
    compiled += 'module.exports = new Hogan.Template(' + template + ');';

    this.push(compiled);
    this.push(null);
  }

  return through(write, end);
};
