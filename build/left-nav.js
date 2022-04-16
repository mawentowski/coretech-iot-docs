import {
    DIST_DIRECTORY,
    SRC_DIRECTORY,
    TOPICS_FOLDER_NAME,
    getFilenameWithoutExtension,
} from './shared.js';
import fs from 'fs';
import fse from 'fs-extra';
import { marked } from 'marked';

const srcTopicsPath = `${SRC_DIRECTORY}/${TOPICS_FOLDER_NAME}`;
const indexFilename = 'index.html';
const textEncoding = 'utf8';
let distIndexHtmlContent;

export function buildLeftNav() {
    distIndexHtmlContent = getDistIndexHtmlContent();
    buildHtmlBasedOnFolderContents(srcTopicsPath);
    writeToDistIndexHtml();
}

function buildHtmlBasedOnFolderContents(srcFolderPath) {
    fs.readdirSync(srcFolderPath)
        .sort((firstItemName, secondItemName) => {
            const firstItemNameSegments = splitItemName(firstItemName);
            const firstItemIndex = global.Number(firstItemNameSegments[0]);
            const secondItemNameSegments = splitItemName(secondItemName);
            const secondItemIndex = global.Number(secondItemNameSegments[0]);
            return firstItemIndex < secondItemIndex;
        })
        .forEach((itemName) => {
            globalThis.console.log('item', itemName);
            const isFile = itemName.includes('.');
            globalThis.console.log('Is item a file?', isFile);
            const itemNameWithoutExtension = isFile
                ? getFilenameWithoutExtension(itemName)
                : itemName;
            const label = deriveLabelFromItemName(itemNameWithoutExtension);
            const srcItemPath = `${srcFolderPath}/${itemName}`;
            if (isFile) {
                createHtmlFromSrc(srcItemPath);
                insertLeftNavOptionIntoDistIndexHtml(label, srcItemPath);
            } else {
                if (srcFolderPath === srcTopicsPath)
                    insertTabIntoDistIndexHtml(label);
                else
                    insertLeftNavOptionIntoDistIndexHtml(
                        label,
                        srcItemPath,
                        true
                    );
                const newDistFolderPath =
                    DIST_DIRECTORY +
                    srcFolderPath.slice(srcFolderPath.indexOf('/'));
                globalThis.console.log(
                    'New folder in dist directory.',
                    newDistFolderPath
                );
                fs.mkdirSync(`${newDistFolderPath}/${itemName}`);
                buildHtmlBasedOnFolderContents(`${srcFolderPath}/${itemName}`);
            }
        });
}

function createHtmlFromSrc(srcFilePath) {
    const fileName = srcFilePath.slice(srcFilePath.lastIndexOf('/') + 1);
    global.console.log('createHtmlFromSrc fileName', fileName);
    const distHtmlFolder =
        DIST_DIRECTORY +
        srcFilePath.slice(
            srcFilePath.indexOf('/'),
            srcFilePath.lastIndexOf('/') + 1
        );
    global.console.log('createHtmlFromSrc distHtmlPath', distHtmlFolder);
    const isSrcHtml = srcFilePath.endsWith('.html');
    if (isSrcHtml)
        fse.copySync(srcFilePath, `${distHtmlFolder}/${fileName}`, {
            overwrite: true,
        });
    else {
        const fileContent = fs.readFileSync(srcFilePath, textEncoding);
        const html = marked.parse(fileContent);
        const filenameWithoutExtension = getFilenameWithoutExtension(fileName);
        fs.writeFileSync(
            `${distHtmlFolder}/${filenameWithoutExtension}.html`,
            html
        );
    }
}

function deriveLabelFromItemName(itemName) {
    const itemNameSegments = splitItemName(itemName);
    global.console.log(
        'deriveLabelFromItemName itemNameSegments'.itemNameSegments
    );
    itemNameSegments.splice(0, 1);
    const label = itemNameSegments.reduce(
        (accumulator, currentValue, currentIndex) => {
            if (currentIndex) accumulator += ' ';
            const firstLetter = currentValue[0].toUpperCase();
            return accumulator + firstLetter + currentValue.slice(1);
        },
        ''
    );
    globalThis.console.log('item label', label);
    return label;
}

