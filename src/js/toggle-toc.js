const tocMenuButton = globalThis.document.querySelector(".toc-menu");
const leftNavCol = globalThis.document.querySelector(".left-nav-col");
const content = globalThis.document.querySelector(".content");
const rightOverlayCol = globalThis.document.querySelector(".toggled-overlay");
const tocHeaderCancel = globalThis.document.querySelector(".toc-header-cancel");


// when you click the button.toc-menu...
tocMenuButton.addEventListener("click", toggleToc);
function toggleToc (){
// make the leftNavCal and right-overlay 'unhidden' and make the content unscrollable
  leftNavCol.classList.toggle("hidden");
  rightOverlayCol.classList.toggle("hidden");
  content.classList.toggle("pos-fixed");
  content.classList.toggle("scrollable");
}

// if you click the cancel btn:
tocHeaderCancel.addEventListener("click", function () {
  leftNavCol.classList.toggle("hidden");
  rightOverlayCol.classList.toggle("hidden");
  content.classList.toggle("pos-fixed");
  content.classList.toggle("scrollable");
  }
)
// Or, if you click the overlay (same):
rightOverlayCol.addEventListener("click", function () {
  leftNavCol.classList.toggle("hidden");
  rightOverlayCol.classList.toggle("hidden");
  content.classList.toggle("pos-fixed");
  content.classList.toggle("scrollable");
  }
)


// Or, if you resize the window(same):
let windowInnerWidth;

globalThis.window.addEventListener("resize", function () {
  if (globalThis.window.innerWidth !== windowInnerWidth) {
  leftNavCol.classList.add("hidden");
  rightOverlayCol.classList.add("hidden");
  content.classList.remove("pos-fixed");
  content.classList.add("scrollable");
  }
}
)








