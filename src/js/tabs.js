function toggleSelectStyles(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('tab-border-bottom-blue');
}

let selectedTab;
function selectTab(tab) {
    selectedTab = tab;
    toggleSelectStyles(tab);
    loadProjectPage(tab);
}

function formatTabInnerText(tab) {
    return tab.innerText.replace(' ', '').toLowerCase();
}

async function loadProjectPage(tab) {
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

if (!tab) tab = tabs.find((tab) => tab.innerText === 'Home');

// designate select
selectTab(tab);
// load the Home page

for (const tab of tabs)
    tab.addEventListener('click', function (event) {
        toggleSelectStyles(selectedTab);
        selectTab(event.target);
    });
