
// source ./RootModule.js
(function(){
	
	var _src_functions = {};
var _src_glob = {};
var _src_importer = {};
var _src_modules_Dictionary = {};
var _src_modules_Parser = {};
var _src_modules_String = {};
var _src_modules_import = {};
var _src_utils = {};

// source ./ModuleSimplified.js
var _src_glob;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_glob != null ? _src_glob : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glob_getRelativePath = exports.glob_getStrictPath = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_glob === module.exports) {
        // do nothing if
    } else if (__isObj(_src_glob) && __isObj(module.exports)) {
        Object.assign(_src_glob, module.exports);
    } else {
        _src_glob = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils != null ? _src_utils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.u_asString = exports.u_readFile = exports.u_getFilesFromPath = exports.u_makeIndent = exports.u_getIndent = exports.u_getNewLine = void 0;
var glob_1 = _src_glob;
function u_getNewLine(str, io) {
    var match = /(\r\n)|(\r)|(\n)/.exec(str);
    return (match && match[0]) || io.env.newLine;
}
exports.u_getNewLine = u_getNewLine;
;
function u_getIndent(str) {
    var match = /^[ \t]+/.exec(str);
    return match && match[0] || '';
}
exports.u_getIndent = u_getIndent;
;
function u_makeIndent(str, indent, io) {
    if (!indent)
        return str;
    var newline = u_getNewLine(str, io);
    return str
        .split(newline)
        .map(function (line) { return indent + line; })
        .join(newline);
}
exports.u_makeIndent = u_makeIndent;
;
function u_getFilesFromPath(path, io) {
    if (path.indexOf('*') !== -1) {
        var dir = new io.Directory((0, glob_1.glob_getStrictPath)(path));
        if (dir.exists() === false) {
            console.error('Directory not found', dir.uri.toLocalDir());
            return [];
        }
        return dir
            .readFiles((0, glob_1.glob_getRelativePath)(path))
            .files;
    }
    var file = new io.File(path);
    if (file.exists() === false) {
        console.error('File not found', file.uri.toLocalFile());
        return [];
    }
    return [file];
}
exports.u_getFilesFromPath = u_getFilesFromPath;
;
function u_readFile(io, file, indent, insertFileName) {
    var content = file.read().toString();
    var newline = u_getNewLine(content, io);
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
    return "\"".concat(str, "\"");
}
exports.u_asString = u_asString;
;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils) && __isObj(module.exports)) {
        Object.assign(_src_utils, module.exports);
    } else {
        _src_utils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_functions;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_functions != null ? _src_functions : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Functions = void 0;
exports.Functions = {
    version: function (compiler) {
        var path = [
            'package.json',
            'bower.json',
            'component.json',
            'package.yml'
        ].find(function (x) { return compiler.io.File.exists(x); });
        if (path == null) {
            compiler.logger.error('Version requested but no "package" found');
            return '0.0.0';
        }
        var json = compiler.io.File.read(path);
        var version = json && json.version;
        if (version == null) {
            compiler.logger.error("Package ".concat(path, " has no version"));
            return '0.0.0';
        }
        return version;
    },
    year: function () {
        return new Date().getFullYear() + '';
    }
};
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_functions === module.exports) {
        // do nothing if
    } else if (__isObj(_src_functions) && __isObj(module.exports)) {
        Object.assign(_src_functions, module.exports);
    } else {
        _src_functions = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_modules_Dictionary;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_modules_Dictionary != null ? _src_modules_Dictionary : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionary = void 0;
var Dictionary = /** @class */ (function () {
    function Dictionary() {
        this.hash = {};
        this.arr = [];
    }
    Dictionary.prototype.add = function () {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        for (var i = 0; i < arr.length; i++) {
            var x = arr[i];
            if (this.hash[x.id] != null) {
                continue;
            }
            this.hash[x.id] = x;
            this.arr.push(x);
        }
    };
    Dictionary.prototype.insert = function (x, i) {
        if (this.hash[x.id] != null) {
            this.remove(x);
        }
        this.hash[x.id] = x;
        this.arr.splice(i, 0, x);
    };
    Dictionary.prototype.has = function (x) {
        return this.hash[x.id] != null;
    };
    Dictionary.prototype.remove = function (x) {
        delete this.hash[x.id];
        var i = this.arr.findIndex(function (module) { return module.id === x.id; });
        this.arr.splice(i, 1);
    };
    Dictionary.prototype.removeByFn = function (fn) {
        for (var i = 0; i < this.arr.length; i++) {
            var x = this.arr[i];
            ///if (x.id.includes('e.')) debugger;
            if (fn(x)) {
                this.arr.splice(i, 1);
                delete this.hash[x.id];
                i--;
            }
        }
    };
    Dictionary.prototype.forEach = function (fn) {
        for (var i = 0; i < this.arr.length; i++) {
            var x = this.arr[i];
            fn(x);
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_modules_Dictionary === module.exports) {
        // do nothing if
    } else if (__isObj(_src_modules_Dictionary) && __isObj(module.exports)) {
        Object.assign(_src_modules_Dictionary, module.exports);
    } else {
        _src_modules_Dictionary = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_modules_String;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_modules_String != null ? _src_modules_String : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
var String;
(function (String) {
    function replace(str, i, length, ins) {
        if (ins === void 0) { ins = ''; }
        return str.substring(0, i) + ins + str.substring(i + length);
    }
    String.replace = replace;
})(String = exports.String || (exports.String = {}));
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_modules_String === module.exports) {
        // do nothing if
    } else if (__isObj(_src_modules_String) && __isObj(module.exports)) {
        Object.assign(_src_modules_String, module.exports);
    } else {
        _src_modules_String = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_modules_Parser;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_modules_Parser != null ? _src_modules_Parser : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.ExportNode = exports.ImportNode = exports.ModuleFile = void 0;
var utils_1 = _src_utils;
var Dictionary_1 = _src_modules_Dictionary;
var String_1 = _src_modules_String;
var ModuleFile = /** @class */ (function () {
    function ModuleFile(content, file, compiler) {
        this.content = content;
        this.file = file;
        this.compiler = compiler;
        this.outer = new Dictionary_1.Dictionary();
        this.scoped = new Dictionary_1.Dictionary();
        this.imports = [];
        this.exports = [];
        this.id = file.uri.toLocalFile();
        this.path = file.uri.toRelativeString(compiler.io.env.currentDir);
    }
    ModuleFile.prototype.hasDeep = function (x, ignore, hash) {
        if (hash === void 0) { hash = new Dictionary_1.Dictionary(); }
        function check(arr) {
            for (var i = 0; i < arr.length; i++) {
                var module = arr[i];
                if (module == ignore || hash.has(module)) {
                    continue;
                }
                hash.add(module);
                var has = module.hasDeep(x, ignore, hash);
                if (has) {
                    return true;
                }
            }
            return false;
        }
        if (this.id === x.id) {
            return true;
        }
        return check(this.outer.arr) || check(this.scoped.arr);
    };
    ModuleFile.prototype.toScript = function (indent) {
        var newLine = (0, utils_1.u_getNewLine)(this.content, this.compiler.io);
        var outerContent = this
            .outer
            .arr
            .map(function (x) { return x.toScript(); })
            .map(function (x) { return x.replace(/[\s]*$/, ''); })
            .join(newLine);
        var scopedContent = this
            .scoped
            .arr
            .map(function (x) { return x.toScript(); })
            .map(function (x) { return x.replace(/[\s]*$/, ''); })
            .join(newLine);
        var content = this.content;
        // normalize exports
        this.exports.reverse().forEach(function (x) {
            switch (x.type) {
                case 'const':
                    content = String_1.String.replace(content, x.position, x.length, x.ref);
                    break;
                case 'function':
                    content = String_1.String.replace(content, x.position, x.length, "".concat(x.ref, " = function "));
                    break;
            }
        });
        // remove imports
        this.imports.reverse().forEach(function (x) {
            content = String_1.String.replace(content, x.position, x.length, '');
        });
        var externalRefs = '';
        if (this.exports.length > 0) {
            externalRefs = this.exports.reverse().map(function (x) { return "    ".concat(x.ref); }).join(",".concat(newLine));
            externalRefs = String_1.String.replace(externalRefs, 0, 3, 'var');
            externalRefs += ';';
        }
        content = [
            "".concat(outerContent) || '',
            "".concat(externalRefs) || '',
            "(function(){",
            "".concat((0, utils_1.u_makeIndent)(scopedContent || '', '    ', this.compiler.io)),
            "".concat((0, utils_1.u_makeIndent)(content, '    ', this.compiler.io)),
            "}());"
        ].filter(function (x) { return !!x; }).join(newLine);
        return (0, utils_1.u_makeIndent)(content, indent, this.compiler.io);
    };
    return ModuleFile;
}());
exports.ModuleFile = ModuleFile;
var ImportNode = /** @class */ (function () {
    function ImportNode() {
    }
    return ImportNode;
}());
exports.ImportNode = ImportNode;
var ExportNode = /** @class */ (function () {
    function ExportNode() {
    }
    return ExportNode;
}());
exports.ExportNode = ExportNode;
var Rgx = {
    check: /^[ \t]*(import|export)\s+/m,
    Imports: {
        full: {
            rgx: /^[ \t]*import\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map: function (match, content) {
                var $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'full';
                $import.path = match[1];
                return $import;
            }
        },
        refs: {
            rgx: /^[ \t]*import\s*\{([^}]+)}\s*from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map: function (match, content) {
                var $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'refs';
                $import.path = match[2];
                $import.refs = match[1].split(',').map(function (x) { return x.trim(); });
                return $import;
            }
        },
    },
    Exports: {
        const: {
            rgx: /^[ \t]*export\s*const\s+([\w\d_$]+)/gm,
            map: function (match, content) {
                var $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'const';
                $export.ref = match[1];
                return $export;
            }
        },
        function: {
            rgx: /^[ \t]*export\s*function\s+([\w\d_$]+)/gm,
            map: function (match, content) {
                var $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'function';
                $export.ref = match[1];
                return $export;
            }
        }
    }
};
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.supports = function (content) {
        return Rgx.check.test(content);
    };
    Parser.parse = function (content, file, compiler) {
        var module = new ModuleFile(content, file, compiler);
        if (Parser.supports(content) === false) {
            return module;
        }
        for (var key in Rgx.Imports) {
            var x = Rgx.Imports[key];
            x.rgx.lastIndex = 0;
            for (var match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                module.imports.push(x.map(match, content));
            }
        }
        for (var key in Rgx.Exports) {
            var x = Rgx.Exports[key];
            x.rgx.lastIndex = 0;
            for (var match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                module.exports.push(x.map(match, content));
            }
        }
        module.imports.sort(function (a, b) { return a.position < b.position ? -1 : 1; });
        module.exports.sort(function (a, b) { return a.position < b.position ? -1 : 1; });
        return module;
    };
    return Parser;
}());
exports.Parser = Parser;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_modules_Parser === module.exports) {
        // do nothing if
    } else if (__isObj(_src_modules_Parser) && __isObj(module.exports)) {
        Object.assign(_src_modules_Parser, module.exports);
    } else {
        _src_modules_Parser = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_modules_import;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_modules_import != null ? _src_modules_import : {};
    var module = { exports: exports };

    "use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinct = exports.flattern = exports.parseFile = exports.processModule = exports.inlineJsImports = void 0;
var Parser_1 = _src_modules_Parser;
var compiler;
var cache = {};
var options = {
    withPathComments: true,
    extension: 'js'
};
function inlineJsImports(content, file, compiler_) {
    compiler = compiler_;
    cache = {};
    if (Parser_1.Parser.supports(content) === false) {
        return content;
    }
    var withPathComments = compiler.getOption('withPathComments');
    if (withPathComments == null) {
        withPathComments = true;
    }
    options.withPathComments = withPathComments;
    options.extension = compiler.getOption('extension');
    var root = processModule(file.uri.toLocalFile(), content, compiler_);
    return root.toScript();
}
exports.inlineJsImports = inlineJsImports;
function processModule(localFilePath, content, compiler_) {
    var root = parseFile(localFilePath, content, compiler_);
    flattern(root);
    distinct(root);
    return root;
}
exports.processModule = processModule;
function parseFile(localFilePath, content, compiler_) {
    if (compiler_ != null) {
        compiler = compiler_;
    }
    if (localFilePath in cache) {
        return cache[localFilePath];
    }
    var file = new compiler.io.File(localFilePath);
    if (content == null) {
        if (file.exists() === false) {
            throw new Error("File not found ".concat(localFilePath));
        }
        content = file.read({ skipHooks: true });
    }
    var module = cache[localFilePath] = Parser_1.Parser.parse(content, file, compiler);
    module.imports.forEach(function (x) {
        var path = x.path;
        if (/\.\w+$/.test(path) === false) {
            path += ".".concat(options.extension);
        }
        var uri = path[0] === '/'
            ? new compiler.io.Uri(path)
            : file.uri.combine(path);
        x.module = parseFile(uri.toLocalFile());
    });
    return module;
}
exports.parseFile = parseFile;
function flattern(module) {
    module
        .imports
        .forEach(function (x) {
        flattern(x.module);
        module.scoped.add(x.module);
    });
}
exports.flattern = flattern;
function distinct(module, parents) {
    if (parents === void 0) { parents = []; }
    module.outer.removeByFn(function (x) {
        return parents.some(function (p) { return p.outer.has(x); });
    });
    module.outer.forEach(function (x) { return distinct(x, __spreadArray(__spreadArray([], parents, true), [module], false)); });
    module.scoped.removeByFn(function (x) {
        var inOuter = parents.some(function (p) { return p.outer.has(x); });
        if (inOuter) {
            return true;
        }
        var inScope = parents.some(function (p) { return p.scoped.has(x); });
        if (inScope) {
            return true;
        }
        for (var i = parents.length - 1; i > -1; i--) {
            var p = parents[i];
            var hasDeep = p.hasDeep(x, module);
            if (hasDeep) {
                for (var i_1 = 0; i_1 < p.outer.arr.length; i_1++) {
                    var child = p.outer.arr[i_1];
                    if (child.hasDeep(x)) {
                        p.outer.insert(x, i_1);
                        return true;
                    }
                }
                for (var i_2 = 0; i_2 < p.scoped.arr.length; i_2++) {
                    var child = p.scoped.arr[i_2];
                    if (child.hasDeep(x)) {
                        p.scoped.insert(x, i_2);
                        return true;
                    }
                }
                throw new Error('O_o: Child not found');
                p.outer.add(x);
                return true;
            }
        }
        return false;
    });
    module.scoped.forEach(function (x) { return distinct(x, __spreadArray(__spreadArray([], parents, true), [module], false)); });
}
exports.distinct = distinct;
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_modules_import === module.exports) {
        // do nothing if
    } else if (__isObj(_src_modules_import) && __isObj(module.exports)) {
        Object.assign(_src_modules_import, module.exports);
    } else {
        _src_modules_import = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_importer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_importer != null ? _src_importer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map_getFileAt = exports.map_parse = void 0;
var utils_1 = _src_utils;
var functions_1 = _src_functions;
var import_1 = _src_modules_import;
var logger = require("atma-logger");
var compiler;
function process(content, file, compiler_) {
    if (typeof content !== 'string') {
        return { content: content };
    }
    compiler = compiler_;
    if (compiler_.getOption('inlineJsImports') === true) {
        content = (0, import_1.inlineJsImports)(content, file, compiler_);
    }
    if (rgx_version.test(content)) {
        content = processVersion(content);
    }
    if (rgx_importFunction.test(content)) {
        content = processFunctions(content);
    }
    if (rgx_importStatement.test(content)) {
        content = processContent(file.uri, content);
    }
    return { content: content };
}
exports.default = process;
var rgx_importStatement = /^[\t ]*\/\/[ #]*import(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm, rgx_sourceStatement = /^[\t ]*\/\/[ #]*source(:string)?[ ]+(([^\s'"]+)|('|"([^'"]+))'|")[ \t]*$/gm, rgx_importBase = /^[\t ]*\/\/[ #]*import:base[ ]([^\s'"]+)$/m, rgx_importExtension = /^[\t ]*\/\/[ #]*import:extension[ ]([^\s'"]+)$/m, rgx_importFunction = /%IMPORT\(([\w\- _\/]+)\)%/g, 
// deprecate
rgx_version = /\/\*[ #]*import[ ]+version[ ]*\*\//gi;
function processContent(currentUri, code) {
    var baseUri = currentUri;
    var extension = 'js';
    var newline = (0, utils_1.u_getNewLine)(code, compiler.io);
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
            ? compiler.io.env.currentDir.combine(path.substring(1))
            : baseUri.combine(path);
    }
    function path_resolveUri(path) {
        var lastC = path[path.length - 1];
        var uri;
        if (lastC === '/') {
            uri = uri_joinBase(path + 'exports.' + extension);
            if (compiler.io.File.exists(uri)) {
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
            compiler.logger.write("Path can not be extracted \"".concat(full, "\""), 'error');
            return full;
        }
        uri = path_resolveUri(path);
        path = uri.toString();
        files = (0, utils_1.u_getFilesFromPath)(path, compiler.io);
        indent = (0, utils_1.u_getIndent)(full);
        content = files
            .map(function (file) {
            var _virtualUri = { file: 'VIRTUAL'.bold.yellow };
            var _from = (file.uri || _virtualUri).file;
            var msg = "File Import ".concat(_from, " into ").concat(currentUri.file);
            logger.log(msg);
            return (0, utils_1.u_readFile)(compiler.io, file, indent, files.length > 1);
        })
            .join(newline);
        if (isString) {
            content = (0, utils_1.u_asString)(content);
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
        return fn(compiler);
    });
}
function processVersion(code) {
    return code.replace(rgx_version, function () {
        logger.error('"import version" is deprecated. Use importer function: %IMPORT' + '(VERSION)%');
        return "'" + functions_1.Functions.version(compiler) + "'";
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_importer === module.exports) {
        // do nothing if
    } else if (__isObj(_src_importer) && __isObj(module.exports)) {
        Object.assign(_src_importer, module.exports);
    } else {
        _src_importer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
var atma_io_middleware_base_1 = require("atma-io-middleware-base");
var importer_1 = _src_importer;
module.exports = (0, atma_io_middleware_base_1.create)({
    name: 'atma-io-middleware-importer',
    textOnly: true,
    defaultOptions: {
        defaultExtension: 'js',
        withPathComments: true,
        inlineJsImports: false
    },
    process: importer_1.default,
    utils: {
        map_getFileAt: importer_1.map_getFileAt,
        map_parse: importer_1.map_parse
    }
});


}());
// end:source ./RootModule.js
