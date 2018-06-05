'use strict'

const target = process.env.npm_lifecycle_event
if(target == 'test'){
    var confiObj = {
        NODE_ENV: '"production"',
        API_ROOT: '"http://octest.wechat.c.citic"'//测试地址
    }
}else if(target == 'build'){
    var confiObj = {
        NODE_ENV: '"production"',
        API_ROOT: '"http://octest.wechat.c.citic"'//生产地址
    }
}




module.exports = confiObj