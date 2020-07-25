$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.loginAndRegBox').css('height', '310px')
        $('.reg-box').slideDown([
            [0.5]
        ]);
    })
    $('#link_login').on('click', function() {
        $('.login-box').slideDown([
            [0.5]
        ]);
        $('.loginAndRegBox').css('height', '250px')
        $('.reg-box').hide();
    })
})


//验证表单
var form = layui.form;
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码需要6-12位之间'],
    repwd: function(value) {
        var pwd = $('#truepwd').val();
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
})


//监听表单的提交事件,ajax请求注册
$('#form_reg').on('submit', function(e) {
    //阻止表单默认行为
    e.preventDefault();
    var data = {
        username: $('#form_reg [name = username]').val(),
        password: $('#form_reg [name = password]').val()
    }
    $.ajax({
        url: '/api/reguser',
        method: 'POST',
        data: data,
        success: function(res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message)
            $('#link_login').click();
        }
    })
})


//监听表单的提交事件,ajax请求登录
$('#login-box').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})