$(function(){
    // 获取用户信息
    function getUserInfo (){
        $.ajax({
            type: 'GET', 
            url: '/my/userinfo',
            success: function (res) {
                if(res.status != '0') return layer.msg(res.message);
                users = res.data;
                form.val("upUser", users);
            },
            error : function(res){},
            complete : function(res){}
        });
    }
    getUserInfo();


    /* 表单提交按钮 */
    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST', 
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.message);
                $('#btnReset').click();
            },
            error : function(res){},
            complete : function(res){}
        });


    });
});
 