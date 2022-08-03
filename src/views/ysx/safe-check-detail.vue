<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <FieldRow :fieldList="fieldList"></FieldRow>
    <div
      class="pic"
      v-for="(item, index) in picFile.filter(k =>
        k.account.includes(companyType)
      )"
      :key="index"
    >
      <div class="everyone">
        <div class="title">{{ item.label }}：</div>
        <div class="notes">{{ item.notes }}</div>
        <div class="value" v-if="item.picList.length">
          <div
            class="pic-list"
            v-for="(url, index) in item.picList"
            :key="index"
          >
            <el-image
              style="width: 100px; height: 100px; margin-right: 10px"
              :src="url.url"
              :preview-src-list="item.picList.map(i => i.url)"
            ></el-image>
          </div>
        </div>
        <!-- <div else class="txt">无图片</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import FieldRow from "@/components/ysx/fieldRow";

import { securityCheckRecordDetail } from "@/api";
import { picFile } from "./config.js";

export default {
  name: "",
  components: {
    MyBread,
    FieldRow
  },
  data() {
    return {
      titleList: [
        { name: "渔省心", path: "" },
        { name: "安全核查记录", path: "/ysx/safe-check" },
        { name: "自查记录详情", path: "" }
      ],
      // 详情
      id: "",
      fieldList: [],
      picFile,
      companyType: ""
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getSecurityCheckRecordDetail();
    } else {
      this.$message.error("未获取到详情id");
    }
  },
  methods: {
    getSecurityCheckRecordDetail() {
      securityCheckRecordDetail(this.id)
        .then(res => {
          if (res != -1) {
            console.log(res);
            this.fieldList = [
              {
                label: "渔船名称",
                value: res.companyName
              },
              {
                label: "渔船负责人姓名",
                value: res.nickname
              },
              {
                label: "渔船负责人手机号",
                value: res.mobile
              },
              {
                label: "录入时间",
                value: res.insertTime
              },
              {
                label: "录入人姓名",
                value: res.createUser
              },
              {
                label: "最后修改时间",
                value: res.updateTime
              },
              {
                label: "最后修改人姓名",
                value: res.updateUser
              }
            ];
            this.companyType = res.companyType;
            this.picFile.forEach(item => {
              let name = item.name;
              if (res.hasOwnProperty(name)) {
                let pic = res[name]
                  ? res[name].split(",").filter(item => item.length > 0)
                  : [];
                item.picList = pic.map(item => {
                  return { url: item };
                });
              }
            });
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
.everyone{
  line-height: 28px;
  margin-top: 20px;
}
.notes{
  font-size: 12px;
  color: red;
}
.value{
  display: flex;
}
.pic-list {
  width: 100px;
  flex-shrink: 0;
  margin-right: 10px;

}
</style>
