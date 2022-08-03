<!--供应链服务-财务管理-详情-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <el-descriptions class="margin-top" :column="2">

        <el-descriptions-item :label="item.label" v-for="(item, index) in financialInfor"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>

        </el-descriptions-item>

      </el-descriptions>

      <MyForm
        ref="myForm"
        :formList="formList"
        :formValue="formValue"
        :labelWidth="'100px'"
      ></MyForm>

      <div class="confirm-button" v-if="detailData.withdrawStatus == 1">
        <el-button type="primary" @click="onSubmit()" v-preventReClick>确认处理</el-button>
      </div>

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

import {financialWithdrawalAudit} from "@/api/supplychainservice";
import {WithdrawStatus, datafiltering} from "@/utils/enum";

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
        {name: "财务管理", path: "/ysx/financial-manage"},
        {name: "财务详情", path: ""}
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      id: '',
      // 售后信息(卖家)
      financialInfor: [],
      formList: [],
      formValue: {
        withdrawStatus: '3',
      },
      detailData: [],
      WithdrawStatus,
      datafiltering,
    }
  },
  created() {
    this.detailData = this.$route.query.data || '';
    console.log(this.detailData);

    this.financialInfor = [
      {
        label: '提现单号:',
        value: this.detailData.withdrawNo || '',
      },
      {
        label: '当前状态:',
        value: this.datafiltering(this.detailData.withdrawStatus, this.WithdrawStatus).label || '',
      },
      {
        label: '提现金额:',
        value: this.detailData.withdrawMoney || '',
      },
      {
        label: '商家名称:',
        value: this.detailData.merchantName || '',
      },
      {
        label: '操作人:',
        value: this.detailData.auditUser || '',
      },
      {
        label: '收款人:',
        value: this.detailData.realName || '',
      },
      {
        label: '提现方式:',
        value: '支付宝',
      },
      {
        label: '收款账号:',
        value: this.detailData.withdrawAccount || '',
      },
    ];

    if (this.detailData.withdrawStatus == 1) {
      this.formList = [
        {
          type: "radio",
          label: "",
          valueLabel: "withdrawStatus",
          option: [
            {
              label: '3',
              name: '同意提现',
            },
            {
              label: '2',
              name: '拒绝提现',
            },
          ],
        },
      ]
    }


  },

  methods: {

    onSubmit() {
      console.log(this.formValue);
      let params = {
        id: this.detailData.id,
        withdrawStatus: this.formValue.withdrawStatus,
      };
      financialWithdrawalAudit(params)
        .then(res => {
          if (res != -1) {
            this.$message.success("提交成功");
            this.$router.push({
              path: "/ysx/financial-manage",
            });
          }
        })
        .catch(error => {
          this.$message.error(error.message);
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

/deep/ .el-descriptions-row {
  display: flex;
  justify-content: space-between;
}

/deep/ .el-descriptions-item {
  width: 50%;
}

</style>
