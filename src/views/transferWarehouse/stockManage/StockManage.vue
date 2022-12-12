<!--中转仓-入库管理-->
<template>
  <div class="stock_manage_page" id="stock_manage_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form
              :inline="true"
              size="small"
              label-width=""
              label-position="left"
          >
            <el-form-item label="小蓝之家">
              <el-select
                  v-model="formData.homeName"
                  placeholder="请选择"
                  clearable
                  filterable
                  @change="searchFn"
              >
                <el-option
                    v-for="item in blueHouseOptions"
                    :key="item.companyNo"
                    :label="item.name"
                    :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" class="fixed_width">
              <el-select
                  v-model="formData.transportType"
                  placeholder="请选择"
                  clearable
                  @change="searchFn"
              >
                <el-option
                    v-for="item in transportOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="">
              <el-input
                  placeholder="请输入查找内容的关键字"
                  v-model.trim="formData.search"
                  onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                  @keyup.enter.native="searchFn"
              >
                <div slot="suffix" class="el-input-slot__icon"></div>
              </el-input>
            </el-form-item> -->
            <el-form-item label="状态" label-width="80px">
              <el-select
                  v-model="formData.inputOrderStatus"
                  placeholder="请选择"
                  clearable
                  @change="searchFn"
              >
                <el-option
                    v-for="item in inputOrderStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="日期" class="fixed_width">
              <el-date-picker
                  clearable
                  v-model="formData.date"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="searchFn"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="中转仓" label-width="80px">
              <el-select
                  v-model="formData.warehouseNoList"
                  placeholder="请选择"
                  clearable
                  @change="searchFn"
                  multiple
                  collapse-tags
              >
                <el-option
                    v-for="item in warehouseList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
        </div>
      </div>
      <el-table
          :data="tableData"
          style="width: 100%"
          :height="tabelHeigth"
          v-loading="loading"
          element-loading-text="加载中" element-loading-spinner="el-icon-loading"
      >
        <!-- 插槽 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
                :data="scope.row.collectBlockResList"
                border
                style="width: 100%;">
              <el-table-column
                  v-for="(col, index) in scope.row.rowHeader"
                  :key="index"
                  :prop="col.prop"
                  :label="col.label"
                  show-overflow-tooltip
                  width="150"
              >
                <template slot-scope="scope">
                    <span>
                      {{ scope.row[col.prop] }}
                    </span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" :index="getIndex" label="序号" width="50"></el-table-column>
        <el-table-column prop="serialNumber" label="入库单" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="transportSerialNumber" label="调度单" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="transportVehicleName" label="车牌号" width="100">
        </el-table-column>
        <el-table-column prop="transportUserName" label="司机" width="90" show-overflow-tooltip></el-table-column>

        <el-table-column
            prop=""
            label="类型"
            width="70"
            show-overflow-tooltip
        >
          <template slot-scope="scope">
              <div>{{ statusDict[scope.row.transportType] }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="inputTime" label="入库日期" width="160">
        </el-table-column>
        <el-table-column prop="homeNames" label="产废单位" width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="warehouseName" label="中转仓" show-overflow-tooltip width=""></el-table-column>
        <el-table-column prop="inputOrderStatus" label="转运状态" width="80"></el-table-column>
        <!-- <el-table-column prop="pureWeight" label="透明PET(kg)" width="110">
        </el-table-column>
        <el-table-column prop="blueWeight" label="蓝色PET(kg)" width="110">
        </el-table-column>
        <el-table-column prop="greenWeight" label="绿色PET(kg)" width="110">
        </el-table-column>
        <el-table-column prop="mixWeight" label="杂色PET(kg)" width="110">
        </el-table-column> -->
        <el-table-column prop="actualInputWeight" label="入库重量(kg)" width="110">
        </el-table-column>
        <el-table-column prop="blockCount" label="入库包数(包)" width="110">
        </el-table-column>
        <el-table-column label="入库视频" width="90">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.id)" type="text" size="small" v-if="MenuBtnValid('/stockManage','视频查看')"
            >查看
            </el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="海塑码" width="90">
          <template slot-scope="scope">
            <el-button v-if="MenuBtnValid('/stockManage','海溯码查看')" @click="seaplasticCode(scope.row.originNo)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="">
          <template slot-scope="scope">
            <el-button
              @click="handleDetail(scope.row)"
              type="text"
              size="small"
              class="blue"
              >详情</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <div class="page">
        <div class="data-total">共{{ total }}项数据</div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="size"
            :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
        title="查看"
        :visible.sync="centerDialogVisible"
        width="800px"
        :append-to-body="true"
    >
      <div class="row_bottom" style="width:100%;display: flex;">
        <div class="title">视频</div>
        <div class="video_box" v-if="videoList && videoList.length>0">
          <div
              class="video_li"
              @click="playVideo(item.previewUrl)"
              v-for="(item, index) in videoList"
              :key="index"
          >
            <div class="li">
              <img :src="item.coverPicUrl" alt="" v-if="item.coverPicUrl && item.coverPicUrl.length">
              <img src="@/assets/img/home/videoBg.svg" alt="" v-else>
              <img class="palyBtn" src="@/assets/img/home/playBtn.png" alt="播放">
            </div>
            <div class="li_name" :title="item.name">{{ item.name }}</div>
          </div>
        </div>
        <div v-else>
          <div class="empty_box">暂无视频</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="success_btn" @click="successBtn">关闭</div>
      </span>
    </el-dialog>

    <!-- 视频预览 -->
    <el-dialog
        title="视频预览"
        :visible.sync="videoPreview"
        width="720px"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="true"
        top="10vh"
    >
      <div style="">
        <video
            width="600"
            v-if="videoPreview"
            :src="currentVideoSrc"
            controls
            style="height: 400px; width: 100%"
        ></video>
      </div>
      <div slot="footer">
        <span class="button_blue" @click="videoPreview = false">关闭</span>
      </div>
    </el-dialog>


    <!-- 视频预览 -->
    <el-dialog
        title="海塑码"
        :visible.sync="seaPlastic"
        width="1500px"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="true"
        top="10vh"
    >
      <div style="">
        <el-table
            :data="seaplasticTableData"
            style="width: 100%"
            :height="tabelHeigth"
            v-loading="loadingSource"
            element-loading-text="加载中" element-loading-spinner="el-icon-loading"
        >

          <el-table-column prop="serialNumber" label="海塑码" show-overflow-tooltip width="200"></el-table-column>
          <el-table-column prop="originNumber" label="包装编号" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column prop="blockTypeName" label="种类" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="blockWeight" label="海塑总量(kg)" show-overflow-tooltip width="110"></el-table-column>
          <el-table-column prop="homeName" label="收集点" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="destinationCompanyName" label="目标地" show-overflow-tooltip
                           width="200"></el-table-column>
          <el-table-column prop="collectTime" label="清运申请日期" show-overflow-tooltip width="160"></el-table-column>
          <el-table-column prop="transferOutputTime" label="转运日期" show-overflow-tooltip width="160"></el-table-column>

          <el-table-column prop="source" label="过程管理" width="80">
            <template slot-scope="scope">
              <el-button @click="sourceClick(scope.row)" type="text" size="small"
              >查看
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="联单" width="80">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="page">
        <div class="data-total">共{{ seaplasticTotal }}项数据</div>
          <el-pagination
              @size-change="handleSeaplasticSizeChange"
              @current-change="handleSeaplasticCurrentChange"
              background
              layout="sizes, prev, pager, next, jumper"
              :current-page="seaplasticPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="seaplasticSize"
              :total="seaplasticTotal"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>


    <!-- 联单pdf -->
    <PdfPreviewDialog
        ref="PdfPreviewDialog"
        :dialogVisible="pdfDialogVisible"
        @close="pdfHandleClose"
        :allData="pdfList"
    ></PdfPreviewDialog>
    <!-- 产品溯源 -->
    <ProcessDialog
        ref="TraceSourceDialog"
        :dialogVisible="productTraceabilityDialog"
        @close="handleClose"
        :serialNo="blockId"
    ></ProcessDialog>

  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue";
