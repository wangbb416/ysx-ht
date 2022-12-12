export const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
        [year, month, day].map(formatNumber).join("/") +
        " " + [hour, minute, second].map(formatNumber).join(":")
    );
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : "0" + n;
};

/**
 * 根据时间戳返回不同类型时间
 */
export const timeStampSwitch = (dateObj, type = "seconds", status = "") => {
    //status yyyy/mmmm/dddd2021年01月01日  yy/mm/ss2021-01-01 yy.mm.dd2021.01.01
    let dateT = dateObj ? new Date(dateObj * 1) : new Date();
    let dateYear = dateT.getFullYear();
    let dateMonth = dateT.getMonth() + 1;
    let dateDay = dateT.getDate();
    let dateHours = dateT.getHours();
    let dateMinute = dateT.getMinutes();
    let dateSecond = dateT.getSeconds();
    if (dateMonth < 10) {
        dateMonth = "0" + dateMonth;
    }
    if (dateDay < 10) {
        dateDay = "0" + dateDay;
    }
    if (dateHours < 10) {
        dateHours = "0" + dateHours;
    }
    if (dateMinute < 10) {
        dateMinute = "0" + dateMinute;
    }
    if (dateSecond < 10) {
        dateSecond = "0" + dateSecond;
    }
    if (type === "year") {
        if (status) {
            return dateYear;
        } else {
            return dateYear + "年";
        }
    } else if (type === "month") {
        if (status) {
            if (status == "yyyy/mmmm/dddd") {
                return dateYear + "年" + dateMonth + "月";
            }
            if (status == "yy/mm/dd") {
                return dateYear + "-" + dateMonth;
            }
            if (status == "yy.mm.dd") {
                return dateYear + "." + dateMonth;
            }
        } else {
            return dateYear + "." + dateMonth;
        }
    } else if (type === "day") {
        if (status) {
            if (status == "yyyy/mmmm/dddd") {
                return dateYear + "年" + dateMonth + "月" + dateDay + "日";
            }
            if (status == "yy/mm/dd") {
                return dateYear + "-" + dateMonth + "-" + dateDay;
            }
            if (status == "yy.mm.dd") {
                return dateYear + "." + dateMonth + "." + dateDay;
            }
            if (status == "mm/dd") {
                return dateMonth + "/" + dateDay;
            }
        } else {
            return dateYear + "." + dateMonth + "." + dateDay;
        }
    } else if (type === "hours") {
        if (status) {
            if (status == "yyyy/mmmm/dddd") {
                return (
                    dateYear + "年" + dateMonth + "月" + dateDay + "日" + " " + dateHours
                );
            }
            if (status == "yy/mm/dd") {
                return dateYear + "-" + dateMonth + "-" + dateDay + " " + dateHours;
            }
            if (status == "yy.mm.dd") {
                return dateYear + "." + dateMonth + "." + dateDay + " " + dateHours;
            }
        } else {
            return dateYear + "." + dateMonth + "." + dateDay + " " + dateHours;
        }
    } else if (type === "minute") {
        if (status) {
            if (status == "yyyy/mmmm/dddd") {
                return (dateYear + "年" + dateMonth + "月" + dateDay + "日" + " " + dateHours + ":" + dateMinute);
            }
            if (status == "yy/mm/dd") {
                return (dateYear + "-" + dateMonth + "-" + dateDay + " " + dateHours + ":" + dateMinute);
            }
            if (status == "yy.mm.dd") {
                return (dateYear + "." + dateMonth + "." + dateDay + " " + dateHours + ":" + dateMinute);
            }
        } else {
            return (dateYear + "." + dateMonth + "." + dateDay + " " + dateHours + ":" + dateMinute);
        }
    } else if (type === "seconds") {
        if (status) {
            if (status == "yyyy/mmmm/dddd") {
                return (dateYear + "年" + dateMonth + "月" + dateDay + "日" + " " + dateHours + ":" + dateMinute + ":" + dateSecond);
            }
            if (status == "yy/mm/dd") {
                return (dateYear + "-" + dateMonth + "-" + dateDay + " " + dateHours + ":" + dateMinute + ":" + dateSecond);
            }
            if (status == "yy.mm.dd") {
                return (dateYear + "." + dateMonth + "." + dateDay + " " + dateHours + ":" + dateMinute + ":" + dateSecond);
            }
        } else {
            return (dateYear + "." + dateMonth + "." + dateDay + " " + dateHours + ":" + dateMinute + ":" + dateSecond);
        }
    } else {
        if (status) {
            return (dateYear + "-" + dateMonth + "-" + dateDay + " " + dateHours + ":" + dateMinute + ":" + dateSecond);
        } else {
            return (dateYear + "." + dateMonth + "." + dateDay + " " + dateHours + ":" + dateMinute + ":" + dateSecond);
        }
    }
};

