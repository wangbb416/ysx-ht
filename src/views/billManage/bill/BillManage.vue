<!--联单管理-->
<template>
  <div class="bill_page" id="bill_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form
            :inline="true"
            size="small"
            label-width=""
            label-position="left"
          >
            <el-form-item label="来源单位">
              <el-select
                v-model="formData.sourceCompany"
                placeholder="请选择来源单位"
                clearable
                filterable
                @change="searchFn"
              >
                <el-option
                  v-for="item in blueHouseOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="运输单位">
              <el-select
                v-model="formData.trafficCompany"
                placeholder="请选择运输单位"
                clearable
                filterable
                @change="searchFn"
              >
                <el-option
                  v-for="item in trafficCompanyOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="接收单位">
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

            <el-form-item label="日期选择" class="fixed_width">
              <el-date-picker
                clearable
                v-model="formData.date"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="searchFn"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="联单编号">
              <el-input
                clearable
                v-model.trim="formData.number"
                onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                placeholder="请输入联单编号"
                @clear = "searchFn"
                @keyup.enter.native="searchFn"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="margin-bottom:20px"
        @selection-change="handleSelectionChange"
        :height="tabelHeigth"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="id" label="联单编号" width="210">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>

        <!-- <el-table-column
          prop="carNum"
          label="车牌号"
          width="150"
        ></el-table-column> -->
        <el-table-column
          prop="sourceCompany"
          label="来源单位"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>

        <!-- <el-table-column
          prop="trafficCompany"
          label="运输单位"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column> -->
        <el-table-column
          prop="receiveCompany"
          label="接收单位"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="kind" label="海塑种类" width="180">
          <template slot-scope="scope">
              <div>{{ seaPlasticTypeDict[scope.row.kind] }}</div>
            </template>
        </el-table-column>
        <el-table-column prop="weight" label="海塑重量（吨)" width="120">
        </el-table-column>
        <!-- <el-table-column label="电子版" width="">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="page">
        <!-- <div class="check_out" @click="downLoad" v-fastClick>导出联单</div> -->
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
    </div>
    <el-dialog
        title="查看"
        :visible.sync="centerDialogVisible"
        width="800px"
        :append-to-body="true"
    >
      <div class="row_bottom" style="width:100%;display: flex;">
        <div class="video_box" v-if="pdfList && pdfList.length>0">
          <div
              class="video_li"
              v-for="(item, index) in pdfList"
              :key="index"
              @click="preview(item)"
          >
            <div class="li"></div>
            <div class="li_name">{{ item.name }}</div>
             <!-- <div class="li_btn">
             <div @click="preview(item)">预览</div>
              <div @click="download(item)">下载</div> 
            </div>-->
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无数据</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="success_btn" @click="successBtn">关闭</div>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { timeStampSwitch } from "@/utils/util.js";
// import {
//   statusOptions,
//   transportStatusOptions,
//   seaPlasticType,
// } from "@/utils/enum.js";
export default {
  name: "billManage",
  data() {
    return {
      tabelHeigth: 500,
      breadData: [{ name: "", path: "" }, { name: "联单管理" }],
      formData: {
        receiveCompany: null,
        sourceCompany: null,
        // trafficCompany: null,
        date: [],
        number: null,
      },
      blueHouseOptions: [],
      trafficCompanyOptions: [],
      receiveCompanyOptions: [],
      tableData: [],
      // 表格
      page: 1,
      size: 10,
      total: 2,
      multipleSelection: [], //勾选数据
      loading: false,
      seaPlasticType:[],//塑料块类型
      seaPlasticTypeDict: {},//海塑种类
      centerDialogVisible: false,//pdf弹窗
      pdfList: [
        {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"11111"},
        {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"3333"},
        {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"2222"},
        {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"44444"},
      ],//pdf数据
    };
  },
  components: { Breadcrumb },
  computed: {},
  created() {
    this.getHaisuKinds()
    this.gethomeOptions();
    this.getCompanyOptions();
    this.getDestinationCompanyData();
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
        document.querySelector("#bill_page").offsetHeight -
        227 -
        document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (
        document.querySelector("#bill_page") &&
        document.querySelector("#bill_page").offsetHeight &&
        document.querySelector("#search") &&
        document.querySelector("#search").offsetHeight
      ) {
        self.tabelHeigth =
          document.querySelector("#bill_page").offsetHeight -
          227 -
          document.querySelector("#search").offsetHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
  },
  activated() {},
  methods: {
      getHaisuKinds(){
      // 请求塑料类型接口
      this.seaPlasticTypeDict = []
      this.seaPlasticType = []
      this.$http(this.GLOBALApi.getDictionaryListByCode(),{no:'plasticType'})
        .then((res) => {
          if (res.code === 200 && res.data) {
            for (let item of res.data) {
              this.$nextTick(()=>{
                this.seaPlasticType.push({
                  label:item.categoryName,
                  value:item.categoryNo,
                })
              })
              this.$set(this.seaPlasticTypeDict, item.name, item.value);
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    searchFn() {
      this.page = 1;
      this.tableData = [];
      this.getTableData();
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
            this.blueHouseOptions = res.data.records;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    // 运输公司列表
    getCompanyOptions() {
      let params = {
        // pageNum: 1,
        // pageSize: 999999,
      };
      this.$http(this.GLOBALApi.getTransportCompany(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.trafficCompanyOptions = res.data.records;
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
          pageSize: 1,
          pageNum: 9999999,
        })
      )
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data.records || [];
            this.receiveCompanyOptions = [];
            records.map((item, index) => {
              let temp = { label: item.name, value: item.id, ...item };
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
    // 获取table列表
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.page,
        pageSize: this.size,
        homeName: this.formData.sourceCompany || "",
        // transportCompanyId: this.formData.trafficCompany || "",
        receiveCompanyId: this.formData.receiveCompany || "",
        beginTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[0] +' 00:00:00': '',
        endTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[1] +' 23:59:59': '',
        serialNumber: this.formData.number || "",
      };
      this.tableData = [];
      console.log(params, "参数");
      this.$http(this.GLOBALApi.getLianDanList(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;

            this.total = res.data.total || 0;
            let records = res.data.records || [];
            records.map((item, index) => {
              this.tableData.push({
                id: item.serialNumber,
                // carNum: item.transportVehicle,
                date: item.arriveTime
                  ? timeStampSwitch(item.arriveTime, "", "yy/mm/dd")
                  : "",
                sourceCompany: item.fromHomeNames,
                // trafficCompany: item.transportCompanyName,
                receiveCompany: item.receiveCompanyName,
                kind: item.blockType,
                weight: item.receiveWeight
                  ? Number(item.receiveWeight) / 1000
                  : "",
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
    handleClick(data) {
      this.centerDialogVisible = true;
      this.pdfList = []
      let params = {
        // pageNum: 1,
        // pageSize: 999999,
        objectNos: id,
        objectType: 3,
      };
      this.$http(this.GLOBALApi.getVideoUrlPage(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.pdfList = res.data.records;
              this.centerDialogVisible = true;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 预览
    preview(data){
      window.open(data.previewUrl,"_blank")
    },
    // 下载
    // download(data){
    //   // let url = data.previewUrl
		//   // let name = data.name+'.pdf'
    //   // let that  = this

    //   var FileSaver = require('file-saver');
      
    //   // var blob = new Blob(['https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf'], {type: "application/pdf"});
    //   // FileSaver.saveAs(blob, data.name+'.pdf');
    //    FileSaver.saveAs(data.previewUrl, data.name+'.pdf');


    //   // this.fileAjax(url, function(xhr) {
		//   //       that.downloadFile(xhr.response, name)
		//   //   }, {
		//   //       responseType: 'blob'
		//   //   })
    // },
  //   fileAjax(url, callback, options) {
	//     let xhr = new XMLHttpRequest()
	//     xhr.open('get', url, true)
	//     if (options.responseType) {
	//         xhr.responseType = options.responseType
	//     }
	//     xhr.onreadystatechange = function() {
	//         if (xhr.readyState === 4 && xhr.status === 200) {
	//             callback(xhr)
	//         }
	//     }
	//     xhr.send()
	// },
  // downloadFile(content,filename){
  //    if (navigator.userAgent.indexOf("Firefox") >= 0) {
  //         var link = document.createElement("a"); //a标签下载
  //         link.href = window.URL.createObjectURL(new Blob([content]));
  //         link.download = filename;
  //         link.dispatchEvent(
  //           new MouseEvent("click", {
  //             bubbles: true,
  //             cancelable: true,
  //             view: window,
  //           })
  //         );
  //         window.URL.revokeObjectURL(link.href);
  //         link.remove();
  //       } else {
  //         var link = document.createElement("a"); //a标签下载
  //         link.href = window.URL.createObjectURL(new Blob([content]));
  //         link.download = filename;
  //         link.click();
  //         window.URL.revokeObjectURL(link.href);
  //         link.remove();
  //       }
  // },
    successBtn() {
      this.centerDialogVisible = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.tableData = [];
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.tableData = [];
      this.getTableData();
    },
    // 勾选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "勾选行数据");
    },
    // 导出
    downLoad() {
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        homeName: this.formData.sourceCompany || "",
        // transportCompanyId: this.formData.trafficCompany || "",
        receiveCompanyId: this.formData.receiveCompany || "",
        beginTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[0] +' 00:00:00': '',
        endTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[1] +' 23:59:59': '',
        serialNumber: this.formData.number || "",
      };

      // 导出
      this.$http(this.GLOBALApi.getHandleOrderListExport(), params, "downExcel")
        .then((res) => {
          if (res) {
            if (navigator.userAgent.indexOf("Firefox") >= 0) {
              var link = document.createElement("a"); //a标签下载
              link.href = window.URL.createObjectURL(new Blob([res.data]));
              link.download = "联单管理.xlsx";
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
              link.download = "联单管理.xlsx";
              link.click();
              window.URL.revokeObjectURL(link.href);
              link.remove();
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
.bill_page {
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
  width: 448px;
}

/deep/
  .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--small {
  width: 320px;
}

/deep/ .el-input.el-input--small.el-input--suffix {
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

// ----end

/deep/ .el-pagination.is-background {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
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

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052d9;
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
    .li_btn{
      display: flex;
      width: 96px;
      justify-content: space-between;
      &>div{
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
