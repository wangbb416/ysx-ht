<!--单位管理-渔船列表-渔船详情-接收联单详情-->
<template>
  <div class="detail_content">
    <MyBread :titleList="titleList"></MyBread>
    <div class="group_cell">
      <triggerBar title="接收信息" type="text"></triggerBar>
      <div class="module-content">
        <div class="list">
          <div>
            <span>接收联单编号 : </span>
            <span>{{ formValue.recordNo }}</span>
          </div>
          <div>
            <span>船名 : </span>
            <span>{{ formValue.shipName }}</span>
          </div>
          <div>
            <span>收集企业 : </span>
            <span>{{ formValue.collectionCompanyName }}</span>
          </div>
          <div>
            <span>收集员 : </span>
            <span>{{ formValue.collectionUserName }}</span>
          </div>
          <div>
            <span>作业地点 : </span>
            <span>{{ formValue.workAddress }}</span>
          </div>
          <div>
            <span>作业开始时间 : </span>
            <span>{{ formValue.workStartTimeStr }}</span>
          </div>
          <div>
            <span>作业结束时间 : </span>
            <span>{{ formValue.workEndTimeStr }}</span>
          </div>
          <div>
            <span>来源船舶 : </span>
            <span>{{ formValue.shipTypeDesc }}</span>
          </div>
          <div>
            <span>危废类型 : </span>
            <span>{{ formValue.wasteTypeStr }}</span>
          </div>
          <div>
            <span>危废重量(t) : </span>
            <span>{{ (formValue.wasteWeight / 1000).toFixed(3) }}</span>
          </div>
        </div>
        <div @click="openDialog('openPdf')" class="jointView">联单视图</div>
      </div>
    </div>
    <div class="group_cell">
      <triggerBar title="污染物接收现场" type="text"></triggerBar>
      <MyTable
        :isIndexBoo="true"
        :data="tableData"
        :tableConfig="pollutantReceivingSiteTable"
      >
        <template #data_Operate="{ data }">
          <div class="btn_group">
            <span @click="openDialog('openPicList', data)" title="" class="btn blue"
              >查看</span
            >
          </div>
        </template>
      </MyTable>
    </div>
    <MyDialog
      :dialogVisible="dialogVisible"
      title="查看"
      @cancel="openDialog('closePicList')"
    >
      <template v-slot:content>
        <div class="dialog-show-img-content">
          <img
            src="@/assets/imgs/form/right.png"
            alt=""
            @click="openDialog('prev')"
            class="left cursor-style"
          />
          <img class="cursor-style" :src="currentUrl" alt="" />
          <img
            src="@/assets/imgs/form/right.png"
            alt=""
            @click="openDialog('next')"
            class="right cursor-style"
          />
        </div>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import triggerBar from "@/components/base/triggerBar";
import MyTable from "@/components/base/myTable";
import MyDialog from "@/components/base/myDialog";
import { receptionOrderDetail, receptionSite } from "@/api/unitManagement";
import { pollutantReceivingSiteTable } from "./config";
import { contaminationType } from "@/utils/enum";
import { dateGrain } from "@/utils/methods";

