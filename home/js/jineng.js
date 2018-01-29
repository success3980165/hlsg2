new Vue({
  el: '#app',
  data: {
    hoolaiCmsAPI: new hoolaiCmsAPI(16, false),
    jinengArr: [],
    gonggongArr: [],
    zhuanshuArr: [],
    zhugongArr: [],
    ggAct: true,
    zsAct: false,
    zgAct: false
  },
  created: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      this.getJNWJ('胡莱三国2-游戏资料-技能');
    },
    getJNWJ: function(str){
      var that = this;
      var params = {};
      params.categoryName = str;
      params.rows = 200;
      this.hoolaiCmsAPI.getList(params, function(result) {
        var arr = result.rows;
        // console.log(arr)
        for (var i=0;i<arr.length;i++){
          if (arr[i].fields.类型 === '公共'){
            that.gonggongArr.push(arr[i]);
          } else if (arr[i].fields.类型 === '专属'){
            that.zhuanshuArr.push(arr[i]);
          } else if (arr[i].fields.类型 === '主公'){
            that.zhugongArr.push(arr[i]);
          }
        }
        // 默认首先显示公共技能列表
        that.jinengArr = that.gonggongArr;
      })
    },
    changeList: function(num){
      var that = this;
      if (num === 1){
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
    }
  }
})
