$(function () {
    // 常量区
    const TYPETITLE = '添加文章分类',
        TYPECONTENT = `
            <form class="layui-form" id="commit-form">
                
                <div class="layui-form-item">
                    <label class="layui-form-label">分类名称</label>
                    <div class="layui-input-block">
                        <input type="text" name="name" required  lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
                    </div>
                </div>
                
                <div class="layui-form-item">
                    <label class="layui-form-label">分类别名</label>
                    <div class="layui-input-block">
                        <input type="text" name="alias" required  lay-verify="required" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
                    </div>
                </div>
                
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
                        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                    </div>
                </div>
            </form>`,
        EDITTITLE = '修改文章分类';


    // 获取文章分类
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != '0') return layer.msg(res.message);
                let trList = [];
                $.each(res.data, (i, v) => {
                    trList.push(`
                    <tr>
                        <td class="trId">${v.Id}</td>
                        <td>${v.name}</td>
                        <td>${v.alias}</td>
                        <td>
                            <button type="button" class="layui-btn layui-btn-xs btn-edit">编辑</button>
                            <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-del">删除</button>
                        </td>
                    </tr>`);
                });
                $('.layui-table tbody').html(trList.join(''));
            }
        });
    }

    initArtCateList();
    let index = null;
    // 类别管理按钮
    $('.type-mng').click(function () {
        index = layer.open({
            type: 1,
            title: TYPETITLE,
            area: ['500px', '250px'],
            content: TYPECONTENT
        });
    });

    // 绑定提交事件
    $('body').on('submit', '#commit-form', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != '0') return layer.msg(res.message);
                initArtCateList();
                layer.close(index);
            }
        });
    });

    // 绑定编辑事件
    let editWindow = null;
    $('tbody').on('click', '.btn-edit', function (e) {
        let val = $(e.target).parent().siblings('td');
        editWindow = layer.open({
            type: 1,
            title: EDITTITLE,
            area: ['500px', '250px'],
            content: `
                <form class="layui-form" id="edit-form">
                    <input type="hidden" name="Id" value="${val[0].innerText}">

                    <div class="layui-form-item">
                        <label class="layui-form-label">分类名称</label>
                        <div class="layui-input-block">
                            <input type="text" name="name" required value="${val[1].innerText}" lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    
                    <div class="layui-form-item">
                        <label class="layui-form-label">分类别名</label>
                        <div class="layui-input-block">
                            <input type="text" name="alias" required value="${val[2].innerText}" lay-verify="required" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
                        </div>
                    </div>
                    
                    <div class="layui-form-item">
                        <div class="layui-input-block">
                            <button class="layui-btn" lay-edit lay-filter="formDemo">确认修改</button>
                            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                        </div>
                    </div>
                </form>
            `
        });
    });

    // 绑定修改事件
    $('body').on('submit', '#edit-form', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != '0') return layer.msg(res.message);
                layer.msg(res.message);
                initArtCateList();
                layer.close(editWindow);
            }
        });
    });


    // 绑定删除事件
    $('tbody').on('click', '.btn-del', function (e) {
        let id = $(e.target).parent().siblings('td').eq(0).text();
        layer.confirm('是否删除该分类', {
            icon: 3,
            title: '温馨提示'
        }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status != '0') return layer.msg(res.message);
                    layer.msg(res.message);
                    initArtCateList();
                    layer.close(index);
                }
            });
        });
    });
});