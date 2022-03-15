import { u_makeIndent, u_getNewLine } from '../utils'
import * as io from 'atma-io'
import { Dictionary } from './Dictionary';
import { Compiler } from 'atma-io-middleware-base';
import { String } from './String';

declare type File = InstanceType<typeof io.File>

export class ModuleFile {
    id: string
    path: string
    outer = new Dictionary<ModuleFile>()
    scoped = new Dictionary<ModuleFile>()

    imports: ImportNode[] = []
    exports: ExportNode[] = []
    constructor (public content: string, public file: File, public compiler: Compiler) {
        this.id = file.uri.toLocalFile();
        this.path = file.uri.toRelativeString(compiler.io.env.currentDir);
    }

    
    hasDeep (x: ModuleFile, ignore?: ModuleFile, hash: Dictionary<ModuleFile> = new Dictionary<ModuleFile>()) {
        function check (arr: ModuleFile[]) {
            for (let i = 0; i < arr.length; i++) {
                let module = arr[i];
                if (module == ignore || hash.has(module)) {
                    continue;
                }
                hash.add(module);
    
                let has = module.hasDeep(x, ignore, hash);
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
    }

    toScript (indent?: string): string {
        let newLine = u_getNewLine(this.content, this.compiler.io);
        let outerContent = this
            .outer
            .arr
            .map(x => x.toScript())
            .map(x => x.replace(/[\s]*$/, ''))
            .join(newLine);
        
        let scopedContent = this
            .scoped
            .arr
            .map(x => x.toScript())
            .map(x => x.replace(/[\s]*$/, ''))
            .join(newLine);
        

        let content = this.content;

        
        // normalize exports
        this.exports.reverse().forEach(x => {
            switch (x.type) {
                case 'const': 
                    content = String.replace(content, x.position, x.length, x.ref);
                    break;
                case 'function': 
                    content = String.replace(content, x.position, x.length, `${x.ref} = function `);
                    break;
            }
        });
        // remove imports
        this.imports.reverse().forEach(x => {
            content = String.replace(content, x.position, x.length, '');
        });
        
        let externalRefs = '';
        if (this.exports.length > 0) {
            externalRefs = this.exports.reverse().map(x => `    ${x.ref}`).join(`,${newLine}`);
            externalRefs = String.replace(externalRefs, 0, 3, 'var');
            externalRefs += ';';
        }
    
        content = [
            `${outerContent}` || '',
            `${externalRefs}` || '',
            `(function(){`,
            `${u_makeIndent(scopedContent || '', '    ', this.compiler.io)}`,
            `${u_makeIndent(content, '    ', this.compiler.io)}`,
            `}());`
        ].filter(x => !!x).join(newLine);

        return u_makeIndent(content, indent, this.compiler.io);
    }
}
export class ImportNode {
    position: number
    length: number
    str: string
    path: string
    refs: string[]
    type: 'full' | 'refs'

    module: ModuleFile
}
export class ExportNode {
    position: number
    length: number
    str: string
    ref: string
    type: 'const' | 'function'
}

let Rgx = {
    check: /^[ \t]*(import|export)\s+/m,
    Imports: {
        full: {
            rgx: /^[ \t]*import\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map (match: RegExpMatchArray, content: string) {
                let $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'full';
                $import.path = match[1];
                return $import;
            }
        },
        refs: {
            rgx: /^[ \t]*import\s*\{([^}]+)}\s*from\s*['"]([^'"]+)['"][\t ;]*[\r\n]{0,2}/gm,
            map (match: RegExpMatchArray, content: string) {
                let $import = new ImportNode();
                $import.position = match.index;
                $import.length = match[0].length;
                $import.type = 'refs';
                $import.path = match[2];
                $import.refs = match[1].split(',').map(x => x.trim());
                return $import;
            }
        },  
    },
    Exports: {
        const: {
            rgx: /^[ \t]*export\s*const\s+([\w\d_$]+)/gm,
            map (match: RegExpMatchArray, content: string) {
                let $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'const';
                $export.ref = match[1];
                return $export;
            }
        },
        function: {
            rgx: /^[ \t]*export\s*function\s+([\w\d_$]+)/gm,
            map (match: RegExpMatchArray, content: string) {
                let $export = new ExportNode();
                $export.position = match.index;
                $export.length = match[0].length;
                $export.type = 'function';
                $export.ref = match[1];
                return $export;
            }
        }
    }
}

export class Parser {
    static supports (content: string) {
        return Rgx.check.test(content);
    }
    static parse (content: string, file: File, compiler: Compiler): ModuleFile {
        let module = new ModuleFile(content, file, compiler);
        if (Parser.supports(content) === false) {
            return module;
        }
        for (let key in Rgx.Imports) {
            let x = <{rgx: RegExp, map: (...args) => ImportNode}> Rgx.Imports[key];
            x.rgx.lastIndex = 0;            
            for (let match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                module.imports.push(x.map(match, content))
            }
        }
        for (let key in Rgx.Exports) {
            let x = <{rgx: RegExp, map: (...args) => ExportNode}> Rgx.Exports[key];
            x.rgx.lastIndex = 0;
            for (let match = x.rgx.exec(content); match != null; match = x.rgx.exec(content)) {
                module.exports.push(x.map(match, content))
            }
        }

        module.imports.sort((a, b) => a.position < b.position ? -1 : 1);
        module.exports.sort((a, b) => a.position < b.position ? -1 : 1);
        return module;
    }
}

