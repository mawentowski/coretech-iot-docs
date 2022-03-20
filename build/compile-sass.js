import {
    DIST_DIRECTORY,
    SASS_FOLDER,
    SRC_DIRECTORY,
    getFilenameWithoutExtension,
} from './shared.js';
import sass from 'sass';
import fs from 'fs';

const cssExtension = 'css';
const sassDirectory = `${SRC_DIRECTORY}/${SASS_FOLDER}`;
const cssDirectory = `${DIST_DIRECTORY}/${cssExtension}`;

export function compileSass() {
    fs.rmdirSync(cssDirectory, { recursive: true });
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
