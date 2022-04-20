// $(function(){
  if($('.grid').length > 0){
    $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
    $('.ski-gallery-wrap').slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            variableWidth: true,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            variableWidth: true,
            slidesToShow: 1
          }
        }
      ]
    });
  }
  if($('.swiper-slide').length > 0){
    var swiper = new Swiper(".mySwiper", { //ski_rental.html
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true
    });
    var swiper2 = new Swiper(".mySwiper2", { //ski_rental.html
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }
  if($('.ski_info_page').length > 0){
    let currentUrl = location.href;
    //외부 링크로 탭메뉴 활성화 하기
    $('.tab_menu li').each(function(i){      
      let tabIdx = `#tabs-${i}`;
      let active = currentUrl.indexOf(tabIdx);
      if(active > -1){
        $(this).addClass('active').siblings().removeClass('active');
        $('.tab_contents > div').eq(i).addClass('active').siblings().removeClass('active');
        $('html').scrollTop(0); //스크롤 상단으로 올리기
      }
    });
  }
// });//ready