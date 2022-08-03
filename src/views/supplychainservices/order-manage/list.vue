<!--供应链服务-订单管理-->
<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getSearchData"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div class="common-button" title="下载" @click="downLoad">
            <i class="el-icon-download"></i>
          </div>
        </div>
      </div>
    </div>


    <MyTable
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="orderlistTabel"
    >

      <template #slotMerchantOrderStatus="{ data }">
        <div>{{ datafiltering(data, OrderStatus).label }}</div>
      </template>

      <template #slotCreateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #data_Operate="{data}">
        <div class="inline-button">

          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
          </div>

          <el-button v-if="data.saleStatus == 0&&data.merchantOrderStatus == 60" size="mini" title="手动完成订单"
                     @click="orderManually(data)">
            手动完成订单
          </el-button>

          <el-button v-if="data.orderMerchantAccount == 0&&data.merchantOrderStatus == 100" size="mini" title="手动订单入账"
                     @click="orderEntry(data)">
            手动订单入账
          </el-button>

        </div>

      </template>


    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getListData"
    ></MyPagination>

  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {orderlistTabel} from "./config";
import {ordermanageList, downloadOrderManage, getOrderManually, getOrderEntry} from "@/api/supplychainservice";
import {getFormatTime, exportXlsx} from "@/utils/methods";
import {OrderStatus, datafiltering,} from "@/utils/enum";

export default {
  name: "order-manage",
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
        {name: "供应链服务", path: ""},
        {name: "订单管理", path: ""},
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "orderNo",
          label: "",
          placeholder: "请输入订单编号"
        },
        {
          type: "input",
          field: "merchantName",
          label: "",
          placeholder: "请输入商家名称"
        },
        {
          type: "select",
          field: "status",
          label: "",
          placeholder: "请选择订单状态",
          option: OrderStatus,
        },
      ],
      form: {
        orderNo: "",
        merchantName: "",
        status: "",
      },
      // 表格
      tableData: [],
      orderlistTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      getFormatTime,
      datafiltering,
      OrderStatus,
    };
  },
  created() {
    this.getListData();
  },
  methods: {

    getSearchData() {
      this.pageNum = 1;
      this.getListData();
    },

    getListData(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.form.status,
        orderNo: this.form.orderNo,
        merchantName: this.form.merchantName,
      };
      ordermanageList(params)
        .then(res => {
          if (res != -1) {
            this.tableData = res.records || [];
            this.total = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    openDialog(type, data = null) {

      switch (type) {
        case'detail':
          this.$router.push({
            path: "/ysx/order-manage-detail",
            query: {id: data.id,}
          });
          break;
        default:
          break;
      }
      this.$nextTick(() => {

      });
    },

    downLoad() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.form.status,
        orderNo: this.form.orderNo,
        merchantName: this.form.merchantName,
      };

      // 导出
      exportXlsx('订单管理', params, downloadOrderManage);

    },

    // 手动完成订单
    orderManually(data) {

      let params = {
        merchantOrderNo: data.merchantOrderNo,
      };
      getOrderManually(params)
        .then(res => {
          if (res != -1) {
            this.$message.success("操作成功");
            this.getListData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    // 手动订单入账
    orderEntry(data) {

      let params = {
        merchantOrderNo: data.merchantOrderNo,
      };
      getOrderEntry(params)
        .then(res => {
          if (res != -1) {
            this.$message.success("操作成功");
            this.getListData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });

    },

  }
};
</script>

<style lang="less" scoped></style>
