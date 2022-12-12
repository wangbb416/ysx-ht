<!--接收管理-->
<template>
  <div id="receiveManage" class="receiveManage">
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
            <el-form-item label="接收单号" style="margin-right: 80px">
              <el-input
                  clearable
                  @change="handleChange"
                  v-model="formData.serialNumber"
                  placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="清运状态" style="margin-right: 80px">
              <el-select
                  clearable
                  v-model="formData.kinds"
                  placeholder="请选择"
                  @change="handleChange"
              >
                <el-option
                    v-for="item in clearTransportStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
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
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
          <!-- v-if="btnHidden == 2" -->
          <div
              class="button_blue"
              @click="operate('add')"
              v-fastClick
              v-if="MenuBtnValid('/receiveManage','新增')"
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
              label="接收单号"
              show-overflow-tooltip
              width="240"
          ></el-table-column>
          <el-table-column
              prop="userName"
              label="上交人"
              show-overflow-tooltip
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
              prop="weight"
              label="接收重量(KG)"
              show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="清运状态">
            <template slot-scope="scope">
              <div
                  v-if="
                  scope.row.applyStatus == 1 ||
                  scope.row.applyStatus == 2 ||
                  scope.row.applyStatus == 3 ||
                  scope.row.applyStatus == 4
                "
              >
                {{
                  datafiltering(scope.row.applyStatus, clearTransportStatus)
                      .label || '-'
                }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                  @click="operate('detail', scope.row)"
                  type="text"
                  size="small"
                  v-if="MenuBtnValid('/receiveManage','查看')"
              >
                查看
              </el-button>
              <el-button
                  v-if="MenuBtnValid('/receiveManage','修改')"
                  @click="selectOperate(scope.row)"
                  type="text"
                  size="small"
                  :disabled="scope.row.applyStatus == 1 || scope.row.applyStatus == 4 ? false : true"
              >
                修改
              </el-button>
              <el-button
                  v-if="MenuBtnValid('/receiveManage','删除')"
                  @click="operate('del', scope.row)"
                  type="text"
                  size="small"
                  :disabled="scope.row.applyStatus != 1 ? true : false"
              >
                删除
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
        ></el-pagination>
      </div>
    </div>

    <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="720px"
        :before-close="handleClose"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="false"
        top="10vh"
        :close-on-press-escape="false"
    >
      <div class="dialog_content">
        <el-form
            :model="addValue"
            :rules="addValueRules"
            label-width="120px"
            size="small"
            ref="warehousingForm"
        >
          <el-form-item label="接收小蓝之家" prop="homeNo">
            <el-select
                @change="selectHome"
                v-model="addValue.homeNo"
                placeholder="请选择"
                filterable
                :disabled="dialogType == 'add' || dialogType=='edit' ? false : true"
            >
              <el-option
                  v-for="item in homeList"
                  :key="item.companyNo"
                  :label="item.name"
                  :value="item.companyNo"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上交人" prop="ant">
            <el-select
                v-model="addValue.ant"
                placeholder="请选择"
                clearable
                filterable
                :disabled="dialogType == 'add' || dialogType=='edit' ? false : true"
            >
              <el-option
                  v-for="item in antData"
                  :key="item.clientNo"
                  :label="item.name"
                  :value="item.clientNo"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="weight">
            <template slot="label">
              <span class="star">*</span>
              接收详情
            </template>
            <div
                v-for="(item, index) in addValue.receive"
                :key="index"
                class="receiveDetail"
            >
              <template v-if="dialogType == 'add'">
                <el-checkbox @change="selectReceiveKinds" v-model="item.check">
                  {{ item.label }}
                </el-checkbox>
                <div style="display: flex">
                  <span class="star">*</span>
                  重量:
                  <el-input
                      placeholder=""
                      v-model="item.weight"
                      @change="selectReceiveKinds"
                      clearable
                      maxlength="10"
                      onkeyup="this.value=this.value.replace(/^0/g, '').replace(/[^0-9]/g, '')"
                      style="width: 200px; margin-left: 8px"
                  >
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </template>
              <template v-if="dialogType != 'add' && item.check">
                <el-checkbox
                    :disabled="dialogType == 'add' || dialogType=='edit' ? false : true"
                    @change="selectReceiveKinds"
                    v-model="item.check"
                >
                  {{ item.label }}
                </el-checkbox>
                <div style="display: flex">
                  <span class="star">*</span>
                  重量:
                  <el-input
                      placeholder=""
                      v-model="item.weight"
                      @change="selectReceiveKinds"
                      clearable
                      maxlength="10"
                      :disabled="dialogType == 'add' || dialogType=='edit' ? false : true"
                      onkeyup="this.value=this.value.replace(/^0/g, '').replace(/[^0-9]/g, '')"
                      style="width: 200px; margin-left: 8px"
                  >
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </template>
            </div>
            <!-- 查看  仅展示已勾选的 -->
          </el-form-item>
          <el-form-item prop="">
            <template slot="label">
              <span class="star">*</span>
              接收合计重量
            </template>
            {{ addValue.weight || 0 }}kg
          </el-form-item>

          <el-form-item label="上传视频" prop="upFileList">
            <el-upload
                :disabled="upFileList.length >= 100 || dialogType === 'detail'"
                action=""
                :multiple="true"
                :show-file-list="false"
                :http-request="uploadHttpFixed"
                accept=".mp4,.mov"
                class="uploadVideo"
            >
              <div
                  class="up_file"
                  :class="[
                  upFileList.length >= 100 || dialogType === 'detail'
                    ? 'up_file_dis'
                    : ''
                ]"
              >
                点击上传
              </div>
            </el-upload>
            <div class="file_list">
              <template v-if="upFileList.length">
                <div
                    class="file_group"
                    v-for="(item, index) in upFileList"
                    :key="item.id"
                >
                  <div class="file_preview">
                    <div
                        @click="handleDeleteVideo(index, item)"
                        class="file_delete el-icon-close"
                        v-if="
                        item.status !== 'uploading' && dialogType !== 'detail'
                      "
                    ></div>
                    <div class="tips_wrap" v-if="item.status === 'uploading'">
                      <div class="tips_content">
                        <div class="file_loading el-icon-loading"></div>
                        <div class="loading_tips">上传中...</div>
                      </div>
                    </div>
                    <div class="up_failed" v-else-if="item.status === 'failed'">
                      <div class="tips_content">
                        <div class="failed_tips el-icon-warning"></div>
                        <div class="loading_tips">上传失败</div>
                      </div>
                    </div>
                    <div
                        @click="handlePreviewVideo(item)"
                        class="bitmap_img"
                        :class="[
                        item.coverPicUrl && item.coverPicUrl.length
                          ? ''
                          : 'bitmap_img_bg'
                      ]"
                        v-fastClick
                    >
                      <img
                          v-if="item.coverPicUrl && item.coverPicUrl.length"
                          :src="item.coverPicUrl"
                          alt=""
                          draggable="false"
                      />
                      <img
                          class="palyBtn"
                          src="@/assets/img/home/playBtn.png"
                          alt="播放"
                      />
                      <!-- <div class="rate not">不合格</div> -->
                      <div
                          v-if="item.videoRating && dialogType != 'add'"
                          class="rate"
                          :class="item.videoRating == 30 ? 'not' : ''"
                      >
                        {{
                          item.videoRating == 10
                              ? '优'
                              : item.videoRating == 20
                                  ? '合格'
                                  : item.videoRating == 30
                                      ? '不合格'
                                      : ''
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="file_name_wrap">
                    <div
                        class="file_name"
                        :class="[
                        dialogType === 'detail' ? 'file_name_detail' : ''
                      ]"
                        :title="item.name"
                    >
                      {{ item.name }}
                    </div>
                    <div
                        v-if="dialogType !== 'detail'"
                        @click="handleEditName(item, index)"
                        class="file_edit el-icon-edit-outline"
                    ></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="empty_box">暂无视频</div>
              </template>
            </div>
          </el-form-item>

          <el-form-item label="上传图片" prop="upImageList">
            <el-upload
                :disabled="upImageList.length >= 100 || dialogType === 'detail'"
                action=""
                :multiple="true"
                :show-file-list="false"
                :http-request="uploadImageHttp"
                accept=".jpg,.jpeg,.png,.gif"
            >
              <div
                  class="up_file"
                  :class="[
                  upImageList.length >= 100 || dialogType === 'detail'
                    ? 'up_file_dis'
                    : ''
                ]"
              >
                点击上传
              </div>
            </el-upload>

            <div class="file_list">
              <template v-if="upImageList.length">
                <vuedraggable
                    :disabled="dialogType === 'detail'"
                    class="wrapper"
                    v-model="upImageList"
                >
                  <div
                      class="file_group"
                      v-for="item in upImageList"
                      :key="item.id"
                  >
                    <div class="file_preview">
                      <div
                          @click.stop="handleDeleteImage(item)"
                          class="file_delete el-icon-close"
                          v-if="
                          item.status !== 'uploading' && dialogType !== 'detail'
                        "
                      ></div>
                      <div class="tips_wrap" v-if="item.status === 'uploading'">
                        <div class="tips_content">
                          <div class="file_loading el-icon-loading"></div>
                          <div class="loading_tips">上传中...</div>
                        </div>
                      </div>
                      <div
                          class="up_failed"
                          v-else-if="item.status === 'failed'"
                      >
                        <div class="tips_content">
                          <div class="failed_tips el-icon-warning"></div>
                          <div class="loading_tips">上传失败</div>
                        </div>
                      </div>
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
                          <img
                              v-if="preview_image"
                              style="
                              width: 0px;
                              height: 0px;
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
                        <div
                            v-if="item.videoRating && dialogType != 'add'"
                            class="rate"
                            :class="item.videoRating == 30 ? 'not' : ''"
                        >
                          {{
                            item.videoRating == 10
                                ? '优'
                                : item.videoRating == 20
                                    ? '合格'
                                    : item.videoRating == 30
                                        ? '不合格'
                                        : ''
                          }}
                        </div>
                        <img :src="item.local_src" alt="" draggable=""/>
                      </div>
                    </div>
                  </div>
                </vuedraggable>
              </template>
              <template v-else>
                <div class="empty_box">暂无图片</div>
              </template>
            </div>
          </el-form-item>
          <el-form-item v-if="dialogType === 'detail'" label="清运状态">
            <div v-if="addValue.applyStatus == 1">待申请清运</div>
            <div v-else-if="addValue.applyStatus == 2">清运待审核</div>
            <div v-else-if="addValue.applyStatus == 3">清运已通过</div>
            <div v-else-if="addValue.applyStatus == 4">清运已驳回</div>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer">
        <span
            v-if="dialogType != 'detail'"
            class="button_default"
            @click="handleClose"
        >
          取消
        </span>
        <span
            v-if="dialogType != 'detail'"
            class="button_blue"
            @click="handleSubmit"
        >
          提交
        </span>
      </div>
    </el-dialog>

    <el-dialog
        :show-close="false"
        title="编辑视频名称"
        :visible.sync="model2"
        width="720px"
        :before-close="handleClose"
        :modal-append-to-body="true"
        :append-to-body="true"
        :close-on-click-modal="false"
        top="10vh"
        :close-on-press-escape="false"
    >
      <div class="dialog_content">
        <el-form label-width="80px" size="small">
          <el-form-item label="视频名称">
            <el-input
                placeholder="请输入视频名称"
                v-model.trim="videoName"
                clearable
                maxlength="100"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <span class="button_default" @click="model2 = false">取消</span>
        <span class="button_blue" @click="handleSureSetName" v-fastClick>
          确定
        </span>
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
import {nanoid} from 'nanoid'
import md5 from 'js-md5'
import Breadcrumb from '@c/Breadcrumb.vue'
import vuedraggable from 'vuedraggable'

