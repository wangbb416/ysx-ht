<!--收集管理-待清运需求汇总-->
<template>
  <div class="transportation_demand_page" id="TransportationDemand">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="content">
      <div class="search">
        <div class="search_input">
          <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="小蓝之家">
              <el-select
                v-model="searchValue.homeNo"
                placeholder="请选择"
                clearable
                filterable
                @change="handleSearch"
              >
                <el-option
                  v-for="item in homeOptions"
                  :key="item.companyNo"
                  :label="item.name"
                  :value="item.companyNo"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型">
              <el-select
                v-model="searchValue.homeType"
                placeholder="请选择"
                clearable
                @change="handleSearch"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
        </div>
      </div>

      <div class="table">
        <template>
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
              width="60"
            ></el-table-column>
            <el-table-column
              prop="homeName"
              label="小蓝之家"
              show-overflow-tooltip
              width="200"
            ></el-table-column>
            <el-table-column
              prop="homeUserName"
              label="管理员"
              show-overflow-tooltip
              width="120"
            ></el-table-column>
            <el-table-column
              prop="homeUserPhone"
              label="联系方式"
              show-overflow-tooltip
              width="160"
            ></el-table-column>
            <el-table-column
              prop="homeAddress"
              label="地址"
              show-overflow-tooltip
              width="260"
            ></el-table-column>
            <el-table-column prop="homeType" label="类型">
              <template slot-scope="scope">
                <div>
                  <div>{{ statusDict[scope.row.homeType] }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="videoCount"
              label="本月上传视频数"
            ></el-table-column>
            <el-table-column
              prop="picCount"
              label="本月上传图片数"
            ></el-table-column>
            <el-table-column
              prop="estimateWeightCount"
              label="待清运重量(kg)"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="transferCodeNumberCount"
              label="待清运包数(包)"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </template>
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
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
// import { statusOptions, datafiltering } from '@/utils/enum.js'

export default {
  name: 'TransportationDemand',
  components: { Breadcrumb },
  data() {
    return {
      tabelHeigth: 420, // 表格初始化高度
      breadData: [{ name: '收集管理', path: '' }, { name: '待清运需求汇总' }],

      // 搜索条件
      searchValue: {
        homeNo: '',
        homeType: ''
      },
      homeOptions: [],
      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      loading: false,
      statusDict:{},
      statusOptions: [],
    }
  },

  computed: {},
  created() {
    this.getDictionary()
    this.getTableData()
    this.gethomeOptions()
  },
  mounted() {
    let self = this
    this.$nextTick(() => {
      let searchDom = document.querySelector('.search')
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51
      this.tabelHeigth =
        document.querySelector('#TransportationDemand').offsetHeight -
        257 -
        searchHeight
    })
    window.onresize = () => {
      let searchDom = document.querySelector('.search')
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51
      let contentDom = document.querySelector('#TransportationDemand')
      let contentHeight = contentDom ? contentDom.offsetHeight || 0 : 0
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 257 - searchHeight
      }
    }
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {}
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
                for (let item of this.statusOptions) {
                  this.$set(this.statusDict, item.value, item.label)
                }

              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    // 小蓝之家列表
    gethomeOptions() {
      let params = {
        // pageNum: this.pageNum,
        // pageSize: 999999
      }
      this.$http(this.GLOBALApi.getXiaolanData(), params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.homeOptions = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },

    // 搜索
    handleSearch() {
      console.log(this.searchValue)
      this.pageNum = 1
      this.getTableData()
    },

    getTableData() {
      this.loading = true

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        applyStatus: 2 //状态为2表示运输单
      }
      for (let key of Object.keys(this.searchValue)) {
        if (
          this.searchValue[key] ||
          (!this.searchValue[key] && this.searchValue[key] === 0)
        ) {
          params[key] = this.searchValue[key]
        }
      }

      this.$http(this.GLOBALApi.getPageCollectOrderData(), params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.loading = false

            this.total = res.data.total || 0
            this.tableData = res.data.records || []
          } else {
            this.loading = false

            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.loading = false

          this.$message.error(error.msg)
        })
    },

    // 分页
    handleSizeChange(value) {
      this.pageSize = value
      this.getTableData()
    },
    handleCurrentChange(value) {
      this.pageNum = value
      this.getTableData()
    },

    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.transportation_demand_page {
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

/deep/ .el-input.el-input--small.el-input--suffix {
  width: 448px;
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

.button-blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

.button-blue:hover {
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

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}

// 分页
.pageNum {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
