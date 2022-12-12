<template>
  <div class="dispatchsheet_detail">
    <el-dialog
        :title="editeStatus === 1 ? '新增' : editeStatus === 2 ? '修改' : '查看'"
        :visible.sync="dialogVisible"
        width="1400px"
        :before-close="handleClose"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="false"
        top="10vh"
    >
      <div class="dialog_content">
        <el-form
            :model="addValue"
            :rules="addValueRules"
            label-width="108px"
            label-position="left"
            size="small"
            ref="addValue"
            inline
        >
          <el-form-item label="运输公司" prop="transportCompanyNo">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.transportCompanyNo"
                placeholder="请选择"
                clearable
                filterable
                @change="transportCompanyChange"
            >
              <el-option
                  v-for="item in transportCompanyOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.transportCompanyName }}
            </div>
          </el-form-item>

          <el-form-item label="负责人">
            <el-input
                placeholder="暂无数据"
                v-if="editeStatus !== 3"
                :value="director"
                :disabled="true"
            >
            </el-input>
            <div v-else class="static_data">
              {{ director }}
            </div>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input
                placeholder="暂无数据"
                v-if="editeStatus !== 3"
                :value="directorPhone"
                :disabled="true"
            >
            </el-input>
            <div v-else class="static_data">
              {{ directorPhone }}
            </div>
          </el-form-item>

          <el-form-item label="运输日期" prop="transportPlanDate">
            <el-date-picker
                v-if="editeStatus !== 3"
                v-model="addValue.transportPlanDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOption"
            >
            </el-date-picker>
            <div v-else class="static_data">
              {{ getFormatTime(detailData.transportPlanDate, "dateDay") }}
            </div>
          </el-form-item>

          <el-form-item label="运输车辆" prop="transportVehicleNo">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.transportVehicleNo"
                @change="handleVihicleChange"
                placeholder="请选择"
                clearable
                filterable
            >
              <el-option
                  v-for="item in vihicleOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.transportVehicleName }}
            </div>
            <!-- <span v-if="editeStatus !== 3" id="vihicle_loading"></span> -->
          </el-form-item>

          <el-form-item label="GPS序列号" prop="transportVehicleCode">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.transportVehicleCode"
                placeholder="请选择"
                clearable
                filterable
            >
              <el-option
                  v-for="item in vihicleGpsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.transportVehicleCode }}
            </div>
            <div v-if="editeStatus !== 3" class="illustrate-text">
              说明：该车辆常用的GPS为[GPS名称]-[GPS序列号]
            </div>
          </el-form-item>

          <el-form-item label="运输司机" prop="transportUserNo">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.transportUserNo"
                @change="handleDriverChange"
                placeholder="请选择"
                clearable
                filterable
            >
              <el-option
                  v-for="item in driverOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.transportUserName }}
            </div>
            <!-- <span v-if="editeStatus !== 3" id="driver_loading"></span> -->
          </el-form-item>

          <el-form-item label="手环序列号" prop="transportRingDeviceCode">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.transportRingDeviceCode"
                placeholder="请选择"
                clearable
                filterable
            >
              <el-option
                  v-for="item in driverGpsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.transportRingDeviceCode }}
            </div>
            <div v-if="editeStatus !== 3" class="illustrate-text">
              说明：该司机常用的手环为[手环名称]-[手环序列号]
            </div>
          </el-form-item>

          <el-form-item label="小蓝之家类型" prop="homeIslandType">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.homeIslandType"
                placeholder="请选择"
                clearable
                @change="handleTypeChange(false)"
            >
              <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ xiaolanStatusDict[detailData.homeIslandType] }}
            </div>
          </el-form-item>

          <el-form-item label="中转仓" prop="warehouseNo">
            <el-select
                v-if="editeStatus !== 3"
                v-model="addValue.warehouseNo"
                placeholder="请选择"
                clearable
                filterable
            >
              <el-option
                  v-for="item in storageDeviceOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.warehouseName }}
            </div>
          </el-form-item>

          <el-form-item label="收集重量(kg)" v-if="editeStatus == 3">
            <div class="static_data">
              {{ detailData.collectWeight }}
            </div>
          </el-form-item>

          <el-form-item label="收集包数(kg)" v-if="editeStatus == 3">
            <div class="static_data">
              {{ detailData.collectCount }}
            </div>
          </el-form-item>


        </el-form>

        <div class="production-waste">
          <a>*</a>选择产废
        </div>

        <div class="table">
          <el-table
              ref="selectTable"
              :data="tableData"
              @select="handleCurrentChange"
              @select-all="handleAllCurrentChange"
              style="width: 100%"
              max-height="300"
              v-loading="loading"
              element-loading-text="加载中"
              element-loading-spinner="el-icon-loading"
              :class="[singleChoice && editeStatus !== 3 ? 'singleChoice' : '']"
          >
            <!-- 插槽   1: 新增  2：修改  3: 查看-->
            <el-table-column type="expand" v-if="editeStatus==3" :key="101">
              <template slot-scope="scope">
                <el-table
                    :data="scope.row.collectBlockResList"
                    border
                    style="width: 100%;">
                  <el-table-column
                      v-for="(col, index) in scope.row.rowHeader"
                      :key="index"
                      :prop="col.prop"
                      :label="col.label"
                      show-overflow-tooltip
                      width="150"
                  >
                    <template slot-scope="scope">
                        <span>
                          {{ scope.row[col.prop] }}
                        </span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
                :key="102"
                type="selection"
                width="60"
                v-if="[1, 2].includes(editeStatus)"
                :selectable="checkSelectable"
            >
            </el-table-column>
            <el-table-column prop="index" label="序号" width="60" :key="103">
            </el-table-column>
            <el-table-column
                prop="xiaolan"
                label="小蓝之家"
                show-overflow-tooltip
                :key="104"
                width="170"
            ></el-table-column>
            <el-table-column
                prop="parent"
                label="管理员"
                show-overflow-tooltip
                :key="105"
                width="90"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="联系方式"
                width="120"
                show-overflow-tooltip
                :key="106"
            >
            </el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip :key="107" width="220">
            </el-table-column>
            <el-table-column prop="type" label="类型" :key="108" width="90">
              <template slot-scope="scope">
                <div>{{ xiaolanStatusDict[scope.row.type] }}</div>
              </template>
            </el-table-column>
            <el-table-column
                prop="transforWeight"
                label="预估重量(kg)"
                width="110"
                show-overflow-tooltip
                :key="109"
            ></el-table-column>
            <el-table-column
                prop="applyCodeNumber"
                label="预估包数(包)"
                width="110"
                show-overflow-tooltip
                :key="110"
            ></el-table-column>
            <!-- <el-table-column prop="pureWeight" label="透明PET(kg)" width="110"></el-table-column>
            <el-table-column prop="blueWeight" label="蓝色PET(kg)" width="110"></el-table-column>
            <el-table-column prop="greenWeight" label="绿色PET(kg)" width="110"></el-table-column>
            <el-table-column prop="mixWeight" label="杂色PET(kg)" width="110"></el-table-column> -->
            <el-table-column
                prop="reportTime"
                label="申请时间"
                :key="111"
                width="170"
                show-overflow-tooltip
            ></el-table-column>
            <el-table-column
                v-if="editeStatus != 1"
                prop="collectStatus"
                label="状态"
                :key="112"
            ></el-table-column>
          </el-table>
          <div style="color: #fff; text-align: right; margin-top: 10px" v-if="editeStatus != 3">
            预估总量：{{ Number(totalWeight).toFixed(3) || 0 }}kg，{{ totalNumber }}包
          </div>
        </div>

      </div>
      <!-- 只有查看时显示 -->
      <div v-if="editeStatus==3">
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>作业视频
        </div>

        <div class="videos" v-if="videoList.length">
          <div
              class="video_li"
              v-for="(item, index) in videoList"
              :key="index"
              @click="handlePlayVideo(item)"
          >
            <div class="li">
              <img :src="item.titlePage" alt="" v-if="item.titlePage && item.titlePage.length">
              <img src="@/assets/img/home/videoBg.svg" alt="" v-else>
              <img class="palyBtn" src="@/assets/img/home/playBtn.png" alt="播放">
            </div>
            <div class="vedio-text" :title="item.name">{{ item.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>
      </div>
      <div v-if="editeStatus === 3&&detailData.status == 4">
        <div class="labeltxt">
          <label class="label_title"><a style="color: red; margin-right: 3px">*</a>入库重量</label>
          <label>{{ detailData.inputWeight || 0 }}kg</label>
        </div>

        <div class="labeltxt">
          <label class="label_title"><a style="color: red; margin-right: 3px">*</a>入库时间</label>
          <label>{{ getFormatTime(detailData.inputTime, "") }}</label>
        </div>


        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>入库视频
        </div>

        <div class="videos" v-if="inputVideoList.length">
          <div
              class="video_li"
              v-for="(item, index) in inputVideoList"
              :key="index"
              @click="handlePlayVideo(item)">
            <div class="li">
              <img :src="item.titlePage" alt="" v-if="item.titlePage && item.titlePage.length">
              <img src="@/assets/img/home/videoBg.svg" alt="" v-else>
              <img class="palyBtn" src="@/assets/img/home/playBtn.png" alt="播放">
            </div>
            <div class="vedio-text" :title="item.name">{{ item.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>

      </div>


      <span slot="footer">
        <div v-if="editeStatus !== 3" class="button_blue" @click="handleSubmit" v-fastClick>
          确定
        </div>
        <div v-else-if="detailData.status === 1"
             class="button_blue"
             @click="handleChangeStatus(2)"
             v-fastClick>
          修改
        </div>
      </span>
    </el-dialog>


    <!-- 视频预览 -->
    <el-dialog
        title="视频预览"
        :visible.sync="videoPreview"
        width="720px"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="true"
        top="10vh">
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
import {getFormatTime} from "@/utils/methods";

export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    editeStatus: {
      type: Number,
      require: true,
    },
    updateId: [Number, String],
  },
  data() {
    return {
      vihicleOption: [], //车辆数据
      driverOption: [], //司机数据
      vihicleGpsOption: [], //车辆gps数据
      driverGpsOption: [], //司机手环gps
      transportCompanyOption: [], //运输公司
      detailData: {},
      xiaolanStatusDict: {},
      getFormatTime,
      storageDeviceOption: [], //所有中转仓

      // 新增
      apiLoading: false,
      addValue: {
        //表单数据
        transportCompanyNo: "", //运输公司id
        // transportCompanyName: "", //运输公司名称

        transportUserNo: "", //司机
        transportRingDeviceCode: "", //手环编号
        // transportUserName: "", //司机名称
        // transportUserPhone: "", //司机电话
        // transportRingDeviceId: "", //手环id

        transportVehicleNo: "", //运输车辆id
        transportVehicleCode: "", //车辆GPS
        // transportVehicleName: "", //运输车辆名称

        homeIslandType: 1, //小蓝之家地理状态 1：内陆 2：海岛
        transportPlanDate: "", //运输日期
        warehouseNo: "", //中转仓
      },
      addValueRules: {
        transportCompanyNo: [
          {required: true, message: "请选择运输公司", trigger: ["blur", "change"]},
        ],
        transportVehicleNo: [
          {required: true, message: "请选择运输车辆", trigger: ["blur", "change"]},
        ],
        transportVehicleCode: [
          {
            required: true,
            message: "请选择GPS序列号",
            trigger: ["blur", "change"],
          },
        ],
        transportUserNo: [
          {required: true, message: "请选择运输司机", trigger: ["blur", "change"]},
        ],
        transportRingDeviceCode: [
          {
            required: true,
            message: "请选择手环序列号",
            trigger: ["blur", "change"],
          },
        ],
        homeIslandType: [
          {required: true, message: "请选择小蓝之家类型", trigger: ["blur", "change"]},
        ],
        transportPlanDate: [
          {required: true, message: "请选择运输日期", trigger: ["blur", "change"]},
        ],
        warehouseNo: [
          {required: true, message: "请选择中转仓", trigger: ["blur", "change"]},
        ],
      },

      // 表格
      tableData: [],
      loading: false,
      singleChoice: false, //是否单选
      selectData: [], //选中的数据id
      selectDataDetail: [], //选中的数据
      totalWeight: 0, //预估总量
      totalNumber: 0,

      // 视频
      videoList: [], //视频列表
      inputVideoList: [],//入库视频
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址

      // 收集单状态
      collectionTaskStatus: {
        1: "待审核",
        2: "已通过",
        3: "未通过",
        4: "运输完成",
        5: "待发车",
        6: "待到达",
        7: "装车中",
        8: "装车完成",
      },
      seaPlasticType: [],//塑料块类型
      seaPlasticTypeDict: [],//海塑种类

      statusOptions: []
    };
  },
  created() {
    this.getDictionary()
    this.getHaisuKinds()

  },
  computed: {
    // 负责人
    director() {
      console.log('11111111111');

      if (this.transportCompanyOption.length > 0) {
        let temp = this.transportCompanyOption.filter(
            (item) => item.value === this.addValue.transportCompanyNo
        );
        return temp.length ? temp[0].linkPersonName : "";
      }
    },
    // 手机号
    directorPhone() {
      if (this.transportCompanyOption.length > 0) {
        let temp = this.transportCompanyOption.filter(
            (item) => item.value === this.addValue.transportCompanyNo
        );
        return temp.length ? temp[0].linkPersonPhone : "";
      }
    },
    pickerOption() {
      if (this.editeStatus) {
        let that = this;
        return {
          disabledDate(date) {
            if (that.editeStatus === 1) {
              return (
                  new Date(date).getTime() < new Date().getTime() - 1000 * 60 * 60 * 24
              );
            } else if (that.editeStatus === 2) {
              if (that.detailData.reportTime) {
                return (
                    new Date(date).getTime() < that.detailData.reportTime - 1000 * 60 * 60 * 24
                );
              } else {
                return false;
              }
            }
          },
        };
      }
    }
  },
  methods: {
    // 获取字典
    getDictionary() {
      this.statusOptions = []
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ['land_type']
      })
          .then(res => {
            if (res.code === 200 && res.data) {
              let records = res.data || []
              records.map((item, index) => {
                item.dictList = item.dictList || []
                if (item.dictType === 'land_type') {
                  for (let temp of item.dictList) {
                    this.statusOptions.push({
                      label: temp.dictValueDesc,
                      value: temp.dictValue ? Number(temp.dictValue) : ''
                    })
                  }
                  this.getStatusDict();
                }
              })
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(error => {
            this.$message.error(error.msg)
          })
    },
    getHaisuKinds() {
      // 请求塑料类型接口
      this.seaPlasticTypeDict = []
      this.seaPlasticType = []
      this.$http(this.GLOBALApi.getDictionaryListByCode(), {no: 'plasticType'})
          .then((res) => {
            if (res.code === 200 && res.data) {

              for (let item of res.data) {
                this.$nextTick(() => {
                  this.seaPlasticType.push({
                    label: item.categoryName,
                    value: item.categoryNo,
                  })
                })
                this.$set(this.seaPlasticTypeDict,  item.categoryNo, item.categoryName);
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    init() {
      this.addValue.transportVehicleNo = ''
      this.addValue.transportVehicleCode = ''
      this.addValue.transportUserNo = ''
      this.addValue.transportRingDeviceCode = ''
      // this.addValue.transportRingDeviceNo = ''
      // this.addValue.warehouseNo = ''
      this.vihicleOption = []
      this.driverOption = []
      // this.vihicleGpsOption = []
      // this.driverGpsOption = []
    },

    // 运输公司数据更改:
    transportCompanyChange() {
      this.init()
    },
    // 详情
    getDetailData() {
      this.$http(this.GLOBALApi.getTransportDispatchDetail(), {
        no: this.updateId,
      })
          .then((res) => {
            if (res.code == 200 && res.data) {
              this.total = res.data.total || 0;
              let data = res.data;

              // this.selectData = data.collectOrderNos.trim()
              //   ? data.collectOrderNos.trim().split(",")
              //   : [];
              // this.selectData = data.collectOrderNos
              //     ? data.collectOrderNos
              //     : [];
              this.selectData = []

              if (data.collectOrderResList && data.collectOrderResList.length>0) {
                data.collectOrderResList.map(item=>{
                  this.selectData.push(item.orderNo)
                })
              }
              this.selectDataDetail = data.collectOrderResList//以勾选的数据
              console.log("以勾选的数据", this.selectDataDetail);
              this.addValue = {
                transportCompanyNo: data.transportCompanyNo,
                transportUserNo: data.transportUserNo,
                transportRingDeviceCode: data.transportRingDeviceCode, //手环编号
                transportVehicleNo: data.transportVehicleNo, //运输车辆id
                transportVehicleCode: data.transportVehicleCode, //车辆GPS
                homeIslandType: data.homeIslandType, //小蓝之家地理状态 1：内陆 2：海岛
                transportPlanDate: getFormatTime(data.transportPlanDate, "dateDay"), //运输日期
                warehouseNo: data.warehouseNo, //中转仓
              };
              this.detailData = data;
              this.videoList = data.videoList || [];
              this.inputVideoList = data.inputVideoList || [];

              if (this.editeStatus === 2) {
                this.handleTypeChange(true);
              } else if (this.editeStatus === 3) {
                this.tableData = [];
                this.totalWeight = 0;
                this.totalNumber = 0;
                this.handleData(data.collectOrderResList || []);
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error);
          });
    },
    // 运输公司信息
    getTransportCompanyData() {
      this.transportCompanyOption = []
      this.$http(this.GLOBALApi.getTransportCompany(), {
        // pageNum: 1,
        // pageSize: 9999999,
        // status: 0
      })
          .then((res) => {
            if (res.code === 200 && res.data) {
              let records = res.data || [];
              records.map((item, index) => {
                let temp = {label: item.name, value: item.companyNo, ...item};
                this.transportCompanyOption.push(temp);
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 运输车辆
    getVihicleData() {
      this.$http(this.GLOBALApi.getAllTransportVihicle(), {
        companyNo: this.addValue.transportCompanyNo,
        // status: 0
      })
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              this.vihicleOption = [];
              records.map((item, index) => {
                let temp = {
                  label: `${item.name}-${item.vehicleCapacityWeight}t`,
                  value: item.vehicleNo,
                  ...item,
                };
                this.vihicleOption.push(temp);
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 运输司机
    getDriverData() {
      this.driverOption = [];
      this.$http(this.GLOBALApi.getAllTransportGriver(), {
        no: this.addValue.transportCompanyNo,
        roleId: 7,
      })
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              records.map((item, index) => {
                let temp = {
                  label: item.name,
                  value: item.clientNo,
                  phone: "",
                  ...item,
                };
                this.driverOption.push(temp);
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 手环序列号
    getDriverGpsData() {
      this.$http(this.GLOBALApi.getDeviceGps(), {
        // pageNum: 1,
        // pageSize: 9999999,
        deviceType: 1,
        // bindStatus: 0,
        status: 0,
      })
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              this.driverGpsOption = [];
              records.map((item, index) => {
                let temp = {
                  label: `${item.name}-${item.deviceCode}`,
                  value: item.deviceCode,
                  ...item,
                };
                this.driverGpsOption.push(temp);
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // GPS序列号
    getVihicleGpsData() {
      this.$http(this.GLOBALApi.getDeviceGps(), {
        // pageNum: 1,
        // pageSize: 9999999,
        deviceType: 2,
        // bindStatus: 0,
        status: 0,
      })
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              this.vihicleGpsOption = [];
              records.map((item, index) => {
                let temp = {
                  label: `${item.name}-${item.deviceCode}`,
                  value: item.deviceCode,
                  ...item,
                };
                this.vihicleGpsOption.push(temp);
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    //获取中转仓下拉列表
    getStorageDevice() {
      this.$http(this.GLOBALApi.getStorageDevice(), {status: 0})
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              this.storageDeviceOption = [];
              records.map((item, index) => {
                // if (item.bindFlag) {
                let temp = {
                  label: item.name,
                  value: item.companyNo,
                };
                this.storageDeviceOption.push(temp);
                // }
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    getStatusDict() {
      for (let item of this.statusOptions) {
        this.$set(this.xiaolanStatusDict, item.value, item.label);
      }
    },
    // 提交

    updateDate(params, apiMethod) {
      if (this.apiLoading) {
        return;
      }
      this.apiLoading = true;

      this.$http(apiMethod, params)
          .then((res) => {
            this.apiLoading = false;
            if (res.code === 200 && res.data) {
              this.$message.success("提交成功");
              this.$emit("close", true);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.apiLoading = false;
            this.$message.error(error.msg);
          });
    },

    handleTransportCompanyChange(value) {
      console.log("handleTransportCompanyChange", value);
      this.vihicleOption = [];
      this.driverOption = [];
      if (!value) {
        return;
      }

      // 根据运输公司请求司机和车辆
      this.getVihicleData();
      this.getDriverData();
    },
    // 运输车辆切换
    handleVihicleChange(value) {
      this.addValue.transportVehicleCode = ''
      console.log(value);
      if (!value) {
        return;
      }
      // console.log(this.vihicleOption,"this.vihicleOption");
      let vihicle = this.vihicleOption.filter((item) => item.value == value);
      if (!vihicle[0].bindDeviceCode) {
        return;
      }
      this.addValue.transportVehicleCode = vihicle[0].bindDeviceCode;
    },
    // 运输司机切换
    handleDriverChange(value) {
      console.log(444444444444)
      this.addValue.transportRingDeviceCode = ''
      console.log(value);
      if (!value) {
        return;
      }
      let driver = this.driverOption.filter((item) => item.value == value);
      if (!driver[0].deviceCode) {
        return;
      }
      this.addValue.transportRingDeviceCode = driver[0].deviceCode;
    },
    // 1.切换小蓝之家原型  2.修改信息，自动查询最新数据
    handleTypeChange(isInit) {
      // console.log("切换",isInit);
      this.tableData = [];
      this.totalWeight = 0;
      this.totalNumber = 0;
      if (!this.addValue.homeIslandType) {
        return;
      }
      if (!isInit) {
        this.selectData = [];
      }
      this.loading = true;
      let params = {
        pageNum: 1,
        pageSize: 9999999,
        homeType: this.addValue.homeIslandType,
        applyStatus: null,
        applyStatusList: null,
        transportOrderId: null,
      }
      // 2022.8.17 如果是修改，需要展示的数据
      if (this.editeStatus === 2) {
        params.applyStatusList = [2, 4, 5, 6, 8];
        params.transportOrderId = this.updateId
      } else {
        params.applyStatus = 2
      }
      this.$http(this.GLOBALApi.declareGetPage(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;
              let records = res.data.records || [];
              this.handleData(records);
              this.singleChoice =
                  this.addValue.homeIslandType === 1 ? false : true;

              if (this.editeStatus == 2 && isInit) {
                if (this.selectDataDetail && this.selectDataDetail.length > 0) {
                  this.selectDataDetail.map(item => {
                    console.log("item", item.estimateWeight, item.applyCodeNumber);
                    this.totalWeight += item.estimateWeight || 0;
                    this.totalNumber += item.applyCodeNumber || 0;
                  })
                }
                this.initSelect();
              }
              if (this.editeStatus == 2 && !isInit) {
                this.totalWeight = 0;
                this.totalNumber = 0;
                this.initSelect();
              }
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
    handleData(data) {
      data.map((item, index) => {
        let dataArr = []//table的表格数据
        let dataObj = {}//单条表格数据
        let rowHeader = []//table的表头数据
        if (item.collectBlockResList && item.collectBlockResList.length > 0) {
          item.collectBlockResList.map(resData => {
            for (let i = 0; i < this.seaPlasticType.length; i++) {
              // 如果接口返回的塑料类型的编码 == 海塑接口的编码,说明有这个海塑种类
              if (resData.blockType == this.seaPlasticType[i].value) {
                // 存进表头
                let obj = {}
                this.$set(obj, "label", this.seaPlasticType[i].label + '(kg)')
                this.$set(obj, "prop", this.seaPlasticType[i].label)
                rowHeader.push(obj)

                // 存进表格数组
                this.$set(dataObj, this.seaPlasticType[i].label, resData.weight)

              }
            }

          })
          dataArr.push(dataObj)
        }
        this.tableData.push({
          index: index + 1,
          orderNo: item.orderNo,
          xiaolan: item.homeName,
          parent: item.homeUserName,
          phone: item.homeUserPhone,
          address: item.homeAddress,
          type: item.homeType,
          transforWeight: item.estimateWeight,
          applyCodeNumber: item.applyCodeNumber,
          // pureWeight:
          //     !item.pureWeight && item.pureWeight !== 0 ? "---" : item.pureWeight,
          // mixWeight:
          //     !item.mixWeight && item.mixWeight !== 0 ? "---" : item.mixWeight,
          // blueWeight:
          //     !item.blueWeight && item.blueWeight !== 0 ? "---" : item.blueWeight,
          // greenWeight:
          //     !item.greenWeight && item.greenWeight !== 0 ? "---" : item.greenWeight,
          reportTime: getFormatTime(item.reportTime),
          collectStatus: this.collectionTaskStatus[item.applyStatus],
          collectBlockResList: item.collectBlockResList && item.collectBlockResList.length > 0 ? dataArr : [],//列表
          rowHeader: rowHeader.length > 0 ? rowHeader : [],//头部列表
        });
        if (this.editeStatus === 3) {
          this.totalWeight += item.estimateWeight || 0;
          this.totalNumber += item.applyCodeNumber || 0;
        }
      });
    },
    handlePlayVideo(value) {
      // window.open(value.previewUrl);
      this.currentVideoSrc = value.previewUrl;
      this.videoPreview = true;
    },

    initSelect() {
      console.log("initSelect", this.selectData);
      this.$nextTick(() => {
        this.tableData.map((item, index) => {
          if (this.selectData.includes(String(item.orderNo))) {
            this.$refs.selectTable.toggleRowSelection(
                this.tableData[index],
                true
            );
          }
        });
      });
    },

    // 单选
    handleCurrentChange(value, row) {
      console.log("handleCurrentChange", value, row);
      this.selectData = [];
      // 如果是新增,修改,动态计算
      //1: 新增  2：修改  3: 查看
      if (this.editeStatus == 1 || this.editeStatus == 2) {
        this.totalWeight = 0
        this.totalNumber = 0
        if (value && value.length > 0) {
          value.map(item => {
            // console.log("item",item.transforWeight,item.applyCodeNumber);
            this.totalWeight += item.transforWeight || 0;
            this.totalNumber += item.applyCodeNumber || 0;
          })
        }
      }
      if (this.singleChoice) {
        this.$refs.selectTable.clearSelection();
        if (value.length) {
          this.$refs.selectTable.toggleRowSelection(row, true);
          this.selectData = [row.orderNo];
        } else {
          this.selectData = [];
        }
      } else {
        this.selectData = value.map((item) => item.orderNo);
      }
      console.log("selectData: ", this.selectData);
    },

    // 全选
    handleAllCurrentChange(value) {
      console.log("handleAllCurrentChange", value);
      this.selectData = value.map((item) => item.id);
      // 如果是新增,修改,动态计算
      //1: 新增  2：修改  3: 查看
      if (this.editeStatus == 1 || this.editeStatus == 2) {
        this.totalWeight = 0
        this.totalNumber = 0
        if (value && value.length > 0) {
          value.map(item => {
            // console.log("item",item.transforWeight,item.applyCodeNumber);
            this.totalWeight += item.transforWeight || 0;
            this.totalNumber += item.applyCodeNumber || 0;
          })
        }
      }
    },
    handleClose() {
      this.$emit("close");
    },
    handleChangeStatus(value) {
      this.tableData = [];
      this.$emit("change-edit-status", value);
    },
    // 提交
    handleSubmit() {
      this.$refs.addValue.validate((valid) => {
        if (valid) {
          if (!this.selectData.length) {
            this.$message.error("请至少勾选一个收集单");
            return;
          }

          let params = JSON.parse(JSON.stringify(this.addValue));
          params.transportPlanDate = `${params.transportPlanDate} 00:00:00`;
          // 获取运输公司信息
          let company = this.transportCompanyOption.filter(
              (item) => item.value === params.transportCompanyNo
          );
          if (company && company.length > 0) {
            params.transportCompanyName = company[0].label;
          }

          // 获取司机信息
          let driver = this.driverOption.filter(
              (item) => item.value === params.transportUserNo
          );
          if (driver && driver.length > 0) {
            params.transportUserName = driver[0].label;
            params.transportUserPhone = driver[0].linkPhone;
          }

          // 获取手环信息
          console.log(33333333);
          let ringDevice = this.driverGpsOption.filter(
              (item) => item.value === params.transportRingDeviceCode
          );
          if (ringDevice && ringDevice.length > 0) {
            params.transportRingDeviceNo = ringDevice[0].deviceNo;
          }

          // 获取运输车辆名称
          let vihicle = this.vihicleOption.filter(
              (item) => item.value === params.transportVehicleNo
          );
          if (vihicle && vihicle.length > 0) {
            params.transportVehicleName = vihicle[0].name;
            // console.log(vihicle,"*****************************")
          }

          // 获取中转仓公司信息
          let warehouse = this.storageDeviceOption.filter(
              (item) => item.value === params.warehouseNo
          );
          if (warehouse && warehouse.length > 0) {
            params.warehouseName = warehouse[0].label;
          }

          console.log("params: ", params);
          if (this.editeStatus === 1) {
            this.updateDate(
                {...params, collectOrderNos: this.selectData},
                this.GLOBALApi.createTransportDispatch()
            );
          } else {
            this.updateDate(
                {
                  ...params,
                  orderNo: this.updateId,
                  collectOrderNos: this.selectData,
                },
                this.GLOBALApi.updateTransportDispatch()
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // table表格是否禁选
    checkSelectable(row) {
      // console.log(row, '99999')
      if (row.collectStatus == '运输完成' || row.collectStatus == '装车完成' || row.collectStatus == '装车中') {
        return false;
      } else {
        return true;
      }
    },

  },

  watch: {

    dialogVisible: {
      handler(newVal) {
        console.log("newVal", newVal, this.dialogVisible);
        if (newVal !== true) {
          return;
        }
        this.init();

        if (this.editeStatus === 1 || this.editeStatus === 2) {
          this.getTransportCompanyData();
          this.getVihicleGpsData();
          this.getDriverGpsData();
          this.getStorageDevice();
        }

        if (this.editeStatus === 1) {
          let timestamp = new Date().getTime();
          this.addValue.transportTime = getFormatTime(timestamp, "dateDay");
          this.addValue.homeIslandType = 1;
          this.handleTypeChange(false);
          //修改、新增弹窗切换详情数据要制空
          this.detailData = {};
          this.videoList = [];
          this.inputVideoList = [];
        } else if (this.editeStatus === 2) {
          this.getDetailData();
        } else if (this.editeStatus === 3) {
          this.getDetailData();
          this.getTransportCompanyData();
        }
      },
      immediate: true,
    },

    // 触发 1.切换下拉框的值 2.修改重新赋值
    "addValue.transportCompanyNo": {
      handler(newVal) {
        if (!newVal) {
          return;
        }
        this.handleTransportCompanyChange(newVal);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.button_blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}

.button_blue:hover {
  background-color: #66b1ff;
  border: solid 1px #66b1ff;
  cursor: pointer;
}

/deep/ .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-input.el-input--small.el-input--suffix {
  width: 420px;
}

/deep/ .el-input.el-input--small.is-disabled {
  width: 420px;
}

// .el-form-item.is-required
/deep/ .el-form-item--small:nth-child(2n + 2) {
  .el-form-item__label {
    margin-left: 110px;
  }
}

/deep/
.singleChoice
> .el-table__header-wrapper
> table
> thead
> tr
> th:first-child
> div {
  display: none !important;
}

.static_data {
  width: 420px;
}

.videos {
  display: flex;
  overflow: auto;

  & > div {
    width: 136px;
    flex-shrink: 0;
  }

  & > div:not(:last-child) {
    margin-right: 80px;
  }

  .video_li {
    margin-top: 8px;
    margin-right: 80px;

    .li {
      width: 136px;
      height: 136px;
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
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

  }
}


.vedio-text {
  margin: 10px 0px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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

.empty_box {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #858585;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 12px;
}

.labeltxt {
  margin: 18px auto;

  .label_title {
    margin-right: 12px;
  }
}

.illustrate-text {
  font-size: 12px;
}

.production-waste {
  margin: 20px 0 12px;

  a {
    color: red;
    margin-right: 3px;
  }
}
</style>
