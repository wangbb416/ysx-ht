<template>
  <div class="from_item_base">
    <div v-for="(item, index) of formModel" :key="index">
      <div v-if="item.type == 'text'" class="text" :style="item.style">
        <span class="tit">{{ item.label }}</span>
        <span class="con"></span>
      </div>
      <el-form-item
        v-if="item.type == 'input'"
        class="input"
        :style="item.style"
        :label="item.label"
        :required="item.required"
      >
        <el-input
          v-if="item.checkStatus == 1"
          v-model.trim="formValue[item.valueLabel]"
          :placeholder="item.placeholder"
        ></el-input>
        <div v-else>{{ formValue[item.valueLabel] }}</div>
      </el-form-item>
      <el-form-item
        v-if="item.type == 'select'"
        class="select"
        :style="item.style"
        :label="item.label"
        :required="item.required"
      >
        <el-select
          v-if="item.checkStatus == 1"
          v-model="formValue[item.valueLabel]"
          :placeholder="item.placeholder"
        >
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div v-else>{{ formValue[item.valueLabel + "Str"] }}</div>
      </el-form-item>
      <el-form-item
        v-if="item.type == 'citySelect'"
        class="city_select"
        :style="item.style"
        :label="item.label"
        :required="item.required"
      >
        <div class="city_select_area" v-if="item.checkStatus == 1">
          <el-select
            ref="province"
            v-model="formValue[item.valueLabel.provinceCode]"
            @change="
              changeAddress(
                formValue[item.valueLabel.provinceCode],
                1,
                item.valueLabel.provinceCode
              )
            "
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="itemO in formValue[item.valueLabel.provinceOptions]"
              :key="itemO.value"
              :label="itemO.label"
              :value="itemO.value"
            >
            </el-option>
          </el-select>
          <el-select
            ref="city"
            v-model="formValue[item.valueLabel.cityCode]"
            @change="
              changeAddress(
                formValue[item.valueLabel.cityCode],
                2,
                item.valueLabel.cityCode
              )
            "
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="itemO in formValue[item.valueLabel.cityOptions]"
              :key="itemO.value"
              :label="itemO.label"
              :value="itemO.value"
            >
            </el-option>
          </el-select>
          <el-select
            ref="area"
            v-model="formValue[item.valueLabel.areaCode]"
            @change="
              changeAddress(
                formValue[item.valueLabel.areaCode],
                3,
                item.valueLabel.areaCode
              )
            "
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="itemO in formValue[item.valueLabel.areaOptions]"
              :key="itemO.value"
              :label="itemO.label"
              :value="itemO.value"
            >
            </el-option>
          </el-select>
          <el-select
            ref="street"
            @change="
              changeAddress(
                formValue[item.valueLabel.streetCode],
                4,
                item.valueLabel.streetCode
              )
            "
            v-if="!item.leave || item.leave != 3"
            v-model="formValue[item.valueLabel.streetCode]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="itemO in formValue[item.valueLabel.streetOptions]"
              :key="itemO.value"
              :label="itemO.label"
              :value="itemO.value"
            >
            </el-option>
          </el-select>
        </div>
        <div v-else class="city_text_area">
          {{ formValue[item.valueLabel.province] }}
          {{ formValue[item.valueLabel.city] }}
          {{ formValue[item.valueLabel.area] }}
          <template v-if="!item.leave || item.leave != 3">
            {{ formValue[item.valueLabel.street] }}
          </template>
        </div>
      </el-form-item>
      <el-form-item
        v-if="item.type == 'uploadPic'"
        class="upload_pic"
        :style="item.style"
        :label="item.label"
        :required="item.required"
      >
        <div class="desc">{{ item.picDesc }}</div>
        <el-button
          @click="handUploadPic(item.valueLabel)"
          v-if="item.checkStatus == 1"
          size="small"
          >选择图片</el-button
        >
        <img
          v-if="formValue[item.valueLabel]"
          class="pic"
          :src="formValue[item.valueLabel]"
          alt=""
        />
        <img v-else class="pic" :src="imgUrl" alt="" />
      </el-form-item>
      <el-form-item
        v-if="item.type == 'uploadPicLine'"
        class="upload_pic_line"
        :style="item.style"
        :label="item.label"
        :required="item.required"
      >
        <div class="up_box">
          <img
            v-if="formValue[item.valueLabel]"
            class="pic"
            :src="formValue[item.valueLabel]"
            alt=""
          />
          <img v-else class="pic" :src="imgUrl" alt="" />
          <div class="up_r" v-if="item.checkStatus == 1">
            <el-button
              v-if="formValue[item.valueLabel]"
              @click="handUploadPic2(item.valueLabel)"
              size="small"
              >重新上传(1/1)</el-button
            >
            <el-button
              v-else
              @click="handUploadPic2(item.valueLabel)"
              size="small"
              >上传(0/1)</el-button
            >
            <div class="desc">只能上传jpg/png文件，且不超过500kb</div>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        v-if="item.type == 'switch'"
        class="switch"
        :style="item.style"
        :label="item.label"
        :required="item.required"
      >
        <el-switch
          v-model="formValue[item.valueLabel]"
          @change="switchChange"
          :active-value="0"
          :inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/imgs/form/default.png";

export default {
  props: {
    formModel: {
      type: Array,
      default: []
    },
    formValue: {
      type: Object,
      default: {}
    },
    itemIndex: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      imgUrl
    };
  },
  created() {},
  methods: {
    changeAddress(code, leave, key) {
      let str = "";
      switch (leave) {
        case 1:
          str = this.formValue.provinceOptions.find(item => {
            return item.value == code;
          }).label;
          break;
        case 2:
          str = this.formValue.cityOptions.find(item => {
            return item.value == code;
          }).label;
          break;
        case 3:
          str = this.formValue.areaOptions.find(item => {
            return item.value == code;
          }).label;
          break;
        case 4:
          str = this.formValue.streetOptions.find(item => {
            return item.value == code;
          }).label;
          break;

        default:
          break;
      }
      this.$emit("addressSelect", { code, leave, key, str });
    },
    handUploadPic(key) {
      this.$emit("uploadPicChange", key);
    },
    switchChange(val) {
      this.$emit("switchChange", this.itemIndex);
    },
    handUploadPic2(key) {
      this.$emit("uploadPicChange", { key, index: this.itemIndex });
    }
  }
};
</script>

<style scoped lang="less">
.from_item_base {
  .text {
    color: #fff;
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .city_select_area {
    display: flex;
    justify-content: space-between;
    .el-select {
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .upload_pic {
    /deep/.el-form-item__label {
      width: auto !important;
    }
    /deep/.el-form-item__content {
      margin-left: 0 !important;
    }
    .desc {
      margin-bottom: 5px;
    }
    .pic {
      display: block;
      width: 200px;
      height: 200px;
      margin-top: 10px;
    }
  }
  .upload_pic_line {
    .up_box {
      display: flex;
      .up_r {
        padding-top: 20px;
      }
      .desc {
        margin-top: 10px;
      }
      .pic {
        width: 100px;
        height: 100px;
        margin-right: 5px;
      }
    }
  }
}
</style>
