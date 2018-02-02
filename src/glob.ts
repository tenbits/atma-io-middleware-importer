/**
 *	[as dir] '/dev/*.js' -> '/dev/'
 */
export function glob_getStrictPath(path) {
	var index = path.indexOf('*');
	if (index === -1) {
		console.error('glob.js [path is not a glob pattern]', path);
		return null;
	}

	return path.substring(0, path.lastIndexOf('/', index) + 1);
};

/**
 *	'c:/dev/*.js' -> '*.js'
 */
export function glob_getRelativePath(path) {
	var index = path.indexOf('*');
	if (index === -1) {
		console.error('glob.js [path is not a glob pattern]', path);
		return null;
	}

	return path.substring(path.lastIndexOf('/', index) + 1);
};
