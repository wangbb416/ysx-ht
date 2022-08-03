<!--运营管理-角色列表-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getSearchData()"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div class="common-button" title="新增" @click="addOperation">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="rolelistTabel"
      :isIndexBoo="true"
    >
      <!-- 非原有账号显示删除操作 -->
      <template #data_Operate="{ data }">
        <div class="inline-button" v-if="data.ifOriginal == 0">
          <div class="delete my-button" title="删除" @click="deleteOperation(data.roleId)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </template>
    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getRolesData"
    ></MyPagination>

    <MyDialog
      :dialogVisible="showDialog"
      :title="'新增角色'"
      :confirmButton="true"
      @cancel="showDialog = false"
      @confirm="addRolesData"
    >
      <template v-slot:content>
        <MyForm
          :formList="addRoleFormList"
          :formValue="addRoleFormValue"
          :rules="addRoleRules"
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

import {rolelistTabel} from "./config";
import {getRolesNew, deleteRoles, addRoles} from "@/api/operationmanage";

export default {
  name: "fishing-vessel-pollution",
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
        {name: "运营管理", path: ""},
        {name: "角色列表", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "input",
          field: "roleName",
          label: "角色名称",
          value: "",
          placeholder: "请输入"
        }
      ],
      form: {
        roleName: ""
      },
      // 表格
      tableData: [],
      rolelistTabel,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 删除操作
      id: "",
      // 添加操作
      showDialog: false,
      addRoleFormList: [
        {
          type: "input",
          label: "角色名称",
          valueLabel: "roleName",
          valueType: "String"
        }
      ],
      addRoleFormValue: {roleName: ""},
      addRoleRules: {
        roleName: [{required: true, message: "请输入", trigger: "blur"}]
      }
    };
  },
  created() {
    this.getRolesData();
  },
  methods: {
    getSearchData() {
      this.pageNum = 1;
      this.getRolesData();
    },
    getRolesData(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {pageNum: this.pageNum, pageSize: this.pageSize};
      for (let [k, v] of Object.entries(this.form)) {
        if (v) {
          params[k] = v;
        }
      }

      getRolesNew(params)
        .then(res => {
          // console.log("res: ", res);
          if (res != -1) {
            this.tableData = res.records || [];
            this.total = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    deleteOperation(id) {
      this.id = id;
      this.$confirm("本角色相关的一切内容将被删除，是否继续？")
        .then(_ => {
          this.deleteRolesData();
        })
        .catch(_ => {
        });
    },

    deleteRolesData() {
      deleteRoles(this.id)
        .then(res => {
          if (res != -1) {
            this.$message.success("删除成功");
            if (this.tableData.length == 1 && this.pageNum > 1) {
              this.pageNum--;
            }
            this.getRolesData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    addOperation() {
      this.showDialog = true;
    },
    addRolesData() {
      addRoles(this.addRoleFormValue)
        .then(res => {
          if (res != -1) {
            this.showDialog = false;
            this.$message.success("新增成功");
            this.getRolesData();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.inline-button {
  justify-content: space-around;
}
</style>
