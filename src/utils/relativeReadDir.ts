import fs from "fs";
import path from "path";

/** Be sure to pass in ``__dirname`` to the `root` parameter. */
export const relativeReadDir = (root: string, dir: string): string[] => {
	dir = path.resolve(root, dir);
	return fs.readdirSync(dir).filter(
		(filename) =>
			filename.endsWith(".js") &&
			filename !== "index.js" &&
			fs.readFileSync(`${dir}/${filename}`).length !== 0 // file isn't empty
	);
};
