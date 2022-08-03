<!--公益活动-线下培训-详情-->

<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <div class="title">基本信息</div>
    <FieldRow :fieldList="fieldList">


      <template v-slot:img>
        <div id="qrcode" ref="qrCodeDiv"></div>
        <el-button type="text" @click="domwloadPic">下载</el-button>
      </template>

      <template v-slot:fileList>
        <div v-for="(url, index) in fileList" :key="index">
          <a :href="url" target="_blank" style="color:#3a8ee6">
            {{ url.split("/")[url.split("/").length - 1] }}
          </a>
        </div>
      </template>

      <template v-slot:imgList>
        <div class="img-list">
          <el-image
            v-for="(url, index) in imgList"
            :key="index"
            style="width: 80px; height: 80px; margin-right: 10px"
            :src="url"
            :preview-src-list="imgList"
          >
          </el-image>
        </div>
      </template>


    </FieldRow>

    <div class="title-inline">
      <div class="title">数据列表</div>
      <div class="download-button common-button" @click="downLoadFile">
        <i class="el-icon-download"></i>
      </div>
    </div>

    <MyTable
      :data="tableData"
      :tableConfig="OfflineTrainRecordDetailConfig"
      :isIndexBoo="true"
    >
      <template #data_userRole="{data}">
        <div>{{ userIdentity[data.userRole] }}</div>
      </template>

      <template #beginTime="{data}">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #endTime="{data}">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #protocol="{data}">
        <div>{{ protocolStatus[data] }}</div>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import FieldRow from "@/components/ysx/fieldRow";
import MyDialog from "@/components/base/myDialog";
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";

import QRCode from "qrcodejs2";

import {OfflineTrainRecordDetailConfig} from "./config.js";
import {offlineTrainRecordDetail, offlineTrainDownload} from "@/api/charitableactivities";
import {getFormatTime} from "@/utils/methods";
import {userIdentity} from "@/utils/enum";

export default {
  name: "",
  components: {
    MyBread,
    FieldRow,
    MyDialog,
    MyTable,
    MyPagination
  },
  data() {
    return {
      titleList: [
        {name: "公益活动", path: ""},
        {name: "线下培训", path: "/ysx/offline-train"},
        {name: "详情", path: ""}
      ],

      userIdentity,
      getFormatTime,

      // 表格
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      OfflineTrainRecordDetailConfig,

      // 详情
      id: "",
      fieldList: [],
      fileList: [],
      imgList: [],
      //二维码的数据信息
      codeContent: {type: 3},
      protocolStatus: {0: "未签署", 1: "已签署"}
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getRecordDetail();
  },

  methods: {
    getRecordDetail() {
      offlineTrainRecordDetail({id: this.id})
        .then(res => {
          if (res != -1) {
            // console.log("res: ", res);
            let baseData = res["基本数据"] || {};
            this.fileList = baseData.accessory
              ? baseData.accessory.split(",")
              : [];
            this.imgList = baseData.picture ? baseData.picture.split(",") : [];
            this.fieldList = [
              {
                label: "活动名称",
                value: baseData.name
              },
              {
                label: "组织单位",
                value: baseData.organization
              },
              {
                label: "活动地址",
                value: baseData.address
              },
              {
                label: "活动时间",
                value: `${getFormatTime(baseData.beginTime)} - ${getFormatTime(baseData.endTime)}`
              },
              {
                label: "参与人数",
                value: baseData.totalNum || 0
              },
              {
                label: "平均参与时长（分钟）",
                value: baseData.avgTime || 0
              },
              {
                label: "活动二维码",
                slot: "img"
              },
              {
                label: "附件(文件)",
                slot: "fileList"
              },
              {
                label: "附件（图片）",
                slot: "imgList",
                long: "long"
              }
            ];
            this.codeContent.id = baseData.id;
            this.$nextTick(() => {
              this.produceCode();
            });

            this.tableData = res["签到数据"] || [];
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    produceCode() {
      let strCodeContent = JSON.stringify(this.codeContent);
      new QRCode(this.$refs.qrCodeDiv, {
        text: strCodeContent,
        width: 100,
        height: 100,
        colorDark: "#333333", //二维码颜色
        colorLight: "#FFF", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      });
    },
    domwloadPic() {
      const qrcodeDiv = this.$refs.qrCodeDiv;
      const imgUrl = qrcodeDiv.getElementsByTagName("img")[0].src;
      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = "code.png";
      a.click();
    },
    downLoadFile() {
      offlineTrainDownload({id: this.id})
        .then(res => {
          if (res != -1) {
            let blob = new Blob([res]);
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            let a = document.createElement("a");
            a.href = href;
            a.setAttribute("download", "签到记录.xlsx");
            document.body.appendChild(a);
            a.click();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.everyone {
  line-height: 28px;
  margin-top: 20px;
}

.notes {
  font-size: 12px;
  color: red;
}

.value {
  display: flex;
}

.pic-list {
  width: 100px;
  flex-shrink: 0;
  margin-right: 10px;
}

/deep/ #qrcode {
  img {
    border: solid 1px #fff;
  }
}

.img-list {
  display: flex;
  flex-wrap: wrap;
}

.title {
  font-size: 18px;
  font-weight: 600;
}

.title-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.download-button {
  display: inline-block;
  padding: 8px 15px;
  border-radius: 5px;
}

/deep/ .long {
  width: 600px !important;
}
</style>
