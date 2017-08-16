# gulp-md5-thing
Insert an MD5 hash into afilenames and retrieve information about the generated hash and hashed filename

```shell
npm install --save-dev gulp-md5-thing
```

## Usage

```javascript
var md5Dict = {};

var md5_thing = require("gulp-md5-thing");

gulp.src("./src/*.ext")
	.pipe(md5_thing( arg ))
	.pipe(gulp.dest("./dist"));
```

## API

### md5( arg )
#### arg
	Type: `String` or `Object` 
	Optionnal: 
	If type == `String`:
	    'arg'  is number representing the number of characters from md5 hash string to be used in the filename
 
	If type == `Object`:
	    'arg' may have any or all of the following properties : 
			'size'      : A number representing the number of characters from md5 hash string to be used in the filename
			'separator' : A custom separator between the filename and the md5 hash ( e.g. '', '_', '---' )
		    'dict'      : A reference to an Object which will be populated with an entry for each filename processed during exection
			               Each entry will contain the following properties after execution:
						   'hash'       : The md5 hash created (truncated if 'size' was specified)
						   'hashedname' : The new filename with md5 hash inserted
						   'hashedpath' : The new filepath with md5 hash inserted
 
	Default: If omitted a full 32 character md5 hash is used and separator is '-'


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
   var md5Dict = {};
	gulp.src('src/**/*.ext', {base: './top'})
        .pipe(md5({size:6, separator:'_', dict:md5Dict}))
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
console.log( md5Dict['file.a.ext'].hash );        //  6b85e3
console.log( md5Dict['file.a.ext'].hashedname );  //  file.a_6b85e3.ext
console.log( md5Dict['file.a.ext'].hashedpath );  //  src/file.a_6b85e3.ext
. . . 
etc.
```

## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]

