import { HOME_TAB_NAME } from './shared.js';
import { addRemoveClasses } from './add-remove-classes.js';

const clickEventName = 'click';
// Want to get reference for all tabs. Query Selector is one item.
const tabs = Array.from(globalThis.document.querySelectorAll('button.tab'));
const leftNav = globalThis.document.querySelector('div.left-nav');
const leftNavOptionDivs = globalThis.document.querySelectorAll(
    'div.left-nav-option'
);

function toggleSelectTabStyles(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('active');
}

function selectTab(tab) {
    globalThis.selectedTab = tab;
    toggleSelectTabStyles(selectedTab);
    leftNavOptionDivs.forEach((leftNavOptionDiv) => {
        const leftNavSectionContainerSpan =
            findSectionContainerSpanOfLeftNavOptionDiv(leftNavOptionDiv);
        if (
            leftNavSectionContainerSpan &&
            leftNavSectionContainerSpan.classList.contains('expanded')
        )
            toggleLeftNavSectionExpanded(leftNavSectionContainerSpan);
        const isVisible =
            leftNavOptionDiv.dataset.tabName === selectedTab.innerText;
        leftNavOptionDiv.classList[isVisible ? 'remove' : 'add']('hidden');
    });
    const firstVisibleLeftNavItemButton = leftNav.querySelector(
        'div.left-nav-option:not(.hidden) > button.left-nav-item'
    );
    if (firstVisibleLeftNavItemButton)
        onLeftNavItemButtonClicked(firstVisibleLeftNavItemButton);
    addRemoveClasses();
}

function applySelectionsBasedOnUrl() {
    const urlSegments = globalThis.location.href.split('/');
    const tabName = urlSegments[3];
    const sectionNames = urlSegments.slice(4, urlSegments.length - 1);
    const itemName = urlSegments[urlSegments.length - 1];
    const formattedTabName = formatForComparison(tabName);
    const tab =
        tabs.find(
            (tab) => formatForComparison(tab.innerText) === formattedTabName
        ) ?? tabs.find((tab) => tab.innerText === HOME_TAB_NAME);
    selectTab(tab);
    const targetedLeftNavOptionDivs = globalThis.Array.from(
        leftNavOptionDivs
    ).filter(
        (div) => formatForComparison(div.dataset.tabName) === formattedTabName
    );
    const leftNavSectionContainerSpans = targetedLeftNavOptionDivs.reduce(
        (accumulator, currentValue) => {
            const sectionContainerSpan =
                findSectionContainerSpanOfLeftNavOptionDiv(currentValue);
            if (sectionContainerSpan) accumulator.push(sectionContainerSpan);

            return accumulator;
        },
        []
    );
    let leftNavItemParent;
    sectionNames.forEach((sectionName, index) => {
        const targetedLeftNavSectionContainerSpan = globalThis.Array.from(
            leftNavSectionContainerSpans
        ).find((sectionContainerSpan) => {
            if (sectionName === 'sub-chapter-1') {
                globalThis.console.log(
                    'comparison formatted section name',
                    formatForComparison(sectionName)
                );

                globalThis.console.log(
                    'comparison formatted button innner text',
                    formatForComparison(
                        sectionContainerSpan.querySelector(
                            'button.left-nav-section'
                        ).innerText
                    )
                );
            }
            return (
                formatForComparison(
                    sectionContainerSpan.querySelector(
                        'button.left-nav-section'
                    ).innerText
                ) === formatForComparison(sectionName)
            );
        });
        if (!targetedLeftNavSectionContainerSpan) return;
        toggleLeftNavSectionExpanded(targetedLeftNavSectionContainerSpan);
        if (index === sectionNames.length - 1)
            leftNavItemParent = targetedLeftNavSectionContainerSpan;
    });
    if (!leftNavItemParent) leftNavItemParent = globalThis.document;
    const leftNavItems = leftNavItemParent.querySelectorAll(
        'button.left-nav-item'
    );
    const targetedLeftNavItem = globalThis.Array.from(leftNavItems).find(
        (item) =>
            formatForComparison(item.innerText) ===
            formatForComparison(itemName)
    );
    if (targetedLeftNavItem) selectLeftNavItemButton(targetedLeftNavItem);
}

