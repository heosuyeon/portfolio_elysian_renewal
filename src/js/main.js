$(function () {
  AOS.init();
  /*----------------cookie popup---------------*/
  var myPopup = document.querySelector(".popup"),
    checkbox = document.querySelector("#nomore"),
    popupClose = document.querySelector(".popup .close_btn");

  //쿠키 생성
  function setCookie(name, value, day) {
    var date = new Date(); //현재 날짜 지정.
    date.setDate(date.getDate() + day);
    var mycookie = "";
    mycookie += name + "=" + value + ";";
    mycookie += "Expires=" + date.toUTCString();
    document.cookie = mycookie; //쿠키 설정, 생성
  } //setCookie
  //쿠키 삭제
  function delCookie(name) {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var setCookie = "";
    setCookie += name + "=Main;";
    setCookie += "Expires=" + date.toUTCString();
    document.cookie = setCookie; //쿠키 설정, 생성
  } //delCookie
  //쿠키 확인
  function checkCookie(name) {
    var cookies = document.cookie.split(";");
    // console.log(cookies);
    var visited = false; // 방문 거짓

    for (var i in cookies) {
      if (cookies[i].indexOf(name) > -1) {
        visited = true;
        // console.log(visited);
      }
    }
    // console.log(visited);
    if (visited) {
      //재방문
      // myPopup.style.display = "none";
      myPopup.close();
    } else {
      //신규방문
      // myPopup.style.display = "block";
      myPopup.showModal();
    }
  } //checkCookie
  // checkCookie("portfolio.com");
  popupClose.addEventListener("click", function () {
    //a.checked true false
    if (checkbox.checked) {
      //팝업을 다시 안보겠다. 팝업 닫고, 쿠키 생성.
      setCookie("portfolio.com", "Main", 1);
    } else {
      //팝업을 계속 본다. 팝업 닫고, 쿠키 제거.
      delCookie("portfolio.com");
    }
    // myPopup.style.display = "none";
    myPopup.close();
  });
  /*----------------slide show---------------*/
  var mainSlideWrapper = $(".main_slide_wrapper"),
    mainSlide = mainSlideWrapper.find("li"),
    mainSlideCount = mainSlide.length,
    autoTimer,
    mainCurrentIdx = 0,
    intervalTimer = 5000,
    pager = mainSlideWrapper.find(".pager"),
    nextBtn = mainSlideWrapper.find(".next"),
    prevBtn = mainSlideWrapper.find(".prev"),
    controlBtn = mainSlideWrapper.find("button"),
    pauseBtn = mainSlideWrapper.find(".pause"),
    replayBtn = mainSlideWrapper.find(".replay");

  mainSlide.eq(0).fadeIn();
  //pager 생성
  mainSlide.each(function (idx) {
    pager.append(`<a href="/index.html">${idx}</a>`);
  });

  //타이머
  function autoSlide() {
    autoTimer = setInterval(function () {
      if (mainCurrentIdx != mainSlideCount - 1) {
        showNextSlide(mainCurrentIdx + 1);
      } else {
        showNextSlide(0);
      }
    }, intervalTimer);
  }

  //pager 클릭 슬라이드 이동
  pager.find("a").click(function (e) {
    e.preventDefault();
    clearInterval(autoTimer);
    var targetIdx = $(this).index();
    showNextSlide(targetIdx);
    if (pauseBtn.hasClass("active")) {
      autoSlide();
    }
  });
  pager.find("a").eq(0).trigger("click");

  function showNextSlide(idx) {
    mainSlide.eq(idx).fadeIn(1000).siblings().fadeOut(1200);
    mainCurrentIdx = idx;
    pager
      .find("a")
      .eq(mainCurrentIdx)
      .addClass("active")
      .siblings()
      .removeClass("active");
    // console.log('mainCurrentIdx :', mainCurrentIdx);
  }
  //좌우 버튼 클릭 슬라이드 이동하기
  nextBtn.click(function (e) {
    e.preventDefault();
    clearInterval(autoTimer);
    if (mainCurrentIdx != mainSlideCount - 1) {
      showNextSlide(mainCurrentIdx + 1);
    } else {
      showNextSlide(0);
    }
    if (pauseBtn.hasClass("active")) {
      autoSlide();
    }
  });
  prevBtn.click(function (e) {
    e.preventDefault();
    if (mainCurrentIdx != 0) {
      showNextSlide(mainCurrentIdx - 1);
    } else {
      showNextSlide(mainSlideCount - 1);
    }
    if (pauseBtn.hasClass("active")) {
      autoSlide();
    }
  });
  //자동 슬라이드 멈추기, 다시 재생 하기
  controlBtn.click(function () {
    $(this).removeClass("active").siblings().addClass("active");
    if (replayBtn.hasClass("active")) {
      clearInterval(autoTimer);
    } else {
      autoSlide();
    }
  });
  /*----------------메인 비지니스---------------*/
  var BusiLi = $(".horizontal_wrap li"),
    fullImg = $(".full_bg_wrap > div"),
    thumbImg = BusiLi.find(".img"),
    caption = BusiLi.find(".caption_up");

  BusiLi.mouseover(function () {
    var idx = $(this).index();
    var targetImg = fullImg.eq(idx).attr("data-bg");

    if ($(window).width() > 768) {
      thumbImg.css({ opacity: "0" }); //원래 있던 이미지 사라지고
      fullImg.css({ backgroundImage: `url(${targetImg})` }); //경로 변경후
      fullImg.eq(idx).css({ opacity: "1" }); //변경한 이미지 보이도록
    }
    $(this).siblings().find(caption).css({ opacity: "0" }); //호버한 요소의 형제 캡션만 안보이게
  }).mouseout(function () {
    fullImg.css({ opacity: 0 }); //full bg 사라지고
    thumbImg.css({ backgroundImage: "" }); //원래 bg로 전환
    thumbImg.css({ opacity: "1" });
    caption.css({ opacity: "1" }); //전체 캡션 보이게
  });
  /*----------------offers---------------*/
  $(".offers-wrap").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dots: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px",
          centerPadding: 0,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
  /*----------------------------restaurant---------------------------*/
  var links = $(".table li"),
    bg = $(".bg"),
    restDesc = $(".restaurant_wrap .rest_desc"),
    restDescText = restDesc.html();

  links.each(function () {
    var img = new Image();
    var imgSrc = $(this).find("a").attr("data-bg");
    img.src = imgSrc;
  });
  links
    .mouseenter(function () {
      if ($(window).width() > 768) {
        bg.css({
          backgroundImage: "url(" + $(this).find("a").attr("data-bg") + ")",
        });
        var dataContent = $(this).find("a").attr("data-content");
        restDesc.html(dataContent);
      }
    })
    .mouseleave(function () {
      bg.css({ backgroundImage: `` });
      restDesc.html(restDescText);
    });
  /*----------------------------news---------------------------*/
  let filterBtn = $(".filter_btn button");
  let newsSlides = $(".news_slides");
  const newsSlidesItem = newsSlides.find("> .swiper-slide");
  const noResult = newsSlides.find("> .emptymessage");

  // var swiper = new Swiper(".mySwiper", {
  //   a11y:{
  //     slideRole: 'listitem',
  //   },
  //   slidesPerView: 2,
  //   spaceBetween: 20,
  //   allowTouchMove:false,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     640: { //640 이상
  //       slidesPerView: 3,
  //       spaceBetween: 30,
  //     }
  //   }
  // });

  newsSlides.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  });

  filterBtn.click(function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active"); //버튼 스타일
    let dataFilter = $(this).attr("data-filter");

    newsSlides.slick("slickRemove", null, null, true);
    newsSlides.slick("slickAdd", newsSlidesItem.filter(dataFilter));

    if ($(".slick-track").children(".swiper-slide").length == 0) {
      newsSlides.slick("slickAdd", noResult);
    }
    // console.log($('.slick-track').children('.swiper-slide').length)

    // if(dataFilter =='all'){
    //   //전체 삭제하고 다시 넣어준 후에 전부 보여주기
    //   $('.swiper-wrapper').slick('slickRemove',null, null, true);
    //   // newsSlidesItem.remove();
    //   // newsSlides.append(newsSlidesItem);
    //   //newsSlidesItem.show(); //리스트 전체 보이기
    // }else{
    //   $('.swiper-wrapper').slick('slickRemove',null, null, true);
    //   // newsSlidesItem.remove();
    //   // newsSlides.append(newsSlidesItem.filter(dataFilter));
    //   //$(dataFilter).show(); //선택한 리스트만 보이기
    // }
    // 슬라이드 업데이트후 위치 옮기기
    // swiper.updateSlides();
    // swiper.slideTo(0, 100, false);

    // console.log('swiper.realIndex :', swiper.realIndex,'swiper.activeIndex :', swiper.activeIndex);
    // console.log('swiper.slides.length :', swiper.slides.length);

    //게시글 없음
    // if(swiper.slides.length == 0) {
    //   noResult.css({display:'block'});
    // }else{
    //   noResult.css({display:'none'});
    // }
  });
  filterBtn.eq(0).trigger("click");

  checkCookie("portfolio.com");
}); //ready