export default {
  name: "fishing-boat-list-information-detailed",
  components: {
    MyBread,
    triggerBar,
    MyTable,
    MyDialog
  },
  data() {
    return {
      titleList: [
        { name: "单位管理", path: "" },
        { name: "渔船列表", path: "" },
        {
          name: "渔船详情",
          path: "/ysx/fishing-boat-list-detail"
        },
        { name: "接收联单详情", path: "" }
      ],
      recordNo: "",
      itemId: "",
      pageStatus: "",
      // 表格
      tableData: [],
      pollutantReceivingSiteTable,
      dialogVisible: false,
      licensePictures: [],
      currentUrl: "",
      currentIndex: 0,
      formValue: {
        recordNo: "",
        shipName: "",
        collectionCompanyName: "",
        collectionUserName: "",
        workAddress: "",
        workStartTimeStr: "",
        workEndTimeStr: "",
        shipTypeDesc: "",
        wasteType: "",
        wasteWeight: "",
        pdfUrl: ""
      }
    };
  },
  created() {
    this.recordNo = this.$route.query.recordNo;
    this.itemId = this.$route.query.itemId;
    this.pageStatus = this.$route.query.pageStatus;
    if (this.pageStatus == "warning") {
      this.titleList.splice(1, 1, {
        name: "渔船预警列表",
        path: "/ysx/fishing-vessel-warning"
      });
    } else {
      this.titleList.splice(1, 1, {
        name: "渔船列表",
        path: "/ysx/fishing-boat-list"
      });
    }
    this.titleList[2].query = {
      itemId: this.itemId,
      pageStatus: this.pageStatus
    };
    this.getTableData();
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      receptionOrderDetail(this.recordNo)
        .then(res => {
          if (res) {
            this.formValue.recordNo = res.recordNo;
            this.formValue.shipName = res.shipName;
            this.formValue.collectionCompanyName = res.collectionCompanyName;
            this.formValue.collectionUserName = res.collectionUserName;
            this.formValue.workAddress = res.workAddress;
            let sTime = dateGrain(res.workStartTime);
            let workStartTimeStr = res.workStartTime
              ? `${sTime["dateYear"]}-${sTime["dateMonth"]}-${sTime["dateDay"]} ${sTime["dateHours"]}:${sTime["dateMinute"]}`
              : "-";
            let eTime = dateGrain(res.workEndTime);
            let workEndTimeStr = res.workEndTime
              ? `${eTime["dateYear"]}-${eTime["dateMonth"]}-${eTime["dateDay"]} ${eTime["dateHours"]}:${eTime["dateMinute"]}`
              : "-";
            this.formValue.workStartTimeStr = workStartTimeStr;
            this.formValue.workEndTimeStr = workEndTimeStr;
            this.formValue.pdfUrl = res.pdfUrl;
            this.formValue.shipTypeDesc = res.shipTypeDesc;
            this.formValue.wasteTypeStr = contaminationType[res.wasteType];
            this.formValue.wasteWeight = res.wasteWeight;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
      //
    },
    getTableData() {
      receptionSite(this.recordNo)
        .then(res => {
          if (res && res.length > 0) {
            this.tableData = res.map(item => {
              return {
                ...item
              };
            });
          } else {
            this.tableData = [];
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    openDialog(type, data) {
      switch (type) {
        case "openPicList":
          this.dialogVisible = true;
          this.licensePictures = data.imageUrls;
          this.currentUrl = this.licensePictures[0];
          this.currentIndex = 0;
          break;
        case "closePicList":
          this.dialogVisible = false;
          this.licensePictures = [];
          this.currentUrl = "";
          this.currentIndex = 0;
          break;
        case "prev":
          this.currentIndex = this.currentIndex - 1;
          if (this.currentIndex < 0) {
            this.currentIndex = this.licensePictures.length - 1;
          }
          this.currentUrl = this.licensePictures[this.currentIndex];
          break;
        case "next":
          this.currentIndex = this.currentIndex + 1;
          if (this.currentIndex >= this.licensePictures.length) {
            this.currentIndex = 0;
          }
          this.currentUrl = this.licensePictures[this.currentIndex];
          break;
        case "openPdf":
          if (!this.formValue.pdfUrl || this.formValue.pdfUrl === "-") {
            this.$message.error("无视图");
            return;
          }
          window.open(this.formValue.pdfUrl);
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail_content {
  padding-bottom: 100px;
  .group_cell {
    padding: 30px 24px;
    margin-bottom: 20px;
    background-color: rgba(37, 47, 60, 0.46);
    border: 1px solid rgba(21, 25, 30, 0.46);
    border-radius: 2px;
  }
}
.basic_msg_from {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.btn_group {
  .btn {
    cursor: pointer;
    color: #fff;
    padding: 2px 3px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.red {
      background: #dd6161;
    }
    &.blue {
      background: #409eff;
    }
  }
}
.module-content {
  padding-left: 135px;
  position: relative;
  z-index: 1;
  .jointView {
    position: absolute;
    z-index: 2;
    width: 80px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    right: 0;
    top: -30px;
    border: 1px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 3px;
    cursor: pointer;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 13px;
    // padding-left:
    & > div {
      margin: 5px auto;
      width: 50%;

      span:first-child {
        color: rgba(125, 135, 146, 1);
      }
      span:last-child {
        color: rgba(246, 246, 246, 1);
      }
    }
  }
}
.dialog-show-img-content {
  display: flex;
  padding-bottom: 47px;
  padding-top: 30px;
  justify-content: space-between;
  align-items: center;

  img {
    width: 524px;
    height: 484px;
  }

  .left {
    transform-origin: center;
    transform: rotate(180deg);
  }

  .left,
  .right {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
</style>
