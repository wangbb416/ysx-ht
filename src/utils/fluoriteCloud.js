import axios from "axios";

// 获取萤石云token
export function fluoritteCloud() {
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("appKey", "3d49ce7b5a684e14b80b423b15661f35");
    formData.append("appSecret", "0db9e4f83449a2d3052564a1e57a482e");
    let accessTokenInfo = localStorage.getItem('accessTokenInfo') ? JSON.parse(localStorage.getItem('accessTokenInfo')) : {expireTime: 0};
    let time = accessTokenInfo.expireTime;
    let currrentTime = (new Date()).valueOf();
    if (time <= currrentTime) {
      axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: process.env.yingshiBaseUrl + '/api/lapp/token/get',
        timeout: 30000,
        data: formData
      }).then(res => {
        if (res.data.code == 200) {
          let {data} = res.data
          data.timestamp = currrentTime;
          localStorage.setItem('accessTokenInfo', JSON.stringify(data));
          resolve()
        } else {
          localStorage.removeItem('accessTokenInfo');
          reject()
        }
      }).catch(error => {
        localStorage.removeItem('accessTokenInfo');
        reject()
      })
    } else {
      resolve()
    }
  })
}
