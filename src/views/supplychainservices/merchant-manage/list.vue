<!--供应链服务-商家管理-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getBusinessListReset"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div
            class="common-button"
            @click="openDialog('add')"
            title="新建商家"
          >
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :isIndexBoo="true"
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="businessManagementTable"
    >

      <template #slotMainBusiness="{ data }">
        <div>{{ datafiltering(data, MainBusiness).label }}</div>
      </template>

      <template #slotUpdateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #slotCreateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <!--是否启用-->
      <template #data_enable="{ data }">
        <el-switch v-model="data.enable" active-value="1" inactive-value="0" @change="changeStatus(data)"></el-switch>
      </template>


      <template #data_Operate="{ data }">
        <div
          class="btn_auto update my-button"
          title="修改"
          @click="openDialog('edit', data)"
        >
          <i class="el-icon-edit"></i>
        </div>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getBusinessList"
    ></MyPagination>
  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import {businessManagementTable} from "./config";
// 接口
import {merchantList, changeStatusValue} from "@/api/supplychainservice";
import {getFormatTime} from "@/utils/methods";
import {datafiltering, MainBusiness} from "@/utils/enum";

// import axios from "axios";

export default {
  name: "merchant-manage",
  components: {
    MyBread,
    MySearch,
    MyTable,
    MyPagination,
  },
  data() {
    return {
      titleList: [
        {name: "供应链服务", path: ""},
        {name: "商家管理", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "merchantName",
          placeholder: "请输入商家名称"
        }
      ],
      form: {
        merchantName: ""
      },
      // 表格
      tableData: [],
      businessManagementTable,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      getFormatTime,
      datafiltering,
      MainBusiness,
    };
  },
  created() {
    this.getBusinessList();
  },
  methods: {
    getBusinessListReset() {
      this.pageNum = 1;
      this.getBusinessList();
    },
    getBusinessList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      // axios({
      //   method: 'get',
      //   headers: {
      //     "Content-Type": "application/json",
      //     client: "web",
      //     token: localStorage.getItem("token"),
      //   },
      //   url: 'http://192.168.1.168:9088/shopUser/merchant/page',
      //   timeout: 30000,
      //   data: ''
      // }).then(res => {
      //   console.log(res.data.data.records);
      //   if (res.data.code == 200) {
      //     var resdata = res.data.data.records;
      //     if (resdata && resdata.length > 0) {
      //       this.tableData = resdata.map(item => {
      //         return {
      //           ...item,
      //         };
      //       });
      //     }
      //   } else {
      //   }
      // }).catch(error => {
      // })

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        merchantName: this.form.merchantName,
      };
      merchantList(params)
        .then(res => {
          console.log(res);
          if (res != -1) {
            var resdata = res.records;
            if (resdata && resdata.length > 0) {
              this.tableData = resdata.map(item => {
                return {
                  ...item,
                };
              });
            } else {
              this.tableData = [];
            }
            this.total = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    // 增删改查
    openDialog(type, data = null) {
      switch (type) {
        case "add":
          this.$router.push({
            path: "/ysx/merchant-manage-add"
          });
          break;
        case "edit":
          this.$router.push({
            path: "/ysx/merchant-manage-add",
            query: {id: data.id}
          });
          break;
        default:
          break;
      }
    },

    // 启/禁用商家
    changeStatus(data) {
      let params = {
        id: data.id,
        enable: data.enable * 1,
      };
      changeStatusValue(params)
        .then(res => {
          if (res != -1) {

            this.$message.success("操作成功");
            this.getBusinessList();

          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }


  }
};
</script>

<style scoped>
.btn_auto {
  margin: 0 auto;
}
</style>
