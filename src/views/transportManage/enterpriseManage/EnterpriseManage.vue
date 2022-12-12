<!--运输管理-运输公司管理-->
<template>
  <div class="enterprise_page" id="EnterpriseManage">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="content">
      <div class="search">
        <div class="search_input">
          <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="">
              <el-input
                placeholder="请输入运输公司名称查找"
                v-model="searchValue.name"
                @keyup.enter.native="handleSearch"
                clearable
                @clear="handleSearch"
              >
                <!--<div slot="suffix" class="el-input-slot__icon">-->
                <!--<img src="@/assets/img/home/search.png" alt=""/>-->
                <!--</div>-->
              </el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select
                clearable
                v-model="searchValue.status"
                placeholder="请选择"
                @change="handleSearch"
              >
                <el-option
                  v-for="item in offOptions"
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
          <div class="button_blue" @click="handleAddData()" v-if="MenuBtnValid('/enterpriseManage','新增')">新增</div>
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
            width="100"
          ></el-table-column>

          <el-table-column
            prop="name"
            label="运输公司名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="linkPersonName" label="负责人">
          </el-table-column>
          <el-table-column prop="linkPersonPhone" label="联系方式">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <div
                :class="[
                  scope.row.statusMsg === '启用'
                    ? 'green'
                    : scope.row.statusMsg === '禁用'
                    ? 'red'
                    : '',
                ]"
              >
                {{ scope.row.statusMsg }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="MenuBtnValid('/enterpriseManage','编辑')"
                type="text"
                size="small"
                @click="handleUpdateData(scope.row)"
                >编辑
              </el-button>
              <el-button
                @click="handleOffStatus(scope.row)"
                type="text"
                size="small"
                class="blue"
                v-if="MenuBtnValid('/enterpriseManage','启用/禁用')"
              >
                {{
                  scope.row.statusMsg === "启用"
                    ? "禁用"
                    : scope.row.statusMsg === "禁用"
                    ? "启用"
                    : ""
                }}
              </el-button>
              <el-button
                v-if="MenuBtnValid('/enterpriseManage','删除')"
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pageNum">
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

    <el-dialog
      :title="editeStatus === 1 ? '新增' : '修改'"
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
          <el-form-item prop="name">
            <span slot="label"><span style="color: red">* </span>运输公司</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.name"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="linkPersonName">
            <span slot="label"><span style="color: red">* </span>负责人</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.linkPersonName"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="linkPersonPhone">
            <span slot="label"><span style="color: red">* </span>联系方式</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.linkPersonPhone"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="address">
            <span slot="label"><span style="color: red">* </span>地址</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.address"
              clearable
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <div class="button_blue" @click="handleSubmit">提交</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { checkString } from "@/utils/util.js";

export default {
  name: "enterpriseManage",
  components: { Breadcrumb },
  data() {
    return {
      tabelHeigth: 420, // 表格初始化高度
      breadData: [{ name: "运输管理", path: "" }, { name: "公司管理" }],

      // 公共方法

      // 搜索条件
      searchValue: {
        name: "",
        status: "",
      },
      offOptions: [],

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      // 弹框
      dialogVisible: false,
      apiLoading: false,
      editeStatus: 1, //1: 新增  2：修改
      id: "",
      addValue: {
        name: "", //运输公司
        linkPersonName: "", //负责人
        linkPersonPhone: "", //联系方式
        address: "", //地址
        companyNo:""
      },
      addValueRules: {
        name: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                "请填写运输公司"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
        linkPersonName: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                "请填写负责人"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
        linkPersonPhone: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                "请填写联系方式"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
        address: [
          {
            validator: (rule, value, callback) => {
              checkString(rule, value, callback, null, null, 50, "请填写地址");
            },
            trigger: ["blur", "change"],
          },
        ],
      },
      loading: false,
    };
  },

  computed:{
    
  },
  created() {
    this.getTableData();
    this.getOffOptions();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      this.tabelHeigth =
        document.querySelector("#EnterpriseManage").offsetHeight -
        257 -
        searchHeight;
    });
    window.onresize = () => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      let contentDom = document.querySelector("#EnterpriseManage");
      let contentHeight = contentDom ? contentDom.offsetHeight || 0 : 0;
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 257 - searchHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
  },
  methods: {
    // 搜索
    handleSearch() {
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
        if (
          this.searchValue[key] ||
          (!this.searchValue[key] && this.searchValue[key] === 0)
        ) {
          params[key] = this.searchValue[key];
        }
      }

      this.tableData = [];
      this.$http(this.GLOBALApi.getTransportGetByPage(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;
            this.tableData = res.data.records;
            this.total = res.data.total;

            // TODO
            let records = res.data.records || [];
            records.map((item, index) => {
              item.index = index + 1;
              // item.statusMsg = "启用";
              // item.statusMsg = "禁用";
            });

            this.tableData = records;
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
    // 获取字典
    getOffOptions() {
      this.offOptions = [];
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ["common_status"],
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];
            records.map((item, index) => {
              if (item.dictType === "common_status") {
                console.log(item);
                for (let temp of item.dictList) {
                  this.offOptions.push({
                    label: temp.dictValueDesc,
                    value: temp.dictValue ? Number(temp.dictValue) : "",
                  });
                }
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    deleteData(value) {
      this.$http(this.GLOBALApi.deleteTransferCompany(), { no: value })
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$message.success("删除成功");
            this.page = 1
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    addData() {
      if (this.apiLoading) {
        return;
      }
      this.apiLoading = true;

      this.$http(this.GLOBALApi.addTransferCompany(), this.addValue)
        .then((res) => {
          this.apiLoading = false;
          if (res.code === 200 && res.data) {
            this.dialogVisible = false;
            this.$message.success("新增成功");
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.apiLoading = false;
          this.$message.error(error.msg);
        });
    },

    updateDate() {
      if (this.apiLoading) {
        return;
      }
      this.apiLoading = true;

      this.addValue.companyNo = this.id;
      this.$http(this.GLOBALApi.updateTransferCompany(), this.addValue)
        .then((res) => {
          this.apiLoading = false;
          if (res.code === 200 && res.data) {
            this.dialogVisible = false;
            this.$message.success("修改成功");
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.apiLoading = false;
          this.$message.error(error.msg);
        });
    },

    // 获取详情
    getDetailData() {
      this.$http(this.GLOBALApi.getTransferCompanyDetail(), { no: this.id })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let record = res.data || {};
            this.addValue = {
              name: record.name, //运输公司
              linkPersonName: record.linkPersonName, //负责人
              linkPersonPhone: record.linkPersonPhone, //联系方式
              address: record.address, //地址
            };
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.apiLoading = false;
          this.$message.error(error.msg);
        });
    },

    // 禁用
    disableStatus(value) {
      this.$http(this.GLOBALApi.disableTransferCompany(), {
        no: value,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    // 启用
    openStatus(value) {
      this.$http(this.GLOBALApi.openTransferCompany(), {
        no: value,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.getTableData();
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

    // 弹框
    handleAddData() {
      this.dialogVisible = true;
      this.editeStatus = 1;
      this.$nextTick(() => {
        this.$refs.addValue.resetFields();
      });
    },
    handleUpdateData(value) {
      this.dialogVisible = true;
      this.editeStatus = 2;
      this.id = value.companyNo;
      this.getDetailData();
      this.$nextTick(() => {
        this.$refs.addValue.resetFields();
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },

    handleDelete(value) {
      console.log(value);
      this.$confirm("确认删除此运输公司吗？", "删除确认")
        .then(() => {
          this.deleteData(value.companyNo);
        })
        .catch(() => {});
    },
    handleOffStatus(value) {
      let msg =
        value.statusMsg === "启用"
          ? "禁用"
          : value.statusMsg === "禁用"
          ? "启用"
          : "";
      if (msg === "禁用") {
        this.$confirm(`确认${msg}此运输公司吗？`, `${msg}确认`)
          .then((_) => {
            this.disableStatus(value.companyNo);
          })
          .catch((error) => {});
      } else {
        this.openStatus(value.companyNo);
      }
    },
    handleSubmit() {
      this.$refs.addValue.validate((valid) => {
        if (valid) {
          console.log("addValue: ", this.addValue);
          if (this.editeStatus === 2) {
            this.$confirm("确认修改此运输公司吗？", "修改确认")
              .then(() => {
                this.updateDate();
              })
              .catch(() => {});
          } else {
            this.addData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1;
      } else {
        return index + 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.enterprise_page {
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

  /deep/ .el-input.el-input--small.el-input--suffix {
    width: 320px;
  }
}

.search_bt {
  min-width: 200px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > div {
    margin-left: 10px;
  }
}

.button_white {
  color: #0052d9;
  border: solid 1px #0052d9;
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}

.button_white:hover {
  background-color: #ecf5ff;
  cursor: pointer;
}

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

.green {
  color: green;
}

.red {
  color: red;
}

// 弹窗
.dialog_content {
  color: #303133;
  font-size: 14px;

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
}

/deep/ .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-form-item__content {
  position: relative;
}

#loading_api {
  position: absolute;
  right: 0px;
}

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}
</style>
