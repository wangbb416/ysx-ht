<!--生态环保-政策相关-->
<template>
  <div>
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

          <div class="common-button" title="新增" @click="openDialog('add',)">
            <i class="el-icon-plus"></i>
          </div>

          <div class="common-button" title="下载" @click="downLoad">
            <i class="el-icon-download"></i>
          </div>

        </div>
      </div>

    </div>


    <MyTable :data="tableData" :pageNum="pageNum" :pageSize="pageSize" :isIndexBoo="true" :tableConfig="policyrelatedTabel">

      <template #slotpath="{ data }">
        <div class="cursor cell el-tooltip" @click="clickEvent('jumpNewpage',data.path)">{{ data.path }}</div>
      </template>

      <template #slotpolicyType="{ data }">
        <div>{{ data.source == 1 ? '其他' : '浙江省农业农村厅' }}</div>
      </template>

      <template #slotupdateTime="{ data }">
        <div>{{ getFormatTime(data.updateTime) }}</div>
      </template>


      <template #data_Operate="{ data }">
        <div class="inline-button">
          <div class="delete my-button" title="删除" @click="openDialog('del',data)">
            <i class="el-icon-delete"></i>
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
      @cancel="dialogVisible = false;apiNumber = 0"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="formList"
          :formValue="formValue"
          :labelWidth="'120px'"
          :rules="rules"
          :buttonShow="true"
          @confirm="submit"
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

import {policyrelatedTabel} from "./config";
import {policyrelatedList, policyrelatedAdd, downloadpolicyrelated, policyrelatedDelete} from "@/api/ecofriendly";
import {exportXlsx, getFormatTime} from "@/utils/methods";
import {SourceType} from "@/utils/enum";

export default {
  name: "policy-related",
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
      getFormatTime,
      SourceType,
      titleList: [
        {name: "生态环保", path: ""},
        {name: "政策相关", path: ""}
      ],
      // 搜索条件
      searchField: [
        {type: "input", field: "content", label: "", value: "", placeholder: "请输入标题"},
        {type: "select", field: "source", label: "", value: "", placeholder: "请选择来源", option: SourceType},
      ],
      form: {
        content: "",
        source: "",
      },
      // 表格
      tableData: [],
      policyrelatedTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "input",
          label: "链接标题",
          valueLabel: "content",
          valueType: "String"
        },
        {
          type: "input",
          label: "链接地址",
          valueLabel: "path",
          valueType: "String"
        },
        {
          type: "select",
          label: "来源",
          valueLabel: "source",
          option: SourceType,
        },

      ],
      title: '政策上传',
      formValue: {
        content: "",
        path: "",
        source: ""
      },
      rules: {
        content: [{required: true, message: "请输入", trigger: "blur"}],
        path: [{required: true, message: "请输入", trigger: "blur"}],
        source: [{required: true, message: "请选择", trigger: "blur"}]
      },
      policyType: 2,
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
        policyType: this.policyType,
        content: this.form.content,
        source: this.form.source,
      };
      policyrelatedList(params)
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

    // 增删改查
    openDialog(type, data) {
      switch (type) {
        case 'add':
          this.dialogVisible = true;
          this.showForm = true;
          this.formValue.content = '';
          this.formValue.path = '';
          this.formValue.source = '';
          break;
        case'del':
          this.$confirm("确认删除？")
            .then(_ => {
              policyrelatedDelete({id: data.id})
                .then(res => {
                  console.log(res);
                  if (res != -1) {
                    this.$message.success("删除成功");
                    if (this.tableData.length == 1 && this.pageNum > 1) {
                      this.pageNum--;
                    }
                    this.getListData();
                  }
                })
                .catch(error => {
                  this.$message.error(error.message);
                });
            })
            .catch(_ => {
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
        policyType: this.policyType,
        content: this.form.content,
        source: this.form.source,
      };

      // 导出
      exportXlsx('政策相关', params, downloadpolicyrelated);

    },

    submit() {
      console.log(this.formValue);
      let params = {
        policyType: this.policyType,
        content: this.formValue.content,
        source: this.formValue.source,
        path: this.formValue.path,
      };
      policyrelatedAdd(params)
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

    clickEvent(type, data) {
      switch (type) {
        case'jumpNewpage':
          window.open(data, '_blank');
          break;
        default:
          break;
      }
    },


  }
};
</script>

<style lang="less" scoped>
</style>

