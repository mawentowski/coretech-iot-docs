import {
    DIST_DIRECTORY,
    SRC_DIRECTORY,
    getFilenameWithoutExtension,
} from './shared.js';
import { sass } from 'node-sass';
import fs from 'fs';

const cssExtension = 'css';

fs.readdirSync(`${SRC_DIRECTORY}/${cssExtension}`).forEach((filename) => {
    globalThis.console.log('sass filename', filename);
    const fileContent = fs.readFileSync(`${sassDirectory}/${filename}`, 'utf8');
    const css = sass.renderSync({
        data: fileContent,
    });
    fs.writeFileSync(
        `${DIST_DIRECTORY}/${cssExtension}/${getFilenameWithoutExtension(
            filename
        )}.css`,
        css
    );
});
