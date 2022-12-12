<!--视频评分详情-->
<template>
  <div class="videoRate_page" id="videoRate_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search">{{ videoRateLabel[currentVideoType].title || '' }}</div>
      <div class="data_contain" :style="{height:tabelHeigth+'px'}">
        <section class="main_box">

          <div v-if="orderData && orderData.length>0">
            <div class="order_li" v-for="(order,orderIndex) in orderData" :key="orderIndex">
              <!--每个单子的 标题 -->
              <div class="order_head">
                <div>{{ videoRateLabel[currentVideoType].danhaoLable }}: {{ order.danhao || '无' }}</div>
                <div>{{ videoRateLabel[currentVideoType].nameLable }}: {{ order.home || '无' }}</div>
                <div>{{ videoRateLabel[currentVideoType].timeLable }}: {{ order.time || '无' }}</div>
              </div>
              <!--每个单子的 所有视频 -->
              <div class="video_list">
                <div class="video_box" v-if="order.videoList && order.videoList.length>0">
                  <!--每个单子的 单条视频  -->
                  <div
                      class="list_li"
                      v-for="(videoItem, videoIndex) in order.videoList"
                      :key="videoIndex"
                  >
                    <!-- 视频点击部分 -->
                    <div class="li" @click="handlePlayVideo(videoItem.videoUrl)">
                      <img :src="videoItem.coverPicUrl" alt=""
                           v-if="videoItem.coverPicUrl && videoItem.coverPicUrl.length">
                      <img src="@/assets/img/home/videoBg.svg" alt="" v-else>
                      <img class="palyBtn" src="@/assets/img/home/playBtn.png" alt="播放">
                    </div>
                    <!-- 视频名称 -->
                    <div class="li_name">{{ videoItem.videoName || '' }}</div>
                    <!-- 评级 -->
                    <div class="radio_groups">
                      <div class="radio_item" :class="{'radio_active':videoItem.videoRating==10?true:false}"
                           @click="groupChange(videoItem,10)">优
                      </div>
                      <div class="radio_item" :class="{'radio_active':videoItem.videoRating==20?true:false}"
                           @click="groupChange(videoItem,20)">合格
                      </div>
                      <div class="radio_item" :class="{'radio_active':videoItem.videoRating==30?true:false}"
                           @click="groupChange(videoItem,30)">不合格
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="empty_box">暂无视频</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="page">
        <div class="data-total">共{{ total }}项数据</div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="size"
            :total="total"
        >
        </el-pagination>
      </div>

    </div>
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

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import {timeStampSwitch} from "@/utils/util.js";
import {videoRateLabel} from './config'

