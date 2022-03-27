import { DIST_DIRECTORY, SASS_FOLDER, SRC_DIRECTORY } from './shared.js';
import { buildLeftNav } from './left-nav';
import { compileSass } from './sass.js';
import fs from 'fs';
import fse from 'fs-extra';

// Replace build folder and contents with fresh copy of src folder.
fse.copySync(SRC_DIRECTORY, DIST_DIRECTORY, { overwrite: true });
// Remove copies of topic markdown files.
fs.rmdirSync(buildTopicsPath, { recursive: true });
fs.mkdirSync(buildTopicsPath);
// Remove copies of Sass files.
fs.rmdirSync(`${DIST_DIRECTORY}/${SASS_FOLDER}`, { recursive: true });
// Compile Sass into CSS
compileSass();
// Build tabs and left-nav.
buildLeftNav();
