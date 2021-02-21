$(function () {

    /* 定义查询对象 */
    let pram = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿
        total: 0
    };

    /* 页面展示 */
    function initUI(f) {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: pram,
            success: function (res) {
                if (res.status != '0') return layer.msg(res.message);
                pram.total = res.total;
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
                $('tbody').html(itemArr.join(''));
                //  渲染分页
                if (f)  renderPage();
                
            }
        });
    }
    /* 渲染分页 */
    function renderPage() {
        //执行一个laypage实例
        laypage.render({
            elem: 'page',
            count: pram.total,
            // 每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。	
            limit: pram.pagesize,
            jump: function (obj, first) {
                pram.pagenum = obj.curr;
                //首次不执行
                if (!first) initUI(false);
            }
        });
    }



    /* 初始化页面 */
    initUI(true);

    /* 查询按钮 */
    $('#queryForm').on('submit', function (e) {
        e.preventDefault();
        pram.cate_id = $('#cate_id').val();
        pram.state = $('#state').val();
        initUI(true);
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