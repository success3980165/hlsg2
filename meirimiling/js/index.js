new Vue({
  el: '#app',
  data: {
    lingquShow: true,
    duihuanmaShow: false,
    duihuanma: ''
  },
  methods: {
    getDuihuanma: function() {
      var that = this;
      $.get("https://web.hulai.com/api/hlsg2/daySecret",function(result){
        console.log(result)
        that.duihuanma = result.gifts;
      });
      this.lingquShow = false;
      this.duihuanmaShow = true;
    }
  }
})
