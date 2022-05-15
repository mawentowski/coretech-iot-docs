import {
    DIST_DIRECTORY,
    SASS_FOLDER,
    SRC_DIRECTORY,
    getFilenameWithoutExtension,
    removeFolder,
} from './shared.js';
import fs from 'fs';
import sass from 'sass';

const cssExtension = 'css';
const sassDirectory = `${SRC_DIRECTORY}/${SASS_FOLDER}`;
const cssDirectory = `${DIST_DIRECTORY}/${cssExtension}`;

export function compileSass() {
    removeFolder(cssDirectory);
    fs.mkdirSync(cssDirectory);
    fs.readdirSync(sassDirectory).forEach((filename) => {
        globalThis.console.log('sass filename', filename);
        const compilationResult = sass.compile(`${sassDirectory}/${filename}`);
        fs.writeFileSync(
            `${cssDirectory}/${getFilenameWithoutExtension(
                filename
            )}.${cssExtension}`,
            compilationResult.css
        );
    });
}
