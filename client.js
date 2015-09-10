/**
 * Created by Mesamo on 2015/9/9.
 */
(function(){
    var $ =require('./vendor/jquery/jquery');
    var application = require('./modules/application');
    var fm = require('./modules/fileManege.js');
    var process = require('remote').require('process');
    var fs = require('fs');

    var Path = '';

    function watchFileChange(path){
        fs.watch(path, function(event, filename){
            if (event == 'change'){
                $('#content').html(fm.toMarkdown(Path));
            }
        });
    }

    process.argv.forEach(function(val, index, array){
        if (val.substring(0,1) === '~'){
            console.log(index + ':' + val);
            var path = val.substring(1);
            $('#content').html(fm.toMarkdown(Path));
            $('#path').val(path);
        }
    });

    $("#marked").click(function(){
        /*if (Path != ''){
            fs.unwatchFile(Path, function(curr, prev){
                var a = curr;
                var b = prev;
            })
        }*/
        Path = $('#path').val();
        fs.exists(Path, function(exists){
            console.log(exists);
            if (exists){
                $('#content').html(fm.toMarkdown(Path));
                watchFileChange(Path);
            }else{
                //todo 文件不存在时做出提示
            }
        });
    });

    $('#quit').click(function(){
        application.quit();
    });
}).call(this);
