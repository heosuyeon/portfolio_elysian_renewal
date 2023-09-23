// $(function(){
    let searchBtn = $('#search_news button[type="submit"]');
    let filterBtn = $('.filter_btn button');
    var tr = $('.news_table > tbody > tr');
    let rows;
    const rowsPerPage = 10;

    searchBtn.click(function(e){
        e.preventDefault();
        filterBtn.removeClass('active');
        let userKey = $('#search_news input[type="search"]').val().toUpperCase();
        tr.hide();
        let searched = $('.news_table > tbody > tr >td:nth-child(3):contains(' + userKey + ')');
        searched.parent('tr').show();
        //사용자 검색어 하이라이트 처리
        if(searched){
            searched.each(function(){
                $(this).html( $(this).text().replace(userKey, "<span class='text-red'>"+ userKey +"</span>") );
            });
        }
        //검색 결과 없음
        if(!tr.is(':visible')) {
            $('#emptymessage p').text('검색 결과가 없습니다.');
            $('#emptymessage').css({display:'block'});
        }else{
            $('#emptymessage').css({display:'none'});
        }
        pagenation();
    });
    //filter 버튼 클릭 이벤트
    filterBtn.click(function(e){
    e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active'); //버튼 스타일
        $('input[type="search"]').val(''); //인풋값 초기화
        let dataFilter = $(this).attr('data-filter');
        tr.hide(); //table rows 지우기/보이기
        $(dataFilter).show();
        if(dataFilter =='all'){
            tr.show(); //table rows 모두 보이기
        }   
        //게시글 없음
        if(!tr.is(':visible')) {
            $('#emptymessage p').text('등록된 게시물이 없습니다.');
            $('#emptymessage').css({display:'block'});
        }else{
            $('#emptymessage').css({display:'none'});
        }
        //검색했던 키워드 하이라이트 초기화하기..
        $('.news_table > tbody > tr >td:nth-child(3)').each(function(){
            $(this).html( $(this).text().replace(/(<span>|<\/span>)/gi, ""));
        }); 
        pagenation();
    });
    filterBtn.eq(0).trigger('click');

    //페이저생성함수 
    function pagenation(){
        rows = tr.filter(function() { return $(this).css("display") != "none" });
        let rowsCount = rows.length;
        let pageCount = Math.ceil(rowsCount/rowsPerPage);
        $('#result_count span').text(rowsCount);
        //페이저 생성
        $('#numbers').html('');
        for(let x = 1; x <= pageCount; x++){
            $('#numbers').append(`<li><a href="/index.html">${x}</a></li>`);
        }
        postCounting();
        //페이저 클릭 이벤트
        let numberBtn = $('#numbers a');
        numberBtn.click(function(e){
        e.preventDefault();
            $(this).parent().addClass('active').siblings().removeClass('active');
            let idx = $(this).parent('li').index();
            displayRow(idx); //열자마자 idx에 0번이 들어가있음
        });
        numberBtn.eq(0).trigger('click');
    }
    //게시글 10개씩 보이기
    function displayRow(idx){
        var start = idx * rowsPerPage; //0,10,20...
        var end = start + rowsPerPage; //10,20,30...
        rows.hide();
        rows.slice(start,end).show();
    }
    $(window).resize(function(){
        postCounting();
    });
    //글 번호 매기기
    function postCounting(){
        if($(window).width() > 768){
            $(rows.get().reverse()).each(function(idx){
                $(this).find('td:nth-child(1)').text(idx + 1);
            });
        }
    }
// }); //ready