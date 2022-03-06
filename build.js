const fs = require('fs');
const { marked } = require('marked');

function deriveTabLabelFromFileName(filename) {
    const regExpExecArray = /(\S*).html/.exec(filename);
    const filenameWithoutExtension = regExpExecArray[1];
    const filenameSegments = filenameWithoutExtension.split('-');
    const tabLabel = filenameSegments.reduce((accumulator, currentValue) => {
        const firstLetter = currentValue[0].toUpperCase();
        return accumulator + ` ${firstLetter}${currentValue.slice(1)}`;
    }, '');
    globalThis.console.log('tab label', tabLabel);
    return tabLabel;
}

const indexFilename = 'index.html';
let indexHtmlContent = fs.readFileSync(indexFilename, 'utf8');
const contentTabsOpeningDivTag = '<!--Content tabs before here.-->';
const indexHtmlContentSegments = indexHtmlContent.split(
    contentTabsOpeningDivTag
);
const tabsFolder = 'tabs/';
fs.readdirSync(tabsFolder).forEach((filename) => {
    globalThis.console.log('filename', filename);
    const tabLabel = deriveTabLabelFromFileName(filename);
    indexHtmlContentSegments[0] += `<button class="">${tabLabel}</button>\n`;
});
const buildFolderName = 'build';
const compiledIndexPath = `${buildFolderName}/${indexFilename}`;
fs.unlinkSync(indexFilename);
fs.writeFileSync(
    compiledIndexPath,
    indexHtmlContentSegments.join(contentTabsOpeningDivTag)
);
