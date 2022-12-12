<!-- GPS管理 -->
<template>
  <div class="gpsManage_page" id="gpsManage_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="">
              <el-input
                  placeholder="请输入设备序列号"
                  v-model.trim="formData.search"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
                  clearable
                  @clear = "searchFn"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="设备型号">
              <el-select clearable v-model="formData.deviceModel" placeholder="请选择" filterable @change="searchFn">
                <el-option
                    v-for="item in deviceModelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
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
          <div class="button-blue" @click="handleOpenDialog('add')" v-if="MenuBtnValid('/gpsManage','新增')">新增</div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :height="tabelHeigth" v-loading="loading"
                element-loading-text="加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" :index="getIndex" label="序号" width="100"></el-table-column>
        <el-table-column prop="name" label="设备名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="serialNumber" label="设备序列号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deviceModelStr" label="设备型号"></el-table-column>
       
        <el-table-column prop="lastConnectTime" label="最近连接时间"></el-table-column>
        <el-table-column prop="lastUser" label="最近使用用户"></el-table-column>
        <el-table-column prop="statusMsg" label="状态">
          <template slot-scope="scope">
            <div :style="{color:scope.row.status==0?'green':'red'}">{{scope.row.statusMsg}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleOpenDialog('edit',scope.row)" type="text" size="small"
            v-if="MenuBtnValid('/gpsManage','编辑')"
            >编辑
            </el-button>
            <el-button v-if="scope.row.status ==0 && MenuBtnValid('/gpsManage','启用/禁用')" @click="handleOperateDialog('disable',scope.row)" type="text" size="small"
            >禁用
            </el-button>
            <el-button v-if="scope.row.status !=0 && MenuBtnValid('/gpsManage','启用/禁用')" @click="handleOperateDialog('enable',scope.row)" type="text" size="small"
            >启用
            </el-button>
            <el-button @click="handleOperateDialog('delate',scope.row)" type="text" size="small"
            v-if="MenuBtnValid('/gpsManage','删除')"
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
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :modal-append-to-body="true"
        :append-to-body="true"
        width="500px"
        @close="closeDialogVisible"
        :close-on-click-modal="false"
        top="20vh"
    >
      <div class="dialog_content">
        <el-form
            :model="addData"
            :rules="addValueRules"
            label-width="120px"
            size="small"
            ref="addData"
        >
          <el-form-item label="设备名称" prop="name">
            <el-input :disabled="!isEdit && addData.id != null" placeholder="请输入设备名称" v-model.trim="addData.name"
                      onkeyup="this.value=this.value.replace(/[, ]/g,'')" clearable :maxlength="20">
            </el-input>
          </el-form-item>
          <el-form-item label="设备型号" prop="deviceModel">
            <el-select clearable v-model="addData.deviceModel" :disabled="!isEdit && addData.id != null" placeholder="请选择设备型号">
                <el-option
                    v-for="item in deviceModelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="设备序列号" prop="serialNumber">
            <el-input :disabled="!isEdit && addData.id != null" placeholder="请输入设备序列号" v-model.trim="addData.serialNumber"
                      onkeyup="this.value=this.value.replace(/[, ]/g,'')" clearable :maxlength="20">
            </el-input>
          </el-form-item>

          
        </el-form>
      </div>
      <span slot="footer" v-if="isEdit || addData.id == null">
        <div class="search-bt">
          <div class="button-blue" @click="handleSubmit">提交</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "gpsManage",
  data() {
    return {
      tabelHeigth: 420,
      breadData: [{name: "装备管理", path: ""}, {name: "GPS设备管理"}],
      formData: {
        search: null,
        deviceModel: null,
        status: null,
      },
      tableData: [],
      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 新建
      dialogVisible: false,
      isEdit: false,
      addData: {
        id: null,
        serialNumber: "",
        deviceModel: "",
        name: "",
      },
      addValueRules: {
        name: [{required: true, message: "请填写设备名称", trigger: "blur"}],
        serialNumber: [{required: true, message: "请填写设备序列号", trigger: "blur"}],
        deviceModel: [{required: true, message: "请选择设备型号", trigger: "blur"}],
      },

      loading: false,
      deviceModelList:[
        // {name:"型号A",id:1},
        // {name:"型号B",id:2},
      ],
      statusList:[
        // {id:1,name:"开启"},
        // {id:2,name:"禁用"},
      ]

    };
  },
  components: {Breadcrumb},
  created() {
    this.getStatusList()
    this.getDeviceList()
    this.pageNum = 1
    this.tableData = []
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector("#gpsManage_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (document.querySelector("#gpsManage_page") && document.querySelector("#gpsManage_page").offsetHeight && document.querySelector("#search") && document.querySelector("#search").offsetHeight) {
        self.tabelHeigth = document.querySelector("#gpsManage_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {
    };
  },
  activated() {
  },
  methods: {
    searchFn() {
      this.pageNum = 1;
      this.tableData = []
      this.getTableData();
    },
    // 获取状态字典
    getStatusList(){
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
    // 获取设备型号字典
    getDeviceList(){
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ["device_type"],
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];
            records.map((item, index) => {
              if (item.dictType === "device_type") {
                for (let temp of item.dictList) {
                  this.deviceModelList.push({
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

    // 获取table列表
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        deviceCode: this.formData.search,
        deviceModel: this.formData.deviceModel,
        status: this.formData.status,
      };
      this.tableData = []
      this.$http(this.GLOBALApi.obdGetByPage(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;

              this.total = res.data.total || 0;
              let records = res.data.records || [];
              records.map((item, index) => {
                this.tableData.push({
                  name: item.name,
                  serialNumber: item.deviceCode,
                  deviceModel: item.deviceModel,
                  deviceModelStr: item.deviceModelStr,
                  lastConnectTime: item.lastConnectTime,
                  status: item.status,
                  statusMsg: item.statusMsg,
                  id: item.deviceNo,
                  lastUser: item.lastUser,
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

    // 关闭弹窗
    closeDialogVisible() {
      this.$nextTick(() => {
        this.addData.id = null
        this.addData.name = "",
        this.addData.serialNumber = "",
        this.addData.deviceModel = ""
      })
      this.$refs.addData.resetFields();
    },
    // 新建,修改
    handleOpenDialog(type, val) {
      // console.log(type);
      if (type == 'add') {
        this.isEdit = false
        this.dialogVisible = true;
      } else if (type == 'edit') {
        this.isEdit = true
        this.getDetail(val)
      }
    },
        // 查看详情
    getDetail(item) {
      this.$http(this.GLOBALApi.obdDetail(),{no:item.deviceNo})
          .then((res) => {
            if (res.code === 200 && res.data) {
              let data = res.data
              this.$nextTick(() => {
                this.addData.id = data.deviceNo
                this.addData.serialNumber = data.deviceCode,
                this.addData.name = data.name,
                this.addData.deviceModel = data.deviceModel,
                this.dialogVisible = true;
              })
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    handleOperateDialog(value,item) {
      let url = null
      let operateSuccess = ''
      let params = {
        no: item.deviceNo,
      };
      switch (value) {
        case 'disable':
          url = this.GLOBALApi.obdDisable()
          operateSuccess = "禁用成功"
          this.$confirm("确认禁用此设备吗?","禁用确认")
          .then(() => {
            this.dealBtn(url,params,operateSuccess);
          })
          .catch((error) => {
            console.log(error);
          });
          break;
        case 'enable':
          url = this.GLOBALApi.obdEnable()
          operateSuccess = "启用成功"
          this.dealBtn(url,params,operateSuccess);
          break;
        case 'delate':
          url = this.GLOBALApi.obdDelete()
          operateSuccess = "删除成功"
          this.$confirm("确认删除此设备吗?","删除确认")
          .then(() => {
            this.dealBtn(url,params,operateSuccess);
          })
          .catch((error) => {
            console.log(error);
          });
          break;
      
        default:
          break;
      }

      
    },
    // 删除/禁用/启用
    dealBtn(url,params,operateSuccess) {
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
    
    // 数据提交
    handleSubmit() {
      this.$refs.addData.validate((valid) => {
        if (valid) {
          
          if (this.isEdit) {
            this.$confirm("确认修改此设备吗?","修改确认")
            .then(()=>{
              let data = {
                deviceNo :this.addData.id,
                deviceCode: this.addData.serialNumber,
                name: this.addData.name,
                deviceModel: this.addData.deviceModel,
            };
              this.$http(this.GLOBALApi.obdEdit(), data)
              .then((res) => {
                if (res.code === 200 && res.data) {
                  this.$message.success("修改成功");
                  this.dialogVisible = false;
                  this.getTableData();
                } else {
                  this.$message.error(res.msg);
                }

              })
              .catch((error) => {
                this.$message.error(error.msg);
                // this.dialogVisible = false;
                // this.getTableData();
              });
            })
          } else {
            this.addDataFun()
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增提交
    addDataFun() {
      // console.log(this.addData,"this.addData");
      let params = {
        name:this.addData.name,
        deviceCode:this.addData.serialNumber,
        deviceModel:this.addData.deviceModel,
      };
      this.$http(this.GLOBALApi.obdAdd(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$message.success("新增成功");
            this.dialogVisible = false;
            this.getTableData();

          } else {
            this.$message.error(res.msg);
          }

        })
        .catch((error) => {
          this.$message.error(error.msg);
          // this.dialogVisible = false;
          // this.getTableData();
        });
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    },
  },
  computed: {
    title() {
      if (this.isEdit) {
        return '编辑'
      } else if (this.addData.id != null) {
        return '查看'
      } else {
        return '新增'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.gpsManage_page {
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
