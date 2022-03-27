const clickEventName = 'click';
// Want to get reference for all tabs. Query Selector is one item.
const tabs = Array.from(globalThis.document.querySelectorAll('button.tab'));
const leftNavOptionDivs = globalThis.document.querySelectorAll(
    'div.left-nav-option'
);

function toggleSelectStyles(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('tab-border-bottom-blue');
}

let selectedTab;
function selectTab(tab) {
    selectedTab = tab;
    toggleSelectStyles(tab);
    leftNavOptionDivs.forEach((leftNavOptionDiv) => {
        const isVisible =
            leftNavOptionDiv.dataset.tabName === selectTab.innerText;
        leftNavOptionDiv.classList[isVisible ? 'remove' : 'add']('hidden');
    });
}

async function onLeftNavButtonClicked(event) {
    const leftNavButton = event.target;
    const relativeUrl = leftNavButton.dataset.relativeUrl;
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
    if (leftNavSectionContainerSpan.className.includes('expanded')) {
        leftNavSectionContainerSpan.classList.remove('expanded');
        leftNavSectionContainerSpan.classList.add('collapsed');
    } else {
        leftNavSectionContainerSpan.classList.remove('collapsed');
        leftNavSectionContainerSpan.classList.add('expanded');
    }
}

// To do: Parse URL to determine initial selected tab.
// Designate an initial selected tab.
selectTab(tabs[0]);

for (const tab of tabs)
    tab.addEventListener('click', function (event) {
        toggleSelectStyles(selectedTab);
        selectTab(event.target);
    });

leftNavOptionDivs.forEach((leftNavOptionDiv) => {
    const leftNavSectionContainerSpan = leftNavOptionDiv.querySelector(
        'span.left-nav-section-container'
    );
    if (leftNavSectionContainerSpan)
        leftNavSectionContainerSpan.addEventListener(onLeftNavSectionClicked);
    else {
        const itemButton = leftNavOptionDiv.querySelector('button');
        itemButton.addEventListener(clickEventName, onLeftNavButtonClicked);
    }
});
