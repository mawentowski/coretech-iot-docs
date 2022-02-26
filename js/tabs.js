const tab = globalThis.document.querySelector(".tab");

// tab.addEventListener("click", tabSelectedFormatting);
// function tabSelectedFormatting (){
//   tab.classList.toggle("text-color-blue");
//   tab.classList.toggle("tab-border-bottom-blue");
// }


tab.addEventListener("click", function () {
  tab.classList.toggle("text-black");
  tab.classList.toggle("selected-link");
  tab.classList.toggle("tab-border-bottom-blue");
  }
)


// tab.addEventListener("click", selectTab);
// function selectTab (){
//   tab.classList.toggle("text-black");
//   tab.classList.toggle("selected-link");
//   tab.classList.toggle("tab-border-bottom-blue");
// }



