const fs = require('fs');
const { marked } = require('marked');
const fse = require('fs-extra');

function getMarkdownFilenameWithoutExtension(filename) {
    const regExpExecArray = /(\S*).md/.exec(filename);
    return regExpExecArray[1];
}

function deriveTabLabelFromTopicFileName(filename) {
    const filenameWithoutExtension =
        getMarkdownFilenameWithoutExtension(filename);
    const filenameSegments = filenameWithoutExtension.split('-');
    const tabLabel = filenameSegments.reduce((accumulator, currentValue) => {
        const firstLetter = currentValue[0].toUpperCase();
        return accumulator + ` ${firstLetter}${currentValue.slice(1)}`;
    }, '');
    globalThis.console.log('tab label', tabLabel);
    return tabLabel;
}

const buildFolderName = 'build';
const srcFolderName = 'src';
const topicsFolderName = 'topics';
const buildTopicsPath = `${buildFolderName}/${topicsFolderName}`;

// Replace build folder and contents with fresh copy of src folder.
fse.copySync(srcFolderName, buildFolderName, { overwrite: true });
// Remove copies of topic markdown files.
fs.rmdirSync(buildTopicsPath, { recursive: true });
fs.mkdirSync(buildTopicsPath);

const indexFilename = 'index.html';
let indexContent = fs.readFileSync(`${srcFolderName}/${indexFilename}`, 'utf8');
const contentTabsInsertPoint = '<!--Content tabs before here.-->';
const indexContentSegments = indexContent.split(contentTabsInsertPoint);
const srcTopicsPath = `${srcFolderName}/${topicsFolderName}`;
fs.readdirSync(`${srcTopicsPath}/`).forEach((filename) => {
    globalThis.console.log('topic markdown file', filename);
    const fileContent = fs.readFileSync(`${srcTopicsPath}/${filename}`, 'utf8');
    const html = marked.parse(fileContent);
    fs.writeFileSync(
        `${buildTopicsPath}/${getMarkdownFilenameWithoutExtension(
            filename
        )}.html`,
        html
    );
    const tabLabel = deriveTabLabelFromTopicFileName(filename);
    indexContentSegments[0] += `<button class="">${tabLabel}</button>\n`;
});
fs.writeFileSync(
    `${buildFolderName}/${indexFilename}`,
    indexContentSegments.join(contentTabsInsertPoint),
    { overwrite: true }
);
