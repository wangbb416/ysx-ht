<template>
  <div class="my-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(title, index) in titleList"
        :key="index"
        :to="{ path: title.path,query:title.query || '' }"
      >{{ title.name }}
      </el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    titleList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.my-breadcrumb {
  margin-bottom: 30px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
