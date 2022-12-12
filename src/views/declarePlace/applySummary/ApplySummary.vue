<!--清运统计-->
<template>
  <div class="apply_summary_page" id="apply_summary_page">
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

            <el-form-item label="收集提交时间" class="fixed_width">
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
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
        </div>
      </div>

      <el-table
        :data="tableData"
        style="margin-bottom:20px"
        :height="tabelHeigth"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="index" :index="getIndex" label="序号" width="50"></el-table-column>
        <el-table-column prop="shouji_id" label="收集单号" width="210">
        </el-table-column>
        <el-table-column prop="date" label="提交时间" width="150"></el-table-column>
        <el-table-column
          prop="sourceCompany"
          label="小蓝之家"
          width="170"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="tj_personal"
          label="提交人"
          width="70"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="diaodu_id"
          label="调度单号"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="yunshu_date" label="运输时间" width="150"></el-table-column>
        <el-table-column
          prop="yunshu_personal"
          label="运输人"
          width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="kind"
          label="收集类别"
          width=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="weight" label="收集重量(kg)" width="110">
        </el-table-column>
        <el-table-column prop="collectNum" label="收集包数(包)" width="100">
        </el-table-column>
        <el-table-column prop="inputId" label="入库单号" width="180">
        </el-table-column>
        <el-table-column prop="inputTime" label="入库时间" width="150">
        </el-table-column>
        <el-table-column prop="inputPersonal" label="入库人" width="70">
        </el-table-column>
        <!-- <el-table-column prop="inputWeight" label="入库总重量(kg)" width="120">
        </el-table-column>
        <el-table-column prop="inputNum" label="入库总包数(包)" width="120">
        </el-table-column>
        <el-table-column prop="chayi" label="是否有差异" width="100">
        </el-table-column>
        <el-table-column prop="beizhu" label="备注" width="">
        </el-table-column> -->
      </el-table>
      <div class="page" style="position: relative;">
        <div class="check_out" @click="downLoad" v-fastClick  v-if="MenuBtnValid('/applySummary','导出')">导出</div>
        <el-pagination
          style=" position: absolute;right: 0;"
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
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { timeStampSwitch } from "@/utils/util.js";
export default {
  name: "applySummary",
  data() {
    return {
      tabelHeigth: 500,
      breadData: [{ name: "小蓝之家", path: "" }, { name: "清运统计" }],
      formData: {
        date: [],
      },
      blueHouseOptions: [],
      trafficCompanyOptions: [],
      receiveCompanyOptions: [],
      tableData: [],
      // 表格
      page: 1,
      size: 10,
      total: 0,
      multipleSelection: [], //勾选数据
      loading: false,

      seaPlasticType:[],//塑料块类型
      seaPlasticTypeDict: [],//海塑种类
    };
  },
  components: { Breadcrumb },
  computed: {},
  created() {
    this.getHaisuKinds()
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
        document.querySelector("#apply_summary_page").offsetHeight -
        257 -
        document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (
        document.querySelector("#apply_summary_page") &&
        document.querySelector("#apply_summary_page").offsetHeight &&
        document.querySelector("#search") &&
        document.querySelector("#search").offsetHeight
      ) {
        self.tabelHeigth =
          document.querySelector("#apply_summary_page").offsetHeight -
          257 -
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
    searchFn() {
      this.page = 1;
      this.tableData = [];
      this.getTableData();
    },
    // 获取table列表
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.page,
        pageSize: this.size,
        // homeUserId: this.$store.state.userInfo.id,
        // homeUserId: this.$store.state.addTask?this.$store.state.userInfo.id:'',
        collectBeginTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[0] +' 00:00:00': '',
        collectEndTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[1] +' 23:59:59': '',
      };
      console.log(params, "参数");
      this.tableData = [];
      this.$http(this.GLOBALApi.collectToInputStatistics(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;

            this.total = res.data.total || 0;
            let records = res.data.records || [];
            records.map((item, index) => {
              this.tableData.push({
                id:item.collectId,
                shouji_id: item.collectNumber,//收集编号
                date: item.collectTime
                  ? timeStampSwitch(item.collectTime, "", "yy/mm/dd")
                  : "",//提交时间
                sourceCompany: item.homeName,//小蓝之家
                tj_personal: item.homeUserName,//提交人
                diaodu_id: item.transportNumber,//调度单号
                yunshu_date: item.transportTime
                  ? timeStampSwitch(item.transportTime, "", "yy/mm/dd")
                  : "",//运输时间
                yunshu_personal: item.inTransportUserName,//运输人
                kind: this.seaPlasticTypeDict[item.blockType],//收集类别
                weight: item.collectWeight
                  ? item.collectWeight
                  : "",//收集重量
                collectNum: item.collectCount,//收集包数
                inputId: item.inputNumber,//入库单号
               
                inputTime: item.inputTime
                  ? timeStampSwitch(item.inputTime, "", "yy/mm/dd")
                  : "",//入库时间
                inputPersonal: item.receiveUser,//入库人
                inputWeight: item.inputWeight,//入库总重量
                inputNum: item.inputCount,//入库总包数
                chayi: item.ifDifference==0?'否':(item.ifDifference==1?'是':''),//差异
                beizhu: item.remark,//备注
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
    // 导出
    downLoad() {
      if (this.tableData.length<1) {
        this.$message.warning("当前数据为空")
        return
      }
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        // homeUserId: this.$store.state.addTask?this.$store.state.userInfo.id:'',
        collectBeginTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[0] +' 00:00:00': '',
        collectEndTime:this.formData.date && this.formData.date.length>0 ? this.formData.date[1] +' 23:59:59': '',
      };
      this.loading = true
      // 导出
      this.$http(this.GLOBALApi.collectToInputStatisticsExport(), params, "downExcel")
        .then((res) => {
          if (res) {
            let link = document.createElement("a"); //a标签下载
            if (navigator.userAgent.indexOf("Firefox") >= 0) {
              link.href = window.URL.createObjectURL(new Blob([res.data]));
              link.download = "清运统计.xlsx";
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
              link.download = "清运统计.xlsx";
              link.click();
              window.URL.revokeObjectURL(link.href);
              link.remove();
            }
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.loading = false
          this.$message.error(error.msg);
        });
    },
        // 序号
    getIndex(index) {
      if (this.page) {
        return index + (this.page - 1) * this.size + 1
      } else {
        return index + 1
      }
    },
  },
};
</script>

<style lang="less" scoped>
.apply_summary_page {
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
</style>
