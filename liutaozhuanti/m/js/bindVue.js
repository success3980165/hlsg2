 new Vue({
   el: '.six',
   data: {
     baoming: {
       name: '',
       mobile: '',
       hasBeta: '',
       betaAccount: ''
     },
     showBaoming: false
   },
   created: function() {
     this.initData();
   },
   methods: {
     initData: function() {

     },
     closeActivity: function() {
       alert("活动已结束！")
     },
     clickShowBaoming: function() {
       // $(".cover").css("display", "block");
       this.showBaoming = true;
     },
     hideShowBaoming: function() {
       // $(".cover").css("display", "none");
       this.showBaoming = false;
     },
     subBaoming: function() {
       var that = this;
       var data = {};
       data.name = that.baoming.name;
       data.mobile = that.baoming.mobile;
       data.hasBeta = that.baoming.hasBeta;
       data.betaAccount = that.baoming.betaAccount;
       var url = 'http://activity.api.hulai.com/api/hlsg2/saveBaoming';
       if (data.name == '') {
         alert("请输入姓名");
         return;
       }
       if (data.hasBeta == '') {
         alert("是否参加过内侧")
         return;
       }
       $.post(url, data, function(result) {
         if (result.ret != 1) {
           alert(result.msg);
           return;
         }
         console.log(result);
         // 成功后：
         that.hideShowBaoming();
         alert("报名成功！")
       }, 'json')
     }
   }
 })

 new Vue({
   el: '.five',
   data: {
     toupiaoList: [],
     total: 0,
     divWitdh: 500,
     showToupiao: false,
     ids: [],
     idObs: {},
     baoming: {
       name: '',
       mobile: '',
       hasBeta: '',
       betaAccount: ''
     },
     showBaoming: false
   },
   created: function() {
     this.initData();
     var hasToupiao = localStorage["toupiao"];
     if (hasToupiao) {
       this.showToupiao = true;
     }
   },
   methods: {
    closeActivityOne: function() {
       alert("活动已结束！")
     },
     initData: function() {
       this.loadTouPiaoData();
     },
     clickBgimg: function(item) {
       var that = this;
       if (that.isToupiao) {
         alert('已经投票过，不用再投票！');
         return;
       }
       var ids = that.ids;
       console.log(ids.length)
       if (!item.checked && ids.length > 3) {
         alert('只能选择4种哦！');
         return;
       }
       item.checked = !item.checked;
       if (item.checked) {
         that.idObs[item.id] = 0;
       } else {
         delete that.idObs[item.id];
       }
       ids = [];
       for (var key in that.idObs) {
         ids.push(key);
       }
       that.ids = ids;
     },
     clickToupiao: function() {
       var that = this;
       if (that.isToupiao) {
         // 直接显示结果
         that.showToupiao = true;
         // alert('已经投票过，不用再投票！');
         return;
       }
       if (that.ids.length == 0) {
         alert('请先选择投票哦！');
         return;
       }
       var url = 'http://activity.api.hulai.com/api/hlsg2/saveVote';
       var data = {};
       data.ids = that.ids.join(',');
       $.post(url, data, function(result) {
         if (result.ret != 1) {
           alert(result.msg);
           return;
         }
         localStorage["toupiao"] = true;

         that.isToupiao = true;
         // 显示结果
         that.showToupiao = true;

         // 刷新投票的数据
         that.loadTouPiaoData();
       }, 'json')
     },
     loadTouPiaoData: function() {
       var that = this;
       var url = 'http://activity.api.hulai.com/api/hlsg2/getVotes';
       $.get(url, function(result) {
         if (result.ret == 1) {
           that.formartBl(result.data);
         }
       }, 'json')
     },
     formartBl: function(list) {
       var that = this;
       var total = 0;
       list.forEach(function(item) {
         item.checked = false;
         if (item.voteNum > total) {
           total = item.voteNum;
         }
       })

       list.forEach(function(item) {
         // 50 / 100  = 0.5  50
         item.bl = item.voteNum / total;
         item.blVal = (item.bl * 100).toFixed(2);
         item.width = item.bl * that.divWitdh;
       })
       that.total = total;
       that.toupiaoList = list;
     }
   }
 })