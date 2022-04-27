import {
    HOME_TAB_NAME,
    addClassToHtmlElementBySelector,
    removeClassFromHtmlElementBySelector,
} from './shared.js';
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
    } else {
        addClassToHtmlElementBySelector('.topic-breadcrumb', 'display-flex');
        removeClassFromHtmlElementBySelector('.topic-breadcrumb', 'hidden');
    }

    const viewportWidth = document.body.clientWidth;
    if (viewportWidth <= 575)
        addClassToHtmlElementBySelector('.left-nav-col', 'fit-viewport');
    else if (viewportWidth >= 576)
        removeClassFromHtmlElementBySelector('.left-nav-col', 'fit-viewport');
    if (viewportWidth <= 767) {
        addClassToHtmlElementBySelector('.content', 'flex-basis-100');
        removeClassFromHtmlElementBySelector('.content', 'flex-basis-80');
        addClassToHtmlElementBySelector('.header-narrow-viewport', 'hidden');
        addClassToHtmlElementBySelector('.toc-header', 'display-flex');
        removeClassFromHtmlElementBySelector(
            '.header-narrow-viewport',
            'hidden'
        );
        // if (isHomeTabSelected) {
        //     addClassToHtmlElementBySelector('.header-narrow-viewport', 'hidden');
        //     addClassToHtmlElementBySelector('.toc-header', 'hidden');
        // } else {
        //     addClassToHtmlElementBySelector('.header-narrow-viewport', 'hidden');
        //     addClassToHtmlElementBySelector('.toc-header', 'display-flex');
        //     removeClassFromHtmlElementBySelector('.header-narrow-viewport', 'hidden');
        // }

        // addClassToHtmlElementBySelector('.header', 'hidden-if-sm, hidden-if-home');

        // go into HTML, add class to everything that needs to be added to everything.

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
    if (viewportWidth >= 767 && isHomeTabSelected) {
        $('.left-nav-col').addClass('hidden');
        $('.left-nav-col').removeClass('display-flex');
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
    }
    if (viewportWidth >= 768) {
        if (!isHomeTabSelected) {
            $('.header-narrow-viewport').addClass('hidden');
            $('.left-nav-col').removeClass('hidden');
            $('.toc-header').removeClass('display-flex');
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
    if (viewportWidth >= 768 && isHomeTabSelected) {
        $('.left-nav-col').addClass('hidden');
        $('.left-nav-col').removeClass('display-flex');
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
    }
    if (viewportWidth <= 991) {
        $('.right-nav-col').addClass('hidden');
        $('.right-nav-col').removeClass('display-flex');
    }
    if (viewportWidth <= 991 && !isHomeTabSelected) {
        $('.main-content').removeClass('flex-basis-75');
    }
    if (viewportWidth >= 992 && !isHomeTabSelected) {
        $('.main-content').addClass('flex-basis-75');
        $('.right-nav-col').removeClass('hidden');
        //   ignore if Home tab is loaded by default or selected.
        $('.right-nav-col').addClass('display-flex');
    }
}

globalThis.document.addEventListener('DOMContentLoaded', () => {
    addRemoveClasses();
    globalThis.addEventListener('resize', addRemoveClasses);
});
