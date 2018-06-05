// 配置API接口地址
var root = '/work-weixin-cms-server'
    // 引用axios
var axios = require('axios')
    // 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
function errDrag(con){
    var err_drag = document.getElementsByClassName('err_drag')
    var err_con = document.getElementsByClassName('err_con')
    err_drag["0"].style.display = 'block'
    err_con["0"].innerHTML= con
}
function apiAxios(method, url, params, success,error) {
    if (params) {
        params = filterNull(params)
    }
    axios({
            method: method,
            url: url,
            params: params,
            baseURL: root,
            headers: {
                Authorization: sessionStorage['token']
            },
            withCredentials: false
        })
        .then(function(res) {
            if(res.data.message){
                errDrag('<b>API ERROR</b> : message' +　res.data.message +'url:'+url)
                return
            }
            if(res.code){
                if(res.code == 0){
                    success(res);
                }else{
                    if(error){
                        error(res)
                    }
                }
            }else{
                success(res);
            }
            
        })
        .catch(function(err) {
            if (err) {
                let res = err.response;
                if(res){
                    if (res.status == "401") {
                        errDrag("登录信息失效,重新登录！！！");
                        // location.href = '/'
                    }else{
                        errDrag('<b>API ERROR</b> : HTTP CODE: ' + res.status + 'url:'+url)
                    }
                }else{
                    errDrag('<b>API ERROR</b> : ' + err +' , url:'+url)
                }
                
            }
        });
}

// 返回在vue模板中的调用接口
export default {
    get: function(url, params, success,error) {
        return apiAxios('GET', url, params, success,error)
    },
    post: function(url, params, success,error) {
        return apiAxios('POST', url, params, success,error)
    },
    put: function(url, params, success,error) {
        return apiAxios('PUT', url, params, success,error)
    },
    delete: function(url, params, success,error) {
        return apiAxios('DELETE', url, params, success,error)
    }
}