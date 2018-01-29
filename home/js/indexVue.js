Vue.dev = true
new Vue({
  el: '#app',
  data: {
    hoolaiCmsAPI: new hoolaiCmsAPI(16, false),
    listData: [],
    listName: '',
    more_href: '',
    shouye: true,
    xinwenzhongxin: false,
    wanfagonglue: false,
    article_title: '',
    article_time: '',
    article_content: '',
    jinengArr: [],
    jinengDetail: '',
    gonggongArr: [],
    zhuanshuArr: [],
    zhugongArr: [],
    ggAct: true,
    zsAct: false,
    zgAct: false,
    wujiangArr: [],
    wujiangDetail: '',
    gongjiArr: [],
    fangyuArr: [],
    fuzhuArr: [],
    gjAct: true,
    fyAct: false,
    fzAct: false,
    lunboData: []
  },
  mounted() {
    this.getLunbo();
  },
  created: function() {
    this.initData();
  },
  methods: {
    getLunbo: function() {
      var that = this;
      var params = {};
      params.categoryName = '首页轮播';
      params.rows = 10;
      that.hoolaiCmsAPI.getList(params, function(result) {
        that.lunboData = result.rows;
        that.lunboData.forEach(function(element, index){
          if (element.fields['跳转地址'] === '') {
            that.lunboData[index].fields['跳转地址'] = 'javascript:;'
          }
        })
        that.$nextTick(function() {
          that.mySwiper = new Swiper('.top_lunbo', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            centeredSlides: true,
            paginationClickable: true,
            observer: true,
            loop: true,
            autoplay: 2500,
          })
        })
      })
    },
    initData: function() {
      this.getJNWJ('胡莱三国2-游戏资料-技能');
      this.getJNWJ('胡莱三国2-游戏资料-武将');
      var that = this;
      var tag = window.location.hash.substr(1);

      var locationHrefArr = window.location.href.split("#");
      if (locationHrefArr.length == 1) { //首页
        this.goGetList('胡莱三国2-最新', 1)
      } else {
        // 二级页
        that.shouye = false;
        if (tag == 439) {
          that.xinwenzhongxin = true;
          that.wanfagonglue = false;
          that.goGetList('胡莱三国2-最新', 1, 'all');
        } else if (tag == 431) {
          that.xinwenzhongxin = true;
          that.wanfagonglue = false;
          that.goGetList('胡莱三国2-新闻', 1, 'all');
        } else if (tag == 435) {
          that.xinwenzhongxin = true;
          that.wanfagonglue = false;
          that.goGetList('胡莱三国2-公告', 1, 'all');
        } else if (tag == 434) {
          that.xinwenzhongxin = false;
          that.wanfagonglue = true;
          that.goGetList('胡莱三国2-玩法攻略', 1, 'all');
        } else {
          // 三级页
          that.goGetByID(tag);
        }
      }
    },
    goGetList: function(str, num, rows) {
      var that = this;
      if (str == '胡莱三国2-最新') {
        that.more_href = 'list.html#' + '439';
        that.listName = '最新';
      } else if (str == '胡莱三国2-新闻') {
        that.more_href = 'list.html#' + '431';
        that.listName = '新闻';
      } else if (str == '胡莱三国2-公告') {
        that.more_href = 'list.html#' + '435';
        that.listName = '公告';
      } else if (str == '胡莱三国2-玩法攻略') {
        that.more_href = 'list.html#' + '434';
        that.listName = '攻略';
      }

      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      if (rows) {
        params.rows = 100;
      } else {
        params.rows = 5;
      }
      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        listData.forEach(function(item) {
          item.updated = item.created.substr(0, 10);
          item.hrefVal = 'article.html#' + item.id;
        })
        that.listData = listData;
      })
    },
    goGetByID: function(articleTag) {
      var that = this;
      console.log(articleTag);
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
    },
    getJNWJ: function(str) {
      var that = this;
      // 获取首页展示技能
      var params = {};
      params.isRecommend = 1;
      params.categoryName = str;
      params.rows = 100;
      this.hoolaiCmsAPI.getList(params, function(result) {
        var arr = result.rows;
        console.log(arr)
        if (str === '胡莱三国2-游戏资料-技能') {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].fields.类型 === '公共') {
              that.gonggongArr.push(arr[i]);
            } else if (arr[i].fields.类型 === '专属') {
              that.zhuanshuArr.push(arr[i]);
            } else if (arr[i].fields.类型 === '主公') {
              that.zhugongArr.push(arr[i]);
            }
          }
          // 默认首先显示公共技能列表
          that.jinengArr = that.gonggongArr;
          that.jinengDetail = that.jinengArr[0].fields;
          that.jinengDetail.title = that.jinengArr[0].title;
        } else if (str === '胡莱三国2-游戏资料-武将') {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].fields.武将类型 === '攻击') {
              that.gongjiArr.push(arr[i]);
            } else if (arr[i].fields.武将类型 === '防御') {
              that.fangyuArr.push(arr[i]);
            } else if (arr[i].fields.武将类型 === '辅助') {
              that.fuzhuArr.push(arr[i]);
            }
          }
          // 默认首先显示攻击武将列表
          that.wujiangArr = that.gongjiArr;
          that.wujiangDetail = that.wujiangArr[0].fields;
          that.wujiangDetail.title = that.wujiangArr[0].title;
        }
      })
    },
    changeList: function(str, num) {
      var that = this;
      if (str == '技能') {
        if (num === 1) {
          that.jinengArr = that.gonggongArr;
          that.ggAct = true;
          that.zsAct = false;
          that.zgAct = false;
        } else if (num === 2) {
          that.jinengArr = that.zhuanshuArr;
          that.ggAct = false;
          that.zsAct = true;
          that.zgAct = false;
        } else {
          that.jinengArr = that.zhugongArr;
          that.ggAct = false;
          that.zsAct = false;
          that.zgAct = true;
        }
      } else {
        if (num === 1) {
          that.wujiangArr = that.gongjiArr;
          that.gjAct = true;
          that.fyAct = false;
          that.fzAct = false;
        } else if (num === 2) {
          that.wujiangArr = that.fangyuArr;
          that.gjAct = false;
          that.fyAct = true;
          that.fzAct = false;
        } else {
          that.wujiangArr = that.fuzhuArr;
          that.gjAct = false;
          that.fyAct = false;
          that.fzAct = true;
        }
      }
    },
    changeDetail: function(str, index) {
      var that = this;
      if (str === '技能') {
        that.jinengDetail = that.jinengArr[index].fields;
        that.jinengDetail.title = that.jinengArr[index].title;
      } else {
        that.wujiangDetail = that.wujiangArr[index].fields;
        that.wujiangDetail.title = that.wujiangArr[index].title;
      }

    }
  }
})
