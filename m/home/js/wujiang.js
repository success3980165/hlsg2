function request(posturl, cal) {
  var url = "http://activity.api.hulai.com/api/wordpress/cache";
  var data = {};
  data.url = posturl;
  $.post(url, data, function(result) {
    cal(false, result);
  }, 'json');
}

function loadWujiang(data) {
  $(".wujiang_list").empty();
  for (var i = 0; i < data.length; i++) {
    $(".wujiang_list").append('<div class="wujiang_content"><div class="disf flex-col fsize22"><div class="disf flex-row"><img src="' + data[i].武将icon[0] + '"><div id="wujiangname" class="fsize30">' + data[i].name + '</div></div><div>武将类型：<span id="wujiangleixing">' + data[i].武将类型[0] + '</span></div><div>初始品质：<span id="chushipinzhi">' + data[i].初始品质[0] + '</span></div><div>可晋升：<span id="kejinsheng">' + data[i].可晋升[0] + '</span></div><div>获取途径：<span id="huoqutujing">' + data[i].获取途径[0] + '</span></div></div><div id="wj_miaoshu" class="fsize18">' + data[i].描述[0] + '</div></div>');
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
    // 默认显示攻击第一个武将信息
    // loadWJInformation(gongji_show[0]);
  }

  loadWujianAll();

  $("#w_j_cate li").click(function() {
    var cur_index = $(this).index();
    for (var j = 0; j < 3; j++) {
      $("#w_j_cate li").eq(j).css("background-color", "rgb(142,105,77)");
    }
    $(this).css("background-color", "rgb(99,83,66)");
    if (cur_index == 0) {
      loadWujiang(gongji_show);
    } else if (cur_index == 1) {
      loadWujiang(fangyu_show);
    } else if (cur_index == 2) {
      loadWujiang(fuzhu_show);
    }
  })

  $(".goHome").click(function() {
    window.history.back();
  })
})
