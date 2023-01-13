import fs from "fs";
import path from "path";
import { resolve } from "path";

export function getImages() {
	const paths = fs.readdirSync(path.join(resolve("./public/imgs")));

	return paths;
}
