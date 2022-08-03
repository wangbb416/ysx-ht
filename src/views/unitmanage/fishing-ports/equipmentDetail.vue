<!--单位管理-渔港列表-详情-设备详情-->
<template>
  <div class="detail_content">
    <MyBread :titleList="titleList"></MyBread>
    <div class="group_cell">
      <div class="detail_box">
        <div class="detail_cell">
          <div class="item">
            <span class="tit">设备序列号：</span>
            <span class="con">{{ deviceDetail.serialNo }}</span>
          </div>
          <div class="item">
            <span class="tit">当前归属：</span>
            <span class="con">{{ deviceDetail.companyName }}</span>
          </div>
          <div class="item">
            <span class="tit">绑定时间：</span>
            <span class="con">{{ deviceDetail.createTimeStr }}</span>
          </div>
        </div>
        <div class="detail_cell">
          <div class="item">
            <span class="tit">设备型号：</span>
            <span class="con">{{ deviceDetail.versionName }}</span>
          </div>
          <div class="item">
            <span class="tit">设备状态：</span>
            <span class="con">{{ deviceDetail.deviceStatusStr }}</span>
          </div>
          <div class="item">
            <span class="tit">经度：</span>
            <span class="con">{{ deviceDetail.lat }}</span>
          </div>
          <div class="item">
            <span class="tit">纬度：</span>
            <span class="con">{{ deviceDetail.log }}</span>
          </div>
        </div>
        <div class="detail_cell">
          <div class="item">
            <span class="tit">在线状态：</span>
            <span class="con">{{ deviceDetail.onlineStatusStr }}</span>
          </div>
          <div class="item">
            <span class="tit">设备地址：</span>
            <span class="con"
              >{{ deviceDetail.address }} <br />{{
                deviceDetail.detailAddress
              }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyBread from "@/components/base/myBread";
import { equipmentDetails } from "@/api/unitManagement";
import { dateGrain, formatterLatLog } from "@/utils/methods";
import { deviceStatusType, onlineStatusType } from "@/utils/enum";
export default {
  name: "fishing-ports-list-equipmentDetail",
  components: {
    MyBread
  },
  data() {
    return {
      itemId: "",
      titleList: [
        { name: "单位管理", path: "" },
        { name: "设备列表", path: "" },
        { name: "设备详情", path: "" }
      ],
      deviceDetail: {
        serialNo: "",
        companyName: "",
        createTimeStr: "",
        versionName: "",
        deviceStatusStr: "",
        lat: "",
        log: "",
        onlineStatusStr: "",
        address: "",
        detailAddress: ""
      }
    };
  },
  created() {
    this.itemId = this.$route.query.itemId;
    this.getDeviceDetail();
  },
  methods: {
    getDeviceDetail() {
      equipmentDetails(this.itemId, {
        deviceId: this.itemId
      })
        .then(res => {
          if (res != -1) {
            this.deviceDetail.serialNo = res.serialNo;
            this.deviceDetail.companyName = res.companyName;
            let stObj = dateGrain(res.createTime);
            this.deviceDetail.createTimeStr = res.createTime
              ? `${stObj["dateYear"]}-${stObj["dateMonth"]}-${stObj["dateDay"]} ${stObj["dateHours"]}:${stObj["dateMinute"]}`
              : "-";
            this.deviceDetail.versionName = res.versionName;
            this.deviceDetail.deviceStatusStr =
              deviceStatusType[res.deviceStatus];
            let locArr = [];
            if (res.gpsLocation) {
              locArr = formatterLatLog(res.gpsLocation);
            }
            this.deviceDetail.lat = res.gpsLocation && locArr[0];
            this.deviceDetail.log = res.gpsLocation && locArr[1];
            // (res.gpsLocation && res.gpsLocation[1]) || "";
            this.deviceDetail.onlineStatusStr =
              onlineStatusType[res.onlineStatus];
            this.deviceDetail.address = `${res.province} ${res.city} ${res.area} ${res.street}`;
            this.deviceDetail.detailAddress = res.address;
            // this.deviceDetail = {
            //   serialNo: data.serialNo,
            //   versionName: data.versionName,
            //   versionType: data.versionType,
            //   onlineStatus: __ONLINESTATUS__[data.onlineStatus],
            //   companyName: data.companyName,
            //   deviceStatus: __DEVICESTATUS__[data.deviceStatus],
            //   address:
            //   detailAddress: data.address,
            //   createTime: data.createTime,
            //   lat: data.gpsLocation && locArr[0],
            //   log: data.gpsLocation && locArr[1]
            // };
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
.detail_content {
  padding-bottom: 100px;
  .group_cell {
    margin-bottom: 10px;
  }
}
.detail_box {
  display: flex;
  justify-content: space-between;
  .item {
    display: flex;
    margin-bottom: 20px;
    .tit {
      width: 110px;
      flex-shrink: 0;
      text-align: right;
    }
  }
}
</style>
