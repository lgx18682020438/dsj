/* 常量区 */
const URLTITLE = 'http://ajax.frontend.itheima.net';
/* 保存到 localStorage */
var setLocal = (k,v) => localStorage.setItem(k,JSON.stringify(v));
/* 获取 localStorage */
var getLocal = k => JSON.parse(localStorage.getItem(k));
/* ajax 请求时拼接头部 */
$.ajaxPrefilter(function(option){
    option.url = URLTITLE + option.url;
});
