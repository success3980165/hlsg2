    $(function() {
      $(".guanzhuweixin").click(function() {
        $(".cover").css("display", "block");
        $(".erweima").css("display", "block");
        // $(".tip").css("display", "block");
      })
      $(".cross").click(function() {
        $(".erweima").css("display", "none");
        $(".cover").css("display", "none");
      })
      $(".fenxiaodao").click(function() {
        $(".cover").css("display", "block");
        $(".more").css("display", "block");
        $(".cross1").css("display", "block");
      })
      $(".cross1").click(function() {
        $(".more").css("display", "none");
        $(".cover").css("display", "none");
        $(".tip").css("display", "none");
      })
      $(".cover").click(function() {
        $(".cross1").css("display", "none");
        $(".more").css("display", "none");
        $(".tip").css("display", "none");
        $(".erweima").css("display", "none");
        $(this).css("display", "none");
      })

  // //添加boder

  // $(".five_mid li").click(function() {
  //     var num = 0;
  //     for (var i = 0; i < 8; i++) {
  //       if ($(".five_mid li img").eq(i).hasClass("bordercolor")) {
  //         num++;
  //       }
  //     }
  //     var cur_index = $(this).index();
  //     console.log(cur_index);
  //     if ($(".five_mid li img").eq(cur_index).hasClass("bordercolor")) {
  //       console.log("应删除")
  //       $(".five_mid li img").eq(cur_index).removeClass("bordercolor");
  //     } else if (!$(".five_mid li img").eq(cur_index).hasClass("bordercolor") && num < 4) {
  //       console.log("应添加")
  //       $(".five_mid li img").eq(cur_index).addClass("bordercolor");
  //       // $(this).children("img").eq(cur_index).addClass("bordercolor");
  //     }
  //   })
        //弹框
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