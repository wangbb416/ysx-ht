<!--供应链服务-商品管理-->

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
      :tableConfig="commoditylistTabel"
    >

      <template #slotGoodsCheckStatus="{ data }">
        <div>{{ datafiltering(data, Goodstatus).label }}</div>
      </template>

      <template #slotSale="{ data }">
        <div>{{ data == 1 ? '是' : '否' }}</div>
      </template>


      <template #slot_CreateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>


      <template #data_Operate="{data}">
        <div class="inline-button">


          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
          </div>

          <el-button v-if="data.goodsCheckStatus == 4" size="mini" title="同意上架" @click="chooseShelf('onshelf',data)">
            同意上架
          </el-button>

          <el-button v-if="data.goodsCheckStatus == 4" size="mini" title="拒绝上架" @click="chooseShelf('offshelf',data)">
            拒绝上架
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

import {commoditylistTabel} from "./config";
import {
  commodityManageList,
  downloadCommodityManage,
  commodityManageAgreePut,
  commodityManageRejectPut
} from "@/api/supplychainservice";
import {getFormatTime, exportXlsx} from "@/utils/methods";
import {datafiltering, Goodstatus, GoodsRemain, AutoSale} from "@/utils/enum";

export default {
  name: "commodity-manage",
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
        {name: "商品管理", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "goodsName",
          label: "",
          placeholder: "请输入商品名称"
        },
        {
          type: "select",
          field: "goodsCheckStatus",
          label: "",
          placeholder: "请选择商品状态",
          option: Goodstatus,
        },
        {
          type: "select",
          field: "sale",
          label: "",
          placeholder: "请选择是否上架",
          option: AutoSale,
        },
        {
          type: "select",
          field: "remain",
          label: "",
          placeholder: "请选择商品库存",
          option: GoodsRemain,
        },
      ],
      form: {
        goodsName: "",
        goodsCheckStatus: "",
        sale: '',
        remain: '',
      },
      // 表格
      tableData: [],
      commoditylistTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      getFormatTime,
      datafiltering,
      Goodstatus,
      GoodsRemain,
      AutoSale,
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
        goodsName: this.form.goodsName,
        goodsCheckStatus: this.form.goodsCheckStatus,
        sale: this.form.sale,
        remain: this.form.remain,
      };
      commodityManageList(params)
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
            path: "/ysx/commodity-manage-detail",
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
        page: this.pageNum,
        size: this.pageSize,
        goodsName: this.form.goodsName,
        goodsCheckStatus: this.form.goodsCheckStatus,
        sale: this.form.sale,
        remain: this.form.remain,
      };

      // 导出
      exportXlsx('商品管理', params, downloadCommodityManage);

    },

    // 上、下架
    chooseShelf(type, data) {
      let params = {id: data.id};
      switch (type) {
        case 'onshelf'://上
          commodityManageAgreePut(params)
            .then(res => {
              if (res != -1) {
                this.dialogVisible = false;
                this.$message.success("操作成功");
                this.getListData();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
          break;
        case 'offshelf'://下
          commodityManageRejectPut(params)
            .then(res => {
              if (res != -1) {
                this.dialogVisible = false;
                this.$message.success("操作成功");
                this.getListData();
              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
          break;
        default:
          break;
      }

    },


  }
};
</script>

<style lang="less" scoped></style>

