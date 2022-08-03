/* ----------------- 全局可用，小接口 --------------- */
import axios from "./axios";

// 根据 code 码 请求该 code 地址下的区域列表
export function addressRequest(data) {
  return axios({
    method: "get",
    url: `/regions/${data}/subRegions`
  });
}
// 图片上传
export function uploadAction(data) {
  return axios({
    method: "post",
    url: `/files/action/upload`,
    data: data
  });
}
