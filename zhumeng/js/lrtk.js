(function($) {
    $.extend({
        'foucs': function(con) {
            var $container = $('#index_b_hero');
            var $imgs = $container.find('li.hero');
            var $leftBtn = $container.find('a.prevk');
            var $rightBtn = $container.find('a.nextk');
            var config = {
                interval: con && con.interval || 4000,
                animateTime: con && con.animateTime || 600,
                direction: con && (con.direction === 'right'),
                _imgLen: $imgs.length
            };
            var i = 0;
            var getNextIndex = function(y) {
                return i + y >= config._imgLen ? i + y - config._imgLen : i + y;
            };
            var getPrevIndex = function(y) {
                return i - y < 0 ? config._imgLen + i - y : i - y;
            };
            var silde = function(d) {
                $imgs.eq((d ? getPrevIndex(2) : getNextIndex(2))).css('left', (d ? '-2240px' : '2240px'))
                $imgs.animate({
                    'left': (d ? '+' : '-') + '=1120px'
                }, config.animateTime);
                i = d ? getPrevIndex(1) : getNextIndex(1);
            };
            var s = setInterval(function() {
                silde(config.direction);
            }, config.interval);
            $imgs.eq(i).css('left', 0).end().eq(i + 1).css('left', '1120px').end().eq(i - 1).css('left', '-1120px');
            $imgs.eq(i).src = $imgs.eq(i).attr('rel');
            $container.find('.hero-wrap').add($leftBtn).add($rightBtn).hover(function() {
                clearInterval(s);
            }, function() {
                s = setInterval(function() {
                    silde(config.direction);
                }, config.interval);
            });
            $leftBtn.click(function() {
                if ($(':animated').length === 0) {
                    silde(true);
                }
            });
            $rightBtn.click(function() {
                if ($(':animated').length === 0) {
                    silde(false);
                }
            });
        }
    });
}(jQuery));

$(function() {
    $('#kv_main').hover(function() {
        $('.helper .mask-left, .helper .mask-right').addClass('show');
    }, function() {
        $('.helper .mask-left, .helper .mask-right').removeClass('show');
    });

});



$(function() {

    function tabs(tabTit, on, tabCon) {
        $(tabCon).each(function() {
            $(this).children().eq(0).show();

        });
        $(tabTit).each(function() {
            $(this).children().eq(0).addClass(on);
        });
        $(tabTit).children().click(function() {
            $(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
            $(tabCon).children().eq(index).show().siblings().hide();
        });
    }
    tabs(".investment_title", "on", ".investment_con");


    $.foucs({
        direction: 'left'
    });


    $(".prev,.next").hover(function() {
        $(this).fadeTo("show", 1);
    }, function() {
        $(this).fadeTo("show", 1);
    })
    $(".home_qh").slide({
        titCell: ".num ul",
        mainCell: ".home_iwz",
        effect: "fold",
        autoPlay: false,
        delayTime: 1000,
        autoPage: true
    });
})
