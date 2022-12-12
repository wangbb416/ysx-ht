<!--清运需求管理-->
<template>
  <div id="declare_place" class="declare_place">
    <Breadcrumb :breadData="breadData"></Breadcrumb>
    <div class="main">
      <div class="search" id="search">
        <div class="search_input">
          <el-form
              :inline="true"
              size="small"
              label-width=""
              label-position="left"
          >
            <el-form-item label="审核状态" style="margin-right:80px">
              <el-select
                  clearable
                  v-model="formData.kinds"
                  placeholder="请选择"
                  @change="handleChange"
              >
                <el-option
                    v-for="item in applyStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="日期选择">
              <el-select
                  @change="handleChange"
                  clearable
                  v-model="formData.date"
                  placeholder="请选择"
              >
                <el-option
                    v-for="item in dateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
          <div
              v-if="MenuBtnValid('/declarePlace','新增')"
              class="button_blue"
              @click="operate('add')"
              v-fastClick
          >
            新增
          </div>
        </div>
      </div>

      <div class="table">
        <el-table
            :data="tableData"
            style="width: 100%"
            :height="tabelHeigth"
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
        >
          <el-table-column
              type="index"
              :index="getIndex"
              label="序号"
              width="100"
          ></el-table-column>
          <el-table-column
              prop="serialNo"
              label="收集单号"
              show-overflow-tooltip
              width="240"
          ></el-table-column>
          <el-table-column
              prop="homeName"
              label="小蓝之家"
              show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="上交日期" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ getFormatTime(scope.row.reportTime) }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="estimateWeight"
              label="预估重量(KG)"
              show-overflow-tooltip
          ></el-table-column>
          <el-table-column
              prop="applyCodeNumber"
              label="预估包数(包)"
          ></el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              <div v-if="scope.row.applyStatus==1 ||scope.row.applyStatus==2 ||scope.row.applyStatus==3">
                {{
                  datafiltering(scope.row.applyStatus, applyStatus).label || "-"
                }}
              </div>
              <div slot-scope="scope"
                   v-else-if="scope.row.applyStatus==4 ||scope.row.applyStatus==5 ||scope.row.applyStatus==6||scope.row.applyStatus==7||scope.row.applyStatus==8">
                <div>已通过</div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="">
            <template slot-scope="scope">
              <el-button
                  v-if="MenuBtnValid('/declarePlace','查看')"
                  @click="operate('detail', scope.row)"
                  type="text"
                  size="small"
              >查看
              </el-button>
              <el-button
                  v-if="MenuBtnValid('/declarePlace','修改')"
                  @click="operate('edit', scope.row)"
                  type="text"
                  size="small"
                  :disabled="
                  scope.row.applyStatus == 2 || scope.row.applyStatus == 4|| scope.row.applyStatus == 5|| scope.row.applyStatus == 6|| scope.row.applyStatus == 7|| scope.row.applyStatus == 8
                    ? true
                    : false
                "
              >修改
              </el-button>
              <el-button
                  v-if="MenuBtnValid('/declarePlace','删除')"
                  @click="operate('del', scope.row)"
                  type="text"
                  size="small"
                  :disabled="
                   scope.row.applyStatus == 2 || scope.row.applyStatus == 4|| scope.row.applyStatus == 5|| scope.row.applyStatus == 6|| scope.row.applyStatus == 7|| scope.row.applyStatus == 8
                    ? true
                    : false
                "
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pageNum">
        <div class="data_total">共{{ total }}项数据</div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="1005px"
        :before-close="handleClose"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="false"
        top="3vh"
        :close-on-press-escape="false"
    >
      <div class="dialog_content">
        <el-form
            :model="addValue"
            :rules="addValueRules"
            label-width="100px"
            size="small"
            ref="warehousingForm"
        >
          <el-form-item label="小蓝之家" prop="no">
            <el-select
                v-model="addValue.no"
                placeholder="请选择"
                clearable
                filterable
                :disabled="dialogType == 'detail' ? true : false"
            >
              <el-option
                  v-for="item in homeList"
                  :key="item.companyNo"
                  :label="item.name"
                  :value="item.companyNo"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <div class="cont">
            <div class="up_file export_btn" v-if="dialogType == 'detail' ? false : true" v-fastClick
                 @click="exportClick">
              导入全部待上交海塑
            </div>
            <div class="right-text" v-if="dialogType == 'edit'">
              如需修改,请修改接收单信息后,重新导入
            </div>
          </div>


          <el-form-item label="预估重量" prop="estimateWeight">
            <el-input
                placeholder="必须大于等于500KG"
                v-model="addValue.estimateWeight"
                clearable
                maxlength="20"
                :disabled="dialogType == 'detail' ? true : false"
                :controls="false"
            >
              <template slot="append">KG</template>
            </el-input>
          </el-form-item>

          <el-form-item label="预估包数" prop="applyCodeNumber">
            <el-input
                placeholder=""
                v-model="addValue.applyCodeNumber"
                clearable
                maxlength="9"
                :disabled="dialogType == 'detail' ? true : false"
                :controls="false"
            >
              <template slot="append">包</template>
            </el-input>
          </el-form-item>
          <el-form-item label="海塑详情">
            <el-table
                :data="receiveData"
                v-loading="loading"
                element-loading-text="加载中"
                element-loading-spinner="el-icon-loading"
                border
            >
              <el-table-column
                  type="index"
                  :index="getIndex"
                  label="序号"
                  width="60"
              ></el-table-column>
              <el-table-column
                  prop="serialNo"
                  label="接收单号"
                  show-overflow-tooltip
                  width="220"
              ></el-table-column>
              <el-table-column
                  prop="userName"
                  label="上交人"
                  show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                  prop="homeName"
                  label="小蓝之家"
                  width="200"
              ></el-table-column>
              <el-table-column label="上交日期" width="160">
                <template slot-scope="scope">
                  <div>{{ getFormatTime(scope.row.reportTime) }}</div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="weight"
                  label="接收重量(KG)"
                  show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item label="视频" prop="upFileList">
            <div class="mark">(必须有至少7个视频,如不足,请新增或编辑接收单添加视频)</div>
            <div class="file_list">
              <template v-if="upFileList.length">
                <div
                    class="file_group"
                    v-for="(item, index) in upFileList"
                    :key="item.id"
                >
                  <div class="file_preview">
                    <div
                        v-if="
                        item.status !== 'uploading' && dialogType !== 'detail'
                      "
                    ></div>
                    <div @click="handlePreviewVideo(item)" class="bitmap_img"
                         :class="[item.coverPicUrl && item.coverPicUrl.length ? '' : 'bitmap_img_bg']" v-fastClick>
                      <!-- 评级 -->
                      <div v-if="item.videoRating && dialogType != 'add'"
                           :class="item.videoRating==30?'failed rate':'rate'">
                        {{
                          item.videoRating == 10 ? '优' : (item.videoRating == 20 ? '合格' : item.videoRating == 30 ? '不合格' : '')
                        }}
                      </div>
                      <img v-if="item.coverPicUrl && item.coverPicUrl.length" :src="item.coverPicUrl" alt=""
                           draggable="false"/>
                      <img class="palyBtn" src="@/assets/img/home/playBtn.png" alt="播放">
                    </div>
                  </div>
                  <div class="file_name_wrap">
                    <div
                        class="file_name"
                        :class="[dialogType === 'detail' ? 'file_name_detail' : '',]"
                        :title="item.videoName+' '+(item.serialNo|| '')"
                    >
                      <div>{{ item.videoName }}</div>
                      <div>{{ item.serialNo || '' }}</div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="empty_box">暂无视频</div>
              </template>
            </div>
          </el-form-item>

          <el-form-item label="图片" prop="upImageList">
            <div class="file_list">
              <template v-if="upImageList.length">
                <div
                    class="file_group"
                    v-for="(item, index) in upImageList"
                    :key="item.id"
                >
                  <div class="file_preview">
                    <div class="bitmap_img_local" v-fastClick>
                      <div
                          @click.stop="handleSeeImg(item)"
                          class="images_preview"
                          style="
                          width: 100%;
                          height: 100%;
                          position: absolute;
                          z-index: 9;
                        "
                          v-viewer="{ movable: false }"
                      >
                        <!-- 评级 -->
                        <div v-if="item.videoRating && dialogType != 'add'"
                             :class="item.videoRating==30?'failed rate':'rate'">
                          {{
                            item.videoRating == 10 ? '优' : (item.videoRating == 20 ? '合格' : item.videoRating == 30 ? '不合格' : '')
                          }}
                        </div>
                        <img
                            v-if="preview_image"
                            style="
                            width: 0;
                            height: 0;
                            opacity: 0;
                            position: absolute;
                            top: -10px;
                            left: -10px;
                          "
                            :data-source="preview_image"
                            :src="preview_image"
                            alt=""
                        />
                      </div>
                      <img :src="item.local_src" alt="" draggable=""/>
                    </div>
                  </div>
                  <div class="file_name_wrap">
                    <div
                        class="file_name"
                        :class="[dialogType === 'detail' ? 'file_name_detail' : '',]"
                        :title="item.serialNo"
                    >
                      {{ item.serialNo || '' }}
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="empty_box">暂无图片</div>
              </template>
            </div>
          </el-form-item>

          <el-form-item v-if="dialogType !== 'add'" label="审批状态">
            <div v-if="formStatus == 1">待审核</div>
            <div v-else-if="formStatus == 2">已通过</div>
            <div v-else-if="formStatus == 3">未通过</div>
          </el-form-item>
          <el-form-item
              v-if="refuseReason && dialogType !== 'add'"
              label="审核备注"
          >
            <div>{{ refuseReason }}</div>
          </el-form-item>
          <el-form-item label="预计运输日期" v-if="dialogType === 'detail'">
            <div>{{ transportPlanDate }}</div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer">
        <span v-if="dialogType === 'add' || dialogType === 'edit'" class="button_default" @click="handleClose">取消</span>
        <span v-if="dialogType === 'add' || dialogType === 'edit'" class="button_blue"
              :class="{'disableBtn':detailStatus}" @click="handleSubmit">提交审核</span>
        <span v-else-if="dialogType === 'detail' && formStatus == 3" class="button_blue"
              @click="handleDetailData">去修改</span>
      </div>
    </el-dialog>

    <el-dialog
        title="视频预览"
        :visible.sync="model3"
        width="720px"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="true"
        top="10vh"
    >
      <div style="">
        <video
            width="600"
            v-if="model3"
            :src="currentVideoSrc"
            controls
            style="height: 400px; width: 100%"
        ></video>
      </div>
      <div slot="footer">
        <span class="button_blue" @click="model3 = false">确定</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {nanoid} from "nanoid";
