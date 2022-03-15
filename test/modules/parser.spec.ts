import { Parser } from '../../src/modules/Parser'
import * as io from 'atma-io';

let options = { withPathComments: false, extension: 'js' };
let compiler = {
    io,
    getOption: key => options[key]    
};

UTest({
    'should parse module' () {
        let str = `
            import { Baz } from './baz';
            import './qux';;
            import { Aa, Bbbb, Cc } from './letters'

            export const Foo = 'foo';
            export function Bar () { return 'bar' };
        `;

        let module = Parser.parse(str, new io.File('test.js'), compiler);

        eq_(module.imports.length, 3);

        let importNames = module
            .imports
            .filter(x => !!x.refs)
            .reduce((ctx, x) => ctx.concat(x.refs), []);

        deepEq_(importNames, ['Baz', 'Aa', 'Bbbb', 'Cc']);

        let exportNames = module
            .exports
            .reduce((ctx, x) => ctx.concat([ x.ref ]), []);

        deepEq_(exportNames, ['Foo', 'Bar']);

        let script = module.toScript();
        
        has_(script, /^var Foo,/m);
        has_(script, /^    Bar;/m);

        has_(script, /^    Foo =/m);
        has_(script, /^    Bar =/m);

        hasNot_(script, /import/);

        console.log(script);
    }
})