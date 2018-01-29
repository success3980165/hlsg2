var sg2ActivityAPI = new hoolaiActivityAPI(16, true);

// 检测是ios、android
if (isMobile.apple.device) {
  console.log("apple" + isMobile.apple.device)
  $("input[name='radio-name']:eq(0)").attr("checked", "checked");;
  // $("input[name='radio-name']:eq(1)").removeAttr("checked");
}
if (isMobile.android.device) {
  console.log("android" + isMobile.android.device)
  $("input[name='radio-name']:eq(1)").attr("checked", "checked");;
  // $("input[name='radio-name']:eq(0)").removeAttr("checked");
}

//获取url中的参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

var channelId = getUrlParam('channel');
var channelData = {};
channelData.channelName = '';

function loadData() {
  if (channelId) {
    $.getJSON('../channel.json', function(list) {
      list.forEach(function(item) {
        if ((item.channelId + "") === channelId) {
          channelData = item;
        }
      })
    })
  }
}

loadData();

countdown = 60;

function setTime(val) {
  if (countdown == 0) {
    val.removeAttribute("disabled");
    $(".yanzheng").css("background-color", "#cf9f53");
    $(".yanzheng").css("color", "black");
    val.value = "获取验证码";
    // countdown = 60;
  } else {
    val.setAttribute("disabled", true);
    $(".yanzheng").css("background-color", "#919191");
    $(".yanzheng").css("color", "#fff");
    val.value = "重新发送(" + countdown + ")";
    countdown--;
  }
  setTimeout(function() {
    setTime(val)
  }, 1000)
}

function sendSms(val) {
  var countdown = 60;
  var mobile = $("#mobile").val();
  var inputPlayer = $("input[name='radio-choose']:checked").val();
  var platform = $("input[name='radio-name']:checked").val();
  var data = {};
  data.mobile = mobile;
  data.platform = platform;
  data.channel = channelData.channelName;
  data.series = inputPlayer;

  console.log(data);
  sg2ActivityAPI.sendMobileCode(data, function(result) {
    if (result.ret != 1) {
      if (result.msg == "错误的手机号码!") {
        // alert("请主公输入11位有效手机号码");
        dialog("请主公输入11位有效手机号码");
        return;
      }
      // alert(result.msg);
      dialog(result.msg);
    } else {
      $(".yanzheng").css("background-image", "url(img/yanzheng.png)");
      setTime(val);
    }
  })
}

function saveRecord() {
  var mobile = $("#mobile").val();
  var mobilecode = $("#smscode").val();
  var inputPlayer = $("input[name='radio-choose']:checked").val();
  // if (inputPlayer != '') {//非空的话，控制用户名在24个字符之内
  //   if(inputPlayer.length>24){
  //     alert("《胡莱三国》角色名（一般均为QQ昵称）不超过24个字符，请主公查实后再提交");
  //     return;
  //   }
  // }
  var platform = $("input[name='radio-name']:checked").val();
  if (platform == undefined) {
    // alert("请选择您的手机系统!");
    dialog("请选择您的手机系统!");
    return;
  }
  // var channel = $("#channel").val();
  var data = {};
  data.mobile = mobile;
  data.verifyCode = mobilecode;
  data.series = inputPlayer;
  data.channel = channelData.channelName;
  data.platform = platform;

  console.log(data);

  sg2ActivityAPI.saveRecord(data, function(result) {
    console.log(result)
    if (result.ret != 1) {
      if (result.msg == "错误的验证码!") {
        // alert("请主公填写正确的验证码哦");
        dialog("请主公填写正确的验证码哦");
        return;
      }
      if (result.msg == "错误的手机号码!") {
        // alert("请主公输入11位有效手机号码");
        dialog("请主公输入11位有效手机号码");
        return;
      }
      // alert(result.msg);
      dialog(result.msg)
    } else {
      dialog("恭喜主公预约成功！ 莱莱将在游戏公测上线前短信通知获奖消息，所有奖励可叠加获得。游戏即将上线，敬请期待哦！");
      getTotal();
    }
  })

}

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

getTotal();

function dialog(str) {
  $("#cover").css("display", "block");
  $(".message-text").html(str);
  $("#message").css("display", "block");
}


// 视频播放
$("#video").click(function() {
  // console.log("视频播放");
  $(".video-show").css("display", "block");
  $("#cover").css("display", "block");
  var media = document.getElementById("media");
  media.play();
})
$(".close_video").click(function() {
  $(".video-show").css("display", "none");
  $("#cover").css("display", "none");
  var media = document.getElementById("media");
  media.pause();
})

$("#cover").click(function() {
  $(".libao-content").css("display", "none");
  $(".yuyue-dialog").css("display", "none");
  $("#message").css("display", "none");
  $(".video-show").css("display", "none");
  $("#weixin").css("display", "none");
  $("#cover").css("display", "none");
  var media = document.getElementById("media");
  media.pause();
})
$(".know").click(function() {
    // 如果预约成功，关闭所有弹窗
    var text = $(".message-text").html();
    if (text == "恭喜主公预约成功！ 莱莱将在游戏公测上线前短信通知获奖消息，所有奖励可叠加获得。游戏即将上线，敬请期待哦！") {
      $("#cover").css("display", "none");
      $("#message").css("display", "none");
      $(".yuyue-dialog").css("display", "none");
      return;
    }
    $("#message").css("display", "none");
  })
  // 官方微信
$(".download-2 img:eq(1)").click(function() {
    $("#weixin").css("display", "block");
    $("#cover").css("display", "block");
  })
  // 关闭微信弹框
function closeWeixin() {
  $("#weixin").css("display", "none");
  $("#cover").css("display", "none");
}
// 礼包图片切换与显示
$(".wan5").click(function() {
  $("#cover").css("display", "block");
  $(".libao-content").css("display", "block");
  $(".libao-content").css("background-image", "url(./img/huangjinlibao.png)");
});
$(".wan20").click(function() {
  $("#cover").css("display", "block");
  $(".libao-content").css("display", "block");
  $(".libao-content").css("background-image", "url(./img/baoshilibao_.png)");
});
$(".wan50").click(function() {
  $("#cover").css("display", "block");
  $(".libao-content").css("display", "block");
  $(".libao-content").css("background-image", "url(./img/wujianglibao_.png)");
});
$(".wan100").click(function() {
  $("#cover").css("display", "block");
  $(".libao-content").css("display", "block");
  $(".libao-content").css("background-image", "url(./img/lingshoulibao_.png)");
});
// 关闭礼包
$("#close-libao").click(function() {
    $(".libao-content").css("display", "none");
    $("#cover").css("display", "none");
  })
  // 进入官网
$("#guanwang").click(function() {
    alert("敬请期待！");
  })
  // 预约弹窗
$("#dialogyy").click(function() {
    $("#cover").css("display", "block");
    $(".yuyue-dialog").css("display", "block");
  })
  // 关闭预约
$("#close-dialog").click(function() {
  $("#cover").css("display", "none");
  $(".yuyue-dialog").css("display", "none");
})