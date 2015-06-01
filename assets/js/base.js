$(document).ready(function(){
  $('.js-menu-trigger,.js-menu-screen').on('click touchstart',function (e) {
    $('.js-menu,.js-menu-screen').toggleClass('is-visible');
    e.preventDefault();
  });

  $('.ajax-popup-link').magnificPopup({
    type: 'ajax'
  });
  $('.iframe-popup-link').magnificPopup({
    type: 'iframe'
  });

  $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

  $('.image-popup-no-margins').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $(document).ready(function() {
    $('.tooltip').tooltipster();
  });

  $.each($('select'), function(k, obj){
    var limit = 0;
    if($(obj).attr('data-limit')){
        limit = $(obj).attr('data-limit');
    }

    $(obj).chosen({
        allow_single_deselect: true,
        disable_search_threshold: 5,
        max_selected_options: limit
    });

  });

  $(window).smartresize(function(){
    cardResize($('.cards'));
    backgroundResize();
    fullscreenFix();
  });

  cardResize($('.cards'));
  backgroundResize();
  fullscreenFix();
  $(window).focus(backgroundResize);
});


function cardResize(obj){
    var maxHeight = -1;

    $('.card', obj).each(function() {
      $(this).css('height', 'auto');
      maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });

    $('.card', obj).each(function() {
      $(this).height(maxHeight);
    });
};


// modified from http://www.minimit.com/demos/parallax-backgrounds-with-centered-content

/* detect touch */
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}

/* set parallax background-position */
// function parallaxPosition(e){
//     var heightWindow = $(window).height();
//     var topWindow = $(window).scrollTop();
//     var bottomWindow = topWindow + heightWindow;
//     var currentWindow = (topWindow + bottomWindow) / 2;
//     $(".parallax").each(function(i){
//         var path = $(this);
//         var height = path.height();
//         var top = path.offset().top;
//         var bottom = top + height;
//         // only when in range
//         if(bottomWindow > top && topWindow < bottom){
//             var imgW = path.data("resized-imgW");
//             var imgH = path.data("resized-imgH");
//             // min when image touch top of window
//             var min = 0;
//             // max when image touch bottom of window
//             var max = - imgH + heightWindow;
//             // overflow changes parallax
//             var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
//             top = top - overflowH;
//             bottom = bottom + overflowH;
//             // value with linear interpolation
//             var value = min + (max - min) * (currentWindow - top) / (bottom - top);
//             // set background-position
//             var orizontalPosition = path.attr("data-oriz-pos");
//             orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
//             $(this).css("background-position", orizontalPosition + " " + value + "px");
//         }
//     });
// }
// if(!$("html").hasClass("touch")){
//     $(window).resize(parallaxPosition);
//     //$(window).focus(parallaxPosition);
//     $(window).scroll(parallaxPosition);
//     parallaxPosition();
// }
