import * as Base from 'atma-io-middleware-base'
import process, { map_getFileAt, map_parse } from './importer'

export = Base.create({
    name: 'atma-io-middleware-importer',
    textOnly: true,
    defaultOptions: {
        
    },
    process,
    utils: {
        map_getFileAt,
        map_parse
    }
});