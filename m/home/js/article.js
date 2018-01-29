function request(posturl, cal) {
  var url = "http://activity.api.hulai.com/api/wordpress/cache";
  var data = {};
  data.url = posturl;
  $.post(url, data, function(result) {
    cal(result);
  }, 'json');
}
$(function() {
  var article_id = window.location.hash.substr(1);
  console.log(article_id);

  var url = 'http://games.hoolai.com/cms/?v=hlsg2gw&post_id=' + article_id + '&json=get_post&include=title,content,author,date,categories';
  request(url, function(result) {
    console.log(result.post);
    var data = result.post;
    // 标题
    $(".tittle-cate").html(data.title)
    // 时间
    $("#article_time").html(data.date);
    // 内容
    var arcContent = $("#article_content").html(data.content);
    var list = arcContent.find('img');
    for (var i = 0; i < list.length; i++) {
      list.eq(i).wrap("<div></div>");
    }
  })

  $(".goHome").click(function() {
    window.history.back();
  })
})
