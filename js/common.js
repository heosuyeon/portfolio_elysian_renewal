$(function(){
  // Passive event listeners
  jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
  jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
  };
  var header = $('header');
  var menu = $('.gnb nav > ul > li');
  var subMenu = menu.find('ul');
  var headerHeight = header.outerHeight();
  var subMenuHeight = 0;
  var fixedHeight = 70;
  var slideMenuList = $('header nav > ul> li');
      
  $(window).scroll(function(){
    if($(window).width() > 768){
      if($(this).scrollTop() > 0){        // 스크롤 o
        header.addClass('fixed headerbg');
        header.css({height:fixedHeight + 'px'});
      }else{                              // 스크롤 x
        if(header.hasClass('default_header')){
          header.removeClass('headerbg');
        }
        header.removeClass('fixed');
        header.css({height:headerHeight + 'px'});
      }
    }
  });
  menu.mouseover(function(){  
    if($(window).width() > 768){
      subMenu.each(function(){
        if(subMenuHeight < $(this).outerHeight()){
          subMenuHeight = $(this).outerHeight();
        }
      });
      let padding = 15;
      header.addClass('headerbg');
      
      $(this).addClass('active').siblings().removeClass('active');
      if(header.hasClass('fixed')){     // 스크롤 o
        header.css({height:fixedHeight + subMenuHeight + padding +'px'});
      }else{                            // 스크롤 x
        header.css({height:headerHeight + subMenuHeight + padding +'px'});
      }
    }
  })
  .mouseout(function(){  
    if($(window).width() > 768 && $(window).scrollTop() == 0 && header.hasClass('default_header')){
      header.removeClass('headerbg');
    }
    $(this).removeClass('active');
    if(header.hasClass('fixed')){    // 스크롤 o
      header.css({height:fixedHeight +'px'});
    }else{                       
      header.css({height:headerHeight +'px'});
    }
  });
  /*----------------리사이즈---------------*/
  $(window).resize(function(){
    if($(window).width() < 769){
      header.addClass('fixed headerbg');
      header.css({height: fixedHeight + 'px'});
      $('.hamburger-btn').removeClass('active');
      slideMenuList.find('>a').attr('onclick',`return false`);
    }else{                      // 770 이상
      if($(window).scrollTop() > 0){ //스크롤 o
        header.addClass('fixed headerbg');
        header.css({height: fixedHeight + 'px'});
      }else{
        if(header.hasClass('default_header')){
          header.removeClass('fixed headerbg'); //스크롤 x (기본값)
        }
        header.css({height: ''});
      }
      $('header nav').removeClass('toggle');
      $('body').removeClass('overflow');
      if(!$('header nav').hasClass('toggle')){
        $('header nav .depth2').css({display:'block'});
      }
      slideMenuList.find('>a').attr('onclick',`return true`);   
    }
  });
  $(window).trigger("resize");// 브라우저 너비 늘리고 줄인 상태에서 새로고침시 필요
  /*----------------search button---------------*/
  var searchBtn = $('header .search');
  var searchForm = $('.search_form');
  var closeBtn = $('.search_form .close');
  /*
  searchBtn을 클릭하면 폼이 나타나고
    나타날때 입력창에 포커스가 적용되고
  다시 클릭하면 사라진다.
    사라질때 포커스를 해제한다.
  */
  searchBtn.click(function(e){
    e.preventDefault();
    $('body').addClass('open_search');
    if($('body').hasClass('open_search')){
      searchForm.find('input').focus();
    }else{
      searchForm.find('input').blur();
    }
  });
  closeBtn.click(function(e){
    e.preventDefault();
    $('.search_form input').val('');
    $('body').removeClass('open_search');
  });
  /*----------------------------go-top---------------------------*/
	var $window = $(window);
	var goTop = $('#go-top');
	
	$window.scroll(function(){
		if($(this).scrollTop() > 50){
			goTop.fadeIn();
		}else{
			goTop.fadeOut();
		}
	});
	goTop.click(function(e){
		e.preventDefault();
		$('html,body').stop().animate({scrollTop:0},1000);
	});
  /*----------------hamburger button---------------*/
  var hamburgerBtn = $('.hamburger-btn');

  hamburgerBtn.click(function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $('header nav').toggleClass('toggle');
    $('body').toggleClass('overflow');
    if($('header nav').hasClass('toggle')){
      slideMenuList.find('ul').css({display:'none'});
    }else{
      slideMenuList.find('ul').css({display:'block'});
    }
  });
  slideMenuList.click(function(){
    if($(window).width() < 769){ 
      $(this).siblings('li').find('ul').slideUp();
      $(this).find('ul').slideToggle();
    }
  });
  /*----------------dark mode---------------*/
  let plusBtn = $('#plus_wrap #plus');
  let plusBtns = $('#plus_wrap .btn');
  let modeBtn = $('.mode_btn button');
  plusBtn.click(()=>{
    $('#plus_wrap').toggleClass('click_plus');
    if($('#plus_wrap').hasClass('click_plus')){
      plusBtns.each(function(i){
        let pos = i * 50;
        $(this).css({bottom:pos});
      });
    }else{
      plusBtns.css({bottom:''});
    }
  });
  modeBtn.click(function(){
    $('body').toggleClass('dark');
  });
  /*----------------family site---------------*/
  let familySite = $('.family_site');
  familySite.change(function(){
    let targetUrl = $(this).val();
    window.open("about:blank").location.href = targetUrl;
  });
  /*----------------tabs---------------*/
  if($('.tab_menu').length > 0){
    let tabMenu = $('.tab_menu li');
    //탭메뉴 클릭 이벤트
    tabMenu.click(function (e) {
      e.preventDefault();
      $(this).addClass('active').siblings().removeClass("active"); //버튼 스타일
      //탭메뉴 누르면 컨텐츠 보이기 
      var activeTab = $(this).find('a').attr('href');
      $(activeTab).addClass('active').siblings().removeClass('active');
      $(activeTab).addClass('active'); //스키 슬로프맵 전체보기
    });
    $('.filter_wrap .tab_menu').each(function(){
      $(this).find('li').eq(0).trigger('click');
    });
  }
  /*----------------breadcrumbs---------------*/    
  if($('.bread_crumbs').length > 0){
    let bcMenu = $('.bread_crumbs >li:not(li:first-child)');
    bcMenu.click(function(){
      $(this).toggleClass('active');
      if($(this).hasClass('active')){
        $(this).siblings().removeClass('active');
      }
      let dataGuide = $(this).attr('data-guide');
      if(dataGuide){
        $(this).find('ul > li').each(function(){
          let a = $(this).attr('data-guide').indexOf(dataGuide);
          if(a > -1){
            $(this).addClass('active');
          }else{
            $(this).removeClass('active');
          }
        });
      }
    });
  }
  /*----------------modal---------------*/   
  if($('.modal_contents').length > 0){
    let showTerms = $('#agreement .check span');
    let showModal = $('.show_modal');
    let hideModal = $('.modal button');
    showTerms.each(function(){
      $(this).click(function(){
          $(this).parent().next().addClass('active');
      });
    });
    showModal.click(function(){
      let dataModal = $(this).attr('data-modal');
        $(dataModal).addClass('active');
    });
    hideModal.each(function(){
      $(this).click(function(e){
          e.preventDefault();
          $(this).parents('.modal').removeClass('active');
      });
    });
  }
  // if($('.swiper-slide').length > 0){
  //   //좌우 방향키 스타일 통일
  //   $('.swiper-button-prev').addClass('slick-prev slick-arrow');
  //   $('.swiper-button-next').addClass('slick-next slick-arrow');
  // }
});//ready