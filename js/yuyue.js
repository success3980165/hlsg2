$(function() {
  $("#shou_zhan").click(function() {
    var right_val = $(".fixed_dialog").css("right");
    console.log(right_val);
    if (right_val == '0px') {
      console.log("应收起");
      $(".fixed_dialog").animate({
        right: '-186px'
      })
      $("#shou_zhan").attr("src", "./img2/zhankai.jpg");
    } else if (right_val == '-186px') {
      console.log("应展开");
      $(".fixed_dialog").animate({
        right: '0px'
      })
      $("#shou_zhan").attr("src", "./img2/shouqi.jpg");
    }
  })
})

function copyUrl2() {
  var Url2 = document.getElementById("txt");
  Url2.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  alert("已复制好，可贴粘。");
}