<!--公益活动-线下培训-修改-->

<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="uploadUrl"
      :limit="limitFiles"
      :before-upload="handlebeforeUpload"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :show-file-list="false"
      :file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">
        {{ fileTypeMsg }}，且不超过 {{ fileSize }} M
      </div>
    </el-upload>

    <div class="pic-list" v-for="(item, index) in fileList" :key="index">
      <div class="item">
        <i class="el-icon-document"></i>
        <a style="color: #409eff; margin: 0px 20px 0px 10px" :href="item.url">
          {{ item.name }}
        </a>
        <i class="el-icon-close" @click="handleRemove(index)"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    limitFiles: {
      type: Number,
      default: 10000
    },
    fileSize: {
      type: Number
    },
    fileType: {
      type: Array,
      default: () => []
    },
    fileTypeMsg: String,
    fileList: Array
  },
  data() {
    return {
      // fileList: []
    };
  },
  computed: {
    uploadUrl() {
      return `${process.env.api}/files/action/uploadName`;
    }
  },
  methods: {
    handlebeforeUpload(file) {
      console.log("handlebeforeUpload");
      let size = file.size / 1024 / 1024;
      if (size > this.fileSize) {
        this.$message.error(`文件大小超过${this.fileSize}M`);
        return false;
      }
      let type = file.type;
      if (this.fileType.length && !this.fileType.includes(type)) {
        this.$message.error(this.fileTypeMsg);
        return false;
      }
    },
    handleExceed(files, fileList) {
      console.log("handleExceed");
      this.$message.warning(
        `当前限制选择 ${this.limitFiles} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    handleSuccess(res) {
      console.log("res: ", res);
      if (res.code == 200) {
        let imgLen = res.data.split("/");
        this.fileList.push({name: imgLen[imgLen.length - 1], url: res.data});
      } else {
        this.$message.error(res.msg);
      }
    },

    handleRemove(index) {
      console.log("handleRemove", this.fileList, index);
      this.fileList.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.pic-list {
  margin-top: 10px;
}

.item {
  /deep/ i.el-icon-close {
    display: none;
  }
}

.item:hover {
  /deep/ i.el-icon-close {
    display: inline-block;
  }
}

.item {
  display: flex;
  align-content: center;
}

i.el-icon-document {
  line-height: 20px;
}

/deep/ .el-upload-dragger {
  background-color: #191c21;
}

.upload-demo {
  text-align: center;
}
</style>
