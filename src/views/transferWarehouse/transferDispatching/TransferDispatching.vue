<!--中转仓-中转仓调度单管理-->
<template>
  <div class="transfer_dispatching_page" id="TransferDispatching">
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
                    v-for="item in transportStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="类型">
              <el-select
                  v-model="searchValue.blockType"
                  placeholder="请选择"
                  clearable
                  @change="handleSearch"
              >
                <el-option
                    v-for="item in seaPlasticType"
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
                  v-model="searchValue.fromHomeNames"
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
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
          <div class="button_blue" @click="handleOpenDialog" v-if="MenuBtnValid('/transferDispatching','新增')">新增</div>
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
          <el-table-column
              type="index"
              :index="getIndex"
              label="序号"
              width="50"
          ></el-table-column>
          <el-table-column
              prop="serialNo"
              label="调度单号"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="warehouseName"
              label="中转仓"
              show-overflow-tooltip
              width="180"
          >
          </el-table-column>
          <el-table-column
              prop="transportCompanyName"
              label="运输公司"
              show-overflow-tooltip
              width="150"
          >
          </el-table-column>
          <el-table-column
              prop="transportVehicle"
              label="车牌号"
              show-overflow-tooltip
              width="100"
          >
          </el-table-column>
          <el-table-column
              prop="transportUserName"
              label="司机"
              width="120"
          ></el-table-column>
          <el-table-column
              prop="createTime"
              label="调度日期"
              show-overflow-tooltip
              width="100"
          ></el-table-column>
          <el-table-column
              prop="fromHomeNames"
              label="产废单位"
              show-overflow-tooltip
              width="130"
          >
          </el-table-column>
          <el-table-column
              prop="destinationCompanyName"
              label="接收单位"
              show-overflow-tooltip
              width="130"
          >
          </el-table-column>
          <el-table-column label="类型" width="130">
            <template slot-scope="scope">
              <div>{{ seaPlasticTypeDict[scope.row.blockType] }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="actualWeight"
              label="转运量(kg)"
              width="100"
          ></el-table-column>
          <el-table-column
              prop="outTotalNumber"
              label="包数(包)"
          ></el-table-column>
          <el-table-column prop="status" label="转运状态">
            <template slot-scope="scope">
              <div>{{ transportStatusDict[scope.row.status] }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" fixed="right" width="120">
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="handleLookData(scope.row)"
                  v-if="MenuBtnValid('/transferDispatching','查看')"
              >查看
              </el-button>
              <el-button
                v-if="MenuBtnValid('/transferDispatching','修改')"
                type="text"
                size="small"
                @click="handleUpdateData(scope.row)"
                :disabled="scope.row.status !== 1"
                
                >修改
              </el-button>
              <el-button
              v-if="MenuBtnValid('/transferDispatching','删除')"
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

    <TransferDispatchingDetail
        ref="TransferDispatching"
        :dialogVisible="dialogVisible"
        :editeStatus="editeStatus"
        :updateId="updateId"
        @close="handleClose"
        @change-edit-status="handleChangeStatus"
    ></TransferDispatchingDetail>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import TransferDispatchingDetail from "./TransferDispatchingDetail.vue";
import {statusOptions, transportStatusOptions} from "@/utils/enum.js";
import {getFormatTime} from "@/utils/methods.js";

export default {
  name: "dispatchSheet",
  components: {Breadcrumb, TransferDispatchingDetail},
  data() {
    return {
      tabelHeigth: 420, // 表格初始化高度
      breadData: [{name: "中转管理", path: ""}, {name: "调度管理"}],

      // 搜索条件
      searchValue: {
        blockType: "", //类型
        status: "", //转运状态
        date: [],  //调度日期
        fromHomeNames: "", //产废单位
        transportUserName: "", //司机
        warehouseNos: [], //中转仓
      },
      statusOptions,
      transportStatusOptions,
      seaPlasticType: [], //塑料块类型
      storageDeviceOption: [], //中转仓

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [],
      transportStatusDict: {},
      seaPlasticTypeDict: {},

      // 弹框
      dialogVisible: false,
      editeStatus: 1, //1: 新增  2：修改  3: 查看
      updateId: "", //查看、修改的订单id
    };
  },

  computed:{
  },
  created() {
    this.getTableData();
    this.getTransportStatusDict();
    this.getStorageDevice();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      this.tabelHeigth =
          document.querySelector("#TransferDispatching").offsetHeight -
          257 -
          searchHeight;
    });
    window.onresize = () => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      let contentDom = document.querySelector("#TransferDispatching");
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
    // 搜索
    handleSearch() {
      console.log(this.searchValue);
      this.pageNum = 1;
      this.getTableData();
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

      this.$http(this.GLOBALApi.getTransitDispatch(), params)
          .then((res) => {
            this.loading = false;
            if (res.code === 200 && res.data) {
              this.total = res.data.total;
              let records = res.data.records || [];
              // records.map((item, index) => {
              //   item.index = index + 1;
              //   item.date = getFormatTime(item.createTime, "dateDay");
              // });
              this.tableData = records;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.loading = false;
            this.$message.error(error.msg);
          });
    },
    getTransportStatusDict() {
      for (let item of this.transportStatusOptions) {
        this.$set(this.transportStatusDict, item.value, item.label);
      }

      // 请求塑料类型接口
      this.seaPlasticTypeDict = {};
      this.seaPlasticType = [];
      this.$http(this.GLOBALApi.getDictionaryListByCode(), {
        no: "plasticType",
      })
          .then((res) => {
            if (res.code === 200 && res.data) {
              for (let item of res.data) {
                // this.$nextTick(() => {
                  this.seaPlasticType.push({
                    label:item.categoryName,
                    value:item.categoryNo,
                  });
                // });
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

              this.page = 1;
              this.getTableData();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 删除
    handleDelete(value) {
      console.log(value);
      this.$confirm("确认删除？")
          .then(() => {
            this.deleteData(value.orderNo);
          })
          .catch(() => {
          });
    },

    deleteData(no) {
      this.$http(this.GLOBALApi.deleteTransitDispatch(), {
        orderNo: no
      })
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.$message.success("删除成功");
              this.handleSearch();
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
      this.getTableData();
    },
    handleCurrentChange(value) {
      this.pageNum = value;
      this.getTableData();
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1;
      } else {
        return index + 1;
      }
    },

    // 弹框
    handleOpenDialog() {
      this.dialogVisible = true;
      this.editeStatus = 1;
    },
    handleUpdateData(value) {
      this.dialogVisible = true;
      this.editeStatus = 2;
      this.updateId = value.orderNo;
    },
    handleLookData(value) {
      this.dialogVisible = true;
      this.editeStatus = 3;
      this.updateId = value.orderNo;
    },

    handleChangeStatus(value) {
      // console.log("handleChangeStatus", value)
      this.editeStatus = null;
      this.$nextTick(() => {
        this.editeStatus = value;
        let component = this.$refs.TransferDispatching;
        component.selectData = {};
        component.tableData = []
        component.getDestinationCompanyData();
        component.getVihicleGpsData();
        component.getDriverGpsData();
        component.getStorageDevice();
        component.getTransportCompanyData();
        component.getDetailData();
      });
    },

    handleClose(value) {
      this.dialogVisible = false;
      let component = this.$refs.TransferDispatching;
      component.$refs.addValue.resetFields();
      component.tableData = [];
      this.editeStatus = null;
      if (value) {
        this.page = 1;
        this.getTableData();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.transfer_dispatching_page {
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
  margin-right: 24px;
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
  width: 320px;
}

/deep/ .el-date-editor--date {
  width: 240px !important;
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
