new Vue({
  el: '#app',
  data: {
    iosReceive: false,
    andReceive: false,
    coverShow: false,
  },
  methods: {
    iosClick: function() {
      this.coverShow = true;
      this.iosReceive = true;
    },
    andClick: function() {
      this.coverShow = true;
      this.andReceive = true;
    },
    crossClick: function() {
      this.coverShow = false;
      this.iosReceive = false;
      this.andReceive = false;
    }
  }
})