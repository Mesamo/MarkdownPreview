/**
 * Created by Mesamo on 2015/11/30.
 */
(function () {
    var convert = require('scripts/textConvert.js');
    var process = require('remote').require('process');
    var fs = require('fs');
    var watchToken;

    function watchFileChange(path) {
        watchToken = fs.watch(path, function (event, filename) {
            if (event == 'change') {
                $('#content').html(convert.toMarkdown(path));
            }
        });
    }

    process.argv.forEach(function (val, index, array) {
        if (val.substring(0, 1) === '~') {
            console.log(index + ':' + val);
            var path = val.substring(1);
            $('#content').html(convert.toMarkdown(path));
            $('#path').val(path);
            watchFileChange(path);
        }
    });

    $("#marked").click(function () {
        if (watchToken != undefined && typeof watchToken.close === 'function') {
            watchToken.close();
        }
        var path = $('#path').val();
        fs.exists(path, function (exists) {
            console.log(exists);
            if (exists) {
                $('#content').html(convert.toMarkdown(path));
                watchFileChange(path);
            } else {
                //todo 文件不存在时做出提示
            }
        });
    });

    $('#quit').click(function () {
        require('remote').require('app').quit();
    });
})();