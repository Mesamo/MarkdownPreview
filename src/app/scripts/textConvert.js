/**
 * Created by Mesamo on 2015/11/30.
 */
var fs = require('fs');

module.exports = {
    toMarkdown: function (filePath) {
        var text = fs.readFileSync(filePath, {encoding: 'utf8'}, function (err, data) {
            console.log(err);
        });
        return marked(text);
    }
};