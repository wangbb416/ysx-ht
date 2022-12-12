<template>
  <div class="enterprise_page_detail" id="EnterpriseManageDetail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="车辆管理" name="first">
        <VehicleManege
          ref="vehicleManege"
          :companyId="id"
          :tabelHeigth="tabelHeigth"
        ></VehicleManege>
      </el-tab-pane>
      <el-tab-pane label="司机管理" name="second">
        <DriverManege
          ref="driverManege"
          :companyId="id"
          :tabelHeigth="tabelHeigth"
        ></DriverManege>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import VehicleManege from "../vehicleManege/VehicleManege.vue";
import DriverManege from "../driverManege/DriverManege.vue";

export default {
  name: "",
  components: {
    VehicleManege,
    DriverManege,
  },
  data() {
    return {
      id: "",
      activeName: "first",
      tabelHeigth: 420, // 表格初始化高度
    };
  },
  created() {
    if (!this.$route.query.id) {
      this.$message.error("未获取到运输公司");
    } else {
      this.id = Number(this.$route.query.id);
    }
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
        document.querySelector("#EnterpriseManageDetail").offsetHeight - 310;
      // console.log(document.querySelector("#EnterpriseManageDetail").offsetHeight )
    });
    window.onresize = () => {
      let contentDom = document.querySelector("#EnterpriseManageDetail");
      let contentHeight = contentDom ? contentDom.offsetHeight || 0 : 0;
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 310;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
  },
  methods: {
    handleClick() {
      if (this.activeName === "first") {
        this.$refs.vehicleManege.page = 1
        this.$refs.vehicleManege.getTableData()
      } else if (this.activeName === "second") {
        this.$refs.driverManege.page = 1
        this.$refs.driverManege.getTableData()
      }
    },
  },
};
</script>

<style lang="less" scoped>
.enterprise_page_detail {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.1);
  padding: 32px 24px 78px 32px;
}
</style>