import Breadcrumb from "@c/Breadcrumb.vue";

import {
  applyStatus,
  dateOptions,
  datafiltering,
} from "@/utils/enum";
import {getFormatTime} from "@/utils/methods";
import {timeStampSwitch} from "@/utils/util.js";
import {intValid, threeDecimal, estimatedWeight} from "@/utils/validate";

export default {
  name: "declarePlace",
  components: {Breadcrumb},
  data() {
    return {
      tabelHeigth: 500,
      breadData: [{name: "小蓝之家", path: ""}, {name: "清运需求管理"}],

      applyStatus,
      dateOptions,
      datafiltering,
      getFormatTime,
      intValid,
      threeDecimal,
      estimatedWeight,
      // 搜索条件
      formData: {
        status: "",
      },

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      receiveData: [],//根据小蓝之家ID查询接收单

      // 弹框
      dialogVisible: false,

      addValue: {
        no: "",
        estimateWeight: "",
        applyCodeNumber: "",
        upFileList: [],
        upImageList: [],
      },
      addValueRules: {
        no: [{required: true, message: "请选择小蓝之家", trigger: "change"}],
        estimateWeight: [
          {required: true, message: "预估重量必须大于等于500公斤", trigger: "blur"},
          {validator: estimatedWeight, trigger: "blur"},
        ],
        applyCodeNumber: [
          {required: true, message: "请输入预估包数", trigger: "blur"},
          {validator: intValid, trigger: "blur"},
        ],
        upFileList: [{required: true, message: "需要至少7个视频", trigger: "change"}],
        upImageList: [{required: true, message: "需要至少1张图片", trigger: "change"}],
      },

      model3: false, //视频预览弹窗
      // fromSubmitState: false, //控制表单是否点击了提交按钮

      currentVideoSrc: "", //预览的视频地址
      upFileList: [],
      upImageList: [],
      preview_image: "", //图片预览
      currentData: {},
      homeList: [], //当前账号下的小蓝之家
      formStatus: "", //表单审核状态
      refuseReason: "", //审核原因
      transportPlanDate: "",//预计运输日期
      dialogType: "",
      loading: false,
      detailStatus: false,//1"待审核",2"已通过",3"未通过",若是3,则说明是已驳回的,需要禁用提交审核按钮
    };
  },
  computed: {
    dialogTitle() {
      return this.dialogType == "add"
          ? "新增"
          : this.dialogType == "edit"
              ? "修改"
              : "查看";
    },
    btnHidden() {
      // return this.$store.state.userInfo &&
      //   this.$store.state.userInfo.roleIds &&
      //   this.$store.state.userInfo.roleIds[0]
      //   ? this.$store.state.userInfo.roleIds[0]
      //   : "";
      return this.$store.state.addTask ? 2 : ''
    },
  },
  created() {
    this.initPage();
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.tabelHeigth =
          document.querySelector("#declare_place").offsetHeight -
          256 -
          document.querySelector("#search").offsetHeight;
    });
    window.onresize = () => {
      if (
          document.querySelector("#declare_place") &&
          document.querySelector("#declare_place").offsetHeight &&
          document.querySelector("#search") &&
          document.querySelector("#search").offsetHeight
      ) {
        self.tabelHeigth =
            document.querySelector("#declare_place").offsetHeight -
            256 -
            document.querySelector("#search").offsetHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {
    };
  },
  activated() {
  },
  methods: {
    // 搜索
    handleSearch() {
      this.pageNum = 1;
      this.initPage();
    },

    initPage() {
      this.loading = true;

      this.$http(this.GLOBALApi.declareGetPage(), {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        applyStatus: this.formData.kinds, //状态 1:待审核 2：已通过 3：未通过
        // homeType: "", //小蓝之家类型 1：内陆 2：海岛
        // homeUserId: this.$store.state.addTask?this.$store.state.userInfo.id:'',
        dateStatus: this.formData.date, //时间筛选 1：本周 2：本月 3：本季度
      })
          .then((res) => {
            if (res.code == 200) {
              this.loading = false;
              this.tableData = res.data.records || [];
              this.total = res.data.total || 0;
            } else {
              this.loading = false;
              this.$message({
                message: res.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            this.loading = false;
            this.$message({
              message: error.msg,
              type: "error",
              duration: 1500,
            });
          });
    },
    handleChange() {
      this.pageNum = 1;
      this.$nextTick(() => {
        this.initPage();
      });
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1;
      } else {
        return index + 1;
      }
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.$nextTick(() => {
        this.initPage();
      });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.$nextTick(() => {
        this.initPage();
      });
    },

    // 导入全部待上交海塑
    exportClick() {
      if (!this.addValue.no) {
        this.$message({
          message: '请先选择小蓝之家',
          type: "error",
          duration: 1500,
        });
      } else {
        this.detailStatus = false
        let params = {
          no: this.addValue.no,
          // pageNum: 1,
          // pageSize: 99999999,
        };
        this.receiveData = [];
        // console.log('11111111111')
        this.$http(this.GLOBALApi.getReceiveOrderById(), params)
            .then((res) => {
              if (res.code === 200 && res.data) {
                // this.total = res.data.total;
                let data = res.data || [];
                if (!data.orderResList) {
                  this.$message.warning("暂无数据")
                  return
                }
                this.$nextTick(() => {
                  this.receiveData = data.orderResList
                  this.addValue.estimateWeight = data.weight
                  this.addValue.applyCodeNumber = data.plasticNumber

                  // 图片
                  let temp_img_list = [];
                  if (data.orderResList && data.orderResList.length) {
                    data.orderResList.map((item) => {
                      item.picUrlList.map((s_item) => {
                        temp_img_list.push(s_item)
                      })
                    })
                  }
                  this.upFileList = [];
                  this.upImageList = [];
                  if (temp_img_list && temp_img_list.length) {
                    temp_img_list.map((item) => {
                      let temp_suffix = item.videoUrl ? item.videoUrl.substring(
                          item.videoUrl.lastIndexOf(".") + 1,
                          item.videoUrl.length
                      ) : '';
                      // let img_name = item.substring(0, item.lastIndexOf("."));
                      this.upImageList.push({
                        file: "", //从桌面选中的文件
                        id: nanoid(), //主键
                        name: item.name,
                        local_src: item.videoUrl,
                        suffix: temp_suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
                        fileType: "image", //文件类型
                        status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                        message: "上传成功", //上传信息显示
                        up_url: item.videoUrl, //上传成功后用这个字段
                        videoRating: item.videoRating || "",//视频级别 10:优 20:合格30:不合格
                        serialNo: item.serialNo,//接收单号
                        detailId: item.id || '',
                        videoType: item.videoType, // 1视频   2图片

                      });
                    });
                  }

                  // 视频
                  let temp_video_list = [];
                  if (data.orderResList && data.orderResList.length) {
                    data.orderResList.map((item) => {
                      item.videoUrlList.map((s_item) => {
                        temp_video_list.push(s_item)
                      })
                    })
                  }
                  if (temp_video_list && temp_video_list.length) {
                    temp_video_list.map((item) => {
                      let suffix = item.videoUrl ? item.videoUrl.substring(
                          item.videoUrl.lastIndexOf(".") + 1,
                          item.videoUrl.length
                      ) : '';
                      this.upFileList.push({
                        file: "", //从桌面选中的文件
                        id: item.id, //主键
                        videoName: item.videoName,
                        local_src: item.videoUrl,
                        suffix: suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
                        fileType: "video", //文件类型
                        status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                        message: "上传成功", //上传信息显示
                        up_url: item.videoUrl, //上传成功后用这个字段
                        coverPicUrl: item.coverPicUrl || "",//封面预览地址
                        videoRating: item.videoRating || "",//视频级别 10:优 20:合格30:不合格
                        serialNo: item.serialNo,//接收单号
                        detailId: item.id || '', //视频id
                        videoType: item.videoType, // 1视频   2图片
                      });
                    });
                  }

                  this.addValue.upImageList = this.upImageList || [];
                  this.addValue.upFileList = this.upFileList || [];
                })
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((error) => {
              this.$message.error(error.msg);
            });
      }
    },

    // 查看
    getDeclareDetail(row) {
      this.detailStatus = false
      this.$http(this.GLOBALApi.declareDetail(), {
        no: row.orderNo,
      })
          .then((res) => {
            if (res.code == 200) {
              console.log(1111111111)
              if (res.data.applyStatus == 3) {
                this.detailStatus = true
              }
              let temp_img_list = res.data.picUrlList || [];
              // if (res.data.picUrl && res.data.picUrl.length) {
              //   temp_img_list = res.data.picUrl.split(",");
              // }
              this.upFileList = [];
              this.upImageList = [];

              if (temp_img_list && temp_img_list.length) {
                temp_img_list.map((item) => {
                  let temp_suffix = item.videoUrl ? item.videoUrl.substring(
                      item.videoUrl.lastIndexOf(".") + 1,
                      item.videoUrl.length
                  ) : '';
                  // let img_name = item.substring(0, item.lastIndexOf("."));
                  this.upImageList.push({
                    file: "", //从桌面选中的文件
                    id: nanoid(), //主键
                    name: item.name,
                    local_src: item.videoUrl,
                    suffix: temp_suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
                    fileType: "image", //文件类型
                    status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                    message: "上传成功", //上传信息显示
                    up_url: item.videoUrl, //上传成功后用这个字段
                    videoRating: item.videoRating || "",//视频级别 10:优 20:合格30:不合格
                    serialNo: item.serialNo,//接收单号
                    detailId: item.id || '',
                  });
                });
              }

              if (res.data.videoList && res.data.videoList.length) {
                res.data.videoList.map((item) => {
                  let suffix = item.videoUrl ? item.videoUrl.substring(
                      item.videoUrl.lastIndexOf(".") + 1,
                      item.videoUrl.length
                  ) : '';
                  this.upFileList.push({
                    file: "", //从桌面选中的文件
                    id: item.id, //主键
                    videoName: item.videoName,
                    local_src: item.videoUrl,
                    suffix: suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
                    fileType: "video", //文件类型
                    status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                    message: "上传成功", //上传信息显示
                    up_url: item.videoUrl, //上传成功后用这个字段
                    coverPicUrl: item.coverPicUrl || "",//封面预览地址
                    videoRating: item.videoRating || "",//视频级别 10:优 20:合格30:不合格
                    serialNo: item.serialNo,//接收单号
                    detailId: item.id || '' //视频id
                  });
                });
              }
              this.addValue = {
                no: res.data.homeNo,
                estimateWeight: res.data.estimateWeight,
                applyCodeNumber: res.data.applyCodeNumber,
                upImageList: this.upImageList || [],
                upFileList: this.upFileList || [],
              };
              this.receiveData = res.data.receiveOrderRes
              //applyStatus 状态 1:待审核 2：已通过 3：未通过
              if (res.data.applyStatus == 4 || res.data.applyStatus == 5 || res.data.applyStatus == 6 || res.data.applyStatus == 7 || res.data.applyStatus == 8) {
                this.formStatus = 2;
              } else {
                this.formStatus = res.data.applyStatus;
              }
              try {
                this.transportPlanDate = res.data.transportPlanDate ? timeStampSwitch(res.data.transportPlanDate, "day", "yy/mm/dd") : "";
              } catch (error) {
                this.transportPlanDate = ""
              }
              this.refuseReason = res.data.refuseReason || "";
              this.dialogVisible = true;
              this.$nextTick(() => {
                this.$refs["warehousingForm"].clearValidate();
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            this.$message({
              message: error.msg,
              type: "error",
              duration: 1500,
            });
          });
    },
    handlePreviewVideo(arg) {
      if (arg.status === "done") {
        this.currentVideoSrc = arg.up_url;
        this.model3 = true;
      }
    },

    handleClose() {
      this.dialogVisible = false;
    },
    handleSubmit() {
      if (this.detailStatus) {
        this.$message({
          message: '请重新导入',
          type: "error",
          duration: 1500,
        });
        return
      }
      this.$refs.warehousingForm.validate((valid) => {
        if (valid) {
          if (this.upFileList.length < 7) {
            this.$message({
              message: '需要至少7个视频',
              type: "error",
              duration: 1500,
            });
          } else if (!this.upImageList.length) {
            this.$message({
              message: "需要至少1张图片",
              type: "error",
              duration: 1500,
            });
          } else {
            let videoList = [];
            this.upFileList.map((item) => {
              videoList.push({
                videoUrl: item.up_url,
                name: item.name,
                serialNo: item.serialNo,
                id: item.detailId || '',

              });
            })
            let imgList = [];
            this.upImageList.map((item) => {
              console.log(item, 'item+++++++++++++')
              imgList.push({
                videoUrl: item.up_url,
                name: item.name,
                serialNo: item.serialNo,
                id: item.detailId || ''
              });
            })

            //  temp_img_list = res.data.picUrl.split(",");
            let receiveOrderNos = []//接收单ID集合
            this.receiveData.map((item) => {
              item.orderNo ? receiveOrderNos.push(item.orderNo) : '';
            })

            if (this.dialogType === "add") {
              //新增
              this.continueOperation(videoList, imgList, receiveOrderNos);
            } else if (this.dialogType === "edit") {
              this.editOperation(videoList, imgList, receiveOrderNos);
            }
          }

        } else {
          return false;
        }
      });
    },
    handleDetailData() {
      if (this.formStatus == 3) {
        //未通过
        this.dialogType = "edit";
      } else {
        this.dialogVisible = false;
      }
    },

    //新增表单
    continueOperation(videoList, imgList, receiveOrderNos) {
      let temp_weight = this.addValue.estimateWeight * 1;
      let param = {
        homeNo: this.addValue.no,
        estimateWeight: temp_weight, //预估重量
        applyCodeNumber: this.addValue.applyCodeNumber * 1, //包数
        videoList,
        picUrlList: imgList,
        receiveOrderNos
      };
      if (temp_weight < 500) {
        this.$message({
          message: '预估重量必须大于等于500KG',
          type: "warning",
          duration: 1500,
        });
        return
      }
      this.$http(this.GLOBALApi.declareCreate(), param)
          .then((res) => {
            if (res.code == 200) {
              this.dialogVisible = false;
              this.pageNum = 1;
              this.$message({
                message: "新增成功！",
                type: "success",
                duration: 1500,
              });
              this.$nextTick(() => {
                this.initPage();
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            this.$message({
              message: error.msg,
              type: "error",
              duration: 1500,
            });
          });
    },
    //修改表单
    editOperation(videoList, imgList, receiveOrderNos) {
      let param = {
        // id: this.currentData.id,
        orderNo: this.currentData.orderNo,
        homeNo: this.addValue.no,
        estimateWeight: this.addValue.estimateWeight * 1, //预估重量
        applyCodeNumber: this.addValue.applyCodeNumber * 1, //包数
        videoList,
        picUrlList: imgList,
        receiveOrderNos
      };
      this.$http(this.GLOBALApi.declareUpdate(), param)
          .then((res) => {
            if (res.code == 200) {
              this.dialogVisible = false;
              // this.pageNum = 1;
              this.$message({
                message: "编辑成功！",
                type: "success",
                duration: 1500,
              });
              this.$nextTick(() => {
                this.initPage();
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            this.$message({
              message: error.msg,
              type: "error",
              duration: 1500,
            });
          });
    },
    handleSeeImg(arg) {
      console.log(333333333)
      this.preview_image = arg.up_url;
      const viewerPreview = document.querySelector(".images_preview").$viewer;
      viewerPreview.show();
    },
    // 操作
    operate(type, row) {
      this.upFileList = [];
      this.upImageList = [];
      this.homeList = [];
      this.receiveData = []
      this.addValue = {
        no: "",
        estimateWeight: "",
        applyCodeNumber: "",
        upFileList: [],
        upImageList: [],
      };
      this.currentData = row;

      switch (type) {
        case "add":
          this.dialogType = "add";
          this.getHomeList(() => {
            this.dialogVisible = true;
            this.$nextTick(() => {
              this.$refs["warehousingForm"].clearValidate();
            });
          });
          break;
        case "detail":
          this.dialogType = "detail";
          this.getHomeList();
          this.getDeclareDetail(row);
          break;
        case "edit":
          this.dialogType = "edit";
          this.getHomeList();
          this.getDeclareDetail(row);
          break;
        case "del":
          var that = this;

          this.$confirm("确认删除？")
              .then(() => {
                that
                    .$http(that.GLOBALApi.declareDelete(), {no: row.orderNo})
                    .then((res) => {
                      if (res.code == 200) {
                        that.pageNum = 1;
                        that.$message({
                          message: "删除成功！",
                          type: "success",
                          duration: 1500,
                        });
                        that.$nextTick(() => {
                          that.initPage();
                        });
                      } else {
                        that.$message({
                          message: res.msg,
                          type: "warning",
                          duration: 1500,
                        });
                      }
                    })
                    .catch((error) => {
                      that.$message({
                        message: error.msg,
                        type: "error",
                        duration: 1500,
                      });
                    });
              })
              .catch((error) => {
              });

          break;
        default:
          break;
      }
    },
    getHomeList(callBack) {
      this.$http(this.GLOBALApi.getXiaolanData(), {})
          .then((res) => {
            if (res.code == 200) {
              this.homeList = res.data || [];
              // 如果只有一个小蓝之家,默认选择
              // 如果有多个小蓝之家,不选择
              if (this.dialogType == 'add') {
                if (res.data && res.data.length == 1) {
                  this.addValue.no = res.data[0].companyNo
                } else {
                  this.addValue.no = ""
                }
              }
              
              callBack && callBack();
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
                duration: 1500,
              });
            }
          })
          .catch((error) => {
            this.$message({
              message: error.msg,
              type: "error",
              duration: 1500,
            });
          });
    },
  },
};
</script>

<style lang="less" scoped>
.declare_place {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.main {
  margin-top: 16px;
  // box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.1);
  padding: 32px 24px 32px 32px;
  background-color: #fff;
}

// 搜索
.search {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /deep/ .el-input.el-input--small.el-input--suffix {
    width: 320px;
  }
}

.search_bt {
  min-width: 150px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > div {
    margin-left: 10px;
  }
}

.button_white {
  color: #0052d9;
  border: solid 1px #0052d9;
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.button_white:hover {
  background-color: #ecf5ff;
}

.button_default,
.button_blue {
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.button_blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

.button_blue:hover {
  background-color: #66b1ff;
  // border: solid 1px #66b1ff;
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

// 表格
.table {
  margin-bottom: 40px;
}

// 分页
.pageNum {
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

.data_total {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

// 弹窗
.dialog_content {
  color: #303133;
  font-size: 14px;

  /deep/ .el-input.el-input--small {
    width: 440px;
  }
}

/deep/ .el-dialog__footer {
  display: flex;
  justify-content: flex-end;

  .button_default {
    display: inline-block;
    background: #fff;
    opacity: 1;
    border: 1px solid #dcdfe6;
    color: #303133;
    padding: 0;
    margin: 0 12px;
  }

  .button_default:hover {
    background-color: #ecf5ff;
  }

  .button_blue {
    display: inline-block;
    padding: 0 12px;
  }
}

/deep/ .el-loading-spinner {
  i.el-icon-loading {
    font-size: 20px;
    line-height: 40px;
  }
}

.cont {
  display: flex;

  .up_file {
    width: 88px;
    height: 32px;
    background: #0052d9;
    border-radius: 4px 4px 4px 4px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffffff;
    line-height: 32px;
  }

  .up_file_dis {
    background: #b1b1b1;
  }

  // 1.0.4
  .export_btn {
    width: 515px;
    margin-bottom: 20px;
    margin-left: 23px;
    cursor: pointer;
    height: 35px;
  }

  .right-text {
    height: 35px;
    line-height: 35px;
    margin-left: 20px;
    color: #9e9c9c;
  }
}


.file_list {
  width: 100%;
  min-height: 100px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .empty_box {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: rgb(133, 133, 133);
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 12px;
  }

  .file_group {
    width: 136px;
    margin-right: 12px;
    margin-bottom: 10px;
  }

  .file_group:nth-child(4n) {
    // margin-right: 0px;
  }

  .file_preview {
    position: relative;
    width: 136px;
    height: 136px;
  }


  .tips_wrap {
    position: absolute;
    z-index: 2;
    width: 136px;
    height: 136px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    text-align: center;
  }

  .tips_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .file_loading {
    font-size: 20px;
    color: #fff;
  }

  .loading_tips {
    text-align: center;
    font-size: 12px;
    color: #fff;
    line-height: 12px;
  }

  .up_failed {
    position: absolute;
    z-index: 2;
    width: 136px;
    height: 136px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    text-align: center;
  }

  .failed_tips {
    font-size: 20px;
    color: #fff;
  }

  .file_name_wrap {
    width: 136px;
    display: flex;
    justify-content: flex-start;
    margin-top: 4px;
  }

  .bitmap_img {
    width: 136px;
    height: 136px;
    cursor: pointer;
    position: relative;

    .palyBtn {
      display: inline-block;
      width: 40px;
      height: 40px;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
    }

    .rate {
      font-size: 12px;
      text-align: center;
      padding: 2px 8px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      top: 0;

      //不合格标红
      &.failed {
        color: red;
        background: #fff;
      }
    }
  }

  .bitmap_img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bitmap_img_bg {
    background: url("~@/assets/img/preview.png") center center no-repeat;
    background-size: 100% 100%;
  }

  .bitmap_img_local {
    position: relative;
    width: 136px;
    height: 136px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .rate {
      font-size: 12px;
      text-align: center;
      padding: 2px 8px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      top: 0;

      //不合格标红
      &.failed {
        color: red;
        background: #fff;
      }
    }

  }

  .file_name {
    width: 116px;
    max-width: 116px;
    font-size: 12px;
    line-height: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: nowrap;
  }

  .file_name_detail {
    width: 130px;
    max-width: 130px;
  }

  .file_edit {
    width: 20px;
    height: 20px;
    cursor: pointer;
    text-align: center;
    font-size: 18px;
  }
}

.mark {
  color: rgb(158, 156, 156);
}

.disableBtn {
  background-color: #b1b1b1 !important;
  border: #b1b1b1;
}
</style>
