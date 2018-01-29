var sg2ActivityAPI = new hoolaiActivityAPI(14, true);

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


// 检测是ios、 android
// if (isMobile.apple.device) {
//   console.log("apple" + isMobile.apple.device)
//   $("input[name='radio-name']:eq(0)").attr("checked", "checked");;
//   // $("input[name='radio-name']:eq(1)").removeAttr("checked");
// }
// if (isMobile.android.device) {
//   console.log("android" + isMobile.android.device)
//   $("input[name='radio-name']:eq(1)").attr("checked", "checked");;
//   // $("input[name='radio-name']:eq(0)").removeAttr("checked");
// }

var d = document;
countdown = 60;

function setTime(val) {
  if (countdown == 0) {
    $(".yanzheng").css("background-color", "#cf9f53");
    val.removeAttribute("disabled");
    val.value = "获取验证码";
    countdown = 60;
    return;
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
  var data = {};
  data.mobile = mobile;
  data.platform = platform;
  data.channel = channelData.channelName;

  sg2ActivityAPI.sendMobileCode(data, function(result) {
    if (result.ret != 1) {
      if (result.code == 19) {
        $(".overlay").css("display", "block");
        $(".error").css("display", "block");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      } else if (result.code == 4) {
        $(".overlay").css("display", "block");
        $(".gosuccess").css("display", "block");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      }
    } else {
      setTime(val);

    }
  })
}

function saveRecord() {

  var mobile = $("#mobile").val();
  var platform = $('input[type="radio"]:checked').val();
  var verifyCode = $("#smscode").val();
  var data = {};
  data.mobile = mobile;
  data.verifyCode = verifyCode;
  // data.series = series;
  data.channel = channelData.channelName;
  data.platform = platform;
  sg2ActivityAPI.saveRecord(data, function(result) {
    if (result.ret != 1) {
      if (result.code == 19) {
        // debugger
        // $(".overlay").css("display", "block");
        // $(".error").css("display", "block");

        $(".overlay, .error").css("display", "block");
        $(".success, .proving, .gosuccess, .final").css("display", "none");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      } else if (result.code == 4) {
        $(".overlay, .success").css("display", "block");
        $(".error, .proving, .gosuccess, .final").css("display", "none");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      } else if (result.code == 7) {
        $(".overlay, .proving").css("display", "block");
        $(".error, .success, .gosuccess ,final").css("display", "none");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      } else if (result.code == 5) {
        $(".overlay, .gosuccess").css("display", "block");
        $(".error, .success, .proving, .final, .gifterror").css("display", "none");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      }
      // getTotal();
    }
    // else {
    //   $(".overlay, .final").css("display", "block");
    //   $(".error, .success, .proving, .gosuccess").css("display", "none");
    //   $(".white, .img").click(function() {
    //     $(".overlay").css("display", "none");
    //   })
    // }
    if (result.ret == 1) {
      if (result.code == 256) {
        $(".overlay, .gifterror").css("display", "block");
        $(".error, .success, .proving, .gosuccess, .final").css("display", "none");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      } else {
        $(".overlay, .final").css("display", "block");
        $(".error, .success, .proving, .gosuccess, .gifterror").css("display", "none");
        $(".white, .img").click(function() {
          $(".overlay").css("display", "none");
        })
      }
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
// $(".anniu").click(function() {
//   $(".yuyue").css("display", "block");
//   oShadow.style.height = scrollHeight + 'px';
//   oShadow.style.display = 'block';
// });