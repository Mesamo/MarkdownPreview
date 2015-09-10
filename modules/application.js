/**
 * Created by Mesamo on 2015/9/9.
 */
//var ipc = require('ipc'); //electron module
var remote = require('remote'); //electron module
var app = remote.require('app'); //electron module

module.exports = {
    quit:function(){
        //ipc.send('quit', 'true');
        app.quit();
    }
};