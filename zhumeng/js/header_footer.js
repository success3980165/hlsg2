//header start -----------------------------------//
var animspeed = 'fast';
var nav_main = false;
var nav_sub = false;
var nav_visible = false;
var nav_open = false;
var nav_close = false;

var nav_num = $('div.menu').find('li').length;
// console.log(nav_num)
// console.log(($('div.menu').find('li')))

var delayInt;

var delayOpen = false;

function checkmenu() {

    if ((nav_main || nav_sub) && !nav_visible && delayOpen) {
        if (!nav_open && !nav_close) {
            nav_open = true;

            $('.sub_menu').slideDown(
                animspeed,
                function() {
                    nav_open = false;
                    nav_visible = true;

                }
            );

        }

    } else if (!nav_main && !nav_sub && nav_visible) {
        if (!nav_close && !nav_open) {
            nav_close = true;
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

function delayCheck() {
    delayOpen = true;
    timeit = setInterval('checkmenu()', 100);
}

function menuRest() {
    for (var i = 0; i <= nav_num; i++) {
        if (col_id != i) {
            $('.nav_' + i).removeClass('highlight');
            $('.sub_nav_' + i).removeClass('bk');
        }

    }
}

function hightlight(id) {
    for (var i = 1; i <= nav_num; i++) {
        if (col_id != i) {
            if (i == id) {
                $('.nav_' + i).addClass('highlight');

            } else {
                $('.nav_' + i).removeClass('highlight');

            }
        }

        if (i == id) {
            $('.sub_nav_' + i).addClass('bk');
        } else {
            $('.sub_nav_' + i).removeClass('bk');
        }
    }
}

$(function() {

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
        menuRest();

    });


    for (var i = 1; i <= nav_num; i++) {
        $('.nav_' + i).data("index", i);

        if (col_id != i) {

            $('.nav_' + i).mouseover(function() {
                hightlight($(this).data("index"));
            });

            $('.nav_' + i).mouseout(function() {
                nav_sub = false;
                menuRest();
            });

            $('.sub_nav_' + i).data("index", i);
        } else {
            $('.nav_' + i).addClass('highlight');
        }

        $('.sub_nav_' + i).data("index", i);
        $('.sub_nav_' + i).mouseover(function() {
            hightlight($(this).data("index"));
        });
    }
    //header end -----------------------------------//


    /*footer        */
    $('a.foot_weixin').mouseover(function() {
        $(this).find('i').css({
            'display': 'block'
        })
    })
    $('a.foot_weixin').mouseout(function() {
        $(this).find('i').css({
            'display': 'none'
        })
    })
})


$(document).ready(function() {
    //首先将#back-to-top隐藏
    $("#rocket").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $("#rocket").fadeIn(500);
            } else {
                $("#rocket").fadeOut(500);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#rocket").click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 100);
            return false;
        });
    });
});
