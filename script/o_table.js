(function ($) {
    $('#loadInfobox').load('./infobox.html');
    $('#loadTable').load('./maptable.html');
    $('#loadSCard').load('./scard.html');
    $('#loadMCard').load('./mcard.html');
    $('#loadModalpre').load('./modalpre.html', function () {
        $('#loadSelectColor').load('./select-color.html');
        $('#loadSelectFonts').load('./select-fonts.html');
        $('#loadSearch').load('./search.html', init);
    }); // 미리보기
    /* 폰트변경 { */
    function changeFont(){
        function mkfontlist(){
            var _parent_ul = $('.font-box ul');
            var _template = '';
            for(var i=0; i< fontlist.length; i++){
                _template += '<li data-font="'+ fontlist[i].code +'" style="font-family:' + fontlist[i].code + '">'+ fontlist[i].name +'</li>';
            }
            _parent_ul.html(_template);
        }
        function _change(input,output) {
            input.siblings().removeClass('onfa0');
            input.addClass('onfa0');
            var _font = input.attr('data-font');
            output.css('fontFamily', _font);
            drawprview();
        }
        mkfontlist();
        var mainText = $('.main-text');
        var mainText_li = mainText.children('li');
        var subText = $('.sub-text');
        var subText_li = subText.children('li');
        mainText_li.on('click',function(){
            var input = $(this);
            _change(input,$('.title-box'));
        });
        subText_li.on('click',function(){
            var input = $(this);
            _change(input,$('.infotext-c'));
        });
    }
    /* } 폰트변경 */
    
    /* 정보 입력{ */
    function inputinfo(){
        function output(input,output){
            var inputval = input.val();
            output.text(inputval);
        }
        function mkcycle(input,output){
            var inputcount = input.val();
            var temp = '';
            for(var i=1; i<=inputcount; i++){
                temp += '<li class="sboder-box">' + i + '</li>';
            }
            temp = '<li class="sboder-box sborder-color-box text-c">도입</li>'+temp+'<li class="sboder-box sborder-color-box text-c">클맥</li>';
            output.html(temp);
        }
        function mkpc(input,output){
            var inputcount = input.val();
            var temp = '';
            for(var i=1; i<=inputcount; i++){
                temp += '<li class="scolor-innerbox sshadow-box">\
                            <div class="pc-name sborder-color-box text-c">PC'+i+'</div>\
                            <div class="pc-fig sboder-box"></div>\
                            <div class="pc-item sborder-color-box">\
                                <ul class="text-c">\
                                    <li>진통제</li>\
                                    <li>무기</li>\
                                    <li>부적</li>\
                                </ul>\
                            </div>\
                            <div class="pc-mdcard sboder-box">\
                                광기카드<br>두는 곳\
                            </div>\
                        </li>';
            }
            output.html(temp);
        }
        
        output($('#titleTb'),$('.title-box'));
        output($('#gmplTb'),$('.plgm-name'));
        output($('#dateTb'),$('.scard-date'));
        output($('#writerTb'),$('.scard-writer'));
        output($('input[name="nop"]:checked'),$('.numberp-out'));
        mkpc($('input[name="nop"]:checked'),$('.pcnumber-out'));
        output($('input[name="cl"]:checked'),$('.cycle-out'));
        mkcycle($('input[name="cl"]:checked'),$('.cycleli-out'));
    }
    /* } 정보입력 끝*/
    /* 모달창 열기 { */
    function open_modal(){
        var modalbox = $('.modal-bg');
        inputinfo();
        drawprview();
        modalbox.removeClass('hide');
    }
    $('.open-modal').on('click',open_modal);
    /* } 모달창 열기 */
    /* 검색 {*/
    function imgsearch() {
        var q = '';
        var api_url = 'https://pixabay.com/api/';
        var form_search = $('.form_search');
        var ul_imgs = $('.ul_imgs');
        form_search.submit(function (e) {
            e.preventDefault();
            q = $('#searchQ').val();
            q = q.replace(' ', '+');
            per_page = 39;
            $.ajax({
                url: api_url + '?key=' + api_key + '&q=' + q + '&per_page=' + per_page,
                dataType: 'jsonp'
            }).done(
                function (data) {
                    var template = '';
                    data.hits.forEach(function (item, i) {
                        template += '<li data-img="' + item.largeImageURL + '">\
                  <div class="wrap_img" style="background-image: url(\'' + item.previewURL + '\')">\
                      <a href="' + item.pageURL + '" target="_blank">원본 ☞ ' + item.user + '</a>\
                  </div>\
               </li>';
                    });
                    ul_imgs.html(template);
                    $('.seach-contents').scrollTop(0);
                    ul_imgs.find('li').on('click', function () {
                        var _this = $(this);
                        var data_img = _this.attr('data-img');
                        _this.siblings().removeClass('onborder');
                        _this.addClass('onborder');
//                        $('.map-imgtag')[0].src = data_img;
//                        $('.map-imgtag').eq(1)[0].src = data_img;
                        $('.map-imgtag').each(function(i){
                            $('.map-imgtag').eq(i)[0].src = data_img;
                        })
                        drawprview();
                    });
                }
            );
        });
    }
    /* } 검색 */
    /* 파일 업로드 { */
    function imgFile(){
        var file_input = $('#imgFile');
        var map_imgtag = $('.map-imgtag');
        file_input.on('change', handleImgFileSelect);
        function handleImgFileSelect(e) {
            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
            filesArr.forEach(function (f) {
                if (!f.type.match("image.*")) {
                    alert("이미지 파일만 올려주세요");
                    return;
                }
                sel_file = f;

                var reader = new FileReader();
                reader.onload = function (e) {
                    map_imgtag.attr('src', e.target.result);
                }
                reader.readAsDataURL(f);
            });
            setTimeout(drawprview, 100);
        }  
    }
    /* } 파일 업로드 */
    /* 칼라변경 {*/
    function changeColor() {
        function _change(input, output, prop, option) {
            var option = option||'';
            var _color = input.val() + option;
            output.css(prop, _color);
            drawprview();
        }
        $('#bgColor').on('input', function () {
            _change($(this), $('.scolor-box'), 'backgroundColor', '55');
        });
        $('#lineColor').on('input', function(){
            _change($(this), $('.sboder-box'), 'borderColor');
            _change($(this), $('.sborder-color-box'), 'backgroundColor');
        });
        $('#fontColor').on('input', function(){
            _change($(this), $('.text-c'), 'color');
        });
        $('#titlefontColor').on('input', function () {
            _change($(this), $('.infotext-c'), 'color');
            _change($(this), $('.title-box'), 'color');
        });
    }
    /*} 칼라변경 */
    /* 미리보기 */
    function imgpreview() {
        /*미리보기탭*/
        var img_box = $('.img-box');
        var img_btn = $('.img-btn');
        var close_btn = $('.close');
        /*옵션선택탭*/
        var op_box = $('.op-box');
        var op_btn = $('.op-tap');

        function tabfunc(btn, box) {
            var btn_li = btn.children('li');
            var box_li = box.children('li');
            btn_li.on('click', function (e) {
                e.preventDefault();
                var _this = $(this);
                var _index = _this.index();
                _this.siblings().removeClass('onfa0');
                box_li.eq(_index).siblings().hide();
                _this.addClass('onfa0');
                box_li.eq(_index).show();
            });
        }
        close_btn.on('click', function (e) {
            e.preventDefault();
            $('.modal-bg').addClass('hide');
        });
        tabfunc(img_btn, img_box);
        tabfunc(op_btn, op_box);
        tabfunc($('.font-tab'), $('.font-box'));
    }
    /* img로 바꾸기 */
    function convert(ori, img) {
        html2canvas($(ori), {
            useCORS: true,
            onrendered: function (canvas) {
                $('.preview').find('.img-box').find('li').eq(img).find('img')[0].src=canvas.toDataURL("image/png");
            }
        });
    }
    function drawprview(){
        convert('.map-table', 0);
        convert('.scard', 1);
        convert('.mcard', 2);
    }
    /* 다운로드 {*/
    function downloadImg(){
        var btnDown = $('.btn-download');
        btnDown.on('click',_down);
        function _down(e) {
            e.preventDefault();
            var _this = $(this);
            var _index = _this.parent('li').index();
            var ori = ['.map-table', '.scard','.mcard'];
            var filename = ['맵테이블', '세션카드', '광기카드뒷면'];
            html2canvas($(ori[_index]), {
                useCORS: true,
                onrendered: function (canvas) {
                    canvas.toBlob(function (blob) {
                        saveAs(blob,filename[_index]+'.png');
                    });
                }
            });
        }
    }
    /*} 다운로드 */
    function init() {
        imgsearch();
        imgFile();
        changeColor();
        changeFont();
        imgpreview();
        downloadImg();
    }
})(this.jQuery);