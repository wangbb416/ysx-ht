//手机号
export function phoneValid(rule, value, callback) {
    let reg = /^1[3456789]\d{9}$/
    if (value != '' && !(reg.test(value))) {
        callback(new Error('请输入正确的手机号码'));
    } else {
        callback();
    }
}

//字母或数字
export function IdNo(rule, value, callback) {
    let reg = /^[0-9a-zA-Z]+$/
    if (!reg.test(value) && value != '') {
        callback(new Error('你输入的字符不是数字或者字母'));
    } else {
        callback();
    }
}
//身份证
export function cardNum(rule, value, callback) {
    let reg = /^(\d{18}|\d{15}|\d{17}X)$/;
    if (!reg.test(value) && value != '') {
        callback(new Error('请填写正确的身份证号'));
    } else {
        callback();
    }
}

//验证是否字符串
export function idNoValid(rule, value, callback) {
    if (typeof value !== 'string') {
        callback(new Error('非法字符串'));
    } else {
        callback();
    }
}

//数字验证
export function intValid(rule, value, callback) {
    let reg = /^\+?[1-9][0-9]*$/
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('仅可填写整数'));
    }
}

//两位小数验证
export function twoDecimal(rule, value, callback) {
    let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入非负数字，最多两位小数'));
    }
}


//正负数-两位小数验证
export function positiveNegativeDecimal(rule, value, callback) {
    let reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入数字，最多只能两位小数'));
    }
}

//正数-三位小数验证
export function threeDecimal(rule, value, callback) {
    let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/
    if (new RegExp(reg).test(value)) {
        callback();
    } else {
        callback(new Error('请输入非负数字，最多三位小数'));
    }
}

//正数-三位小数 并且大于等于500验证
export function estimatedWeight(rule, value, callback) {
    let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/
    if (new RegExp(reg).test(value)) {
        var reg2 = /^(([5-9]\d{2})|([1-9]\d{3,}))(\.\d*)?$/;
       if(reg2.test(value)){
        callback();
       }else{
        callback(new Error('预估重量必须大于等于500公斤，最多三位小数'));
       }
    } else {
        callback(new Error('预估重量必须大于等于500公斤，最多三位小数'));
    }
}


//九位整数,四位小数验证
export function fourDecimal(rule, value, callback) {
    let reg = /^[1-9]\d{0,8}(\.\d{1,4})?$|^0(\.\d{1,4})?$/
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入数字，最多九位整数,四位小数'));
    }
}


//社会统一信用代码
export function checkSocialCreditCode(rule, value, callback) {
    if (value == '') {
        callback();
    }
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)[a-zA-Z\d]{18,}$/
    if (!reg.test(value)) {
        callback(new Error('请输入正确的社会统一信用代码！'));
    } else {
        callback();
    }
}

//邮箱验证
export function checkEmail(rule, value, callback) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!(reg.test(value))) {
        callback(new Error('请输入正确的邮箱地址'));
    } else {
        callback();
    }
}
//必须小数验证
export function decimalCheck(rule, value, callback) {
    let str = value+''
    let reg = /^[1-9][0-9]*([\.][0-9]*)?$/
    if (!(reg.test(value))) {
        callback(new Error('请输入正确的数字'));
    } else {
        if (str.indexOf('.')!=-1) {
            callback();
        } else {
            callback(new Error('请输入正确的数字'));
        }
        
    }
}
//经度验证
export function lonCheck(rule, value, callback) {
    // let str = value+''
    let reg = /^[1-9][0-9]*([\.][0-9]*)?$/
    if (!(reg.test(value))) {
        callback(new Error('请输入正确的经度'));
    } else {
        if (value<=180 && value>=0) {
            callback();
        } else {
            callback(new Error('请输入正确的经度'));
        }
        
    }
}
//维度验证
export function latCheck(rule, value, callback) {
    // let str = value+''
    let reg = /^[1-9][0-9]*([\.][0-9]*)?$/
    if (!(reg.test(value))) {
        callback(new Error('请输入正确的维度'));
    } else {
        if (value<=90 && value>=0) {
            callback();
        } else {
            callback(new Error('请输入正确的维度'));
        }
        
    }
}
// 手机号
export function cheackMobile(rule, value, callback){
    // const regMobile = /^([0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    const regMobile = /^[0-9]*[1-9][0-9]*$/
    if (regMobile.test(value)) {
      return callback()
    }
    callback(new Error('请输入合法的手机号!'))
  }


