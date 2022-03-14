jQuery(document).ready(function ($) {
  var alterClass = function () {
    var ww = document.body.clientWidth;
    if (ww <= 575) {
      $(".left-nav-col").addClass("fit-viewport");
    } else if (ww >= 576) {
      $(".left-nav-col").removeClass("fit-viewport");
    }
    if (ww <= 767) {
      $("body").addClass("scrollable");
      $(".header").addClass("hidden");
      $(".main-row").addClass("pos-static");
      $(".left-nav-col").addClass("pos-fixed-top-left");
      $(".left-nav-col").addClass("hidden");

      $(".left-nav-col").addClass("fit-viewport-height");

      $(".toc-header").addClass("display-flex");
      $(".content").addClass("unscrollable");
      $("body").removeClass("unscrollable");
      $(".header").removeClass("display-flex");
      $(".main-row").removeClass("pos-fixed");
      $(".left-nav-col").removeClass("display-flex");
      $(".content").removeClass("scrollable");
    } else if (ww >= 768) {
      $("body").removeClass("scrollable");
      $(".header").removeClass("hidden");
      $(".main-row").removeClass("pos-static");
      $(".left-nav-col").removeClass("pos-fixed-top-left");
      $(".left-nav-col").removeClass("hidden");

      $(".left-nav-col").removeClass("fit-viewport-height");

      $(".toc-header").removeClass("display-flex");
      $(".content").removeClass("unscrollable");
      $("body").addClass("unscrollable");
      $(".header").addClass("display-flex");
      $(".main-row").addClass("pos-fixed");
      $(".left-nav-col").addClass("display-flex");
      $(".content").addClass("scrollable");
    }
    if (ww <= 991) {
      $(".right-nav-col").addClass("hidden");
      $(".right-nav-col").removeClass("display-flex");
    } else if (ww >= 992) {
      $(".right-nav-col").removeClass("hidden");
      $(".right-nav-col").addClass("display-flex");
    }
  };
  $(window).resize(function () {
    alterClass();
  });
  //Fire it when the page first loads:
  alterClass();
});
