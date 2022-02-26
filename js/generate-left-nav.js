import { MenuItemModel } from "../models/menu-item-model.js";

const sideNavElement = globalThis.document.querySelector("div.left-nav");

function representMenuItemModelInDom(menuItemModel, parentElement) {
  const menuItemElement = globalThis.document.createElement("div");

  const nameContainerElement = globalThis.document.createElement("span");
  nameContainerElement.classList.add("name-container");
  menuItemElement.appendChild(nameContainerElement);

  const nameElement = globalThis.document.createElement("span");
  nameElement.textContent = menuItemModel.name;

  const svgContainerElement = globalThis.document.createElement("span")
  svgContainerElement.classList.add("svg-container");
  nameContainerElement.appendChild(svgContainerElement);
  
  let menuItemGroupElement;
  if (menuItemModel.children.length) {
    // Add menu item group.
    menuItemGroupElement = globalThis.document.createElement("div");
    menuItemGroupElement.classList.add("menu-item-group");
    menuItemElement.appendChild(menuItemGroupElement);

    // Add SVG icon to container.
    const svgElement = globalThis.document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("viewBox", "0 0 70 70");
    svgElement.innerHTML =
      '<path d="M70 35A35 35 0 1135 0a35 35 0 0135 35"/><path d="M45.88 33.74l-.66-.66L27.3 15.1a1.78 1.78 0 00-2.52 0l-.66.66a1.78 1.78 0 000 2.52L40.78 35 24.12 51.72a1.78 1.78 0 000 2.52l.66.66a1.78 1.78 0 002.52 0L45.17 37l.66-.66a1.8 1.8 0 000-2.53z"/>';
    svgElement.addEventListener("click", function () {
      onMenuItemButtonClick(menuItemGroupElement, svgElement);
    });
    svgContainerElement.appendChild(svgElement);
}
  nameContainerElement.appendChild(nameElement);

  parentElement.appendChild(menuItemElement);

  for (const childMenuItemModel of menuItemModel.children)
    representMenuItemModelInDom(childMenuItemModel, menuItemGroupElement);
}

function onMenuItemButtonClick(menuItemGroupElement, svgElement) {
  toggleMenuItemGroupCollapsed(menuItemGroupElement);
  svgElement.classList.toggle("rotated");
}

function toggleMenuItemGroupCollapsed(menuItemGroupElement) {    
    if (menuItemGroupElement.className.includes('expanded')) {
        menuItemGroupElement.classList.remove("expanded");
        menuItemGroupElement.classList.add("collapsed");
    } else {
        menuItemGroupElement.classList.remove("collapsed");
        menuItemGroupElement.classList.add("expanded");
    }
}

const menuItemModels = [
  new MenuItemModel("Topic-Heading-1"),
  new MenuItemModel(
    "Topic-Heading-2",
    new MenuItemModel("Topic-1"),
    new MenuItemModel("Topic-2"),
    new MenuItemModel("Topic-3")
  ),
  // new MenuItemModel(
  //   "Topic-Heading-3",

  //     new MenuItemModel("Topic-1"),
  //     new MenuItemModel("Topic-2"),
  //     new MenuItemModel("Topic-3")
    
  // ),
  new MenuItemModel(
    "Topic-Heading-3",
    new MenuItemModel(
      "Sub-topic",
      new MenuItemModel("Topic-1"),
      new MenuItemModel("Topic-2"),
      new MenuItemModel("Topic-3")
    )
  ),
];

for (const menuItemModel of menuItemModels)
  representMenuItemModelInDom(menuItemModel, sideNavElement);
