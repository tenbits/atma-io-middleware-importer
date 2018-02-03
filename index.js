
				// source ./templates/RootModule.js
				(function(){
					
					var _src_functions = {};
var _src_glob = {};
var _src_importer = {};
var _src_utils = {};

				// source ./templates/ModuleSimplified.js
				var _src_glob;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *	[as dir] '/dev/*.js' -> '/dev/'
 */
function glob_getStrictPath(path) {
    var index = path.indexOf('*');
    if (index === -1) {
        console.error('glob.js [path is not a glob pattern]', path);
        return null;
    }
    return path.substring(0, path.lastIndexOf('/', index) + 1);
}
exports.glob_getStrictPath = glob_getStrictPath;
;
/**
 *	'c:/dev/*.js' -> '*.js'
 */
function glob_getRelativePath(path) {
    var index = path.indexOf('*');
    if (index === -1) {
        console.error('glob.js [path is not a glob pattern]', path);
        return null;
    }
    return path.substring(path.lastIndexOf('/', index) + 1);
}
exports.glob_getRelativePath = glob_getRelativePath;
;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_glob) && isObject(module.exports)) {
						Object.assign(_src_glob, module.exports);
						return;
					}
					_src_glob = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_utils;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_io_middleware_base_1 = require("atma-io-middleware-base");
