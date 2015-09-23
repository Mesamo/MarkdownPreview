/**
 * Created by Mesamo on 2015/9/9.
 */
var remote = require('remote');
var app = remote.require('app');

module.exports = {
    quit: function () {
        app.quit();
    }
};
