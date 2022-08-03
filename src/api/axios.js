import axios from "axios";
import router from "../router";
import {Message} from "element-ui";

// 1.post 新增  json格式     2.get和delete  列表和删除  formdata格式   3.put 修改   一半json一半formdata

const api = process.env.api;

const server = axios.create({
  baseURL: api,
  headers: {"Content-Type": "application/json", client: "web"}
});

server.interceptors.request.use(
  function (config) {
    if (config.url == "/login/web") {
      return config;
    }
    // token失效
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


/**
 * 如果您想要获取诸如头或状态之类的http信息
 * 就 return  response => response
 */
server.interceptors.response.use(
  /**
   *通过自定义代码确定请求状态
   *这里只是一个例子
   *您还可以通过HTTP状态代码判断状态
   */
  response => {

    console.log("response====>", response,);

    if (response.config.responseType && response.config.responseType == 'blob') {
      return response.data;
    } else if (response.data.code == 200) {
      return response.data.data
    } else if (response.data.code == 401 || response.data.code == 40001) {
      // 重新登录
      router.push("/login");
      Message.error(response.data.msg);
      return -1;
    } else {
      Message.error(response.data.msg);
      return -1;
    }

  },
  error => {
    const res = error.response.data

    if (res.code == 401 || res.code == 40001) {
      // 重新登录
      router.push("/login");
      Message.error(res.msg);
      return -1;
    }

    return Promise.reject(error)
  }
)


export default server;