function getDistIndexHtmlContent() {
    return fs.readFileSync(`${DIST_DIRECTORY}/${indexFilename}`, textEncoding);
}

function insertLeftNavOptionIntoDistIndexHtml(
    optionLabel,
    srcItemPath,
    isSection = false
) {
    const relativeItemPath = srcItemPath.slice(srcItemPath.indexOf('/'));
    const parentFolderPath = relativeItemPath.slice(
        0,
        relativeItemPath.lastIndexOf('/')
    );
    const tabName = deriveLabelFromItemName(parentFolderPath.split('/')[2]);
    const optionsInsertPointEnding = 'child left-nav options before here.';
    const isTopLevelLeftNavOption = srcItemPath.split('/').length === 4;
    const optionsInsertPoint = isTopLevelLeftNavOption
        ? '<!--Left-nav options before here.-->'
        : `<!--${parentFolderPath} ${optionsInsertPointEnding}-->`;
    const distIndexHtmlContentSegments =
        distIndexHtmlContent.split(optionsInsertPoint);
    let optionHtml;
    if (isSection) {
        const svgMarkup =
            '<path d="M70 35A35 35 0 1135 0a35 35 0 0135 35"/><path d="M45.88 33.74l-.66-.66L27.3 15.1a1.78 1.78 0 00-2.52 0l-.66.66a1.78 1.78 0 000 2.52L40.78 35 24.12 51.72a1.78 1.78 0 000 2.52l.66.66a1.78 1.78 0 002.52 0L45.17 37l.66-.66a1.8 1.8 0 000-2.53z"/>';
        let leftNavOptionDivClass = 'hidden left-nav-option';
        if (isTopLevelLeftNavOption)
            leftNavOptionDivClass = `${leftNavOptionDivClass} top-level`;
        optionHtml = `
        <div class="${leftNavOptionDivClass}" data-tab-name="${tabName}">
        <span class="collapsed left-nav-section-container">
            <span class="svg-container">
                <svg viewBox="0 0 70 70">${svgMarkup}</svg>
            </span>
            <button class="left-nav-section plain">${optionLabel}</button>
            <!--${relativeItemPath} ${optionsInsertPointEnding}-->
        </span>`;
    } else {
        const filename =
            getFilenameWithoutExtension(
                srcItemPath.slice(srcItemPath.lastIndexOf('/') + 1)
            ) + '.html';
        const topicHtmlFileRelativeUrl = `${parentFolderPath}/${filename}`;
        global.console.log(
            'Topic HTML file relative URL',
            topicHtmlFileRelativeUrl
        );
        optionHtml = `
        <div class="left-nav-option hidden" data-tab-name="${tabName}">
        <button class="left-nav-item plain" data-relative-url="${topicHtmlFileRelativeUrl}">
            ${optionLabel}
        </button>`;
    }
    optionHtml += '</div>';
    distIndexHtmlContentSegments[0] += optionHtml;
    distIndexHtmlContent =
        distIndexHtmlContentSegments.join(optionsInsertPoint);
}

function insertTabIntoDistIndexHtml(tabLabel) {
    const tabsInsertPoint = '<!--Content tabs before here.-->';
    const distIndexHtmlContentSegments =
        distIndexHtmlContent.split(tabsInsertPoint);
    distIndexHtmlContentSegments[0] += `<button class="plain tab">${tabLabel}</button>\n`;
    distIndexHtmlContent = distIndexHtmlContentSegments.join(tabsInsertPoint);
}

function splitItemName(itemName) {
    return itemName.split(/_|-/);
}

function writeToDistIndexHtml() {
    fs.writeFileSync(
        `${DIST_DIRECTORY}/${indexFilename}`,
        distIndexHtmlContent,
        {
            overwrite: true,
        }
    );
}
