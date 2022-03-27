const clickEventName = 'click';
// Want to get reference for all tabs. Query Selector is one item.
const tabs = Array.from(globalThis.document.querySelectorAll('button.tab'));
const leftNavOptionDivs = globalThis.document.querySelectorAll(
    'div.left-nav-option'
);

function toggleSelectTabStyles(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('tab-border-bottom-blue');
}

let selectedTab;
function selectTab(tab) {
    selectedTab = tab;
    toggleSelectTabStyles(tab);
    leftNavOptionDivs.forEach((leftNavOptionDiv) => {
        const isVisible =
            leftNavOptionDiv.dataset.tabName === selectedTab.innerText;
        leftNavOptionDiv.classList[isVisible ? 'remove' : 'add']('hidden');

        globalThis.console.log('Is visible? ', isVisible);
    });
}

async function onLeftNavItemButtonClicked(event) {
    const leftNavItemButton = event.target;
    const relativeUrl = leftNavItemButton.dataset.relativeUrl;
    const httpResponse = await globalThis.fetch(relativeUrl);
    const htmlResponseText = await httpResponse.text();
    const mainContentDiv =
        globalThis.document.querySelector('div.main-content');
    mainContentDiv.innerHTML = htmlResponseText;
}

function onLeftNavSectionClicked(event) {
    const leftNavSectionContainerSpan = event.target;
    toggleLeftNavSectionCollapsed(leftNavSectionContainerSpan);
    const svgElement = leftNavSectionContainerSpan.querySelector('svg');
    svgElement.classList.toggle('rotated');
}

function toggleLeftNavSectionCollapsed(leftNavSectionContainerSpan) {
    if (leftNavSectionContainerSpan.classList.contains('expanded')) {
        leftNavSectionContainerSpan.classList.remove('expanded');
        leftNavSectionContainerSpan.classList.add('collapsed');
    } else {
        leftNavSectionContainerSpan.classList.remove('collapsed');
        leftNavSectionContainerSpan.classList.add('expanded');
    }
}

for (const tab of tabs)
    tab.addEventListener(clickEventName, function (event) {
        toggleSelectTabStyles(selectedTab);
        selectTab(event.target);
    });

// To do: Parse URL to determine initial selected tab.
// Designate an initial selected tab.
selectTab(tabs[0]);

leftNavOptionDivs.forEach((leftNavOptionDiv) => {
    const leftNavSectionContainerSpan = leftNavOptionDiv.querySelector(
        'span.left-nav-section-container'
    );
    if (leftNavSectionContainerSpan)
        leftNavSectionContainerSpan.addEventListener(onLeftNavSectionClicked);
    else {
        const leftNavItemButton = leftNavOptionDiv.querySelector('button');
        leftNavItemButton.addEventListener(
            clickEventName,
            onLeftNavItemButtonClicked
        );
    }
});
