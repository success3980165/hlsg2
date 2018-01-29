function request(url_tag, call) {
  var url = "http://games.hoolai.com/cms/?v=hlsg2gw&json=get_category_posts&category_id=" + url_tag;
  requestDo(url, call);
}

function requestDo(posturl, cal) {
  var url = "http://activity.api.hulai.com/api/wordpress/cache";
  var data = {};
  data.url = posturl;
  $.post(url, data, function(result) {
    if (result.ret > 0) {
      cal(result);
    }
  }, 'json');
}
