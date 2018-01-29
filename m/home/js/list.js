function getCorrectData(tag, bigstr, littlestr, data) {
  // 清空列表内容
  $(".content_list").empty();
  var url = "http://cms.hoolai.com/cms/?cat=" + tag + "&json=get_category_posts&include=title,categories,date&count=500";
  $(".tittle-cate").html(bigstr);
  var str = littlestr;
  if (data.length == 0) {
    request(url, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        for (i = 0; i < data.posts.length; i++) {
          $(".content_list").append('<li><a href="article.html#' + data.posts[i].id + '"><span class="w410">[' + str + ']' + data.posts[i].title + '</span><span class="fr">' + data.posts[i].date.substr(0, 10) + '</span></a></li>')
        }
      }
    })
  } else {
    for (i = 0; i < data.posts.length; i++) {
      $(".content_list").append('<li><a href="article.html#' + data.posts[i].id + '"><span class="w410">[' + str + ']' + data.posts[i].title + '</span><span class="fr">' + data.posts[i].date.substr(0, 10) + '</span></a></li>')
    }
  }
}

$(function() {
  var tag = window.location.hash.substr(1);
  // if (tag == 431) { //新闻中心
  //   getCorrectData("431", "新闻中心", "新闻", xinwen_data);
  //   $("#cate li:eq(1)").css("color", "#653c20");
  // } else if (tag == 434) { //玩法攻略
  //   getCorrectData("434", "玩法攻略", "攻略", gonglue_data);
  //   $("#cate li:eq(3)").css("color", "#653c20");
  // } else if (tag == 439) { //最新
  //   $("#cate li:eq(0)").css("color", "#653c20");
  //   getCorrectData("439", "最新", "最新", zuixin_data);
  // } else if (tag == 435) { //公告
  //   $("#cate li:eq(2)").css("color", "#653c20");
  //   getCorrectData("435", "公告", "公告", gonggao_data);
  // }
  // 获取分类信息
  var zuixin_data = [];
  var xinwen_data = [];
  var gonggao_data = [];
  var gonglue_data = [];
  var show_data = [];
  request("431", function(result) {
    xinwen_data = result;
    if (tag == 431) {
      getCorrectData("431", "新闻中心", "新闻", xinwen_data);
      $("#cate li:eq(1)").css("color", "#653c20");
    }
  })
  request("439", function(result) {
    zuixin_data = result;
    if (tag == 439) {
      $("#cate li:eq(0)").css("color", "#653c20");
      getCorrectData("439", "最新", "最新", zuixin_data);
    }
  })
  request("435", function(result) {
    gonggao_data = result;
    if (tag == 435) {
      $("#cate li:eq(2)").css("color", "#653c20");
      getCorrectData("435", "公告", "公告", gonggao_data);
    }
  })
  request("434", function(result) {
    gonglue_data = result;
    if (tag == 434) {
      getCorrectData("434", "玩法攻略", "攻略", gonglue_data);
      $("#cate li:eq(3)").css("color", "#653c20");
    }
  })

  $("#cate li").click(function() {
    for (var i = 0; i < 5; i++) {
      $("#cate li").eq(i).css("color", "#98988f");
    }
    var curr_index = $(this).index();
    if (curr_index == 0) { //最新
      getCorrectData("439", "最新", "最新", zuixin_data);
    } else if (curr_index == 1) { //新闻
      getCorrectData("431", "新闻中心", "新闻", xinwen_data);
    } else if (curr_index == 2) { //公告
      getCorrectData("435", "公告", "公告", gonggao_data);
    } else if (curr_index == 3) { //攻略
      getCorrectData("434", "玩法攻略", "攻略", gonglue_data);
    }
    $("#cate li").eq(curr_index).css("color", "#653c20");
  })

  $(".goHome").click(function() {
    window.history.back();
  })

})
