import * as Midd from '../src/index'
import * as io from 'atma-io'


io.File.registerExtensions({
    "js-test": [
        [ Midd, 'read']
    ],
});

UTest({
    'should import content from other file' () {
        has_(io.File.read('/test/fixtures/foo.js-test'), 'Hello');
    }
})
