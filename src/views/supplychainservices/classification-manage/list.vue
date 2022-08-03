<!--供应链服务-分类管理-->

<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>
    <div class="select-list">
      <div class="select-list-l">
        <MySearch
          :searchField="searchField"
          :form="form"
          @search="getBusinessListReset"
        ></MySearch>
      </div>

      <div class="select-list-r">
        <!--    操作按钮样式-->
        <div class="operate-button-style">
          <div
            class="common-button"
            @click="openDialog('add')"
            title="新建二级分类"
          >
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>

    <MyTable
      :data="tableData"
      :pageNum="pageNum"
      :pageSize="pageSize"
      :tableConfig="businessManagementTable"
    >

      <template #slot_createTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <template #slot_updateTime="{ data }">
        <div>{{ getFormatTime(data) }}</div>
      </template>

      <!--是否启用-->
      <template #data_enable="{ data }">
        <el-switch :value="data.enable" @input="changeEnable(data)"></el-switch>
      </template>

      <template #data_Operate="{ data }">
        <div class="inline-button">
          <div class="update my-button" title="修改" @click="openDialog('edit', data)">
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </template>

    </MyTable>

    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getBusinessList"
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
import {businessManagementTable} from "./config";
// 接口
import {
  classificationList,
  categoryList,
  classificationEdit,
  classificationEnableValue
} from "@/api/supplychainservice";
import {getFormatTime} from "@/utils/methods";

export default {
  name: "classification-manage",
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
        {name: "分类管理", path: ""}
      ],
      // 搜索条件
      searchField: [
        {
          type: "select",
          field: "id",
          placeholder: "请选择一级类目",
          valueKey: 'label',
          option: [],
        },
        {
          type: "input",
          field: "categoryName",
          placeholder: "请输入类目名称"
        },
      ],
      form: {
        id: '',
        categoryName: "",
      },
      // 表格
      tableData: [],
      businessManagementTable,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      getFormatTime,
      // 一级类目
      categoryList: [],
    };
  },
  created() {
    this.getcategoryList();
    this.getBusinessList();
  },
  methods: {

    // 获取一级分类类目
    getcategoryList() {
      let params = {
        level: 1,
      };
      categoryList(params)
        .then(res => {
          console.log(res);
          if (res.length > 0) {
            this.searchField[0].option = res;
            this.categoryList = res;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },


    getBusinessListReset() {
      this.pageNum = 1;
      this.getBusinessList();
    },

    getBusinessList(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      // 获取选中数据
      const checklevel = this.categoryList.find(item => item.id == this.form.id);
      console.log(checklevel);

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        level: this.form.id ? 2 : 1,
        parentId: this.form.id,
        categoryName: this.form.categoryName,
      };
      classificationList(params)
        .then(res => {
          if (res != -1) {
            if (res.records && res.records.length > 0) {

              if (this.form.id) {
                this.businessManagementTable = [
                  {
                    label: "类目名称",
                    field: "categoryName"
                  },
                  {
                    label: "类目等级",
                    field: "level"
                  },
                  {
                    label: "状态",
                    slotName: "data_enable",
                  },
                  {
                    label: "修改时间",
                    field: "updateTime",
                    slotName: "slot_updateTime",
                  },
                  {
                    label: "添加时间",
                    field: "createTime",
                    slotName: "slot_createTime",
                  },
                  {
                    label: "操作",
                    slotName: "data_Operate",
                    otherConfig: {width: "120"}
                  },
                ];
              } else {
                this.businessManagementTable = [
                  {
                    label: "类目名称",
                    field: "categoryName"
                  },
                  {
                    label: "类目等级",
                    field: "level"
                  },
                  {
                    label: "添加时间",
                    field: "createTime",
                    slotName: "slot_createTime",
                  }
                ];
              }

              this.tableData = res.records.map(item => {
                return {
                  ...item,
                };
              });
            } else {
              this.tableData = [];
            }
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
        case "add":
          this.$router.push({
            path: "/ysx/classification-manage-add"
          });
          break;
        case "edit":
          this.$router.push({
            path: "/ysx/classification-manage-add",
            query: {id: data.id}
          });
          break;
        default:
          break;
      }
    },


    // 启/禁用商家
    changeEnable(data) {
      let targetIndex = null;
      this.tableData.map((item, index) => {
        if(item.id == data.id){
          targetIndex = index
        }
      })

      let newValue = data.enable ? false: true
      let params = {
        id: data.id,
        enable: newValue,
      };
      classificationEdit(params)
        .then(res => {
          if (res != -1) {
            this.tableData[targetIndex].enable = newValue
            this.$message.success("操作成功");
            this.getBusinessList();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }

  }
};
</script>

<style scoped>
.btn_auto {
  margin: 0 auto;
}
</style>
