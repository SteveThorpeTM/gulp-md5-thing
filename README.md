# gulp-md5-thing
Insert an MD5 hash into afilenames and retrieve information about the generated hash and hashed filename

```shell
npm install --save-dev gulp-md5-thing
```

## Usage

```javascript
var md5Dict = {};

var gulp_md5_thing = require("gulp-md5-thing");

gulp.src("./src/*.ext")
	.pipe(gulp_md5_thing( arg ))
	.pipe(gulp.dest("./dist"));
```

## API

### gulp_md5_thing( arg )
#### arg
	Type: `String` or `Object` 
	Optional: 
	If type == `String`:
	    'arg'  is a number representing the number of characters from the md5 hash string to be used in the filename
 
	If type == `Object`:
	    'arg' may have any or all of the following properties : 
			'size'      : A number representing the number of characters from the md5 hash string to be used in the filename
			'separator' : A custom separator between the filename and the md5 hash ( e.g. '', '_', '---' )
			'inject'    : A string 'search and replace' token. 
							If provided, and if the token string is present in the file it will be replaced with the md5 hash, 
							calulated on the file's contents before the hash is injected.
		    'md5info'   : A reference to a dictionary which will be populated with an entry for each filename processed during execution.
			              	Each entry will contain the following properties after execution:
						   		'hash'           : The md5 hash created (truncated if 'size' was specified)
						   	 	'hashedfilename' : The new filename with md5 hash inserted
						   	 	'hashedfilepath' : The new filepath with md5 hash inserted
 
	Default: If arg is omitted a full 32 character md5 hash is used and the separator is '-'


## Example

Given the directory structure:

```shell
top/
├── src/
	├── file.a.ext
	├── file.b.ext
	├── file.c.ext
	├── file.d.txt
├── dist/
├── ...
```

```javascript
   var md5_info = {};
   gulp.src('src/**/*.ext', {base: './top'})
        .pipe(gulp_md5_thing({size:6, separator:'_', md5info:md5_info}))
        .pipe(gulp.dest('./dist'));
```

will result in:

```shell
top/
├── src/
	├── file.a.ext
	├── file.b.ext
	├── file.c.ext
	├── file.d.txt
├── dist/
	├── file.a_6b85e3.ext
	├── file.b_53ef22.ext
	├── file.c_2b86b1.ext
├── ...
```
 
and

```shell
console.log( md5_info['file.a.ext'].hash );            //  6b85e3
console.log( md5_info['file.a.ext'].hashedfilename );  //  file.a_6b85e3.ext
console.log( md5_info['file.a.ext'].hashedfilepath );  //  src/file.a_6b85e3.ext
. . . 
etc.
```

## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]

