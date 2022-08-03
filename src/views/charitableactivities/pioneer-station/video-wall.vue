<template>
  <div class="monitor-list">
    <MyBread :titleList="titleList"></MyBread>

    <div class="monitor-wrap">
      <div class="monitor-item" v-for="(item, index) in showList" :key="index">
        <div class="monitor-des">{{ item.videoDesc }}</div>
        <img
          @click="handleFull(item)"
          class="monitor-full"
          src="../../../assets/imgs/monitor/full_screen_video.png"
          alt=""
          srcset=""
          draggable="false"
        />
        <div :id="item.monitorId"></div>
      </div>
    </div>

    <div class="page-wrap" v-if="serialNoList.length > 9">
      <div @click="handleNext" class="next-page" v-fastClick="1500">
        {{ currentPage === 1 ? "下一页" : "上一页" }}
      </div>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import EZUIKit from "ezuikit-js";
import { v4 as uuidv4 } from "uuid";
import { getMonitorVideo } from "@/api";
// import notAccept from '@/assets/imgs/monitor/notAccept.png'

export default {
  name: "pioneer-station-video-wall",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch,
    MyDialog,
    MyForm
  },
  data() {
    return {
      // notAccept: notAccept,
      player: null,
      monitorList: [],
      showList: [],
      currentPage: 1,
      videoData: {},
      titleList: [
        { name: "公益活动", path: "" },
        { name: "先锋驿站", path: "/ysx/pioneer-station" },
        { name: "视频墙", path: "" }
      ],
      serialNoList: ["G07946308"]
    };
  },
  watch: {},
  created() {
    this.initPage();
  },
  mounted() {},
  methods: {
    async initPage() {
      // let serialNoList = ['G07946308', "G22049544", "J31747328", "F47095506", "F50179906", "F52595285",
      //   "F52595307", "F94402727", "F50179902", "F79197931", "F50180009", "F94843794", "J06479471", "J28558860", "J06479458", "F52595297", "F52595365", "F79197935"]

      let serialNoList = this.serialNoList;

      getMonitorVideo({ serialNoList })
        .then(res => {
          if (res != -1) {
            if (res && res.length) {
              let tempList = [];
              serialNoList.forEach(val => {
                console.log("adsfgasdf");
                res.map(item => {
                  if (val === item.videoSerialNo) {
                    tempList.push({
                      monitorId: uuidv4(),
                      monitorSrc: `ezopen://open.ys7.com/${item.videoSerialNo}/${item.channal}.live`,
                      player: null,
                      ...item
                    });
                  }
                });
              });
              this.monitorList = [...tempList];
              this.$nextTick(() => {
                this.nextData();
              });
            }
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    handleFull(arg) {
      arg.player.fullScreen();
    },
    handleNext() {
      if (this.currentPage === 1) {
        this.currentPage = 2;
      } else {
        this.currentPage = 1;
      }
      this.nextData();
    },
    nextData() {
      let tempData = [];
      this.monitorList.map((item, index) => {
        if (this.currentPage === 1) {
          if (index <= 8) {
            tempData.push({ ...item });
          }
        } else {
          if (index > 8) {
            tempData.push({ ...item });
          }
        }
        // item.player = new EZUIKit.EZUIKitPlayer({
        //     id: item.monitorId, // 视频容器ID
        //     accessToken: JSON.parse(localStorage.getItem('accessTokenInfo')).accessToken,
        //     url:item.monitorSrc,
        //     template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
        //     // header:['capturePicture','save'],
        //     // footer:['fullScreen'],
        //     width:576, // 宽度高度为容器规格，将按照窗口数均分
        //     height:240,
        // })
      });
      console.log("this.monitorList===>", this.monitorList);
      console.log("tempData===>", tempData);
      this.showList = [];
      this.showList = tempData;
      this.$nextTick(() => {
        this.renderMonitor();
      });
    },
    renderMonitor() {
      this.$nextTick(() => {
        this.showList.map(item => {
          item.player = new EZUIKit.EZUIKitPlayer({
            id: item.monitorId, // 视频容器ID
            accessToken: JSON.parse(localStorage.getItem("accessTokenInfo"))
              .accessToken,
            url: item.monitorSrc,
            template: "simple", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
            // header:['capturePicture','save'],
            // footer:['fullScreen'],
            width: 400, // 宽度高度为容器规格，将按照窗口数均分
            height: 200
          });
        });
      });
    }
  },
  beforeDestroy() {
    this.monitorList = null;
  }
};
</script>

<style lang="less">
.monitor-list {
  width: 100%;
  height: 800px;
  box-sizing: border-box;
  padding-top: 20px;
}

.page-wrap {
  display: flex;
  justify-content: center;
}

.next-page {
  width: 120px;
  height: 40px;
  border-radius: 4px;
  background: #090a1d;
  color: #fff;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}

.monitor-wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  & > div {
    position: relative;
    display: block !important;
    margin-bottom: 2%;
    text-align: left;
  }

  .monitor-item {
    position: relative;
    width: 400px;
    height: 200px;
    margin: 0 20px 20px;
  }

  .monitor-des {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 16px;
    color: #fff;
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5) 66%,
      rgba(0, 0, 0, 0) 99%
    ); /* Safari、Chrome */
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ); /* 默认渐变位置从上往下 */
    z-index: 9;
    box-sizing: border-box;
    padding-left: 12px;
  }

  .monitor-full {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    z-index: 9;
    cursor: pointer;
  }
}
</style>
