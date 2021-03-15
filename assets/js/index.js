$(function() {
    getUserInfo();
    let layer = layui.layer;
    $('#btnLogout').click(function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html';

            layer.close(index);
        });
    });
});

function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        }

    });
}

function renderAvatar(user) {
    console.log(user);
    // 渲染名字
    let name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);

    // 渲染头像
    // 1、如果有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text_avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text_avatar').show().html(text);
    }

}