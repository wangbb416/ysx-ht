<!--视频评分-->
<template>
  <div class="videoRate_page" id="videoRate_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search" id="search"></div>
      <el-table
        :data="tableData"
        style="margin-bottom:20px"
        :height="tabelHeigth+72"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="index" :index="getIndex" label="序号" width="200"></el-table-column>
        <el-table-column
          prop="videoTypeName"
          label="视频类型"
          width=""
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="count" label="视频个数" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="更新时间" width="" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click="handleOpenDialog(scope.row,scope.$index)"
                type="text"
                size="small"
                class="blue"
                v-if="MenuBtnValid('/videoRate','查看')"
                >查看</el-button
              >
            </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { timeStampSwitch } from "@/utils/util.js";
export default {
  name: "videoRate",
  data() {
    return {
      tabelHeigth: 500,
      breadData: [{ name: "视频管理", path: "" }, { name: "视频评级" }],
      tableData: [
        // {id:1,videoTypeName:"收集",time:"2020-08-23 16:45:38"},
        // {id:2,videoTypeName:"清运",time:"2020-08-23 16:45:38"},
        // {id:3,videoTypeName:"中转仓入库",time:"2020-08-23 16:45:38"},
        // {id:4,videoTypeName:"中转仓出库",time:"2020-08-23 16:45:38"},
        // {id:5,videoTypeName:"造粒厂接收",time:"2020-08-23 16:45:38"},
        // {id:6,videoTypeName:"造粒厂生产",time:"2020-08-23 16:45:38"},
      ],
      loading: false,
      formData: {
        date: [],
      },
    };
  },
  components: { Breadcrumb },
  computed: {},
  created() {
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
        document.querySelector("#videoRate_page").offsetHeight -
        257 -
        document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (
        document.querySelector("#videoRate_page") &&
        document.querySelector("#videoRate_page").offsetHeight &&
        document.querySelector("#search") &&
        document.querySelector("#search").offsetHeight
      ) {
        self.tabelHeigth =
          document.querySelector("#videoRate_page").offsetHeight -
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
    // 获取table列表
    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.page,
        pageSize: this.size,
      };
      this.tableData = [];
      this.$http(this.GLOBALApi.getVideoTypeByTime(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;
            let records = res.data || [];
            records.map((item, index) => {
              this.tableData.push({
                ...item,
                time: item.time
                  ? timeStampSwitch(item.time, "", "yy/mm/dd")
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
    handleOpenDialog(item,index){
      // console.log("视频----",this.$store.state.tokenValue);
      localStorage.setItem("currentId",item.id)
      localStorage.setItem("currentIndex",index)
      this.$router.push("/videoRateDetail")
     
      // this.$router.push({path:"/videoRateDetail",query:{type:JSON.stringify(item.id),index}})
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
.videoRate_page {
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

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052d9;
}
</style>
