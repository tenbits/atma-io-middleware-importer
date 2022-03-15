import { create } from 'atma-io-middleware-base'
import process, { map_getFileAt, map_parse } from './importer'

export = create({
    name: 'atma-io-middleware-importer',
    textOnly: true,
    defaultOptions: {
        defaultExtension: 'js',
        withPathComments: true,
        inlineJsImports: false
    },
    process,
    utils: {
        map_getFileAt,
        map_parse
    }
});