const clickEventName = 'click';
// Want to get reference for all tabs. Query Selector is one item.
const tabs = Array.from(globalThis.document.querySelectorAll('button.tab'));
const leftNavOptionDivs = globalThis.document.querySelectorAll(
    'div.left-nav-option'
);

function toggleSelectTabStyles(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('active');
}

let selectedTab;
function selectTab(tab) {
    selectedTab = tab;
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
}

let selectedLeftNavItemButton;
function selectLeftNavItemButton(button) {
    if (selectedLeftNavItemButton)
        selectedLeftNavItemButton.classList.toggle('active');
    selectedLeftNavItemButton = button;
    selectedLeftNavItemButton.classList.toggle('active');
}

function findSectionContainerSpanOfLeftNavOptionDiv(leftNavOptionDiv) {
    return leftNavOptionDiv.querySelector('.left-nav-section-container');
}

function findSvgElementOfLeftNavSectionContainerSpan(
    leftNavSectionContainerSpan
) {
    return leftNavSectionContainerSpan.querySelector('svg');
}

async function onLeftNavItemButtonClicked(event) {
    const leftNavItemButton = event.target;
    selectLeftNavItemButton(leftNavItemButton);
    const relativeUrl = leftNavItemButton.dataset.relativeUrl;
    const httpResponse = await globalThis.fetch(relativeUrl);
    const htmlResponseText = await httpResponse.text();
    const mainContentDiv =
        globalThis.document.querySelector('div.main-content');
    mainContentDiv.innerHTML = htmlResponseText;
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

// To do: Parse URL to determine initial selected tab.
// Designate an initial selected tab.
selectTab(tabs[0]);

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
        leftNavButton.addEventListener(
            clickEventName,
            onLeftNavItemButtonClicked
        );
});
