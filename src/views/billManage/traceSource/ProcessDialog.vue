<!-- 产品溯源弹窗 -->
<template>
  <div class="productTraceabilityDialog">
    <el-dialog
        class="source_dialog_box"
        title="产品溯源"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        width="1270px"
        top="5vh"
        :before-close="handleClose"
        destroy-on-close
    >
      <div class="con_area">
        <div class="step_area scroll_bar">

          <div class="item" v-if="plasticBlockReceiveOrderResList.length">
            <div class="i_title">
              <div class="tit">源头收集</div>
              <img src="@/assets/img/traceSource/step_1.png" alt="" class="icon">
              <div class="num">共{{ plasticBlockReceiveOrderResList.length }}人</div>
            </div>
            <div class="c_step">
              <div class="c_item scroll_bar">
                <div class="m_con" v-for="(item,index) of plasticBlockReceiveOrderResList" :key="index">
                  <div class="m_bar">
                    <div class="m_tit">{{ index + 1 }}</div>
                    <div class="m_desc" :title="item.collectUser">{{ item.collectUser }}</div>
                    <div @click="toggleSourceSubItem(index)" class="icon"
                         :class="currentSourceItemIndex==index?'on':''"></div>
                  </div>
                  <div class="s_con" :class="currentSourceItemIndex==index?'on':''">
                    <div class="s_bar">
                      <div class="s_tit">收集人员:</div>
                      <div class="s_desc" :title="item.collectUser">{{ item.collectUser }}</div>
                    </div>
                    <div class="s_bar">
                      <div class="s_tit">收集地点:</div>
                      <div class="s_desc" :title="item.collectAddress">{{ item.collectAddress }}</div>
                    </div>
                    <div class="s_bar">
                      <div class="s_tit">收集重量:</div>
                      <div class="s_desc">{{ item.weight }}kg</div>
                    </div>
                    <div class="s_bar">
                      <div class="s_tit">收集类别:</div>
                      <div class="s_desc" :title="item.plasticBlockTypeNames">{{ item.plasticBlockTypeNames }}</div>
                    </div>
                    <div class="s_bar">
                      <div class="s_tit">收集时间:</div>
                      <div class="s_desc">{{ item.reportTime }}</div>
                    </div>
                    <div class="file_bar" v-if="item.pdfUrl">
                      <div class="file" @click="handlePdf(item.pdfUrl)"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="item" v-if="plasticBlockCollectOrderRes.homeName">
            <div class="i_title">
              <div class="tit">集中储存</div>
              <img src="@/assets/img/traceSource/step_2.png" alt="" class="icon">
            </div>
            <div class="c_step">
              <div class="c_item">
                <div class="s_con2">
                  <div class="s_bar">
                    <div class="s_tit">储存单元:</div>
                    <div class="s_desc" :title="plasticBlockCollectOrderRes.homeName">
                      {{ plasticBlockCollectOrderRes.homeName }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">收集地点:</div>
                    <div class="s_desc" :title="plasticBlockCollectOrderRes.homeAddress">
                      {{ plasticBlockCollectOrderRes.homeAddress }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">经度:</div>
                    <div class="s_desc">{{ plasticBlockCollectOrderRes.lon }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">纬度:</div>
                    <div class="s_desc">{{ plasticBlockCollectOrderRes.lat }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">储存重量:</div>
                    <div class="s_desc">{{ plasticBlockCollectOrderRes.actualWeight }}kg</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">储存时间:</div>
                    <div class="s_desc">{{ plasticBlockCollectOrderRes.workStartTime }}</div>
                  </div>
                  <div class="file_bar" v-if="plasticBlockCollectOrderRes.pdfUrl">
                    <div class="file" @click="handlePdf(plasticBlockCollectOrderRes.pdfUrl)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="item"
               v-if="plasticBlockClearOrderRes.transportCompanyName || plasticBlockInputOrderRes.warehouseName || plasticBlockOutputOrderRes.transportCompanyName">
            <div class="i_title">
              <div class="tit">调度转运</div>
              <div class="other_icon_group">
                <img v-if="plasticBlockClearOrderRes.transportCompanyName" src="@/assets/img/traceSource/step_3.png"
                     alt="" class="other_icon">
                <div v-if="plasticBlockInputOrderRes.warehouseName" class="dot_line"></div>
                <img v-if="plasticBlockInputOrderRes.warehouseName" src="@/assets/img/traceSource/step_4.png" alt=""
                     class="other_icon">
                <div v-if="plasticBlockOutputOrderRes.transportCompanyName" class="dot_line"></div>
                <img v-if="plasticBlockOutputOrderRes.transportCompanyName" src="@/assets/img/traceSource/step_3.png"
                     alt="" class="other_icon">
              </div>
            </div>
            <div class="c_step">

              <div class="c_item" v-if="plasticBlockClearOrderRes.transportCompanyName">
                <div class="s_con2">
                  <div class="s_bar">
                    <div class="s_tit">运输企业:</div>
                    <div class="s_desc" :title="plasticBlockClearOrderRes.transportCompanyName">
                      {{ plasticBlockClearOrderRes.transportCompanyName }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">运输车辆:</div>
                    <div class="s_desc">{{ plasticBlockClearOrderRes.transportVehicleName }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">运输司机:</div>
                    <div class="s_desc">{{ plasticBlockClearOrderRes.transportUserName }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">运输重量:</div>
                    <div class="s_desc">{{ plasticBlockClearOrderRes.actualWeight }}kg</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">出发时间:</div>
                    <div class="s_desc">{{ plasticBlockClearOrderRes.workStartTime }}</div>
                  </div>
                  <div class="s_bar not"></div>
                  <div class="file_bar" v-if="plasticBlockClearOrderRes.pdfUrl">
                    <div class="file" @click="handlePdf(plasticBlockClearOrderRes.pdfUrl)"></div>
                  </div>
                </div>
              </div>

              <div class="c_item" v-if="plasticBlockInputOrderRes.warehouseName">
                <div class="s_con2">
                  <div class="s_bar">
                    <div class="s_tit">中转仓库:</div>
                    <div class="s_desc" :title="plasticBlockInputOrderRes.warehouseName">
                      {{ plasticBlockInputOrderRes.warehouseName }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">中转地点:</div>
                    <div class="s_desc" :title="plasticBlockInputOrderRes.warehouseAddress">
                      {{ plasticBlockInputOrderRes.warehouseAddress }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">经度:</div>
                    <div class="s_desc">{{ plasticBlockInputOrderRes.lon }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">纬度:</div>
                    <div class="s_desc">{{ plasticBlockInputOrderRes.lat }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">入库重量:</div>
                    <div class="s_desc">{{ plasticBlockInputOrderRes.actualInputWeight }}kg</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">入库时间:</div>
                    <div class="s_desc">{{ plasticBlockInputOrderRes.workWeightTime }}</div>
                  </div>
                  <div class="file_bar" v-if="plasticBlockInputOrderRes.pdfUrl">
                    <div class="file" @click="handlePdf(plasticBlockInputOrderRes.pdfUrl)"></div>
                  </div>
                </div>
              </div>

              <div class="c_item" v-if="plasticBlockOutputOrderRes.transportCompanyName">
                <div class="s_con2">
                  <div class="s_bar">
                    <div class="s_tit">运输企业:</div>
                    <div class="s_desc" :title="plasticBlockOutputOrderRes.transportCompanyName">
                      {{ plasticBlockOutputOrderRes.transportCompanyName }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">运输车辆:</div>
                    <div class="s_desc">{{ plasticBlockOutputOrderRes.transportVehicle }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">运输司机:</div>
                    <div class="s_desc">{{ plasticBlockOutputOrderRes.transportUserName }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">运输重量:</div>
                    <div class="s_desc">{{ plasticBlockOutputOrderRes.actualWeight }}kg</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">出发时间:</div>
                    <div class="s_desc">{{ plasticBlockOutputOrderRes.weightTime }}</div>
                  </div>
                  <div class="s_bar not"></div>
                  <div class="file_bar" v-if="plasticBlockOutputOrderRes.pdfUrl">
                    <div class="file" @click="handlePdf(plasticBlockOutputOrderRes.pdfUrl)"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="item"
               v-if="plasticBlockHandleOrderRes.handleCompanyName || plasticBlockHandlePrillOrderRes.companyName">
            <div class="i_title">
              <div class="tit">再生造粒</div>
              <img src="@/assets/img/traceSource/step_6.png" alt="" class="icon">
            </div>
            <div class="c_step">
              <div class="c_item" v-if="plasticBlockHandleOrderRes.handleCompanyName">
                <div class="s_con2">
                  <div class="s_bar">
                    <div class="s_tit">再生企业:</div>
                    <div class="s_desc" :title="plasticBlockHandleOrderRes.handleCompanyName">
                      {{ plasticBlockHandleOrderRes.handleCompanyName }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">再生地点:</div>
                    <div class="s_desc" :title="plasticBlockHandleOrderRes.handleCompanyAddress">
                      {{ plasticBlockHandleOrderRes.handleCompanyAddress }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">经度:</div>
                    <div class="s_desc">{{ plasticBlockHandleOrderRes.lon }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">纬度:</div>
                    <div class="s_desc">{{ plasticBlockHandleOrderRes.lat }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">接收重量:</div>
                    <div class="s_desc">{{ plasticBlockHandleOrderRes.actualWeight }}kg</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">接收时间:</div>
                    <div class="s_desc">{{ plasticBlockHandleOrderRes.arriveTime }}</div>
                  </div>
                  <div class="file_bar" v-if="plasticBlockHandleOrderRes.pdfUrl">
                    <div class="file" @click="handlePdf(plasticBlockHandleOrderRes.pdfUrl)"></div>
                  </div>
                </div>
              </div>
              <div class="c_item" v-if="plasticBlockHandlePrillOrderRes.companyName">
                <div class="s_con2">
                  <div class="s_bar">
                    <div class="s_tit">再生企业:</div>
                    <div class="s_desc" :title="plasticBlockHandlePrillOrderRes.companyName">
                      {{ plasticBlockHandlePrillOrderRes.companyName }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">再生地点:</div>
                    <div class="s_desc" :title="plasticBlockHandlePrillOrderRes.companyAddress">
                      {{ plasticBlockHandlePrillOrderRes.companyAddress }}
                    </div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">经度:</div>
                    <div class="s_desc">{{ plasticBlockHandlePrillOrderRes.lon }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">纬度:</div>
                    <div class="s_desc">{{ plasticBlockHandlePrillOrderRes.lat }}</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">造粒重量:</div>
                    <div class="s_desc">{{ plasticBlockHandlePrillOrderRes.prillWeight }}kg</div>
                  </div>
                  <div class="s_bar">
                    <div class="s_tit">造粒时间:</div>
                    <div class="s_desc">{{ plasticBlockHandlePrillOrderRes.prillTime }}</div>
                  </div>
                  <div class="file_bar" v-if="plasticBlockHandlePrillOrderRes.pdfUrl">
                    <div class="file" @click="handlePdf(plasticBlockHandlePrillOrderRes.pdfUrl)"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="item" v-if="plasticBlockHandleOutOrderResList.length">
            <div class="i_title">
              <div class="s_tit">加工制作:</div>
              <img src="@/assets/img/traceSource/step_7.png" alt="" class="icon">
            </div>
            <div class="c_step">
              <div class="c_item scroll_bar">
                <div class="m_con" v-for="(item,index) of plasticBlockHandleOutOrderResList" :key="index">
                  <div class="m_bar">
                    <div class="m_tit">{{ index + 1 }}</div>
                    <div class="m_desc" :title="item.clientName">{{ item.clientName }}</div>
                    <div @click="toggleMachiningSubItem(index)" class="icon"
                         :class="currentMachiningItemIndex==index?'on':''"></div>
                  </div>
                  <div class="s_con" :class="currentMachiningItemIndex==index?'on2':''">
                    <div class="s_bar">
                      <div class="s_tit">接收企业:</div>
                      <div class="s_desc" :title="item.clientName">{{ item.clientName }}</div>
                    </div>
                    <div class="s_bar">
                      <div class="s_tit">粒子重量:</div>
                      <div class="s_desc">{{ item.outWeight }}kg</div>
                    </div>
                    <div class="s_bar">
                      <div class="s_tit">接收时间:</div>
                      <div class="s_desc">{{ item.arriveTime }}</div>
                    </div>
                    <div class="file_bar" v-if="item.pdfUrl">
                      <div class="file" @click="handlePdf(item.pdfUrl)"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="view_area_title">视频监控</div>

        <div class="video_area" v-if="videoList.length">
          <div class="tab_bar">
            <div
                class="item"
                v-for="(item, index) of videoList"
                :key="index"
                :class="currentVideoTagIndex === index ? 'on' : 'off'"
                @click="currentVideoTagIndex = index"
            >
              {{ item.name }}
            </div>
          </div>
          <div
              class="video_list_box"
              v-for="(item, index) of videoList"
              :key="index"
              :class="currentVideoTagIndex === index ? 'on' : 'off'"
          >
            <div class="video_list scroll_bar">
              <div
                  class="item"
                  v-for="(cItem, cIndex) of item.data"
                  :key="cIndex"
              >
                <div class="i_pic" @click="handlePlayVideo(cItem.videoUrl)">
                  <img v-if="cItem.coverPicUrl" :src="cItem.coverPicUrl" class="pic"/>
                  <img v-else src="@/assets/img/traceSource/videoBg.svg" class="pic"/>
                  <div class="play_icon"></div>
                </div>
                <div class="tit_bar">
                  <div class="tit_bar_double">
                    <span class="dot"></span>
                    <div class="tit" :title="cItem.videoName">{{ cItem.videoName || '' }}</div>
                    <span class="dot"></span>
                  </div>
                </div>
              </div>
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
        destroy-on-close
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
export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    serialNo: {
      type: String,
      require: true,
      default: null
    },
  },
  watch: {
    dialogVisible: {
      handler(newVal) {
        this.videoList = []
        this.plasticBlockReceiveOrderResList={},
        this.plasticBlockCollectOrderRes={},
        this.plasticBlockClearOrderRes={},
        this.plasticBlockInputOrderRes={},
        this.plasticBlockOutputOrderRes={},
        this.plasticBlockHandleOrderRes={},
        this.plasticBlockHandlePrillOrderRes={},
        this.plasticBlockHandleOutOrderResList={}
        if (newVal && this.serialNo) {
          this.showAll = false
          this.getData()
        }
      },
      // immediate: true,
    },
  },
  data() {
    return {
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址
      showAll: false,//展开,关闭
      currentVideoTagIndex: 0,
      currentSourceItemIndex: null,
      currentMachiningItemIndex: null,
      plasticBlockReceiveOrderResList: {},    //源头收集
      plasticBlockCollectOrderRes: {},        //集中储存
      plasticBlockClearOrderRes: {},          //调度转运-清运单
      plasticBlockInputOrderRes: {},          //调度转运-入库单
      plasticBlockOutputOrderRes: {},         //调度转运-出库单
      plasticBlockHandleOrderRes: {},         //再生造粒-接收单
      plasticBlockHandlePrillOrderRes: {},    //再生造粒-造粒
      plasticBlockHandleOutOrderResList: {},  //加工制造
      videoList: [],  //视频集合

    };
  },
  computed: {},
  methods: {

    toggleSourceSubItem(index) {
      if (index == this.currentSourceItemIndex) {
        this.currentSourceItemIndex = null
      } else {
        this.currentSourceItemIndex = index
      }
    },

    toggleMachiningSubItem(index) {
      if (index == this.currentMachiningItemIndex) {
        this.currentMachiningItemIndex = null
      } else {
        this.currentMachiningItemIndex = index
      }
    },

    // 获取数据
    getData() {
      this.$http(this.GLOBALApi.getProcessmanage(), {no: this.serialNo})
          .then((res) => {
            if (res.code === 200 && res.data) {
              let datas = res.data || {};

              this.plasticBlockReceiveOrderResList = datas.plasticBlockReceiveOrderResList || [];    //源头收集
              this.plasticBlockCollectOrderRes = datas.plasticBlockCollectOrderRes || {};    //集中储存
              this.plasticBlockClearOrderRes = datas.plasticBlockClearOrderRes || {};    //调度转运-清运单
              this.plasticBlockInputOrderRes = datas.plasticBlockInputOrderRes || {};    //调度转运-入库单
              this.plasticBlockOutputOrderRes = datas.plasticBlockOutputOrderRes || {};    //调度转运-出库单
              this.plasticBlockHandleOrderRes = datas.plasticBlockHandleOrderRes || {};    //再生造粒-接收单
              this.plasticBlockHandlePrillOrderRes = datas.plasticBlockHandlePrillOrderRes || {};    //再生造粒-造粒
              this.plasticBlockHandleOutOrderResList = datas.plasticBlockHandleOutOrderResList || [];    //加工制造

              this.videoList = [];

              if (this.plasticBlockReceiveOrderResList.length) {
                const plasticVideoResList = [];
                this.plasticBlockReceiveOrderResList.forEach(item => {
                  item.videoUrlResList.forEach(stem => {
                    plasticVideoResList.push(stem || {})
                  })
                })
                if (plasticVideoResList.length) {
                  this.videoList.push({
                    name: '源头收集',
                    data: plasticVideoResList,
                  })
                }
              }

              // 使用调度转运-清运单视频数据
              if (this.plasticBlockClearOrderRes.transportCompanyName) {
                const plasticClearOrderRes = this.plasticBlockClearOrderRes.videoUrlResList || [];
                if (plasticClearOrderRes.length) {
                  this.videoList.push({
                    name: '集中储存',
                    data: plasticClearOrderRes,
                  })
                }
              }

              if (this.plasticBlockInputOrderRes.warehouseName || this.plasticBlockOutputOrderRes.transportCompanyName) {
                const plasticVideoOrderRes = (this.plasticBlockInputOrderRes.videoUrlResList || []).concat(this.plasticBlockOutputOrderRes.videoUrlResList || [])
                if (plasticVideoOrderRes.length) {
                  this.videoList.push({
                    name: '调度转运',
                    data: plasticVideoOrderRes,
                  })
                }
              }

              if (this.plasticBlockHandleOrderRes.handleCompanyName || this.plasticBlockHandlePrillOrderRes.companyName) {
                const plasticVideoHandle = (this.plasticBlockHandleOrderRes.videoUrlResList || []).concat(this.plasticBlockHandlePrillOrderRes.videoUrlResList || [])
                if (plasticVideoHandle.length) {
                  this.videoList.push({
                    name: '再生造粒',
                    data: plasticVideoHandle,
                  })
                }
              }

              if (this.plasticBlockHandleOutOrderResList.length) {
                const plasticVideoOutOrder = [];
                this.plasticBlockHandleOutOrderResList.forEach(item => {
                  if (item.videoUrlResList && item.videoUrlResList.length) {
                    item.videoUrlResList.forEach(stem => {
                      plasticVideoOutOrder.push(stem || {})
                    })
                  }
                })
                if (plasticVideoOutOrder.length) {
                  this.videoList.push({
                    name: '加工制造',
                    data: plasticVideoOutOrder,
                  })
                }
              }

              console.log(res.data, 'res11111111111')
              console.log(this.videoList, 'videoList++++++++++')

            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            console.log('xxxx', error)
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

    // 预览pdf
    handlePdf(data) {
      window.open(data, '_blank')
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

//样式
.con_area {

  .step_area {
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    height: 304px;
    padding-bottom: 22px;
    margin-bottom: 19px;
  }

  .view_area_title {
    height: 43px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
  }
}

.step_area {
  .item {
    height: 282px;
    flex-shrink: 0;
    background: #163058;
    margin-right: 20px;
    position: relative;
    z-index: 1;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;

    &:after,
    &:before {
      content: '';
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      height: 1px;
      width: 10px;
      background: #C0F8FF;
    }

    &:before {
      width: 9px;
      top: 1px;
    }

    &:last-child {
      margin-right: 0;
    }

    .i_title {
      height: 33px;
      font-weight: 600;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 2px 8px 0;

      .icon {
        width: 20px;
        height: 20px;
        margin-left: 5px;
      }

      .num {
        flex-grow: 1;
        text-align: right;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .other_icon_group {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 6em 0 2em;

    .other_icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .dot_line {
      flex: 1;
      height: 0;
      border-bottom: dotted 1px #fff;
    }
  }

  .c_step {
    display: flex;
  }

  .c_item {
    width: 197px;
    height: 249px;
    padding-top: 3px;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    z-index: 1;
    background: url('~@/assets/img/traceSource/item-bg-small.png') no-repeat;
    background-size: 100%;

    .other_icon {
      position: absolute;
      z-index: 2;
      top: -40px;
      left: 50%;
    }

    .m_bar {
      display: flex;
      align-items: center;
      height: 30px;
      border-bottom: solid 1px rgba(216, 216, 216, 0.1);
      padding: 0 8px;

      .m_tit {
        margin-right: 4px;
        width: 16px;
        height: 16px;
        line-height: 14px;
        border: dotted 1px #fff;
        font-size: 12px;
        color: #fff;
        text-align: center;
        border-radius: 100%;
      }

      .m_desc {
        flex-grow: 1;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon {
        width: 24px;
        height: 24px;
        position: relative;
        z-index: 1;
        cursor: pointer;

        &:after {
          content: '';
          position: absolute;
          z-index: 2;
          border-top: solid 5px #00A2FF;
          border-right: solid 5px transparent;
          border-bottom: solid 5px transparent;
          border-left: solid 5px transparent;
          left: 50%;
          top: 50%;
          transform: translate(-50%, 0);
        }

        &.on:after {
          border-top: solid 5px transparent;
          border-bottom: solid 5px #00A2FF;
          transform: translate(-50%, -50%);
        }
      }
    }

    .s_con {
      padding: 0 8px;
      height: 0;
      overflow: hidden;
      transition: all 0.3s;

      &.on {
        height: 191px;
      }

      &.on2 {
        height: 131px;
      }
    }

    .s_con2 {
      padding: 0 8px;
    }

    .s_bar {
      border-bottom: solid 1px rgba(216, 216, 216, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;

      &.not {
        border-bottom: none;
      }

      .s_tit {
        font-size: 12px;
        flex-shrink: 0;
        margin-right: 5px;
      }

      .s_desc {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: right;
      }
    }

    .file_bar {
      padding: 8px 0;

      .file {
        width: 24px;
        height: 25px;
        background: url('~@/assets/img/traceSource/pdf_icon.png') no-repeat;
        background-size: 100%;
        cursor: pointer;
      }
    }
  }
}

.video_area {
  .tab_bar {
    display: flex;
    margin-bottom: 10px;

    .item {
      width: 96px;
      height: 35px;
      line-height: 35px;
      background: url('~@/assets/img/traceSource/seleect-2-bg.png') no-repeat;
      background-size: 100%;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
      text-align: center;
      line-height: 34px;
      margin-right: 20px;
      cursor: pointer;

      &.on {
        color: #fff;
        background: url('~@/assets/img/traceSource/seleect-1-bg.png') no-repeat;
      }
    }
  }

  .video_list_box {
    height: 225px;
    display: none;

    &.on {
      display: block;
    }
  }

  .video_list {
    height: 225px;
    margin-bottom: 22px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;

    .item {
      flex-shrink: 0;
      width: 184px;
      height: 203px;
      background: url('~@/assets/img/traceSource/video-bg.png') no-repeat;
      background-size: 100%;
      margin-right: 24px;

      &:last-child {
        margin-right: 0;
      }

      .i_pic {
        width: 160px;
        padding: 10px 0 0;
        height: 166px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .pic {
        display: block;
        width: 160px;
        height: 160px;
        object-fit: cover;
      }

      .play_icon {
        width: 32px;
        height: 32px;
        background: url('~@/assets/img/traceSource/play.png') no-repeat center;
        padding: 30px;
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }

      .tit_bar {
        width: 160px;
        height: 22px;
        position: relative;
        z-index: 1;
        margin: 0 auto;

        &::after {
          content: '';
          position: absolute;
          z-index: 2;
          width: 160px;
          height: 22px;
          top: 0;
          left: 0;
          background: linear-gradient(270deg,
          rgba(0, 162, 255, 0) 0%,
          #00a2ff 52%,
          rgba(0, 162, 255, 0) 100%);
          opacity: 0.3;
        }

        .tit_bar_double {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 22px;
          line-height: 22px;
          position: absolute;
          z-index: 3;
          top: 0;
          left: 0;
        }

        .tit {
          margin: 0 10px;
          max-width: 270px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          font-weight: bold;
          color: #f8f8f8;
        }

        .dot {
          flex-shrink: 0;
          width: 12px;
          height: 12px;
          background: url('~@/assets/img/traceSource/dot.png') no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}

.scroll_bar {
  scrollbar-color: #fff rgba(255, 255, 255, 0.2); /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
  /* 浏览器滚动条样式 */
  /* width */

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: none;
  }

  /* Track */

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.2) !important;
    border-radius: 8px;
  }

  /* Handle */

  &::-webkit-scrollbar-thumb {
    background: #fff !important;
    border-radius: 8px;
  }

  /* Handle on hover */

  &::-webkit-scrollbar-thumb:hover {
    background: #666 !important;
    cursor: pointer;
  }
}

</style>
