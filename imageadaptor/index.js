// http://api.postcss.org/

var postcss = require('postcss');

module.exports = postcss.plugin('imageadaptor', function fontstack(options) {
    return function(css) {
        options = options || {};

        var prop = '';
        var value = '';
        var selector = '';

        // css.walkRules方法用来遍历每一条css规则
        css.walkRules(function(rule) {


            // walkDecls方法用来解析属性跟值
            rule.walkDecls(/^background/, function(decl, i) {
                prop = decl.prop;
                value = decl.value;
                selector = decl.parent.selector;

            });

        });




        var mediaQ = ['1', '2', '3'];
        var suport = ['.png', '.jpg']
        var Content = '';
        mediaQ.forEach(function(ele, idx) {

            // 重命名
            var newValue = '';
            // url(../big/a.png) no-repeate 
            suport.forEach(function(ele2, idx2) {
                if (value.indexOf(ele2) > 0) {
                    newValue = value;
                    newValue = newValue.split(ele2);
                    newValue[0] += '_' + ele + 'x';
                    newValue = newValue.join(ele2);
                }
            })



            var mainContent = selector + '{' + prop + ':' + newValue + '}';


            // 拼字符串
            var temp = [
                '@media only screen and (-webkit-min-device-pixel-ratio:',
                ele,
                '){',
                prop,
                ':',
                newValue,
                '}'
            ]


            Content += temp.join('');

        })

        css.append(Content);

    }
});
