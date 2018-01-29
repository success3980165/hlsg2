$(function() {
    //header
    var animspeed = 'fast';
    var nav_main = false;
    var nav_sub = false;
    var nav_visible = false;
    var nav_open = false;
    var nav_close = false;
    var main_menu_urlary = new Array();
    main_menu_urlary[0] = "";
    main_menu_urlary[1] = "http://www.gamea.com.cn/GAExperience.htm";
    main_menu_urlary[2] = "http://www.gamea.com.cn/courses.htm";
    main_menu_urlary[3] = "http://www.gamea.com.cn/gallery_type_1.htm";
    main_menu_urlary[4] = "http://www.gamea.com.cn/reg_steps.php";
    main_menu_urlary[5] = "http://www.gamea.com.cn/careers_job.htm";
    main_menu_urlary[6] = "http://www.gamea.com.cn/books.htm";

    var delayInt;

    var delayOpen = false;

    function delayCheck() {
        delayOpen = true;
        timeit = setInterval('checkmenu()', 100);
    }

    function checkmenu() {

        if ((nav_main || nav_sub) && !nav_visible && delayOpen) {
            if (!nav_open && !nav_close) {
                nav_open = true;

                $('.sub_menu').slideDown(
                    animspeed,
                    function() {
                        //$('#flash-anim *').hide();
                        nav_open = false;
                        nav_visible = true;

                    }
                );

            }

        } else if (!nav_main && !nav_sub && nav_visible) {
            if (!nav_close && !nav_open) {
                nav_close = true;
                // $('#flash-anim *').show();
                $('.sub_menu').slideUp(
                    animspeed,
                    function() {
                        nav_close = false;
                        nav_visible = false;

                    }
                );

            }

        }

    }


    // var nav_main = false;
    // var nav_sub = false;

    // $('div.menu').mouseover(function() {

    //     nav_main = true;
    // })
    // $('div.menu').mouseout(function() {

    //     nav_main = false;
    // })
    // $('div.sub_menu').mouseover(function() {
    //     nav_sub = true;
    // })
    // $('div.sub_menu').mouseout(function() {
    //     nav_sub = false;
    //     menuRest();
    // })

    $('div.menu').mouseover(function() {
        delayInt = setTimeout('delayCheck()', 100);
        delayCheck();
        nav_main = true;

    });
    $('div.menu').mouseout(function() {


        clearTimeout(delayInt);
        delayOpen = false;

        nav_main = false;

    });


    $('.sub_menu').mouseover(function() {
        nav_sub = true;

    });
    $('.sub_menu').mouseout(function() {
        nav_sub = false;
        // menuRest();

    });
    // for (var i = 1; i <= 6; i++) {
    //     // $('.nav_' + i).data("index", i);
    //     // $('.nav_' + i).click(function() {



    //     //     if (String(window.location).indexOf("index.htm") > 0) {
    //     //         window.open(main_menu_urlary[$(this).data("index")]);
    //     //     } else {
    //     //         window.location = main_menu_urlary[$(this).data("index")];
    //     //     }



    //     // });

    //     if (col_id != i) {

    //         $('.nav_' + i).mouseover(function() {

    //             hightlight($(this).data("index"));


    //         });

    //         $('.nav_' + i).mouseout(function() {
    //             nav_sub = false;
    //             menuRest();
    //         });


    //         $('.sub_nav_' + i).data("index", i);


    //     } else {
    //         $('.nav_' + i).addClass('hightlight');

    //     }

    //     $('.sub_nav_' + i).data("index", i);
    //     $('.sub_nav_' + i).mouseover(function() {
    //         hightlight($(this).data("index"));
    //     });
    // }

    // function menuRest() {
    //     for (var i = 0; i <= 6; i++) {
    //         if (col_id != i) {
    //             $('.nav_' + i).removeClass('highlight');
    //             $('.sub_nav_' + i).removeClass('bk');
    //         }

    //     }
    // }

    // function hightlight(id) {
    //     for (var i = 1; i <= 6; i++) {
    //         if (col_id != i) {
    //             if (i == id) {
    //                 $('.nav_' + i).addClass('hightlight');

    //             } else {
    //                 $('.nav_' + i).removeClass('hightlight');

    //             }
    //         }

    //         if (i == id) {
    //             $('.sub_nav_' + i).addClass('sub_nav_' + i + '_bk');
    //         } else {
    //             $('.sub_nav_' + i).removeClass('sub_nav_' + i + '_bk');
    //         }
    //     }
    // }



    // $('div.menu').find('li').hover(function() {
    //     var index = $('div.menu').find('li').index($(this));
    //     var that = this;

    //     $('div.sub_menu')
    //         .find('ul').eq(index).addClass('active').siblings('ul').removeClass('active')
    // })



    // $('div.sub_menu').find('ul').hover(function() {
    //     var index = $('div.sub_menu').find('ul').index($(this));

    //     $('div.sub_menu').find('ul').eq(index).addClass('active').siblings('ul').removeClass('active');
    //     $('div.menu').find('li').eq(index).addClass('active').siblings('li').removeClass('active');
    // })



    // $('div.nav').mouseenter(function() {
    //     $('div.sub_menu')
    //         .slideDown()
    // })
    // $('div.sub_menu li').click(function() {
    //     $('div.sub_menu').slideUp();
    // })
    // $('div.nav').mouseout(function() {
    //     // console.log($(this))
    //     $('div.sub_menu').slideUp();
    // })
})