/**
 * 可以根据转入的天数获取前面某天的开始与结束时间戳
 * @param {number} num 前面几天
 */

export const getDayStartEndTime = (num = 1) => {
    // 一天的毫秒数
    let MillisecondsADay = 24 * 60 * 60 * 1000 * num;

    // 今日开始时间戳
    let todayStartTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();

    // 今日结束时间戳
    let todayEndTime = new Date(new Date().setHours(23, 59, 59, 999)).getTime();

    // 昨日开始时间戳
    let startTime = todayStartTime - MillisecondsADay;

    // 昨日结束时间戳
    let endTime = todayEndTime - MillisecondsADay

    return {
        startTime,
        endTime
    }
}

/**
 * 可以根据转入的参数获取前面几个月前的开始与结束时间戳
 * @param {number} num 前面几个月
 */
export const getMonthStartEndTime = (num = 1) => {
    let nowdate = new Date();

    nowdate.setMonth(nowdate.getMonth() - num); //上个月

    let y = nowdate.getFullYear();
    let m = nowdate.getMonth() + 1;

    let startTime = new Date(y, m - 1, 1).getTime(); // 月开始时间
    let endTime = new Date(y, m, 1).getTime() - 1; // 月结束时间

    return {
        startTime,
        endTime
    }

}

/**
 * 获取视频时间
 */
export const videoFormatTime = (duration = 0) => {
    if (!duration && duration != 0) {
        return duration;
    }
    if (isNaN(duration)) {
        return duration;
    }
    let theTime = duration * 1; //秒
    let middle = 0; //分
    let hour = 0; //小时
    if (theTime > 59) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
    }
    if (middle > 59) {
        hour = parseInt(middle / 60);
        middle = parseInt(middle % 60);
    }
    if (theTime < 60 && middle == 0 && hour == 0) {
        theTime = Number(theTime.toString().match(/^\d+(?:\.\d{0,1})?/)); //保留一位小数
        return theTime + "秒";
    } else if (0 < middle < 60 && hour == 0) {
        theTime = Number(theTime.toString().match(/^\d+(?:\.\d{0,0})?/)); //转化为整数秒
        theTime < 10 ? (theTime = "0" + theTime) : (theTime = theTime);
        middle < 10 ? (middle = "0" + middle) : (middle = middle);
        return middle + ":" + theTime;
    } else {
        theTime = Number(theTime.toString().match(/^\d+(?:\.\d{0,0})?/)); //转化为整数秒
        theTime < 10 ? (theTime = "0" + theTime) : (theTime = theTime);
        middle < 10 ? (middle = "0" + middle) : (middle = middle);
        hour < 10 ? (hour = "0" + hour) : (hour = hour);
        return hour + ":" + middle + ":" + theTime;
    }
};

/**
 * 给定一个日期，给一个天数 计算日期加天数后的日期
 * */
export const dateAddDays = (dateStr, dayCount) => {
    var tempDate = new Date(dateStr.replace(/-/g, "/").replace(/[.]/g, "/")); //把日期字符串转换成日期格式
    var resultDate = new Date((tempDate / 1000 + 86400 * dayCount) * 1000); //增加n天后的日期
    let dateYear = resultDate.getFullYear();
    let dateMonth = resultDate.getMonth() + 1;
    let dateDay = resultDate.getDate();
    if (dateMonth < 10) {
        dateMonth = "0" + dateMonth;
    }
    if (dateDay < 10) {
        dateDay = "0" + dateDay;
    }
    var resultDateStr = dateYear + "." + dateMonth + "." + dateDay; //将日期转化为字符串格式
    return resultDateStr;
};

/**
 * 计算剩余 天、时、分、秒
 * dateTime 结束时间
 */
