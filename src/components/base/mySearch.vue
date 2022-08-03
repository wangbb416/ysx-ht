<template>
  <el-form :inline="true" :model="form" class="demo-form-inline" size="small">
    <el-form-item
      v-for="(item, index) in searchField"
      :key="index"
      :label="item.label"
    >
      <!--输入框-->
      <el-input
        v-if="item.type == 'input'"
        v-model.trim="form[item.field]"
        :disabled="item.disabled"
        :maxlength="item.maxlength||''"
        :minlength="item.minlength||''"
        :placeholder="item.placeholder || '请输入' + item.label"
        clearable
        @change="handleValue"
        @clear="handleValue"
      ></el-input>

      <!--时间-->
      <el-date-picker
        v-if="['daterange', 'datetimerange'].includes(item.type)"
        v-model="form[item.field]"
        :type="item.type"
        :value-format="item.valueFormat"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleValue"
      >
      </el-date-picker>

      <!--下拉选择-->
      <!--value-key值为对象-->
      <el-select
        v-if="item.type == 'select'"
        v-model="form[item.field]"
        filterable
        :placeholder="item.placeholder || '请选择' + item.label"
        @change="handleValue"
        clearable
      >
        <el-option
          v-for="opt in item.option"
          :key="opt.value || opt.id"
          :label="opt.label || opt.categoryName"
          :value="opt.value || opt.id"
        >
        </el-option>
      </el-select>

      <!-- 动态下拉-->
      <el-cascader
        v-if="item.type == 'dynamic-select'"
        :value="defaultValue"
        @input="changeArea"
        :options="areaJson"
        :props="item.props"
        filterable
        :placeholder="item.placeholder || '请选择' + item.label"
        :show-all-levels="false"
        clearable
      ></el-cascader>

      <!-- 地址选择 -->
      <el-cascader
        v-if="item.type == 'addressSelect'"
        :show-all-levels="false"
        :props="addressProps(item.options.leave)"
        v-model="form[item.field]"
        filterable
        :placeholder="item.placeholder || '请选择' + item.label"
        @change="handleValue"
        clearable
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>
<script>
import areaJson from "@/components/base/area.json";
import areaParentJson from "@/components/base/areaParent.json";
import {addressRequest} from "@/api/other";

export default {
  name: "",
  props: {
    searchField: Array,
    form: Object,
    selectValue: String
  },
  data() {
    return {
      areaJson: areaJson,
      areaParentJson: areaParentJson,
      defaultValue: [] //[330000, 331000, 331022]
    };
  },
  computed: {
    addressProps() {
      return leave => {
        return this.lazyLoadingAddress(leave);
      };
    }
  },
  created() {
  },
  methods: {
    handleValue(data) {
      console.log(data);
      this.$emit("search");
    },
    // 获取地址
    lazyLoadingAddress(exportLevel = 3) {
      return {
        // checkStrictly: true,
        lazy: true,
        flag: true,
        lazyLoad(node, resolve) {
          const {level} = node;
          var range = {
            1: "全省",
            2: "全市",
            3: "全区"
          };
          // console.log('level', level);
          var nodes = [];
          if (level === 0) {
            addressRequest(0)
              .then(res => {
                res.map((item, index, array) => {
                  nodes.push({
                    value: item.code,
                    label: item.name,
                    leaf: level >= exportLevel
                  });
                });
                resolve(nodes);
              })
              .catch(error => {
                console.log(error);
              });
          } else if (level >= 1) {
            addressRequest(node.value)
              .then(res => {
                var str = node.data.label;
                if (node.data.label === "市辖区") {
                  str = node.parent.label;
                }
                nodes.push({
                  value: node.value + "-1",
                  label: str + range[level],
                  leaf: level >= 1
                });
                res.map((item, index, array) => {
                  nodes.push({
                    value: item.code,
                    label: item.name,
                    leaf: level >= exportLevel
                  });
                });
                resolve(nodes);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      };
    },
    // 省-市-区
    changeArea(val) {
      if (val.length > 0) {
        this.setDefaultValue(String(val[val.length - 1]));
        this.$emit("search", {
          regionCode: val[val.length - 1],
          regionType: val.length
        });
      } else {
        this.$emit("search", {regionCode: "", regionType: ""});
      }
    },
    setDefaultValue(selectValue) {
      let parent = areaParentJson[selectValue].split(",");
      this.defaultValue = [];
      Object.values(parent).map((item, index) => {
        if (item) {
          this.$set(this.defaultValue, index, Number(item));
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
