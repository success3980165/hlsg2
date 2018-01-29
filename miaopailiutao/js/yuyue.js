
// 预约弹窗
$(".lingqu").click(function() {
  $(".dialog").css("display", "block");
  $("#shadow").css("display", "block");
})
// 关闭预约
$(".close_dialog").click(function() {
  $(".dialog").css("display", "none");
  $("#shadow").css("display", "none");
})
// 复制
  // $(".btn1").click(function() {
  //   var p = $(".txt1");
  //   var selected = select(p[0]);
  //   console.log('首先选中的内容:' + selected);
  //   var succeeded = false;
  //   try {
  //     // copy cut
  //     succeeded = document.execCommand('copy');
  //   } catch (err) {
  //     succeeded = false;
  //     console.log('复制失败!');
  //   }
  //   if (succeeded) {
  //     console.log('复制成功!');
  //     alert("已成功复制至剪贴板");
  //   }
  // })
$(".btn1").click(function() {
    var Url2 = document.getElementById("txt");
  Url2.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  alert("已复制好，可贴粘。");
  })
