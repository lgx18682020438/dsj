/* --------------------常量区--------------------------- */
const URLTITLE = 'http://ajax.frontend.itheima.net',
      URLTITLETEST = 'http://www.liulongbin.top:3007',
    //获取form模块
    form = layui.form,
    //获取upload模块
    upload = layui.upload,
    // 保存到 localStorage
    setLocal = (k, v) => localStorage.setItem(k, JSON.stringify(v)),
    // 获取 localStorage 
    getLocal = k => JSON.parse(localStorage.getItem(k)),
    // 删除 localStorage
    removeLocal = k => localStorage.removeItem(k),
    laypage = layui.laypage;
/* --------------------成员变量区--------------------------- */
// 用户对象
var users = null;
/* --------------------功能区--------------------------- */
/* ajax 请求时拼接头部 */
$.ajaxPrefilter(option => {
    if (option.url.indexOf('/my') != -1) option.headers = {
        Authorization: getLocal('token')
    }
    option.url = URLTITLE + option.url;
});

form.verify({
    // 用户名格式校验
    username: [
        /^[\S]{3,12}$/, '用户必须3到12位，且不能出现空格'
    ],
    // 昵称格式校验
    pickname: [
        /^[\S]{2,6}$/, '昵称必须在2到6位，且不能出现空格'
    ],
    // 密码格式校验
    pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 确认密码格式校验
    repwd: function (value) { //value：表单的值
        if (value !== $('.re-pwd').val()) {
            return '两次密码不一致';
        }
    }
});

// 获取用户信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != '0') return layer.msg(res.message);
            users = res.data;
            let username = users.nickname || users.username;
            if (users.user_pic) {
                $('.myFirst').html(`<img src="${users.user_pic}" class="layui-nav-img">${username}`);
            } else {
                let interceptName = username.substring(0, 1).toUpperCase();
                $('.myFirst').html(`<span class="layui-nav-img default-img">${interceptName}</span>欢迎 ${username}`);
            }
        },
        error: function (res) {},
        complete: function (res) {}
    });
}