export const countDown = dateTime => {
    let EndTime = new Date(dateTime * 1);
    let NowTime = new Date();
    let t = EndTime.getTime() - NowTime.getTime();
    if (t > 0) {
        let d = parseInt(t / 1000 / 60 / 60 / 24);
        let h = parseInt((t / 1000 / 60 / 60) % 24);
        let m = parseInt((t / 1000 / 60) % 60);
        let s = parseInt((t / 1000) % 60);
        if (d > 0) {
            d < 10 ? (d = "0" + d) : (d = d);
            return d + "天";
        } else {
            if (h > 0) {
                h < 10 ? (h = "0" + h) : (h = h);
                return h + "小时";
            } else {
                if (m > 0) {
                    m < 10 ? (m = "0" + m) : (m = m);
                    return m + "分钟";
                } else {
                    if (s > 0) {
                        s < 10 ? (s = "0" + s) : (s = s);
                        return s + "秒";
                    }
                }
            }
        }
    } else {
        return "已到期";
    }
};

/**
 * 精确计算
 * 计算剩余 天、时、分、秒
 * dateTime 结束时间
 */
export const accurateCountDown = dateTime => {
    let EndTime = new Date(dateTime * 1);
    let NowTime = new Date();
    let t = EndTime.getTime() - NowTime.getTime();
    if (t > 0) {
        let d = parseInt(t / 1000 / 60 / 60 / 24);
        let h = parseInt((t / 1000 / 60 / 60) % 24);
        let m = parseInt((t / 1000 / 60) % 60);
        let s = parseInt((t / 1000) % 60);
        let resultStr = "";
        d < 10 ? (d = "0" + d) : (d = d);
        resultStr = d + "天";

        //这里暂时只要返回天数
        // h < 10 ? h = '0' + h : h = h;
        // resultStr = resultStr + h + '小时'

        // m < 10 ? m = '0' + m : m = m;
        // resultStr = resultStr + m + '分钟'

        // s < 10 ? s = '0' + s : s = s;
        // resultStr = resultStr + s + '秒'

        return resultStr;
    } else {
        return "已到期";
    }
};

/**
 * 计数以万为单位
 * thousand
 */
export const thousandCount = (arg, num) => {
    if (!arg && arg != 0) {
        return arg;
    }
    if (isNaN(arg)) {
        return arg;
    }
    if (arg == 0) {
        return 0;
    } else {
        let newNum;
        if (num) {
            newNum = new RegExp("^\\d+(?:\\.\\d{0," + num + "})?");
        } else {
            newNum = /^\d+(?:\.\d{0,1})?/;
        }
        if (arg - 10000 > 0) {
            return Number((arg / 10000).toString().match(newNum)) + "W"; //保留两位小数
        } else {
            return arg;
        }
    }
};
/**
 * 定义一个深拷贝函数  接收目标target参数
 * */
export const deepClone = target => {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === "object") {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]));
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
};

/**
 *  base64加密，配合encodeURIComponent使用
 */
export const base64Encode = str => {
    var c1, c2, c3;
    var base64EncodeChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var i = 0,
        len = str.length,
        strin = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt((c1 & 0x3) << 4);
            strin += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            strin += base64EncodeChars.charAt(c1 >> 2);
            strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            strin += base64EncodeChars.charAt((c2 & 0xf) << 2);
            strin += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        strin += base64EncodeChars.charAt(c1 >> 2);
        strin += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        strin += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        strin += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return strin;
};

/**
 *  base64解码，配合decodeURIComponent使用
 */

export const base64Decode = input => {
    var base64EncodeChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
        enc1 = base64EncodeChars.indexOf(input.charAt(i++));
        enc2 = base64EncodeChars.indexOf(input.charAt(i++));
        enc3 = base64EncodeChars.indexOf(input.charAt(i++));
        enc4 = base64EncodeChars.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }
    }
    return utf8_decode(output);
};

const utf8_decode = utftext => {
    // utf-8解码
    var string = "";
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if (c > 191 && c < 224) {
            c1 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
            i += 2;
        } else {
            c1 = utftext.charCodeAt(i + 1);
            c2 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(
                ((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63)
            );
            i += 3;
        }
    }
    return string;
};

/**
 * 密码长度不小于6位，包含数字、字母大、小写、符号中的至少3种
 */
