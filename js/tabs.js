function toggleSelect(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('tab-border-bottom-blue');
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
// Parse URL to determine initial selected tab.

// Want to get reference for all tabs. Query Selector is one item.
const tabs = globalThis.document.querySelectorAll('.tab');
// Gain reference to first tab.
let selectedTab = tabs[0];
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
