<!-- 产品溯源弹窗 -->
<template>
  <div class="productTraceabilityDialog">
    <el-dialog
        class="source_dialog_box"
        title="产品溯源"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        width="1380px"
        top="5vh"
        :before-close="handleClose"
        destroy-on-close
    >
      <div class="time_axis_box">
        <div class="first_title" @click="fullScreen">时间轴<span class="up_file" v-if="antNum>=2">{{
            showAll ? '关闭' : '展开'
          }}</span></div>
        <div class="outHeight" :class="[showAll?'showHeight':'']">
          <div class="myDiagramDiv" id="myDiagramDiv">
            <canvas tabindex="0" width="1054" height="498"
                    style="position: absolute; top: 0px; left: 0px; z-index: 1; user-select: none; touch-action: none; width: 1054px; height: 498px;">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">如果您的浏览器不支持 Canvas HTML 元素，则会显示此文本。</font>
              </font>
            </canvas>
          </div>
        </div>
        <!-- <div class="time_axis_ul" v-show="false">
          <div
              class="time_axis_li"
              v-for="(item, index) in timeAxisData"
              :key="index"
          >
            <div class="title">
              <img v-if="item.type==2" src="../../../assets/img/home/car.png" alt="汽车">
              <img v-else src="../../../assets/img/home/point.png" alt="定位">
              <span class="title_val">{{ item.traceName }}</span>
              <div
                  class="line"
                  v-if="index < timeAxisData.length - 1"
              ></div>
            </div>
            <div class="time">{{ item.happenDate }}</div>
          </div>
        </div> -->
      </div>
      <div class="box" v-if="allVideoData && allVideoData.length>0">
        <div class="first_title">视频监控</div>
        <!-- 收集视频 -->
        <div class="content" v-for="(item,index) in allVideoData" :key="index">
          <div class="name">{{ item.title }}</div>
          <div class="list_ul">
            <div class="vedios" v-if="item.videoList && item.videoList.length>0">
              <div
                  class="list_li"
                  v-for="(videoItem, videoIndex) in item.videoList"
                  :key="videoIndex"
                  @click="handlePlayVideo(videoItem.videoUrl)"
              >
                <div class="li">
                  <img :src="videoItem.titlePage" alt="" v-if="videoItem.titlePage && videoItem.titlePage.length">
                  <img src="@/assets/img/home/videoBg.svg" alt="" v-else>
                  <img class="palyBtn" src="@/assets/img/home/playBtn.png" alt="播放">
                </div>
                <div class="li_name">{{ videoItem.name || '' }}</div>
              </div>
            </div>
            <div v-else>
              <div class="empty_box">暂无视频</div>
            </div>
          </div>
        </div>

      </div>
    </el-dialog>

    <!-- 视频预览 -->
    <el-dialog
        title="视频预览"
        :visible.sync="videoPreview"
        width="720px"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="true"
        top="10vh"
    >
      <div style="">
        <video
            width="600"
            v-if="videoPreview"
            :src="currentVideoSrc"
            controls
            style="height: 400px; width: 100%"
        ></video>
      </div>
      <div slot="footer">
        <span class="button_close" @click="videoPreview = false">关闭</span>
      </div>
    </el-dialog>
  </div>
</template>

