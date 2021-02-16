$(function(){
    // 获取 token
    let token = getLocal('token');
    // 判断是否登录
    if(!token) return location.href = 'login.html';
    // 获取用户信息
    function getUserInfo (){
        $.ajax({
            type: 'GET', 
            url: '/my/userinfo',
            success: function (res) {
                if(res.status != '0') return layer.msg(res.message);
                users = res.data;
                let username =  users.nickname || users.username;
                if(users.user_pic){
                    $('.myFirst').html(`<img src="${users.user_pic}" class="layui-nav-img">${username}`);
                }else{
                    let interceptName = username.substring(0,1).toUpperCase(); 
                    $('.myFirst').html(`<span class="layui-nav-img default-img">${interceptName}</span>欢迎 ${username}`);
                }
            },
            error : function(res){},
            complete : function(res){}
        });
    }
    
    getUserInfo();

    // 绑定退出事件
    $("#logOut").click(function(){
        layer.confirm('是否要退出当前用户？', {icon: 3, title:'温馨提示'}, function(index){
            if(index){
                removeLocal('token');
                location.href = 'login.html';
            }    
        });
    });

    

});