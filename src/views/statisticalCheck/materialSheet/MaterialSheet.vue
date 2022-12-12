<!--物料平衡表-->
<template>
  <div class="material_sheet_page" id="materialSheet">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="中转仓" prop="wareHouseNo" label-width="">
              <el-select
                v-model="formData.wareHouseNo"
                placeholder="请选择"
                filterable
                @change="wareHouseChange"
              >
                <el-option
                  v-for="item in storageDeviceOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="formData.date"
                type="daterange"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="searchFn"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
          <div class="check_out" @click="downLoad" v-fastClick v-if="MenuBtnValid('/materialSheet','导出')">导出</div>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 汇总 -->
        <el-tab-pane label="汇总信息" name="first">
          <SummaryComponent
            :tableData="summaryData"
            :tabelHeigth="tabelHeigth"
            :loading="loading"
          ></SummaryComponent>
        </el-tab-pane>
        <!-- 海塑详情 -->
        <el-tab-pane label="海塑详情" name="fourth">
          <el-table
            :data="haisuData"
            style="width: 100%"
            :height="tabelHeigth + 72"
            ref="table"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column
              type="index"
              :index="getIndex"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="typeName"
              label="海塑类型"
              width=""
            ></el-table-column>
            <el-table-column
              prop=""
              label="期初库存"
              width=""
            >
              <template slot-scope="scope">
                {{scope.row.startPackageWeight||'0'}}kg,{{scope.row.startPackageNumber||'0'}}包
              </template>
            </el-table-column>
            <el-table-column prop="" label="入库" width=""><template slot-scope="scope">
                {{scope.row.innerPackageWeight||'0'}}kg,{{scope.row.innerPackageNumber||'0'}}包
              </template></el-table-column>
            <el-table-column prop="" label="盘赢" width="">
              <template slot-scope="scope">
                {{scope.row.profitPackageWeight||'0'}}kg,{{scope.row.profitPackageNumber||'0'}}包
              </template>
            </el-table-column>
            <el-table-column prop="" label="盘亏" width="">
              <template slot-scope="scope">
                {{scope.row.lossesPackageWeight||'0'}}kg,{{scope.row.lossesPackageNumber||'0'}}包
              </template>
            </el-table-column>
            <el-table-column prop="" label="出库" width="">
              <template slot-scope="scope">
                {{scope.row.outerPackageWeight||'0'}}kg,{{scope.row.outerPackageNumber||'0'}}包
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="期末库存"
              width=""
            >
              <template slot-scope="scope">
                {{scope.row.endPackageWeight||'0'}}kg,{{scope.row.endPackageNumber||'0'}}包
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 入库 -->
        <el-tab-pane label="入库" name="second">
          <div class="tableHead">
            <span>总计: {{amountInputData.totalNumber||0}}包</span><span>重量:  {{amountInputData.totalWeight||0}}kg</span>
          </div>
          <el-table
            :data="inputData"
            style="width: 100%"
            :height="tabelHeigth"
            ref="table"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column
              type="index"
              :index="getIndex"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="orderNo"
              label="入库单"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="transportSerialNo"
              label="调度单"
              width="210"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="homeNames"
              label="产废单位"
              width=""
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="inputOrderStatus"
              label="转运状态"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="plasticBlockStr"
              label="海塑类型"
              width="180"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="actualInputWeight"
              label="入库重量(kg)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="blockCount"
              label="入库包数(包)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="inputTime"
              label="入库时间"
              width=""
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              layout="sizes, prev, pager, next, jumper"
              :current-page="page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="size"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 出库 -->
        <el-tab-pane label="出库" name="third">
          <div class="tableHead">
            <span>总计: {{amountOutData.totalNumber||0}}包</span><span>重量:  {{amountOutData.totalWeight||0}}kg</span>
          </div>
          <el-table
            :data="outData"
            style="width: 100%"
            :height="tabelHeigth"
            ref="table"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
          >
            <el-table-column
              type="index"
              :index="getIndex"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="serialNo" label="出库单" width="250"></el-table-column>
            <el-table-column prop="transportCompanyName" label="运输公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fromHomeNames" label="产废单位" width="300" show-overflow-tooltip></el-table-column>
            <el-table-column
              label="海塑类型"
            >
             <template slot-scope="scope">
              <div>{{ seaPlasticTypeDict[scope.row.blockType] }}</div>
            </template>
            </el-table-column>
            <el-table-column
              prop="actualWeight"
              label="出库重量(kg)"
            ></el-table-column>
            <el-table-column
              prop="outTotalNumber"
              label="出库包数(包)"
            ></el-table-column>
            <el-table-column prop="date" label="出库时间" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              background
              layout="sizes, prev, pager, next, jumper"
              :current-page="page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="size"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { timeStampSwitch } from "@/utils/util.js";