<script id="code">
</script>
<script>
// import {getFormatTime} from "@/utils/methods.js";
export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    blockId: {
      type: Number,
      require: true,
      default: null
    },
  },
  watch: {
    dialogVisible: {
      handler(newVal) {
        if (newVal && this.blockId) {
          this.showAll = false
          this.getTimeBase()
          // setTimeout(() => {
          //   this.init()
          // }, 100);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址
      sourceDialogVisible: false,// 弹窗

      // timeAxisData:[],//时间轴数组

      allVideoData: [],//所有视频
      showAll: false,//展开,关闭
      myDiagram: {},
      carIcon: require("@/assets/img/home/car.png"),
      pointIcon: require("@/assets/img/home/point.png"),
      peopleIcon: require("@/assets/img/home/people.png"),

      //格式 key:唯一标识符,  parent:前一个步骤,  dir:展开方向, text:文本,  source:图片
      relativeData: [
        // 小蚂蚁
        // { key: "ant1", parent: "process2",dir: "left",text:`小蚂蚁1\n2022-09-13 14:38:37` },
        // { key: "ant2", parent: "process2",dir: "left",text:`小蚂蚁12\n2022-09-13 14:38:37` },
        // { key: "ant3", parent: "process2",dir: "left",text:`小蚂蚁112\n2022-09-13 14:38:37` },
        // { key: "ant4", parent: "process2",dir: "left",text:`小蚂蚁22\n2022-09-13 14:38:37` },


        // { key: "process2",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`三门小蓝之家-木杓沙滩\n2022-09-13 10:52:37`},

        // { key: "process3", parent: "process2", dir: "right",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`三门小蓝之家-木杓沙滩\n2022-09-13 10:52:37` },
        // { key: "process4", parent: "process3", dir: "right",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`货拉拉转运\n2022-09-13 10:52:37` },
        // { key: "process5", parent: "process4", dir: "right",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`浙江蓝景科技有限公司绿保仓入库\n2022-09-13 10:52:37` },
        // { key: "process6", parent: "process5", dir: "right",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`货拉拉转运\n2022-09-13 10:52:37` },
        // { key: "process7", parent: "process6", dir: "right",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`威立雅华菲高分子科技（浙江）有限公司接收\n2022-09-13 10:52:37` },
        // { key: "process8", parent: "process7", dir: "right",source:"https://lsxh-manage2.oss-cn-hangzhou.aliyuncs.com/lsxh/pc/image/2022/cd3ce7e4bb822c6584f44c9c227759e0.png",text:`威立雅华菲高分子科技（浙江）有限公司生产\n2022-09-13 10:52:37` },
      ],
      antNum: 0


    };
  },
  computed: {},
  methods: {
    draw() {
      const $ = go.GraphObject.make;

      this.myDiagram =
          $(go.Diagram, "myDiagramDiv",
              {
                scale: 0.9,
                // padding:new go.Margin(10, 100),
                initialContentAlignment: go.Spot.Center, //画布的位置设置（居中，靠左等）
                initialPosition: new go.Point(0, -70),
                layout: $(DoubleTreeLayout,

                    {
                      //vertical: true,  // default directions are horizontal
                      // choose whether this subtree is growing towards the right or towards the left:
                      directionFunction: n => n.data && n.data.dir !== "left"
                      // controlling the parameters of each TreeLayout:
                      //bottomRightOptions: { nodeSpacing: 0, layerSpacing: 20 },
                      //topLeftOptions: { alignment: go.TreeLayout.AlignmentStart },
                    })
              });


      this.myDiagram.nodeTemplate =
          $(go.Node, "Horizontal",//水平排列
              // { background: "#44CCFF" },
              // { isShadowed: true },

              // 是否展开
              {isTreeExpanded: true},

              // 图片
              $(go.Picture,
                  {margin: 5, width: 24, height: 24,},
                  new go.Binding("source")),

              $(go.Panel,
                  // 文本
                  $(go.TextBlock,
                      {margin: 0, font: "16px PingFang SC-Regular, PingFang SC blod", width: 90, stroke: "#fff"},
                      new go.Binding("text", "text")),
              ),

              // 节点按钮
              $("TreeExpanderButton")
          );

      this.myDiagram.linkTemplate =
          $(go.Link,
              {selectable: false},

              $(go.Shape, {name: 'dashedLink', stroke: "rgb(0,160,210)", strokeWidth: 1, strokeDashArray: [6, 3]}),
              // 箭头
              // $(go.Shape,
              //   { toArrow: "standard",fill: "#000", stroke: "#000" },  // default fill is gray
              //   new go.Binding("fill", "color")),

          )

      // 动画
      // const loop = () => {
      //   setTimeout(() => {
      //     const oldskips = this.myDiagram.skipsUndoManager;
      //     this.myDiagram.skipsUndoManager = true;
      //     // 虚线动画
      //     this.myDiagram.links.each((link) => {
      //     const dashedLinkShape = link.findObject("dashedLink");
      //     if (dashedLinkShape) {
      //         const off = dashedLinkShape.strokeDashOffset - 3;
      //         // 设置（移动）笔划划动画
      //         dashedLinkShape.strokeDashOffset = (off <= 0) ? 60 : off;
      //     }
      //     });

      //     this.myDiagram.skipsUndoManager = oldskips;
      //     loop();
      // }, 1000);
      // }
      // loop()

      // 基础数据

      // 指定关系,关系数组
      this.myDiagram.model = new go.TreeModel(this.relativeData);
    },
    fullScreen() {
      this.showAll = !this.showAll
      // 清空当前画布
      // this.myDiagram = {};
      // this.init()
    },
    // 时间轴,视频 数据
    getTimeBase() {
      this.relativeData = []
      this.allVideoData = []
      this.$http(this.GLOBALApi.getTimeBase(), {id: this.blockId})
          .then((res) => {
            if (res.code === 200 && res.data) {
              let data = res.data.plasticProcessList
              // 视频数据
              this.allVideoData = res.data.videoTraceList

              //当前流程 1,接收单 2,收集单 ,3清运,4入库,5转运,6接收,7生产,8出库
              let currentProcess = res.data.plasticProcessList.length

              if (data && data.length > 0) {
                data.map(((item, index) => {
                  //小蚂蚁数据,可能有,也可能没有,但不影响直接处理成 关系数据
                  /**
                   * key:唯一标识符,  parent:前一个步骤,  dir:展开方向, text:文本,  source:图片
                   */
                  if (index == 0) {
                    if (item.receiveOrderDtoList && item.receiveOrderDtoList.length > 0) {
                      this.antNum = item.receiveOrderDtoList.length
                      item.receiveOrderDtoList.map((antItem, antIndex) => {

                        this.relativeData.push({
                          key: 'ant' + (antIndex + 1),
                          text: `${antItem.traceName}\n${antItem.happenDate}`,
                          parent: "process2",
                          dir: "left",
                          source: this.peopleIcon,
                        })
                      })
                    }

                  } else {
                    // 正常流程

                    // 2收集
                    if (index == 1 && currentProcess >= 2) {
                      this.relativeData.push({
                        key: "process2",
                        source: this.pointIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                      })
                    }
                    // 3清运
                    if (index == 2 && currentProcess >= 3) {
                      this.relativeData.push({
                        key: "process3",
                        source: this.carIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                        parent: "process2",
                        dir: "right",
                      })
                    }
                    // 4入库
                    if (index == 3 && currentProcess >= 4) {
                      this.relativeData.push({
                        key: "process4",
                        source: this.pointIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                        parent: "process3",
                        dir: "right",
                      })
                    }
                    // 5转运
                    if (index == 4 && currentProcess >= 5) {
                      this.relativeData.push({
                        key: "process5",
                        source: this.carIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                        parent: "process4",
                        dir: "right",
                      })
                    }
                    // 6接收
                    if (index == 5 && currentProcess >= 6) {
                      this.relativeData.push({
                        key: "process6",
                        source: this.pointIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                        parent: "process5",
                        dir: "right",
                      })
                    }
                    // 7生产
                    if (index == 6 && currentProcess >= 7) {
                      this.relativeData.push({
                        key: "process7",
                        source: this.pointIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                        parent: "process6",
                        dir: "right",
                      })
                    }
                    // 8造粒厂出库
                    if (index == 7 && currentProcess >= 8) {
                      this.relativeData.push({
                        key: "process8",
                        source: this.pointIcon,
                        text: `${item.traceName}\n${item.happenDate}`,
                        parent: "process7",
                        dir: "right",
                      })
                    }


                  }

                }))

                // console.log( this.relativeData,"关系");
                // 绘制
                this.draw()
              } else {
                this.$message.warning("获取溯源流程数据失败");
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 播放视频
    handlePlayVideo(value) {
      this.currentVideoSrc = value;
      this.videoPreview = true;
    },
    // 关闭弹窗
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="less" scoped>
.outHeight {
  height: 20vh;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
}

.myDiagramDiv {
  z-index: 2;
  // background-color: white; 
  background-color: #0A1B35;
  // border: 1px solid black;
  width: 101%;
  height: 60vh;
  position: relative;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  //  overflow: hidden;
}

.up_file {
  margin-left: 20px;
  display: inline-block;
  width: 88px;
  height: 32px;
  background: #0052d9;
  border-radius: 4px 4px 4px 4px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  line-height: 32px;
  cursor: pointer;
}

.showHeight {
  height: 60vh;
}

// 弹窗
.source_dialog_box {
  .first_title {
    user-select: none;
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 22px;
  }
}

// 时间线
.time_axis_box {
  margin-bottom: 5px;

  .time_axis_ul {
    display: flex;
    margin-top: 33px;

    .time_axis_li {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.9);
      position: relative;

      .title {
        display: flex;
        // align-items: center;
        img {
          width: 24px;
          height: 24px;
          // object-fit: cover;
        }

        .title_val {
          margin: 0 5px;
          width: 90px;
        }

        .line {
          width: 75px;
          height: 2px;
          background: #0052d9;
          border-radius: 0px 0px 0px 0px;
          margin-right: 5px;
          margin-top: 10px;
        }
      }

      .time {
        margin-left: 29px;
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        width: 80px;
      }
    }
  }
}

// 视频列表
.box {
  margin-top: 21px;

  .content {
    margin-top: 16px;

    .name {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #303133;
    }

    .list_ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow: auto;
    }

    .vedios {
      display: flex;
      overflow: auto;

      & > div {
        width: 136px;
        flex-shrink: 0;
      }

      & > div:not(:last-child) {
        margin-right: 80px;
      }
    }

    .empty_box {
      width: 1315px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #858585;
      background-color: rgba(0, 0, 0, 0.05);
      font-size: 12px;
      margin-top: 5px;
    }

    .list_li {
      margin-top: 8px;
      margin-right: 80px;

      .li {
        width: 136px;
        height: 136px;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        // background: url(~@/assets/img/home/videoBg.svg) center center no-repeat;
        cursor: pointer;
        position: relative;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .palyBtn {
          display: inline-block;
          width: 40px;
          height: 40px;
          object-fit: cover;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto auto;
        }
      }

      .li_name {
        width: 136px;
        margin-top: 8px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #303133;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
      }
    }
  }
}

.button_close {
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  display: inline-block;
  padding: 0 12px;
}
</style>
