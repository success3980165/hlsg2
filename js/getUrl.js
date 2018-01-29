 $(function() {
     //过滤 ?channel=1
     function getArgs(strs) {
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
     var oneurl = window.location.search;
     // http://ml.sango2.hulai.com/9Dw0W2SV0S9ggNS3NI/index.html?channel=1
     // var oneurl = "?channel=1";
     var panduan = '';
     var download = '';
     var argParm = getArgs(oneurl);
     var Channell;
     if (argParm) {
         Channell = argParm.channel;
     }
     var str;
     var useragent = window.navigator.userAgent.toLowerCase();
     // 封装获取数据
     function ajaxDataJson(urlJson) {
         return $.getJSON(urlJson, function(data) {
             // console.log(data)
         })
     }
     // 拿到需要参数
     ajaxDataJson('./data.json').done(function(data) {
         var channelName = '';
         for (var i = 0; i < data.testJson.length; i++) {
             panduan = data.testJson[i];
             // console.log(panduan)
             if (panduan.channel == Channell) {

                 download = panduan.downLoadUrl;
                 if (panduan.image != undefined) {
                     img = panduan.image;
                     changeImg(img);
                 }

                 fot1 = panduan.fot1;
                 fot2 = panduan.fot2;
                 fot3 = panduan.fot3;
                 // changeImg(img);
                 changFoot(fot1, fot2, fot3);
                 // if (download === 'http://uri6.com/') {
                 //     str = download.substring(16);
                 //     console.log(str);
                 // }
             }
         }
         // str = data.downLoadurl.substring(28,37);;
     })

     function changFoot(f1, f2, f3) {
         $('footer').find('p.1').html(f1);
         $('footer').find('p.address').text(f2);
         $('footer').find('p.3').html(f3);
     }

 });