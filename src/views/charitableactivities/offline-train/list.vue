<!--公益活动-线下培训-->
<template>
  <div class="offline-train">
    <MyBread :titleList="titleList"></MyBread>
    <MySearch
      :searchField="searchField"
      :form="searchForm"
      @search="getSearchData()"
    ></MySearch>

    <div class="add-button common-button" title="新增" @click="openDialog('add')">
      <i class="el-icon-plus"></i>
    </div>

    <MyTable
      :data="tableData"
      :tableConfig="OfflineTrainRecordConfig"
      :isIndexBoo="true"
    >
      <template #data_Operate="{data}">
        <div class="inline-button">
          <div class="detail my-button" title="详情" @click="openDialog('detail',data)">
            <i class="el-icon-document"></i>
          </div>
          <div class="update my-button" title="修改" @click="openDialog('edit', data)">
            <i class="el-icon-edit"></i>
          </div>
          <div class="delete my-button" title="上传" @click="openDialog('upload',data)">
            <i class="el-icon-upload2"></i>
          </div>
        </div>
      </template>
    </MyTable>
    <MyPagination
      v-model="pageNum"
      :size="pageSize"
      :total="total"
      @pageChange="getTrainRecord"
    ></MyPagination>

    <!-- 表单 -->
    <MyDialog
      :dialogVisible="showForm"
      :title="title"
      @cancel="showForm = false"
    >
      <template v-slot:content>
        <MyForm
          ref="myForm"
          :formList="addField"
          :formValue="addForm"
          :rules="addRules"
          :labelWidth="'120px'"
          :buttonShow="true"
          :buttonTitle="'确定'"
          @confirm="submit"
          @daterange="daterange"
          @cancel="showForm = false"
        ></MyForm>
      </template>
    </MyDialog>

    <!-- 上传 -->
    <MyDialog
      :dialogVisible="showUpload"
      :title="'上传'"
      :confirmButton="true"
      @cancel="showUpload = false"
      @confirm="submitUpload"
    >
      <template v-slot:content>
        <el-tabs v-model="activeName" type="card" @tab-click="selectTab">
          <el-tab-pane label="文件" name="first">
            <OfflineTrainUpload
              :limitFiles="limitFiles"
              :fileSize="fileSize"
              :fileType="fileType"
              :fileTypeMsg="fileTypeMsg"
              :fileList="fileList"
            ></OfflineTrainUpload>
          </el-tab-pane>
          <el-tab-pane label="图片" name="second">
            <OfflineTrainUpload
              :limitFiles="limitFiles"
              :fileSize="fileSize"
              :fileType="fileType"
              :fileTypeMsg="fileTypeMsg"
              :fileList="imgList"
            ></OfflineTrainUpload>
          </el-tab-pane>
        </el-tabs>
      </template>
    </MyDialog>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";
import MySearch from "@/components/base/mySearch";
import OfflineTrainUpload from "./upload";
import OfflineTrainDetail from "./detail";

import {OfflineTrainRecordConfig} from "./config.js";
import {offlineTrainRecord, offlineTrainAdd, offlineTrainEdit} from "@/api/charitableactivities";
import {getFormatTime} from "@/utils/methods";

