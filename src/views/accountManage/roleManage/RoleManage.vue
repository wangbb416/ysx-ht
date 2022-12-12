<!-- 角色管理 -->
<template>
  <div class="roleManage_page" id="roleManage_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="">
              <el-input
                  placeholder="请输入角色名"
                  v-model.trim="formData.name"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
                  clearable
                  @clear="searchFn"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="组织类型">
              <el-select clearable v-model="formData.organizationId" placeholder="请选择" filterable @change="searchFn">
                <el-option
                    v-for="item in organizationList"
                    :key="item.deptNo"
                    :label="item.name"
                    :value="item.deptNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select clearable v-model="formData.status" placeholder="请选择" filterable @change="searchFn">
                <el-option
                    v-for="item in statusList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
          <div class="button-blue" v-if="MenuBtnValid('/roleManage','新增')" @click="handleOpenDialog('add')">新增</div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :height="tabelHeigth" v-loading="loading"
                element-loading-text="加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" :index="getIndex" label="序号" width="100"></el-table-column>
        <el-table-column prop="deptName" label="组织类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleName" label="角色名称" show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="status" label="类型状态">
          <template slot-scope="scope">
            <div :style="{color:scope.row.status==0?'green':'red'}">{{ scope.row.status==0?'启用':scope.row.status==1?'禁用':'' }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{timeStampSwitch(scope.row.createTime, "", "yy/mm/dd")}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button v-if="MenuBtnValid('/roleManage','编辑')" @click="handleOpenDialog('edit',scope.row)" type="text" size="small"
            >编辑
            </el-button>
            <el-button v-if="scope.row.status ==0 && MenuBtnValid('/roleManage','启用/禁用')" @click="handleOperateDialog('disable',scope.row)" type="text"
                       size="small"
            >禁用
            </el-button>
            <el-button v-if="scope.row.status !=0 && MenuBtnValid('/roleManage','启用/禁用')" @click="handleOperateDialog('enable',scope.row)" type="text" size="small"
            >启用
            </el-button>
            <el-button v-if="MenuBtnValid('/roleManage','删除')" @click="handleOperateDialog('delate',scope.row)" type="text" size="small"
            >删除
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
    <!-- 新建 编辑-->
    <RoleManageDialog
        ref="roleManageDialog"
        :dialogVisible="dialogVisible"
        :editeStatus="editeStatus"
        :roleVal="roleVal"
        @close="handleClose"
        :deptList="organizationList"
    ></RoleManageDialog>
  </div>
</template>

<script>
import RoleManageDialog from "@/views/accountManage/roleManage/RoleManageDialog.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import {timeStampSwitch} from "@/utils/util.js";

export default {
  name: "userList",
  components: {RoleManageDialog, Breadcrumb,},
  data() {
    return {
      timeStampSwitch,
      tabelHeigth: 420,
      breadData: [{name: "账号管理", path: ""}, {name: "角色管理"}],
      formData: {
        name: null,
        organizationId: null,
        status: null,
      },
      tableData: [],//table列表
      statusList: [],//账号状态列表
      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,

      dialogVisible: false,//弹窗
      isEdit: false,//默认 不是编辑

      loading: false,
      organizationList: [],//组织列表
      editeStatus: 1,//1新增,2编辑
      roleVal: null,//点击编辑时传的角色数据
    };
  },
  computed:{

  },
  created() {
    this.getStatusList()
    this.getDeptList()
    this.pageNum = 1
    this.tableData = []
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector("#roleManage_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (document.querySelector("#roleManage_page") && document.querySelector("#roleManage_page").offsetHeight && document.querySelector("#search") && document.querySelector("#search").offsetHeight) {
        self.tabelHeigth = document.querySelector("#roleManage_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {
    };
  },
  methods: {
    searchFn() {
      this.pageNum = 1;
      this.tableData = []
      this.getTableData();
    },
    // 获取字典
    getStatusList() {
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ["common_status"],
      })
          .then((res) => {
            if (res.code === 200 && res.data) {
              let records = res.data || [];
              records.map((item, index) => {
                if (item.dictType === "common_status") {
                  for (let temp of item.dictList) {
                    this.statusList.push({
                      name: temp.dictValueDesc,
                      id: temp.dictValue ? Number(temp.dictValue) : "",
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
    // 组织列表
    getDeptList() {
      this.$http(this.GLOBALApi.getOrganizationData())
          .then((res) => {
            if (res.code === 200 && res.data) {
              let records = res.data || [];
              records.map((item, index) => {
                this.organizationList.push({
                  ...item
                });
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 获取table列表----------------
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: this.formData.name,//角色名
        deptNo: this.formData.organizationId,//组织编号
        status: this.formData.status,
      };
      this.tableData = []
      this.$http(this.GLOBALApi.getRolegetByPage(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;

              this.total = res.data.total || 0;
              let records = res.data.records || [];
              records.map((item, index) => {
                this.tableData.push({
                  ...item
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
    // 新建,修改
    handleOpenDialog(type, val) {
      // console.log(type);
      switch (type) {
        case 'add':
          this.editeStatus = 1
          this.isEdit = false
          this.dialogVisible = true;
          break;
        case 'edit':
          this.roleVal = val
          this.editeStatus = 2
          this.isEdit = true
          this.dialogVisible = true;
          break;
      
        default:
          break;
      }
    },
    handleOperateDialog(value, item) {
      let url = null
      let operateSuccess = ''
      let params = {
        no: item.roleNo,
      };
      switch (value) {
        case 'disable':
          url = this.GLOBALApi.roleDisable()
          operateSuccess = "禁用成功"
          this.$confirm("确认禁用此角色吗?", "禁用确认")
              .then(() => {
                this.dealBtn(url, params, operateSuccess);
              })
              .catch((error) => {
                console.log(error);
              });
          break;
        case 'enable':
          url = this.GLOBALApi.roleEnable()
          operateSuccess = "启用成功"
          this.dealBtn(url, params, operateSuccess);
          break;
        case 'delate':
          url = this.GLOBALApi.roleDelete()
          operateSuccess = "删除成功"
          this.$confirm("确认删除此角色吗?", "删除确认")
              .then(() => {
                this.dealBtn(url, params, operateSuccess);
              })
              .catch((error) => {
                console.log(error);
              });
          break;

        default:
          break;
      }


    },
    // 删除/禁用
    dealBtn(url, params, operateSuccess) {
      this.$http(url, params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.$message.success(operateSuccess);
              this.getTableData();
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
      this.tableData = []
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.tableData = []
      this.getTableData();
    },

    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
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
  }
};
</script>

<style lang="less" scoped>
.roleManage_page {
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


// 搜索部分
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


/deep/ .el-input.el-input--small.el-input--suffix {
  width: 320px !important;
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


// 弹窗
.source_dialog_box {
  .first_title {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 22px;
  }
}

// 时间线
.time_axis_box {
  margin-bottom: 5px;

  .time_axis_ul {
    display: flex;
    margin-top: 33px;

    .time_axis_li {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.9);
      position: relative;

      .title {
        display: flex;
        align-items: center;

        .title_val {
          margin: 0 12px;
        }

        .line {
          width: 110px;
          height: 2px;
          background: #0052D9;
          border-radius: 0px 0px 0px 0px;
          margin-right: 5px;
        }
      }

      .time {
        margin-left: 36px;
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

}


// 视频列表
.box {
  margin-top: 21px;

  .content {
    margin-top: 16px;

    .name {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #303133;
    }

    .list_ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .list_li {
      margin-top: 8px;
      margin-right: 80px;

      .li {
        width: 136px;
        height: 136px;
        // background: #ECF2FE;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        background: url(~@/assets/img/home/videoBg.svg) center center no-repeat;
        cursor: pointer;
      }

      .li_name {
        width: 136px;
        margin-top: 8px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #303133;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

    }
  }

}

.button-blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

.button_blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  width: 70px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052D9;
}

/deep/ .dialog_content .el-input.el-input--small.el-input--suffix {
  width: 250px;
}

.example {
  color: rgb(160, 155, 155);
}

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}

</style>
