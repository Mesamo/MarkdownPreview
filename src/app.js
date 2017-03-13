require('./components/content');
require('./components/tabs');

const app = new Vue({
    el: '#app',
    data: {
        activeName: 'first',
        text: 'hello world !'
    }
});
