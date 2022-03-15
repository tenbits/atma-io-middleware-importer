import { inlineJsImports, parseFile, processModule } from '../src/modules/import'
import { TestHelper } from './TestHelper'

import * as io from 'atma-io'

let options = { withPathComments: false, extension: 'js' };
let compiler = {
    io,
    getOption: key => options[key]    
};
const Files = {
    'a.js': `
        import './b'
        export const A = '[a]'
    `,
    'b.js': `
        import './e'
        import './d'        
        export const B = '[b]'
    `,
    'c.js': `
        import './d' 
        export const C = '[c]'
    `,
    'd.js': `
        export const D = '[d]'
    `,
    'e.js': `
        export const E = '[e]'
    `,
    'lf': `
        import { D } from './d'
        export const F = '[f]'
    ` 
}

UTest({
    $before () {
        TestHelper.registerFiles(io, Files)
    },
    $after () {
        TestHelper.clearFiles(io, Files);
    },
    'should do nothing' () {
        let content = `import (any); foo import '';`;
        let result = inlineJsImports(content, new io.File('test.js'), compiler);
        eq_(result, content);
    },
    '[should flattern' () {
        let content = `import 'a.js';`;        
        let module = processModule('./test.js', content, compiler);
        eq_(module.scoped.arr.length, 1);
    },
    'should serialize simple export' () {
        let content = `import 'e.js';`;        
        let code = Helpers.$process(content);
        let expect = `
            (function(){
                var E;
                (function(){            
                    E = '[e]'        
                }());        
            }());
        `;
        Helpers.compareLines(code, expect);
    },
    'should serialize simple import' () {
        let content = `import 'c.js';`;        
        let code = Helpers.$process(content);
        
        let letters = Helpers.$extractLetters(code);
        deepEq_(letters, ['d', 'c']);

        let expect = `
            (function(){
                var C;
                (function(){
                    var D;
                    (function(){
                        D = '[d]'
                    }());
                    C = '[c]'
                }());
            }());
        `;
        Helpers.compareLines(code, expect);
    },
    'should serialize simple import 2' () {
        let content = `import './b'`;
        let code = Helpers.$process(content);
        let letters = Helpers.$extractLetters(code);
        deepEq_(letters, ['e', 'd', 'b']);

        let expect = `
            (function(){
                var B;
                (function(){
                    var E;
                    (function(){
                        E = '[e]'
                    }());
                    var D;
                    (function(){
                        D = '[d]'
                    }());
                    B = '[b]'
                }());
            }());
        `;
        Helpers.compareLines(code, expect);
    },
    'should serialize simple import and export' () {
        let content = `import 'c.js';\nexport const Foo = C`;        
        let code = Helpers.$process(content);
        
        let letters = Helpers.$extractLetters(code);
        deepEq_(letters, ['d', 'c']);

        let expect = `
            var Foo;
            (function(){
                var C;
                (function(){
                    var D;
                    (function(){
                        D = '[d]'
                    }());
                    C = '[c]'
                }());
                Foo = C
            }());
        `;
        Helpers.compareLines(code, expect);

    },
    'should serialize all to global scope' () {
        let content = `import { A } from './a';\nexport const Foo = A;`;
        let code = Helpers.$process(content);
        let letters = Helpers.$extractLetters(code);
        deepEq_(letters, ['e', 'd', 'b', 'a']);
        
        let expect = `
        var Foo;
        (function(){
            var A;
            (function(){
                var B;
                (function(){
                    var E;
                    (function(){
                        E = '[e]'
                    }());
                    var D;
                    (function(){
                        D = '[d]'
                    }());
                    B = '[b]'
                }());
                A = '[a]'
            }());
            Foo = A;
        }());
        `;
        Helpers.compareLines(code, expect);
    },
    'should serialize to scope' () {
        let content = `import 'b.js';`;        
        let code = Helpers.$process(content);
        let letters = Helpers.$extractLetters(code);
        deepEq_(letters, ['e', 'd', 'b']);
        has_(code, /function[^\[]+\[d]/)
    },
    'should extract both scoped imports to outer' () {
        let content = `import './b'; \nimport './lf';`;        
        let code = Helpers.$process(content);
        let letters = Helpers.$extractLetters(code);
        deepEq_(letters, ['d', 'e', 'b', 'f']);

        let expect = `
            (function(){
                var D;
                (function(){
                    D = '[d]'
                }());
                var B;
                (function(){
                    var E;
                    (function(){
                        E = '[e]'
                    }());
                    B = '[b]'
                }());
                var F;
                (function(){
                    F = '[f]'
                }());
            }());   
        `;
        Helpers.compareLines(code, expect);

    }
})

namespace Helpers {
    export function $process (str: string) {
        return inlineJsImports(str, new io.File('./test.js'), compiler);        
    }
    export function $extractLetters (code: string) {
        let letters = [];
        code.replace(/\[(\w)+\]/g, (full, letter) => {
            letters.push(letter);
            return full;
        });
        return letters;
    }
    export function compareLines (a: string, b: string) {
        function getLines (str) {
            let arr = str
                .split(/\n/g)
                .map((x, i) => ({line:i, str: x.trim()}))
                .filter(x => !!x.str);
            return arr;
        }
        let aLines = getLines(a);
        let bLines = getLines(b);
        eq_(aLines.length, bLines.length, `
            Lines should be equal.
            A:${a}
            B:${b}
        `);

        for (let i = 0; i < aLines.length; i++) {
            let aLine = aLines[i];
            let bLine = bLines[i];
            eq_(aLine.str, bLine.str, `
                Lines are not equal at ${i}.
            `)
            if (aLine.str !== bLine.str) {
                break;
            }
        }
        
    }
}