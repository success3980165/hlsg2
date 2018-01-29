function loadWujiang(data) {
  $("#list_content").empty();
  for (var i = 0; i < data.length; i++) {
    $("#list_content").append('<div class="list_item"><div class="first_item"><img id="touxiang" src="' + data[i].武将icon[0] + '"><span class="shuxingliebiao"><span>武将类型：<span id="wujiangleixing">' + data[i].武将类型[0] + '</span></span><span>初始品质：<span id="chushipinzhi">' + data[i].初始品质[0] + '</span></span><span>可晋升：<span id="kejinsheng">' + data[i].可晋升[0] + '</span></span><span>获取途径：<span id="huoqutujing">' + data[i].获取途径[0] + '</span></span></span></div><div class="second_item"><span id="xingming">' + data[i].name + '</span><img src="img/line.png" style="margin-top: 5px;width: 100%;overflow: hidden;"></div><div id="miaoshu">' + data[i].描述[0] + '</div></div>')
  }
}

$(function() {
  // var wujiang_url = "http://cms.hoolai.com/cms/?cat=437&json=get_category_posts&count=500";
  // var gongji_show = [];
  // var fangyu_show = [];
  // var fuzhu_show = [];
  // request(wujiang_url, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("武将");
  //     console.log(data);
  //     for (var i = 0; i < data.posts.length; i++) {
  //       data.posts[i].custom_fields.name = data.posts[i].title;
  //       if (data.posts[i].custom_fields.武将类型[0] == "攻击") {
  //         gongji_show.push(data.posts[i].custom_fields);
  //       } else if (data.posts[i].custom_fields.武将类型[0] == "防御") {
  //         fangyu_show.push(data.posts[i].custom_fields);
  //       } else if (data.posts[i].custom_fields.武将类型[0] == "辅助") {
  //         fuzhu_show.push(data.posts[i].custom_fields);
  //       }
  //     }
  //     console.log(gongji_show);
  //     console.log(fangyu_show);
  //     console.log(fuzhu_show);
  //
  //     // 默认显示攻击
  //     loadWujiang(gongji_show);
  //   }
  // })

  var gongji_show = [];
  var fangyu_show = [];
  var fuzhu_show = [];

  function loadWujianAll() {
    for (var i = 0; i < wujian_all.posts.length; i++) {
      var wujian = wujian_all.posts[i];
      wujian.custom_fields.name = wujian.title;
      if (wujian.custom_fields.武将类型[0] == "攻击") {
        gongji_show.push(wujian.custom_fields);
      } else if (wujian.custom_fields.武将类型[0] == "防御") {
        fangyu_show.push(wujian.custom_fields);
      } else if (wujian.custom_fields.武将类型[0] == "辅助") {
        fuzhu_show.push(wujian.custom_fields);
      }
    }
    // 默认显示攻击
    loadWujiang(gongji_show);
  }

  loadWujianAll();

  $(".wj_jn_category li").click(function() {
    var cur_index = $(this).index();
    for (var j = 0; j < 3; j++) {
      $(".wj_jn_category li").eq(j).removeClass("wj_jn_active");
    }
    $(this).addClass("wj_jn_active");
    if (cur_index == 0) {
      loadWujiang(gongji_show);
    } else if (cur_index == 1) {
      loadWujiang(fangyu_show);
    } else if (cur_index == 2) {
      loadWujiang(fuzhu_show);
    }
  })
})
