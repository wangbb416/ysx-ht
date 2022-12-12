<!-- 产品溯源 -->
<template>
  <div class="TraceSource_page" id="TraceSource_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="清运申请日期">
              <el-date-picker
                  v-model="formData.date"
                  type="daterange"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="searchFn"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="" style="margin-left:108px">
              <el-input
                  placeholder="请输入海塑码、海塑或粒子批次号查找"
                  v-model.trim="formData.search"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
                  clearable
                  @clear="searchFn"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="来源单位" style="margin-left:28px">
              <el-select
                  v-model="formData.sourceCompany"
                  placeholder="请选择来源单位"
                  clearable
                  filterable
                  @change="searchFn"
              >
                <el-option
                    v-for="item in blueHouseOptions"
                    :key="item.companyNo"
                    :label="item.name"
                    :value="item.companyNo"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接收单位" style="margin-left:28px">
              <el-select
                  v-model="formData.receiveCompany"
                  placeholder="请选择接收单位"
                  clearable
                  filterable
                  @change="searchFn"
              >
                <el-option
                    v-for="item in receiveCompanyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
      <el-table :data="tableData" style="width: 100%" :height="tabelHeigth" ref="table" v-loading="loading"
                :row-key="row => { return row.id }"
                element-loading-text="加载中" element-loading-spinner="el-icon-loading"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" :reserve-selection="true" width="60"></el-table-column>
        <el-table-column label="序号" type="index" :index="getIndex" width="80"></el-table-column>
        <el-table-column prop="serialNo" label="海塑码" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="originNo" label="海塑包装编号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="particleNumber" label="粒子批次号" width="170" show-overflow-tooltip></el-table-column>
        <el-table-column prop="blockTypeName" label="种类" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="blockWeight" label="海塑总量(kg)" show-overflow-tooltip width="110"></el-table-column>
        <el-table-column prop="homeName" label="收集点" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="destinationCompanyName" label="目标地" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="collectTime" label="清运申请日期" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="transferOutputTime" label="转运日期" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="source" label="过程管理" width="80">
          <template slot-scope="scope">
            <el-button @click="sourceClick(scope.row)" type="text" size="small" v-if="MenuBtnValid('/traceSource','过程查看')"
            >查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="联单" width="70">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="MenuBtnValid('/traceSource','联单查看')"
                       :disabled="(!scope.row.pdfUrlList) || (!scope.row.pdfUrlList.length>0)"
            >查看
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="page" style="position: relative;">
        <div class="check_out" @click="downLoad" v-fastClick v-if="MenuBtnValid('/traceSource','导出')">导出联单</div>
        <el-pagination
            style=" position: absolute;right: 0;"
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
    <!-- 联单pdf -->
    <PdfPreviewDialog
        ref="PdfPreviewDialog"
        :dialogVisible="pdfDialogVisible"
        @close="pdfHandleClose"
        :allData="pdfList"
    ></PdfPreviewDialog>

    <!--    &lt;!&ndash; 产品溯源 &ndash;&gt;-->
    <!--    <TraceSourceDialog-->
    <!--        ref="TraceSourceDialog"-->
    <!--        :dialogVisible="productTraceabilityDialog"-->
    <!--        @close="handleClose"-->
    <!--        :blockId="blockId"-->
    <!--    ></TraceSourceDialog>-->

    <!-- 产品溯源 -->
    <ProcessDialog
        ref="ProcessDialog"
        :dialogVisible="productTraceabilityDialog"
        @close="handleClose"
        :serialNo="serialNo"
    ></ProcessDialog>

  </div>
</template>

<script>
import PdfPreviewDialog from "./PdfPreviewDialog.vue"
import Breadcrumb from "@/components/Breadcrumb.vue";
// import TraceSourceDialog from "./TraceSourceDialog.vue"
import ProcessDialog from "./ProcessDialog.vue"
import {timeStampSwitch} from "@/utils/util.js";

