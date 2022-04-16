export const HOME_TAB_NAME = 'Home';

export function queryDom(elementSelector) {
    return globalThis.document.querySelector(elementSelector);
}

export function queryDomForAll(elementSelector) {
    return globalThis.document.querySelectorAll(elementSelector);
}

export function addClassToHtmlElementBySelector(elementSelector, className) {
    queryDom(elementSelector).classList.add(className);
}

export function removeClassFromHtmlElementBySelector(
    elementSelector,
    className
) {
    queryDom(elementSelector).classList.remove(className);
}
