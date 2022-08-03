<!--供应链服务-售后管理-->
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

    </div>


    <MyTable
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="aftersaleslistTabel"
    >
      <template #slotApplyTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #slotStatus="{ data }">
        <div>{{ datafiltering(data, RefundOrderStatus).label }}</div>
      </template>


      <template #data_Operate="{data}">
        <div class="inline-button">
          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
          </div>

          <div class="update my-button" v-if="data.status == 21" title="申诉处理"
               @click="openDialog('dealwith', data)">
            <i class="el-icon-coordinate"></i>
          </div>

        </div>
      </template>


    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getListData"
    ></MyPagination>

    <MyDialog
      :dialogVisible="dialogVisible"
      :title="title"
      @cancel="dialogVisible = false;"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'100px'"
          :buttonShow="true"
          @confirm="submit"
          @changeRadioValue="changeRadioValue"
          @cancel="dialogVisible = false"
        ></MyForm>
      </template>
    </MyDialog>


  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {aftersaleslistTabel} from "./config";
import {aftersalesManageList, aftersalesDealwith} from "@/api/supplychainservice";
import {getFormatTime} from "@/utils/methods";
import {datafiltering, RefundOrderStatus} from "@/utils/enum";

export default {
  name: "aftersales-manage",
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
        {name: "售后管理", path: ""},
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
          type: "input",
          field: "afterSaleNo",
          label: "",
          placeholder: "请输入售后单号"
        },
      ],
      form: {
        orderNo: "",
        merchantName: "",
        afterSaleNo: ""
      },
      // 表格
      tableData: [],
      aftersaleslistTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "input",
          label: "处理方式",
          disabled: 'disabled',
          valueLabel: "",
          valueType: "String",
          placeholder: '退款',
        },
        {
          type: "radio",
          label: "处理结果",
          valueLabel: "orderAftersaleStatus",
          option: [
            {
              label: '30',
              name: '同意退款',
            },
            {
              label: '25',
              name: '驳回申诉',
            },
          ],
        },
        {
          type: "text",
          label: "说明",
          name: '退款金额会从商家余额中返回到买家支付渠道账号',
        }
      ],
      title: "申诉处理",
      formValue: {
        orderAftersaleStatus: '30',
        platformReason: '',
      },
      getFormatTime,
      datafiltering,
      RefundOrderStatus,
      merchantOrderNo: '',
      aftersaleNo: "", //售后单号
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
        afterSaleNo: this.form.afterSaleNo,
        orderNo: this.form.orderNo,
        merchantName: this.form.merchantName,
      };
      aftersalesManageList(params)
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
            path: "/ysx/aftersales-manage-detail",
            query: {id: data.id,}
          });
          break;
        case'dealwith':
          this.dialogVisible = true;
          this.merchantOrderNo = data.merchantOrderNo;
          this.aftersaleNo = data.aftersaleNo
          break;
        default:
          break;
      }
      this.$nextTick(() => {

      });
    },


    submit() {
      console.log(this.formValue);
      let params = {
        merchantOrderNo: this.merchantOrderNo || '',
        platformReason: this.formValue.platformReason || '',
        orderAftersaleStatus: this.formValue.orderAftersaleStatus || '',
        afterSaleNo: this.aftersaleNo
      };
      aftersalesDealwith(params)
        .then(res => {
          if (res != -1) {
            this.dialogVisible = false;
            this.$message.success("提交成功");
            this.getListData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    changeRadioValue(data) {
      switch (data) {
        case'30':
          this.formList = [
            {
              type: "input",
              label: "处理方式",
              disabled: 'disabled',
              valueLabel: "",
              valueType: "String",
              placeholder: '退款',
            },
            {
              type: "radio",
              label: "处理结果",
              valueLabel: "orderAftersaleStatus",
              option: [
                {
                  label: '30',
                  name: '同意退款',
                },
                {
                  label: '25',
                  name: '驳回申诉',
                },
              ],
            },
            {
              type: "text",
              label: "说明",
              name: '退款金额会从商家余额中返回到买家支付渠道账号',
            }
          ]
          break;
        case '25':
          this.formList = [
            {
              type: "input",
              label: "处理方式",
              disabled: 'disabled',
              valueLabel: "",
              valueType: "String",
              placeholder: '退款',
            },
            {
              type: "radio",
              label: "处理结果",
              valueLabel: "orderAftersaleStatus",
              option: [
                {
                  label: '30',
                  name: '同意退款',
                },
                {
                  label: '25',
                  name: '驳回申诉',
                },
              ],
            },
            {
              type: "textarea",
              label: "驳回原因",
              maxlength: 30,
              valueLabel: 'platformReason',
              autosize: {minRows: 3},
              showwordlimit: true,
            }
          ]
          break;
        default:
          break;
      }
    },


  }
};
</script>

<style lang="less" scoped></style>
