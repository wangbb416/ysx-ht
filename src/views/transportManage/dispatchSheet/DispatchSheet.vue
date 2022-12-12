<!--运输管理-清运调度单管理-->
<template>
  <div class="dispatch_sheet_page" id="DispatchSheet">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="content">
      <div class="search">
        <div class="search_input">
          <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="转运状态">
              <el-select
                  v-model="searchValue.status"
                  placeholder="请选择"
                  clearable
                  @change="handleSearch"
              >
                <el-option
                    v-for="item in transportDispatchStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="类型">
              <el-select
                  v-model="searchValue.homeIslandType"
                  placeholder="请选择"
                  clearable
                  @change="handleSearch"
              >
                <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="调度日期">
              <el-date-picker
                  v-model="searchValue.date"
                  type="daterange"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="handleSearch"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="产废单位">
              <el-input
                  placeholder="请输入"
                  v-model="searchValue.homeNames"
                  @keyup.enter.native="handleSearch"
                  clearable
                  @clear="handleSearch"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="司机">
              <el-input
                  placeholder="请输入"
                  v-model="searchValue.transportUserName"
                  @keyup.enter.native="handleSearch"
                  clearable
                  @clear="handleSearch"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="中转仓" label-width="80px">
              <el-select
                  v-model="searchValue.warehouseNos"
                  placeholder="请选择"
                  @change="handleSearch"
                  multiple
                  clearable
                  collapse-tags
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

            <!-- <el-form-item label="">
              <el-input
                placeholder="请输入查找内容的关键字"
                v-model="searchValue.searchContent"
                @keyup.enter.native="handleSearch"
              >
                <div slot="suffix" class="el-input-slot__icon">
                  <img src="@/assets/img/home/search.png" alt="" />
                </div>
              </el-input>
            </el-form-item> -->
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
          <div class="button_blue" @click="handleOpenDialog" v-if="MenuBtnValid('/dispatchSheet','新增')">新增</div>
        </div>
      </div>

      <div class="table">
        <el-table
            :data="tableData"
            style="width: 100%"
            :height="tabelHeigth"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
        >
          <el-table-column type="index" :index="getIndex" label="序号" width="60"></el-table-column>
          <el-table-column
              prop="serialNo"
              label="调度单号"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="140"
              prop="vehicleNumber"
              label="车牌号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="driverName"
              label="司机"
              show-overflow-tooltip
              width="90"
          ></el-table-column>
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">
              <div>{{ xiaolanStatusDict[scope.row.type] }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="date"
              label="调度日期"
              show-overflow-tooltip
              width="100"
          ></el-table-column>
          <el-table-column
              width=""
              prop="homeNameList"
              label="产废单位"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="warehouseName"
              label="中转仓"
              show-overflow-tooltip
              width="240"
          >
          </el-table-column>
          <el-table-column
              prop="transforWeight"
              label="预估重量(kg)"
              width="110"
          ></el-table-column>
          <el-table-column
              prop="totalApplyCodeNumber"
              label="预估包数(包)"
              width="110"
          ></el-table-column>
          <el-table-column prop="status" label="转运状态" width="90">
            <template slot-scope="scope">
              <div>{{ transportStatusDict[scope.row.status] }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                  v-if="MenuBtnValid('/dispatchSheet','查看')"
                  type="text"
                  size="small"
                  @click="handleLookData(scope.row)"
              >查看
              </el-button>
              <el-button
                  v-if="MenuBtnValid('/dispatchSheet','修改')"
                  type="text"
                  size="small"
                  @click="handleUpdateData(scope.row)"
                  :disabled="scope.row.status == 3||scope.row.status == 4||scope.row.status == 5"
              >修改
              </el-button>
              <el-button
                  v-if="MenuBtnValid('/dispatchSheet','删除')"
                  type="text"
                  size="small"
                  @click="handleDelete(scope.row)"
                  :disabled="scope.row.status !== 1"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page">
        <div class="data_total">共{{ total }}项数据</div>
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

    <DispatchSheetDetail
        ref="DispatchSheetDetail"
        :dialogVisible="dialogVisible"
        :editeStatus="editeStatus"
        :updateId="updateId"
        @close="handleClose"
        @change-edit-status="handleChangeStatus"
    ></DispatchSheetDetail>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import DispatchSheetDetail from "./DispatchSheetDetail.vue";
import {transportDispatchStatusOptions} from "@/utils/enum";
import {getFormatTime} from "@/utils/methods";

export default {
  name: "dispatchSheet",
  components: {Breadcrumb, DispatchSheetDetail},
  data() {
    return {
      tabelHeigth: 420, // 表格初始化高度
      breadData: [{name: "运输管理", path: ""}, {name: "调度管理"}],

      // 搜索条件
      searchValue: {
        homeIslandType: "",
        status: "",
        date: "",
        homeNames: "",
        transportUserName: "",
        warehouseNos: [], //中转仓
      },
      transportDispatchStatusOptions,

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      transportStatusDict: {},
      xiaolanStatusDict: {},

      // 弹框
      dialogVisible: false,
      editeStatus: 1, //1: 新增  2：修改  3: 查看
      updateId: "", //查看、修改的订单id
      loading: false,
      storageDeviceOption: [], //中转仓

      statusOptions: [],

    };
  },

  computed: {},
  created() {
    this.getDictionary()
    this.getStatusDict();
    this.getStorageDevice();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      this.tabelHeigth =
          document.querySelector("#DispatchSheet").offsetHeight -
          257 -
          searchHeight;
    });
    window.onresize = () => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      let contentDom = document.querySelector("#DispatchSheet");
      let contentHeight = contentDom ? contentDom.offsetHeight || 0 : 0;
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 257 - searchHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {
    };
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
                }
              })
              for (let item of this.statusOptions) {
                this.$set(this.xiaolanStatusDict, item.value, item.label);
              }
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(error => {
            this.$message.error(error.msg)
          })
    },
    getTableData() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      for (let key of Object.keys(this.searchValue)) {
        let value = this.searchValue[key];
        if (key === "date") {
          if (value && value.length) {
            params.startTime = `${value[0]} 00:00:00`;
            params.endTime = `${value[1]} 23:59:59`;
          }
        } else if (Array.isArray(value)) {
          if (value.length) {
            params[key] = value;
          }
        } else if (value || (!value && value === 0)) {
          params[key] = value;
        }
      }
      this.$http(this.GLOBALApi.getTransportDispatch(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;
              this.total = res.data.total || 0;
              let records = res.data.records || [];
              this.tableData = [];
              records.map((item, index) => {
                this.tableData.push({
                  index: index + 1,
                  orderNo: item.orderNo,
                  serialNo: item.serialNo,
                  vehicleNumber: item.transportVehicleName,
                  driverName: item.transportUserName,
                  type: item.homeIslandType, //海洋
                  date: getFormatTime(item.createTime, "dateDay"),
                  homeNameList: item.homeNameList,
                  transforWeight: item.estimateWeight,
                  totalApplyCodeNumber: item.totalApplyCodeNumber,
                  status: item.status,
                  warehouseName: item.warehouseName,
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
    getStatusDict() {
      for (let item of this.transportDispatchStatusOptions) {
        this.$set(this.transportStatusDict, item.value, item.label);
      }
    },

    deleteData(orderNo) {
      this.$http(this.GLOBALApi.deleteTransportDispatch(), {
        no: orderNo
      })
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.$message.success("删除成功");
              this.pageNum = 1;
              this.$nextTick(() => {
                this.getTableData();
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 分页
    handleSizeChange(value) {
      this.pageSize = value;
      console.log(value);
      this.getTableData();

    },
    handleCurrentChange(value) {
      this.pageNum = value;
      console.log(value);
      this.getTableData();
    },

    // 删除
    handleDelete(value) {
      this.$confirm("确认删除？")
          .then(() => {
            this.deleteData(value.orderNo);
          })
          .catch(() => {
          });
    },

    // 搜索
    handleSearch() {
      console.log(this.searchValue);
      this.pageNum = 1;
      this.getTableData();
    },

    // 弹框
    handleOpenDialog() {
      this.dialogVisible = true;
      this.editeStatus = 1;
    },
    // 修改
    handleUpdateData(value) {
      this.dialogVisible = true;
      this.editeStatus = 2;
      this.updateId = value.orderNo;
    },
    // 详情
    handleLookData(value) {
      this.dialogVisible = true;
      this.editeStatus = 3;
      this.updateId = value.orderNo;
    },
    handleChangeStatus(value) {
      this.editeStatus = null;
      this.$nextTick(() => {
        this.editeStatus = value;
        let component = this.$refs.DispatchSheetDetail;
        component.getDetailData();
      });
    },
    // judgeLoding() {
    //   if (!this.vihicle_api && !this.component.vihicleLoadingInstance) {
    //     this.component.vihicleLoadingInstance = Loading.service({
    //       target: "#vihicle_loading",
    //       fullscreen: false,
    //       spinner: "el-icon-loading",
    //     });
    //   }
    //   if (!this.driver_api && !this.component.driverLoadingInstance) {
    //     this.component.driverLoadingInstance = Loading.service({
    //       target: "#driver_loading",
    //       fullscreen: false,
    //       spinner: "el-icon-loading",
    //     });
    //   }
    // },
    handleClose(value) {
      console.log("handleClose");
      this.dialogVisible = false;
      let component = this.$refs.DispatchSheetDetail;
      component.$refs.selectTable.clearSelection();
      component.$refs.addValue.resetFields();
      component.selectData = [];
      component.tableData = [];
      this.editeStatus = null;
      if (value) {
        this.pageNum = 1;
        this.getTableData();
      }
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    },

    // 获取中转仓下拉列表
    getStorageDevice() {
      this.storageDeviceOption = [];
      this.searchValue.warehouseNos = [];
      this.$http(this.GLOBALApi.getStorageDevice())
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              records.map((item, index) => {
                let temp = {
                  label: item.name,
                  value: item.companyNo,
                };
                this.storageDeviceOption.push(temp);
                // if (item.bindFlag) {
                this.searchValue.warehouseNos.push(item.companyNo);
                // }
              });
              this.pageNum = 1;
              this.getTableData();
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
.dispatch_sheet_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.content {
  margin-top: 16px;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.1);
  padding: 32px 24px 32px 32px;
  background-color: #fff;
}

// 搜索
.search {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.fixed_width {
  /deep/ .el-select.el-select--small {
    width: 348px !important;

    .el-input.el-input--small.el-input--suffix {
      width: 348px !important;
    }
  }
}

/deep/ .el-input.el-input--small.el-input--suffix {
  width: 320px;
}


.search_bt {
  min-width: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;

  & > div {
    margin-left: 10px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
  }
}

.button_white {
  color: #0052d9;
  border: solid 1px #0052d9;
}

.button_white:hover {
  background-color: #ecf5ff;
  cursor: pointer;
}

.button_blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

.button_blue:hover {
  background-color: #66b1ff;
  border: solid 1px #66b1ff;
  cursor: pointer;
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

// 表格
.table {
  margin-bottom: 40px;
}

/deep/ .el-pagination.is-background {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
}

.data_total {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
</style>
