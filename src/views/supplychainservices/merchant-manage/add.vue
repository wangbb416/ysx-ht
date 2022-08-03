<!--供应链服务-商家管理-新增/修改-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <MyForm
        ref="recipientInforform"
        :rules="recipientInforRules"
        :formList="recipientInfor"
        :formValue="recipientInforform"
        :labelWidth="'120px'"
      ></MyForm>


    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册信息</span>
      </div>

      <MyForm
        ref="businessInforform"
        :rules="businessInforRules"
        :formList="businessInfor"
        :formValue="businessInforform"
        :labelWidth="'120px'"
      ></MyForm>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>收货地址</span>
      </div>

      <MyForm
        ref="orderInforform"
        :rules="orderInforRules"
        :formList="orderInfor"
        :formValue="orderInforform"
        @changeDate="changeSelect"
        :labelWidth="'120px'"
      ></MyForm>

    </el-card>

    <div class="confirm-button">
      <el-button type="primary" @click="onSubmit(['recipientInforform','businessInforform','orderInforform'])"
                 v-preventReClick>保存
      </el-button>
      <el-button @click="onCancel()">取消</el-button>
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

import {dockdataDetail, merchantAdd, merchantUpdate, merchantDetail} from "@/api/supplychainservice";
import {RegisterType, MainBusiness} from "@/utils/enum";

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
        {name: "商家管理", path: "/ysx/merchant-manage"},
        {name: "新增", path: ""}
      ],
      id: '',
      // 基本信息
      recipientInfor: [
        {
          type: 'input',
          label: '商家名称',
          valueLabel: "merchantName",
          valueType: 'String',
          maxlength: 10,
        },
        {
          type: 'select',
          label: '主营业务',
          valueLabel: "mainBusiness",
          option: MainBusiness,
        },
        {
          type: 'input',
          label: '联系人',
          valueLabel: "merchantContacts",
          valueType: 'String',
          maxlength: 10,
        },
        {
          type: "dynamic-select", valueLabel: "regionCode", label: "商家地址", value: "", placeholder: "请选择地址",
          props: {
            checkStrictly: true,
          }
        },
        {
          type: 'input',
          label: '联系电话',
          valueLabel: "courierPhone",
          valueType: 'String',
          maxlength: 11,
        },
        {
          type: 'input',
          label: '商家详细地址',
          valueLabel: "address",
          valueType: 'String',
          maxlength: 30,
        },
      ],
      // 注册信息
      businessInfor: [
        {
          type: 'input',
          label: '注册人姓名',
          valueLabel: "registerName",
          valueType: 'String',
          maxlength: 10,
        },
        {
          type: 'select',
          label: '证件类型',
          valueLabel: "registerType",
          option: RegisterType,
        },
        {
          type: 'input',
          label: '注册人电话',
          valueLabel: "registerPhone",
          valueType: 'String',
          maxlength: 11,
        },
        {
          type: 'input',
          label: '证件号码',
          valueLabel: "registerCard",
          valueType: 'String',
          maxlength: 20,
        },
      ],
      // 收货地址
      orderInfor: [
        {
          type: 'select',
          label: '收货地点',
          valueLabel: "companyId",
          option: [],
        },
        {
          type: 'input',
          label: '收获地址经纬度',
          valueLabel: "",
          disabled: true,
          valueType: 'String',
          placeholder: '',
        },
        {
          type: 'input',
          label: '详细收货地址',
          valueLabel: "",
          disabled: true,
          valueType: 'String',
          placeholder: '',
        },
      ],
      labelWidth: '120px',
      recipientInforform: {
        merchantName: '',
        mainBusiness: '',
        merchantContacts: '',
        courierPhone: '',
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        area: '',
        areaCode: '',
        street: '',
        streetCode: '',
        address: '',
      },
      businessInforform: {
        registerName: '',
        registerPhone: '',
        registerType: '',
        registerCard: '',
      },
      orderInforform: {
        companyId: '',
      },
      // 码头数据
      dockDatalist: [],
      companyName: '',
      recipientInforRules: {

        merchantName: [
          {required: true, message: "请输入商家名称", trigger: "blur"}
        ],
        mainBusiness: [
          {required: true, message: "请选择主营业务"}
        ],
        merchantContacts: [
          {required: true, message: "请输入联系人", trigger: "blur"}
        ],
        regionCode: [
          {required: true, message: "请选择商家地址"}
        ],
        courierPhone: [
          {required: true, message: "请输入数字", trigger: "blur"},
          {
            validator: function (rule, value, callback) {
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            }, trigger: 'blur'
          },
        ],
        address: [
          {required: true, message: "请输入详细地址", trigger: "blur"}
        ],
      },
      businessInforRules: {
        registerName: [
          {required: true, message: "请输入注册人姓名", trigger: "blur"}
        ],
        registerType: [
          {required: true, message: "请选择证件类型"}
        ],
        registerPhone: [
          {required: true, message: "请输入数字", trigger: "blur"},
          {
            validator: function (rule, value, callback) {
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            }, trigger: 'blur'
          },
        ],
        registerCard: [
          {required: true, message: "请输入证件号码", trigger: "blur"}
        ],
      },
      orderInforRules: {
        companyId: [
          {required: true, message: "请选择收货地点"}
        ],
      }

    }

  },
  created() {
    this.id = this.$route.query.id || '';
    // 获取码头数据
    this.getDockData();
    if (this.id) {
      this.titleList[2].name = '修改';
    }
  },

  methods: {

    // 获取码头数据
    getDockData() {
      let params = {
        companyType: 2,//码头
        pageNum: 1,
        pageSize: 999999,
      };
      dockdataDetail(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {
              this.orderInfor[0].option = res.records;
              this.dockDatalist = res.records;

              if (this.id) {
                // 获取详情
                this.getMerchantDetail();
              }

            } else {
              this.orderInfor[0].option = [];
            }
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    // 详情
    getMerchantDetail() {
      let params = {
        id: this.id,
      };
      merchantDetail(params)
        .then(res => {
          console.log(res);
          var datas = res;

          this.recipientInforform = {
            merchantName: datas.merchantName,
            mainBusiness: datas.mainBusiness,
            merchantContacts: datas.merchantContacts,
            courierPhone: datas.courierPhone,
            province: datas.province,
            provinceCode: datas.provinceCode,
            city: datas.city,
            cityCode: datas.cityCode,
            area: datas.area,
            areaCode: datas.areaCode,
            street: datas.street,
            streetCode: datas.streetCode,
            address: datas.address,

            regionCode: datas.streetCode || datas.areaCode || datas.cityCode || datas.provinceCode || '',
          }
          this.businessInforform = {
            registerName: datas.registerName,
            registerPhone: datas.registerPhone,
            registerType: JSON.stringify(datas.registerType),
            registerCard: datas.registerCard,
          }
          this.orderInforform = {
            companyId: datas.companyId,
          }

          // 获取收获地点
          var companyItem = this.dockDatalist.find(item => item.id == datas.companyId);
          console.log(companyItem, '99999999');
          this.companyName = companyItem.companyName;
          this.orderInfor[1].placeholder = companyItem.gpsLocation;
          this.orderInfor[2].placeholder = companyItem.province + companyItem.city + companyItem.area + companyItem.street + companyItem.address;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },


    // 下拉选择事件
    changeSelect(val, type) {
      console.log(val, type, "下拉");

      if (val.companyId) {
        this.orderInforform.companyId = val.companyId;

        // 获取选中数据
        const companyItem = this.dockDatalist.find(item => item.id == val.companyId);
        this.companyName = companyItem.companyName;
        this.orderInfor[1].placeholder = companyItem.gpsLocation;
        this.orderInfor[2].placeholder = companyItem.province + companyItem.city + companyItem.area + companyItem.street + companyItem.address;
      }
    },

    onSubmit(formList) {

      var formValidate = '';
      formList.map((item, index) => {
        this.$refs[item].$children[0].validate((valid) => {
          if (valid) {
            formValidate = formValidate * 1 + 1;
          } else {
            return false;
          }
        });
      });

      console.log(formValidate);

      // 三个表单校验
      if (formValidate == 3) {

        let allform = {...this.recipientInforform, ...this.businessInforform, ...this.orderInforform};
        console.log(allform, '4444444')

        if (allform.regionALLNameList && allform.regionALLCodeList) {
          // 省
          allform.province = allform.regionALLNameList[0] || '';
          allform.provinceCode = allform.regionALLCodeList[0] || '';
          // 市
          allform.city = allform.regionALLNameList[1] || '';
          allform.cityCode = allform.regionALLCodeList[1] || '';
          // 区
          allform.area = allform.regionALLNameList[2] || '';
          allform.areaCode = allform.regionALLCodeList[2] || '';
          // 街道
          allform.street = allform.regionALLNameList[3] || '';
          allform.streetCode = allform.regionALLCodeList[3] || '';

          // delete allform.regionALLNameList;
          // delete allform.regionALLCodeList;
        }

        allform.companyName = this.companyName;

        if (this.id) {

          allform.id = this.id;

          //修改
          merchantUpdate(allform)
            .then(res => {
              if (res != -1) {

                this.$message.success("修改成功");
                this.onCancel();

              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        } else {
          //新增
          merchantAdd(allform)
            .then(res => {
              if (res != -1) {

                this.$message.success("新增成功");
                this.onCancel();

              }
            })
            .catch(error => {
              this.$message.error(error.message);
            });
        }

      }
    },

    // 取消
    onCancel() {
      this.$router.push({
        path: "/ysx/merchant-manage"
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

/deep/ .el-form-item {
  display: inline-table;
}

/deep/ .el-input, /deep/ .el-input--suffix {
  width: 600px;
}

/deep/ #formComponent .el-input .el-input__inner {
  width: 600px;
}

</style>
