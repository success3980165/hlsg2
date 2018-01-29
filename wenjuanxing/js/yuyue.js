var sg2ActivityAPI = new hoolaiActivityAPI(16, true);

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
    $.getJSON('./channel.json', function(list) {
      list.forEach(function(item) {
        if ((item.channelId + "") === channelId) {
          channelData = item;
        }
      })
    })
  }
}

loadData();


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

var d = document;
countdown = 60;

function setTime(val) {
  if (countdown == 0) {
    $(".yanzheng").css("background-color", "#cf9f53");
    val.removeAttribute("disabled");
    val.value = "获取验证码";
    // countdown = 60; 
  } else {
    val.setAttribute("disabled", true);
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
  var platform = $('input[type="radio"]:checked').val();
  var series = $('.regular-radio1[type="radio"]:checked').val();
  var data = {};
  data.mobile = mobile;
  data.platform = platform;
  data.channel = channelData.channelName; // 
  data.series = series;
  var oShadow = d.getElementById('shadow');
  var scrollHeight = d.documentElement.scrollHeight || d.body.scrollHeight;
  oShadow.style.height = scrollHeight + 'px';

  sg2ActivityAPI.sendMobileCode(data, function(result) {
    if (result.ret != 1) {

      $(".tishi").css("display", "block");
      if (result.msg == '错误的手机号码!') {
        $(".tishi2").html("请主公输入11位有效手机号码!");
        oShadow.style.height = scrollHeight + 'px';
        oShadow.style.display = 'block';
        return;
      }
      $(".tishi2").html(result.msg);
      oShadow.style.height = scrollHeight + 'px';
      oShadow.style.display = 'block';

    } else {
      $(".yanzheng").css("background-color", "#8B8E90");
      setTime(val);

    }
  })
}

function saveRecord() {

  var mobile = $("#mobile").val();
  var platform = $('input[type="radio"]:checked').val();
  var verifyCode = $("#smscode").val();
  var series = $('.regular-radio1[type="radio"]:checked').val();
  var data = {};
  data.mobile = mobile;
  data.verifyCode = verifyCode;
  data.series = series;
  data.channel = channelData.channelName;
  data.platform = platform;
  var oShadow = d.getElementById('shadow');
  var scrollHeight = d.documentElement.scrollHeight || d.body.scrollHeight;
  oShadow.style.height = scrollHeight + 'px';
  sg2ActivityAPI.saveRecord(data, function(result) {
    if (result.ret != 1) {
      $(".tishi").css("display", "block");
      if (result.msg == '错误的手机号码!') {
        $(".tishi2").html("请主公输入11位有效手机号码!");
        oShadow.style.height = scrollHeight + 'px';
        oShadow.style.display = 'block';
        return;
      }
      if (result.msg == '错误的验证码!') {
        $(".tishi2").html("请主公填写正确的验证码哦");
        oShadow.style.height = scrollHeight + 'px';
        oShadow.style.display = 'block';
        return;
      }
      $(".tishi2").html(result.msg);
      oShadow.style.height = scrollHeight + 'px';
      oShadow.style.display = 'block';
    } else {
      $(".tishi").css("display", "block");
      $(".tishi2").html("恭喜主公预约成功！ 莱莱将在游戏公测上线前短信通知获奖消息，所有奖励可叠加获得。游戏即将上线，敬请期待哦！");
      $(".tish3").css("margin-top", "35px");
      oShadow.style.height = scrollHeight + 'px';
      oShadow.style.display = 'block';
      getTotal();
    }
  })

}

function getTotal() {
  sg2ActivityAPI.getTotal(function(result) {
    if (result.ret != 1) {
      alert(result.msg);
    } else {
      $("#total").text(result.total);
    }
  })
}
getTotal();
//预约弹窗
$(".anniu").click(function() {
  $(".yuyue").css("display", "block");
  oShadow.style.height = scrollHeight + 'px';
  oShadow.style.display = 'block';
});