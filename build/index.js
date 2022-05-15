import {
    DIST_DIRECTORY,
    SASS_FOLDER,
    SRC_DIRECTORY,
    TOPICS_FOLDER_NAME,
    removeFolder,
} from './shared.js';
import { buildLeftNav } from './left-nav.js';
import { compileSass } from './sass.js';
import fs from 'fs';
import fse from 'fs-extra';

const buildTopicsPath = `${DIST_DIRECTORY}/${TOPICS_FOLDER_NAME}`;

removeFolder(DIST_DIRECTORY);
fs.mkdirSync(DIST_DIRECTORY);
// Replace build folder and contents with fresh copy of src folder.
fse.copySync(SRC_DIRECTORY, DIST_DIRECTORY, { overwrite: true });
// Remove copies of topic markdown files.
removeFolder(buildTopicsPath);
fs.mkdirSync(buildTopicsPath);
// Remove copies of Sass files.
removeFolder(`${DIST_DIRECTORY}/${SASS_FOLDER}`, { recursive: true });
// Compile Sass into CSS
compileSass();
// Build tabs and left-nav.
buildLeftNav();
