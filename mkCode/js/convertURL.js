"use strict";
var clothes = $('#clothes');
var btnClothes = $('.btn-clothes');
console.log(btnClothes);
var out_clothes = $('.img-clothes');
var btnConfirm = $('#mkConfirm');
var img_list = {
    bgBg : '',
    bgFig : '',
    clothes : []
}
btnClothes.on('click', function () {
    var _val = clothes.val();
    console.log(_val);
    out_clothes.append('<li><img src="' + _val + '"/><button type="button" class="btn-remove" onclick="removeBtn.call(this)">x</button></li>');
    img_list.clothes.push(_val);
    clothes.val("");
    console.log(img_list);
});

function removeBtn() {
    var _this = $(this);
    console.log(_this);
    var _index = _this.parent('li').index();
    _this.parent('li').remove();
    img_list.clothes.splice(_index, 1);
    console.log(_index);
    console.log(img_list);
}
function Mkimgpreview(btn){
    var imgbox_str = btn.replace('.btn-','.img-');
    var object_str = btn.replace('.btn-','');
    var btn = $(btn);
    var btn_input = btn.siblings('input');
    var _val = btn_input.val();
    var imgbox = $(imgbox_str).find('img');
    imgbox.attr('src', _val);
    img_list[object_str] = _val;
    console.log(imgbox);
    console.log(img_list);
    btn_input.val("");
}
$('.btn-bgFig').on('click',function(e){
    e.preventDefault();
    Mkimgpreview('.btn-bgFig');
});
$('.btn-bgBg').on('click',function(e){
    e.preventDefault();
    Mkimgpreview('.btn-bgBg');
});

var string_list = function(list){
    var liststr = [];
    for(var i=0; i<list.length; i++){
        liststr.push('\'' + list[i] + '\'');
    }
    return liststr.toString();
}

