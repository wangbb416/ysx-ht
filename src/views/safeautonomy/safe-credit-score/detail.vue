<!--安全自治-安全信用分-详情-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="block">

      <el-timeline>

        <span>{{ companyName }}</span>
        <el-divider></el-divider>

        <el-timeline-item v-for="(item, index) in tableData" :key="index"
                          :timestamp="checkTime(item.illegalDateTime) == '今天'?'今天':(checkTime(item.illegalDateTime) == '昨天'?'昨天':getFormatTime(item.illegalDateTime,'dateDay'))"
                          placement="top">
          <el-card>

            <div>
              <h4>{{ item.behavior }} {{ item.value }}分</h4>
            </div>

          </el-card>

        </el-timeline-item>

      </el-timeline>
    </div>


  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {safecreditscoreDetail} from "@/api/safeautonomy";
import {getFormatTime, checkTime} from "@/utils/methods";

export default {
  name: "safe-credit-score-detail",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch,
    MyDialog,
    MyForm
  },
  data() {
    return {
      titleList: [
        {name: "安全自治", path: ""},
        {name: "安全信用分", path: "/ysx/safe-credit-score"},
        {name: "详情", path: ""}
      ],
      // 表格
      tableData: [],
      companyName: '',
      getFormatTime,
      checkTime,
    };
  },
  created() {
    this.companyName = this.$route.query.companyName || '';
    if (this.companyName) {
      this.getDetail();
    } else {
      this.$message.error("未获取到详情渔船名称");
    }
  },
  methods: {

    getDetail() {
      let params = {
        companyName: this.companyName,
      };
      safecreditscoreDetail(params)
        .then(res => {
          if (res != -1) {
            this.tableData = res || [];
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
</style>
