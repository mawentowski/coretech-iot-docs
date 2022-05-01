import { VIEWPORT_WIDTH_RANGE_COLLECTION } from './viewport-width-range-collection.js';

// const tocMenuButton = globalThis.document.querySelector(
//     '.header-narrow-viewport'
// );
const showLeftNavButton = globalThis.document.querySelector('.show-left-nav');
const leftNavCol = globalThis.document.querySelector('.left-nav-col');
const content = globalThis.document.querySelector('.content');
const rightOverlayCol = globalThis.document.querySelector('.toggled-overlay');
const tocHeaderCancel = globalThis.document.querySelector('.toc-header-cancel');
const tocHeader = globalThis.document.querySelector('.toc-header');
const leftNavItem = globalThis.document.querySelector(
    'button.left-nav-item.plain'
);
const moreTabs = globalThis.document.querySelector('.more-tabs');

// when you click the button.toc-menu...
showLeftNavButton.addEventListener('click', openToc);
function openToc() {
    // make the leftNavCal and right-overlay 'unhidden' and make the content unscrollable
    leftNavCol.classList.remove('hidden');
    leftNavCol.classList.add('display-flex');
    //   leftNavCol.classList.add("flex-direction-col");
    rightOverlayCol.classList.remove('hidden');
    content.classList.add('pos-fixed');
    content.classList.add('scrollable');
    tocHeader.classList.remove('hidden');
    tocHeader.classList.add('display-flex');
}

// if you click the cancel btn:
tocHeaderCancel.addEventListener('click', cancelToc);
export function cancelToc() {
    const viewportWidth = globalThis.document.body.clientWidth;
    if (viewportWidth >= VIEWPORT_WIDTH_RANGE_COLLECTION.wide.start) return;
    leftNavCol.classList.add('hidden');
    leftNavCol.classList.remove('display-flex');
    //   leftNavCol.classList.remove("flex-direction-col");
    rightOverlayCol.classList.add('hidden');
    content.classList.add('pos-fixed');
    content.classList.add('scrollable');
    tocHeader.classList.remove('display-flex');
    tocHeader.classList.add('hidden');
}

// Or, if you click the overlay (same):
rightOverlayCol.addEventListener('click', cancelToc);

// Or, if you resize the window(same):
let windowInnerWidth;

globalThis.window.addEventListener('resize', function () {
    if (globalThis.window.innerWidth === windowInnerWidth) return;
    cancelToc();
});

//  Or you click a .left-nav-item to load it.

leftNavItem.addEventListener('click', cancelToc);
