$(function () {


    var form = layui.form;
 

    // layui 密码校验
    form.verify({
        username : [
            /^[\S]{6,12}$/, '用户必须6到12位，且不能出现空格'
        ],
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });

    // 去注册/去登录
    $('.toggle').click(function () {
        $('#reg-module').toggle();
        $('#login-module').toggle();
    });



});