export const regPass = arg => {
    var regUpper = /[A-Z]/;
    var regLower = /[a-z]/;
    var regNum = /[0-9]/;
    var regSpecial = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]"
    );
    var complex = 0;
    if (regLower.test(arg)) {
        ++complex;
    }
    if (regUpper.test(arg)) {
        ++complex;
    }
    if (regNum.test(arg)) {
        ++complex;
    }
    if (regSpecial.test(arg)) {
        ++complex;
    }
    if (complex < 3 || arg < 6) {
        return false;
    } else {
        return true;
    }
};

//转换人民币带小数点，
export const analysisCurrency = argument => {
    if (!argument) {
        return argument;
    }
    if (isNaN(argument)) {
        return argument;
    }
    let str = null;
    if (typeof argument === "number") {
        str = argument.toString();
    } else if (typeof argument === "string") {
        str = argument;
    }
    let newStr = "";
    let count = 0;
    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr + ".00"; //自动补小数点后两位
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return str;
};

/**
 * 生成uuid
 */
export const uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

/**
 * 过滤相同的id的数组对象
 */
export const filterRepeat = function (arg, argID) {
    for (var i = 0; i < arg.length; i++) {
        for (var j = i + 1; j < arg.length;) {
            if (arg[i].argID == arg[j].argID) {
                //通过传递过来的argID属性进行匹配；
                arg.splice(j, 1); //去除重复的对象；
            } else {
                j++;
            }
        }
    }
    return arg;
};

/**
 * 过滤相同的id和同时数据类型相同的数组对象
 */
export const filterTypeRepeat = function (arg) {
    for (var i = 0; i < arg.length; i++) {
        for (var j = i + 1; j < arg.length;) {
            if (
                arg[i].id == arg[j].id &&
                arg[i].problem_type == arg[j].problem_type
            ) {
                //通过id属性进行匹配；
                arg.splice(j, 1); //去除重复的对象；
            } else {
                j++;
            }
        }
    }
    return arg;
};

/**
 * 解析URL自带参数值，
 * 没有解析到返回null
 */
