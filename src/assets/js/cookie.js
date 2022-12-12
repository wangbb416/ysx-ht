/**
 * 获取cookie
 *
 * @export
 * @param {string} name
 * @returns
 */
 export function getCookie(name) {
    const strcookie = document.cookie; // 获取cookie字符串
    const arrcookie = strcookie.split("; "); // 分割
    // 遍历匹配
    for (let i = 0; i < arrcookie.length; i++) {
      const arr = arrcookie[i].split("=");
      if (arr[0] === name) {
        return arr[1];
      }
    }
  
    return "";
  }
  
  /**
   * 设置cookie
   *
   * @export
   * @param {string} name
   * @param {string} value
   * @param {number} day
   * @param {string} [path='/']
   */
  export function setCookie(name, value, day = 1) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * day);
    window.document.cookie = name + "=" + value + ";expires=" + d.toUTCString();
  }
  /**
   * 删除cookie 使cookie过期
   *
   * @export
   * @param {string} name
   * @param {string} [path='/']
   */
  export function deleteCookie(name) {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; ) {
        if (keys[i] === name) {
          document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
        }
      }
    }
  }
  
  /**
   * 清除所有cookie函数
   *
   * */
  export function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; ) {
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }
    }
  }
  