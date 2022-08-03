import { Message } from "element-ui";
import Vue from "vue";

/**
 * 经纬度转换
 * longitude 经度，
 * latitude：纬度
 */
export const longitudeAndLatitude = (longitude = "0", latitude = "0") => {
  let temp_longitude = "0";
  let temp_latitude = "0";
  longitude = String(longitude);
  latitude = String(latitude);
  if (longitude.indexOf(".") !== -1) {
    let arr = longitude.split(".");
    temp_longitude = arr[0] + "°" + arr[1] + "′";
  } else {
    temp_longitude = longitude + "°";
  }

  if (latitude.indexOf(".") !== -1) {
    let arr = latitude.split(".");
    temp_latitude = arr[0] + "°" + arr[1] + "′";
  } else {
    temp_latitude = latitude + "°";
  }
  return {
    longitude: temp_longitude,
    latitude: temp_latitude
  };
};
// 经纬度处理
export const formatterLatLog = function(loc) {
  var locArr = loc.split(",");
  var lat = locArr[0];
  var log = locArr[1];

  function getData(deg) {
    // console.log('deg', deg);
    var du = deg.split(".")[0];
    var min = "";
    // console.log('du', du);
    if (deg.split(".")[1] && deg.split(".")[1] !== "0")
      min = (("0" + "." + deg.split(".")[1]) * 60).toFixed(3);
    return du + "°" + (min ? min + "′" : "");
  }

  // console.log(lat);

  return [
    getData(lat) + (lat.includes("-") ? "W" : "E"),
    getData(log) + (lat.includes("-") ? "S" : "N")
  ];
};
/**
 * 根据传递的时间或当前时间返回年月日时分秒对象出去
 * @dateObj传递的话就计数传递的时间，不传递为当前时间戳 (ms)
 */
export const dateGrain = dateObj => {
  let dateT = dateObj ? new Date(dateObj * 1) : new Date();
  let dateYear = dateT.getFullYear();
  let dateMonth = dateT.getMonth() + 1;
  let dateDay = dateT.getDate();
  let dateHours = dateT.getHours();
  let dateMinute = dateT.getMinutes();
  let dateSecond = dateT.getSeconds();
  return {
    dateYear: dateYear,
    dateMonth: dateMonth < 10 ? "0" + dateMonth : dateMonth,
    dateDay: dateDay < 10 ? "0" + dateDay : dateDay,
    dateHours: dateHours < 10 ? "0" + dateHours : dateHours,
    dateMinute: dateMinute < 10 ? "0" + dateMinute : dateMinute,
    dateSecond: dateSecond < 10 ? "0" + dateSecond : dateSecond
  };
};

/**
 * 时间格式
 * seconds： 时间戳，
 * type：类型
 */
export const getFormatTime = (seconds, type) => {
  if(!seconds){
    return ""
  }
  let {
    dateYear,
    dateMonth,
    dateDay,
    dateHours,
    dateMinute,
    dateSecond
  } = dateGrain(seconds);
  let temp_time = "";
  switch (type) {
    case "dateYear": //获取到年
      temp_time = `${dateYear}`;
      break;
    case "dateMonth": //获取到月
      temp_time = `${dateYear}-${dateMonth}`;
      break;
    case "dateDay": //获取到天
      temp_time = `${dateYear}-${dateMonth}-${dateDay}`;
      break;
    default:
      temp_time = `${dateYear}-${dateMonth}-${dateDay} ${dateHours}:${dateMinute}:${dateSecond}`;
      break;
  }
  return temp_time;
};

/**
 * 时间戳判断是否为今天昨天甚至更早时间
 * dataTime： 时间格式或时间戳
 */
export const checkTime = dataTime => {
  let timestamp = dataTime;

  if (isNaN(dataTime) && !isNaN(Date.parse(dataTime))) {
    console.log("data是日期格式！");
    timestamp = Date.parse(dataTime);
  }

  let date = new Date(timestamp);
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  // today 为今天凌晨的时间
  let dayTime = 24 * 60 * 60 * 1000;
  let delta = today - date; // 得到相差的时间 ms
  if (delta > 0) {
    if (delta <= dayTime) {
      return "昨天";
    }
    // else if (delta <= 2 * dayTime) {
    //   return '前天'
    // }
  } else if (-delta < dayTime) {
    return "今天";
  }
  return dataTime;
};

/**
 * 根据时间戳计算具体持续时间,天 时 分 秒
 * timeStamp： 时间戳，
 */
export const continueDateTime = timeStamp => {
  var days = parseInt(timeStamp / (1000 * 60 * 60 * 24));
  var hours = parseInt((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = ((timeStamp % (1000 * 60)) / 1000).toFixed(0);
  return days > 0
    ? days + " 天 "
    : "" + hours > 0
    ? hours + " 小时 "
    : "" + minutes > 0
    ? minutes + " 分钟 "
    : "" + seconds > 0
    ? seconds + " 秒 "
    : "";
};

/*
小数保留两位，整数不保留,返回字符串
*/
export const handleDecimal = (num, n, unit = null) => {
  if (!num) {
    if (num == 0) {
      return unit ? `0${unit}` : "0";
    }
    return "";
  }
  let num1 = Number(num);
  let num2 = Number(num1.toFixed(n));
  if (num1 == num2) {
    return unit ? `${num1}${unit}` : `${num1}`;
  } else {
    return unit ? `${num1.toFixed(n)}${unit}` : num1.toFixed(n);
  }
};

/*
导出文件
* */
export function exportXlsx(filename, param, apiMethod) {
  apiMethod(param, { responseType: "blob", emulateJSON: true })
    .then(res => {
      console.log("res", res);

      let url = window.URL.createObjectURL(new Blob([res]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.download = `${filename}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => {
      Message.error("列表文件导出失败!", error);
    });
}