export default {
  name: "",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MyDialog,
    MyForm,
    MySearch,
    OfflineTrainUpload,
    OfflineTrainDetail
  },
  data() {
    return {
      titleList: [
        {name: "公益活动", path: ""},
        {name: "线下培训", path: ""}
      ],
      regionType: localStorage.getItem("regionType"),
      regionCode: localStorage.getItem("regionCode"),
      // 搜索条件
      searchField: [
        {type: "input", field: "name", label: "", placeholder: "请输入活动名称"},
        {
          type: "datetimerange",
          field: "timeRange",
          label: "",
          placeholder: "请输入活动时间",
          valueFormat: "yyyy-MM-dd HH:mm:ss"
        },
        {
          type: "input", field: "organization", label: "", placeholder: "请输入组织单位",
        }
      ],
      searchForm: {
        name: "",
        timeRange: "",
        organization: ""
      },

      // 表格
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      OfflineTrainRecordConfig,

      // 表单
      id: "",
      showForm: false,
      isAdd: true,
      title: "新增",
      addField: [
        {
          type: "input",
          label: "活动名称",
          valueLabel: "name",
          valueType: "String"
        },
        {
          type: "input",
          label: "组织单位",
          valueLabel: "organization",
          valueType: "String"
        },
        {
          type: "datetimerange",
          valueLabel: "timeRange",
          label: "活动时间",
          valueFormat: "yyyy-MM-dd HH:mm:ss"
        },
        {
          type: "input",
          label: "活动地址",
          valueLabel: "address",
          valueType: "String"
        }
      ],
      addForm: {
        name: "",
        timeRange: "",
        organization: "",
        address: ""
      },
      addRules: {
        name: [{required: true, message: "请选择", trigger: "blur"}],
        timeRange: [{required: true, message: "请选择", trigger: "blur"}],
        organization: [{required: true, message: "请选择", trigger: "blur"}],
        address: [{required: true, message: "请选择", trigger: "blur"}]
      },

      // 上传文件
      showUpload: false,
      activeName: "first",
      //application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint
      // "image/png", "image/jpeg"
      limitFiles: 10000,
      fileSize: 10, //文件大小
      fileType: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.ms-excel"
      ],
      fileTypeMsg: "只能上传ppt、pdf、word、excel文件",
      imgList: [],
      fileList: [],
      beginTime: '',
      endTime: '',
    };
  },
  created() {
    this.getTrainRecord();
  },
  methods: {
    getSearchData() {
      this.pageNum = 1;
      this.getTrainRecord();
    },

    getTrainRecord(data) {
      this.pageSize = data ? data.pageSize : this.pageSize;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        regionType: this.regionType,
        regionCode: this.regionCode
      };
      for (let [k, v] of Object.entries(this.searchForm)) {
        if (k == "timeRange") {
          if (Array.isArray(v) && v.length == 2) {
            params.beginTime = v[0];
            params.endTime = v[1];
          }
        } else if (v) {
          params[k] = v;
        }
      }

      offlineTrainRecord(params)
        .then(res => {
          if (res != -1) {
            let records = res.records || [];
            records.map(item => {
              item.timeRange = `${getFormatTime(
                item.beginTime
              )} - ${getFormatTime(item.endTime)}`;
            });
            this.tableData = records;
            this.total = res.total || 0;
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    // 增删改查
    openDialog(type, data = null) {
      switch (type) {
        case 'add':
          this.isAdd = true;
          this.showForm = true;
          this.title = "新增";
          for (let key of Object.keys(this.addForm)) {
            this.addForm[key] = "";
          }
          break;
        case 'edit':
          this.isAdd = false;
          let update = this.judgeTime(data);
          if (!update) {
            return;
          }
          this.showForm = true;
          this.title = "修改";
          this.id = data.id;
          this.addForm.name = data.name;
          this.addForm.timeRange = [
            getFormatTime(data.beginTime),
            getFormatTime(data.endTime)
          ];
          this.addForm.organization = data.organization;
          this.addForm.address = data.address;
          break;
        case'detail':
          this.$router.push({
            path: "/ysx/offline-train-detail",
            query: {id: data.id}
          });
          break;
        case'upload':
          this.id = data.id;
          this.imgList = [];
          this.fileList = [];
          if (data.picture) {
            data.picture.split(",").map(url => {
              this.imgList.push({
                url: url,
                name: url.split("/")[url.split("/").length - 1]
              });
            });
          }
          if (data.accessory) {
            data.accessory.split(",").map(url => {
              this.fileList.push({
                url: url,
                name: url.split("/")[url.split("/").length - 1]
              });
            });
          }
          this.showUpload = true;
          break;
        default:
          break;
      }
      this.$nextTick(() => {

      });
    },


    judgeTime(data) {
      let now = new Date().getTime();
      if (data.endTime < now) {
        this.$message.error("活动已结束，活动信息不可修改");
        return false;
      } else if (data.beginTime < now) {
        this.$message.error("活动已开始，活动信息不可修改");
        return false;
      }
      return true;
    },

    submit() {
      let params = JSON.parse(JSON.stringify(this.addForm));
      params.beginTime = params.timeRange[0];
      params.endTime = params.timeRange[1];
      delete params.timeRange;
      console.log(params);
      if (this.isAdd) {
        offlineTrainAdd(params)
          .then(res => {
            if (res != -1) {
              this.showForm = false;
              this.$message.success("新增成功");
              this.getTrainRecord();
            }
          })
          .catch(error => {
            this.$message.error(error.message);
          });
      } else {
        params.id = this.id;
        this.editTrainRecord(params);
      }
    },

    editTrainRecord(params) {
      offlineTrainEdit(params)
        .then(res => {
          if (res != -1) {
            this.showForm = false;
            this.showUpload = false;
            this.$message.success("修改成功");
            this.getTrainRecord();
          }
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    selectTab() {
      if (this.activeName == "first") {
        this.limitFiles = 10000;
        this.fileSize = 10; //文件大小
        this.fileType = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.ms-excel"
        ];
        this.fileTypeMsg = "只能上传ppt、pdf、word、excel文件";
      } else {
        this.limitFiles = 6;
        this.fileSize = 2; //文件大小
        this.fileType = ["image/png", "image/jpeg", "image/jpg"];
        this.fileTypeMsg =
          "只能上传.png、.jpg、.jpeg文件，最少上传1张，最多上传6张";
      }
    },


    submitUpload() {
      if (this.imgList.length && this.imgList.length < 1) {
        this.$message.error("至少上传1张图片");
        return;
      }
      let params = {
        id: this.id,
        picture: this.imgList.map(item => item.url).join(","),
        accessory: this.fileList.map(item => item.url).join(",")
      };
      this.editTrainRecord(params);
    },

    // 日期范围
    daterange(data) {
      console.log(data);
      this.addForm.timeRange = data.timeRange;
    }
  }
};
</script>

<style lang="less" scoped>
.offline-train {
  position: relative;
}

.add-button {
  position: absolute;
  top: 50px;
  right: 10px;
  display: inline-block;
  padding: 8px 15px;
  border-radius: 5px;
}

.inline-button {
  display: flex;
  justify-content: space-between;
}

.my-button {
  width: 40px;
  height: 25px;
  border-radius: 5px;
  text-align: center;
  color: #fff;
}
</style>
