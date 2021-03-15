let form = layui.form;
form.verify({
    nickname: function(value) {
        if (value.length < 1 || value.length > 6) {
            return '用户昵称长度为1~6之间';
        }
    }
});

let layer = layui.layer;
initUserInfo();

function initUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            form.val('formUserInfo', res.data);
        }
    });
}

$('#btnReset').on('click', function(e) {
    e.preventDefault();
    initUserInfo();
});

// 修改用户信息
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('恭喜您，修改信息成功');
            window.parent.getUserInfo();
        }
    });
})