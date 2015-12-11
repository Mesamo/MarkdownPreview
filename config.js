/**
 * Created by Mesamo on 2015/11/30.
 */
module.exports = {
    build_dir: {
        base: 'build',
        vendor: 'build/vendor',
        script: 'build/scripts',
        css: 'build/css',
        assets: 'build/assets'
    },

    dist_dir: {
        base: 'dist'
    },

    vendor: {
        jquery: ['./node_modules/jquery/dist/jquery.min.js'],
        marked: ['./node_modules/marked/lib/marked.js'],
        bootstrap: [
            './node_modules/bootstrap/dist/**/bootstrap.min.css',
            './node_modules/bootstrap/dist/**/fonts/*.*',
            './node_modules/bootstrap/dist/**/bootstrap.min.js'
        ]
    }
};