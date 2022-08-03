<!--单位管理-渔港列表-详情-->

<template>
  <div class="detail_content">
    <MyBread :titleList="titleList"></MyBread>
    <div class="group_cell">
      <triggerBar
        title="基本信息"
        type="checkBtn"
        editIcon="el-icon-edit-outline"
        saveIcon="el-icon-document-add"
        :iconStatus="checkBaseMsgStatus"
        @handIconClick="checkIconStatus"
      ></triggerBar>
      <el-form :model="formValue" label-width="100px" size="mini">
        <div class="basic_msg_from">
          <div v-for="(cell, idx) of formModel" :key="idx">
            <editableItems
              :formModel="cell"
              :formValue="formValue"
              @addressSelect="addressSelect"
              @uploadPicChange="uploadPicChange"
            ></editableItems>
          </div>
        </div>
      </el-form>
    </div>
    <div class="group_cell ">
      <div class="base_msg_bar">
        <div>
          <div class="tit">当前设备数</div>
          <div>{{ panelData.deviceCount }}</div>
        </div>
        <div>
          <div class="tit">当前存储量</div>
          <div>{{ panelData.remainStr }}</div>
        </div>
        <div>
          <div class="tit">总接收次数</div>
          <div>{{ panelData.receiveCount }}</div>
        </div>
        <div>
          <div class="tit">总入仓次数</div>
          <div>{{ panelData.storageCount }}</div>
        </div>
        <div>
          <div class="tit">总转移次数</div>
          <div>{{ panelData.transferCount }}</div>
        </div>
        <div>
          <div class="tit">总处置量</div>
          <div>{{ panelData.consumerCountStr }}</div>
        </div>
      </div>
    </div>
    <div class="group_cell">
      <triggerBar title="收集信息" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData1"
        :tableConfig="collectInformationTable"
      >
      </MyTable>
    </div>
    <div class="group_cell">
      <triggerBar title="运输信息" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData2"
        :tableConfig="transportationInformationTable"
      >
      </MyTable>
    </div>
    <div class="group_cell">
      <triggerBar title="处置信息" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData3"
        :tableConfig="disposalInformationTable"
      >
      </MyTable>
    </div>
    <div class="group_cell">
      <triggerBar title="危废转移联单的产废主体" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData4"
        :tableConfig="conjoinedBodyTable"
      >
        <template #data_Operate="{ data }">
          <div class="inline-button">
            <div class="delete my-button" @click="deleteOpration(data.id)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </template>
      </MyTable>
    </div>
    <div class="group_cell">
      <triggerBar title="危废转移联单记录" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData5"
        :pageNum="pageNum5"
        :pageSize="pageSize5"
        :tableConfig="conjoinedRecordTable"
      >
        <template #data_Operate="{ data }">
          <div class="btn_group">
            <span @click="openDialog('open', data)" class="btn blue">视图</span>
          </div>
        </template>
      </MyTable>
      <MyPagination
        v-model="pageNum5"
        :size="pageSize5"
        :total="total5"
        @pageChange="getTableData5"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell">
      <triggerBar title="设备信息" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData6"
        :pageNum="pageNum6"
        :pageSize="pageSize6"
        :tableConfig="equipmentInformationTable"
      >
        <template #data_Operate="{ data }">
          <div class="btn_group">
            <span @click="openDialog('detail', data)" title="详情" class="btn blue">详情</span>
          </div>
        </template>
      </MyTable>
      <MyPagination
        v-model="pageNum6"
        :size="pageSize6"
        :total="total6"
        @pageChange="getTableData6"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell" ref="getWidthRef">
      <triggerBar title="台账" type="text"></triggerBar>
      <el-form :model="standingBookFrom" :inline="true" size="small">
        <el-form-item label="时间">
          <el-checkbox
            @change="checkboxChange"
            v-model="standingBookFrom.selectAllYear"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="全年">
          <el-date-picker
            @change="pickerChange"
            value-format="yyyy-MM-dd"
            v-model="standingBookFrom.selectTime"
            :type="standingBookFrom.selectAllYear ? 'year' : 'month'"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="危废种类">
          <el-select
            @change="selectChange"
            clearable
            v-model="standingBookFrom.wasteType"
            placeholder="请选择"
          >
            <el-option
              v-for="opt in contaminationOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="changeTabs" type="card">
        <el-tab-pane label="列表" name="table">
          <div>单位：吨</div>
          <MyTable
            :isIndexBoo="true"
            :isShowSummary="true"
            show-summary
            :data="tableData7"
            :tableConfig="standingBookTable"
          >
            <template #data_Operate="{ data }">
              <div class="inline-button">
                <div class="delete my-button" @click="deleteOpration(data.id)">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </template> </MyTable
        ></el-tab-pane>
        <el-tab-pane label="图表" name="chart">
          <div
            :style="{ width: chartWidth }"
            id="my_chart"
            class="chart_area"
            ref="chartRef"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <MyDialog
      setWidth="700px"
      :dialogVisible="dialogVisible"
      title="查看五联单"
      @cancel="openDialog('close')"
    >
      <template v-slot:content>
        <div class="dialog_pic_area">
          <img class="pic" :src="licensePictures" alt="" />
        </div>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import echarts from "echarts";
