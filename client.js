/**
 * Created by Mesamo on 2015/9/9.
 */

(function(){
    var $ =require('./vendor/jquery/jquery');
    var application = require('./modules/application');
    var fm = require('./modules/fileManege.js');
    var process = require('remote').require('process');

    process.argv.forEach(function(val, index, array){
        if (val.substring(0,1) === '~'){
            console.log(index + ':' + val);
            var path = val.substring(1);
            $('#content')[0].innerHTML = fm.readFile(path);
            $('#path').val(path);
        }
    });

    $("#marked").click(function(){
        document.querySelector('#content').innerHTML = fm.readFile($('#path').val())
    });

    $('#quit').click(function(){
        application.quit();
    });
}).call(this);
