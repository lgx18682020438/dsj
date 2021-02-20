$(function () {
    // 富文本
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

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

    /* 选择封面按钮 */
    // 上传按钮
    $('#upload').click(function () {
        $('#file').click();
    });

    $('#file').change(function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file);

        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    /* 文章提交和保存按钮 */
    $('#wzxg').submit(function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0]);
        fd.append('state', '');
        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布    
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 将 Canvas 画布上的内容，转化为文件对象    
            // 得到文件对象后，进行后续的操作  
            fd.append("cover_img", blob);

            $.ajax({
                type: 'POST',
                url: '/my/article/add',
                contentType : false,
                processData : false,
                data: fd,
                success: function (res) {
                    debugger;
                    console.log(res);
                }
            });

        });



    });
});