/** 
 *  10000 以内的代码用于标准错误，类似 HTTP STATUS
 * 	1xxxx 系统级错误
 *  2xxxx 应用级错误
 *  3xxxx 业务级错误
 */ 
const errorCodes = {
    error: {
        error_code: 10000,
        error_msg: 'error'
    },
    syserr: {
        error_code: 10001,
        error_msg: 'system error'
    },
    apiNotFound: {
        error_code: 10003,
        error_msg: 'API not found'
    },
    wrongArgs: {
        error_code: 20000,
        error_msg: '参数错误'
    },
    authFail: {
        error_code: 20001,
        error_msg: '认证失败'
    },
    weakPassword:{
        error_code:20002,
        error_msg:'密码必须包含数字和字母、可以包含下划线，长度8~16位字符'
    },
    notExist:{
        error_code:20003,
        error_msg:'对象不存在'
    },
    alreadyExists:{
        error_code:20004,
        error_msg:'对象已经存在，请勿重复'
    },
    permissionDenied:{
        error_code:20005,
        error_msg:'权限不足'
    }
}

export default errorCodes;
