import { HOME_TAB_NAME } from './shared.js';

export function addRemoveClasses() {
    const isHomeTabSelected =
        globalThis.selectedTab?.innerText === HOME_TAB_NAME;
    const viewportWidth = document.body.clientWidth;
    if (viewportWidth <= 575) addClass('.left-nav-col', 'fit-viewport');
    else if (viewportWidth >= 576) removeClass('.left-nav-col', 'fit-viewport');
    if (viewportWidth <= 767) {
        if (isHomeTabSelected) {
            $('.menu-icon-row').addClass('hidden');
            $('.toc-header').addClass('hidden');
        } else {
            $('.menu-icon-row').addClass('display-flex');
            $('.toc-header').addClass('display-flex');
            $('.menu-icon-row').removeClass('hidden');
            $('.content').removeClass('flex-basis-80');
        }
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
        $('.right-nav-col').addClass('hidden');
    } else if (viewportWidth >= 768) {
        if (!isHomeTabSelected) {
            $('.header').removeClass('hidden');
            $('.menu-icon-row').addClass('hidden');
            $('.left-nav-col').removeClass('hidden');
            $('.toc-header').removeClass('display-flex');
            $('.content').addClass('flex-basis-80');
            $('.header').addClass('display-flex');
            $('.menu-icon-row').removeClass('display-flex');
            $('.left-nav-col').addClass('display-flex');
            $('.content').removeClass('flex-basis-100');
        }
        $('body').removeClass('scrollable');
        $('.main-row').removeClass('pos-static');
        $('.left-nav-col').removeClass('pos-fixed-top-left');
        $('.left-nav-col').removeClass('fit-viewport-height');
        $('.content').removeClass('unscrollable');
        $('body').addClass('unscrollable');
        $('.main-row').addClass('pos-fixed');
        $('.content').addClass('scrollable');
    }
    if (viewportWidth <= 991 && !isHomeTabSelected)
        $('.right-nav-col').removeClass('display-flex');
    else if (viewportWidth >= 992 && !isHomeTabSelected) {
        $('.right-nav-col').removeClass('hidden');
        //   ignore if Home tab is loaded by default or selected.
        $('.right-nav-col').addClass('display-flex');
    }
}

function queryDom(elementSelector) {
    return globalThis.document.querySelector(elementSelector);
}

function addClass(elementSelector, className) {
    queryDom(elementSelector).classList.add(className);
}

function removeClass(elementSelector, className) {
    queryDom(elementSelector).classList.remove(className);
}

globalThis.document.addEventListener('DOMContentLoaded', () => {
    addRemoveClasses();
    globalThis.addEventListener('resize', addRemoveClasses);
});
