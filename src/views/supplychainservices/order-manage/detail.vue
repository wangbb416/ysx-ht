<!--订单管理-订单列表-详情-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单编号：{{ detailDatas.merchantOrderNo }}</span>
      </div>
      <el-steps :active="detailDatas.statusList?detailDatas.statusList.length:1" align-center>
        <el-step :title="item.statusName" :icon="item.icon" v-for="(item, index) in orderState"
                 :key="index"></el-step>
      </el-steps>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>收货人信息</span>
      </div>

      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item :label="item.label" v-for="(item, index) in recipientInfor"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>
      </el-descriptions>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商家信息</span>
      </div>

      <el-descriptions class="margin-top" :column="2">

        <el-descriptions-item :label="item.label" v-for="(item, index) in businessInfor"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>

      </el-descriptions>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>订单信息</span>
      </div>

      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item :label="item.label" v-for="(item, index) in orderInfor"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>
      </el-descriptions>

      <MyTable
        :data="tableData"
        :pageNum="pageNum"
        :pageSize="pageSize"
        :spanMethod="spanMethod"
        :tableConfig="orderDetaillistTabel"
      >

        <template #slotOrderChildStatus="{ data }">
          <div>{{ datafiltering(data, OrderStatus).label }}</div>
        </template>

      </MyTable>


    </el-card>

  </div>

</template>


<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {orderDetaillistTabel} from "./config";
import {ordermanageDetail} from "@/api/supplychainservice";
import {OrderStatus, datafiltering, PayType} from "@/utils/enum";
import {getFormatTime} from "@/utils/methods";

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
        {name: "订单管理", path: "/ysx/order-manage"},
        {name: "订单详情", path: ""}
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      orderDetaillistTabel,
      id: '',
      // 订单状态
      orderState: [],
      // 收货人信息
      recipientInfor: [],
      // 商家信息
      businessInfor: [],
      //订单信息
      orderInfor: [],
      detailData: [],
      OrderStatus,
      datafiltering,
      getFormatTime,
      detailDatas: {},
      PayType,
    }

  },
  created() {
    this.id = this.$route.query.id || '';

    if (this.id) {
      this.getDetailData();
    }
  },

  methods: {

    // 详情
    getDetailData() {
      let params = {
        id: this.id,
      };
      ordermanageDetail(params)
        .then(res => {
          if (res != -1) {
            this.detailDatas = res;

            // 支付状态： payStep			  0：待支付  1：已支付
            // 发货状态：	sendStep			0：待发货  1：已发货
            // 签收状态：	signStep			0：待签收  1：已签收
            // 完成状态：	finishStep				      1：已完成
            // 取消状态：	cancelStep 				      1：已取消
            // 退款：		refundStep		0：退款中  1：已退款

            var orderStateAll = this.detailDatas.statusList || [];
            orderStateAll.map((item, index, array) => {
              switch (item.stepName) {
                case'payStep':
                case'sendStep':
                case'signStep':
                case'finishStep':
                  if (item.status == 1) {
                    item.icon = 'el-icon-circle-check'
                  } else {
                    item.icon = 'el-icon-loading'
                  }
                  break;
                case'cancelStep':
                  item.icon = 'el-icon-circle-close'
                  break;
                case'refundStep':
                  if (item.status == 1) {
                    item.icon = 'el-icon-circle-close'
                  } else {
                    item.icon = 'el-icon-warning-outline'
                  }
                  break;
                default:
                  break;
              }
            });
            this.orderState = orderStateAll;

            this.orderInfor = [
              {
                label: '下单时间:',
                value: getFormatTime(this.detailDatas.createTime) || '',
              },
              {
                label: '支付时间:',
                value: getFormatTime(this.detailDatas.payTime) || '',
              },
              {
                label: '支付方式:',
                value: this.detailDatas.orderPayType ? this.datafiltering(this.detailDatas.orderPayType, PayType).label : '',
              },
              {
                label: '支付单号:',
                value: this.detailDatas.orderPayNo || '',
              },
            ]
            console.log(this.detailDatas.orderPayType)


            // 收货人信息
            this.recipientInfor = [
              {
                label: '姓名:',
                value: this.detailDatas.consignee || '',
              },
              {
                label: '手机号:',
                value: this.detailDatas.consigneePhone || '',
              },
            ]

            // 商家信息
            if (this.detailDatas.merchant) {
              this.businessInfor = [
                {
                  label: '商家名称:',
                  value: this.detailDatas.merchant.merchantName || '',
                },
                {
                  label: '商家地址:',
                  value: this.detailDatas.merchant.province + this.detailDatas.merchant.city + this.detailDatas.merchant.area + this.detailDatas.merchant.street || '',
                },
                {
                  label: '联系人:',
                  value: this.detailDatas.merchant.merchantContacts || '',
                },
                {
                  label: '详细地址:',
                  value: this.detailDatas.merchant.address || '',
                },
                {
                  label: '联系电话:',
                  value: this.detailDatas.merchant.courierPhone || '',
                },
                {
                  label: '收货地点:',
                  value: this.detailDatas.merchant.companyName || '',
                },
              ]
            }
          }

          this.tableData = this.detailDatas.childOrderList || [];


        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    spanMethod({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 5) {
        return {
          rowspan: 10,
          colspan: 1
        };
      }
    }


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

/deep/ .el-descriptions-row {
  display: flex;
  justify-content: space-between;
}

/deep/ .el-descriptions-item {
  width: 50%;
}

</style>
