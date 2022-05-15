import { config } from './config.js';
import fs from 'fs';

export const BASE_HREF = config.isRelease ? '/docs' : '/';
export const DIST_DIRECTORY = 'dist';
export const SASS_FOLDER = 'scss';
export const SRC_DIRECTORY = 'src';
export const TOPICS_FOLDER_NAME = 'topics';

export function getFilenameWithoutExtension(filename) {
    global.console.log('getFilenameWithoutExtension input', filename);
    const regExpExecArray = /(\S*)\./.exec(filename);
    const output = regExpExecArray[1];
    global.console.log('getFilenameWithoutExtension output', output);
    return regExpExecArray[1];
}

export function removeFolder(folderPath) {
    try {
        fs.rmdirSync(folderPath, { recursive: true });
    } catch (error) {}
}
