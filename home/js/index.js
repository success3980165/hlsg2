var sg2ActivityAPI = new hoolaiActivityAPI(4, true);

function getTotal() {
  sg2ActivityAPI.getTotal(function(result) {
    if (result.ret != 1) {
      // alert(result.msg);
      dialog(result.msg);
    } else {
      $("#total").text(result.total);
    }
  })
}

// 武将人物列表
// function loadWujiang(data) {
//   $("#wujiang_right").empty();
//   // for (var j = 0; j < data.length; j++) {
//   //   $("#wujiang_right").append('<li><img style="width:79px;padding-top: 5px;" src="' + data[j].武将icon[0] + '"><span>' + data[j].name + '</span></li>');
//   // }
// }
// 武将具体信息
// function loadWJInformation(data) {
//   $("#touxiang").attr("src", data.武将icon[0]);
//   $("#xingming").html(data.name);
//   $("#wujiangleixing").html(data.武将类型[0]);
//   $("#chushipinzhi").html(data.初始品质[0]);
//   $("#kejinsheng").html(data.可晋升[0]);
//   $("#huoqutujing").html(data.获取途径[0]);
//   $("#miaoshu").html(data.描述[0]);
// }
// 技能列表
// function loadJineng(data) {
//   $("#jineng_left").empty();
//   // for (var j = 0; j < data.length; j++) {
//   //   $("#jineng_left").append('<li><span style="position: relative;top: -30px;">' + data[j].name + '</span><img style="width:88px" src="' + data[j].技能icon[0] + '"></li>');
//   // }
// }
// 技能具体信息
// function loadJNInformation(data) {
//   $("#jinengicon").attr("src", data.技能icon[0]);
//   $("#jinengname").html(data.name);
//   $("#jinengmiaoshu").html(data.描述[0]);
// }
// 视频播放
function playVideo(str) {
  console.log(str);
  $("#video").attr("src", str);

  $(".video_player").css("display", "block");
  $("#cover").css("display", "block");
  var myVideo = document.getElementById("video");
  myVideo.play();
}
$(function() {
  // 获取预约人数
  getTotal();
  // 视频播放
  // $(".video_play").click(function() {
  //   $(".video_player").css("display", "block");
  //   $("#cover").css("display", "block");
  // });
  // 视频关闭
  $(".video_close").click(function() {
    var myVideo = document.getElementById("video");
    myVideo.pause();
    $(".video_player").css("display", "none");
    $("#cover").css("display", "none");
  })

  // 获取分类信息
  // var i = 0;
  // var zuixin_data = [];
  // var xinwen_data = [];
  // var gonggao_data = [];
  // var gonglue_data = [];
  // var show_data = [];
  // request("431", function(result) {
  //   xinwen_data = result;
  // })
  // request("439", function(result) {
  //   zuixin_data = result;
  //   console.log(zuixin_data.posts)
  //
  //   // 默认加载最新
  //   // for (i = 0; i < 5 && i < zuixin_data.posts.length; i++) {
  //   //
  //   //   var data = zuixin_data.posts[i];
  //   //   $(".list").append('<li><a target="_blank" href="article.html#' + data.id + '"><span class="w400">[最新]' +
  //   //     data.title + '</span><span class="fr_dis">' + data.date.substr(0, 10) + '</span></a></li>')
  //   // }
  // })
  // request("435", function(result) {
  //   gonggao_data = result;
  // })
  // request("434", function(result) {
  //   gonglue_data = result;
  // })
  // 类别标题点击事件
  $(".infor_ul li").click(function() {
    for (var a = 0; a < 4; a++) {
      $(".infor_ul li").eq(a).removeClass("infor_act");
    }
    $(this).addClass("infor_act");
    // 清除原有内容
    // $(".list").empty();
    // var cat_string = '';
    // var cat_tag = '';
    //
    // var curr_index = $(this).index();
    // if (curr_index == 0) {
    //   show_data = zuixin_data;
    //   cat_string = '最新';
    //   cat_tag = 'list.html#439';
    // } else if (curr_index == 1) {
    //   show_data = xinwen_data;
    //   cat_string = '新闻';
    //   cat_tag = 'list.html#431';
    // } else if (curr_index == 2) {
    //   show_data = gonggao_data;
    //   cat_string = '公告';
    //   cat_tag = 'list.html#435';
    // } else if (curr_index == 3) {
    //   show_data = gonglue_data;
    //   cat_string = '攻略';
    //   cat_tag = 'list.html#434';
    // }
    // for (i = 0; i < 5 && i < show_data.posts.length; i++) {
    //   $(".list").append('<li><a target="_blank" href="article.html#' + show_data.posts[i].id + '"><span class="w400">[' + cat_string + ']' + show_data.posts[i].title + '</span><span class="fr_dis">' + show_data.posts[i].date.substr(0, 10) + '</span></a></li>')
    // }
    // $("#jumpToS").attr("href", cat_tag);
  })

  // var gongji_show = [];
  // var fangyu_show = [];
  // var fuzhu_show = [];
  //
  // function loadWujianAll() {
  //   for (var i = 0; i < wujian_all.posts.length; i++) {
  //     var wujian = wujian_all.posts[i];
  //     var isShow = wujian.custom_fields.首页[0];
  //     if (isShow == "是") { //首页展示
  //       wujian.custom_fields.name = wujian.title;
  //       if (wujian.custom_fields.武将类型[0] == "攻击" && gongji_show.length < 5) {
  //         gongji_show.push(wujian.custom_fields);
  //       } else if (wujian.custom_fields.武将类型[0] == "防御" && fangyu_show.length < 5) {
  //         fangyu_show.push(wujian.custom_fields);
  //       } else if (wujian.custom_fields.武将类型[0] == "辅助" && fuzhu_show.length < 5) {
  //         fuzhu_show.push(wujian.custom_fields);
  //       }
  //     }
  //   }
  // }
  // loadWujianAll();
  // // 默认显示攻击
  // loadWujiang(gongji_show);
  // // 默认显示攻击第一个武将信息
  // loadWJInformation(gongji_show[0]);

  // var gonggong_show = [];
  // var zhuanshu_show = [];
  // var zhugong_show = [];
  // for (var i = 0; i < jineng_posts.length; i++) {
  //   var data = jineng_posts[i];
  //   var isShow = data.custom_fields.首页[0];
  //   if (isShow == "是") { //首页展示
  //     data.custom_fields.name = data.title;
  //     if (data.custom_fields.类型[0] == "公共" && gonggong_show.length < 5) {
  //       gonggong_show.push(data.custom_fields);
  //     } else if (data.custom_fields.类型[0] == "专属" && zhuanshu_show.length < 5) {
  //       zhuanshu_show.push(data.custom_fields);
  //     } else if (data.custom_fields.类型[0] == "主公" && zhugong_show.length < 5) {
  //       zhugong_show.push(data.custom_fields);
  //     }
  //   }
  // }
  // // 默认显示公共技能
  // loadJineng(gonggong_show);
  // // 默认显示公共技能第一个技能
  // loadJNInformation(gonggong_show[0]);

  // 左侧武将数据交互处理
  // var default_index = 0;
  // // 阵营点击事件
  // $("#wujiang_left li").click(function() {
  //   $("#wujiang_left li").eq(default_index).css("background-image", "url(./img/pic_bg.png)");
  //   default_index = $(this).index();
  //   if (default_index == 0) {
  //     loadWujiang(gongji_show);
  //   } else if (default_index == 1) {
  //     loadWujiang(fangyu_show);
  //   } else if (default_index == 2) {
  //     loadWujiang(fuzhu_show);
  //   }
  //
  // });
  // 阵营列表、鼠标移入移出
  // $("#wujiang_left li").mouseenter(function() {
  //   $(this).css("background-image", "url(./img/pic_active_bg.png)");
  // });
  // $("#wujiang_left li").mouseleave(function() {
  //   if ($(this).index() != default_index) {
  //     $(this).css("background-image", "url(./img/pic_bg.png)");
  //   }
  // });
  // 武将点击事件
  // $("#wujiang_right").on("click", "li", function() {
  //   var rw_index = $(this).index();
  //   if (default_index == 0) { //攻击
  //     console.log(gongji_show[rw_index]);
  //     loadWJInformation(gongji_show[rw_index]);
  //   } else if (default_index == 1) { //防御
  //     console.log(fangyu_show[rw_index]);
  //     loadWJInformation(fangyu_show[rw_index]);
  //   } else if (default_index == 2) { //辅助
  //     console.log(fuzhu_show[rw_index]);
  //     loadWJInformation(fuzhu_show[rw_index]);
  //   }
  // })
  // 右侧技能数据交互处理
  // var right_default_index = 0;
  // // 技能点击事件
  // $("#jineng_right li").click(function() {
  //   $("#jineng_right li").eq(right_default_index).css("background-image", "url(./img/pic_bg.png)");
  //   right_default_index = $(this).index();
  //   if (right_default_index == 0) {
  //     loadJineng(gonggong_show);
  //   } else if (right_default_index == 1) {
  //     loadJineng(zhuanshu_show);
  //   } else if (right_default_index == 2) {
  //     loadJineng(zhugong_show);
  //   }
  // });
  // 技能列表、鼠标移入移出
  // $("#jineng_right li").mouseenter(function() {
  //   $(this).css("background-image", "url(./img/pic_active_bg.png)");
  // });
  // $("#jineng_right li").mouseleave(function() {
  //   if ($(this).index() != right_default_index) {
  //     $(this).css("background-image", "url(./img/pic_bg.png)");
  //   }
  // });
  // 技能点击事件
  // $("#jineng_left").on("click", "li", function() {
  //   var jn_index = $(this).index();
  //   if (right_default_index == 0) { //公共
  //     console.log(gonggong_show[jn_index]);
  //     loadJNInformation(gonggong_show[jn_index]);
  //   } else if (right_default_index == 1) { //专属
  //     console.log(zhuanshu_show[jn_index]);
  //     loadJNInformation(zhuanshu_show[jn_index]);
  //   } else if (right_default_index == 2) { //主公
  //     console.log(zhugong_show[jn_index]);
  //     loadJNInformation(zhugong_show[jn_index]);
  //   }
  // })

  $("#shou_zhan").click(function() {
    var right_val = $(".fixed_dialog").css("right");
    console.log(right_val);
    if (right_val == '0px') {
      console.log("应收起");
      $(".fixed_dialog").animate({
        right: '-186px'
      })
      $("#shou_zhan").attr("src", "./img/zhankai.jpg");
    } else if (right_val == '-186px') {
      console.log("应展开");
      $(".fixed_dialog").animate({
        right: '0px'
      })
      $("#shou_zhan").attr("src", "./img/shouqi.jpg");
    }
  })
})
