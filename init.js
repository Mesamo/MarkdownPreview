/**
 * Created by Mesamo on 2015/9/9.
 */
(function(){
    var $ =require('jquery');
    var application = require('./lib/application');
    var fm = require('./lib/fileManege.js');
    var process = require('remote').require('process');
    var fs = require('fs');

    var watchToken;

    function watchFileChange(path){
        watchToken = fs.watch(path, function(event, filename){
            if (event == 'change'){
                $('#content').html(fm.toMarkdown(path));
            }
        });
    }

    process.argv.forEach(function(val, index, array){
        if (val.substring(0,1) === '~'){
            console.log(index + ':' + val);
            var path = val.substring(1);
            $('#content').html(fm.toMarkdown(path));
            $('#path').val(path);
            watchFileChange(path);
        }
    });

    $("#marked").click(function(){
        if (watchToken != undefined && typeof watchToken.close === 'function'){
            watchToken.close();
        }
        var path = $('#path').val();
        fs.exists(path, function(exists){
            console.log(exists);
            if (exists){
                $('#content').html(fm.toMarkdown(path));
                watchFileChange(path);
            }else{
                //todo 文件不存在时做出提示
            }
        });
    });

    $('#quit').click(function(){
        application.quit();
    });
}).call(this);
