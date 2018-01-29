function request(posturl, cal) {
  var url = "http://activity.api.hulai.com/api/wordpress/cache";
  var data = {};
  data.url = posturl;
  $.post(url, data, function(result) {
    cal(false, result);
  }, 'json');
}

function loadJineng(data) {
  $(".jineng_list").empty();
  for (var i = 0; i < data.length; i++) {
    $(".jineng_list").append('<div class="jineng_content"><div class="jn_con_left"><img src="' + data[i].技能icon[0] + '"><div id="name" class="fsize30">' + data[i].name + '</div></div><div id="jn_miaoshu" class="fsize24">' + data[i].描述[0] + '</div></div>')
  }
}

$(function() {
  var gonggong_show = [];
  var zhuanshu_show = [];
  var zhugong_show = [];
  for (var i = 0; i < jineng_posts.length; i++) {
    var data = jineng_posts[i];
    var isShow = data.custom_fields.首页[0];
    data.custom_fields.name = data.title;
    if (data.custom_fields.类型[0] == "公共") {
      gonggong_show.push(data.custom_fields);
    } else if (data.custom_fields.类型[0] == "专属") {
      zhuanshu_show.push(data.custom_fields);
    } else if (data.custom_fields.类型[0] == "主公") {
      zhugong_show.push(data.custom_fields);
    }
  }
  // 默认显示公共技能
  loadJineng(gonggong_show);
  // var jineng_url = "http://cms.hoolai.com/cms/?cat=438&json=get_category_posts&count=500";
  // var gonggong_show = [];
  // var zhuanshu_show = [];
  // var zhugong_show = [];
  // request(jineng_url, function(err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("技能");
  //     console.log(data);
  //     for (var i = 0; i < data.posts.length; i++) {
  //       data.posts[i].custom_fields.name = data.posts[i].title;
  //       if (data.posts[i].custom_fields.类型[0] == "公共") {
  //         gonggong_show.push(data.posts[i].custom_fields);
  //       } else if (data.posts[i].custom_fields.类型[0] == "专属") {
  //         zhuanshu_show.push(data.posts[i].custom_fields);
  //       } else if (data.posts[i].custom_fields.类型[0] == "主公") {
  //         zhugong_show.push(data.posts[i].custom_fields);
  //       }
  //     }
  //     console.log(gonggong_show);
  //     console.log(zhuanshu_show);
  //     console.log(zhugong_show);
  //
  //     // 默认显示公共技能
  //     loadJineng(gonggong_show);
  //   }
  // })

  $("#w_j_cate li").click(function() {
    var cur_index = $(this).index();
    for (var j = 0; j < 3; j++) {
      $("#w_j_cate li").eq(j).css("background-color", "rgb(142,105,77)");
    }
    $(this).css("background-color", "rgb(99,83,66)");
    if (cur_index == 0) {
      loadJineng(gonggong_show);
    } else if (cur_index == 1) {
      loadJineng(zhuanshu_show);
    } else if (cur_index == 2) {
      loadJineng(zhugong_show);
    }
  })

  $(".goHome").click(function() {
    window.history.back();
  })
})