btnConfirm.on('click', function () {
    console.log(img_list);
    var _string = string_list(img_list.clothes);
//    var sample_string = `
//<style>
//#sampleHTML ,#sampleHTML * {padding: 0; margin: 0;}
//#sampleHTML {width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #000; border-radius: 20px; box-sizing: border-box; margin-top: 20px;}
//#sampleHTML li{list-style: none;}
//#sampleHTML .bg{background-image: url('${img_list.bgBg}'); background-size: cover; background-repeat: no-repeat; background-position: center;}
//#sampleHTML .fig{width: 100%; height: auto; padding-top: 120%; margin: 0 auto; background-size: cover; position: relative; border: 2px solid #fff; border-bottom: none; border-radius: 20px 20px 0 0; box-sizing: border-box; overflow: hidden; background-position: center; background-repeat: no-repeat; background-image: url('${img_list.bgFig}');}
//#sampleHTML .fig > ul {position: absolute; top:0; left: 0; width: 100%; height: 100%; transition: margin-left 300ms cubic-bezier(1, 1, 0.16, 1.54);}
//#sampleHTML .fig > ul > li{width:100%; height:100%; float: left;}
//#sampleHTML .fig > ul > li > p {width: 100%; height: 100%; background-size: cover; background-position: center; background-repeat: no-repeat;}
//#sampleHTML .btn {width:100%; height: auto; padding-top: 15%; position: relative;}
//#sampleHTML .btn > ul {position: absolute; top:0; left: 0; width: 100%; height: 100%; border:2px solid #fff; box-sizing: border-box; border-radius: 0 0 20px 20px; overflow: hidden; background-color: #ddd;}
//#sampleHTML .btn > ul > li{background-size: cover; width: 100%; height: 100%; text-align: center; float: left; border-right:2px solid #fff; box-sizing: border-box;}
//#sampleHTML .btn > ul > li:last-child{border-right: none;}
//#sampleHTML .btn > ul > li > button{width: 100%; height: 100%; background-color: transparent; border: none; cursor: pointer;}
//#sampleHTML li.on{background-color: #666;}
//</style>
//<div id="sampleHTML">
//    <div class="bg">
//        <div class="fig">
//            <ul> <!-- ul width값 js로 control -->
//                <!-- js로 만들어진 li (width값도) -->
//                <li>test</li>
//            </ul>  
//        </div>
//    </div>
//    <div class="btn">
//      <ul>
//        <li><button type="button">test</button></li>
//        <!-- js로 만들어진 li(width값도) -->
//      </ul>
//    </div>
//</div>
//<script>
//(function(){
//  var clothes = [${_string}];
//  var clothes_l = clothes.length;
//  var sampleHTML = document.getElementById('sampleHTML');
//  var class_li;
//  function Mklist(item){
//    var classbox = sampleHTML.getElementsByClassName(item);
//    var class_ul = classbox[0].getElementsByTagName('ul')[0];
//    var _temp;
//    function mk_li(){
//      for(var i=0;i<clothes_l;i++){
//        var li_created = document.createElement('li');
//        li_created.innerHTML = _temp(i);
//        class_ul.append(li_created);
//      }
//      class_li = class_ul.getElementsByTagName('li');
//      Array.prototype.forEach.call(class_li, function (i,s) {
//        i.style.width = (100/(clothes_l+1))+"%";
//      });
//    }
//    if(item==='fig'){
//      class_ul.style.width = (100*(clothes_l+1))+'%';
//      _temp = function(i){
//        return '<p style="background-image:url(\\'' + clothes[i] + '\\')"></p>';
//      };
//      mk_li();
//    }else if(item==='btn'){
//      _temp = function(i){
//        return '<button type="button" style="background-image:url(\'' + clothes[i] + '\')"></button>';
//      };
//      mk_li();
//    }
//  }
//  Mklist('fig');
//  Mklist('btn');
//  Array.prototype.forEach.call(class_li, function(i,s){
//    i.addEventListener('mouseenter',function(e){
//      e.preventDefault();
//      var _ul = document.getElementsByClassName('fig')[0].getElementsByTagName('ul')[0];
//      _ul.style.marginLeft = -(100*s) + '%';
//      Array.prototype.forEach.call(class_li,function(i){
//        i.classList.remove('on');
//      });
//      i.classList.add('on');
//    });
//  })
//})();
//</script>
//`;
var sample_string = "<style>#sampleHTML ,#sampleHTML * {padding: 0; margin: 0;}#sampleHTML {width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; box-sizing: border-box; margin-top: 20px; box-shadow: 2px 2px 6px rgba(0,0,0,0.4);}#sampleHTML li{list-style: none;}#sampleHTML .bg{border: 2px solid #fff; border-bottom: none; box-sizing: border-box; overflow: hidden; background-image: url('" + img_list.bgBg + "'); background-size: cover; background-repeat: no-repeat; background-position: center;}#sampleHTML .fig{width: 100%; height: auto; padding-top: 120%; margin: 0 auto; background-size: cover; position: relative; background-position: center; background-repeat: no-repeat; background-image: url('" + img_list.bgFig + "');}#sampleHTML .fig > ul {position: absolute; top:0; left: 0; width: 100%; height: 100%; transition: margin-left 300ms cubic-bezier(1, 1, 0.16, 1.54);}#sampleHTML .fig > ul > li{width:100%; height:100%; float: left;}#sampleHTML .fig > ul > li > p {width: 100%; height: 100%; background-size: cover; background-position: center; background-repeat: no-repeat;}#sampleHTML .btn {width:100%; height: auto; padding-top: 15%; position: relative;}#sampleHTML .btn > ul {position: absolute; top:0; left: 0; width: 100%; height: 100%; border:2px solid #fff; box-sizing: border-box; overflow: hidden; background-color: #ddd;}#sampleHTML .btn > ul > li{background-size: cover; width: 100%; height: 100%; text-align: center; float: left; border-right:2px solid #fff; box-sizing: border-box;}#sampleHTML .btn > ul > li:last-child{border-right: none;}#sampleHTML .btn > ul > li > button{width: 100%; height: 100%; background-color: transparent; border: none; cursor: pointer; background-position: center; background-size: contain; background-repeat: no-repeat; opacity: 0.4; background-color: #fff; box-shadow: 1px 1px 4px rgba(0,0,0,0.4) inset;}#sampleHTML .btn > ul > li.on > button{opacity: 1; box-shadow: none;}</style><div id=\"sampleHTML\"><div class=\"bg\"><div class=\"fig\"><ul><li></li></ul></div></div><div class=\"btn\"><ul><li class=\"on\"><button type=\"button\">기본</button></li></ul>    </div></div><script>(function(){  var clothes = [" + _string + "];  var clothes_l = clothes.length;  var sampleHTML = document.getElementById('sampleHTML');  var class_li;  function Mklist(item){    var classbox = sampleHTML.getElementsByClassName(item);    var class_ul = classbox[0].getElementsByTagName('ul')[0];    var _temp;    function mk_li(){      for(var i=0;i<clothes_l;i++){        var li_created = document.createElement('li');        li_created.innerHTML = _temp(i);        class_ul.append(li_created);      }      class_li = class_ul.getElementsByTagName('li');      Array.prototype.forEach.call(class_li, function (i,s) {        i.style.width = (100/(clothes_l+1))+\"%\";      });    }    if(item==='fig'){      class_ul.style.width = (100*(clothes_l+1))+'%';      _temp = function(i){        return '<p style=\"background-image:url(\\\'' + clothes[i] + '\\\')\"></p>';      };      mk_li();    }else if(item==='btn'){      _temp = function(i){        return '<button type=\"button\" style=\"background-image:url(\\\'' + clothes[i] + '\\\')\"></button>';      };      mk_li();    }  }  Mklist('fig');  Mklist('btn');  Array.prototype.forEach.call(class_li, function(i,s){    i.addEventListener('mouseenter',function(e){      e.preventDefault();      var _ul = document.getElementsByClassName('fig')[0].getElementsByTagName('ul')[0];      _ul.style.marginLeft = -(100*s) + '%';      Array.prototype.forEach.call(class_li,function(i){        i.classList.remove('on');      });      i.classList.add('on');    });  })})();</script>";
    var x1 = $('#sampleMkCode');
    x1.text(sample_string);
    console.log(x1);
});



