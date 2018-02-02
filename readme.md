File import middleware for Atma.IO and Atma.Toolkit
-----

The Plugin provides a custom middleware to import content from other files:
- [`atma-io`](https://github.com/atmajs/atma-io) 
- [`Atma Toolkit`](https://github.com/atmajs/Atma.Toolkit) 
- [`App Bundler`](https://github.com/atmajs/app-bundler) 


##### How to use

```js
lorem
//# import ./my/super.file
ipsum
```

###### Embed into the project

+ **Atma Toolkit** 

    ```bash
    $ atma plugin install atma-io-middleware-importer --save-dev
    ```

	This adds `atma-io-middleware-importer` npm dependency and the `package.json` would look like:
    ```json
        {
            "devDependencies": {
                "atma-io-middleware-importer"
            },
            "atma": {
                "plugins": [
                    "atma-io-middleware-importer"
                ],
                "settings": {
					"atma-io-middleware-importer": {
                        define: {
                            DEBUG: true
                        }
                    }
                }
            }
        }
    ```
+ **App Bundler** 
    
    ```bash
    $ npm i atma-io-middleware-importer --save-dev
    ```

    Extend AppBundler config with IO settings, for example in `package.json` for typescript extensions.
    ```javascript
    {
        /* ... any package json settings */
        "app-bundler": {
            /* ... any app-bundler settings */
            "middlewares": {                
                "ts": [
                    "atma-io-middleware-importer:read",
                    "atma-loader-ts:read"
                ]
            }
        },
    }
    ```

+ Run

    + **Atma Toolkit**  Dev Server
        ```bash
        $ atma server
        ```

    + **App Bundler**  Just run app bundler commands as usual
        
----
The MIT License