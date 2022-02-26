function toggleSelect(tab) {
    tab.classList.toggle('text-black');
    tab.classList.toggle('tab-border-bottom-blue');
}

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
    });
