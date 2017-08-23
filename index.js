var path 		= require('path');
var through2 	= require('through2');
var gulp_util 	= require('gulp-util');
var crypto 		= require('crypto');

module.exports = function( params ) {
	var separator, size, md5info;

  if (typeof params === 'object') {
    separator = params.separator || '-';
    size = params.size || 0;
	md5info = params.md5info || {};
  } else {
    size = params || 0;
    separator = '-';
  }

  return through2.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
      return cb();
    }

    var md5Hash = calcMd5(file, size);
    var filename = path.basename(file.path)
    var dir;

    if (file.path[0] == '.') {
      dir = path.join(file.base, file.path);
    } else {
      dir = file.path;
    }
    dir = path.dirname(dir);

    var md5Filename = filename.split('.').map(function(item, i, arr) {
      return i == arr.length - 2 ? item + separator + md5Hash : item;
    }).join('.');

    file.path = path.join(dir, md5Filename);
	if ( md5info ){
	    md5info[filename] = {hash:md5Hash, hashedpath:file.path, hashedfilename:md5Filename};	
	}
    this.push(file);
    cb();
  }, function(cb) {
    cb();
  });
};

function calcMd5(file, slice) {
  var md5 = crypto.createHash('md5');
  md5.update(file.contents, 'utf8');

  return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}