import PdfPreviewDialog from "@/views/billManage/traceSource/PdfPreviewDialog.vue";
import ProcessDialog from "@/views/billManage/traceSource/ProcessDialog.vue";
import {timeStampSwitch} from '@/utils/util'

export default {
  name: "stockManage",
  data() {
    return {
      tabelHeigth: 420,
      breadData: [{name: "中转管理", path: ""}, {name: "入库管理"}],
      formData: {
        homeName: null,
        transportType: null,
        inputOrderStatus: null,
        date: [],
        warehouseNoList: []
      },
      blueHouseOptions: [],
      transportOptions: [],
      statusDict: {},
      inputOrderStatusOptions: [
        {label: "待出库", value: 1},
        {label: "部分出库", value: 2},
        {label: "已出库", value: 3},
      ],

      warehouseList: [],//中转仓列表


      tableData: [],
      // 表格
      page: 1,
      size: 10,
      total: 0,
      seaplasticPage: 1,
      seaplasticSize: 10,
      seaplasticTotal: 0,
      inputOrderId:'',
      centerDialogVisible: false,
      // detailData: {
      //   id: "",
      //   carNum: "",
      //   driver: "",
      //   type: "",
      //   company: "",
      //   status: "",
      //   touming: 0,
      //   zazhi: 0,
      //   weight: 0,
      //   date: "",
      // },
      videoList: [],
      loading: false,
      loadingSource: false,
      videoPreview: false, //视频预览弹窗
      currentVideoSrc: "", //预览的视频地址

      seaPlasticType: [],//塑料块类型

      seaPlastic: false,//海塑码预览弹窗
      seaplasticTableData: [], //海塑码列表
      productTraceabilityDialog: false,//产品溯源弹窗
      pdfDialogVisible: false,//pdf弹窗
      pdfList: [],//pdf数据
      blockId: null//海塑块id

    };
  },
  components: {Breadcrumb, ProcessDialog, PdfPreviewDialog},
  computed: {},
  created() {
    // for (const key in this.initData) {
    //   if (Object.hasOwnProperty.call(this.initData, key)) {
    //     const element = this.initData[key];
    //     // console.log(key, "pppp");
    //     // console.log(element, "9999");
    //   }
    // }
    this.getDictionary()
    //获取海塑类型
    this.getHaisuKinds();
    this.gethomeOptions();
    //查询启用的中转仓列表
    this.getWarehouseEnableAll();
  },
  mounted() {
    // this.getTableData();
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector("#stock_manage_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (document.querySelector("#stock_manage_page") && document.querySelector("#stock_manage_page").offsetHeight && document.querySelector("#search") && document.querySelector("#search").offsetHeight) {
        self.tabelHeigth = document.querySelector("#stock_manage_page").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
        // console.log("table",self.tabelHeigth);
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {
    };
  },
  methods: {
    // 获取字典
    getDictionary() {
      this.transportOptions = []
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ['common_status', 'land_type']
      })
        .then(res => {
          if (res.code === 200 && res.data) {
            let records = res.data || []
            records.map((item, index) => {
              item.dictList = item.dictList || []
              if (item.dictType === 'land_type') {
                for (let temp of item.dictList) {
                  this.transportOptions.push({
                    label: temp.dictValueDesc,
                    value: temp.dictValue ? Number(temp.dictValue) : ''
                  })
                }
                for (let item of this.transportOptions) {
                  this.$set(this.statusDict, item.value, item.label)
                }
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    getHaisuKinds(callBack) {
      // 请求塑料类型接口
      this.seaPlasticType = []
      this.$http(this.GLOBALApi.getDictionaryListByCode(), {no: 'plasticType'})
          .then((res) => {
            res.data.map(item => {
              this.seaPlasticType.push({
                label:item.categoryName,
                value:item.categoryNo,
              })
            })
            this.$nextTick(() => {
              if (this.seaPlasticType.length) {
                callBack && callBack(true)
              } else {
                callBack && callBack(false)
              }
            })
          })
          .catch((error) => {
            callBack && callBack(false)
          });
    },
    searchFn() {
      this.page = 1
      this.tableData = []
      this.getTableData();
    },

    // 获取中转仓下拉列表
    getWarehouseEnableAll() {
      this.warehouseList = [];
      this.formData.warehouseNoList = [];
      this.$http(this.GLOBALApi.getStorageDevice())
          .then((res) => {
            if (res.code === 200 && res.data && Array.isArray(res.data)) {
              let records = res.data || [];
              records.map((item, index) => {
                let temp = {
                  label: item.name,
                  value: item.companyNo,
                };
                this.warehouseList.push(temp);
                // if (item.bindFlag) {
                this.formData.warehouseNoList.push(item.companyNo);
                // }
              });
              this.pageNum = 1;
              this.getTableData();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 小蓝之家列表
    gethomeOptions() {
      let params = {
        // pageNum: 1,
        // pageSize: 999999,
      };
      this.$http(this.GLOBALApi.getXiaolanData(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.blueHouseOptions = res.data;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    playVideo(data) {
      // window.open(data, '_blank');
      this.currentVideoSrc = data;
      this.videoPreview = true;
    },
    // 获取table列表
    getTableData() {

      this.loading = true;

      let params = {
        pageNum: this.page,
        pageSize: this.size,
        transportType: this.formData.transportType || '',
        homeName: this.formData.homeName || '',
        inputOrderStatus: this.formData.inputOrderStatus || '',
        beginTime: this.formData.date && this.formData.date.length > 0 ? this.formData.date[0] + ' 00:00:00' : '',
        endTime: this.formData.date && this.formData.date.length > 0 ? this.formData.date[1] + ' 23:59:59' : '',
        warehouseNoList: this.formData.warehouseNoList.length ? this.formData.warehouseNoList : null
      };
      this.tableData = []

      this.$http(this.GLOBALApi.getStoreList(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.loading = false;

              this.total = res.data.total || 0;
              let records = res.data.records || [];
              records.map((item) => {
                let dataArr = []//table的表格数据
                let dataObj = {}//单条表格数据
                let rowHeader = []//table的表头数据
                if (item.collectBlockResList && item.collectBlockResList.length > 0) {
                  item.collectBlockResList.map(resData => {
                    // console.log(this.seaPlasticType);
                    for (let index = 0; index < this.seaPlasticType.length; index++) {

                      // 如果接口返回的塑料类型的编码 == 海塑接口的编码,说明有这个海塑种类
                      if (resData.blockType == this.seaPlasticType[index].value) {
                        // console.log(this.seaPlasticType[index].value,"===",resData.blockType);
                        // 存进表头
                        let obj = {}
                        this.$set(obj, "label", this.seaPlasticType[index].label + '(kg)')
                        this.$set(obj, "prop", this.seaPlasticType[index].label)
                        // console.log(obj, "obj");
                        rowHeader.push(obj)

                        // 存进表格数组
                        this.$set(dataObj, this.seaPlasticType[index].label, resData.weight)

                      }
                    }


                  })
                  dataArr.push(dataObj)
                  // console.log(rowHeader, "头数据");
                  // console.log(dataArr, "表格数据");
                }
                this.tableData.push({
                  id: item.orderNo,
                  serialNumber: item.serialNo,
                  transportSerialNumber: item.transportSerialNo,
                  transportVehicleName: item.transportVehicleName,
                  transportUserName: item.transportUserName,
                  transportType: item.transportType,
                  inputTime: item.inputTime,
                  // inputTime: item.inputTime ? timeStampSwitch(item.inputTime, '', 'yy/mm/dd') : '',
                  inputOrderStatus: item.inputOrderStatus == 1 ? '待出库' : (item.inputOrderStatus == 2 ? '部分出库' : '已出库'),
                  // pureWeight: item.pureWeight,
                  // blueWeight: item.blueWeight,
                  // greenWeight: item.greenWeight,
                  // pureCount: item.pureCount,
                  // blueCount: item.blueCount,
                  // greenCount: item.greenCount,
                  // mixCount: item.mixCount,
                  // mixWeight: item.mixWeight,
                  actualInputWeight: item.actualInputWeight,
                  blockCount: item.blockCount,
                  homeNames: item.homeNames,
                  collectBlockResList: item.collectBlockResList && item.collectBlockResList.length > 0 ? dataArr : [],//列表
                  rowHeader: rowHeader.length > 0 ? rowHeader : [],//头部列表
                  warehouseName: item.warehouseName ? item.warehouseName : ''
                });

              });
            } else {
              this.loading = false;

              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.loading = false;

            this.$message.error(error.msg);
          });
    },
    handleSizeChange(val) {
      this.size = val
      this.tableData = []
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page = val
      this.tableData = []
      this.getTableData();
    },
    handleSeaplasticSizeChange(val) {
      this.seaplasticSize = val
      this.seaplasticCode(this.inputOrderId);
    },
    handleSeaplasticCurrentChange(val) {
      this.seaplasticPage = val
      this.seaplasticCode(this.inputOrderId);
    },
    handleDetail(id) {
      this.videoList = []
      let params = {
        // pageNum: 1,
        // pageSize: 999999,
        objectNo: id,
        objectType: 3,
      };
      this.$http(this.GLOBALApi.getVideoUrlPage(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.videoList = res.data || [];
              this.centerDialogVisible = true;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });

    },
    successBtn() {
      this.centerDialogVisible = false;
    },
    // 序号
    getIndex(index) {
      if (this.page) {
        return index + (this.page - 1) * this.size + 1
      } else {
        return index + 1
      }
    },

    // 海塑码
    seaplasticCode(id) {
      this.inputOrderId = id
      let params = {
        pageNum: this.seaplasticPage,
        pageSize: this.seaplasticSize,
        transferInputOrderNo: id,
      };
      this.loadingSource = true;
      this.seaplasticTableData = [];
      this.$http(this.GLOBALApi.getPlasticBlockTraceSourcePageByParams(), params)
          .then((res) => {
            this.loadingSource = false;
            this.seaPlastic = true;
            if (res.code == 200 && res.data && res.data.records && res.data.records.length) {
              let records = res.data.records || [];
              this.seaplasticTotal = res.data.total || 0;
              records.map((item, index) => {
                this.seaplasticTableData.push({
                  ...item,
                  serialNumber: item.serialNo,//海塑码
                  originNumber: item.originNo,
                  blockTypeName: item.blockTypeName || "",
                  homeName: item.homeName,
                  blockWeight: item.blockWeight,
                  destinationCompanyName: item.destinationCompanyName,//目标地
                  // collectTime: item.collectTime,
                  // transferOutputTime: item.transferOutputTime,
                  collectTime: item.collectTime
                      ? timeStampSwitch(item.collectTime, "", "yy/mm/dd")
                      : "",
                  transferOutputTime: item.transferOutputTime
                      ? timeStampSwitch(item.transferOutputTime, "", "yy/mm/dd")
                      : "",//转运日期
                  pdfUrlList: item.pdfUrlList,//海塑块全流程产生的pdf列表
                  id: item.id,
                });
              });
            }
          })
          .catch((error) => {
            this.loadingSource = false;
            this.$message.error(error.msg);
          });
    },

    // 产品溯源
    sourceClick(data) {
      this.blockId = data.serialNumber//海塑块id
      this.productTraceabilityDialog = true;
    },
    // 产品溯源弹窗关闭
    handleClose() {
      this.productTraceabilityDialog = false;
    },
    // pdf关闭
    pdfHandleClose() {
      this.pdfDialogVisible = false;
    },
    // 联单pdf
    handleClick(data) {
      console.log(data,"----");
      if (data.pdfUrlList && data.pdfUrlList.length > 0) {
        this.pdfList = data
        this.pdfDialogVisible = true;
      } else {
        this.pdfList = []
        this.$message.warning("暂无联单数据")
      }

    },

  },
};
</script>

<style lang="less" scoped>
.stock_manage_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.main {
  margin-top: 16px;
  // box-shadow: 0px 2px 3px 1px rgb(0 0 0 / 10%);
  padding: 32px 24px 32px 32px;
  background-color: #fff;
}

// 搜索部分
.search {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/deep/ .el-form--inline .el-form-item:not(:last-child) {
  margin-right: 80px;
}

/deep/ .el-form-item__label {
  padding-right: 24px;
}

/deep/ .el-select.el-select--small {
  width: 320px;

  .el-input.el-input--small.el-input--suffix {
    width: 320px !important;
  }
}

.fixed_width {
  /deep/ .el-select.el-select--small {
    width: 348px !important;

    .el-input.el-input--small.el-input--suffix {
      width: 348px !important;
    }
  }
}

/deep/ .el-input.el-input--small.el-input--suffix {
  width: 448px;
}

.search-bt {
  min-width: 100px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;

  & > div {
    cursor: pointer;
    margin-left: 10px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
  }
}

.button-white {
  color: #0052d9;
  border: solid 1px #0052d9;
}

.button-white:hover {
  background-color: #ecf5ff;
}

.button-blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

.button-blue:hover {
  background-color: #66b1ff;
  border: solid 1px #66b1ff;
}

.el-input-slot__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  transition: all 0.3s;
  line-height: 32px;

  img {
    width: 16px;
    height: 16px;
    padding-top: 7px;
  }
}

.page {
  margin-top: 40px;
  // justify-content: flex-end;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/deep/ .el-pagination.is-background {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
}

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052D9;
}

// 弹窗
.row_bottom {
  margin-bottom: 28px;
  // display: flex;
  display: inline-block;
  width: 50%;
}

.title {
  text-align: right;
  display: inline-block;
  width: 50px;
  margin-right: 34px;
  flex-shrink: 0;
}

.video_box {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.video_li {
  margin-bottom: 15px;
  cursor: pointer;

  .li {
    width: 136px;
    height: 136px;
    // background: url(~@/assets/img/home/videoBg.svg) center center no-repeat;
    margin-right: 10px;
    border-radius: 4px 4px 4px 4px;
    cursor: pointer;
    position: relative;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .palyBtn{
          display: inline-block;
          width: 40px;
          height: 40px;
          object-fit: cover;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin:auto auto;
      }
  }

  .li_name {
    width: 136px;
    margin-top: 8px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 32px;
  text-align: center;
}

.success_btn {
  width: 88px;
  height: 32px;
  background: #0052d9;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid #dcdfe6;
  cursor: pointer;
  color: #ffffff;
}

.data-total {
  font-size: 14px;
  color: #fff;
}

.button_blue {
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  display: inline-block;
  padding: 0 12px;
}

.empty_box {
  width: 675px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #858585;
  background-color: rgba(0, 0, 0, 0.05);
  font-size: 12px;
}

</style>
