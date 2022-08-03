<!--单位管理-渔船列表 详情-->
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
    <div class="group_cell">
      <triggerBar title="接收联单" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData1"
        :pageNum="pageNum1"
        :pageSize="pageSize1"
        :tableConfig="tableConfig1"
      >
        <template #data_Operate="{ data }">
          <div class="btn_group">
            <span @click="openDialog('detail', data)" title="详情" class="btn blue">详情</span>
            <span class="btn red" @click="openDialog('view', data)">视图</span>
          </div>
        </template>
      </MyTable>
      <MyPagination
        v-model="pageNum1"
        :size="pageSize1"
        :total="total1"
        @pageChange="getTableData1"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell">
      <triggerBar title="进出港记录(仅展示近1年记录)" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData2"
        :pageNum="pageNum2"
        :pageSize="pageSize2"
        :tableConfig="tableConfig2"
      >
      </MyTable>
      <MyPagination
        v-model="pageNum2"
        :size="pageSize2"
        :total="total2"
        @pageChange="getTableData2"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell">
      <triggerBar
        title="健康码变化记录（仅展示近1年记录）"
        type="text"
      ></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData3"
        :pageNum="pageNum3"
        :pageSize="pageSize3"
        :tableConfig="tableConfig3"
      >
      </MyTable>
      <MyPagination
        v-model="pageNum3"
        :size="pageSize3"
        :total="total3"
        @pageChange="getTableData3"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell">
      <triggerBar title="预警记录" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData4"
        :pageNum="pageNum4"
        :pageSize="pageSize4"
        :tableConfig="tableConfig4"
      >
      </MyTable>
      <MyPagination
        v-model="pageNum4"
        :size="pageSize4"
        :total="total4"
        @pageChange="getTableData4"
        :hidePagination="true"
      ></MyPagination>
    </div>
    <div class="group_cell">
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
      <div class="chart_area" ref="chartRef"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import MyBread from "@/components/base/myBread";
