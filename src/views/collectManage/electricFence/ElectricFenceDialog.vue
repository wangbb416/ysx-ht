<!-- 电子围栏 -->
<template>
  <div class="electricFenceDialog_page" id="electricFenceDialog_page" v-if="dialogVisibleShow">
    <el-dialog
        title="查看"
        :visible.sync="dialogVisibleShow"
        :modal-append-to-body="true"
        :append-to-body="true"
        width="1100px"
        :close-on-click-modal="false"
        top="5vh"
        :before-close="handleClose"
    >
      <div class="dialog_content">
        <el-form
            :model="addData"
            label-width="120px"
            size="small"
            ref="addData"
            :inline="true"
        >
          <el-form-item label="小蚂蚁">
            <div class="value">{{ resData.clientName }}</div>
          </el-form-item>
          <el-form-item label="小蓝之家">
            <div class="value">{{ resData.companyName }}</div>
          </el-form-item>

          <el-form-item label="手机号">
            <div class="value">{{ resData.linkPhone }}</div>
          </el-form-item>
          <el-form-item label="工作时间">
            <div class="value">
              <div class="value flex" v-if="detail.weekDays && detail.weekDays.length>0">
                <template>
                  <div v-for="(item,index) in detail.weekDays" :key="index">
                    {{ week(item) }}<span v-if="index+1<=detail.weekDays.length-1">、</span>
                  </div>
                </template>
              </div>
              <div class="value flex" v-if="detail.clientWorkTimeList && detail.clientWorkTimeList.length>0">
                <template>
                  <div v-for="(item,index) in detail.clientWorkTimeList" :key="index">
                    {{ item.startTime }}-{{ item.endTime }}<span
                      v-if="index+1<=detail.clientWorkTimeList.length-1">，</span>
                  </div>
                </template>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="选择日期" style="position: relative;">
            <el-date-picker
                v-model="selectDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :clearable="false"
                @change="searchTrack"
            >
            </el-date-picker>
            <div class="button-blue track" @click="searchTrack" v-fastClick v-if="MenuBtnValid('/electricFence','查看轨迹')">查看轨迹</div>
            <div class="button-blue showAll" @click="showAllScreen" v-fastClick v-if="mapContain">
              {{ showAll ? '关闭' : '展开' }}
            </div>
          </el-form-item>
        </el-form>
        <!-- 地图 -->
        <div>
          <div id="container" class="map" tabindex="0"></div>
        </div>
        <!-- 预警 -->
        <div class="warning_box">
          <div class="warning_head">
            <div>预警</div>
            <div>合计: {{ resData.total }}次, 记过: {{ resData.demerit }}次, 待处理: {{ resData.waitProcessed }}次</div>
          </div>
          <el-table border :data="tableData" style="width: 100%" v-loading="loading"
                    element-loading-text="加载中" element-loading-spinner="el-icon-loading">
            <el-table-column type="index" :index="getIndex" label="序号" width="70"></el-table-column>
            <el-table-column prop="" label="预警时间" show-overflow-tooltip width="160">
              <template slot-scope="scope">
                <div>{{ timeStampSwitch(scope.row.alarmTime, "", "yy/mm/dd") }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="类型" show-overflow-tooltip width="160">
              <template slot-scope="scope">
                <div>{{ scope.row.alarmType == 1 ? '超过电子围栏' : scope.row.alarmType == 2 ? 'GPS离线' : '' }}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="最近电子围栏GPS" width="180">
              <template slot-scope="scope">
                <div>经度:{{scope.row.fenceLon}},纬度:{{scope.row.fenceLat}}</div>
              </template>
            </el-table-column> -->
            <el-table-column prop="" label="超出位置GPS" width="">
              <template slot-scope="scope">
                <div>经度:{{ scope.row.lon }},纬度:{{ scope.row.lat }}</div>
              </template>
            </el-table-column>

            <el-table-column prop="" label="预警处理状态" width="110">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.applyStatus == 0 ? '待处理' : scope.row.applyStatus == 1 ? '已记过' : scope.row.applyStatus == 2 ? '已忽略' : '' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" v-if="MenuBtnValid('/electricFence','标记/忽略')">
              <template slot-scope="scope" v-if="scope.row.applyStatus==0" >
                <el-button @click="handleOpenDialog('1',scope.row)" type="text" size="small"
                >记过
                </el-button>
                <el-button @click="handleOpenDialog('2',scope.row)" type="text" size="small"
                >忽略
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <div class="data-total">共{{ total }}项数据</div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                layout="sizes, prev, pager, next, jumper"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pageSize"
                :total="total"
            >
            </el-pagination>
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>


<script>
import {timeStampSwitch} from "@/utils/util.js";
// WGS84坐标系转高德坐标系：
import {toGCJ02} from "@/utils/gcoord.js";
import {dateGrain} from "@/utils/methods";

export default {
  name: "electricFenceDialog",
  data() {
    return {
      tableData: [],

      addData: {
        id: null,
        serialNumber: "",
        deviceModel: "",
        name: "",
      },

      loading: false,
      selectDate: "",//日期选择
      showAll: false,
      mapContain: null,


      // 地图轨迹
      trackData: [],
      startIcon: null,//轨迹开始图标
      endIcon: null,//轨迹结束图标
      markerArr: [],//所有开始结束的轨迹图标数组

      polygonData: [], // 围栏
      timeStampSwitch,
      detail: {},

      overMarkerData: [],//超出围栏的所有坐标点
      overMarkerIcon: null,//海量标记点icon

      labelsLayer: null,//海量标记点实例


      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,

    };
  },
  created() {

  },
  props: {
    dialogVisibleShow: {
      type: Boolean,
      require: true,
    },
    resData: {
      type: [Object, Array],
      require: true,
    },
  },
  watch: {
    dialogVisibleShow: {
      handler(newVal) {
        if (newVal) {
          this.showAll = false
          this.getDetail()

          let date = new Date();
          let t = dateGrain(date.getTime());
          this.selectDate = `${t.dateYear}-${t.dateMonth}-${t.dateDay}`

          this.getTableData()

          setTimeout(() => {
            this.mapInit()
          }, 100);
        }
      },
      immediate: true,
    },
  },
  methods: {
    mapInit() {
      var layer = new AMap.createDefaultLayer({
        // zooms:[10,20],    //可见级别
        visible: true,    //是否可见
        opacity: 1,       //透明度
        zIndex: 1        //叠加层级
      })
      this.mapContain = new AMap.Map('container', {
        layers: [layer] //当只想显示标准图层时layers属性可缺省
      });
      // this.mapContain.setZoom(13)
      this.startIcon = new AMap.Icon({
        image: require('../../../assets/img/usually/start.svg'),  // Icon的图像
        imageSize: new AMap.Size(20, 20)   // 根据所设置的大小拉伸或压缩图片
      });
      this.endIcon = new AMap.Icon({
        image: require('../../../assets/img/usually/end.svg'),  // Icon的图像
        imageSize: new AMap.Size(20, 20)   // 根据所设置的大小拉伸或压缩图片
      });

      // 海量标记点icon
      this.overMarkerIcon = {
        type: 'image',
        image: require('../../../assets/img/usually/overMark.svg'),
        size: [30, 30],
        // 图片相对 position 的锚点，默认为 bottom-center
        anchor: 'center',
      };

      //添加图层到地图上面
      this.labelsLayer = new AMap.LabelsLayer({
        visible: true,
        // zooms: [0, 20],
        opacity: 1,
        collision: false,//标注层内的标注是否避让,如果避让，就会出现鼠标放上去
        allowCollision: false,//标注层内的标注是否允许其它标注层对它避让
      });
      // 将 LabelsLayer 添加到地图上
      this.mapContain.add(this.labelsLayer);

      this.getTraceGeofenceList()

      this.getTrackData()

      this.getOverMarkerList()
    },
    //获取围栏数据
    getTraceGeofenceList() {
      this.$http(this.GLOBALApi.getTraceGeofenceList())
          .then((res) => {
            if (res.code == 200 && res.data) {
              let data = res.data
              if (data && data.length > 0) {
                data.map(item => {
                  if (item.wgs && item.wgs.length) {
                    // 每个坐标
                    let polygon = new AMap.Polygon({
                      path: item.wgs,
                      fillColor: '',
                      strokeOpacity: 1,
                      fillOpacity: 0,
                      strokeColor: 'red',
                      strokeWeight: 2,
                      strokeStyle: 'dashed',
                      strokeDasharray: [5, 5],
                    });
                    this.polygonData.push(polygon)

                  }
                  ;
                })
                if (this.polygonData.length > 0) {
                  this.mapContain.add(this.polygonData)
                  this.mapContain.setFitView()
                  this.mapContain.setZoom(8)
                }

              } else {
                this.$message.warning("暂无围栏数据")
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 查询轨迹
    searchTrack() {
      this.getTrackData()
      this.getOverMarkerList()
    },

    getTrackData() {
      // 清除轨迹和覆盖区域
      this.removeTrack()

      let params = {
        clientNo: this.resData.clientNo,//小蚂蚁id
        startTime: this.selectDate + ` 00:00:00`,
        endTime: this.selectDate + ` 23:59:59`,
      }
      this.trackData = []
      this.$http(this.GLOBALApi.getDeviceLocationList(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              let data = res.data || [];

              if (data && data.length > 0) {
                let flag = false

                // 每一条轨迹数组
                data.map(item => {
                  if (item && item.length > 0) {
                    flag = true
                    let dealArr = []
                    // 每个坐标
                    item.map(j => {
                      const gpsLocation = toGCJ02(j);
                      dealArr.push(gpsLocation)
                    })

                    // 轨迹
                    let polyline = new AMap.Polyline({
                      path: dealArr,            // 设置线覆盖物路径
                      showDir: true,
                      dirColor: '#eee',//箭头颜色
                      strokeColor: '#3366bb',   // 线颜色
                      strokeWeight: 8           // 线宽
                    });
                    this.trackData.push(polyline)

                    // 将 Icon 实例添加到 marker 上:
                    let marker = new AMap.Marker({
                      position: new AMap.LngLat(dealArr[0][0], dealArr[0][1]),
                      offset: new AMap.Pixel(-10, -10),
                      icon: this.startIcon,
                    });
                    let marker2 = new AMap.Marker({
                      position: new AMap.LngLat(dealArr[dealArr.length - 1][0], dealArr[dealArr.length - 1][1]),
                      offset: new AMap.Pixel(-10, -10),
                      icon: this.endIcon,
                    });
                    this.markerArr.push(marker, marker2)
                  }
                })
                // 是否存在轨迹
                if (!flag) {
                  this.$message.warning("暂无轨迹数据")
                } else {
                  this.addTrack()
                }

              } else {
                this.$message.warning("暂无轨迹数据")
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 绘制轨迹
    addTrack() {
      if (this.trackData && this.trackData.length) {
        this.mapContain.add(this.trackData)
        this.mapContain.add(this.markerArr)
        this.mapContain.setFitView()
      }
    },
    removeTrack() {
      if (this.trackData && this.trackData.length) {
        this.mapContain.remove(this.markerArr)
        this.mapContain.remove(this.trackData)
      }
    },

    // 展开/关闭
    showAllScreen() {
      // this.mapContain.destroy();
      this.showAll = !this.showAll
      if (this.showAll) {
        document.getElementById("container").setAttribute("style", "width: 950px;height: 600px;");
      } else {
        document.getElementById("container").setAttribute("style", "width: 415px;height: 300px;");
      }
      // this.mapInit()
      // if (this.trackData && this.trackData.length>0 && this.trackData[0].length>0) {
      //   this.drawTrack()
      // }
      // if (this.polygonData && this.polygonData.length>0 && this.polygonData[0].length>0) {
      //   this.drawPolygon()
      // }
    },


    // 预警列表
    getTableData() {
      // console.log("-----------------",this.resData);
      this.loading = true;
      this.tableData = []
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        clientNo: this.resData.clientNo
      };
      this.$http(this.GLOBALApi.clientDeviceAlarmList(), params)
          .then((res) => {
            if (res.code == 200 && res.data) {
              this.loading = false;

              this.total = res.data.total || 0;
              this.tableData = res.data.records || [];
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
    // 超出围栏的海量标记点
    getOverMarkerList() {
      if (!this.resData.clientNo) {
        return
      }
      this.removeOverMark()

      this.overMarkerData = []
      this.$http(
          this.GLOBALApi.clientDeviceAlarmList(),
          {
            pageNum: 1,
            pageSize: 999999999,
            clientNo: this.resData.clientNo,
            startTime: this.selectDate + ` 00:00:00`,
            endTime: this.selectDate + ` 23:59:59`,
            // startTime:'2022-10-17 00:00:00',
            // endTime:'2022-10-17 23:59:59',
          }
      )
          .then((res) => {
            if (res.code == 200) {
              let records = res.data.records || []
              if (records && records.length > 0) {
                res.data.records.map((item) => {
                  if (item && item.alarmType == 1) {
                    let arr = []
                    arr.push(item.lon, item.lat)
                    let gpsLocation = toGCJ02(arr);
                    console.log(gpsLocation);


                    var labelMarker = new AMap.LabelMarker({
                      name: item.id, // 此属性非绘制文字内容，仅最为标识使用
                      position: gpsLocation,
                      zIndex: 16,
                      // 将第一步创建的 icon 对象传给 icon 属性
                      icon: this.overMarkerIcon,
                    });
                    this.overMarkerData.push(labelMarker)
                  }
                });
                console.log(this.overMarkerData);
                this.addOverMark()
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.message);
          });
    },
    // 绘制海量标记点
    addOverMark() {
      if (this.overMarkerData && this.overMarkerData.length > 0) {
        this.mapContain.add(this.overMarkerData)
      }
    },
    removeOverMark() {
      if (this.overMarkerData && this.overMarkerData.length > 0) {
        this.mapContain.remove(this.overMarkerData)
      }
    },


    //二次确认
    handleOpenDialog(type, item) {
      let url = this.GLOBALApi.clientDeviceAlarmAudit()
      let operateSuccess = ''
      let params = {
        recordNo: item.recordNo,
        applyStatus: type
      };
      switch (type) {
        case '1':
          operateSuccess = "记过成功"
          this.$confirm("确认记过吗?", "记过确认")
              .then(() => {
                this.dealBtn(url, params, operateSuccess, type);
              })
              .catch((error) => {
                console.log(error);
              });
          break;
        case '2':
          operateSuccess = "忽略成功"
          this.$confirm("确认忽略吗?", "忽略确认")
              .then(() => {
                this.dealBtn(url, params, operateSuccess, type);
              })
              .catch((error) => {
                console.log(error);
              });
          break;

        default:
          break;
      }
    },
    // 记过,忽略
    dealBtn(url, params, operateSuccess, type) {
      this.$http(url, params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              if (type == "1") {
                this.$set(this.resData, "demerit", this.resData.demerit + 1)
                this.$set(this.resData, "waitProcessed", this.resData.waitProcessed - 1)

              } else if (type == "2") {
                this.$set(this.resData, "waitProcessed", this.resData.waitProcessed - 1)
              }
              this.$message.success(operateSuccess);
              this.getTableData();
              this.$emit("refresh");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });

    },
    // 查看详情
    getDetail() {
      this.$http(this.GLOBALApi.clientAntsGetById(), {no: this.resData.clientNo})
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.detail = res.data
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getTableData();
    },

    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    },
    // 关闭弹窗
    handleClose() {
      this.$emit("close");
    },
    // 工作时间处理
    week(val) {
      let weekComputed = ""
      switch (val) {
        case 1:
          weekComputed = "周一"
          break;
        case 2:
          weekComputed = "周二"
          break;
        case 3:
          weekComputed = "周三"
          break;
        case 4:
          weekComputed = "周四"
          break;
        case 5:
          weekComputed = "周五"
          break;
        case 6:
          weekComputed = "周六"
          break;
        case 7:
          weekComputed = "周日"
          break;

        default:
          break;
      }
      return weekComputed
    }
  },
  computed:{
  },
};
</script>

<style lang="less" scoped>
.electricFenceDialog_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/deep/ .el-form--inline .el-form-item:not(:last-child) {
  margin-right: 80px;
}

/deep/ .el-form-item__label {
  padding-right: 24px;
}

/deep/ .el-select.el-select--small {
  width: 320px;


  .el-input.el-input--small.el-input--suffix {
    width: 200px !important;
  }
}


/deep/ .el-input.el-input--small.el-input--suffix {
  width: 200px !important;
}

/deep/ .el-range-editor--small.el-input__inner {
  width: 320px;
}

.search-bt {
  min-width: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;


  & > div {
    cursor: pointer;
    margin-left: 10px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
  }
}


.button-white {
  color: #0052d9;
  border: solid 1px #0052d9;
}


.button-white:hover {
  background-color: #ecf5ff;
}


.button-blue {
  cursor: pointer;
  margin-left: 10px;
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}


.button-blue:hover {
  background-color: #66b1ff;
  border: solid 1px #66b1ff;
}

.el-input-slot__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 32px;


  img {
    width: 16px;
    height: 16px;
    padding-top: 7px;
  }
}

/deep/ .el-pagination.is-background {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
}


.data-total {
  font-size: 14px;
  color: #fff;
}

.button-blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052D9;
}

/deep/ .dialog_content .el-input.el-input--small.el-input--suffix {
  width: 250px;
}

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}

.dialog_content {
  // display: flex;
  // flex-direction: column;
  .value {
    width: 250px;
  }

  .flex {
    width: 450px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .track {
    position: absolute;
    right: -100px;
    top: 0;
    width: 80px;
  }

  .showAll {
    position: absolute;
    right: -180px;
    top: 0;
  }

  #container {
    width: 415px;
    height: 300px;
    margin-left: 43px;
    position: relative;
  }

  .warning_box {
    margin-left: 43px;
    width: 950px;
    margin-top: 50px;

    .warning_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }

}
</style>
