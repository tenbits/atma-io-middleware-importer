import { Compiler } from "atma-io-middleware-base";

export interface IFunctions {
    [key: string]: (compiler?: Compiler) => string
}

export const Functions: IFunctions = {
    version (compiler: Compiler) {
		var path = [
			'package.json',
			'bower.json',
			'component.json',
			'package.yml'
        ].find(x => compiler.io.exists(x));
        
		if (path == null) {
            compiler.logger.error('Version requested but no "package" found');
			return '0.0.0';
		}
		var json = compiler.io.File.read(path);
		var version = json && json.version;
		if (version == null) {
			compiler.logger.error(`Package ${path} has no version`);
			return '0.0.0';
		}
		return version;
	},
	
	year () {
		return new Date().getFullYear() + '';
	}
}