var glob_1 = _src_glob;
function u_getNewLine(str) {
    var match = /(\r\n)|(\r)|(\n)/.exec(str);
    return (match && match[0]) || atma_io_middleware_base_1.io.env.newLine;
}
exports.u_getNewLine = u_getNewLine;
;
function u_getIndent(str) {
    var match = /^[ \t]+/.exec(str);
    return match && match[0] || '';
}
exports.u_getIndent = u_getIndent;
;
function u_getFilesFromPath(path) {
    if (path.indexOf('*') !== -1) {
        var dir = new atma_io_middleware_base_1.io.Directory(glob_1.glob_getStrictPath(path));
        if (dir.exists() === false) {
            console.error('Directory not found', dir.uri.toLocalDir());
            return [];
        }
        return dir
            .readFiles(glob_1.glob_getRelativePath(path))
            .files;
    }
    var file = new atma_io_middleware_base_1.io.File(path);
    if (file.exists() === false) {
        console.error('File not found', file.uri.toLocalFile());
        return [];
    }
    return [file];
}
exports.u_getFilesFromPath = u_getFilesFromPath;
;
function u_readFile(file, indent, insertFileName) {
    var content = file.read().toString();
    var newline = u_getNewLine(content);
    if (indent) {
        content = content
            .split(newline)
            .map(function (line) { return indent + line; })
            .join(newline);
    }
    if (insertFileName) {
        content = indent
            + '// source '
            + file.uri.file
            + newline
            + content;
    }
    return content;
}
exports.u_readFile = u_readFile;
;
function u_asString(str) {
    str = str
        .replace(/[\n\r]/g, '\\n')
        .replace(/"/g, '\\"');
    return "\"" + str + "\"";
}
exports.u_asString = u_asString;
;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_utils) && isObject(module.exports)) {
						Object.assign(_src_utils, module.exports);
						return;
					}
					_src_utils = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_functions;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functions = {
    version: function () {
        var path = arr_find([
            'package.json',
            'bower.json',
            'component.json',
            'package.yml'
        ], function (x) { return io.File.exists(x); });
        if (path == null) {
            log_error('Version requested but no "package" found');
            return '0.0.0';
        }
        var json = io.File.read(path);
        var version = json && json.version;
        if (version == null) {
            log_error('Invalid package', path);
            return '0.0.0';
        }
        return version;
    },
    year: function () {
        return new Date().getFullYear();
    }
};
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_functions) && isObject(module.exports)) {
						Object.assign(_src_functions, module.exports);
						return;
					}
					_src_functions = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				

				// source ./templates/ModuleSimplified.js
				var _src_importer;
				(function () {
					var exports = {};
					var module = { exports: exports };
					"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_io_middleware_base_1 = require("atma-io-middleware-base");
var utils_1 = _src_utils;
var functions_1 = _src_functions;
var logger = require("atma-logger");
var compiler;
function process(content, file, compiler_) {
    compiler = compiler_;
    if (rgx_version.test(content))
        content = processVersion(content);
    if (rgx_importFunction.test(content))
        content = processFunctions(content);
    if (rgx_importStatement.test(content))
        content = processContent(file.uri, content);
    return content;
}
exports.default = process;
var rgx_importStatement = /^[\t ]*\/\/[ #]*import(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm, rgx_sourceStatement = /^[\t ]*\/\/[ #]*source(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm, rgx_importBase = /^[\t ]*\/\/[ #]*import:base[ ]([^\s'"]+)$/m, rgx_importExtension = /^[\t ]*\/\/[ #]*import:extension[ ]([^\s'"]+)$/m, rgx_importFunction = /%IMPORT\(([\w\- _\/]+)\)%/g, 
// deprecate
rgx_version = /\/\*[ #]*import[ ]+version[ ]*\*\//gi;
function processContent(currentUri, code) {
    var baseUri = currentUri;
    var extension = 'js';
    var newline = utils_1.u_getNewLine(code);
    if (rgx_importBase.test(code)) {
        code = code.replace(rgx_importBase, function (full, path) {
            baseUri = uri_joinBase(path);
            return '';
        });
    }
    if (rgx_importExtension.test(code)) {
        code = code.replace(rgx_importExtension, function (full, ext) {
            extension = ext;
            return '';
        });
    }
    function uri_joinBase(path) {
        return path[0] === '/'
            ? atma_io_middleware_base_1.io.env.currentDir.combine(path.substring(1))
            : baseUri.combine(path);
    }
    function path_resolveUri(path) {
        var lastC = path[path.length - 1];
        var uri;
        if (lastC === '/') {
            uri = uri_joinBase(path + 'exports.' + extension);
            if (atma_io_middleware_base_1.io.File.exists(uri)) {
                return uri;
            }
            return uri_joinBase(path + '*.' + extension);
        }
        if (/\.\w+$/.test(path) === false) {
            path += '.' + extension;
        }
        return uri_joinBase(path);
    }
    return code.replace(rgx_importStatement, function (full, isString, match1, full2, match2) {
        var path = match1 || match2, uri, files, indent, content;
        if (!path) {
            compiler.logger.write("Path can not be extracted \"" + full + "\"", 'error');
            return full;
        }
        uri = path_resolveUri(path);
        path = uri.toString();
        files = utils_1.u_getFilesFromPath(path);
        indent = utils_1.u_getIndent(full);
        content = files
            .map(function (file) {
            var _virtualUri = { file: 'VIRTUAL'.bold.yellow };
            var _from = (file.uri || _virtualUri).file;
            var msg = "File Import " + _from + " into " + currentUri.file;
            logger.log(msg);
            return utils_1.u_readFile(file, indent, files.length > 1);
        })
            .join(newline);
        if (isString) {
            content = utils_1.u_asString(content);
        }
        return full.replace('import', 'source')
            + newline
            + content
            + newline
            + full.replace('import', 'end:source');
    });
}
function processFunctions(code) {
    return code.replace(rgx_importFunction, function (full, name) {
        var fn = functions_1.Functions[name];
        if (fn == null) {
            logger.error('Unknown IMPORT function', name);
            return full;
        }
        return fn();
    });
}
function processVersion(code) {
    return code.replace(rgx_version, function () {
        logger.error('"import version" is deprecated. Use importer function: %IMPORT' + '(VERSION)%');
        return "'" + functions_1.Functions.version() + "'";
    });
}
function map_parse(fileContent, filename) {
    if (rgx_sourceStatement.test(fileContent) === false)
        return null;
    var lines = fileContent.split(/\r\n|\n|\r/g), map = [];
    var imax = lines.length, i = 0, lineEnd, start, end;
    for (; i < imax; i++) {
        if (rgx_sourceStatement.test(lines[i])) {
            start = end = i + 1;
            lineEnd = lines[i].replace('source', 'end:source');
            while (++end < imax) {
                if (lines[end] === lineEnd) {
                    break;
                }
            }
            if (end === imax) {
                logger.error('<map:imports> Ending was not found', { ending: lineEnd });
                return null;
            }
            map.push({
                file: lines[i].replace(/[ \t]*\/\/[ \t]*source/g, ''),
                start: start,
                end: end - 1
            });
        }
    }
    return map;
}
exports.map_parse = map_parse;
function map_getFileAt(map, line) {
    if (map == null)
        return null;
    var file;
    for (var i = 0, x, imax = map.length; i < imax; i++) {
        x = map[i];
        if (x.start <= line && x.end >= line) {
            if (file == null) {
                file = x;
                continue;
            }
            if (x.start > file.start) {
                file = x;
            }
        }
    }
    return file;
}
exports.map_getFileAt = map_getFileAt;
;
				
					function isObject(x) {
						return x != null && typeof x === 'object' && x.constructor === Object;
					}
					if (isObject(_src_importer) && isObject(module.exports)) {
						Object.assign(_src_importer, module.exports);
						return;
					}
					_src_importer = module.exports;
				}());
				// end:source ./templates/ModuleSimplified.js
				
"use strict";
var Base = require("atma-io-middleware-base");
var importer_1 = _src_importer;
module.exports = Base.create({
    name: 'atma-io-middleware-importer',
    textOnly: true,
    defaultOptions: {},
    process: importer_1.default,
    utils: {
        map_getFileAt: importer_1.map_getFileAt,
        map_parse: importer_1.map_parse
    }
});

				
				}());
				// end:source ./templates/RootModule.js
				