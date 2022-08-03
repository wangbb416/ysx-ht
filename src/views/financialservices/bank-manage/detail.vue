<!--金融服务-银行管理-附件-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <MyTable :data="tableData" :isIndexBoo="true" :tableConfig="bankmanageDetailTabel">


      <template #data_Operate="{ data }">
        <div class="inline-button">

          <div class="update my-button" @click="downLoad(data)">
            <i class="el-icon-download"></i>
          </div>

        </div>
      </template>

    </MyTable>


  <div class="reset_area">
        <!-- 文件上传 -->
    <el-upload class="upload-component"
               drag
               :action="action"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload"
               multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">*只能上传PDF/Docx/Doc/Xlsx/Xls/PPTX/PPT文件</div>
    </el-upload>

    <el-button type="primary" @click="onSubmit()" v-preventReClick>提交</el-button>
  </div>

  </div>
</template>

<script>
import MyBread from "@/components/base/myBread";
import FieldRow from "@/components/ysx/fieldRow";
import MyTable from "@/components/base/myTable";

import {bankmanageUpdate} from "@/api/financialservices";
import {bankmanageDetailTabel} from "./config";

export default {
  name: "",
  components: {
    MyBread,
    FieldRow,
    MyTable,
  },
  data() {
    return {
      titleList: [
        {name: "金融服务", path: ""},
        {name: "银行管理", path: "/ysx/bank-manage"},
        {name: "附件", path: ""}
      ],
      action: process.env.api + '/files/action/upload',
      itemId:'',
      accessory:[],
      // 表格
      tableData: [],
      bankmanageDetailTabel,
    };
  },
  created() {
    this.itemId = this.$route.query.itemId || '';
    this.tableData = JSON.parse(this.$route.query.dataArr) || [];
    this.accessory = JSON.parse(this.$route.query.dataArr) || [];
  },
  methods: {
    onSubmit() {
      let params = {
        id: this.itemId,
        accessory: JSON.stringify(this.accessory),
      };
      if(this.itemId && this.accessory && this.accessory.length>0){
        bankmanageUpdate(params)
          .then(res => {
            if (res != -1) {
              console.log(res);
              this.$message.success("提交成功");

              this.$router.push({
                path: "/ysx/bank-manage",
              });

            }
          })
          .catch(error => {
            this.$message.error(error.message);
          });
      }else{
        if(!this.itemId){
          this.$message.warning('id丢失');
        }else{
          this.$message.warning('请先上传文件');
        }
      }
    },


    downLoad(data) {

      const aLink = document.createElement('a');
      aLink.style.display = 'none';
      aLink.href = data.path;
      aLink.target = '_target';
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink); // 下载完成移除元素

    },


    // 上传图片
    handleAvatarSuccess(res) {
      console.log(res)
      if (res.code == 200) {
        console.log('文件', res);

        this.accessory.push({
          path: res.data,
        });

      } else {
        this.$message.error(res.msg || "上传失败");
      }
    },


    // 上传文件前校验
    beforeAvatarUpload(file) {
      console.log(file.type);

      const isfileType = file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || file.type === 'application/vnd.ms-powerpoint';

      if (!isfileType) {
        this.$message.error('上传文件不符合要求');
      }

      return isfileType;
    },


  }
};
</script>

<style lang="less" scoped>
.reset_area{
  display: flex;
  flex-direction: column;
  align-items: center;
  .upload-component{
    margin-top:24px;
  }
  .el-button{
    margin-top:18px;
  }
}
</style>
