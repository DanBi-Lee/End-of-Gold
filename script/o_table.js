(function ($) {
    $('#loadInfobox').load('./infobox.html');
    $('#loadTable').load('./maptable.html');

    /* 스텝 - 아코디언메뉴 */
    (function () {
        var makeStep = $('.make-step');
        var makeStep_dt = makeStep.children('li').children('dl').children('dt');
        var makeStep_dd = makeStep_dt.siblings('dd');
        makeStep_dt.on('click', function (e) {
            e.preventDefault();
            var _this = $(this); _this.parent('dl').parent('li').siblings().children('dl').children('dt').next('dd').slideUp();
            _this.next('dd').slideToggle(300);
        });
    })();
})(this.jQuery);




//
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
//			alert("확장자는 이미지 확장자만 가능합니다.");
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