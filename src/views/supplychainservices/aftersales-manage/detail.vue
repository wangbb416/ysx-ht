<!--供应链服务-售后管理-详情-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单信息</span>
      </div>

      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item :label="item.label" v-for="(item, index) in aftersalesOrderInfor"
                              :key="index">
          <span v-if="!item.imgShow" class="tionsCont">{{ item.value }}</span>
          <span class="my-button" v-if="item.btn" @click="openDialog('jump',item.id)">查看订单</span>

          <!--凭证-->
          <div class="img-list" v-if="item.imgShow">
            <el-image
              style="width: 100px; height: 100px"
              v-for="(url, index) in item.valueList"
              :key="index"
              :src="url"
              :preview-src-list="item.valueList">
            </el-image>
          </div>

        </el-descriptions-item>
      </el-descriptions>

      <MyTable
        :data="tableData"
        :pageNum="pageNum"
        :pageSize="pageSize"
        :spanMethod="spanMethod"
        :tableConfig="aftersalesDetaillistTabel"
      >
      </MyTable>


    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商家信息(卖家)</span>
      </div>

      <el-descriptions class="margin-top" :column="2">

        <el-descriptions-item :label="item.label" v-for="(item, index) in afterSellerInfor"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>

      </el-descriptions>

    </el-card>


    <el-card class="box-card" v-if="detailData.complainTime">
      <div slot="header" class="clearfix">
        <span>用户申诉({{ stateTitle }})</span>
      </div>

      <el-descriptions class="margin-top" :column="2">

        <el-descriptions-item :label="item.label" v-for="(item, index) in userAppealInfor"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>

      </el-descriptions>

      <el-button size="mini" v-if="detailData.status == 21" @click="openDialog('dealwith')">急速处理
      </el-button>


    </el-card>


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
          :labelWidth="'120px'"
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

import {aftersalesDetaillistTabel} from "./config";
import {aftersalesManageDetail, aftersalesDealwith} from "@/api/supplychainservice";
import {getFormatTime} from "@/utils/methods";
import {datafiltering, PayType, RefundReasonType} from "@/utils/enum";

export default {
  name: "detail",
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
        {name: "售后管理", path: "/ysx/aftersales-manage"},
        {name: "售后详情", path: ""}
      ],
      pageNum: 1,
      pageSize: 999999,
      total: 0,
      tableData: [],
      aftersalesDetaillistTabel,
      id: '',
      // 订单信息
      aftersalesOrderInfor: [],
      // 售后信息(卖家)
      afterSellerInfor: [],
      // 用户申诉
      userAppealInfor: [],
      stateTitle: '已处理',

      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "input",
          label: "处理方式",
          disabled: 'disabled',
          valueLabel: "content",
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
      detailData: {},
      PayType,
      RefundReasonType,
      datafiltering,
    }

  },
  created() {
    this.id = this.$route.query.id || '';
    if (this.id) {
      this.getDetailData();
    }
  },

  methods: {

    getDetailData() {
      let params = {
        id: this.id,
      };
      aftersalesManageDetail(params)
        .then(res => {
          if (res != -1) {

            this.detailData = res;

            console.log(res);

            // 订单信息
            this.aftersalesOrderInfor = [
              {
                label: '退款单号:',
                value: this.detailData.aftersaleNo || '',
              },
              {
                label: '订单编号:',
                value: this.detailData.merchantOrderNo || '',
                btn: true,
                // 查看订单Id
                id: this.detailData.orderMerchantId || '',
              },
              {
                label: '退款时间:',
                value: getFormatTime(this.detailData.refundTime) || '',
              },
              {
                label: '支付时间:',
                value: getFormatTime(this.detailData.orderPayTime) || '',
              },
              {
                label: '退款金额:',
                value: this.detailData.totalMoney || '',
              },
              {
                label: '支付方式:',
                value: datafiltering(this.detailData.orderPayType > 0 ? this.detailData.orderPayType : 1, PayType).label || '',
              },
              {
                label: '退款原因:',
                value: datafiltering(this.detailData.refundReasonType, RefundReasonType).label || '',
              },
              {
                label: '退款说明:',
                value: this.detailData.refundReason || '',
              },
              {
                label: '退款凭证:',
                imgShow: true,
                valueList: this.detailData.refuntPicurls ? this.detailData.refuntPicurls.split(',') : '',
              },
            ];

            // 售后信息(卖家)
            this.afterSellerInfor = [
              {
                label: '店铺名称:',
                value: this.detailData.merchantName || '',
              },
              {
                label: '处理结果:',
                value: this.detailData.merchantHandleStatusStr || '',
              },
              {
                label: '处理时间:',
                value: getFormatTime(this.detailData.merchantHandleTime) || '',
              },
              {
                label: '拒绝原因:',
                value: this.detailData.merchantReason || '',
              },
            ];


            // 用户申诉
            this.userAppealInfor = [
              {
                label: '申诉原因:',
                value: this.detailData.complainReason || '',
              },
              {
                label: '申诉时间:',
                value: getFormatTime(this.detailData.complainTime) || '',
              },
              {
                label: '处理结果:',
                value: this.detailData.platformHandleStatusStr || '',
              },
              {
                label: '处理时间:',
                value: getFormatTime(this.detailData.platformHandleTime) || '',
              },
              {
                label: '驳回原因:',
                value: this.detailData.platformReason || '',
              },
            ];

            this.tableData = this.detailData.childOrderList || [];


          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    spanMethod({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 4) {
        return {
          rowspan: 10,
          colspan: 1
        };
      }
    },

    submit() {
      console.log(this.formValue);
      let params = {
        merchantOrderNo: this.detailData.merchantOrderNo || '',
        platformReason: this.formValue.platformReason || '',
        orderAftersaleStatus: this.formValue.orderAftersaleStatus || '',
        afterSaleNo: this.detailData.aftersaleNo || '',
      };
      aftersalesDealwith(params)
        .then(res => {
          if (res != -1) {
            this.dialogVisible = false;
            this.$message.success("提交成功");
            this.getDetailData();
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

    openDialog(type, data) {
      switch (type) {
        case'dealwith':
          this.dialogVisible = true;
          break;
        case'jump':
          this.$router.push({
            path: "/ysx/order-manage-detail",
            query: {id: data,}
          });
          break;
        default:
          break;
      }
      this.$nextTick(() => {

      });
    },


  },

}
</script>

<style lang="less" scoped>

.box-card {
  margin-bottom: 20px;
}

/deep/ table {
  width: 100%;
}

/deep/ .tionsCont {
  margin: 0 10px;
}

/deep/ .my-button {
  margin-left: 20px;
}

/deep/ .el-descriptions-row {
  display: flex;
  justify-content: space-between;
}

/deep/ .el-descriptions-item {
  width: 50%;
}
</style>
