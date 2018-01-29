// 用户报名保存
function addForm(values){
  var url = 'http://activity.api.hulai.com/api/hlsg2/saveBaoming'
  $.post(url, values,function(result){
    $('.pcSublime').css('display', 'none')
    $('.cover').css('display', 'none')
    alert('恭喜您！报名成功')
  },'json')
}

// 获取投票
function fetchVote(callback) {
  var url = 'http://activity.api.hulai.com/api/hlsg2/getVotes'
  $.get(url, function(result){
    callback(result)
  }, 'json')
}

// 提交投票
function addVote(data, fetchVote) {
  var url = 'http://activity.api.hulai.com/api/hlsg2/saveVote'
  $.post(url, data, function(result) {
    fetchVote()
  }, 'json')
}


$(function() {
  $('.pcsublime>img').click(function(){
    let signs = {}
    let name = $(this).parent().siblings('.pcSublime_mid').find('.name').val()
    let mobile = $(this).parent().siblings('.pcSublime_mid').find('.mobile').val()
    let hasBeta = $(this).parent().siblings('.pcSublime_mid').find('.hasBeta').val()
    let betaAccount = $(this).parent().siblings('.pcSublime_mid').find('.betaAccount').val()

    var patrn = /^1[34578]\d{9}$/;
    if (name == '' && mobile !== '' & hasBeta !== '') {
      alert('请输入您的姓名')
      return
    }else if(name !== '' && mobile == '' & hasBeta !== '') {
      alert('请输入您的手机号')
      return
    }else if(name !== '' && mobile !== '' & hasBeta == '') {
      alert('请选择您是否参加过内测')
      return
    }else if((name == '' && mobile == '') || (name == '' && hasBeta == '') || (name == '' && mobile == '' & hasBeta == '')) {
      alert('请输入您的姓名')
      return
    }else if(mobile == '' && hasBeta == '') {
      alert('请输入您的手机号')
      return
    }else if(!patrn.exec(mobile)) {
      alert('请输入正确的手机号')
      return
    }
    signs.name = name
    signs.mobile = mobile
    signs.hasBeta = hasBeta
    signs.betaAccount = betaAccount

    addForm(signs)
  })
})


$(function() {
  $('.four_last>img').click(function saveVote() {
    let voteArr = []
    let votes = {ids: ''}
    let domItems = $(this).parent().siblings('.four_middle').find('img')

    for (var i = 0; i < domItems.length; i++) {
      if ($(domItems[i]).hasClass('bordercolor')) {
        voteArr.push($(domItems[i]).attr('data-num'))
      }
    }

    if (voteArr.length == 0){return }

    votes.ids = voteArr.join(',')
    console.log(votes)
    addVote(votes)
  })
})
