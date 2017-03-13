const selectedTab = require('./selectedTab');
const fs = require('fs');
const marked = require('marked');

Vue.component('v-content', {
    template: '<div v-html="text"></div>',
    data: function () {
        return {
            text: ''
        }
    },
    created: function () {
        const vm = this;
        selectedTab.$on('on-selected', function (name) {
            fs.stat(name, function(err, stat) {
                if (stat && stat.isFile()) {
                    let tmp = fs.readFileSync(name, {encoding: 'utf8'});
                    vm.text = marked(tmp);
                } else {
                    vm.text = err.message;
                }
            })
        })
    }
});
