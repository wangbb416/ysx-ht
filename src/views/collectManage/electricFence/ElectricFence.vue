<!-- 电子围栏 -->
<template>
  <div class="electricFence_page" id="electricFence_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="">
              <el-input
                  placeholder="请输入小蓝之家名称查找"
                  v-model.trim="formData.homeName"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
                  clearable
                  @clear = "searchFn"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input
                  placeholder="请输入小蚂蚁姓名查找"
                  v-model.trim="formData.antName"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
                  clearable
                  @clear = "searchFn"
              >
              </el-input>
            </el-form-item>
            
            <el-form-item label="存在待处理预警">
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
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" :height="tabelHeigth" v-loading="loading"
                element-loading-text="加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" :index="getIndex" label="序号" width="100"></el-table-column>
        <el-table-column prop="clientName" label="小蚂蚁" show-overflow-tooltip></el-table-column>
        <el-table-column prop="companyName" label="小蓝之家" show-overflow-tooltip></el-table-column>
        <el-table-column prop="clientNo" label="代号"></el-table-column>
        <el-table-column prop="linkPhone" label="手机号"></el-table-column>
       
        <el-table-column prop="demerit" label="记过次数"></el-table-column>
        <el-table-column prop="offline" label="定位设备离线次数"></el-table-column>
        <el-table-column prop="exceed" label="超出电子围栏预警合计次数"></el-table-column>
        <el-table-column prop="waitProcessed" label="待处理预警次数"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleOpenDialog(scope.row)" type="text" size="small" v-if="MenuBtnValid('/electricFence','查看')"
            >查看
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
    <!-- 查看-->
    <Dialog
        ref="dialogVisibleRef"
        :dialogVisibleShow="dialogVisible"
        @close="handleClose"
        :resData="sonData"
        @refresh="handleRefresh"
    >
    </Dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import Dialog from "@/views/collectManage/electricFence/ElectricFenceDialog.vue"
export default {
  name: "electricFence",
  data() {
    return {
      tabelHeigth: 420,
      breadData: [{name: "收集管理", path: ""}, {name: "电子围栏"}],
      formData: {
        homeName: null,
        antName: null,
        status: null,
      },
      tableData: [],
      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹窗
      dialogVisible: false,

      loading: false,
      deviceModelList:[
        // {name:"型号A",id:1},
        // {name:"型号B",id:2},
      ],
      statusList:[
        {id:1,name:"是"},
        {id:0,name:"否"},
      ],

      sonData:null


    };
  },
  components: {Breadcrumb,Dialog},
  created() {
    this.pageNum = 1
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector("#electricFence_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (document.querySelector("#electricFence_page") && document.querySelector("#electricFence_page").offsetHeight && document.querySelector("#search") && document.querySelector("#search").offsetHeight) {
        self.tabelHeigth = document.querySelector("#electricFence_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
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
    // 获取table列表
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyName: this.formData.homeName,
        clientName: this.formData.antName,
        waitProcessed: this.formData.status,
      };
      this.tableData = []
      this.$http(this.GLOBALApi.getClientDeviceAlarmPage(), params)
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
    //查看 详情
    handleOpenDialog(val) {
      this.sonData = JSON.parse(JSON.stringify(val));
      // console.log(this.sonData);
      this.dialogVisible = true; 
    },


    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNum = val
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
    //关闭
    handleClose() {
      this.dialogVisible = false;
    },
    handleRefresh(){
       this.getTableData();
    }
  }
};
</script>

<style lang="less" scoped>
.electricFence_page {
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
    width: 200px !important;
  }
}


/deep/ .el-input.el-input--small.el-input--suffix {
  width: 200px !important;
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
  cursor: pointer;
    margin-left: 10px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
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
