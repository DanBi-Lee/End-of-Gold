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

    /* 정보 입력{ */
    function inputinfo(){
        function output(input,output){
            var inputval = input.val();
            output.text(inputval);
        }
        output($('#titleTb'),$('.title-box'));
    }
    /* } 정보입력 끝*/
    
    /* 모달창 열기 { */
    function open_modal(){
        var modalbox = $('.modal-bg');
        inputinfo();
        drawprview();
        modalbox.show();
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
            $.ajax({
                url: api_url + '?key=' + api_key + '&q=' + q,
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
                    alert("이미지 파일만 올릴 수 있습니다.");
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
            $('.modal-bg').hide();
        });
        tabfunc(img_btn, img_box);
        tabfunc(op_btn, op_box);
    }
    /* img로 바꾸기 */
    function convert(ori, img) {
        html2canvas($(ori), {
            useCORS: true,
            onrendered: function (canvas) {
//                canvas.toBlob(function(blob) {
//                    saveAs(blob, 'download.png');
//                });
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
        function _down(){
            var _this = $(this);
            var img = _this.siblings('img');
            _this[0].href = img[0].src;
            //_this.click();
        }
    }
    /*} 다운로드 */
    function init() {
        imgsearch();
        imgFile();
        imgpreview();
        drawprview();
        downloadImg();
    }
})(this.jQuery);





//(function ($) {
//    var q = '';
//    var api_url = 'https://pixabay.com/api/';
//    var form_search = $('.form_search');
//    var ul_imgs = $('.ul_imgs');
//    form_search.submit(function (e) {
//        e.preventDefault();
//        q = $('#searchQ').val();
//        q = q.replace(' ', '+');
//        $.ajax({
//            url : api_url + '?key=' + api_key + '&q=' + q,
//            dataType: 'jsonp'
//        }).done(
//            function (data) {
//                var template = '';
//                data.hits.forEach(function (item, i) {
//                    template += '<li data-img="' + item.largeImageURL + '">\
//                  <div class="wrap_img" style="background-image: url(\'' + item.previewURL + '\')">\
//                      <a href="' + item.pageURL + '" target="_blank">원본 ☞ ' + item.user + '</a>\
//                  </div>\
//               </li>';
//                });
//                ul_imgs.html(template);
//                ul_imgs.find('li').on('click', function () {
//                    var _this = $(this);
//                    var data_img = _this.attr('data-img');
//                    $('.img_table').css({
//                        'backgroundImage': 'url("' + data_img + '")'
//                    });
//                    $('.img_table').attr('data-img', data_img);
//                });
//            }
//        );
//    });
//})(this.jQuery);
//
//function sample() {
//    html2canvas(document.getElementById('download'), {
//        useCORS: true,
//        onrendered: function (canvas) {
//            canvas.toBlob(function (blob) {
//                saveAs(blob, 'download.png');
//            });
//        }
//    });
//}
//
//$(".img_table").click(sample);
//
//(function($){
//var x = $('.filetest');
//var xx = x.find('input');
//var y = $('#downloadimg');
//
//xx.on('change', handleImgFileSelect);
//function handleImgFileSelect(e){
//	var files = e.target.files;
//	var filesArr = Array.prototype.slice.call(files);
//	filesArr.forEach(function(f){
//		if(!f.type.match("image.*")){	
//			alert("이미지 파일만 올릴 수 있습니다.");
//			return;
//		}
//		sel_file = f;
//
//		var reader = new FileReader();
//		reader.onload = function(e){
//			y.attr('src', e.target.result);
//		}
//		reader.readAsDataURL(f);
//	});
//}
//})(this.jQuery);