var OSS = require('ali-oss')
import {
  statusOptions,
  clearTransportStatus,
  dateOptions,
  datafiltering
} from '@/utils/enum'
import {getFormatTime} from '@/utils/methods'
import {intValid, threeDecimal, estimatedWeight} from '@/utils/validate'

export default {
  name: 'receiveManage',
  components: {Breadcrumb, vuedraggable},
  data() {
    return {
      ossConfig: {
        region: '',
        accessKeyId: '',
        accessKeySecret: '',
        bucket: '',
        stsToken: '',
        secure: true //配置是否为https请求true为https,false为http
      },
      ossClient: null,
      ossTimeStamp: null,
      tabelHeigth: 500,
      breadData: [{name: '小蓝之家', path: ''}, {name: '接收管理'}],
      statusOptions,
      clearTransportStatus,
      dateOptions,
      datafiltering,
      getFormatTime,
      intValid,
      threeDecimal,
      estimatedWeight,
      // 搜索条件
      formData: {
        serialNumber: '', //
        status: ''
      },

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      // 弹框
      dialogVisible: false,

      addValue: {
        ant: '',
        homeNo: '',
        weight: '',
        upFileList: [],
        upImageList: [],
        receive: [], //接收详情
        applyStatus: ''
      },
      addValueRules: {
        homeNo: [
          {required: true, message: '请选择接收小蓝之家', trigger: 'change'}
        ],
        ant: [{required: true, message: '请选择上交人', trigger: 'change'}],
        // weight: [
        //   { required: true, message: "请填写接收详情", trigger: "blur" },
        //   { validator: estimatedWeight, trigger: "blur" },
        // ],
        // weight: [
        //   { required: true, message: "请选择接收详情", trigger: "blur" },
        //   { validator: intValid, trigger: "blur" },
        // ],
        upFileList: [
          {required: true, message: '请上传视频', trigger: 'change'}
        ],
        upImageList: [
          {required: true, message: '请上传图片', trigger: 'change'}
        ]
      },

      model2: false, //修改视频名称弹窗
      model3: false, //视频预览弹窗
      fromSubmitState: false, //控制表单是否点击了提交按钮
      // limitValue: 20,
      currentId: '', //修改视频名称的id
      currentIndex: '', //修改视频名称的序列号
      currentVideoSrc: '', //预览的视频地址
      videoName: '', //修改的视频名称
      upFileList: [],
      upImageList: [],
      preview_image: '', //图片预览
      currentData: {},
      homeList: [], //当前账号下的小蓝之家

      dialogType: '',
      loading: false,

      //seaPlasticType:[],//塑料块类型
      seaPlasticTypeDict: [], //海塑种类
      antData: [],
      detailVideoList:[]//详情接口,视频的list
    }
  },
  watch: {
    // "addValue.homeNo":{
    //     handler(newVal){
    //         this.addValue.ant = ""
    //         if (!newVal) {
    //             return
    //         } else {
    //             this.getAntData()
    //         }
    //     }
    // },
  },
  computed: {
    dialogTitle() {
      return this.dialogType == 'add'
          ? '新增'
          : this.dialogType == 'edit' || this.dialogType == 'partEdit'
              ? '修改'
              : '查看'
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
    // this.MenuBtnValid()
    this.initPage()
  },

  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.pageNum = 1
      this.initPage()
    },

    initPage() {
      this.loading = true

      this.$http(this.GLOBALApi.getreceiveOrder(), {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        serialNumber: this.formData.serialNumber,
        applyStatus: this.formData.kinds, //状态 1:待申请 2：已申请
        dateStatus: this.formData.date //时间筛选 1：本周 2：本月 3：本季度
      })
          .then(res => {
            if (res.code == 200) {
              this.loading = false
              this.tableData = res.data.records || []
              this.total = res.data.total || 0
            } else {
              this.loading = false
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1500
              })
            }
          })
          .catch(error => {
            this.loading = false
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
          })
    },
    handleChange() {
      this.pageNum = 1
      this.$nextTick(() => {
        this.initPage()
      })
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.$nextTick(() => {
        this.initPage()
      })
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.$nextTick(() => {
        this.initPage()
      })
    },
    // 勾选海塑种类change
    selectReceiveKinds() {
      this.addValue.weight = 0
      for (const key in this.addValue.receive) {
        if (Object.hasOwnProperty.call(this.addValue.receive, key)) {
          let check = this.addValue.receive[key].check
          if (check) {
            let weight = this.addValue.receive[key].weight
            this.$nextTick(() => {
              this.addValue.weight = this.addValue.weight * 1 + weight * 1
            })
          }
        }
      }
    },
    // 小蓝之家change
    selectHome() {
      this.addValue.ant = ''
      this.getAntData()
    },

    // 详情接口
    getDeclareDetail(row) {
      console.log(row, "---------");
      this.$http(this.GLOBALApi.detailreceiveOrder(), {
        no: row.orderNo
      })
          .then(res => {
            if (res.code == 200) {
              // 图片
              let temp_img_list = []
              let temp_img_detail = []
              if (res.data.picUrlList && res.data.picUrlList.length) {
                res.data.picUrlList.map(item => {
                  item.videoUrl ? temp_img_list.push(item.videoUrl) : ''
                  temp_img_detail.push(item)
                })
              }

              this.upFileList = []
              this.upImageList = []

              if (temp_img_list && temp_img_list.length) {
                temp_img_list.map((item, index) => {
                  let temp_suffix = item.substring(
                      item.lastIndexOf('.') + 1,
                      item.length
                  )
                  let img_name = item.substring(0, item.lastIndexOf('.'))
                  this.upImageList.push({
                    file: '', //从桌面选中的文件
                    id: nanoid(), //主键
                    name: img_name,
                    local_src: item,
                    suffix: temp_suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
                    fileType: 'image', //文件类型
                    status: 'done', //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                    message: '上传成功', //上传信息显示
                    up_url: item, //上传成功后用这个字段
                    videoRating: temp_img_detail[index].videoRating || '',
                    detailId: temp_img_detail[index].id || '',
                  })
                })
              }

              // 视频
              if (res.data.videoUrlList && res.data.videoUrlList.length) {
                this.detailVideoList = res.data.videoUrlList
                res.data.videoUrlList.map(item => {
                  let suffix = item.videoUrl.substring(
                      item.videoUrl.lastIndexOf('.') + 1,
                      item.videoUrl.length
                  )
                  this.upFileList.push({
                    file: '', //从桌面选中的文件
                    id: item.id, //主键
                    name: item.videoName,
                    local_src: item.videoUrl,
                    suffix: suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
                    fileType: 'video', //文件类型
                    status: 'done', //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                    message: '上传成功', //上传信息显示
                    up_url: item.videoUrl, //上传成功后用这个字段
                    coverPicUrl: item.coverPicUrl || '', //封面预览地址
                    videoRating: item.videoRating || '', //视频级别 10:优 20:合格30:不合格
                    detailId: item.id || '' //视频id
                  })
                })
              }
  
              this.addValue.homeNo = res.data.homeNo
              this.addValue.applyStatus = res.data.applyStatus
              this.addValue.ant = res.data.userNo
              this.addValue.weight = res.data.weight || 0;
              (this.addValue.upImageList = this.upImageList || []),
                  (this.addValue.upFileList = this.upFileList || []),
                  this.getAntData(status => {
                    if (status) {
                      // console.log(this.addValue.receive,"this.addValue.receive");
                      res.data.detailList.map(detailItem => {
                        this.addValue.receive.map(receiveItem => {
                          if (receiveItem.value == detailItem.receiveType) {
                            this.$nextTick(() => {
                              receiveItem.check = true
                              receiveItem.weight = detailItem.weight
                            })
                          }
                        })
                      })

                      this.dialogVisible = true
                      this.$nextTick(() => {
                        this.$refs['warehousingForm'].clearValidate()
                      })
                    }
                  })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1500
              })
            }
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
          })
    },
    uploadImageHttp({file}) {
      let self = this
      let typeArray = file.type.split('/')
      let fileType = typeArray[1]
      let typeReg = 'jpg|jpeg|png|gif|PNG|GPEG|GIF'
      if (typeReg.indexOf(fileType) < 0) {
        this.$message.warning(
            '上传文件格式仅限.jpg .jpeg .png .gif，请重新选择'
        )
        return false
      }
      // if (file.size > 1024 * 1024) {
      // 	this.$message.warning('请上传小于1M的图片！');
      // 	return false;
      // }
      let reader = new FileReader() //本地文件转base64数据流
      reader.readAsDataURL(file)
      reader.onload = e => {
        let imgObj = new Image()
        imgObj.src = e.target.result
        imgObj.onload = () => {
          if (imgObj.width != 0 && imgObj.height != 0) {
            let randomStr = ''
            for (var i = 0; i < 7; i++) {
              randomStr = randomStr + Math.floor(Math.random() * 10).toString()
            }
            let fileName =
                self.$store.state.filePrefix +
                '/image/' +
                new Date().getFullYear() +
                '/' +
                md5(self.$store.state.tokenValue + new Date().getTime() + randomStr) +
                '.' +
                fileType
            file.local_src = e.target.result //图片用来本地预览base64文件
            this.initOssData(() => {
              this.upFixedFile(file, fileName, fileType, 'image')
            })
          } else {
            this.$message.warning('图片源的宽高不存在！')
            return false
          }
        }
        imgObj.onerror = () => {
          this.$message.warning('请勿修改文件尾缀名，或图片源的宽高不存在！')
          return false
        }
      }
    },

    uploadHttpFixed({file}) {
      let self = this
      let typeArray = file.type.split('/')
      let fileType = typeArray[1]
      let typeObj = 'mp4'
      let typeReg = 'mp4'
      if (file.type === 'video/quicktime') {
        //表示是mov格式的视频
        this.initOssData(() => {
          this.validityVideoMov(file, fileType)
        })

        return false
      } else {
        typeObj = 'mp4'
        typeReg = 'mp4'
        if (typeReg.indexOf(fileType) < 0) {
          this.$message.warning('上传文件格式仅限' + typeObj + '，请重新选择!')
          return false
        }
        let fileurl = URL.createObjectURL(file)
        let oVideo = document.createElement('video')
        oVideo.setAttribute('src', fileurl)
        oVideo.oncanplay = () => {
          if (
              oVideo.videoWidth != 0 &&
              oVideo.videoHeight != 0 &&
              oVideo.duration != 0
          ) {
            let randomStr = ''
            for (var i = 0; i < 7; i++) {
              randomStr = randomStr + Math.floor(Math.random() * 10).toString()
            }
            //定义唯一的文件名,上传到oss的文件命名 时间戳(毫秒)+0-9的一位随机数+后缀名
            let fileName =
                self.$store.state.filePrefix +
                '/video/' +
                new Date().getFullYear() +
                '/' +
                md5(self.$store.state.tokenValue + new Date().getTime() + randomStr) +
                '.' +
                fileType
            this.initOssData(() => {
              this.upFixedFile(file, fileName, fileType, 'video')
            })
          } else {
            self.$message.warning(
                '请勿修改文件尾缀名，或视频源的时长、宽高不存在！'
            )
            return false
          }
        }
        oVideo.onerror = () => {
          self.$message.warning('请上传mp4格式的视频文件！')
        }
      }
      return false
    },
    initOssData(callBack) {
      if (!this.ossTimeStamp) {
        this.getOssConfig(callBack)
      } else {
        let current_time = new Date().getTime()
        if (current_time - this.ossTimeStamp > 600000) {
          //五分钟更新一次oss配置
          this.getOssConfig(callBack)
        } else {
          callBack && callBack()
        }
      }
    },
    getOssConfig(callBack) {
      this.$http(this.GLOBALApi.getOssToken(), {})
          .then(res => {
            if (res.code == 200) {
              this.ossConfig.region = this.$store.state.region
              this.ossConfig.accessKeyId = res.data.accessKeyId
              this.ossConfig.accessKeySecret = res.data.accessKeySecret
              this.ossConfig.bucket = this.$store.state.bucket
              this.ossConfig.stsToken = res.data.securityToken
              this.ossClient = new OSS(this.ossConfig)
              this.ossTimeStamp = new Date().getTime()

              callBack && callBack()
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1500
              })
            }
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
          })
    },

    upFixedFile(file, fileName, suffix, type) {
      let temp_id = nanoid()
      this.nameCheckRepeat(file, temp_id, suffix, type, () => {
        this.ossClient
            .multipartUpload(fileName, file, {
              ContentType: file.type
            })
            .then(param => {
              let tempUrl = param.res.requestUrls[0].split('?')[0]
              if (tempUrl && tempUrl.length) {
                //上传成功
                this.updateId(true, temp_id, type, tempUrl)
              } else {
                this.updateId(false, temp_id, type, '')
              }
            })
            .catch(() => {
              this.updateId(false, temp_id, type, '')
            })
      })
    },
    updateId(state, id, type, url) {
      if (type === 'video') {
        this.upFileList.map(item => {
          if (item.id === id) {
            item.status = state ? 'done' : 'failed'
            if (state) item.up_url = url
          }
        })
        this.addValue.upFileList = this.upFileList
      } else if (type === 'image') {
        this.upImageList.map(item => {
          if (item.id === id) {
            item.status = state ? 'done' : 'failed'
            if (state) item.up_url = url
          }
        })
        this.addValue.upImageList = this.upImageList
      }
    },
    nameCheckRepeat(file, id, suffix, type, callBack) {
      let temp_name = file.name
      if (temp_name.indexOf('.') != -1) {
        temp_name = temp_name.substring(0, temp_name.lastIndexOf('.'))
      }
      let temp_state = false //判断是否有名称重复的
      //校验视频名称
      if (this.upFileList.length && type === 'video') {
        this.upFileList.map(item => {
          if (item.name === temp_name) {
            temp_state = true
          }
        })
      }
      //校验图片名称
      if (this.upImageList.length && type === 'image') {
        this.upImageList.map(item => {
          if (item.name === temp_name && item.suffix === suffix) {
            temp_state = true
          }
        })
      }
      if (temp_state) {
        this.$message({
          message:
              type === 'video'
                  ? '视频或名称重复!'
                  : type === 'image'
                      ? '图片或名称重复！'
                      : '文件重复!',
          type: 'warning',
          duration: 1500
        })
        return false
      }
      if (type === 'video') {
        if (this.upFileList.length <= 99) {
          this.upFileList.push({
            file: file, //从桌面选中的文件
            id: id, //主键
            name: temp_name,
            local_src: '',
            suffix: suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
            fileType: type, //文件类型
            status: 'uploading', //上传状态、uploading：上传中，done：上传成功。failed：上传失败
            message: '上传中...', //上传信息显示
            up_url: '', //上传成功后用这个字段
            coverPicUrl: '' //视频封面图
          })
        }
      } else if (type === 'image') {
        if (this.upImageList.length <= 99) {
          this.upImageList.push({
            file: file, //从桌面选中的文件
            id: id, //主键
            name: temp_name,
            local_src: file.local_src || '',
            suffix: suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
            fileType: type, //文件类型
            status: 'uploading', //上传状态、uploading：上传中，done：上传成功。failed：上传失败
            message: '上传中...', //上传信息显示
            up_url: '' //上传成功后用这个字段
          })
        }
      }
      callBack && callBack()
      return false
    },
    //MOV上传
    validityVideoMov(file, suffix) {
      let temp_id = nanoid()
      this.nameCheckRepeat(file, temp_id, suffix, 'video', () => {
        let randomStr = ''
        for (var i = 0; i < 7; i++) {
          randomStr = randomStr + Math.floor(Math.random() * 10).toString()
        }
        let fileName =
            this.$store.state.filePrefix +
            '/video/' +
            new Date().getFullYear() +
            '/' +
            md5(this.$store.state.tokenValue + new Date().getTime() + randomStr) +
            '.mov'

        this.ossClient
            .multipartUpload(fileName, file, {
              ContentType: file.type
            })
            .then(param => {
              let tempUrl = param.res.requestUrls[0].split('?')[0]
              if (tempUrl && tempUrl.length) {
                //上传成功
                this.updateId(true, temp_id, 'video', tempUrl)
              } else {
                //上传失败
                this.updateId(false, temp_id, 'video', '')
              }
            })
            .catch(error => {
              //上传失败
              this.updateId(false, temp_id, 'video', '')
            })
      })
    },
    handlePreviewVideo(arg) {
      if (arg.status === 'done') {
        this.currentVideoSrc = arg.up_url
        this.model3 = true
      }
    },
    handleSureSetName() {
      // console.log("-----", this.videoName,this.upFileList[this.currentIndex]);
      if (this.videoName || this.videoName === '0') {
        let count = 0
        this.upFileList.map(item => {
          if (item.name === this.videoName && item.id !== this.currentId) {
            count++
          }
        })
        if (count <= 0) {
          // 若为新增直接修改名称
          if (this.dialogType == 'add') {
            this.upFileList[this.currentIndex].name = this.videoName
            this.model2 = false
          } else {
            let flag = false
             // 若编辑的是之前上传的视频
            this.detailVideoList.map(item=>{
              if (item.id == this.currentId) {
                flag = true
              }
            })
            if (!flag) {
              this.upFileList[this.currentIndex].name = this.videoName
              this.model2 = false
            }else{
              let params = {
                id: this.upFileList[this.currentIndex].id,
                videoName: this.videoName,
              };
              this.$http(this.GLOBALApi.updateVideoRate(), params)
                .then((res) => {
                  if (res.code == 200 && res.data) {
                    this.upFileList[this.currentIndex].name = this.videoName
                    this.model2 = false

                  } else {
                    this.$message.error(res.msg);
                  }
                })
                .catch((error) => {
                  this.$message.error(error.msg);
                });

            }
            

            }
        } else {
          this.$message({
            message: '视频名称已存在!',
            type: 'warning',
            duration: 1500
          })
        }
      } else {
        this.$message({
          message: '视频名称不能为空！',
          type: 'warning',
          duration: 1500
        })
      }
    },
    handleDeleteImage(item) {
      for (let index = 0; index < this.upImageList.length; index++) {
        if (item.id == this.upImageList[index].id) {
          this.upImageList.splice(index, 1)
          // this.publicDelete(item)
          break
        }
      }
    },
    publicDelete(item) {
      if (item.up_url && item.up_url.length > 0) {
        let dealUrl = item.up_url.replace('https://', '').split('/')
        let folder =
            dealUrl[1] + '/' + dealUrl[2] + '/' + dealUrl[3] + '/' + dealUrl[4]
        let fileName = dealUrl[5]
        // console.log(dealUrl);
        let params = {
          folder: folder, //文件名称  lsxh/pc/video/2022
          fileName: fileName // a0d05e66b6195fd7cf39880b7bfc12e0.mp4
        }
        this.$http(this.GLOBALApi.ossDelete(), params)
            .then(res => {
              if (res.code === 200 && res.data) {
                // console.log("删除成功");
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(error => {
              this.$message.error(error.msg)
            })
      }
    },
    handleDeleteVideo(index, item) {
      this.upFileList.splice(index, 1)
      // this.publicDelete(item)
    },
    handleEditName(arg, index) {
      this.videoName = this.upFileList[index].name
      this.currentId = arg.id
      this.currentIndex = index
      this.$nextTick(() => {
        this.model2 = true
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleSubmit() {
      let flag = true
      for (const key in this.addValue.receive) {
        if (Object.hasOwnProperty.call(this.addValue.receive, key)) {
          let check = this.addValue.receive[key].check
          let weight = this.addValue.receive[key].weight
          if (check && (weight == 0 || weight.length < 1)) {
            flag = false
          }
        }
      }

      this.$refs.warehousingForm.validate(valid => {
        if (valid) {
          // if(this.addValue.receive.length<1){
          //     this.$message({
          //       message: '请选择接收详情',
          //       type: "error",
          //       duration: 1500,
          //     });
          // }else
          if (!flag) {
            this.$message({
              message: '请填写接收重量',
              type: 'error',
              duration: 1500
            })
          } else if (!this.addValue.weight || this.addValue.weight == 0) {
            this.$message({
              message: '请填写接收详情',
              type: 'error',
              duration: 1500
            })
          } else if (this.upFileList.length < 1) {
            this.$message({
              message: '请上传至少1个视频',
              type: 'error',
              duration: 1500
            })
          } else {
            this.publicSubmit()
          }
        } else {
          return false
        }
      })
    },

    publicSubmit() {
      if (!this.fromSubmitState) {
        this.fromSubmitState = true
        let loading_count = 0
        let error_count = 0
        let videoList = []
        if (this.upFileList.length) {
          this.upFileList.map(item => {
            if (item.status === 'uploading') {
              loading_count++
            } else if (item.status === 'failed') {
              error_count++
            } else {
              videoList.push({
                videoUrl: item.up_url,
                videoName: item.name,
                id: item.detailId || '',
                videoType: '1' //1：视频2：图片
              })
            }
          })
          if (loading_count > 0) {
            this.$message({
              message: `还有${loading_count}个视频在上传！`,
              type: 'error',
              duration: 1500
            })
            this.fromSubmitState = false
          } else if (error_count > 0) {
            this.$message({
              message: `存在${error_count}个上次失败的视频！`,
              type: 'error',
              duration: 1500
            })
            this.fromSubmitState = false
          } else {
            //开始校验图片是否上传
            this.checkUpPicture(videoList)
          }
        } else {
          this.$message({
            message: '至少上传一个视频文件',
            type: 'error',
            duration: 1500
          })
          this.fromSubmitState = false
        }
      }
    },
    checkUpPicture(videoList) {
      let loading_count = 0
      let error_count = 0
      let imgList = []
      if (this.upImageList.length) {
        this.upImageList.map(item => {
          if (item.status === 'uploading') {
            loading_count++
          } else if (item.status === 'failed') {
            error_count++
          } else {
            imgList.push({
              videoUrl: item.up_url,
              id: item.detailId || '',
              videoType: '2',//1：视频    2：图片
            })
          }
        })
        if (loading_count > 0) {
          this.$message({
            message: `还有${loading_count}个图片在上传！`,
            type: 'error',
            duration: 1500
          })
          this.fromSubmitState = false
        } else if (error_count > 0) {
          this.$message({
            message: `存在${error_count}个上次失败的图片！`,
            type: 'error',
            duration: 1500
          })
          this.fromSubmitState = false
        } else {
          if (this.dialogType === 'add') {
            //新增
            this.continueOperation(videoList, imgList)
          } else if (this.dialogType === 'edit' || this.dialogType === 'partEdit') {
            this.editOperation(videoList, imgList)
          }
        }
      } else {
        this.$message({
          message: '至少上传一个图片文件',
          type: 'error',
          duration: 1500
        })
        this.fromSubmitState = false
      }
    },
    //新增表单
    continueOperation(videoList, imgList) {
      let detailList = []
      for (const key in this.addValue.receive) {
        if (Object.hasOwnProperty.call(this.addValue.receive, key)) {
          let check = this.addValue.receive[key].check
          let weight = this.addValue.receive[key].weight
          let receiveType = this.addValue.receive[key].value
          if (check) {
            let detailObj = {
              receiveType,
              weight
            }
            detailList.push(detailObj)
          }
        }
      }
      // console.log(detailList);
      // console.log(this.addValue,"this.addValue");
      let param = {
        userNo: this.addValue.ant,
        homeNo: this.addValue.homeNo,
        videoUrlList: videoList,
        picUrlList: imgList,
        detailList
      }
      this.$http(this.GLOBALApi.addreceiveOrder(), param)
          .then(res => {
            if (res.code == 200) {
              this.dialogVisible = false
              this.pageNum = 1
              this.$message({
                message: '新增成功！',
                type: 'success',
                duration: 1500
              })
              this.$nextTick(() => {
                this.initPage()
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1500
              })
            }
            this.fromSubmitState = false
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
            this.fromSubmitState = false
          })
    },
    //修改表单
    editOperation(videoList, imgList) {
      let detailList = []
      for (const key in this.addValue.receive) {
        if (Object.hasOwnProperty.call(this.addValue.receive, key)) {
          let check = this.addValue.receive[key].check
          let weight = this.addValue.receive[key].weight
          let receiveType = this.addValue.receive[key].value
          if (check) {
            let detailObj = {
              receiveType,
              weight
            }
            detailList.push(detailObj)
          }
        }
      }
      let param = {
        // id: this.currentData.id,
        // collectOrderNo: this.currentData.collectOrderNo,
        orderNo:this.currentData.orderNo,
        userNo: this.addValue.ant,
        homeNo: this.addValue.homeNo,
        videoUrlList: videoList,
        picUrlList: imgList,
        detailList
      }
      this.$http(this.GLOBALApi.editreceiveOrder(), param)
          .then(res => {
            if (res.code == 200) {
              this.dialogVisible = false
              this.$message({
                message: '编辑成功！',
                type: 'success',
                duration: 1500
              })
              this.$nextTick(() => {
                this.initPage()
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1500
              })
            }
            this.fromSubmitState = false
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
            this.fromSubmitState = false
          })
    },
    handleSeeImg(arg) {
      this.preview_image = arg.up_url
      const viewerPreview = document.querySelector('.images_preview').$viewer
      viewerPreview.show()
    },
    selectOperate(row) {
      if (row.applyStatus == 1) {
        this.operate('edit', row)
      } else {
        this.operate('partEdit', row)
      }
    },
    // 操作
    operate(type, row) {
      this.getHaisuKinds(status => {
        if (!status) {
          this.$message.error('获取海塑类型失败!')
          return
        } else {
          this.fromSubmitState = false
          this.upFileList = []
          this.upImageList = []
          this.homeList = []
          this.addValue.homeNo = ''
          this.addValue.ant = ''
          this.addValue.weight = ''
          this.addValue.upImageList = []
          this.addValue.upFileList = []
          this.currentData = row

          switch (type) {
            case 'add':
              // console.log(222222222);
              this.dialogType = 'add'
              this.getHomeList()
              this.antData = []
              this.dialogVisible = true
              this.$nextTick(() => {
                this.$refs['warehousingForm'].clearValidate()
              })
              this.initOssData()
              break
            case 'detail':
              this.dialogType = 'detail'
              this.getHomeList()
              this.getDeclareDetail(row)
              this.initOssData()
              break
            case 'edit':
              this.dialogType = 'edit'
              this.getHomeList()
              this.getDeclareDetail(row)
              this.initOssData()
              break
            case 'partEdit':
              this.dialogType = 'partEdit'
              this.getHomeList()
              this.getDeclareDetail(row)
              this.initOssData()
              break
            case 'del':
              var that = this
              this.$confirm('确认删除？')
                  .then(() => {
                    that
                        .$http(that.GLOBALApi.deletereceiveOrder(), {no: row.orderNo})
                        .then(res => {
                          if (res.code == 200) {
                            that.pageNum = 1
                            that.$message({
                              message: '删除成功！',
                              type: 'success',
                              duration: 1500
                            })
                            that.$nextTick(() => {
                              that.initPage()
                            })
                          } else {
                            that.$message({
                              message: res.msg,
                              type: 'warning',
                              duration: 1500
                            })
                          }
                        })
                        .catch(error => {
                          that.$message({
                            message: error.msg,
                            type: 'error',
                            duration: 1500
                          })
                        })
                  })
                  .catch(error => {
                  })

              break
            default:
              break
          }
        }
      })
    },
    getHomeList(callBack) {
      this.$http(this.GLOBALApi.getXiaolanData(), {})
          .then(res => {
            if (res.code == 200) {
              this.homeList = res.data || []
              // 如果只有一个小蓝之家,默认选择
              // 如果有多个小蓝之家,不选择
              if (this.dialogType == 'add') {
                if (res.data && res.data.length == 1) {
                  this.addValue.homeNo = res.data[0].companyNo
                  this.getAntData()
                } else {
                  this.addValue.homeNo = ''
                }
              }
              
              callBack && callBack()
            } else {
              this.$message({
                message: res.msg,
                type: 'warning',
                duration: 1500
              })
            }
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: 'error',
              duration: 1500
            })
          })
    },

    // 获取小蚂蚁数据
    getAntData(callBack) {
      let params = {
        no: this.addValue.homeNo
      }
      this.antData = []
      this.$http(this.GLOBALApi.getEnableAllAnt(), params)
          .then(res => {
            if (res.code === 200 && res.data) {
              let records = res.data || []
              records.map((item, index) => {
                this.$nextTick(() => {
                  this.antData.push(item)
                })
              })
              console.log(this.antData, "小蚂蚁");
              callBack && callBack(true)
            } else {
              callBack && callBack(false)
              this.$message.error(res.msg)
            }
          })
          .catch(error => {
            callBack && callBack(false)
            this.$message.error(error.msg)
          })
    },

    // 请求塑料类型接口
    getHaisuKinds(callBack) {
      this.seaPlasticTypeDict = []
      this.addValue.receive = []
      this.$http(this.GLOBALApi.getDictionaryListByCode(), {
        no: 'receivePlasticType'
      })
          .then(res => {
            if (res.code == 200 && res.data) {
              for (let item of res.data) {
                this.$nextTick(() => {
                  this.addValue.receive.push({
                    label: item.categoryName,
                    value: item.categoryNo,
                    weight: '',
                    check:
                        this.dialogType == 'add' &&
                        (item.value == '塑料瓶' || item.value == '塑料瓶盖')
                            ? true
                            : false
                  })
                })
                this.$set(this.seaPlasticTypeDict, item.categoryNo, item.categoryName)
              }
              callBack(true)
            } else {
              callBack(false)
              this.$message.error(res.msg)
            }
          })
          .catch(error => {
            callBack(false)
            this.$message.error(error.msg)
          })
    }
  },
  mounted() {
    // console.log("---------------------------",this.$store.state.menuList);
    let self = this
    this.$nextTick(() => {
      this.tabelHeigth =
          document.querySelector('#receiveManage').offsetHeight -
          256 -
          document.querySelector('#search').offsetHeight
    })
    window.onresize = () => {
      if (
          document.querySelector('#receiveManage') &&
          document.querySelector('#receiveManage').offsetHeight &&
          document.querySelector('#search') &&
          document.querySelector('#search').offsetHeight
      ) {
        self.tabelHeigth =
            document.querySelector('#receiveManage').offsetHeight -
            256 -
            document.querySelector('#search').offsetHeight
      }
    }
  }
}
</script>

<style lang="less" scoped>
.receiveManage {
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

  .receiveDetail {
    display: flex;
    width: 78.5%;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

.star {
  color: #f56c6c;
  margin-right: 4px;
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

.file_list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 100px;
  margin-top: 20px;

  .wrapper {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

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

    .excellent {
      color: #fff;
    }

    .qualified {
      color: greenyellow;
    }
  }

  .file_delete {
    position: absolute;
    width: 30px;
    height: 30px;
    z-index: 20;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    border-bottom-left-radius: 30px;
    right: 0;
    top: 0;
    font-size: 18px;
    text-align: center;
    line-height: 26px;
    box-sizing: border-box;
    padding-left: 5px;
    color: rgba(255, 255, 255, 0.6);
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
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;

      &.not {
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
    background: url('~@/assets/img/preview.png') center center no-repeat;
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
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;

      &.not {
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
    white-space: nowrap;
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

.uploadVideo {
  display: flex;
  position: relative;

  .mark {
    position: absolute;
    left: 100px;
    top: 0;
    color: rgb(158, 156, 156);
  }
}

/deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #fff;
  cursor: not-allowed;
}
</style>
