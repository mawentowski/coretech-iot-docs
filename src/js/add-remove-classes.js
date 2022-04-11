jQuery(document).ready(function ($) {
    var alterClass = function () {
        var ww = document.body.clientWidth;
        if (ww <= 575) {
            $('.left-nav-col').addClass('fit-viewport');
        } else if (ww >= 576) {
            $('.left-nav-col').removeClass('fit-viewport');
        }
        if (ww <= 767) {
            $('body').addClass('scrollable');
            $('.header').addClass('hidden');
            $('.menu-icon-row').addClass('display-flex');
            $('.main-row').addClass('pos-static');
            $('.left-nav-col').addClass('pos-fixed-top-left');
            //   ignore if Home tab is loaded by default or selected.
            $('.left-nav-col').addClass('hidden');
            $('.left-nav-col').addClass('fit-viewport-height');
            $('.toc-header').addClass('display-flex');
            $('.content').addClass('unscrollable');
            //   ignore if Home tab is loaded by default or selected.
            $('.content').addClass('flex-basis-100');
            $('body').removeClass('unscrollable');
            $('.header').removeClass('display-flex');
            $('.menu-icon-row').removeClass('hidden');
            $('.main-row').removeClass('pos-fixed');
            //   ignore if Home tab is loaded by default or selected.
            $('.left-nav-col').removeClass('display-flex');
            $('.content').removeClass('scrollable');
            //   ignore if Home tab is loaded by default or selected.
            $('.content').removeClass('flex-basis-75');
        } else if (ww >= 768) {
            $('body').removeClass('scrollable');
            $('.header').removeClass('hidden');
            $('.menu-icon-row').addClass('hidden');
            $('.main-row').removeClass('pos-static');
            $('.left-nav-col').removeClass('pos-fixed-top-left');
            //   ignore if Home tab is loaded by default or selected.
            $('.left-nav-col').removeClass('hidden');
            $('.left-nav-col').removeClass('fit-viewport-height');
            $('.toc-header').removeClass('display-flex');
            $('.content').removeClass('unscrollable');
            //   ignore if Home tab is loaded by default or selected.
            $('.content').addClass('flex-basis-75');
            $('body').addClass('unscrollable');
            $('.header').addClass('display-flex');
            $('.menu-icon-row').removeClass('display-flex');
            $('.main-row').addClass('pos-fixed');
            //   ignore if Home tab is loaded by default or selected.
            $('.left-nav-col').addClass('display-flex');
            $('.content').addClass('scrollable');
            //   ignore if Home tab is loaded by default or selected.
            $('.content').removeClass('flex-basis-100');
            //   ignore if Home tab is loaded by default or selected.
            $('.content').removeClass('flex-basis-70');
        }
        if (ww <= 991) {
            //   ignore if Home tab is loaded by default or selected.
            $('.right-nav-col').addClass('hidden');
            //   ignore if Home tab is loaded by default or selected.
            $('.right-nav-col').removeClass('display-flex');
        } else if (ww >= 992) {
            //   ignore if Home tab is loaded by default or selected.
            $('.right-nav-col').removeClass('hidden');
            //   ignore if Home tab is loaded by default or selected.
            $('.right-nav-col').addClass('display-flex');
        }
    };
    $(window).resize(function () {
        alterClass();
    });
    //Fire it when the page first loads:
    alterClass();
});
