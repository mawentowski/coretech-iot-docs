const clickEventName = 'click';

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

const leftNavOptionDivs = globalThis.document.querySelectorAll(
    'div.left-nav-option'
);

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
