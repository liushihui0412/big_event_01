baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(options) {
    options.url = baseURL + options.url;
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        options.complete = function(res) {
            console.log(res);
            console.log(res.responseJSON);
            let param = res.responseJSON;
            if (param.status == 1 && param.message === '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    }
});