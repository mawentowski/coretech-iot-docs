import {
    DIST_DIRECTORY,
    SRC_DIRECTORY,
    getFilenameWithoutExtension,
} from './shared.js';
import fs, { write } from 'fs';
import { marked } from 'marked';

const topicsFolderName = 'topics';
const distTopicsPath = `${DIST_DIRECTORY}/${topicsFolderName}`;
const srcTopicsPath = `${SRC_DIRECTORY}/${topicsFolderName}`;
const indexFilename = 'index.html';
const textEncoding = 'utf8';

export function buildLeftNav() {
    buildHtmlBasedOnFolderContents(srcTopicsPath);
}

function buildHtmlBasedOnFolderContents(srcFolderPath) {
    fs.readdirSync(srcFolderPath).forEach((itemName) => {
        globalThis.console.log('item', itemName);
        const isFile = itemName.includes('.');
        globalThis.console.log('Is item a file?', isFile);
        const itemNameWithoutExtension = itemName;
        if (isFile)
            itemNameWithoutExtension = getFilenameWithoutExtension(itemName);
        const label = deriveLabelFromItemName(itemNameWithoutExtension);
        const buildItemPath = `${newDistFolderPath}/${itemName}`;
        const srcItemPath = `${srcFolderPath}/${itemName}`;
        if (isFile) {
            // Convert markdown to HTML and create left-nav option.
            insertLeftNavOptionIntoDistIndexHtml(
                itemNameWithoutExtension,
                srcItemPath
            );
            createTopicHtmlFileFromMarkdown(
                itemNameWithoutExtension,
                srcItemPath
            );
        } else {
            if (srcFolderPath === srcTopicsPath)
                insertTabIntoDistIndexHtml(label);
            else
                insertLeftNavOptionIntoDistIndexHtml(
                    itemNameWithoutExtension,
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

function createTopicHtmlFileFromMarkdown(
    filenameWithoutExtension,
    markdownFilePath
) {
    const fileContent = fs.readFileSync(markdownFilePath, textEncoding);
    const html = marked.parse(fileContent);
    fs.writeFileSync(
        `${distTopicsPath}/${filenameWithoutExtension}.html`,
        html
    );
}

function deriveLabelFromItemName(itemName) {
    const itemNameSegments = itemName.split('-');
    const label = itemNameSegments.reduce((accumulator, currentValue) => {
        const firstLetter = currentValue[0].toUpperCase();
        return accumulator + ` ${firstLetter}${currentValue.slice(1)}`;
    }, '');
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
    let distIndexHtmlContent = getDistIndexHtmlContent();
    const lastIndexOfForwardSlash = srcItemPath.lastIndexOf('/');
    const parentFolderPath = srcItemPath.slice(0, lastIndexOfForwardSlash);
    const optionsInsertPointEnding = `child left-nav options before here.-->`;
    const optionsInsertPoint = `<!--${parentFolderPath} ${optionsInsertPointEnding}`;
    const indexContentSegments = distIndexHtmlContent.split(optionsInsertPoint);
    let optionHtml = `<div class="left-nav-option">`;
    if (isSection) {
        const svgMarkup =
            '<path d="M70 35A35 35 0 1135 0a35 35 0 0135 35"/><path d="M45.88 33.74l-.66-.66L27.3 15.1a1.78 1.78 0 00-2.52 0l-.66.66a1.78 1.78 0 000 2.52L40.78 35 24.12 51.72a1.78 1.78 0 000 2.52l.66.66a1.78 1.78 0 002.52 0L45.17 37l.66-.66a1.8 1.8 0 000-2.53z"/>';
        optionHtml += `
        <span class="left-nav-section-container">${optionLabel}
            <span class="svg-contaner">
                <svg viewBox="0 0 70 70">${svgMarkup}</svg>
            </span>
            <!--${srcItemPath} ${optionsInsertPointEnding}
        </span>`;
    } else {
        const topicHtmlFileRelativeUrl = srcItemPath.slice(
            srcItemPath.indexOf('/')
        );
        optionHtml += `<button class="left-nav-item" data-relative-url="${topicHtmlFileRelativeUrl}">${optionLabel}</button>`;
    }
    optionHtml += '</div>';
    indexContentSegments[0] += optionHtml;
    const newDistIndexHtmlContent = indexContentSegments.join(tabsInsertPoint);
    writeToDistIndexHtml(newDistIndexHtmlContent);
}

function insertTabIntoDistIndexHtml(tabLabel) {
    let distIndexHtmlContent = getDistIndexHtmlContent();
    const tabsInsertPoint = '<!--Content tabs before here.-->';
    const indexContentSegments = distIndexHtmlContent.split(tabsInsertPoint);
    indexContentSegments[0] += `<button class="plain tab">${tabLabel}</button>\n`;
    const newDistIndexHtmlContent = indexContentSegments.join(tabsInsertPoint);
    writeToDistIndexHtml(newDistIndexHtmlContent);
}

function writeToDistIndexHtml(content) {
    fs.writeFileSync(`${DIST_DIRECTORY}/${indexFilename}`, content, {
        overwrite: true,
    });
}
