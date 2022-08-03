<!--生态环保-环保信用分-详情-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="block">

      <el-timeline>

        <span>{{ shipName }}</span>
        <el-divider></el-divider>

        <el-timeline-item v-for="(item, index) in tableData" :key="index"
                          :timestamp="checkTime(item.createTime) == '今天'?'今天':(checkTime(item.createTime) == '昨天'?'昨天':getFormatTime(item.createTime,'dateDay'))"
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

import {creditpointsDetail} from "@/api/ecofriendly";
import {getFormatTime, checkTime} from "@/utils/methods";

export default {
  name: "environmental-credit-points-detail",
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
        {name: "生态环保", path: ""},
        {name: "环保信用分", path: "/ysx/environmental-credit-points"},
        {name: "详情", path: ""}
      ],
      // 表格
      tableData: [],
      shipName: '',
      pageNum: 1,
      pageSize: 999999,
      getFormatTime,
      checkTime,
    };
  },
  created() {
    this.shipName = this.$route.query.shipName || '';
    if (this.shipName) {
      this.getDetail();
    } else {
      this.$message.error("未获取到详情渔船名称");
    }
  },
  methods: {

    getDetail() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        shipName: this.shipName,
      };
      creditpointsDetail(params)
        .then(res => {
          if (res != -1) {
            this.tableData = res.records || [];
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
