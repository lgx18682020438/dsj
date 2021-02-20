$(function () {

    /* 定义查询对象 */
    let pram = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    };

    /* 页面展示 */
    function initUI() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: pram,
            success: function (res) {
                if (res.status != '0') return layer.msg(res.message);
                let itemArr = [];
                res.data.forEach(v =>
                    itemArr.push(`
                            <tr>
                                <td>${v.title}</td>
                                <td>${v.cate_name}</td>
                                <td>${v.pub_date}</td>
                                <td>${v.state}</td>
                                <td>
                                    <button type="button" class="layui-btn layui-btn-xs btn-edit">编辑</button>
                                    <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-del">删除</button>
                                </td>
                            </tr>
                    
                    `)
                );
                $('#tbody').html(itemArr.join(''));
            }
        });
    }

    /* 初始化页面 */
    initUI();

    /* 查询按钮 */
    $('#queryForm').on('submit', function (e) {
        e.preventDefault();
        pram.cate_id = $('#cate_id').val();
        pram.state = $('#state').val();
        initUI();
    });

    /* 动态添加分类 */
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != '0') return layer.msg(res.message);
            let itemArr = [];
            itemArr.push('<option value="">所有分类</option>');
            res.data.forEach(v =>
                itemArr.push(`<option value="${v.Id}">${v.name}</option>`)
            );
            $('#cate_id').html(itemArr.join(''));
            form.render();
        }
    });


});