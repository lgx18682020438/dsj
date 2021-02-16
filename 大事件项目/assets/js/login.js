$(function () {

    // 去注册/去登录 链接单击事件
    $('.toggle').click(toggleClick);

    function toggleClick() {
        $('#reg-module').toggle();
        $('#login-module').toggle();
    }

    // 登录事件监听
    $('#login-module').submit(function (e) {
        e.preventDefault();
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
        e.preventDefault();
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