/**
 * Created by Mesamo on 2015/9/9.
 */

var fs = require('fs'); //node.js module -- file system
var marked = require('marked');

module.exports = {
    toMarkdown: function(filePath){
        var text = fs.readFileSync(filePath, { encoding: 'utf8' }, function(err, data){

        });
        return marked(text);
    }
};