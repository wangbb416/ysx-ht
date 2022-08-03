<template>
  <div id="formComponent">
    <div class="title" v-if="title">{{ title }}</div>
    <el-form
      ref="form"
      size="small"
      :model="formValue"
      :rules="rules"
      :label-width="labelWidth"
      :inline="inline"
    >
      <el-form-item
        v-for="(item, index) in formList"
        :key="index"
        :label="item.label"
        :prop="item.valueLabel"
      >
        <!--输入框-->
        <el-input
          v-if="item.type == 'input' && item.valueType == 'String'"
          v-model="formValue[item.valueLabel]"
          :disabled="item.disabled"
          :maxlength="item.maxlength || ''"
          :minlength="item.minlength || ''"
          :placeholder="item.placeholder || '请输入' + item.label"
        ></el-input>
        <el-input
          v-if="item.type == 'input' && item.valueType == 'interger'"
          v-model.number="formValue[item.valueLabel]"
          :disabled="item.disabled"
          :maxlength="item.maxlength || ''"
          :minlength="item.minlength || ''"
          :placeholder="item.placeholder || '请输入' + item.label"
        ></el-input>

        <!-- 日期时间选择器 -->
        <div class="block" v-if="item.type == 'dateTime'">
          <el-date-picker
            v-model="formValue[item.valueLabel]"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="item.placeholder || '选择日期时间'"
          >
          </el-date-picker>
        </div>

        <!-- 日期选择器 -->
        <div class="block" v-if="item.type == 'date'">
          <el-date-picker
            v-model="formValue[item.valueLabel]"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="item.placeholder || '选择日期'"
          >
          </el-date-picker>
        </div>

        <!--时间-->
        <el-date-picker
          v-if="['daterange', 'datetimerange'].includes(item.type)"
          v-model="formValue[item.valueLabel]"
          :type="item.type"
          :value-format="item.valueFormat"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleValue"
        >
        </el-date-picker>

        <!-- 下拉框-选择之后无联动操作 -->
        <el-select
          v-if="item.type == 'select'"
          v-model="formValue[item.valueLabel]"
          :disabled="item.disabled"
          filterable
          :placeholder="item.placeholder || '请选择' + item.label"
          @change="changeSelect(formValue[item.valueLabel], item.valueLabel)"
        >
          <el-option
            v-for="opt in item.option"
            :label="opt.label || opt.companyName || opt.categoryName"
            :key="opt.value || opt.id"
            :value="opt.value || opt.id"
          >
          </el-option>
        </el-select>

        <!-- 多行文本 -->
        <el-input
          v-if="item.type == 'textarea'"
          type="textarea"
          :autosize="item.autosize"
          :maxlength="item.maxlength || ''"
          :minlength="item.minlength || ''"
          :show-word-limit="item.showwordlimit || false"
          :placeholder="item.placeholder || '请输入' + item.label"
          v-model="formValue[item.valueLabel]"
        >
        </el-input>

        <!-- 文件上传 -->
        <el-upload
          v-if="item.type == 'upload'"
          class="upload-component"
          drag
          ref="my-upload"
          :limit="item.limit || 9"
          :action="item.action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed"
          :multiple="item.multiple == 0 ? false : true"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            {{ item.uploadTypetitle }}
            <div class="file_list">
              <div
                class="file_item"
                v-for="(picObj, idx) of formValue[item.valueLabel]"
                :key="idx"
              >
                <div class="tit">{{ picObj.name }}</div>
                <el-button
                  v-if="picObj.status == 1"
                  class="btn"
                  type="primary"
                  :loading="true"
                ></el-button>
                <el-button
                  @mouseenter.native="hoverSuccessEnter(idx)"
                  v-if="picObj.status == 2"
                  class="btn"
                  type="primary"
                  icon="el-icon-check"
                ></el-button>
                <el-button
                  @click="handleRemove(idx)"
                  @mouseleave.native="hoverSuccessLeave(idx)"
                  v-if="picObj.status == 3"
                  class="btn"
                  type="primary"
                  icon="el-icon-close"
                ></el-button>
              </div>
            </div>
          </div>
        </el-upload>

        <!--文件上传-样式二-->
        <div
          class="demo-image__preview scopedslotImg"
          v-if="
            item.type == 'scopedslot-upload' &&
              item.imgShow &&
              formValue[item.valueLabel]
          "
        >
          <div v-for="(item, index) in formValue[item.valueLabel]" :key="index" class="image-dispaly">
            <el-image
              style="width: 148px; height: 148px"
              :src="item"
              :preview-src-list="formValue[item.valueLabel]"
              :z-index="index"
            >
            </el-image>

            <div class="image-delete" @click.stop="deleteImage(index)">
              <i class="el-icon-circle-close"></i>
            </div>
          </div>
        </div>

        <!-- <div>{{ formValue[item.valueLabel].length }} - {{ item.limit }}</div> -->
        <el-upload
          v-if="item.type == 'scopedslot-upload' && formValue[item.valueLabel].length<item.limit"
          :limit="item.limit || 9"
          :action="item.action"
          :show-file-list="false"
          list-type="picture-card"
          :on-success="handleslotAvatarSuccess"
          accept=".jpg,.jpeg,.png"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>

        <!--滑块-->
        <el-switch
          v-if="item.type == 'switch'"
          v-model="formValue[item.valueLabel]"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="item.activeValue"
          :inactive-value="item.inactiveValue"
        >
        </el-switch>

        <!--省市区 动态下拉-->
        <el-cascader
          v-if="item.type == 'dynamic-select'"
          ref="myCascader"
          v-model="formValue[item.valueLabel]"
          :options="areaJson"
          @change="changeArea"
          :props="item.props"
          :placeholder="item.placeholder || '请选择' + item.label"
          :show-all-levels="item.showLevels"
          clearable
        ></el-cascader>

        <!--单选框-->
        <el-radio-group
          v-if="item.type == 'radio'"
          v-model="formValue[item.valueLabel]"
          @change="changeRadio"
        >
          <el-radio
            v-for="(s_item, s_index) in item.option"
            :key="s_index"
            :label="s_item.label"
          >
            {{ s_item.name }}
          </el-radio>
        </el-radio-group>

        <!--描述-->
        <div v-if="item.type == 'text'">{{ item.name }}</div>

        <!-- 文章编辑器 -->
        <!-- <edit v-if="item.type == 'article'" ref="editor" :editorTxt="formValue[item.valueLabel]" @submit-txt="value => handleArticle(value, item.valueLabel)"></edit> -->
      </el-form-item>

      <div v-if="buttonShow" class="confirm-button">
        <el-button type="primary" @click="onSubmit()" v-preventReClick>
          {{ buttonTitle }}
        </el-button>
        <el-button @click="$emit('cancel')">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
