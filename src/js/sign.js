// $(function(){
    $("#form").validate({
        errorPlacement: function (error, element) {
            element.parent().children().last().after(error);
        },
        rules: {
            username: { required : true, minlength : 2},
            userId: {required : true, rangelength : [4,10]},
            userpassword: {required : true, minlength : 5},
            pwdConfirm: {required : true, equalTo:"#userpassword"},
            userphone_check: "required",
            member: "required",
            personal_information: "required",
            consignment_information: "required"
        },
        messages : {
            username: {
                required : "이름을 입력하세요",
                minlength : "최소 2글자이상이어야 합니다",
            },
            userId: {
                required : "아이디를 입력하세요",
                rangelength : "4글자 이상, 10글자 이하이어야 합니다"
            },
            userpassword: {
                required : "암호를 입력하세요",
                minlength : "최소 5글자 이상이어야 합니다",
            },
            pwdConfirm: {
                required : "암호를 다시 입력하세요",
                equalTo : "암호가 일치하지 않습니다",
            },
            userphone_check: {
                required : "인증번호를 입력하세요"
            },
            member: {
                required : "필수 약관에 동의해주세요"
            },
            personal_information: {
                required : "필수 약관에 동의해주세요"
            },
            consignment_information: {
                required : "필수 약관에 동의해주세요"
            }
        }
    });

    $('#direct').hide();
    $('select[name="userdomain"]').change(function(){
        let domainValue = $(this).val();
        if(domainValue == "direct"){
            $('#direct').show();
            $('#direct').val('').focus();
        }else{
            $('#direct').val('').blur();
            $('#direct').hide();
        }
    });
    $('#direct').click(function(){
        $(this).val('');
        $('select[name="userdomain"] option').eq(4).prop("selected",true);;
    });

    //전체동의 체크박스 클릭시 하위 체크박스 모두 선택
    $('.check_all').each(function(){
        $(this).click(function(){
            let check = $(this).parent().siblings().find('input[type="checkbox"]');
            if($(this).is(":checked")) {
                check.prop("checked", true);
            }else {
                check.prop("checked", false);
            }
        });
    });
    //하위 체크박스 모두 선택시 전체동의 체크박스 선택, 해제
    let checkbox = $('.check input[type="checkbox"]');    
    checkbox.click(function(){
        //클릭한 그 요소의 부모가 가진 체크박스의 갯수
        let totlaCount = $(this).parent().parent().find('input[type="checkbox"]').length;    
        // 클릭한 그 요소포함한 형제의 인풋이 체크된 갯수
        let checkCount = $(this).parent().parent().find('input[type="checkbox"]:checked').length;
        let allCheck = $(this).parent().parent().siblings().find('input[type="checkbox"]');
        //console.log(totlaCount,checkCount);
        if(totlaCount == checkCount){
            allCheck.prop("checked", true);
        }else{
            allCheck.prop("checked", false);
        }
    });
// }); //ready    