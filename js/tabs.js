function toggleSelect(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('tab-border-bottom-blue');
}

let selectedTab;
function selectTab(tab) {
    selectTab = tab;
    // Get this working.
    // globalThis.history.pushState(
    //     'page2',
    //     'Title',
    //     `/${formatTabInnerText(tab)}`
    // );
}

function formatTabInnerText(tab) {
    return tab.innerText.replace(' ', '').toLowerCase();
}

async function loadProjectpage(tab) {
    const innerText = tab.innerText;
    const formattedInnerText = innerText.replace(' ', '').toLowerCase();
    const relativeUrl = `/tabs/${formattedInnerText}.html`;
    const httpResponse = await globalThis.fetch(relativeUrl);
    const contentText = await httpResponse.text();
    const mainContentDiv =
        globalThis.document.querySelector('div.main-content');
    mainContentDiv.innerHTML = contentText;
}

// Want to get reference for all tabs. Query Selector is one item.
const tabs = Array.from(globalThis.document.querySelectorAll('.tab'));
// Parse URL to determine initial selected tab.
const regExpExecArray = /\S+\/{1}tab(\d{1})/.exec(globalThis.document.URL);
let pathTabNumber;
if (regExpExecArray) pathTabNumber = regExpExecArray[1];
let tab;
if (pathTabNumber)
    tab = tabs.find((tab) => tab.innerText.endsWith(pathTabNumber));
if (!selectedTab) tab = tabs.find((tab) => tab.innerText === 'Home');
selectTab(tab);

// Run the toggleSelect function, passing in the first tab.
toggleSelect(selectedTab);
// For each tab thats in the array of tabs, pass a reference to the occurred (click event)
for (const tab of tabs)
    tab.addEventListener('click', function (event) {
        toggleSelect(selectedTab);
        toggleSelect(event.target);
        selectedTab = event.target;
        loadProjectpage(selectedTab);
    });
