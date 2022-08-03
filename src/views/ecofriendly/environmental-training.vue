<!--生态环保-环保培训-->
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
          <div class="common-button" title="新增" @click="openDialog('add')">
            <i class="el-icon-plus"></i>
          </div>

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
      :isIndexBoo="true"
      :tableConfig="trainingTabel"
    >
      <template #slotType="{ data }">
        <div>{{ data ? (data.type == 1 ? "图文" : "视频") : "" }}</div>
      </template>

      <template #slotupdateTime="{ data }">
        <div>{{ getFormatTime(data ? data.updateTime : "") }}</div>
      </template>

      <template #data_Manage="{ data }">
        <el-button
          size="mini"
          :type="data.status == 1 ? 'info' : ''"
          :plain="data.status == 1 ? 'plain' : ''"
          :disabled="data.status == 1"
          @click="releaseManage('release', data)"
        >发布
        </el-button>
        <el-button
          size="mini"
          :type="data.status == 0 ? 'info' : ''"
          :plain="data.status == 0 ? 'plain' : ''"
          :disabled="data.status == 0"
          @click="releaseManage('withdraw', data)"
        >撤回
        </el-button>
      </template>

      <template #data_Operate="{ data }">
        <div class="inline-button">
          <div class="detail my-button" title="详情" @click="openDialog('detail', data)">
            <i class="el-icon-document"></i>
          </div>

          <div class="delete my-button" title="删除" @click="openDialog('del', data)">
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
      @cancel="dialogVisible = false;"
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
          @changeDate="changeDateType"
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

import {trainingTabel} from "./config";
import {
  environmentaltrainingList,
  checkEnvironmentaltrainingAdd,
  downloadenvironmentaltraining,
  environmentaltrainingDelete,
  releaseEnvironmentaltraining
} from "@/api/ecofriendly";
import {exportXlsx, getFormatTime} from "@/utils/methods";
import {MaterialType} from "@/utils/enum";

export default {
  name: "environmental-training",
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
      MaterialType,
      titleList: [
        {name: "生态环保", path: ""},
        {name: "环保培训", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "content",
          label: "",
          value: "",
          placeholder: "请输入资料名称"
        },
        {
          type: "select",
          field: "type",
          label: "",
          value: "",
          placeholder: "请选择资料类型",
          option: MaterialType
        }
      ],
      form: {
        content: "",
        type: ""
      },
      // 表格
      tableData: [],
      trainingTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 弹框
      dialogVisible: false,
      confirmButton: true,
      formList: [
        {
          type: "input",
          label: "资料名称",
          valueLabel: "content",
          valueType: "String"
        },
        {
          type: "select",
          label: "资料类型",
          valueLabel: "type",
          option: MaterialType
        },
        {
          type: "upload",
          action: process.env.api + "/files/action/upload",
          uploadTypetitle: "只能上传PDF/MP4文件,且不超过100M",
          label: "",
          limit: 1,
          multiple: 0,
          valueLabel: "path"
        }
      ],
      title: "资料上传",
      formValue: {
        content: "",
        type: "",
        path: []
      },
      rules: {
        content: [
          {required: true, message: "请输入资料名称", trigger: "blur"}
        ],
        path: [
          {
            type: "array",
            required: true,
            message: "请上传文件",
            trigger: "blur"
          }
        ],
        type: [{required: true, message: "请选择资料类型", trigger: "blur"}]
      },
      // isAdd: false,
      studyType: 2 //1安全自治    2生态环保    3公益活动
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    // 上传文件前校验
    beforeAvatarUpload(file) {
      const isfileType =
        file.type === "application/pdf" || file.type === "video/mp4";
      const sizeLimit = file.size / 1024 / 1024 < 100;
      if (!isfileType || !sizeLimit) {
        this.$message.error("上传文件不符合要求");
      } else {
        if (file.type === "application/pdf") {
          // 图文 1
          this.formValue.type = 1;
        } else {
          // 视频 2
          this.formValue.type = 2;
        }
        this.formValue.path.push({
          name: file.name,
          uid: file.uid,
          status: 1
        });
      }
      return isfileType && sizeLimit;
    },
    changeDateType() {
      this.formValue.path = [];
    },
    getSearchData() {
      this.pageNum = 1;
      this.getListData();
    },
    getListData(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        studyType: this.studyType,
        content: this.form.content,
        type: this.form.type
      };
      environmentaltrainingList(params)
        .then(res => {
          this.tableData = res.records || [];
          this.total = res.total || 0;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    // 增删改查
    openDialog(type, data = null) {
      switch (type) {
        case "add":
          this.dialogVisible = true;
          this.showForm = true;
          // this.isAdd = true;
          this.formValue.content = "";
          this.formValue.type = "";
          this.formValue.path = [];
          break;
        case "del":
          this.$confirm("确认删除？")
            .then(_ => {
              environmentaltrainingDelete({id: data.id})
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
        case "detail":
          window.open(data.path, "_blank");
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
        content: this.form.content,
        type: this.form.type,
        studyType: this.studyType
      };

      // 导出
      exportXlsx("环保培训记录", params, downloadenvironmentaltraining);
    },

    submit() {
      console.log(this.formValue);
      let params = {
        path: this.formValue.path[0].url,
        content: this.formValue.content,
        type: this.formValue.type,
        studyType: this.studyType
      };
      checkEnvironmentaltrainingAdd(params)
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

    // 发布管理
    releaseManage(type, data) {
      let params = {id: data.id};
      switch (type) {
        case "release":
          params.opCode = "1";
          break;
        case "withdraw":
          params.opCode = "0";
          break;
        default:
          break;
      }
      releaseEnvironmentaltraining(params)
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
    }
  }
};
</script>

<style lang="less" scoped></style>