export default {
  name: "VideoRateDetail",
  data() {
    return {
      videoRateLabel,//头部字段的配置项
      currentVideoType:0,//当前视频详情的类型(,收集,清运,入库,出库...)
      // 表格
      page: 1,
      size: 5,
      total: 0,
      tabelHeigth: 500,
      breadData: [{ name: "视频管理", path: "" },{ name: "视频评级", path: "/videoRate" }, { name: "视频评分详情" }],
      
      loading: false,
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址
      orderData:[
      // {
      //     danhao:"SJ3566565656565656656",
      //     home:"三门小蓝之家-三角塘",
      //     time:"SJ3566565656565656656",
      //     videoList:[
      //         {
      //             id:3,
      //             titlePage:"http://lsxh-manage2.cn-hangzhou.oss.aliyuncs.com/lsxh/pc/video2022/b1325dc9-cff1-49c2-a00c-77570ded2a1a.jpg",
      //             name:"视频吗木木木木的回复挂号费改立方和过分了和分类",
      //             previewUrl:"",
      //             videoRating:10
      //         },
      //         {
      //             id:4,
      //             titlePage:"http://lsxh-manage2.cn-hangzhou.oss.aliyuncs.com/lsxh/pc/video2022/b1325dc9-cff1-49c2-a00c-77570ded2a1a.jpg",
      //             name:"视频吗木木木木的回复挂号费改立方和过分了和分类",
      //             previewUrl:"",
      //             videoRating:20
      //         },
      //     ]
      // }
      ],
      currentId:"",
    };
  },
  components: { Breadcrumb },
  computed:{
  },
  created() {
  },
  mounted() {
    this.currentId = localStorage.getItem("currentId")
    this.currentVideoType = localStorage.getItem("currentIndex")

    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
          document.getElementById("videoRate_page").offsetHeight -
          294;
    });
    window.onresize = () => {
      let contentHeight = document.getElementById("videoRate_page").offsetHeight;
      // console.log(contentHeight,"contentHeight");
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 294;
      }
    };
    
    this.getTableData();
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
    this.$bus.off("videoParams")
  },
  methods: {
    // 评级事件
    groupChange(item, val) {
      let params = {
        id: item.id,
        videoRating: val,
      };
      this.$http(this.GLOBALApi.updateVideoRate(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.$set(item, 'videoRating', val)
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });

    },
    // 获取table列表
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.page,
        pageSize: this.size,
        type:this.currentId
      };
      // console.log(params, "参数");
      this.orderData = [];
      this.$http(this.GLOBALApi.getOrderByVideo(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;
              let records = res.data.records || [];
              this.total = res.data.total
              records.map((item, index) => {
                this.orderData.push({
                  danhao: item.serialNumber,
                  home: item.name,//收集编号
                  time: item.time
                      ? timeStampSwitch(item.time, "", "yy/mm/dd")
                      : "",
                  videoList: item.videoUrlResList
                });
              });
            } else {
              this.loading = false;

              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.loading = false;

            this.$message.error(error.msg);
          });
    },
    // 播放视频
    handlePlayVideo(value) {
      // console.log(value);
      if (value && value.length > 0) {
        this.currentVideoSrc = value;
        this.videoPreview = true;
      } else {
        this.$message.error("暂无视频数据")
        return
      }

    },
    handleSizeChange(val) {
      this.size = val
      this.orderData = []
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val
      this.orderData = []
      this.getTableData();
    },
  },
};
</script>

<style lang="less" scoped>
.videoRate_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.main {
  margin-top: 16px;
  // box-shadow: 0px 2px 3px 1px rgb(0 0 0 / 10%);
  padding: 32px 24px 32px 32px;
  background-color: #fff;

}

.search {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

.data_contain {
  overflow: auto;
  height: 522px;
}

.main_box {
  padding-bottom: 0px;

  .order_li {
    margin-bottom: 15px;

    .order_head {
      display: flex;
      align-items: center;

      div {
        margin-right: 40px;
      }
    }
  }
}

.video_list {
  .video_box {
    margin-top: 10px;
    display: flex;
    overflow: auto;

    & > div {
      width: 162px;
      flex-shrink: 0;
    }

    & > div:not(:last-child) {
      margin-right: 80px;
    }
  }

  .empty_box {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #858585;
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 12px;
    margin-top: 20px;
    //   margin: 20px auto;
  }

  .list_li {
    margin-top: 8px;
    margin-right: 80px;
    // border: solid red 1px;
    .li {
      margin: 0 auto;
      width: 136px;
      height: 136px;
      border-radius: 4px 4px 4px 4px;
      position: relative;
      cursor: pointer;

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
      margin: 0 auto;
      width: 136px;
      margin-top: 8px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #fff;
      // color: #303133;
      word-break: break-all;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }

    .radio_groups {
      position: relative;
      left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;

      .radio_item {
        color: #606266;
        font-weight: 500;
        cursor: pointer;
        font-size: 14px;
        padding-left: 10px;
        position: relative;
        margin-right: 16px;
      }

      .radio_item::before {
        content: '';
        display: block;
        position: absolute;
        top: 3px;
        left: -8px;

        border: 1px solid #DCDFE6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #FFF;
        cursor: pointer;
        box-sizing: border-box;
      }

      .radio_active {
        color: #409EFF;
      }

      .radio_active::before {
        border: 5px solid #409EFF;
      }
    }

    .radio_group {
      margin: 10px 0;
      display: flex;
      width: 136px;

      .el-radio {
        margin-right: 10px !important;
      }

      /deep/ .el-radio__label {
        padding-left: 5px !important;
      }
    }
  }
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
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
