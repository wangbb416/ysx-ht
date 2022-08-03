<!--供应链服务-分类管理-新增/修改-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <MyForm
        ref="myForm"
        :rules="recipientInforRules"
        :formList="recipientInfor"
        :formValue="recipientInforForm"
        :labelWidth="'120px'"
      ></MyForm>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品主样图&轮播图</span>
      </div>

      <MyForm
        ref="myForm"
        :formList="orderInfor"
        :formValue="orderInforForm"
        :labelWidth="'120px'"
        @scopedslot="scopedslot"
        @deleteImage="deleteImage"
      ></MyForm>
    </el-card>

    <div class="confirm-button">
      <el-button type="primary" @click="onSubmit()" v-preventReClick
        >保存</el-button
      >
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

import {
  classificationDetail,
  classificationAdd,
  classificationEdit,
  categoryList
} from "@/api/supplychainservice";

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
        { name: "供应链服务", path: "" },
        { name: "分类管理", path: "/ysx/classification-manage" },
        { name: "新建二级分类", path: "" }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      detailData: [],
      id: "",

      // 基本信息
      recipientInfor: [
        {
          type: "input",
          label: "类目名称",
          value: "",
          valueLabel: "categoryName",
          valueType: "String",
          maxlength: 10
        },
        {
          type: "select",
          label: "父级类目:",
          value: "",
          valueLabel: "parentId",
          option: []
        },
        {
          type: "switch",
          label: "是否启用",
          valueLabel: "enable"
        }
      ],
      recipientInforForm: {
        categoryName: "",
        parentId: "",
        enable: false
      },

      // 商品主样图&轮播图
      orderInfor: [
        {
          type: "scopedslot-upload",
          label: "",
          action: process.env.api + "/files/action/upload",
          limit: 1,
          multiple: 0,
          valueLabel: "categoryLogo",
          removeShow: false,
          imgShow: true
        }
      ],
      orderInforForm: {
        categoryLogo: []
      },
      level: 1,
      categoryList: [],

      recipientInforRules: {
        categoryName: [
          { required: true, message: "请输入类目名称", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "请选择父级类目", trigger: "change" }
        ]
      }
      // orderInforRules: {
      //   categoryLogo: [
      //     {required: true, message: "请选择商品主样图&轮播图", trigger: "change"}
      //   ],
      // }
    };
  },
  computed: {
    title() {
      return this.id ? "修改二级分类" : "新建二级分类";
    }
  },
  created() {
    this.id = this.$route.query.id || "";
    this.getcategoryList();

    if (this.id) {
      this.titleList[2].name = "修改二级分类";
      //修改的时候暂时把一级类目禁用掉，和产品确认过，如果不需要，删除下面一行即可
      this.recipientInfor[1].disabled = true;
      this.getdetailData();
    }
  },

  methods: {
    // 获取一级分类类目
    getcategoryList() {
      let params = {
        level: 1
      };
      categoryList(params)
        .then(res => {
          console.log(res);
          if (res.length > 0) {
            this.recipientInfor[1].option = res;
            this.categoryList = res;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    // 详情
    getdetailData() {
      let params = {
        id: this.id
      };
      classificationDetail(params)
        .then(res => {
          console.log(res);
          this.detailData = res || [];
          this.recipientInforForm = {
            categoryName: this.detailData.categoryName || "",
            parentId: this.detailData.parentId || "",
            enable: this.detailData.enable || false
          };
          this.orderInforForm = {
            categoryLogo: this.detailData.categoryLogo
              ? [this.detailData.categoryLogo]
              : []
          };
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        return {
          rowspan: 10,
          colspan: 1
        };
      }
    },

    // 上传图片样式二
    scopedslot(data) {
      console.log(data, "6666666");
      // this.orderInfor[0].show = false;
      // this.orderInforForm.categoryLogo = [];
      this.orderInforForm.categoryLogo = data ? [data[0].response.data] : [];
    },

    deleteImage(index) {
      this.orderInforForm.categoryLogo = [];
    },

    onSubmit() {
      let allform = {
        categoryLogo: this.orderInforForm.categoryLogo.length ? this.orderInforForm.categoryLogo[0] : "",
        ...this.recipientInforForm
      };
      // console.log(allform);
      if (allform.categoryName && allform.parentId) {
        if (this.id) {
          allform.id = this.id;

          //修改
          classificationEdit(allform)
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
          classificationAdd(allform)
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
      } else {
        this.$message.error("信息不全");
      }
    },

    // 取消
    onCancel() {
      this.$router.push({
        path: "/ysx/classification-manage"
      });
    }
  }
};
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

/deep/ .el-input,
/deep/ .el-input--suffix {
  width: 600px;
}

/deep/ #formComponent .el-input .el-input__inner {
  width: 600px;
}

/deep/ #formComponent .el-form .el-form-item__content {
  display: flex;
}
</style>
