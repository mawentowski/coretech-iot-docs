import {
    DIST_DIRECTORY,
    SRC_DIRECTORY,
    TOPICS_FOLDER_NAME,
    getFilenameWithoutExtension,
} from './shared.js';
import fs from 'fs';
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
    fs.readdirSync(srcFolderPath).forEach((itemName) => {
        globalThis.console.log('item', itemName);
        const isFile = itemName.includes('.');
        globalThis.console.log('Is item a file?', isFile);
        const itemNameWithoutExtension = isFile
            ? getFilenameWithoutExtension(itemName)
            : itemName;
        const label = deriveLabelFromItemName(itemNameWithoutExtension);
        const srcItemPath = `${srcFolderPath}/${itemName}`;
        if (isFile) {
            createTopicHtmlFileFromMarkdown(
                itemNameWithoutExtension,
                srcItemPath
            );
            insertLeftNavOptionIntoDistIndexHtml(label, srcItemPath);
        } else {
            if (srcFolderPath === srcTopicsPath)
                insertTabIntoDistIndexHtml(label);
            else insertLeftNavOptionIntoDistIndexHtml(label, srcItemPath, true);
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

function createTopicHtmlFileFromMarkdown(
    filenameWithoutExtension,
    markdownFilePath
) {
    const fileContent = fs.readFileSync(markdownFilePath, textEncoding);
    const htmlFilePath =
        DIST_DIRECTORY +
        markdownFilePath.slice(
            markdownFilePath.indexOf('/'),
            markdownFilePath.lastIndexOf('/') + 1
        );
    globalThis.console.log('HTML file path', htmlFilePath);
    const html = marked.parse(fileContent);
    fs.writeFileSync(`${htmlFilePath}/${filenameWithoutExtension}.html`, html);
}

function deriveLabelFromItemName(itemName) {
    const itemNameSegments = itemName.split('-');
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

function writeToDistIndexHtml() {
    fs.writeFileSync(
        `${DIST_DIRECTORY}/${indexFilename}`,
        distIndexHtmlContent,
        {
            overwrite: true,
        }
    );
}
