<!--公益活动-宣教记录-详情-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <FieldRow :fieldList="fieldList" :fieldStyle="fieldStyle"></FieldRow>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import FieldRow from "@/components/ysx/fieldRow";

import {publicityrecordDetail} from "@/api/charitableactivities";
import {getFormatTime, continueDateTime} from "@/utils/methods";

export default {
  name: "",
  components: {
    MyBread,
    FieldRow
  },
  data() {
    return {
      titleList: [
        {name: "公益活动", path: ""},
        {name: "宣教记录", path: "/ysx/publicity-record"},
        {name: "详情", path: ""}
      ],
      // 详情
      id: "",
      fieldList: [],
      fieldStyle: 'block',
      companyType: ""
    };
  },
  created() {
    this.id = this.$route.query.id || '1';
    if (this.id) {
      this.getDetail();
    } else {
      this.$message.error("未获取到详情id");
    }
  },
  methods: {
    getDetail() {
      let params = {id: this.id};
      publicityrecordDetail(params)
        .then(res => {
          if (res != -1) {
            console.log(res);
            this.fieldList = [
              {
                label: "资料名称",
                value: res.content,
                operate: true,
                operateTitle: '查看',
                clickEvent: 'jumpNewpage',
                data: res.path,
              },
              {
                label: "资料类型",
                value: res.type == 1 ? '图文' : '视频',
              },
              {
                label: "累计时长",
                value: continueDateTime(res.endTime - res.startTime)
              },
              {
                label: "开始时间",
                value: getFormatTime(res.startTime)
              },
              {
                label: "结束时间",
                value: res.endTime ? getFormatTime(res.endTime) : '无数据'
              },
            ];
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
</style>

