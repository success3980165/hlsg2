new Vue({
  el: "#app",
  data: {
    milkyTeaActivityAPI: new hoolaiActivityAPI(27, true),
    telephone: '',
    code: '',
    countdown: 60,
    isDisabled: false,
    isGrayBg: false,
    smsCodeVal: '获取验证码',
    coverShow: false,
    successShow: false,
    libaoma: ''
  },
  created: function() {
    var lasttel = localStorage['lasttel']
    this.checkTelHasLibao(lasttel);
  },
  methods: {
    clickCross: function() {
      this.coverShow = false;
      this.successShow = false;
    },
    checkTelHasLibao: function(tel) {
      var libaoma = localStorage[tel];
      if (libaoma) {
        this.libaoma = libaoma;
        this.telephone = tel;
        this.coverShow = true;
        this.successShow = true;
        return true;
      }
      return false;
    },
    sendSms: function() {
      var self = this;
      console.log(self.channelName);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;

      if (this.checkTelHasLibao(mobile)) {
        return;
      }
      if (!data.mobile) {
        alert("请先输入手机号");
        return;
      }
      this.milkyTeaActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.countdown = 60;
          self.setTime();
        }
      })
    },
    setTime: function() {
      var self = this;
      if (self.countdown == 0) {
        self.isGrayBg = false;
        self.smsCodeVal = "获取验证码";
        self.isDisabled = false;
        return;
      } else {
        self.isDisabled = true;
        self.isGrayBg = true;
        self.smsCodeVal = '重新发送' + self.countdown + 's';
        self.countdown--;
      }
      setTimeout(this.setTime, 1000)
    },
    saveRecord: function() {
      var self = this;
      // var name = document.location.search;
      var data = {};
      data.mobile = this.telephone;
      data.verifyCode = this.code;

      if (this.checkTelHasLibao(this.telephone)) {
        return;
      }

      if (!data.verifyCode) {
        alert("您还没有注册，请您注册后领取");
        return;
      }

      this.milkyTeaActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          alert(result.msg);
          return;
        }
        self.coverShow = true;
        self.successShow = true;
        self.libaoma = result.gifts;
        localStorage['lasttel'] = self.telephone;
        localStorage[self.telephone] = result.gifts;

      })
    },
  }
})