/**
 formList: [
 {
    type: 'input',          //el-form-item的类型
    label: '入港多少次变黄',  //字段名称
    valueLabel: 'inPortTimesToYellow',  //字段传值名称
    valueType: 'String',     //字段值类型
  },
 ]
 */

import areaJson from "@/components/base/area.json";
import areaParentJson from "@/components/base/areaParent.json";

export default {
  name: "myForm",
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    formList: {
      type: Array
    },
    formValue: {
      type: Object
    },
    rules: {
      type: Object,
      default: () => {
      }
    },
    labelWidth: {
      type: String,
      default: "80px"
    },
    inline: {
      type: Boolean,
      default: false
    },
    buttonTitle: {
      type: String,
      default: "确认"
    },
    buttonShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status: 1,
      areaJson: areaJson,
      areaParentJson: areaParentJson,
      defaultValue: [] //[330000, 331000, 331022]
      // dialogImageUrl: '',
      // dialogVisible: false,
      // disabled: false
    };
  },
  methods: {
    onSubmit() {
      let check = true;
      let pathType =
        Object.prototype.toString.call(this.formValue.path).search("Array") ==
        8;
      if (pathType && this.formValue.path && this.formValue.path.length > 0) {
        for (let index = 0; index < this.formValue.path.length; index++) {
          if (!this.formValue.path[index].url) {
            this.$message.warning("文件正在上传");
            check = false;
            break;
          }
        }
      }
      if (check) {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(valid, "提交表单");
            this.$emit("confirm", this.formValue); // this.clickFlag = true
            // 清除历史上传文件列表
            if (this.$refs["my-upload"]) {
              this.$refs["my-upload"][0].clearFiles();
            }
          }
        });
      }
    },

    // 省-市-区
    changeArea(val) {
      console.log(val);
      const regionALLList = this.$refs["myCascader"][0].getCheckedNodes()[0];
      this.setDefaultValue(String(val[val.length - 1]));
      this.changeData({
        regionCode: val[val.length - 1],
        regionType: val.length,
        regionName: regionALLList.label,
        regionALLCodeList: val,
        regionNameList: regionALLList.pathLabels
      });
    },
    changeData(obj) {
      console.log(obj);
      this.formValue.regionCode = obj.regionCode;
      this.formValue.regionType = obj.regionType;
      this.formValue.regionName = obj.regionName;
      this.formValue.regionALLCodeList = obj.regionALLCodeList;
      this.formValue.regionALLNameList = obj.regionNameList;
    },
    setDefaultValue(selectValue) {
      let parent = areaParentJson[selectValue].split(",");
      this.defaultValue = [];
      Object.values(parent).map((item, index) => {
        if (item) {
          this.$set(this.defaultValue, index, Number(item));
        }
      });
    },

    // 上传图片
    handleAvatarSuccess(res, file, fileList) {
      console.log("308", res);
      if (res.code == 200) {
        // this.$refs["my-upload"][0].clearFiles(); //上传成功之后清除历史记录
        this.formValue.path.forEach((item, index) => {
          if (item.uid == file.uid) {
            this.formValue.path[index].url = res.data;
            this.formValue.path[index].status = 2;
          }
        });
      } else {
        this.$message.error(res.msg || "上传失败");
      }
    },
    hoverSuccessEnter(index) {
      this.formValue.path[index].status = 3;
    },
    hoverSuccessLeave(index) {
      this.formValue.path[index].status = 2;
    },
    // 移除文件
    handleRemove(index) {
      this.formValue.path.splice(index, 1);
    },
    // 上传文件前校验
    beforeAvatarUpload(file) {
      return this.$parent.$parent.$parent.beforeAvatarUpload(file);
    },

    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      console.log("刘在帆2", files);
      console.log("刘在帆3", fileList);
      this.$message.warning(
        `超过最大限制上传个数，本次选择了 ${files.length} 个文件`
      );
    },

    // 下拉选择事件
    changeSelect(val, type) {
      console.log(val, type, "下拉选择事件");
      if (this.$refs["my-upload"]) {
        this.$refs["my-upload"][0] && this.$refs["my-upload"][0].clearFiles();
      }
      this.$emit("changeDate", this.formValue); // this.clickFlag = true
    },

    // 日期范围
    handleValue() {
      this.$emit("daterange", this.formValue);
    },

    // 单选切换
    changeRadio(data) {
      this.$emit("changeRadioValue", data);
    },

    // 上传图片-样式二
    handleslotAvatarSuccess(res, file, fileList) {
      // console.log(res);
      // console.log(file);
      // console.log(fileList);
      if (res.code == 200) {
        this.$emit("scopedslot", fileList);
      } else {
        this.$message.error(res.msg || "上传失败");
      }
    },

    deleteImage(index) {
      this.$emit("deleteImage", index);
    },

    // // 放大
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // // 下载
    // handleDownload(file) {
    //   console.log(file);
    // },

    // 移除
    handleslotRemove(file) {
      console.log(file);
      this.$emit("scopedslot", "");
    }
  }
};
</script>

<style lang="less">
#formComponent {
  .title {
    font-size: 20px;
    margin: 10px 0 30px 0;
  }

  form.el-form.el-form--inline {
    margin-bottom: 50px;
    border: dashed 0.5px #8c8e90;
    border-radius: 5px;
    padding: 40px 0;
  }

  .el-textarea.el-input--small,
  input.el-input__inner {
    width: 300px;
  }

  .confirm-button {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  textarea.el-textarea__inner {
    width: 300px;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__innerP {
    width: 300px;
  }

  .el-upload__tip {
    color: #999;
  }

  .avatar-uploader {
    width: 300px;
  }
}

.file_list {
  .file_item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tit {
      flex-grow: 1;
      color: #fff;
    }

    .btn {
      border: none;
      padding: 0;
      color: #fff;
      font-size: 20px;

      &:before {
        background: none !important;
      }
    }
  }
}

.image-dispaly {
  position: relative;
}

.image-delete {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 1000;

  i {
    font-size: 25px;
    color: #606266;
  }

  i:hover {
    color: #409eff;
  }
}
</style>
