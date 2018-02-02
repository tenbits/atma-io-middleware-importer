import { io } from 'atma-io-middleware-base'
import { glob_getRelativePath, glob_getStrictPath } from './glob';

export function u_getNewLine(str) {
    var match = /(\r\n)|(\r)|(\n)/.exec(str);
    return (match && match[0]) || io.env.newLine;
};
export function u_getIndent(str) {
    var match = /^[ \t]+/.exec(str);
    return match && match[0] || '';
};

export function u_getFilesFromPath(path) {
    if (path.indexOf('*') !== -1) {
        var dir = new io.Directory(glob_getStrictPath(path));
        if (dir.exists() === false) {
            console.error('Directory not found', dir.uri.toLocalDir());
            return [];
        }
        return dir
            .readFiles(glob_getRelativePath(path))
            .files;
    }
    var file = new io.File(path);
    if (file.exists() === false) {
        console.error('File not found', file.uri.toLocalFile());
        return [];
    }

    return [file];
};

export function u_readFile(file, indent, insertFileName) {
    var content = file.read().toString();
    var newline = u_getNewLine(content);
    if (indent) {
        content = content
            .split(newline)
            .map(line => indent + line)
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
};

export function u_asString(str) {
    str = str
        .replace(/[\n\r]/g, '\\n')
        .replace(/"/g, '\\"')
        ;

    return `"${str}"`;
};