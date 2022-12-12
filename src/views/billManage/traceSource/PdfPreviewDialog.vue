<!-- 联单pdf -->
<template>
  <div class="pdf_preview_page" id="pdf_preview_page">
    <el-dialog
      title="联单查看"
      :visible.sync="dialogVisible"
      width="960px"
      :append-to-body="true"
      :before-close="handleClose"
      top="5vh"
    >
      <div class="row_bottom" style="width: 100%">
        <div class="lizi_title" v-if="pdfList1 && pdfList1.length > 0">
          海洋塑料接收联单-第一联
        </div>
        <div class="video_box" v-if="pdfList1 && pdfList1.length > 0">
          <div
            class="video_li"
            v-for="(item, index) in pdfList1"
            :key="index"
            @click="preview(item)"
          >
            <template>
              <div class="li"></div>
            </template>
          </div>
        </div>
        <div
          class="video_box"
          style="margin: 20px 0"
          v-if="pdfList2 && pdfList2.length > 0"
        >
          <div
            class="video_li"
            v-for="(item, index) in pdfList2"
            :key="index"
            @click="preview(item)"
          >
            <template>
              <div class="li"></div>
              <div class="li_name" v-if="index == 0">
                海洋塑料接收联单-第二联
              </div>
              <div class="li_name" v-else-if="index == 1">
                海洋塑料接收联单-第三联
              </div>
              <div class="li_name" v-else-if="index == 2">
                海洋塑料转运联单-第一联
              </div>
              <div class="li_name" v-else-if="index == 3">
                海洋塑料转运联单-第二联
              </div>
              <div class="li_name" v-else-if="index == 4">海洋塑料处置联单</div>
            </template>
          </div>
        </div>

        <div class="lizi_title" v-if="pdfList3 && pdfList3.length > 0">
          粒子出库单
        </div>
        <div class="video_box" v-if="pdfList3 && pdfList3.length > 0">
          <div
            class="video_li"
            v-for="(item, index) in pdfList3"
            :key="index"
            @click="preview(item)"
          >
            <template>
              <div class="li"></div>
            </template>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'pdf_preview_page',
  props: {
    dialogVisible: {
      type: Boolean,
      require: true
    },
    allData: {
      type: [Object, Array],
      require: false
    }
  },
  watch: {
    // dialogVisible: {
    //   handler(newVal) {
    //     // console.log(newVal, "watch");
    //   },
    //   immediate: true,
    // },
  },
  computed: {
    pdfList1() {
      if (
        this.allData &&
        this.allData.receiveOrderPdfUrlList &&
        this.allData.receiveOrderPdfUrlList.length > 0
      ) {
        return this.allData.receiveOrderPdfUrlList
      }
    },
    pdfList2() {
      if (
        this.allData &&
        this.allData.pdfUrlList &&
        this.allData.pdfUrlList.length > 0
      ) {
        return this.allData.pdfUrlList
      }
    },
    pdfList3() {
      if (
        this.allData &&
        this.allData.handleOutOrderPdfUrlList &&
        this.allData.handleOutOrderPdfUrlList.length > 0
      ) {
        return this.allData.handleOutOrderPdfUrlList
      }
    }
  },
  data() {
    return {
      // pdfList1:[
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"888"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"7777"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"9999"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"9999"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"9999"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"9999"},
      // ],
      // pdfList2: [
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"11111"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"3333"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"2222"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"44444"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"44444"},
      // ],//pdf数据
      // pdfList3:[
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"888"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"7777"},
      //   {previewUrl:"https://test-icloudeep-img.oss-cn-beijing.aliyuncs.com/haiyou/4d09b15d84a64c579e2064cf1c419af6.pdf",name:"9999"},
      // ],
    }
  },

  mounted() {},
  activated() {},
  methods: {
    // 预览
    preview(data) {
      window.open(data, '_blank')
    },

    // 关闭弹窗
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.pdf_preview_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

// pdf弹窗
.row_bottom {
  margin-bottom: 28px;
  // display: flex;
  display: inline-block;
  width: 50%;
  .title {
    display: inline-block;
    width: 50px;
    margin-right: 34px;
    flex-shrink: 0;
  }

  .video_box {
    display: flex;
    flex-wrap: wrap;
    overflow-x: auto;
    align-items: flex-start;
  }
  .lizi_title {
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #fff;
    // color: #303133;
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .video_li {
    margin-bottom: 0px;
    cursor: pointer;
    margin-left: 20px;
    .li {
      width: 96px;
      height: 136px;
      background: url(~@/assets/img/home/pdfBg.png) center no-repeat;
      margin-right: 65px;
      border-radius: 4px 4px 4px 4px;
      cursor: pointer;
      // margin-top: 5px;
      margin-bottom: 5px;
    }

    .li_name {
      width: 118px;
      margin-top: 8px;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #303133;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      text-align: left;
    }
  }
  .empty_box {
    width: 760px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #858585;
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 12px;
  }
}
</style>