import SummaryComponent from "./SummaryComponent.vue";
export default {
  name: "materialSheet",
  data() {
    return {
      tabelHeigth: 500,
      breadData: [{ name: "统计查询", path: "" }, { name: "物料平衡表" }],
      formData: {
        date: null,
        wareHouseNo: "",
      },
      activeName: "first",
      loading: false,
      summaryData: [], //汇总数据
      inputData: [], //入库数据
      outData: [], //出库
      haisuData: [], //海塑
      amountInputData:{},//入库总计
      amountOutData:{},//出库总计

      seaPlasticType: [], //塑料块类型
      seaPlasticTypeDict: {}, //海塑种类
      // 表格
      page: 1,
      size: 10,
      total: 0,
      storageDeviceOption: [], //所有中转仓
    };
  },
  components: { Breadcrumb, SummaryComponent },
  computed: {},
  created() {
    // this.getStorageDevice();
    this.getHaisuKinds();
    // 当月第一天
    var date = new Date();
    date.setDate(1);
    var month = parseInt(date.getMonth() + 1);
    var day = date.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var startTime = date.getFullYear() + "-" + month + "-" + day;

    // 当月最后一天
    var year = date.getFullYear();
    var day = new Date(year, month, 0);
    var endTime = year + "-" + month + "-" + day.getDate();
    this.formData.date = [startTime, endTime];

    this.getInitData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      this.tabelHeigth =
        document.querySelector("#materialSheet").offsetHeight -
        311 -
        searchHeight;
    });
    window.onresize = () => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      let contentDom = document.querySelector("#materialSheet");
      let contentHeight = contentDom ? contentDom.offsetHeight || 0 : 0;
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 311 - searchHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
  },
  activated() {},
  methods: {
    // 等待 基础数据获取成功
    getInitData() {
      this.getStorageDevice((state) => {
        this.getSummary();
        // if (state) {
        //   this.getSummary();
        // }
      });
    },
    //获取中转仓下拉列表
    getStorageDevice(callBack) {
      this.$http(this.GLOBALApi.getStorageDevice(), {})
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];
            this.storageDeviceOption = [];
            this.formData.wareHouseNo = res.data[0].companyNo;
            records.map((item, index) => {
              let temp = {
                label: item.name,
                value: item.companyNo,
              };
              this.storageDeviceOption.push(temp);
            });
            callBack(true);
          } else {
            callBack(false);
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          callBack(false);
          this.$message.error(error.msg);
        });
    },

    searchFn() {
      this.page = 1;
      console.log(this.activeName);
      switch (this.activeName) {
        case "first":
          this.getSummary();
          break;
        case "second":
          this.getInputData();
          break;
        case "third":
          this.getOutData();
          break;
        case "fourth":
          this.getHaisuDetail();
          break;

        default:
          break;
      }
    },
    // 中转仓切换事件
    wareHouseChange(val) {
      this.formData.wareHouseNo = val;
      this.page = 1;
      switch (this.activeName) {
        case "first":
          this.getSummary();
          break;
        case "second":
          this.getInputData();
          break;
        case "third":
          this.getOutData();
          break;
        case "fourth":
        this.getHaisuDetail();
        break;

        default:
          break;
      }
    },
    //汇总数据列表
    getSummary() {
      this.loading = true;
      this.summaryData = [];
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        wareHouseNo:this.formData.wareHouseNo || "",
        startTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",
      };
      this.$http(this.GLOBALApi.getMaterialBalanceCountDto(), params)
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.loading = false;
            let records = res.data || [];

            this.summaryData.push(records)
            this.summaryData.push(records)

            // console.log(this.summaryData,"数据");
            this.loading = false;
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
    // 入库数据
    getInputData() {
      this.getInputZjData()
      this.loading = true;
      this.inputData = [];
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        warehouseNos:String(this.formData.wareHouseNo).split(','),
        beginTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",
      };

      this.$http(this.GLOBALApi.getStoreList(), params)
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.loading = false;

            this.total = res.data.total || 0;
            let records = res.data.records || [];

            records.map((item, index) => {
               this.inputData.push({
                  ...item,
                  // inputTime: item.inputTime ? timeStampSwitch(item.inputTime, '', 'yy/mm/dd') : '',
                  inputOrderStatus: item.inputOrderStatus == 1 ? '待出库' : (item.inputOrderStatus == 2 ? '部分出库' : '已出库'),
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
    // 出库数据
    getOutData() {
      this.getOutZjData()
      this.loading = true;
      this.outData = [];
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        notStatusEq:1,//只显示运输中和运输完成的
        warehouseNos:String(this.formData.wareHouseNo).split(','),
        beginTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",
      };

      this.$http(this.GLOBALApi.getTransitDispatch(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;

            this.total = res.data.total || 0;
            let records = res.data.records || [];
            records.map((item, index) => {
              this.outData.push({
                ...item,
                date: item.workStartTime, //出库时间
                // date: item.workStartTime
                //   ? timeStampSwitch(item.workStartTime, "", "yy/mm/dd")
                //   : "", //出库时间
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
    // 入库总计
    getInputZjData() {
      this.loading = true;
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        warehouseNos:String(this.formData.wareHouseNo).split(','),
        startTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",
      };

      this.$http(this.GLOBALApi.getCountStorageInputOrderTotalWeight(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;
            this.$set(this.amountInputData,'totalWeight',res.data.totalWeight)
            this.$set(this.amountInputData,'totalNumber',res.data.totalNumber)
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
    // 出库总计
    getOutZjData() {
      this.loading = true;
      let params = {
        pageNum: this.page,
        pageSize: this.size,
         warehouseNos:String(this.formData.wareHouseNo).split(','),
        startTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",
      };

      this.$http(this.GLOBALApi.getCountStorageOutputOrderTotalWeight(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;
            this.$set(this.amountOutData,'totalWeight',res.data.totalWeight)
            this.$set(this.amountOutData,'totalNumber',res.data.totalNumber)
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
    // 海塑详情数据
    getHaisuDetail() {
      // this.loading = true;
      this.haisuData = [];
      let params = {
        wareHouseNo:this.formData.wareHouseNo || "",
        startTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",

      };
      this.$http(this.GLOBALApi.getMaterialTypeCountDto(), params)
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.loading = false;

            this.total = res.data.total || 0;
            let records = res.data || [];

            records.map((item, index) => {
              this.haisuData.push(item);
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
    // tab切换
    handleClick() {
      this.page = 1;
      this.size = 10;
      // console.log(this.activeName);
      switch (this.activeName) {
        case "first":
          this.getSummary();
          break;
        case "second":
          this.getInputData();
          break;
        case "third":
          this.getOutData();
          break;
        case "fourth":
          this.getHaisuDetail();
          break;

        default:
          break;
      }
    },
    // 导出
    downLoad() {
      let url = this.GLOBALApi.excelAllMaterialBalance();
      let params = {
        // pageNum: this.page,
        // pageSize: this.size,
        wareHouseNo: this.formData.wareHouseNo || "",
        startTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[0] + " 00:00:00"
            : "",
        endTime:
          this.formData.date && this.formData.date.length > 0
            ? this.formData.date[1] + " 23:59:59"
            : "",
      };

      this.loading = true;
      // 导出
      this.$http(url, params, "downExcel")
        .then((res) => {
          if (res) {
            if (navigator.userAgent.indexOf("Firefox") >= 0) {
              var link = document.createElement("a"); //a标签下载
              link.href = window.URL.createObjectURL(new Blob([res.data]));
              link.download = "物料平衡表.xlsx";

              link.dispatchEvent(
                new MouseEvent("click", {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                })
              );
              window.URL.revokeObjectURL(link.href);
              link.remove();
            } else {
              var link = document.createElement("a"); //a标签下载
              link.href = window.URL.createObjectURL(new Blob([res.data]));
              link.download = "物料平衡表.xlsx";
              link.click();
              window.URL.revokeObjectURL(link.href);
              link.remove();
            }
            this.loading = false;
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch((error) => {
          this.loading = false;
          this.$message.error(error.msg);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      switch (this.activeName) {
        case "first":
          this.getSummary();
          break;
        case "second":
          this.getInputData();
          break;
        case "third":
          this.getOutData();
          break;
        case "fourth":
          this.getHaisuDetail();
          break;

        default:
          break;
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      switch (this.activeName) {
        case "first":
          this.getSummary();
          break;
        case "second":
          this.getInputData();
          break;
        case "third":
          this.getOutData();
          break;
        case "fourth":
          this.getHaisuDetail();
          break;

        default:
          break;
      }
    },
    // 序号
    getIndex(index) {
      if (this.page) {
        return index + (this.page - 1) * this.size + 1;
      } else {
        return index + 1;
      }
    },
    getHaisuKinds() {
        // 请求塑料类型接口
      this.seaPlasticTypeDict = {};
      this.$http(this.GLOBALApi.getDictionaryListByCode(), {
        no: "plasticType",
      })
          .then((res) => {
            if (res.code === 200 && res.data) {
              for (let item of res.data) {
                this.$set(this.seaPlasticTypeDict, item.categoryNo, item.categoryName);
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });

    },
  },
};
</script>

<style lang="less" scoped>
.material_sheet_page {
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

  .source {
    cursor: pointer;
    display: inline-block;
    border-bottom: solid 1px;
    height: 22px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 82, 217, 0.9);
  }
}
.page{
  justify-content: flex-end;
}
// 搜索部分
.search {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
    width: 320px !important;
  }
}

/deep/ .el-input.el-input--small.el-input--suffix {
  width: 320px !important;
}
/deep/ .el-range-editor--small.el-input__inner {
  width: 320px;
}

/deep/.el-tabs__item {
  padding-right: 100px !important;
}
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
}

.check_out {
  cursor: pointer;
  width: 60px;
  height: 32px;
  background: #0052d9;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #0052d9;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 32px;
  text-align: center;
}

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052d9;
}
.tableHead {
  text-align: right;
  width: 100%;
  // border:solid red 1px;

  span {
    padding: 10px 10px;
  }
}
</style>
