<!--中转仓-入仓管理-->
<template>
  <div id="wareHousing" class="wareHousing">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <!-- <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="">
              <el-input
                  clearable
                  placeholder="请输入查找内容的关键字"
                  v-model.trim="formData.search"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn">查询</div>
        </div> -->
      </div>
      <el-table class="table_box" :data="tableData" style="width:100%" :height="tabelHeigth">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="serialNumber" label="编号" width="">
        </el-table-column>
        <el-table-column prop="clearTransportInputOrderNumber" label="清运单编号" width="">
        </el-table-column>
        <el-table-column prop="workWeightTime" label="称重时间" width="160" show-overflow-tooltip></el-table-column>
        <el-table-column prop="platformScaleCode" label="磅秤编码（GPS设备）" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="inputOrderStatus" label="仓储状态" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.inputOrderStatus == 1">待出库</span>
            <span v-if="scope.row.inputOrderStatus == 2">部分出库</span>
            <span v-if="scope.row.inputOrderStatus == 3">已出库</span>
          </template>
        </el-table-column>

        <el-table-column prop="clearTransportInputWeight" label="运输重量(kg)" width="">
        </el-table-column>
        <el-table-column prop="actualInputWeight" label="实际入库重量(kg)" width="150">
        </el-table-column>
        <el-table-column prop="transportType" label="运输方式" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.transportType == 1">内陆</span>
            <span v-if="scope.row.transportType == 2">海岛</span>
          </template>
        </el-table-column>
        <el-table-column prop="lon" label="经度" width="">
        </el-table-column>
        <el-table-column prop="lat" label="维度" width="">
        </el-table-column>
      </el-table>
      <div class="page">
        <div class="data-total">共{{ total }}项数据</div>
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
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import {timeStampSwitch} from '@/utils/util.js'
export default {
  name: "informationReview",
  data() {
    return {
      tabelHeigth: 420,
      breadData: [{name: "中转仓", path: ""}, {name: "入仓管理"}],
      formData: {
        search: null,
      },
      tableData: [],
      // 表格
      page: 1,
      size: 10,
      total: 0,
      centerDialogVisible: false,
    };
  },
  components: {Breadcrumb},
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector("#wareHousing").offsetHeight - 354;
    });
    window.onresize = () => {
      if (document.querySelector("#wareHousing") && document.querySelector("#wareHousing").offsetHeight) {
        self.tabelHeigth = document.querySelector("#wareHousing").offsetHeight - 354;
        // console.log("table",self.tabelHeigth);
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
    // 获取table列表
    getTableData() {
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        searchContent: this.formData.search || '',
      };
      console.log(params, "参数");
      this.$http(this.GLOBALApi.getInputStore(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.total = res.data.total || 0;
              let records = res.data.records || [];
              records.map((item, index) => {
                this.tableData.push({
                  serialNumber: item.serialNumber,
                  clearTransportInputOrderNumber: item.clearTransportInputOrderNumber,
                  workWeightTime: timeStampSwitch(item.workWeightTime,'','yy/mm/dd'),
                  inputOrderStatus: item.inputOrderStatus,
                  clearTransportInputWeight: item.clearTransportInputWeight,
                  actualInputWeight: item.actualInputWeight,
                  transportType: item.transportType,
                  platformScaleCode: item.platformScaleCode,
                  lon: item.lon,
                  lat: item.lat,

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
    searchFn() {
      this.getTableData();
    },
    handleSizeChange(val) {
      this.size = val
      this.tableData = []
       this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val
      this.tableData = []
       this.getTableData();
    },
  },
};
</script>

<style lang="less" scoped>
.wareHousing {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.main {
  margin-top: 16px;
  // box-shadow: 0px 2px 3px 1px rgb(0 0 0 / 10%);
  padding: 32px 24px 78px 32px;
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

/deep/ .el-input.el-input--small.el-input--suffix {
  width: 448px;
}

.search-bt {
  cursor: pointer;
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

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}
</style>