import triggerBar from "@/components/base/triggerBar";
import editableItems from "@/components/base/editableItems";
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import {
  fishingBoatDetail,
  fishingBoatEdit,
  receptionOrder,
  investAndExported,
  healthCodeChangeRecord,
  warningRecord,
  fishingAccountTable
} from "@/api/unitManagement";
import { addressRequest, uploadAction } from "@/api/other";
import {
  tableConfig1,
  tableConfig2,
  tableConfig3,
  tableConfig4
} from "./config";
import {
  CompanyType,
  fishingBoatType,
  contaminationType,
  jointPolicyType
} from "@/utils/enum";
import { dateGrain } from "@/utils/methods";
export default {
  name: "fishing-boat-list-detail",
  components: {
    MyBread,
    triggerBar,
    editableItems,
    MyTable,
    MyPagination
  },
  data() {
    return {
      titleList: [
        { name: "单位管理", path: "" },
        { name: "渔船列表", path: "/ysx/fishing-boat-list" },
        { name: "渔船详情", path: "" }
      ],
      itemId: "",
      // 表格
      tableData1: [],
      tableConfig1,
      pageNum1: 1,
      pageSize1: 10,
      total1: 0,
      tableData2: [],
      tableConfig2,
      pageNum2: 1,
      pageSize2: 10,
      total2: 0,
      tableData3: [],
      tableConfig3,
      pageNum3: 1,
      pageSize3: 10,
      total3: 0,
      tableData4: [],
      tableConfig4,
      pageNum4: 1,
      pageSize4: 10,
      total4: 0,
      pageStatus: "",
      // 基本信息
      checkBaseMsgStatus: false,
      formModel: [
        [
          {
            type: "input",
            label: "船名:",
            valueLabel: "companyName",
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "渔船编号:",
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
          },
          {
            type: "input",
            label: "已登记电话:",
            valueLabel: "nowPhone",
            checkStatus: 2,
            required: false
          },
          {
            type: "input",
            label: "备注:",
            valueLabel: "remark",
            checkStatus: 2,
            required: false
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
              areaOptions: "areaOptions"
            },
            placeholder: "请选择",
            style: { width: "530px" },
            checkStatus: 2,
            required: true
          },
          {
            type: "input",
            label: "渔业公司:",
            valueLabel: "parentName",
            checkStatus: 2,
            style: { width: "265px" },
            required: false
          },
          {
            type: "input",
            label: "渔船状态:",
            valueLabel: "companyStatusStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "阶段行驶里程:",
            valueLabel: "kilometreStr",
            checkStatus: 3,
            required: false
          },
          {
            type: "text",
            label: "（上次处置含油污水至今）",
            required: false
          },
          {
            type: "input",
            label: "进/出港状态:",
            valueLabel: "currentLocation",
            checkStatus: 3,
            required: false
          },
          {
            type: "input",
            label: "健康码状态:",
            valueLabel: "healthCodeState",
            checkStatus: 3,
            required: false
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
            require: false
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
        parentName: "",
        companyStatus: "",
        companyStatusStr: "",
        kilometreStr: "",
        currentLocation: "",
        healthCodeState: "",
        disposeInfo: "",
        companyBusinessUrl: "",
        nowPhone: "",
        remark: ""
      },
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
      myChart: null,
      contaminationOptions: Object.keys(contaminationType).map(item => {
        return {
          value: item,
          label: contaminationType[item]
        };
      }),
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
    this.pageStatus = this.$route.query.pageStatus;
    if (this.pageStatus == "warning") {
      this.titleList.splice(1, 1, {
        name: "渔船预警列表",
        path: "/ysx/fishing-vessel-warning"
      });
    } else {
      this.titleList.splice(1, 1, {
        name: "渔船列表",
        path: "/ysx/fishing-boat-list"
      });
    }
    this.getDetail(this.itemId);
    let t = dateGrain();
    let nowTime = `${t.dateYear}-${t.dateMonth}-${t.dateDay}`;
    this.standingBookFrom.selectTime = nowTime;
    this.standingBookFrom.nowTimeYear = t.dateYear;
    this.standingBookFrom.nowTimeMonth = t.dateMonth;
    this.standingBookFrom.year = t.dateYear;
    this.setOptions(0, arr => {
      this.formValue.provinceOptions = arr;
    });
    this.getTableData1();
    this.getTableData4();
    this.getAccountTable();
  },
  mounted() {
    window.addEventListener("resize", this.autoResize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.autoResize);
  },

  methods: {
    autoResize() {
      this.myChart.resize();
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
    getAccountTable() {
      let params = {
        year: this.standingBookFrom.year,
        month: this.standingBookFrom.month,
        wasteType: this.standingBookFrom.wasteType
      };
      fishingAccountTable(this.itemId, params)
        .then(res => {
          if (res != -1) {
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
    setEChartOptions() {
      this.myChart = echarts.init(this.$refs.chartRef);
      this.myChart.setOption(this.optionChart);
    },
    getDetail(itemId) {
      fishingBoatDetail(itemId)
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
            this.formValue.nowPhone = res.nowPhone;
            this.formValue.remark = res.remark;
            this.formValue.parentName = res.parentName;
            this.formValue.companyStatus = res.companyStatus;
            this.formValue.companyStatusStr =
              fishingBoatType[res.companyStatus];
            this.formValue.kilometreStr = (res.kilometre || 0) + " 海里";
            this.formValue.currentLocation = res.currentLocation;
            this.formValue.healthCodeState = res.healthCodeState;

            this.formValue.disposeInfo = res.disposeInfo;
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
            this.getTableData2();
            this.getTableData3();
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
    getTableData1(data) {
      this.pageSize1 = data ? data.pageSize : this.pageSize1;

      let params = {
        page: this.pageNum1,
        size: this.pageSize1,
        shipId: this.itemId
      };
      receptionOrder(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData1 = res.content.map(item => {
                let sTime = dateGrain(item.workStartTime);
                let eTime = dateGrain(item.workEndTime);
                let startTimeStr = item.workStartTime
                  ? `${sTime["dateYear"]}-${sTime["dateMonth"]}-${sTime["dateDay"]} ${sTime["dateHours"]}:${sTime["dateMinute"]}`
                  : "-";
                let endTimeStr = item.workEndTime
                  ? `${eTime["dateYear"]}-${eTime["dateMonth"]}-${eTime["dateDay"]} ${eTime["dateHours"]}:${eTime["dateMinute"]}`
                  : "-";
                return {
                  ...item,
                  wasteTypeStr: contaminationType[item.wasteType],
                  statusStr: jointPolicyType[item.status],
                  startTimeStr,
                  endTimeStr
                };
              });
            } else {
              this.tableData1 = [];
            }
            this.total1 = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData2(data) {
      this.pageSize2 = data ? data.pageSize : this.pageSize2;

      let params = {
        page: this.pageNum2,
        size: this.pageSize2,
        name: this.formValue.companyName
      };
      investAndExported(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData2 = res.content.map(item => {
                return {
                  ...item,
                  actionStateStr: item.actionState ? "出港" : "进港"
                };
              });
            } else {
              this.tableData2 = [];
            }
            this.total2 = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData3(data) {
      this.pageSize3 = data ? data.pageSize : this.pageSize3;

      let s = dateGrain(Date.now() - 365 * 24 * 60 * 60 * 1000);
      let e = dateGrain(Date.now());
      let st = `${s.dateYear}-${s.dateMonth}-${s.dateDay} ${s.dateHours}:${s.dateMinute}:${s.dateSecond}`;
      let et = `${e.dateYear}-${e.dateMonth}-${e.dateDay} ${e.dateHours}:${e.dateMinute}:${e.dateSecond}`;
      let params = {
        page: this.pageNum3,
        size: this.pageSize3,
        companyName: this.formValue.companyName,
        createTimeStart: st,
        createTimeEnd: et
        // sendSmsTimeStart:st,
        // sendSmsTimeStart:et,
      };
      healthCodeChangeRecord(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {
              this.tableData3 = res.records.map(item => {
                return {
                  ...item,
                  changType: item.isManual ? "人工修改" : "自动修改"
                };
              });
            } else {
              this.tableData3 = [];
            }
            this.total3 = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    getTableData4(data) {
      this.pageSize4 = data ? data.pageSize : this.pageSize4;

      let params = {
        page: this.pageNum4,
        size: this.pageSize4,
        companyId: this.itemId
      };
      warningRecord(params)
        .then(res => {
          if (res != -1) {
            if (res.content && res.content.length > 0) {
              this.tableData4 = res.content.map(item => {
                return {
                  ...item
                };
              });
            } else {
              this.tableData4 = [];
            }
            this.total4 = res.totalElements || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    openDialog(type, rowData) {
      switch (type) {
        case "detail":
          this.$router.push({
            path: "/ysx/fishing-boat-list-information-detailed",
            query: {
              recordNo: rowData.recordNo,
              itemId: this.itemId,
              pageStatus: this.pageStatus
            }
          });
          break;
        case "view":
          if (!rowData.pdfUrl) {
            this.$message.error("无视图");
          } else {
            window.open(rowData.pdfUrl);
          }
          break;
        default:
          break;
      }
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
              }
              break;
            case 2:
              if (key == "cityCode") {
                this.formValue.areaOptions = arr;
                this.formValue.areaCode = "";
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
          this.$message.warning("船名不能为空");
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
        } else {
          let obj = {
            areaCode: this.formValue.areaCode,
            cityCode: this.formValue.cityCode,
            provinceCode: this.formValue.provinceCode,
            companyBusinessUrl: this.formValue.companyBusinessUrl,
            companyName: this.formValue.companyName,
            companyStatus: this.formValue.companyStatus,
            disposeInfo: this.formValue.disposeInfo,
            linkman: this.formValue.linkman,
            phone: this.formValue.phone,
            nowPhone: this.formValue.nowPhone,
            parentName: this.formValue.parentName,
            remark: this.formValue.remark
          };
          fishingBoatEdit(this.itemId, obj)
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
    }
  }
};
</script>

<style lang="less" scoped>
.detail_content {
  padding-bottom: 100px;
  .group_cell {
    margin-bottom: 10px;
  }
}
.basic_msg_from {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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
.chart_area {
  width: 100%;
  height: 500px;
}
</style>
