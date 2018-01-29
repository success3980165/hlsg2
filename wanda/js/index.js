 $(function() {
        function getQuerystringArg(strs){
        var _strs = strs.length > 0 ? strs.substring(1) : '',
        args = {},
        items = _strs.split('&'),
        len = items.length,
        mame = null,
        value = null,
        item = [];
        if (_strs.length == 0) {
        console.log('没有要读取的字符串');
        return;
        }
        for (var i = 0; i < len; i++) {
        item = items[i].split("=");
        name = item[0];
        value = item[1];
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        args[name] = value;
        }
        return args;
        }
        var hash=window.location.search;
        var args = getQuerystringArg(hash);
        if ((navigator.userAgent.match(/(iphone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
            if(args === undefined){
            location.replace('http://sj.tmfy.hulai.com/yuyue.html')
            }else{
           location.replace('http://sj.tmfy.hulai.com/yuyue.html?qd='+args.qd)}
        // location.replace('index.html?qd='+args.qd)
        }
        })