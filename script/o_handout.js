(function ($) {
    /* 핸드아웃 입력 함수 */
    function find_in_front(findh){
        return hoFront.find(findh);
    }
    function find_in_back(findh){
        return hoBack.find(findh);
    }
    
    // 앞면
    var hoFront = $('#hoFront');
    var f_cardM_li = find_in_front('.list');
    var f_box_output = find_in_front('.box_output');
    var f_box_output_div = find_in_front('.sma');
    var f_btn = find_in_front('.btnSubmit');
    var f_button_clear = find_in_front('button[type="reset"]');
    
    // 뒷면
    var hoBack = $('#hoBack');
    var b_cardM_li = find_in_back('.list');
    var b_box_output = find_in_back('.box_output');
    var b_box_output_div = find_in_back('.sma');
    var b_btn = find_in_back('.btnSubmit');
    var b_button_clear = find_in_back('button[type="reset"]');
    
    function inputFunc(input, output){
        input.on('input',function(e){
           e.preventDefault();
            input.each(function(i){
                var df = $(this).val();
                output.eq(i).text(df);
            })
        });
    }
    inputFunc(f_cardM_li, f_box_output_div);
    inputFunc(b_cardM_li, b_box_output_div);
    f_button_clear.on('click',function(e){
        f_box_output_div.text('');
    });
    b_button_clear.on('click',function(e){
        b_box_output_div.text('');
    });
    /* 앞뒷면 체크 */
    var kind_of_HO = $('input[name="kind_of_HO"]');
    kind_of_HO.on('change', function(){
        var _this = $(this);
        var hvalue = _this.attr('data-class');
        $('#'+hvalue).siblings('.box_ho').addClass('displaynone');
        $('#'+hvalue).removeClass('displaynone');
    });
    /* 냠 */
    function copyHO(el) {
        var body = $('body');
        var copyel = $(el)[0];
        var range, selection;
        if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(copyel);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(copyel);
            selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        console.log('복사함');
    }
    
    f_btn.on('click',copyHO.bind(this,'.cover.ho_front'));
    b_btn.on('click',copyHO.bind(this,'.cover.ho_back'));
})(this.jQuery);