/*
var sample_string = "<style> #sampleHTML ,#sampleHTML * {padding: 0; margin: 0;} #sampleHTML {width: 100%; max-width: 600px; margin: 0 auto; border: 1px solid #000; border-radius: 20px; box-sizing: border-box; margin-top: 20px;} #sampleHTML li{list-style: none;} #sampleHTML .fig{width: 100%; height: auto; padding-top: 120%; background-color: #eee; margin: 0 auto; background-size: cover; position: relative; border: 2px solid #fff; border-bottom: none; border-radius: 20px 20px 0 0; box-sizing: border-box; overflow: hidden; background-position: center; background-repeat: no-repeat;} #sampleHTML .fig > ul {position: absolute; top:0; left: 0; width: 100%; height: 100%; transition: margin-left 300ms cubic-bezier(1, 1, 0.16, 1.54);} #sampleHTML .fig > ul > li{width:100%; height:100%; float: left;} #sampleHTML .fig > ul > li > p {width: 100%; height: 100%; background-size: cover; background-position: center; background-repeat: no-repeat;} #sampleHTML .btn {width:100%; height: auto; padding-top: 15%; position: relative;} #sampleHTML .btn > ul {position: absolute; top:0; left: 0; width: 100%; height: 100%; border:2px solid #fff; box-sizing: border-box; border-radius: 0 0 20px 20px; overflow: hidden; background-color: #ddd;} #sampleHTML .btn > ul > li{background-size: cover; width: 100%; height: 100%; text-align: center; float: left; border-right:2px solid #fff; box-sizing: border-box;} #sampleHTML .btn > ul > li:last-child{border-right: none;} #sampleHTML .btn > ul > li > button{width: 100%; height: 100%; background-color: transparent; border: none; cursor: pointer;} #sampleHTML li.on{background-color: #666;} </style> <div id=\"sampleHTML\">     <div class=\"fig\">       <ul> <!-- ul width값 js로 control -->         <!-- js로 만들어진 li (width값도) -->         <li>test</li>       </ul>       </div>     <div class=\"btn\">       <ul>         <li><button type=\"button\">test</button></li>         <!-- js로 만들어진 li(width값도) -->       </ul>     </div> </div> <script> (function(){   var clothes = ['//rentalfriend.co.kr/web/product/big/201905/ef0cb2e32c111e6346a60ffd22ac5ca9.jpg','//rentalfriend.co.kr/web/product/big/201905/ef0cb2e32c111e6346a60ffd22ac5ca9.jpg','//rentalfriend.co.kr/web/product/big/201905/ef0cb2e32c111e6346a60ffd22ac5ca9.jpg','//rentalfriend.co.kr/web/product/big/201905/ef0cb2e32c111e6346a60ffd22ac5ca9.jpg','//rentalfriend.co.kr/web/product/big/201905/ef0cb2e32c111e6346a60ffd22ac5ca9.jpg'];   var clothes_l = clothes.length;   var sampleHTML = document.getElementById('sampleHTML');   var class_li;   function Mklist(item){     var classbox = sampleHTML.getElementsByClassName(item);     var class_ul = classbox[0].getElementsByTagName('ul')[0];     var _temp;     function mk_li(){       for(var i=0;i<clothes_l;i++){         var li_created = document.createElement('li');         li_created.innerHTML = _temp(i);         class_ul.append(li_created);       }       class_li = class_ul.getElementsByTagName('li');       Array.prototype.forEach.call(class_li, function (i,s) {         i.style.width = (100/(clothes_l+1))+\"%\";       });     }     if(item==='fig'){       class_ul.style.width = (100*(clothes_l+1))+'%';       _temp = function(i){         return '<p style=\"background-image:url(\\'' + clothes[i] + '\\')\"></p>';       };       mk_li();     }else if(item==='btn'){       _temp = function(i){         return '<button type=\"button\">test</button>';       };       mk_li();     }   }   Mklist('fig');   Mklist('btn');   Array.prototype.forEach.call(class_li, function(i,s){     i.addEventListener('mouseenter',function(e){       e.preventDefault();       var _ul = document.getElementsByClassName('fig')[0].getElementsByTagName('ul')[0];       _ul.style.marginLeft = -(100*s) + '%';       Array.prototype.forEach.call(class_li,function(i){         i.classList.remove('on');       });       i.classList.add('on');     });   }) })(); </script> ";
*/


function copyCode(el) {
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

$('#codeCoppyBtn').on('click', copyCode.bind(this, '#sampleMkCode'));