export default {
  name: "traceSource",
  data() {
    return {
      tabelHeigth: 420,
      breadData: [{name: "联单溯源", path: ""}, {name: "产品溯源"}],
      blueHouseOptions: [],
      receiveCompanyOptions: [],
      formData: {
        search: null,
        date: null,
        receiveCompany: null,
        sourceCompany: null,
      },
      tableData: [],
      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 1,

      loading: false,

      multipleSelection: [], //勾选数据
      productTraceabilityDialog: false,//产品溯源弹窗
      pdfDialogVisible: false,//pdf弹窗
      pdfList: [],//pdf数据
      // blockId: null,//海塑块id
      serialNo: '',//塑料块编号

    };
  },
  components: {Breadcrumb, ProcessDialog, PdfPreviewDialog},
  created() {
    this.multipleSelection = []
    this.gethomeOptions();
    this.getDestinationCompanyData();
    this.pageNum = 1
    this.tableData = []
    this.getTableData();

  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector("#TraceSource_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (document.querySelector("#TraceSource_page") && document.querySelector("#TraceSource_page").offsetHeight && document.querySelector("#search") && document.querySelector("#search").offsetHeight) {
        self.tabelHeigth = document.querySelector("#TraceSource_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
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
      this.$refs.table.clearSelection()
      this.multipleSelection = []
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
        commonNumber: this.formData.search || '',
        homeNo: this.formData.sourceCompany || "",
        producerCompanyNo: this.formData.receiveCompany || "",
        collectTimeStart: this.formData.date && this.formData.date.length > 0 ? this.formData.date[0] + ' 00:00:00' : '',
        collectTimeEnd: this.formData.date && this.formData.date.length > 0 ? this.formData.date[1] + ' 23:59:59' : '',
      };
      this.tableData = [];
      this.$http(this.GLOBALApi.getPlasticBlockTraceSourcePageByParams(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;

              this.total = res.data.total || 0;
              let records = res.data.records || [];
              records.map((item, index) => {
                this.tableData.push({
                  ...item,
                  collectTime: item.collectTime
                      ? timeStampSwitch(item.collectTime, "", "yy/mm/dd")
                      : "",//海塑块id
                  transferOutputTime: item.transferOutputTime
                      ? timeStampSwitch(item.transferOutputTime, "", "yy/mm/dd")
                      : "",//转运日期
                });

              });
              //每个页数的第一次 ,默认全选,若第二次,就不存
              // if (this.pageRecord.indexOf(this.pageNum)>-1) {
              //   console.log("当前页数已存进过");
              // }else{
              //   records.map(item=>{
              //     this.$refs.table.toggleRowSelection(item, true)
              //   })
              //   this.pageRecord.push(this.pageNum)
              //   console.log("不存在");
              // }
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
    // 勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "勾选数据");
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1;
      } else {
        return index + 1;
      }
    },

    // 联单pdf
    handleClick(data) {
      // console.log(data,"----");
      if (data.pdfUrlList && data.pdfUrlList.length > 0) {
        this.pdfList = data
        this.pdfDialogVisible = true;
      } else {
        this.pdfList = []
        this.$message.warning("暂无联单数据")
      }

    },
    // 预览
    preview(data) {
      window.open(data.previewUrl, "_blank")
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

    // 产品溯源
    sourceClick(data) {
      this.serialNo = data.serialNo//塑料块编号
      this.productTraceabilityDialog = true;
    },
    // 产品溯源弹窗关闭
    handleClose(value) {
      console.log("handleClose");
      this.productTraceabilityDialog = false;
    },
    // pdf关闭
    pdfHandleClose() {
      this.pdfDialogVisible = false;
    },
    // 导出
    downLoad() {
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请勾选导出的数据")
        return
      }
      let idList = []
      this.multipleSelection.map(item => {
        idList.push(item.id)
      })
      console.log("id", idList);
      let params = {
        idList,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        commonNumber: this.formData.search || '',
        homeNo: this.formData.sourceCompany || "",
        producerCompanyNo: this.formData.receiveCompany || "",
        collectTimeStart: this.formData.date && this.formData.date.length > 0 ? this.formData.date[0] + ' 00:00:00' : '',
        collectTimeEnd: this.formData.date && this.formData.date.length > 0 ? this.formData.date[1] + ' 23:59:59' : '',
      };
      console.log(params);
      this.loading = true
      // 导出
      this.$http(this.GLOBALApi.traceSourceExport(), params, "downExcel")
          .then((res) => {
            if (res) {
              var datetime = new Date();
              var year = datetime.getFullYear();
              var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
              var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
              var hours = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
              var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
              var seconds = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
              var time = year + month + date + hours + minute + seconds
              var link = document.createElement("a"); //a标签下载
              if (navigator.userAgent.indexOf("Firefox") >= 0) {
                link.href = window.URL.createObjectURL(new Blob([res.data]));
                link.download = time + ".zip";
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
                link.href = window.URL.createObjectURL(new Blob([res.data]));
                link.download = time + ".zip";
                link.click();
                window.URL.revokeObjectURL(link.href);
                link.remove();
              }
              this.loading = false
              this.$refs.table.clearSelection()
            } else {
              this.$message.error(res.msg);
              this.loading = false
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 小蓝之家列表
    gethomeOptions() {
      let params = {
        // pageNum: 1,
        // pageSize: 999999,
      };
      this.$http(this.GLOBALApi.getXiaolanData(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.blueHouseOptions = res.data;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 所有处理厂
    getDestinationCompanyData() {
      this.$http(
          this.GLOBALApi.getAllDisposalEnterprise({
            // pageSize: 1,
            // pageNum: 9999999,
          })
      )
          .then((res) => {
            if (res.code === 200 && res.data) {
              let records = res.data || [];
              this.receiveCompanyOptions = [];
              records.map((item, index) => {
                let temp = {label: item.name, value: item.companyNo, ...item};
                this.receiveCompanyOptions.push(temp);
              });
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
.TraceSource_page {
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

.check_out {
  cursor: pointer;
  width: 75px;
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

// pdf弹窗
.row_bottom {
  margin-bottom: 28px;
  // display: flex;
  display: inline-block;
  width: 50%;

  .title {
    display: inline-block;
    width: 50px;
    margin-right: 34px;
    flex-shrink: 0;
  }

  .video_box {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .video_li {
    margin-bottom: 15px;
    cursor: pointer;
    margin-left: 20px;

    .li {
      width: 96px;
      height: 136px;
      background: url(~@/assets/img/home/pdfBg.png) center no-repeat;
      margin-right: 65px;
      border-radius: 4px 4px 4px 4px;
      cursor: pointer;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .li_name {
      width: 96px;
      margin-top: 8px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #303133;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
    }

    .li_btn {
      display: flex;
      width: 96px;
      justify-content: space-between;

      & > div {
        width: 40px;
        line-height: 28px;
        background: #ececed;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #dcdfe6;
        cursor: pointer;
        color: #000000;
        text-align: center;
      }
    }
  }


}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
}

.success_btn {
  width: 88px;
  height: 32px;
  background: #0052d9;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  color: #ffffff;
}

</style>
