$(function() {
  // $(".box_content").click(function() {
  //   $(".two").css("display", "block");
  //   $(".three").css("display", "none");
  //   $(".four").css("display", "none");
  //   $(".five").css("display", "none");
  //   $(".votePage").css("display", "none")
  // })
  // $(".gongce").click(function() {
  //   $(".two").css("display", "none");
  //   $(".three").css("display", "block");
  //   $(".four").css("display", "none");
  //   $(".five").css("display", "none");
  //   $(".votePage").css("display", "none")
  // })
  // $(".zhibo").click(function() {
  //   $(".four").css("display", "block");
  //   $(".two").css("display", "none");
  //   $(".three").css("display", "none");
  //   $(".five").css("display", "none");
  //   $(".votePage").css("display", "none")
  // })
  // $(".hudong").click(function() {
  //   $(".four").css("display", "none");
  //   $(".two").css("display", "none");
  //   $(".three").css("display", "none");
  //   $(".five").css("display", "block");
  //   $(".votePage").css("display", "none")
  // })
  $(".weixin").click(function() {
    $(".share").css("display", "block")
  })
  $(".share_left").click(function() {
      $(".share").css("display", "none")
    })
    //侧栏收起
  $(".shouqi").click(function() {
    var right_val = $(".celan").css("right");
    console.log(right_val);
    if (right_val == '0px') {
      console.log("应收起");
      $(".celan").animate({
        right: '-186px'
      })
      $(".shouqi").attr("src", "./img/open.png");
    } else if (right_val == '-186px') {
      console.log("应展开");
      $(".celan").animate({
        right: '0px'
      })
      $(".shouqi").attr("src", "./img/shouqi.png");
    }
  })



  $(".pcDown").click(function() {
    $(".pcerweima").css("display", "inline-block")
    $(".pc_close").css("display", "inline-block")
  })
  $(".pc_close").click(function() {
      $(this).css("display", "none")
      $(".pcerweima").css("display", "none")
    })
    //点击图片加边框

  // $(".four_middle li").click(function() {
  //   var cur_index = $(this).index();
  //   var num = 0;
  //   for (var i = 0; i < 8; i++) {
  //     if ($(".four_middle li img").eq(i).hasClass("bordercolor")) {
  //       num++;
  //     }
  //   }
  //   if ($(".four_middle li img").eq(cur_index).hasClass("bordercolor")) {
  //     console.log("应删除")
  //     $(".four_middle li img").eq(cur_index).removeClass("bordercolor");
  //   } else if (!$(".four_middle li img").eq(cur_index).hasClass("bordercolor") && num < 4) {
  //     console.log("应添加")
  //     $(".four_middle li img").eq(cur_index).addClass("bordercolor");
  //     // $(this).children("img").eq(cur_index).addClass("bordercolor");
  //   }
  // })

  //报名
  // $(".baoming").click(function() {
  //   $(".cover").css("display", "block");
  //   $(".pcSublime").css("display", "block");
  // })
  // $(".cover").click(function() {
  //   $(this).css("display", "none");
  //   $(".pcSublime").css("display", "none");
  // })
  // $(".pcclose img").click(function() {
  //   $(".cover").css("display", "none");
  //   $(".pcSublime").css("display", "none");
  // })


})