/* --------------------常量区--------------------------- */
const URLTITLE = 'http://ajax.frontend.itheima.net',
/* 保存到 localStorage */
setLocal = (k,v) => localStorage.setItem(k,JSON.stringify(v)),
/* 获取 localStorage */
getLocal = k => JSON.parse(localStorage.getItem(k)),
/* 删除 localStorage */
removeLocal = k => localStorage.removeItem(k);
/* ajax 请求时拼接头部 */
$.ajaxPrefilter(option => {
    if(option.url.indexOf('/my') != -1 ) option.headers = {Authorization : getLocal('token')}
    option.url = URLTITLE + option.url;
});