function formatForComparison(value) {
    return value.replace(/_|-|\s/g, '').toLowerCase() ?? '';
}

function reflectSelectionsInUrl() {
    const relativeUrlSegments =
        selectedLeftNavItemButton.dataset.relativeUrl.split('/');
    const path = relativeUrlSegments.reduce(
        (accumulator, currentValue, index) => {
            if (index > 1) {
                const pathArgumentSegments = currentValue.split('_');
                let urlFormattedItemName = pathArgumentSegments[1];
                const fileExtensionStartIndex = currentValue.indexOf('.');
                if (fileExtensionStartIndex !== -1)
                    urlFormattedItemName = urlFormattedItemName.slice(
                        0,
                        urlFormattedItemName.indexOf('.')
                    );
                accumulator += `/${urlFormattedItemName}`;
            }
            return accumulator;
        },
        ''
    );
    globalThis.history.pushState({}, '', path);
}

let selectedLeftNavItemButton;
async function selectLeftNavItemButton(button) {
    if (selectedLeftNavItemButton)
        selectedLeftNavItemButton.classList.toggle('active');
    selectedLeftNavItemButton = button;
    selectedLeftNavItemButton.classList.toggle('active');
    const relativeUrl = button.dataset.relativeUrl;
    const httpResponse = await globalThis.fetch(relativeUrl);
    const htmlResponseText = await httpResponse.text();
    const mainContentDiv =
        globalThis.document.querySelector('div.main-content');
    mainContentDiv.innerHTML = htmlResponseText;
    reflectSelectionsInUrl();
}

function findSectionContainerSpanOfLeftNavOptionDiv(leftNavOptionDiv) {
    return leftNavOptionDiv.querySelector('.left-nav-section-container');
}

function findSvgElementOfLeftNavSectionContainerSpan(
    leftNavSectionContainerSpan
) {
    return leftNavSectionContainerSpan.querySelector('svg');
}

async function onLeftNavItemButtonClicked(leftNavItemButton) {
    selectLeftNavItemButton(leftNavItemButton);
}

function onLeftNavSectionClicked(leftNavSectionContainerSpan) {
    toggleLeftNavSectionExpanded(leftNavSectionContainerSpan);
}

function toggleLeftNavSectionExpanded(leftNavSectionContainerSpan) {
    if (leftNavSectionContainerSpan.classList.contains('expanded')) {
        leftNavSectionContainerSpan.classList.remove('expanded');
        leftNavSectionContainerSpan.classList.add('collapsed');
    } else {
        leftNavSectionContainerSpan.classList.remove('collapsed');
        leftNavSectionContainerSpan.classList.add('expanded');
    }
    const svgElement = findSvgElementOfLeftNavSectionContainerSpan(
        leftNavSectionContainerSpan
    );
    svgElement.classList.toggle('rotated');
}

for (const tab of tabs)
    tab.addEventListener(clickEventName, function (event) {
        toggleSelectTabStyles(selectedTab);
        selectTab(event.target);
    });

applySelectionsBasedOnUrl();

leftNavOptionDivs.forEach((leftNavOptionDiv) => {
    const leftNavButton = leftNavOptionDiv.querySelector('button');
    if (leftNavButton.classList.contains('left-nav-section')) {
        const leftNavSectionContainerSpan =
            findSectionContainerSpanOfLeftNavOptionDiv(leftNavOptionDiv);
        leftNavButton.addEventListener(clickEventName, () =>
            onLeftNavSectionClicked(leftNavSectionContainerSpan)
        );
        const svgElement = findSvgElementOfLeftNavSectionContainerSpan(
            leftNavSectionContainerSpan
        );
        svgElement.addEventListener(clickEventName, () =>
            onLeftNavSectionClicked(leftNavSectionContainerSpan)
        );
    } else
        leftNavButton.addEventListener(clickEventName, (event) =>
            onLeftNavItemButtonClicked(event.target)
        );
});