import MySearch from "@/components/base/mySearch";
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import triggerBar from "@/components/base/triggerBar";
import MyForm from "@/components/base/myForm";
import MyDialog from "@/components/base/myDialog";
import editableItems from "@/components/base/editableItems";
import errorUrl from "@/assets/imgs/form/fiveTheList1.png";
import {
  fishingPortDetail,
  fishingPortEdit,
  informationOverview,
  collectInformation,
  transportInformation,
  disposalInformation,
  dangerousInjectionTransfer,
  dangerousWasteTransferListRecord,
  deviceInformation,
  accountTable
} from "@/api/unitManagement";
import { addressRequest, uploadAction } from "@/api/other";
import {
  fishingPortStatusType,
  fishingPortLevelType,
  CompanyType,
  onlineStatusType,
  deviceStatusType,
  contaminationType,
  signingType
} from "@/utils/enum";
import { dateGrain } from "@/utils/methods";
import {
  collectInformationTable,
  transportationInformationTable,
  disposalInformationTable,
  conjoinedBodyTable,
  conjoinedRecordTable,
  equipmentInformationTable,
  standingBookTable
} from "./config";
export default {
  name: "fishing-ports-list-detail",
  components: {
    MySearch,
    MyTable,
    MyPagination,
    MyBread,
    triggerBar,
    MyForm,
    editableItems,
    MyDialog
  },
  data() {
    return {
      // 面包屑
      titleList: [
        { name: "单位管理", path: "" },
        { name: "渔港列表", path: "/ysx/fishing-ports-list" },
        { name: "渔港详情", path: "" }
      ],
      checkBaseMsgStatus: false,
      // 基本信息配置
      formModel: [
        [
          {
            type: "input",
            label: "渔港名称:",
            valueLabel: "companyName",
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "渔港编号:",
            valueLabel: "companyId",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "单位类型:",
            valueLabel: "companyTypeStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "添加时间:",
            valueLabel: "createTimeStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "联系人:",
            valueLabel: "linkman",
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "联系电话:",
            valueLabel: "phone",
            checkStatus: 2,
            required: true
          }
        ],
        [
          {
            type: "citySelect",
            label: "企业地址:",
            valueLabel: {
              province: "province",
              provinceCode: "provinceCode",
              provinceOptions: "provinceOptions",
              city: "city",
              cityCode: "cityCode",
              cityOptions: "cityOptions",
              area: "area",
              areaCode: "areaCode",
              areaOptions: "areaOptions",
              street: "street",
              streetCode: "streetCode",
              streetOptions: "streetOptions"
            },
            placeholder: "请选择",
            style: { width: "530px" },
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "详细地址:",
            valueLabel: "address",
            checkStatus: 2,
            style: { width: "265px" },
            required: false
          },
          {
            type: "input",
            label: "经度:",
            valueLabel: "log",
            checkStatus: 2,
            style: { width: "265px" },
            required: true
          },
          {
            type: "input",
            label: "纬度:",
            valueLabel: "lat",
            checkStatus: 2,
            style: { width: "265px" },
            required: true
          },
          {
            type: "text",
            label: "（上次处置含油污水至今）",
            required: false
          },
          {
            type: "input",
            label: "渔港状态:",
            valueLabel: "companyStatusStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "select",
            label: "渔港级别:",
            valueLabel: "subType",
            checkStatus: 2,
            style: {
              width: "265px"
            },
            options: Object.keys(fishingPortLevelType).map(item => {
              return {
                value: item,
                label: fishingPortLevelType[item]
              };
            }),
            required: true
          }
        ],
        [
          {
            type: "uploadPic",
            label: "经营许可证:",
            valueLabel: "companyBusinessUrl",
            picDesc: "支持.png、.jpg、.jpeg文件, 文件大小不超过2M",
            style: { width: "260px" },
            checkStatus: 2,
            require: true
          }
        ]
      ],
      formValue: {
        companyName: "",
        companyId: "",
        companyTypeStr: "",
        createTimeStr: "",
        linkman: "",
        phone: "",
        province: "",
        provinceCode: "",
        provinceOptions: "",
        city: "",
        cityCode: "",
        cityOptions: "",
        area: "",
        areaCode: "",
        areaOptions: "",
        street: "",
        streetCode: "",
        streetOptions: "",
        address: "",
        log: "",
        lat: "",
        companyStatusStr: "",
        companyStatus: "",
        subTypeStr: "",
        subType: "",
        disposeInfo: "",
        companyBusinessUrl: ""
      },
      panelData: {
        deviceCount: 0,
        remainStr: 0,
        receiveCount: 0,
        storageCount: 0,
        transferCount: 0,
        consumerCountStr: 0
      },
      // 表头，表数据，表分页
      collectInformationTable,
      tableData1: [],
      transportationInformationTable,
      tableData2: [],
      disposalInformationTable,
      tableData3: [],
      conjoinedBodyTable,
      tableData4: [],
      conjoinedRecordTable,
      tableData5: [],
      pageNum5: 1,
      pageSize5: 10,
      total5: 0,
      errorUrl,
      dialogVisible: false,
      licensePictures: "",
      equipmentInformationTable,
      tableData6: [],
      pageNum6: 1,
      pageSize6: 10,
      total6: 0,
      contaminationOptions: Object.keys(contaminationType).map(item => {
        return {
          value: item,
          label: contaminationType[item]
        };
      }),
      standingBookTable,
      tableData7: [],
      myChart: null,
      chartWidth: "500px",
      optionChart: {
        title: {
          text: "产废趋势（KG）",
          x: "center",
          y: "bottom",
          textStyle: {
            color: "#fff",
            fontFamily: "Microsoft YaHei"
          },
          padding: [30, 5]
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          width: "90%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              lineStyle: {
                color: ["#575757"],
                type: "dashed"
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: "#333333"
              }
            }
          }
        ],
        series: [
          {
            name: "产废趋势",
            type: "line",
            data: []
          }
        ]
      },
      activeName: "table",
      standingBookFrom: {
        nowTimeYear: "",
        nowTimeMonth: "",
        selectAllYear: true,
        selectTime: "",
        year: "",
        month: "",
        wasteType: ""
      }
    };
  },
  created() {
    this.itemId = this.$route.query.itemId;
    this.getDetail(this.itemId, () => {
      this.getTableData5();
    });
    this.setOptions(0, arr => {
      this.formValue.provinceOptions = arr;
    });
    let t = dateGrain();
    let nowTime = `${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
    this.standingBookFrom.selectTime = nowTime;
    this.standingBookFrom.nowTimeYear = t.dateYear;
    this.standingBookFrom.nowTimeMonth = t.dateMonth;
    this.standingBookFrom.year = t.dateYear;
    this.getInformationOverview();
    this.getTableData1();
    this.getTableData2();
    this.getTableData3();
    this.getTableData4();
    this.getTableData6();
    this.getAccountTable();
  },
  mounted() {
    this.setChartWidth();
    window.addEventListener("resize", this.autoResize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoResize);
  },
  methods: {
    autoResize() {
      this.setChartWidth();
      this.myChart.resize();
    },
    setChartWidth() {
      let offsetWidth = this.$refs.getWidthRef.offsetWidth + "px";
      this.chartWidth = offsetWidth;
    },
    // 基本信息编辑
    getDetail(itemId, fn) {
      fishingPortDetail(itemId)
        .then(res => {
          if (res != -1) {
            this.formValue.companyName = res.companyName;
            this.formValue.companyId = res.id;
            this.formValue.companyTypeStr = CompanyType[res.companyType];
            let stObj = dateGrain(res.createTime);
            this.formValue.createTimeStr = res.createTime
              ? `${stObj["dateYear"]}-${stObj["dateMonth"]}-${stObj["dateDay"]} ${stObj["dateHours"]}:${stObj["dateMinute"]}`
              : "-";
            this.formValue.linkman = res.linkman;
            this.formValue.phone = res.phone;
            this.formValue.province = res.province;
            this.formValue.provinceCode = res.provinceCode;
            this.formValue.city = res.city;
            this.formValue.cityCode = res.cityCode;
            this.formValue.area = res.area;
            this.formValue.areaCode = res.areaCode;
            this.formValue.street = res.street;
            this.formValue.streetCode = res.streetCode;
            this.formValue.companyStatusStr =
              fishingPortStatusType[res.companyStatus];
            this.formValue.companyStatus = res.companyStatus;
            this.formValue.address = res.address;
            this.formValue.subTypeStr = fishingPortLevelType[res.subType];
            this.formValue.subType = String(res.subType);
            this.formValue.disposeInfo = res.disposeInfo;
            this.formValue.log = res.gpsLocation.split(",")[0] + "°";
            this.formValue.lat = res.gpsLocation.split(",")[1] + "°";
            this.formValue.companyBusinessUrl = res.companyBusinessUrl;
            if (res.provinceCode) {
              this.setOptions(res.provinceCode, arr => {
                this.formValue.cityOptions = arr;
              });
            }
            if (res.cityCode) {
              this.setOptions(res.cityCode, arr => {
                this.formValue.areaOptions = arr;
              });
            }
            if (res.areaCode) {
              this.setOptions(res.areaCode, arr => {
                this.formValue.streetOptions = arr;
              });
            }
            if (fn) {
              fn();
            }
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // 设置地址选项
    setOptions(code, fn) {
      addressRequest(code)
        .then(res => {
          let arr = res.map(item => {
            return {
              value: item.code,
              label: item.name
            };
          });
          fn(arr);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addressSelect({ code, leave, key }) {
      if (leave != 4) {
        this.setOptions(code, arr => {
          switch (leave) {
            case 1:
              if (key == "provinceCode") {
                this.formValue.cityOptions = arr;
                this.formValue.cityCode = "";
                this.formValue.areaOptions = [];
                this.formValue.areaCode = "";
                this.formValue.streetOptions = [];
                this.formValue.streetCode = "";
              }
              break;
            case 2:
              if (key == "cityCode") {
                this.formValue.areaOptions = arr;
                this.formValue.areaCode = "";
                this.formValue.streetOptions = [];
                this.formValue.streetCode = "";
              }
              break;
            case 3:
              if (key == "areaCode") {
                this.formValue.streetOptions = arr;
                this.formValue.streetCode = "";
              }
              break;
            default:
              break;
          }
        });
      }
    },
    checkIconStatus() {
      if (this.checkBaseMsgStatus) {
        if (this.formValue.companyName.trim() == "") {
          this.$message.warning("渔港名称不能为空");
        } else if (this.formValue.linkman.trim() == "") {
          this.$message.warning("联系人不能为空");
        } else if (this.formValue.phone.trim() == "") {
          this.$message.warning("联系电话不能为空");
        } else if (this.formValue.provinceCode == "") {
          this.$message.warning("省地址不能为空");
        } else if (this.formValue.cityCode == "") {
          this.$message.warning("市地址不能为空");
        } else if (this.formValue.areaCode == "") {
          this.$message.warning("区地址不能为空");
        } else if (this.formValue.streetCode == "") {
          this.$message.warning("街道地址不能为空");
        } else if (this.formValue.log.trim() == "") {
          this.$message.warning("经度不能为空");
        } else if (this.formValue.lat.trim() == "") {
          this.$message.warning("纬度不能为空");
        } else if (this.formValue.subType.trim() == "") {
          this.$message.warning("渔港级别不能为空");
        } else if (this.formValue.companyBusinessUrl.trim() == "") {
          this.$message.warning("渔港图片不能为空");
        } else {
          let obj = {
            address: this.formValue.address,
            areaCode: this.formValue.areaCode,
            cityCode: this.formValue.cityCode,
            provinceCode: this.formValue.provinceCode,
            streetCode: this.formValue.streetCode,
            companyBusinessUrl: this.formValue.companyBusinessUrl,
            companyName: this.formValue.companyName,
            companyStatus: this.formValue.companyStatus,
            disposeInfo: this.formValue.disposeInfo,
            gpsLocation: this.formValue.log + "," + this.formValue.lat,
            linkman: this.formValue.linkman,
            subType: this.formValue.subType,
            phone: this.formValue.phone
          };
          fishingPortEdit(this.itemId, obj)
            .then(res => {
              if (res != -1) {
                this.$message.success("修改成功");
                this.getDetail(this.itemId);
                this.checkStatus();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        }
      } else {
        this.formValue.log = this.formValue.log.slice(0, -1);
        this.formValue.lat = this.formValue.lat.slice(0, -1);
        this.checkStatus();
      }
    },
    checkStatus() {
      this.checkBaseMsgStatus = !this.checkBaseMsgStatus;
      let obj = this.formModel.map(cell => {
        return cell.map(item => {
          let obj = {
            ...item
          };
          if (item.checkStatus == 1) {
            obj.checkStatus = 2;
          }
          if (item.checkStatus == 2) {
            obj.checkStatus = 1;
          }
          return obj;
        });
      });
      this.formModel = obj;
    },
    uploadPicChange(key) {
      let input = document.createElement("input");
      input.type = "file";
      input.click();
      let that = this;
      input.onchange = function() {
        let imgReg = /(.jpg|.png|.jpeg)$/;
        let name = input.files[0].name;
        if (input.files[0].size / 1024 > 2048) {
          that.$message.error("图片大小超过2M，请重新上传");
          return;
        }
        if (!imgReg.test(name)) {
          that.$message.warning("请注意文件格式");
          return;
        }
        let form = new FormData();
        form.append("file", input.files[0]);
        uploadAction(form)
          .then(res => {
            if (res != -1) {
              that.$message.success("上传成功");
              that.formValue[key] = res;
            }
          })
          .catch(error => {
            that.$message.error(error.message);
          });
      };
    },
    // 信息总览
    getInformationOverview() {
      informationOverview(this.itemId)
        .then(res => {
          if (res != -1) {
            this.panelData.deviceCount = res.deviceCount;
            this.panelData.remainStr = res.remain
              ? Number(res.remain).toFixed(2) + "吨"
              : 0;
            this.panelData.receiveCount = res.receiveCount || 0;
            this.panelData.storageCount = res.storageCount || 0;
            this.panelData.transferCount = res.transferCount || 0;
            this.panelData.consumerCountStr = res.consumerCount
              ? parseFloat(Number(res.consumerCount) / 1000).toFixed(2) + "吨"
              : 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    deleteOpration() {},
    getTableData1() {
      collectInformation(this.itemId)
        .then(res => {
          let tableData = [];
          if (res && res.length > 0) {
            tableData = res;
          }
          this.tableData1 = tableData;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData2() {
      transportInformation(this.itemId)
        .then(res => {
          let tableData = [];
          if (res && res.length > 0) {
            tableData = res;
          }
          this.tableData2 = tableData;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData3() {
      disposalInformation(this.itemId)
        .then(res => {
          let tableData = [];
          if (res && res.length > 0) {
            tableData = res;
          }
          this.tableData3 = tableData;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData4() {
      dangerousInjectionTransfer(this.itemId)
        .then(res => {
          let tableData = [];
          if (res && res.length > 0) {
            tableData = res;
          }
          this.tableData4 = tableData;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData5(data) {
      this.pageSize5 = data ? data.pageSize : this.pageSize5;

      let params = {
        page: this.pageNum5,
        size: this.pageSize5,
        producerName: this.formValue.companyName
      };
      dangerousWasteTransferListRecord(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData5 = res.content.map(item => {
                let stObj = dateGrain(item.createTime);
                let createTimeStr = item.createTime
                  ? `${stObj["dateYear"]}-${stObj["dateMonth"]}-${stObj["dateDay"]} ${stObj["dateHours"]}:${stObj["dateMinute"]}`
                  : "-";
                return {
                  ...item,
                  wasteTypeStr: contaminationType[item.wasteType],
                  createTimeStr: createTimeStr,
                  statusStr: signingType[item.status],
                  picUrl: item.url
                };
              });
            } else {
              this.tableData5 = [];
            }
            this.total5 = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData6(data) {
      this.pageSize6 = data ? data.pageSize : this.pageSize6;

      let params = {
        page: this.pageNum6,
        size: this.pageSize6,
        companyId: this.itemId
      };
      deviceInformation(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData6 = res.content.map(item => {
                return {
                  ...item,
                  onlineStatusStr: onlineStatusType[item.onlineStatus],
                  deviceStatusStr: deviceStatusType[item.deviceStatus]
                };
              });
            } else {
              this.tableData6 = [];
            }
            this.total6 = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    openDialog(type, data) {
      switch (type) {
        case "detail":
          this.$router.push({
            path: "fishing-ports-list-equipmentDetail",
            query: { itemId: data.id }
          });
          break;
        case "open":
          this.dialogVisible = true;
          this.licensePictures = data.picUrl || this.errorUrl;
          break;
        case "close":
          this.dialogVisible = false;
          this.licensePictures = "";
          break;
        default:
          break;
      }
    },
    checkboxChange() {
      if (this.standingBookFrom.year != this.standingBookFrom.nowTimeYear) {
        this.standingBookFrom.nowTimeMonth = "01";
      }
      if (this.standingBookFrom.selectAllYear) {
        this.standingBookFrom.month = "";
      } else {
        this.standingBookFrom.month = this.standingBookFrom.nowTimeMonth;
      }
      this.getAccountTable();
    },
    pickerChange(time) {
      let t = time.split("-");
      if (this.standingBookFrom.selectAllYear) {
        this.standingBookFrom.year = t[0];
        this.standingBookFrom.month = "";
      } else {
        this.standingBookFrom.year = t[0];
        this.standingBookFrom.month = t[1];
      }
      this.getAccountTable();
    },
    selectChange() {
      this.getAccountTable();
    },
    numberCheck(num) {
      if (!!num) {
        let n = Number(num) / 1000;
        return n.toFixed(3);
      } else {
        return 0;
      }
    },
    getAccountTable() {
      let params = {
        year: this.standingBookFrom.year,
        month: this.standingBookFrom.month,
        wasteType: this.standingBookFrom.wasteType
      };
      let check = this.standingBookFrom.selectAllYear;
      accountTable(this.itemId, params)
        .then(res => {
          if (res != -1) {
            if (res.data && res.data.length > 0) {
              this.tableData7 = res.data.map(item => {
                return {
                  ...item,
                  time: check
                    ? item.month + "月"
                    : item.month + "月" + item.day + "日",
                  produceEnd: this.numberCheck(item.produce),
                  consumeEnd: this.numberCheck(item.consume),
                  transferEnd: this.numberCheck(item.transfer),
                  previousRemainEnd: this.numberCheck(item.previousRemain),
                  currentRemainEnd: this.numberCheck(item.currentRemain),
                  pollutionEnd: this.numberCheck(item.pollution)
                };
              });
            } else {
              this.tableData7 = [];
            }
            if (
              res.xData &&
              res.xData.length > 0 &&
              res.yData &&
              res.yData.length > 0
            ) {
              this.optionChart.xAxis[0].data = res.xData;
              this.optionChart.series[0].data = res.yData;
              this.setEChartOptions();
            } else {
              this.optionChart.xAxis[0].data = [];
              this.optionChart.series[0].data = [];
              this.setEChartOptions();
            }
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    changeTabs() {},
    setEChartOptions() {
      this.myChart = echarts.init(this.$refs.chartRef);
      this.myChart.setOption(this.optionChart);
    }
  }
};
</script>

<style lang="less" scoped>
.detail_content {
  padding-bottom: 100px;
  .group_cell {
    margin-bottom: 10px;
    .base_msg_bar {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      text-align: center;
      padding: 20px 0 30px;
      .tit {
        margin-bottom: 5px;
      }
    }
    .my_table {
      margin-top: 10px;
    }
    .my_pagination {
      margin-top: 10px;
    }
  }
}
.basic_msg_from {
  display: flex;
  justify-content: space-between;
}
.btn_group {
  .btn {
    cursor: pointer;
    color: #fff;
    padding: 2px 3px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.red {
      background: #dd6161;
    }
    &.blue {
      background: #409eff;
    }
  }
}
.dialog_pic_area {
  .pic {
    display: block;
    width: 100%;
  }
}
.chart_area {
  height: 500px;
}
</style>
