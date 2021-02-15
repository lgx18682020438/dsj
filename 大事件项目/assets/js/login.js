$(function () {

    var form = layui.form;
    // layui 密码校验
    form.verify({
        // 用户名格式校验
        username: [
            /^[\S]{3,12}$/, '用户必须3到12位，且不能出现空格'
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

    // 去注册/去登录
    $('.toggle').click(toggleClick);

    function toggleClick() {
        $('#reg-module').toggle();
        $('#login-module').toggle();
    }

    // 登录事件监听
    $('#login-module').submit(function (e) {
        e.preventDefault;
        $.ajax({
            type: 'POST', //请求的方式 例如 GET 或 POST
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != '0') return layer.msg(res.message);
                setLocal('token', res.token);
                location.href = 'index.html';
            }
        });
    });



    // 注册事件监听
    $('#reg-module').submit(function (e) {
        e.preventDefault;
        $.ajax({
            type: 'POST', //请求的方式 例如 GET 或 POST
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                if (res.status == '0') toggleClick();
                


            }
        });
    });

});