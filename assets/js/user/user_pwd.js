// form表单是在layui里面的属性，如果想要调用.需要取出来
// layui表单验证
let form = layui.form;
form.verify({
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samepwd: function(value) {
        if (value === $('[name=oldPwd]').val()) {
            return '原密码与新密码一致！'
        }
    },
    repwd: function(value) {
        if (value != $('[name=newPwd]').val()) {
            return '确认新密码与新密码不一致！'
        }
    }
});

// 修改密码form表单提交信息
$('form').on('submit', function(e) {
    // 阻止默认跳转
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: (res) => {
            console.log(res);
            // 状态码不为0，代表修改失败
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }
            // 状态码为0，修改成功
            layui.layer.msg('恭喜你，修改密码成功', { icon: 6 });
            // 清空表单
            $('form')[0].reset();
        }
    });
})