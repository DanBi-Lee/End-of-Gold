var cardExcel;
var previewCard = $('.previewCardUL');

function setTextScale(){
    $('.sma').fitText(1, {
        minFontSize: '10px',
        maxFontSize: '14px'
    });
}

function excelExport(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function() {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {
            type: 'binary'
        });
        wb.SheetNames.forEach(function(sheetName) {
            var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            cardExcel = null;
            cardExcel = rowObj;
            readExcel();
        })
    };
    reader.readAsBinaryString(input.files[0]);
    setTextScale();
}

function readExcel() {
    arr = [];
    var cardUL = $('.cardUL');
    cardUL[0].innerHTML = '';
    previewCard[0].innerHTML = '';
    // var cardTem = '';
    for (var i = 0; i < cardExcel.length; i++) {
        var cardTem = '<li><div class="card_madness box_output"><div class="top">Handout</div><dl class="card_info"><dt class="spansma"><span class="card_tit">광기</span><span class="sma sma_0">' + cardExcel[i]["광기명"] + ' 　</span></dt><dd><div class="spansma"><span class="card_tit">트리거</span><span class="sma sma_1">' + cardExcel[i]["트리거"] + ' 　</span></div><div><pre class="sma">' + cardExcel[i]["광기내용"] + '　</pre></div></dd></dl><div class="bottom">이 광기를<br>스스로 밝힐 수는 없다.</div></div></li>';

        cardUL.append(cardTem);

        if(cardExcel[i]["광기명"].length > 30){
            // console.log(i, $('.sma_0'));
            $('.sma_0').eq(i).css({
                'font-size': '12px',
                'line-height': '1.2em'
            });
        }else if(cardExcel[i]["광기명"].length > 14){
            $('.sma_0').eq(i).css({
                'font-size': '14px',
                'line-height': '1.2em'
            });
        }

        if(cardExcel[i]["트리거"].length > 30){
            // console.log(i, $('.sma_1'));
            $('.sma_1').eq(i).css({
                'font-size': '12px',
                 'line-height': '1.2em'
            });
        }else if(cardExcel[i]["트리거"].length > 14){
            $('.sma_1').eq(i).css({
                'font-size': '14px',
                'line-height': '1.2em'
            });
        }
    }

    mkDataURL();
}

function convert(ori) {
    var dataURL;
    html2canvas($(ori), {
        useCORS: true,
        onrendered: function(canvas) {
            dataURL = canvas.toDataURL("image/png");
            previewCard.append('<li><img src=' + canvas.toDataURL("image/png") +'></li>');
            arr.push(dataURL.replace('data:image/png;base64,',''));
        }
    });
}

// function render(node) {
//     return domtoimage.toPng(node).then(function (dataUrl) {
//             previewCard.append('<li><img src=' + dataUrl +'><button>다운로드</button><button>삭제</button></li>');
//             console.log(dataUrl);
//             arr.push(dataUrl.replace('data:image/png;base64,',''));
//     }).catch(function (error) {
//       return console.error(error);
//     });
// };

var card = document.querySelector('.btn_down');
performance.now();
// render(card);
// 
function mkDataURL() {
    arr = [];
    for (var i = 0; i < cardExcel.length; i++) {
        // console.log($('.cardUL').children('li').eq(i)[0]);
        // render($('.cardUL').children('li').eq(i)[0]);
        convert($('.cardUL').children('li').eq(i));
    }
    // console.log(arr);
}

function create_zip() {
    var zip = new JSZip();
    // console.log(arr[i]);
    for (var i = 0; i < cardExcel.length; i++) {
        zip.file(cardExcel[i]["광기명"] +"_m.png", arr[i], {
            base64: true
        });
        // console.log(arr);
    }
    zip.generateAsync({
            type: "blob"
        })
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
}

function mkimg(){
html2canvas($('.cardUL>li:first-child'), {
useCORS: true,
onrendered: function (canvas) {
    canvas.toBlob(function (blob) {
        saveAs(blob, 'test.png');
        });
    }
});
}