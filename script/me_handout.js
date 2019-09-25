var cardExcel;

function excelExport(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {
            type: 'binary'
        });
        wb.SheetNames.forEach(function (sheetName) {
            var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
            cardExcel = null;
            cardExcel = rowObj;
            readExcel();
        })
    };
    reader.readAsBinaryString(input.files[0]);
}

function readExcel() {
    arr = [];
    var cardUL = $('.cardUL');
    cardUL[0].innerHTML = '';
    var cardTem = '';
    for (var i = 0; i < cardExcel.length; i++) {
        cardTem += '<li class="card_madness box_output"><div class="top">Handout</div><dl class="card_info"><dt class="spansma"><span class="card_tit">광기</span><span class="sma sma_0">' + cardExcel[i]["광기명"] + '</span></dt><dd><div class="spansma"><span class="card_tit">트리거</span><span class="sma sma_1">' + cardExcel[i]["트리거"] + '</span></div><div><pre class="sma">' + cardExcel[i]["광기내용"] + '</pre></div></dd></dl><div class="bottom">이 광기를<br>스스로 밝힐 수는 없다.</div></li>';
    }
    //console.log(cardTem);
    cardUL.append(cardTem);
    mkDataURL();
}

function convert(ori) {
    var dataURL;
    html2canvas($(ori), {
        useCORS: true,
        onrendered: function (canvas) {
            dataURL = canvas.toDataURL("image/png");
//            $('img')[0].src = canvas.toDataURL("image/png");
            //                    console.log(dataURL);
            arr.push(dataURL.replace('data:image/png;base64,', ''));
            //                    console.log(arr);
        }
    });
}

function mkDataURL() {
    arr = [];
    for (var i = 0; i < cardExcel.length; i++) {
        convert($('.cardUL').children('li').eq(i));
    }
    //console.log(arr);
}

function create_zip1() {
    var zip = new JSZip();
    //console.log(arr[i]);
    for (var i = 0; i < cardExcel.length; i++) {
        zip.file("광기카드_" + i+1 + ".png", arr[i], {
            base64: true
        });
        console.log(arr);
    }
    zip.generateAsync({
        type: "blob"
    })
        .then(function (content) {
            // see FileSaver.js
            saveAs(content, "광기카드샘플.zip");
        });
}
function create_zip() {
    //console.log(arr);
    create_zip1();
}

function mkimg() {
    html2canvas($('.cardUL>li:first-child'), {
        useCORS: true,
        onrendered: function (canvas) {
            canvas.toBlob(function (blob) {
                saveAs(blob, 'test.png');
            });
        }
    });
}