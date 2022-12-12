<template>
  <div class="dispatchsheet_detail">
    <el-dialog
      :title="editeStatus === 1 ? '新增' : editeStatus === 2 ? '修改' : '查看'"
      :visible.sync="dialogVisible"
      width="1232px"
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
          <el-form-item label="中转仓" prop="warehouseId">
            <el-select
              v-if="editeStatus !== 3"
              @change="handleWarehouseChange"
              v-model="addValue.warehouseId"
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

          <el-form-item label="运输公司" prop="transportCompanyId">
            <el-select
              v-if="editeStatus !== 3"
              v-model="addValue.transportCompanyId"
              @change="handleTransportCompanyChange"
              placeholder="请选择"
              clearable
              filterable
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
              v-if="editeStatus !== 3"
              v-model="director"
              :disabled="true"
              placeholder="暂无数据"
            >
            </el-input>
            <div v-else class="static_data">
              {{ director }}
            </div>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input
              v-if="editeStatus !== 3"
              v-model="directorPhone"
              :disabled="true"
              placeholder="暂无数据"
            >
            </el-input>
            <div v-else class="static_data">
              {{ directorPhone }}
            </div>
          </el-form-item>

          <el-form-item label="运输车辆" prop="transportVehicleId">
            <el-select
              v-if="editeStatus !== 3"
              v-model="addValue.transportVehicleId"
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
              {{ detailData.transportVehicle }}
            </div>
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
            <!-- <el-input
              placeholder="暂无数据"
              v-if="editeStatus !== 3"
              v-model="addValue.transportVehicleCode"
              :disabled="true"
            >
            </el-input> -->

            <div v-else class="static_data">
              {{ detailData.transportVehicleCode }}
            </div>
            <div v-if="editeStatus !== 3" class="tips">
              说明：该车辆常用的GPS为[GPS名称]-[GPS序列号]
            </div>
          </el-form-item>

          <el-form-item label="运输司机" prop="transportUserId">
            <el-select
              v-if="editeStatus !== 3"
              v-model="addValue.transportUserId"
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
            <!-- <el-input
              placeholder="暂无数据"
              v-if="editeStatus !== 3"
              v-model="addValue.transportRingDeviceCode"
              :disabled="true"
            >
            </el-input> -->
            <div v-else class="static_data">
              {{ detailData.transportRingDeviceCode }}
            </div>
            <div v-if="editeStatus !== 3" class="tips">
              说明：该司机常用的手环为[手环名称]-[手环序列号]
            </div>
          </el-form-item>

          <el-form-item label="海塑种类" prop="blockType">
            <el-select
              v-if="editeStatus === 1 || editeStatus === 2"
              v-model="addValue.blockType"
              @change="handleTypeChange(false)"
              placeholder="请选择"
              :disabled="disabledSelect"
              clearable
            >
              <el-option
                v-for="item in seaPlasticType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <!-- <el-input
              v-else-if="editeStatus === 2"
              :value="seaPlasticTypeDict[detailData.blockType]"
              :disabled="true"
            >
            </el-input> -->
            <div v-else class="static_data">
              {{ seaPlasticTypeDict[detailData.blockType] }}
            </div>
          </el-form-item>

          <el-form-item label="接收单位" prop="destinationCompanyId">
            <el-select
              v-if="editeStatus !== 3"
              v-model="addValue.destinationCompanyId"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="item in destinationCompanyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div v-else class="static_data">
              {{ detailData.destinationCompanyName }}
            </div>
          </el-form-item>

          <el-form-item label="运输日期" prop="transportTime">
            <el-date-picker
              v-if="editeStatus !== 3"
              v-model="addValue.transportTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOption"
            >
            </el-date-picker>
            <div v-else class="static_data">
              {{ detailData.transportTime }}
            </div>
          </el-form-item>
        </el-form>

        <div style="margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>选择产废
        </div>

        <div class="table">
          <el-table
            ref="selectParentTable"
            :data="tableData"
            style="width: 100%"
            max-height="300"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            @select="handleCurrentChange"
            @select-all="handleAllCurrentChange"
            @expand-change="handleExpentChange"
          >
            <el-table-column
              type="selection"
              width="55"
              v-if="editeStatus !== 3"
            >
            </el-table-column>

            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  :ref="`selectChildTable${props.row.orderNo}`"
                  :data="props.row.plasticBlockResList"
                  style="width: 100%"
                  @select="handleChildrenCurrentChange"
                  @select-all="
                    (value) => handleAllChildrenCurrentChange(value, props.row)
                  "
                >
                  <el-table-column width="100"> </el-table-column>
                  <el-table-column
                    v-if="editeStatus !== 3"
                    type="selection"
                    width="55"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="serialNo"
                    label="海塑码"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="originNo"
                    label="包装编号"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="homeName"
                    label="小蓝之家"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="blockVerifiableWeight"
                    label="待清运重量(kg)"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="index" label="序号" width="60">
            </el-table-column> -->
            <el-table-column
              prop="orderNo"
              label="库存单号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="transferInputOrderNo"
              label="入库单号"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="homeNames"
              label="小蓝之家"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="inputTime" label="入库时间">
            </el-table-column>
            <el-table-column prop="surplusWeight" label="待清运重量(kg)">
            </el-table-column>
            <el-table-column prop="blockNumber" label="待清运包数(包)">
            </el-table-column>
          </el-table>

          <div
            v-if="editeStatus !== 3"
            style="color: #fff; text-align: right; margin-top: 10px"
          >
            预估总量：{{ totalWeight || 0 }}kg，{{ totalNumber }}包
            <!-- 预估总量：{{ Number(totalWeight).toFixed(3) || 0 }}kg，{{
              totalNumber
            }}包 -->
          </div>
        </div>
      </div>

      <div v-if="editeStatus === 3">
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>出库视频
        </div>

        <div
          class="vedios"
          v-if="detailData.videoList && detailData.videoList.length > 0"
        >
          <div
            class="video_li"
            v-for="(item, index) in detailData.videoList"
            :key="index"
            @click="handlePlayVideo(item)"
          >
            <div class="li">
              <img
                :src="item.titlePage"
                alt=""
                v-if="item.titlePage && item.titlePage.length"
              />
              <img src="@/assets/img/home/videoBg.svg" alt="" v-else />
              <img
                class="palyBtn"
                src="@/assets/img/home/playBtn.png"
                alt="播放"
              />
            </div>
            <div class="vedio-text" :title="item.name">{{ item.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>
      </div>
      <div
        v-if="editeStatus === 3 && detailData.status === 3"
        class="receive_contain"
      >
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>出库重量
          <span>{{
            detailData.outTotalWeight ? `${detailData.outTotalWeight}kg` : ""
          }}</span>
        </div>
      </div>
      <div
        v-if="editeStatus === 3 && detailData.status === 3"
        class="receive_contain"
      >
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>接收重量
          <span>{{
            detailData.receiveWeight ? `${detailData.receiveWeight}kg` : ""
          }}</span>
        </div>
      </div>
      <div
        v-if="editeStatus === 3 && detailData.status === 3"
        class="receive_contain"
      >
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>接收时间
          <span>{{ detailData.receiveTime }}</span>
        </div>
      </div>
      <div
        v-if="editeStatus === 3 && detailData.status === 3"
        class="receive_contain"
      >
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>接收凭条
        </div>
        <div class="vedios" v-if="detailData.receiveViewUrl.length > 0">
          <div class="video_li">
            <el-image
              fit="cover"
              style="width: 136px; height: 136px"
              :src="detailData.receiveViewUrl"
              :preview-src-list="receiveViewUrl"
            >
            </el-image>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>
      </div>
      <div
        v-if="editeStatus === 3 && detailData.status === 3"
        class="receive_contain"
      >
        <div style="margin-top: 10px; margin-bottom: 13px">
          <a style="color: red; margin-right: 3px">*</a>接收视频
        </div>

        <div class="vedios" v-if="detailData.receiveVideoList.length > 0">
          <div
            class="video_li"
            v-for="(item, index) in detailData.receiveVideoList"
            :key="index"
            @click="handlePlayVideo(item)"
          >
            <div class="li">
              <img
                :src="item.titlePage"
                alt=""
                v-if="item.titlePage && item.titlePage.length"
              />
              <img src="@/assets/img/home/videoBg.svg" alt="" v-else />
              <img
                class="palyBtn"
                src="@/assets/img/home/playBtn.png"
                alt="播放"
              />
            </div>
            <div class="vedio-text" :title="item.name">{{ item.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>
      </div>

      <span slot="footer">
        <div
          v-if="editeStatus !== 3"
          class="button_blue"
          @click="handleSubmit"
          v-fastClick
        >
          提交
        </div>
        <div
          v-else-if="editeStatus === 3 && detailData.status === 1"
          class="button_blue"
          @click="handleChangeStatus(2)"
          v-fastClick
        >
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
import { statusOptions } from "@/utils/enum.js";
import { getFormatTime } from "@/utils/methods.js";

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
      destinationCompanyOption: [], //处置公司
      transportCompanyOption: [], //运输公司
      vihicleOption: [], //车辆数据
      driverOption: [], //司机数据
      vihicleGpsOption: [], //车辆gps数据
      driverGpsOption: [], //司机手环gps
      statusOptions,
      seaPlasticType: [], //塑料块类型,
      detailData: {},
      getFormatTime,
      seaPlasticTypeDict: {},
      storageDeviceOption: [], //所有中转仓
      orderTree: {}, //库存单与海塑父子信息

      // 新增
      apiLoading: false,
      addValue: {
        //表单数据
        transportCompanyId: "", //运输公司id
        // transportCompanyName: "", //运输公司名称
        transportVehicleId: "", //车辆id
        // transportVehicle: "", //车辆牌照
        transportVehicleCode: "", //车辆设备编号
        transportUserId: "", //司机
        // transportUserName: "",
        // transportUserPhone: "",
        // transportRingDeviceId: "", //手环id
        transportRingDeviceCode: "", //手环编号
        destinationCompanyId: "", //处置公司
        // destinationCompanyName: "",
        // destinationCompanyAddress: "",
        // destinationCompanyLon: "",
        // destinationCompanyLat: "",
        transportTime: "", //预计运输时间
        blockType: "", //类型 1：纯色PET 2：杂色PET
        warehouseId: "", //中转仓
        // warehouseName: "", //中转仓名称
        // plasticBlockIds: [], //选中塑料块
      },
      addValueRules: {
        transportCompanyId: [
          {
            required: true,
            message: "请选择运输公司",
            trigger: ["blur", "change"],
          },
        ],
        transportVehicleId: [
          {
            required: true,
            message: "请选择运输车辆",
            trigger: ["blur", "change"],
          },
        ],
        transportVehicleCode: [
          {
            required: true,
            message: "请选择GPS序列号",
            trigger: ["blur", "change"],
          },
        ],
        transportUserId: [
          {
            required: true,
            message: "请选择运输司机",
            trigger: ["blur", "change"],
          },
        ],
        destinationCompanyId: [
          {
            required: true,
            message: "请选择接收单位",
            trigger: ["blur", "change"],
          },
        ],
        transportRingDeviceCode: [
          {
            required: true,
            message: "请选择手环序列号",
            trigger: ["blur", "change"],
          },
        ],
        transportTime: [
          {
            required: true,
            message: "请选择运输日期",
            trigger: ["blur", "change"],
          },
        ],
        blockType: [
          {
            required: true,
            message: "请选择海塑种类",
            trigger: ["blur", "change"],
          },
        ],
        warehouseId: [
          {
            required: true,
            message: "请选择中转仓",
            trigger: ["blur", "change"],
          },
        ],
      },

      // 表格
      tableData: [], //库存
      loading: false,
      selectData: {}, //选中的数据

      // firstUpdate: false, //修改时初始化数据

      // 视频
      vidioList: [],
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址
      receiveViewUrl: [], //接收凭条
    };
  },
  created() {},
  computed: {
    director() {
      let temp = this.transportCompanyOption.filter(
        (item) => item.value === this.addValue.transportCompanyId
      );
      return temp.length ? temp[0].linkPersonName : "";
    },
    directorPhone() {
      let temp = this.transportCompanyOption.filter(
        (item) => item.value === this.addValue.transportCompanyId
      );
      return temp.length ? temp[0].linkPersonPhone : "";
    },
    pickerOption() {
      let that = this;
      return {
        disabledDate(date) {
          if (that.editeStatus === 1) {
            return (
              new Date(date).getTime() <
              new Date().getTime() - 1000 * 60 * 60 * 24
            );
          } else if (that.editeStatus === 2) {
            if (that.detailData.createTime) {
              return (
                new Date(date).getTime() <
                that.detailData.createTime - 1000 * 60 * 60 * 24
              );
            } else {
              return false;
            }
          }
        },
      };
    },

    totalNumber() {
      let sum = 0;
      for (let parentId of Object.keys(this.selectData)) {
        let selectIds = this.selectData[parentId];
        let children = this.orderTree[parentId] || [];
        children.map((item) => {
          if (selectIds.includes(item.id)) {
            sum++;
          }
        });
      }
      return sum;
    },

    totalWeight() {
      let sum = 0;
      for (let parentId of Object.keys(this.selectData)) {
        let selectIds = this.selectData[parentId];
        let children = this.orderTree[parentId] || [];
        children.map((item) => {
          if (selectIds.includes(item.id)) {
            sum += item.blockVerifiableWeight;
          }
        });
      }
      return sum !== 0 ? sum.toFixed(3) : 0;
    },

    // 判断海塑种类是否可修改
    disabledSelect() {
      if (this.editeStatus === 2) {
        return true;
      }
      return false;
    },
  },
  methods: {
    init() {
      this.addValue = {
        transportCompanyId: "", //运输公司id
        transportVehicleId: "", //车辆id
        transportVehicleCode: "", //车辆设备编号
        transportUserId: "", //司机
        transportRingDeviceCode: "", //手环编号
        destinationCompanyId: "", //处置公司
        transportTime: "", //预计运输时间
        blockType: "", //类型 1：纯色PET 2：杂色PET
        warehouseId: "", //中转仓
      };
      this.destinationCompanyOption = [];
      this.transportCompanyOption = [];
      this.vihicleOption = [];
      this.driverOption = [];
      this.vihicleGpsOption = [];
      this.driverGpsOption = [];
      this.storageDeviceOption = [];
      this.orderTree = {};
      this.selectData = {};
    },
    getDetailData() {
      // console.log("----------getDetailData-------");
      this.$http(this.GLOBALApi.getTransitDispatchDetail(), {
        orderNo: this.updateId,
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.total = res.data.total || 0;
            let data = res.data;

            this.addValue = {
              transportCompanyId: data.transportCompanyNo, //运输公司id
              transportVehicleId: data.transportVehicleNo, //车辆id
              transportUserId: data.transportUserNo, //司机
              transportRingDeviceCode: data.transportRingDeviceNo, //手环编号
              transportVehicleCode: data.transportVehicleCode, //车辆设备编号
              destinationCompanyId: data.destinationCompanyNo, //处置公司
              transportTime: data.transportTime, //预计运输时间
              blockType: data.blockType, //类型 1：纯色PET 2：杂色PET
              warehouseId: data.warehouseNo, //中转仓
            };
            this.detailData = data;
            this.detailData.videoList = data.videoList || [];
            this.detailData.receiveVideoList = data.receiveVideoList || [];
            this.detailData.storageOrderList = data.storageOrderList || [];

            if (
              this.detailData.receiveViewUrl &&
              this.detailData.receiveViewUrl.length > 0
            ) {
              this.receiveViewUrl.push(this.detailData.receiveViewUrl);
            } else {
              this.receiveViewUrl = [];
            }
            if (this.editeStatus === 2) {
              // 根据运输公司请求司机和车辆
              this.getVihicleData();
              this.getDriverData();
              // 获取selectData
              let storageOrderList = data.storageOrderList || [];
              for (let items of storageOrderList) {
                let children = items.plasticBlockResList || [];
                let childrenIds = children.map((item) => item.id);
                if (childrenIds && childrenIds.length) {
                  this.$set(this.selectData, items.orderNo, childrenIds);
                  // this.selectData[items.id] = childrenIds;
                }
              }
              this.handleTypeChange(true);
            } else if (this.editeStatus === 3) {
              this.tableData = [];
              this.handleData(data.storageOrderList || []);
            }

            this.$nextTick(() => {
              this.addValue.transportVehicleId = data.transportVehicleNo; //车辆id
              this.addValue.transportUserId = data.transportUserNo; //司机
              this.addValue.transportRingDeviceCode =
                data.transportRingDeviceNo; //手环编号
              this.addValue.transportVehicleCode = data.transportVehicleCode; //车辆设备编号

              // console.log("this.addValue: ", this.addValue);
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    // 运输公司
    getTransportCompanyData() {
      this.transportCompanyOption = [];
      this.$http(this.GLOBALApi.getTransportCompany(), {
        // pageNum: 1,
        // pageSize: 9999999,
        // status: 0
        // companyType: 4, //外部公司
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];

            records.map((item, index) => {
              let temp = { label: item.name, value: item.companyNo, ...item };
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
    // 造粒厂
    getDestinationCompanyData() {
      this.destinationCompanyOption = [];
      this.$http(this.GLOBALApi.plantGetByPage(), {
        pageSize: 9999999,
        pageNum: 1,
        status: 0,
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data.records || [];
            records.map((item, index) => {
              let temp = { label: item.name, value: item.companyNo, ...item };
              this.destinationCompanyOption.push(temp);
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    // 车辆
    getVihicleData() {
      this.vihicleOption = [];
      this.$http(this.GLOBALApi.getAllTransportVihicleByStatus(), {
        companyNo: this.addValue.transportCompanyId,
        status: 0,
      })
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];

            records.map((item, index) => {
              let temp = {
                label: item.vehicleCapacityWeight
                  ? `${item.name}-${item.vehicleCapacityWeight}t`
                  : item.name,
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
    // 车辆GPS
    getVihicleGpsData() {
      this.vihicleGpsOption = [];
      this.$http(this.GLOBALApi.getDeviceGps(), {
        // pageNum: 1,
        // pageSize: 9999999,
        deviceType: 2,
        status: 0, // 0：开启 1：关闭
      })
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];
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
    // 司机
    getDriverData() {
      //  this.driverOption = [{label: "毛宁涛", value: 6}];
      this.driverOption = [];
      this.$http(this.GLOBALApi.getAllTransportGriver(), {
        no: this.addValue.transportCompanyId,
      })
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];
            records.map((item, index) => {
              let temp = {
                label: item.name,
                value: item.clientNo,
                phone: item.linkPhone,
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
    // 手环GPS
    getDriverGpsData() {
      this.driverGpsOption = [];
      this.$http(this.GLOBALApi.getDeviceGps(), {
        // pageNum: 1,
        // pageSize: 9999999,
        deviceType: 1,
        status: 0, // 0：开启 1：关闭
      })
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];
            records.map((item, index) => {
              let temp = {
                label: `${item.name}-${item.deviceCode}`,
                value: item.deviceNo,
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
    //获取中转仓下拉列表
    getStorageDevice() {
      this.storageDeviceOption = [];
      this.$http(this.GLOBALApi.getStorageDevice(), { status: 0 })
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];
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
      // 请求塑料类型接口
      this.seaPlasticTypeDict = {};
      this.seaPlasticType = [];
      this.$http(this.GLOBALApi.getDictionaryListByCode(), {
        no: "plasticType",
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            for (let item of res.data) {
              this.$nextTick(() => {
                this.seaPlasticType.push({
                  label: item.categoryName,
                  value: item.categoryNo,
                });
              });
              this.$set(
                this.seaPlasticTypeDict,
                item.categoryNo,
                item.categoryName
              );
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

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
      this.addValue.transportUserId = "";
      this.addValue.transportVehicleId = "";
      this.addValue.transportVehicleCode = "";
      this.addValue.transportRingDeviceCode = "";
      if (!value) {
        return;
      }

      // 根据运输公司请求司机和车辆
      this.getVihicleData();
      this.getDriverData();
    },
    handleVihicleChange(value) {
      this.addValue.transportVehicleCode = "";
      if (!value) {
        return;
      }
      let vihicle = this.vihicleOption.filter((item) => item.value == value);
      if (!vihicle[0].deviceCode) {
        return;
      }
      this.addValue.transportVehicleCode = vihicle[0].deviceCode;
    },
    handleDriverChange(value) {
      this.addValue.transportRingDeviceCode = "";
      if (!value) {
        return;
      }
      let driver = this.driverOption.filter((item) => item.value == value);
      if (!driver[0].deviceNo) {
        return;
      }
      this.addValue.transportRingDeviceCode = driver[0].deviceNo;
    },

    // 中转仓 和 海塑种类 都必须选择才能查询出产废列表
    handleWarehouseChange() {
      this.handleTypeChange(false);
    },

    // 1.切换塑料种类  2.修改、查看信息，自动查询最新数据
    handleTypeChange(isInit) {
      this.tableData = [];
      if (!this.addValue.blockType) {
        return;
      }
      if (!this.addValue.warehouseId) {
        this.$message.warning("请先选择中转仓");
        return;
      }

      // 非初始化，清空勾选结果
      if (!isInit) {
        this.selectData = {};
      }

      this.loading = true;
      let params = {
        pageNum: 1,
        pageSize: 999999,
        blockType: this.addValue.blockType,
        warehouseNo: this.addValue.warehouseId,
      };
      if (isInit) {
        // params.storageStatus = 4;
        params.storageStatusList = [1, 4];
        params.outOrderNo = this.updateId;
      } else {
        params.storageStatus = 1;
      }
      this.$http(this.GLOBALApi.getStockByPlasticType(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;
            let records = res.data.records || [];
            this.handleData(records, isInit);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error.msg);
        });
    },

    handleData(data, isInit) {
      data.map((item, index) => {
        item.index = index + 1;
        item.inputTime = item.inputTime;
        item.plasticBlockResList = item.plasticBlockResList || [];
        item.plasticBlockResList.map(
          (plasticBlock) => (plasticBlock.parentId = item.orderNo)
        );
        this.$set(this.orderTree, item.orderNo, item.plasticBlockResList);
        // this.orderTree[item.id] = item.plasticBlockResList;
      });
      this.tableData = data;
      // console.log("tableData: ", this.tableData);

      // 修改状态，要直接勾选
      if (isInit) {
        let parentIds = Object.keys(this.selectData);
        this.$nextTick(() => {
          this.tableData.map((item, index) => {
            if (
              parentIds.includes(String(item.orderNo)) &&
              this.selectData[item.orderNo] &&
              this.selectData[item.orderNo].length
            ) {
              this.$refs.selectParentTable.toggleRowSelection(
                this.tableData[index],
                true
              );
            }
          });
        });
      } else if (this.editeStatus === 1) {
        // 初始化默认全选
        this.$nextTick(() => {
          this.handleAllCurrentChange(this.tableData);
          this.tableData.map((item, index) => {
            this.$refs.selectParentTable.toggleRowSelection(
              this.tableData[index],
              true
            );
          });
          // console.log(" this.selectData: ", this.selectData);
        });
      }
    },
    handlePlayVideo(value) {
      // window.open(value.previewUrl);
      this.currentVideoSrc = value.previewUrl;
      this.videoPreview = true;
    },

    handleClose() {
      this.$emit("close");
    },
    handleChangeStatus(value) {
      // this.tableData = [];
      this.$emit("change-edit-status", value);
    },
    handleSubmit() {
      this.$refs.addValue.validate((valid) => {
        if (valid) {
          let params = {};
          params.blockType = this.addValue.blockType;
          params.transportTime = `${this.addValue.transportTime} 00:00:00`;

          // 选中塑料块
          // console.log("this.selectData: ", this.selectData);
          params.plasticBlockIds = [];
          for (let parentId of Object.keys(this.selectData)) {
            let ids = this.selectData[parentId];
            params.plasticBlockIds.push(...ids);
          }
          if (!params.plasticBlockIds.length) {
            this.$message.error("请至少勾选一个海塑码");
            return;
          }

          // 获取运输公司信息
          params.transportCompanyNo = this.addValue.transportCompanyId;
          let company = this.transportCompanyOption.filter(
            (item) => item.value === params.transportCompanyNo
          );
          if (company && company.length > 0) {
            params.transportCompanyName = company[0].label;
          }

          // 获取司机信息
          params.transportUserNo = this.addValue.transportUserId;
          let driver = this.driverOption.filter(
            (item) => item.value === params.transportUserNo
          );
          if (driver && driver.length > 0) {
            params.transportUserName = driver[0].label;
            params.transportUserPhone = driver[0].phone;
          }
          // 获取手环信息
          params.transportRingDeviceNo = this.addValue.transportRingDeviceCode;
          let ringDevice = this.driverGpsOption.filter(
            (item) => item.value === params.transportRingDeviceNo
          );
          if (ringDevice && ringDevice.length > 0) {
            params.transportRingDeviceCode = ringDevice[0].deviceCode;
          }

          // 获取运输车辆名称
          params.transportVehicleNo = this.addValue.transportVehicleId;
          let vihicle = this.vihicleOption.filter(
            (item) => item.value === params.transportVehicleNo
          );
          if (vihicle && vihicle.length > 0) {
            params.transportVehicle = vihicle[0].name;
          }

          // 获取车辆gps
          params.transportVehicleCode = this.addValue.transportVehicleCode;

          // 获取处置公司名称
          params.destinationCompanyNo = this.addValue.destinationCompanyId;
          let destinationCompany = this.destinationCompanyOption.filter(
            (item) => item.value === params.destinationCompanyNo
          );
          if (destinationCompany && destinationCompany.length > 0) {
            params.destinationCompanyName = destinationCompany[0].label;
            params.destinationCompanyAddress = destinationCompany[0].address;
            // params.destinationCompanyLon = destinationCompany[0].lon;
            // params.destinationCompanyLat = destinationCompany[0].lat;
          }

          // 获取中转仓公司信息
          params.warehouseNo = this.addValue.warehouseId;
          let warehouse = this.storageDeviceOption.filter(
            (item) => item.value === params.warehouseNo
          );
          if (warehouse && warehouse.length > 0) {
            params.warehouseName = warehouse[0].label;
          }

          // console.log("params: ", params);
          if (this.editeStatus === 1) {
            this.updateDate(params, this.GLOBALApi.createTransitDispatch());
          } else {
            this.updateDate(
              {
                ...params,
                orderNo: this.updateId,
              },
              this.GLOBALApi.updateTransitDispatch()
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 关闭或展开事件。  展开后，根据数据勾选已选中的子节点
    handleExpentChange(row, all) {
      console.log("handleExpentChange: ", row, all);
      let parentId = row.orderNo;
      let parentData = this.tableData.filter(
        (item) => item.orderNo === parentId
      );
      let childRef = `selectChildTable${parentId}`;
      let currentIds = this.selectData[parentId] || [];

      // 判断展开or关闭
      let target = all.filter((item) => item.orderNo === row.orderNo);
      if (parentData && parentData.length > 0 && target && target.length > 0) {
        this.$nextTick(() => {
          this.$refs[childRef].clearSelection();
          parentData[0].plasticBlockResList.map((item) => {
            if (currentIds.includes(item.id)) {
              // console.log(item.id, item);
              try {
                this.$refs[childRef].toggleRowSelection(item, true);
              } catch {}
            }
          });
        });
      }
    },

    // 点击全选，自动选中所有父节点。遍历父节点，勾选所有子节点
    handleAllCurrentChange(value) {
      console.log("handleAllCurrentChange", value);
      if (!value || !value.length) {
        this.tableData.map((item) => {
          this.handleCurrentChange([], item);
        });
      } else {
        value.map((item) => {
          this.handleCurrentChange(value, item);
        });
      }
    },

    // 点击父节点，自动选择该节点。勾选该父节点下的子节点
    handleCurrentChange(value, row) {
      console.log("handleCurrentChange", value, row);
      let parentId = row.orderNo;
      let childRef = `selectChildTable${parentId}`;
      if (!Object.keys(this.selectData).includes(String(parentId))) {
        this.$set(this.selectData, parentId, []);
      }

      // 先判断是勾选or取消勾选
      let target = value.filter((item) => item && item.orderNo === row.orderNo);
      // 勾选
      if (target && target.length > 0) {
        let children = this.orderTree[parentId];
        let childrenIds = children.map((item) => item.id);
        this.selectData[parentId] = childrenIds;
        this.handleRowSelection(children, childRef, true);
      } else {
        // 取消勾选
        let children = this.orderTree[parentId];
        this.selectData[parentId] = [];
        this.handleRowSelection(children, childRef, false);
      }
    },

    // 点击子节点全选，自动选中所有子节点。勾选该父节点
    handleAllChildrenCurrentChange(value, row) {
      console.log("handleAllChildrenCurrentChange", value);

      if (!value || !value.length) {
        row.plasticBlockResList.map((item) => {
          this.handleChildrenCurrentChange([], item);
        });
      } else {
        value.map((item) => {
          this.handleChildrenCurrentChange(value, item);
        });
      }
    },

    // 点击子节点，自动选中该节点。勾选该父节点
    handleChildrenCurrentChange(value, row) {
      console.log("handleChildrenCurrentChange", value, row);
      let parentId = row.parentId;
      let currentId = row.id;
      let parentData = this.tableData.filter((item) => item.id === parentId)[0];
      if (!Object.keys(this.selectData).includes(String(parentId))) {
        this.$set(this.selectData, parentId, []);
      }

      // 先判断是勾选or取消勾选
      let target = value.filter((item) => item.id === row.id);
      if (target && target.length > 0) {
        this.selectData[parentId].push(currentId);
        this.$refs.selectParentTable.toggleRowSelection(parentData, true);
      } else {
        this.selectData[parentId] = this.selectData[parentId].filter(
          (item) => item != currentId
        );

        if (!this.selectData[parentId].length) {
          this.$refs.selectParentTable.toggleRowSelection(parentData, false);
        }
      }
      // console.log("this.selectData: ", this.selectData);
    },

    // 勾选
    handleRowSelection(value, childRef, select) {
      // console.log(value, childRef, select);
      value.map((item, index) => {
        // 勾选：展开才能取消勾选成功
        try {
          this.$refs[childRef].toggleRowSelection(value[index], select);
        } catch {}
      });
    },
  },

  watch: {
    dialogVisible: {
      handler(newVal) {
        // console.log("dialogVisible", newVal, this.editeStatus);
        if (newVal !== true) {
          return;
        }
        this.init();

        if (this.editeStatus === 1 || this.editeStatus === 2) {
          this.getDestinationCompanyData();
          this.getVihicleGpsData();
          this.getDriverGpsData();
          this.getStorageDevice();
        }
        this.getTransportCompanyData();
        this.getStatusDict();

        if (this.editeStatus === 1) {
          let timestamp = new Date().getTime();
          this.addValue.transportTime = getFormatTime(timestamp, "dateDay");
        } else if (this.editeStatus === 2) {
          this.getDetailData();
        } else if (this.editeStatus === 3) {
          this.getDetailData();
        }
      },
      immediate: true,
    },

    // 触发 1.切换下拉框的值 2.修改重新赋值
    // "addValue.transportCompanyId": {
    //   handler(newVal) {
    //     this.handleTransportCompanyChange(newVal);
    //   },
    //   immediate: true,
    // },
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

.vedio-pic {
  width: 136px;
  height: 136px;
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
  width: 1192px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #858585;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 12px;
}
// 接收
.receive_contain {
  margin-top: 35px;
  span {
    margin-left: 40px;
  }
}

.tips {
  color: #666;
  font-size: 12px;
  line-height: 12px;
  margin-top: 5px;
}
.video_li {
  .li {
    width: 136px;
    height: 136px;
    position: relative;
  }
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
</style>
