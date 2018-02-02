import * as Base from 'atma-io-middleware-base'
import process from './importer'

export = Base.create({
    name: 'atma-io-middleware-importer',
    textOnly: true,
    defaultOptions: {
        
    },
    process
});