(function ($) {
    var cardM = $('.card_input');
    var cardM_li = cardM.find('.list');
    var btnSubmit = $('#btnSubmit');
    var box_output = $('.box_output');
    var box_output_div = box_output.find('.sma');
    var button_clear = $('button[type="reset"]');
    cardM_li.on('input', function (e) {
        e.preventDefault();
        cardM_li.each(function (i) {
            var df = $(this).val();
            if (i < 2) {
                if (df.length > 30) {
                    box_output_div.eq(i).css({
                        'font-size': '12px',
                        'line-height': '1.2em'
                    });
                } else if (df.length > 14) {
                    box_output_div.eq(i).css({
                        'font-size': '14px',
                        'line-height': '1.2em'
                    });
                }
            }
            box_output_div.eq(i).text(df);
        });
    });
    function mkimg(){
        html2canvas(box_output, {
        useCORS: true,
        onrendered: function (canvas) {
            canvas.toBlob(function (blob) {
                saveAs(blob, $('#cardM_title').val() + '.png');
                });
            }
        });
    }
    btnSubmit.on('click', mkimg);
    button_clear.on('click',function(e){
        box_output_div.text('');
    });
})(this.jQuery);