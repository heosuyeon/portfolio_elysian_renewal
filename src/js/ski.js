// $(function(){
if ($(".ski_page").length > 0) AOS.init();

if ($(".grid").length > 0) {
  $(".grid").masonry({
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
    percentPosition: true,
  });
  $(".ski-gallery-wrap").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          variableWidth: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          variableWidth: true,
          slidesToShow: 1,
        },
      },
    ],
  });
}
if ($(".rental_slide").length > 0) {
  $(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
    instructionsText:
      "Changing this current slide of this carousel will change the current slide of the thumbnail carousel that follows.",
    regionLabel: "main image carousel",
  });
  $(".slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    // dots: true,
    instructionsText:
      "Changing the current slide of this carousel will change the current slide of the preceding main image carousel.",
    regionLabel: "thumbnail carousel",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
}
if ($(".ski_info_page").length > 0) {
  let currentUrl = location.href;
  //외부 링크로 탭메뉴 활성화 하기
  $(".tab_menu li").each(function (i) {
    let tabIdx = `#tabs-${i}`;
    let active = currentUrl.indexOf(tabIdx);
    if (active > -1) {
      $(this).addClass("active").siblings().removeClass("active");
      $(".tab_contents > div")
        .eq(i)
        .addClass("active")
        .siblings()
        .removeClass("active");
      $("html").scrollTop(0); //스크롤 상단으로 올리기
    }
  });
}
// });//ready
