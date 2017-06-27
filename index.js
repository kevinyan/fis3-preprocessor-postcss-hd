var postcss = require( 'postcss' );
var demo = require('imageadaptor');
var autoprefixer = require('autoprefixer');

var plugins = [demo(),autoprefixer()];


module.exports = function (content, file, settings) {
    content = postcss(plugins).process(content).css;
    return content;
};
