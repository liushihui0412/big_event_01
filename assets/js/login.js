$(function() {

    $('#link_reg').on('click', function() {
        $('.regBox').show();
        $('.loginBox').hide();
    })

    $('#link_login').on('click', function() {
        $('.regBox').hide();
        $('.loginBox').show();
    })

    // console.log(layui);
    let form = layui.form;
    // console.log(form);
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // console.log(value);//再次输入密码框的值
            // 因为要验证上面的密码框与再次输入密码框的值是否一致，所以需要获取上面密码框的val,用jq获取元素的时候要用到regBox，因为有两个password input 输入框
            let pwd = $('.regBox input[name=password]').val();
            // console.log(pwd);
            if (value != pwd) {
                return '两次密码不一致，请重新输入！';
            }
        }
    });

    // 注册页面验证
    let layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.regBox input[name=username]').val(),
                password: $('.regBox input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                // 转态栏res.status 为0的话，证明注册成功，反之失败
                if (res.status != 0) {

                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });

                $('#link_login').click();
                // 因为jq没有reset这个方法，需要把jq转换成dom对象才能用这个方法
                $('#form_reg')[0].reset();

            }
        });
    });

    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#form_login').serialize(),
            success: (res) => {
                console.log(res);
                // 登录失败
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }


                location.href = '/index.html'

                localStorage.setItem('token', res.token);

                // $('#form_login')[0].reset();

            }
        });
    });
});