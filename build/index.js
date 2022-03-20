import {
    DIST_DIRECTORY,
    SRC_DIRECTORY,
    getFilenameWithoutExtension,
} from './shared.js';
import { marked } from 'marked';
import fs from 'fs';
import fse from 'fs-extra';

function deriveTabLabelFromTopicFileName(filename) {
    const filenameWithoutExtension = getFilenameWithoutExtension(filename);
    const filenameSegments = filenameWithoutExtension.split('-');
    const tabLabel = filenameSegments.reduce((accumulator, currentValue) => {
        const firstLetter = currentValue[0].toUpperCase();
        return accumulator + ` ${firstLetter}${currentValue.slice(1)}`;
    }, '');
    globalThis.console.log('tab label', tabLabel);
    return tabLabel;
}

const topicsFolderName = 'topics';
const buildTopicsPath = `${DIST_DIRECTORY}/${topicsFolderName}`;

// Replace build folder and contents with fresh copy of src folder.
fse.copySync(SRC_DIRECTORY, DIST_DIRECTORY, { overwrite: true });
// Remove copies of topic markdown files.
fs.rmdirSync(buildTopicsPath, { recursive: true });
fs.mkdirSync(buildTopicsPath);
// Remove copies of sass files.
fs.rmdirSync(`${DIST_DIRECTORY}/scss`, { recursive: true });

const indexFilename = 'index.html';
let indexContent = fs.readFileSync(`${SRC_DIRECTORY}/${indexFilename}`, 'utf8');
const contentTabsInsertPoint = '<!--Content tabs before here.-->';
const indexContentSegments = indexContent.split(contentTabsInsertPoint);
const srcTopicsPath = `${SRC_DIRECTORY}/${topicsFolderName}`;
fs.readdirSync(`${srcTopicsPath}/`).forEach((filename) => {
    globalThis.console.log('topic markdown file', filename);
    const fileContent = fs.readFileSync(`${srcTopicsPath}/${filename}`, 'utf8');
    const html = marked.parse(fileContent);
    fs.writeFileSync(
        `${buildTopicsPath}/${getFilenameWithoutExtension(filename)}.html`,
        html
    );
    const tabLabel = deriveTabLabelFromTopicFileName(filename);
    indexContentSegments[0] += `<button class="tab">${tabLabel}</button>\n`;
});
fs.writeFileSync(
    `${DIST_DIRECTORY}/${indexFilename}`,
    indexContentSegments.join(contentTabsInsertPoint),
    { overwrite: true }
);