export const getUrlQuery = function (key) {
    let reg = new RegExp("(^|\\?|&)" + key + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.href.substr(1).match(reg); //匹配目标参数
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null; //返回参数值
};

/**
 * 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
 *
 */
export const isNumber = function (val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
};

//返回数据类型
const _dataType = function (val) {
    return Object.prototype.toString.call(val)
}
/**
 * 把数据缓存sessionStorage中
 * @param {any} val 任意类型，目前只缓存几个基础类型
 * @param {String} key 缓存的key值
*/
export const _cacheData = function (val, key) {
    let type = _dataType(val)
    let tempKey = key ? key + "__" + type : "__" + type
    switch (type) {
        case '[object String]': //字符串
            sessionStorage.setItem(tempKey, val);
            break;
        case '[object Number]': //数字
            sessionStorage.setItem(tempKey, val);
            break;
        case '[object Boolean]': //布尔
            sessionStorage.setItem(tempKey, val);
            break;
        case '[object Array]': //数组
            sessionStorage.setItem(tempKey, JSON.stringify(val));
            break;
        case '[object Object]': //对象
            sessionStorage.setItem(tempKey, JSON.stringify(val));
            break;
        case '[object Function]': //函数

            break;
        case '[object Undefined]': //未定义

            break;
        case '[object Null]': //null

            break;
        case '[object Date]': //日期

            break;
        case '[object RegExp]': //正则

            break;
        case '[object Error]': //错误信息

            break;
        case '[object Symbol]': //Symbol唯一标识符

            break;
        case '[object HTMLDocument]': //DOC文档

            break;
        case '[object global]': //window 是全局对象 global 的引用

            break;
        default:
            break;
    }
}


/**
 * 解构通过vue的store存到sessionStorage里面的数据
 * 暂时只对字符串、数字、布尔、数组、对象进行解构
 * 需要遵循key__[object **]格式的值
*/
export const _vueStoreSessionStorage = function (key, val) {
    if (key.indexOf("__[object") !== -1) {//是通过vue的store仓库存储的数据
        let arr = key.split("__");
        if (arr && arr.length === 2 && arr[0] && arr[0].length) {
            let str = arr[0];
            str = str.replace(str[0], str[0].toUpperCase());
            switch (arr[1]) {
                case '[object String]': //字符串
                    return {
                        lowercase_key: arr[0],
                        capitalize_key: str,
                        value: val
                    }
                case '[object Number]': //数字
                    return {
                        lowercase_key: arr[0],
                        capitalize_key: str,
                        value: val * 1 //强制类型转换
                    }
                case '[object Boolean]': //布尔
                    return {
                        lowercase_key: arr[0],
                        capitalize_key: str,
                        value: val === 'false' || !val ? false : true
                    }
                case '[object Array]': //数组
                    return {
                        lowercase_key: arr[0],
                        capitalize_key: str,
                        value: JSON.parse(val)
                    }
                case '[object Object]': //对象
                    return {
                        lowercase_key: arr[0],
                        capitalize_key: str,
                        value: JSON.parse(val)
                    }
                case '[object Function]': //函数
                    return false
                case '[object Undefined]': //未定义
                    return false
                case '[object Null]': //null
                    return false
                case '[object Date]': //日期
                    return false
                case '[object RegExp]': //正则
                    return false
                case '[object Error]': //错误信息
                    return false
                case '[object Symbol]': //Symbol唯一标识符
                    return false
                case '[object HTMLDocument]': //DOC文档
                    return false
                case '[object global]': //window 是全局对象 global 的引用
                    return false
                default:
                    return false
            }
        } else {
            return false
        }
    } else {
        return false
    }

}

// 校验字符串 -- 必填、长度
// maxlength -- 1.输入框字符串的最大长度  2.选择下拉框传null（只校验必填）
export const checkString = function (rule, value, callback, firstFields, firstFieldsTemplate, maxlength, fieldName) {
    // console.log("checkString", value);
    if (Array.isArray(value) && !value.length || !value && value !== 0) {
        callback(new Error(fieldName));
    }
    else if (maxlength && value.length > maxlength) {
        callback(new Error(`最多为${maxlength}个字符`));
    } else {
        callback();
    }
}



// 校验手机号 -- 必填、长度
export const checkNumber = function (rule, value, callback, firstFields, firstFieldsTemplate, length, fieldName) {
    // console.log("checkNumber", typeof value);
    if (value === "" || value === null || value === undefined) {
        callback(new Error(fieldName));
    }
    else if (value.length != length) {
        callback(new Error(`请输入${length}位数字`));
    }
    else {
        callback();
    }
}

// 处理电话输入框
export const handlePhone = function (value, form, file) {
    if (value) {
        let newValue = value.replace(/^(0+)|[^\d]+/g, "").replace(/(\d{11})\d*/, "$1"); // 以0开头或者输入非数字，会被替换成空
        form[file] = newValue
    }
}

// 处理数字，超过的长度length过滤掉
export const handleNumber = function (value, form, file, length) {
    if (value && length) {
        let patt = new RegExp(`(\\d{${length}})\\d*`)
        let newValue = value.replace(/[^\d]+/g, "").replace(patt, "$1");
        form[file] = newValue
    }
}

// 处理小数，超过的小数点长度length过滤掉
export const handleDecimal = function (value, form, file, decimalLength, integerLength) {
    if (value) {
        // 1.去除非数字非小数点的字母 
        let value1 = value.replace(/[^\d|^.]+/g, "")
        console.log("----------", value1)
        if (value1.startsWith(".")) {
            form[file] = ""
            return
        }

        // 2.去除第二位小数点后面的数据
        let value2 = value1.replace(/((\d+)\.(\d*))\.*/g, "$1")

        // 3.去除前置0
        let value3 = value2
        if (value2.length > 1 && value2[0] === "0" && value2[1] !== ".") {
            value3 = value2.replace(/^(0+)/g, "")
        }

        // 小数点后面保留length位
        let value4 = value3
        if (decimalLength) {
            if (value3.indexOf(".") != -1) {
                let patt = new RegExp(`(\\d+\.\\d{${decimalLength}})(.*)`, 'g')
                value4 = value3.replace(patt, "$1");
            }
        }

        form[file] = value4
    }
}

export default {
    formatTime,
    timeStampSwitch,
    getDayStartEndTime,
    getMonthStartEndTime,
    videoFormatTime,
    deepClone,
    countDown,
    accurateCountDown,
    thousandCount,
    base64Encode,
    base64Decode,
    regPass,
    analysisCurrency,
    uuid,
    getUrlQuery,
    filterRepeat,
    filterTypeRepeat,
    isNumber,
    dateAddDays,
    _cacheData,
    _vueStoreSessionStorage,
    checkString,
    checkNumber,
};


