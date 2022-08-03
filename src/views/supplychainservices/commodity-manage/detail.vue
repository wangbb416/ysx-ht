<!--供应链服务-商品管理-商品详情-->

<template>
  <div class="port-record">
    <MyBread :titleList="titleList"></MyBread>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item :label="item.label" v-for="(item, index) in basicData"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>
      </el-descriptions>

    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商家</span>
      </div>

      <el-descriptions class="margin-top" :column="2">
        <el-descriptions-item :label="item.label" v-for="(item, index) in merchantData"
                              :key="index">
          <span class="tionsCont">{{ item.value }}</span>
        </el-descriptions-item>
      </el-descriptions>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品主样图</span>
      </div>

      <div class="img-list" v-if="goodsInfoPictures.length>0">
        <el-image
          v-for="(url, index) in goodsInfoPictures"
          :key="index"
          style="width: 80px; height: 80px; margin-right: 10px"
          :src="url"
          :preview-src-list="goodsInfoPictures"
        >
        </el-image>
      </div>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品轮播图</span>
      </div>

      <div class="img-list" v-if="goodsShufflingPictures.length>0">
        <el-image
          v-for="(url, index) in goodsShufflingPictures"
          :key="index"
          style="width: 80px; height: 80px; margin-right: 10px"
          :src="url"
          :preview-src-list="goodsShufflingPictures"
        >
        </el-image>
      </div>


    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品详情</span>
      </div>

      <div>{{ goodsIntroduce }}</div>

      <div class="img-list" v-if="goodsDetailPictures.length>0">
        <el-image
          style="width: 100px; height: 100px"
          v-for="(url, index) in goodsDetailPictures"
          :key="index"
          :src="url"
          :preview-src-list="goodsDetailPictures">
        </el-image>
      </div>

    </el-card>


  </div>

</template>


<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";

import {commodityManageDetail} from "@/api/supplychainservice";

export default {
  name: "detail",
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
        {name: "商品管理", path: "/ysx/commodity-manage"},
        {name: "商品详情", path: ""}
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      id: '',
      // 基本信息
      basicData: [],
      // 商家
      merchantData: [],
      // 商品主样图
      goodsInfoPictures: [],
      // 轮播图
      goodsShufflingPictures: [],
      // 商品介绍
      goodsIntroduce: '',
      // 宣传图
      goodsDetailPictures: [],
    }

  },
  created() {
    this.id = this.$route.query.id || '';
    console.log(this.id, '66666666');
    if (this.id) {
      this.getDetailData();
    }
  },
  methods: {

    getDetailData() {
      let params = {
        id: this.id,
      };
      commodityManageDetail(params)
        .then(res => {
          if (res != -1) {

            this.basicData = [
              {
                label: '商品编号:',
                value: res.goodsNo || '',
              },
              {
                label: '商品单价(元/件):',
                value: res.price || '',
              },
              {
                label: '商品名称:',
                value: res.goodsName || '',
              },
              {
                label: '商品库存(件):',
                value: res.remain || 0,
              },
              {
                label: '商品规格:',
                value: res.goodsSpec || '',
              },
              {
                label: '商品已售出(件):',
                value: res.sell || 0,
              },
              {
                label: '商品类别:',
                value: res.category || '',
              },
            ];

            this.merchantData = [
              {
                label: '商家名称:',
                value: res.merchantName || '',
              },
              {
                label: '商家地址:',
                value: res.province + res.city + res.area + res.street || '',
              },
              {
                label: '联系人:',
                value: res.merchantContacts || '',
              },
              {
                label: '详细地址:',
                value: res.address || '',
              },
              {
                label: '联系电话:',
                value: res.courierPhone || '',
              },
            ];


            this.goodsInfoPictures = res.goodsInfoPictures.split(',') || '';
            this.goodsShufflingPictures = res.goodsShufflingPictures.split(',') || '';
            this.goodsIntroduce = res.goodsIntroduce || '';
            this.goodsDetailPictures = res.goodsDetailPictures.split(',') || '';

            console.log(this.goodsInfoPictures);

          }

        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

  },

}
</script>

<style lang="less" scoped>

.box-card {
  margin-bottom: 20px;
}

/deep/ table {
  width: 100%;
}

.img-list {
  display: flex;
  flex-wrap: wrap;
}

/deep/ .tionsCont {
  margin: 0 10px;
}

/deep/ .el-descriptions-row {
  display: flex;
  justify-content: space-between;
}

/deep/ .el-descriptions-item {
  width: 50%;
}
</style>

