<!--收集管理-清运需求审核-->
<template>
  <div class="information_review_page" id="information_review_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="小蓝之家">
              <el-select
                clearable
                v-model="formData.homeNo"
                placeholder="请选择"
                filterable
                @change="searchFn"
              >
                <el-option
                  v-for="item in blueHouseOptions"
                  :key="item.companyNo"
                  :label="item.name"
                  :value="item.companyNo"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select
                clearable
                v-model="formData.applyStatus"
                placeholder="请选择"
                @change="searchFn"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- 暂定,接口没有搜索字段 -->
            <!-- <el-form-item label="">
              <el-input
                  clearable
                  placeholder="请输入查找内容的关键字"
                  v-model.trim="formData.search"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
              >
              </el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
        </div>
      </div>
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
          prop="serialNo"
          label="收集单号"
          show-overflow-tooltip
          width="200"
        ></el-table-column>

        <el-table-column
          prop="blueHouse"
          label="小蓝之家"
          show-overflow-tooltip
          width="200"
        ></el-table-column>
        <el-table-column
          prop="parent"
          label="管理员"
          show-overflow-tooltip
          width="90"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="联系方式"
          color="#eee"
          show-overflow-tooltip
          width="120"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip
          width="260"
        ></el-table-column>
        <el-table-column label="类型" width="100">
          <template slot-scope="scope">
            <div>{{ statusDict[scope.row.homeType] }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间"
          show-overflow-tooltip
          width="180"
        ></el-table-column>
        <el-table-column
          prop="videoCount"
          label="视频数"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="handInWeight"
          label="上交重量(kg)"
          show-overflow-tooltip
          width="110"
        ></el-table-column>
        <el-table-column
          prop="handInNum"
          label="上交包数"
          width="110"
        ></el-table-column>
        <el-table-column prop="applyStatus" label="审核状态" width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.applyStatus == 1">待审核</span>
            <span
              v-if="
                scope.row.applyStatus == 2 ||
                scope.row.applyStatus == 5 ||
                scope.row.applyStatus == 6 ||
                scope.row.applyStatus == 7 ||
                scope.row.applyStatus == 8 ||
                scope.row.applyStatus == 4
              "
            >
              已通过
            </span>
            <span v-if="scope.row.applyStatus == 3">未通过</span>
            <!-- <span v-if="scope.row.applyStatus == 4">完成收集</span> -->
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-if="MenuBtnValid('/informationReview','查看')"
              @click="handleClick('0', scope.row)"
              type="text"
              size="small"
              class="blue"
            >
              查看
            </el-button>
            <el-button
              v-if="scope.row.applyStatus == 1 && MenuBtnValid('/informationReview','通过/不通过')"
              @click="handleClick('1', scope.row)"
              type="text"
              size="small"
              class="blue"
            >
              审核
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
          :current-page="page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="size"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :title="isCheck ? '审核' : '查看'"
      :visible.sync="centerDialogVisible"
      width="720px"
      :append-to-body="true"
      :close-on-click-modal="!isCheck"
      @close="closeDialogVisible"
      top="10vh"
    >
      <div class="row_bottom">
        <div class="title">小蓝之家</div>
        <div>{{ detailData.homeName }}</div>
      </div>
      <div class="row_bottom">
        <div class="title">管理员姓名</div>
        <div>{{ detailData.homeUserName }}</div>
      </div>
      <div class="row_bottom">
        <div class="title">联系方式</div>
        <div>{{ detailData.homeUserPhone }}</div>
      </div>
      <div class="row_bottom">
        <div class="title">上交重量</div>
        <div v-if="detailData.estimateWeight">
          {{ detailData.estimateWeight }}kg
        </div>
      </div>
      <div class="row_bottom">
        <div class="title">上交包数</div>
        <div v-if="detailData.applyCodeNumber">
          {{ detailData.applyCodeNumber }}包
        </div>
      </div>
      <div class="row_bottom">
        <div class="title">视频</div>
        <div
          class="video_box"
          v-if="detailData.videoList && detailData.videoList.length > 0"
        >
          <div
            class="video_li"
            v-for="(item, index) in detailData.videoList"
            :key="index"
          >
            <div class="li" @click="playVideo(item.videoUrl)">
              <img
                :src="item.coverPicUrl"
                alt=""
                v-if="item.coverPicUrl && item.coverPicUrl.length"
              />
              <img src="@/assets/img/home/videoBg.svg" alt="" v-else />
              <img
                class="palyBtn"
                src="@/assets/img/home/playBtn.png"
                alt="播放"
              />
            </div>
            <div class="li_name" :title="item.videoName">{{ item.videoName }}</div>
            <!-- 评级 -->
            <div class="radio_groups">
              <div
                class="radio_item"
                :class="{ radio_active: item.videoRating == 10 ? true : false }"
                @click="groupChange(item, 10)"
              >
                优
              </div>
              <div
                class="radio_item"
                :class="{ radio_active: item.videoRating == 20 ? true : false }"
                @click="groupChange(item, 20)"
              >
                合格
              </div>
              <div
                class="radio_item"
                :class="{ radio_active: item.videoRating == 30 ? true : false }"
                @click="groupChange(item, 30)"
              >
                不合格
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>
      </div>
      <div class="row_bottom">
        <div class="title">图片</div>
        <div
          class="video_box"
          v-if="detailData.picUrlList && detailData.picUrlList.length > 0"
        >
          <div
            class="video_li img_li"
            v-for="(item, index) in detailData.picUrlList"
            :key="index"
          >
            <!-- <img  class="li" :src="item" alt="" :preview-src-list="detailData.picUrlList"> -->
            <el-image
              fit="cover"
              style="width: 136px; height: 136px"
              :src="item.videoUrl"
              :preview-src-list="previewUrlList"
            ></el-image>

            <!-- 评级 -->
            <div class="radio_groups">
              <div
                class="radio_item"
                :class="{ radio_active: item.videoRating == 10 ? true : false }"
                @click="groupChange(item, 10)"
              >
                优
              </div>
              <div
                class="radio_item"
                :class="{ radio_active: item.videoRating == 20 ? true : false }"
                @click="groupChange(item, 20)"
              >
                合格
              </div>
              <div
                class="radio_item"
                :class="{ radio_active: item.videoRating == 30 ? true : false }"
                @click="groupChange(item, 30)"
              >
                不合格
              </div>
            </div>
          </div>
        </div>
        <div v-else><div class="empty_box">暂无图片</div></div>
      </div>
      <div class="row_bottom" v-if="isCheck">
        <div class="title">原因</div>
        <div>
          <el-input
            style="width: 500px"
            placeholder="审批备注,审批不通过请备注原因"
            type="textarea"
            :rows="5"
            v-model.trim="detailData.refuseReason"
            maxlength="50"
            show-word-limit
          ></el-input>
        </div>
      </div>
      <div
        class="row_bottom"
        v-if="
          !isCheck &&
          detailData.refuseReason &&
          detailData.refuseReason.length > 0
        "
      >
        <div class="title">原因</div>
        <div>{{ detailData.refuseReason }}</div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="isCheck">
        <div class="fail_btn" @click="failBtn" v-fastClick>审核不通过</div>
        <div class="success_btn" @click="successBtn" v-fastClick>审核通过</div>
      </span>
    </el-dialog>

    <!-- 视频预览 -->
    <el-dialog
      title="视频预览"
      :visible.sync="videoPreview"
      width="720px"
      :modal-append-to-body="true"
      :append-to-body="true"
      :close-on-click-modal="true"
      top="10vh"
    >
      <div style="">
        <video
          width="600"
          v-if="videoPreview"
          :src="currentVideoSrc"
          controls
          style="height: 400px; width: 100%"
        ></video>
      </div>
      <div slot="footer">
        <span class="button_blue" @click="videoPreview = false">关闭</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { timeStampSwitch } from "@/utils/util.js";

export default {
  name: "informationReview",
  data() {
    return {
      tabelHeigth: 420,
      breadData: [{ name: "收集管理", path: "" }, { name: "清运需求审核" }],
      formData: {
        search: null,
        homeNo: null,
        applyStatus: null,
      },
      blueHouseOptions: [],
      statusOptions: [
        { label: "待审核", value: 1 },
        { label: "已通过", value: 2 },
        { label: "未通过", value: 3 },
        // {label: "完成收集", value: 4},
      ],
      tableData: [],
      detailData: {
        homeName: "",
        homeUserName: "",
        homeUserPhone: "",
        estimateWeight: "",
        applyCodeNumber: "",
        videoList: [],
        picUrlList: [],
        refuseReason: "",
        id: "",
      },
      previewUrlList: [], //图片预览列表
      // 表格
      page: 1,
      size: 10,
      total: 0,
      centerDialogVisible: false,
      apiState: false,
      isCheck: false,
      loading: false,
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址
      statusDict: {},
    };
  },
  components: { Breadcrumb },
  computed:{
  },
  created() {
    this.getDictionary();
    this.gethomeOptions();
    this.apiState = false;
    this.getTableData();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
        document.querySelector("#information_review_page").offsetHeight -
        257 -
        document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (
        document.querySelector("#information_review_page") &&
        document.querySelector("#information_review_page").offsetHeight &&
        document.querySelector("#search") &&
        document.querySelector("#search").offsetHeight
      ) {
        self.tabelHeigth =
          document.querySelector("#information_review_page").offsetHeight -
          257 -
          document.querySelector("#search").offsetHeight;
        // console.log("table",self.tabelHeigth);
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
  },
  activated() {},
  methods: {
    // 获取字典
    getDictionary() {
      let landTypeArr = [];
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ["land_type"],
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];
            records.map((item, index) => {
              item.dictList = item.dictList || [];
              if (item.dictType === "land_type") {
                for (let temp of item.dictList) {
                  landTypeArr.push({
                    label: temp.dictValueDesc,
                    value: temp.dictValue ? Number(temp.dictValue) : "",
                  });
                }
                for (let item of landTypeArr) {
                  this.$set(this.statusDict, item.value, item.label);
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
    // 获取table列表
    getTableData() {
      this.loading = true;
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        homeNo: this.formData.homeNo || "",
        applyStatus: this.formData.applyStatus || "",
      };
      console.log(params, "参数");
      this.tableData = [];
      this.$http(this.GLOBALApi.getInfoList(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.loading = false;

            this.total = res.data.total || 0;
            let records = res.data.records || [];
            records.map((item, index) => {
              this.tableData.push({
                ...item,
                blueHouse: item.homeName,
                parent: item.homeUserName,
                phone: item.homeUserPhone,
                address: item.homeAddress,
                // type:
                //   item.homeType == 1
                //     ? '沿海'
                //     : item.homeType == 2
                //     ? '海岛'
                //     : '',
                date: item.reportTime ? timeStampSwitch(item.reportTime) : "",
                videoNum: item.videoCount,
                videoList: item.videoList,
                handInNum: item.applyCodeNumber,
                handInWeight: item.estimateWeight,
                applyStatus: item.applyStatus,
                refuseReason: item.refuseReason,
                orderNo: item.orderNo,
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
    searchFn() {
      this.page = 1;
      this.tableData = [];
      this.getTableData();
    },
    handleClick(type, data) {
      if (type == "1") {
        this.isCheck = true;
      } else {
        this.isCheck = false;
      }
      console.log(data, "详情");
      this.$http(this.GLOBALApi.getInfoDetail(), { no: data.orderNo })
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.detailData.orderNo = res.data.orderNo;
            this.detailData.homeName = res.data.homeName;
            this.detailData.homeUserName = res.data.homeUserName;
            this.detailData.homeUserPhone = res.data.homeUserPhone;
            this.detailData.estimateWeight = res.data.estimateWeight;
            this.detailData.applyCodeNumber = res.data.applyCodeNumber;
            this.detailData.videoList = res.data.videoList;
            this.detailData.refuseReason = type == "0"?res.data.refuseReason:'';
            this.detailData.picUrlList = res.data.picUrlList || [];
            this.previewUrlList = this.detailData.picUrlList.map(item => item.videoUrl)
            // if (res.data.picUrl && res.data.picUrl.length > 0) {
            //   this.detailData.picUrlList = res.data.picUrl.split(",");
            // }
            this.centerDialogVisible = true;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    closeDialogVisible() {
      this.apiState = false;
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
    playVideo(data) {
      // window.open(data, '_blank');
      this.currentVideoSrc = data;
      this.videoPreview = true;
    },
    failBtn() {
      console.log(this.detailData.refuseReason, "******");
      if (
        !this.detailData.refuseReason ||
        this.detailData.refuseReason.length <= 0
      ) {
        this.$message.error("请备注审批不通过的原因");
        return;
      }
      this.checkOrder("0");
    },
    successBtn() {
      this.checkOrder("1");
    },
    checkOrder(type) {
      console.log(this.detailData.refuseReason, "理由");
      if (this.apiState) {
        return;
      }
      this.apiState = true;
      let params = {
        orderNo: this.detailData.orderNo,
        checkResult: type,
        refuseReason: this.detailData.refuseReason,
      };
      this.centerDialogVisible = false;
      this.$http(this.GLOBALApi.checkCollectOrder(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$message.success("操作成功");
          } else {
            this.$message.error(res.msg);
          }
          this.apiState = false;
          this.centerDialogVisible = false;
          this.tableData = [];
          this.getTableData();
        })
        .catch((error) => {
          this.apiState = false;
          this.centerDialogVisible = false;
          this.$message.error(error.msg);
          this.tableData = [];
          this.getTableData();
        });
    },
    // 评级事件
    groupChange(item, val) {
      let params = {
        id: item.id,
        videoRating: val,
      };
      this.$http(this.GLOBALApi.updateVideoRate(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$set(item, "videoRating", val);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    // 序号
    getIndex(index) {
      if (this.page) {
        return index + (this.page - 1) * this.size + 1;
      } else {
        return index + 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.information_review_page {
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

// 弹窗
.row_bottom {
  margin-bottom: 28px;
  display: flex;
}

.title {
  width: 60px;
  margin-right: 34px;
  flex-shrink: 0;
}

.video_box {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.video_li {
  margin-bottom: 10px;
  margin-right: 20px;
  width: 162px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .li {
    width: 136px;
    height: 136px;
    // background: url(~@/assets/img/home/videoBg.svg) center center no-repeat;
    // margin-right: 10px;
    border-radius: 4px 4px 4px 4px;
    cursor: pointer;
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .palyBtn {
      display: inline-block;
      width: 40px;
      height: 40px;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
    }
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
}

.fail_btn {
  width: 102px;
  height: 32px;
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dcdfe6;
  color: #303133;
  margin-right: 12px;
  cursor: pointer;
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

// 操作按钮
/deep/ .blue.el-button.el-button--text.el-button--small {
  color: #0052d9;
}

.img_li {
  // margin-right: 10px;

  .el-image {
    object-fit: cover;
    border-radius: 4px 4px 4px 4px;
  }
}
.button_default,
.button_blue {
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  display: inline-block;
  padding: 0 12px;
}
.empty_box {
  width: 580px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #858585;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 12px;
}
.radio_groups {
  width: 162px;
  position: relative;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  .radio_item {
    color: #606266;
    font-weight: 500;
    cursor: pointer;
    font-size: 14px;
    padding-left: 10px;
    position: relative;
    margin-right: 16px;
  }
  .radio_item::before {
    content: "";
    display: block;
    position: absolute;
    top: 3px;
    left: -8px;

    border: 1px solid #dcdfe6;
    border-radius: 100%;
    width: 14px;
    height: 14px;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
  }
  .radio_active {
    color: #409eff;
  }
  .radio_active::before {
    border: 5px solid #409eff;
  }
}
.radio_group {
  margin: 10px 0;
  display: flex;
  width: 136px;
  .el-radio {
    margin-right: 10px !important;
  }
  /deep/ .el-radio__label {
    padding-left: 5px !important;
  }
}
</style>
