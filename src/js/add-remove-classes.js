import {
    HOME_TAB_NAME,
    addClassToHtmlElementBySelector,
    removeClassFromHtmlElementBySelector,
} from './shared.js';
import { VIEWPORT_WIDTH_RANGE_COLLECTION } from './viewport-width-range-collection.js';

export function addRemoveClasses() {
    const isHomeTabSelected =
        globalThis.selectedTab?.innerText === HOME_TAB_NAME;

    if (isHomeTabSelected) {
        addClassToHtmlElementBySelector('.topic-breadcrumb', 'hidden');
        removeClassFromHtmlElementBySelector(
            '.topic-breadcrumb',
            'display-flex'
        );
        $('.left-nav-col').addClass('hidden');
        $('.left-nav-col').removeClass('display-flex');
        $('.content').addClass('flex-basis-100');
        $('.content').removeClass('flex-basis-75');
        $('.content').removeClass('flex-basis-80');
        $('.main-content').addClass('flex-basis-100');
        $('.main-content').removeClass('flex-basis-75');
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
        $('.document-footer').addClass('flex-basis-100');
        $('.document-footer').addClass('flex-basis-100');
        $('.document-footer').removeClass('flex-basis-75');
    } else {
        addClassToHtmlElementBySelector('.topic-breadcrumb', 'display-flex');
        removeClassFromHtmlElementBySelector('.topic-breadcrumb', 'hidden');
    }

    const viewportWidth = globalThis.document.body.clientWidth;
    if (viewportWidth <= VIEWPORT_WIDTH_RANGE_COLLECTION.narrow.end)
        addClassToHtmlElementBySelector('.left-nav-col', 'fit-viewport');
    else if (viewportWidth >= VIEWPORT_WIDTH_RANGE_COLLECTION.medium.start)
        removeClassFromHtmlElementBySelector('.left-nav-col', 'fit-viewport');
    if (viewportWidth <= VIEWPORT_WIDTH_RANGE_COLLECTION.medium.end) {
        addClassToHtmlElementBySelector('.content', 'flex-basis-100');
        removeClassFromHtmlElementBySelector('.content', 'flex-basis-80');

        $('.document-footer').addClass('flex-basis-100');
        $('.document-footer').removeClass('flex-basis-80');

        addClassToHtmlElementBySelector('.header-narrow-viewport', 'hidden');
        // addClassToHtmlElementBySelector('.toc-header', 'display-flex');
        removeClassFromHtmlElementBySelector(
            '.header-narrow-viewport',
            'hidden'
        );
        $('.header').addClass('hidden');
        $('.left-nav-col').addClass('hidden');
        $('.left-nav-col').removeClass('display-flex');
        $('.header').removeClass('display-flex');
        $('body').addClass('scrollable');
        $('.main-row').addClass('pos-static');
        $('.left-nav-col').addClass('pos-fixed-top-left');
        $('.left-nav-col').addClass('fit-viewport-height');
        $('.content').addClass('unscrollable');
        $('.content').addClass('flex-basis-100');
        $('body').removeClass('unscrollable');
        $('.main-row').removeClass('pos-fixed');
        $('.content').removeClass('scrollable');
    }
    if (
        viewportWidth >= VIEWPORT_WIDTH_RANGE_COLLECTION.medium.end &&
        isHomeTabSelected
    ) {
        $('.left-nav-col').addClass('hidden');
        $('.left-nav-col').removeClass('display-flex');
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
    }
    if (viewportWidth >= VIEWPORT_WIDTH_RANGE_COLLECTION.wide.start) {
        if (!isHomeTabSelected) {
            $('.header-narrow-viewport').addClass('hidden');
            $('.left-nav-col').removeClass('hidden');
            // $('.toc-header').removeClass('display-flex');
            $('.content').addClass('flex-basis-80');
            $('.header').addClass('display-flex');
            $('.header-narrow-viewport').removeClass('display-flex');
            $('.left-nav-col').addClass('display-flex');
            $('.content').removeClass('flex-basis-100');
        }
        $('.header').removeClass('hidden');
        $('body').removeClass('scrollable');
        $('.main-row').removeClass('pos-static');
        $('.left-nav-col').removeClass('pos-fixed-top-left');
        $('.left-nav-col').removeClass('fit-viewport-height');
        $('.content').removeClass('unscrollable');
        $('body').addClass('unscrollable');
        $('.main-row').addClass('pos-fixed');
        $('.content').addClass('scrollable');
    }
    if (
        viewportWidth >= VIEWPORT_WIDTH_RANGE_COLLECTION.wide.start &&
        isHomeTabSelected
    ) {
        $('.left-nav-col').addClass('hidden');
        $('.left-nav-col').removeClass('display-flex');
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
    }
    if (viewportWidth <= VIEWPORT_WIDTH_RANGE_COLLECTION.wide.end) {
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
    }
    if (
        viewportWidth <= VIEWPORT_WIDTH_RANGE_COLLECTION.wide.end &&
        !isHomeTabSelected
    ) {
        $('.main-content').removeClass('flex-basis-75');
        $('.document-footer').removeClass('flex-basis-75');
    }
    if (
        viewportWidth >= VIEWPORT_WIDTH_RANGE_COLLECTION.extraWide.start &&
        !isHomeTabSelected
    ) {
        $('.main-content').addClass('flex-basis-75');
        $('.document-footer').addClass('flex-basis-75');
        $('.right-nav-col').removeClass('hidden');
        //   ignore if Home tab is loaded by default or selected.
        $('.right-nav-col').addClass('display-flex');
    }
}

globalThis.document.addEventListener('DOMContentLoaded', () => {
    addRemoveClasses();
    globalThis.addEventListener('resize', addRemoveClasses);
});
