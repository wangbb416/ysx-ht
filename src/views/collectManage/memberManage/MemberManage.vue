<!--成员管理-->
<template>
  <div class="driver_manage" id="driver_manage">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="content">
      <div class="search">
        <div class="search_input">
          <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="" style="margin-right: 120px">
              <el-input
                placeholder="请输入成员姓名查找"
                v-model="searchValue.name"
                @keyup.enter.native="handleSearch"
                clearable
                @clear="handleSearch"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="searchValue.status"
                placeholder="请选择"
                @change="handleSearch"
                @clear="handleSearch"
              >
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
          <div
            class="button_blue"
            @click="handleOpenDialog(1)"
          >
            新增
          </div>
        </div>
      </div>
      <div class="table">
        <template>
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
            <el-table-column prop="name" label="成员"></el-table-column>
            <el-table-column label="是否家长">
              <template slot-scope="scope">
                <div v-if="scope.row.parentFlag == 1">是</div>
                <div v-else>否</div>
              </template>
            </el-table-column>
            <el-table-column prop="clientCode" label="代码"></el-table-column>
            <el-table-column prop="linkPhone" label="手机号"></el-table-column>
            <el-table-column
              prop="braceletCode"
              label="手环/吊坠"
            ></el-table-column>
            <el-table-column
              prop="cameraCode"
              label="摄像头ID"
            ></el-table-column>
            <el-table-column prop="" label="执法记录仪可否远程传输">
              <template slot-scope="scope">
                <div v-if="scope.row.remoteOpen === 0">是</div>
                <div v-else>否</div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="执法记录仪是否带定位">
              <template slot-scope="scope">
                <div v-if="scope.row.location === 0">是</div>
                <div v-else>否</div>
              </template>
            </el-table-column>
            <!-- 状态;0:正常 1:停用 -->
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <div
                  :class="[
                    scope.row.status === 0
                      ? 'green'
                      : scope.row.status === 1
                      ? 'red'
                      : '',
                  ]"
                >
                  {{ scope.row.status === 0 ? "启用" : "禁用" }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleOpenDialog(2, scope.row)"
                >
                  编辑
                </el-button>

                <el-button
                  v-if="scope.row.status === 0"
                  @click="handleOperateDialog('disable', scope.row)"
                  type="text"
                  size="small"
                >
                  禁用
                </el-button>
                <el-button
                  v-if="scope.row.status !== 0"
                  @click="handleOperateDialog('enable', scope.row)"
                  type="text"
                  size="small"
                >
                  启用
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleOperateDialog('delate', scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <div class="page">
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
      :title="editeStatus === 1 ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      width="1232px"
      :before-close="handleClose"
      :modal-append-to-body="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      top="10vh"
    >
      <div class="dialog_content">
        <el-form
          :model="addValue"
          :rules="addValueRules"
          label-width="120px"
          label-position="left"
          size="small"
          ref="addValue"
          inline
        >
          <el-form-item label-width="125px">
            <span slot="label">
              <span style="color: red">*</span>
              身份证正面上传
            </span>
            <div class="upload">
              <div class="upload_opt">
                <el-upload
                  v-if="!Object.keys(upload.introduceUrl).length"
                  action=""
                  :multiple="true"
                  :show-file-list="false"
                  :http-request="(file) => uploadImageHttp(file, 'introduceUrl')"
                  accept=".jpg,.jpeg,.png,.gif"
                >
                  <div class="upload_pic">
                    <i class="el-icon-plus"></i>
                    <div class="tips">点击上传身份证正面</div>
                  </div>
                </el-upload>

                <div v-else class="file_list">
                  <template>
                    <div class="file_preview">
                      <div
                        @click.stop="handleDeleteImage('introduceUrl')"
                        class="file_delete el-icon-close"
                        v-if="upload.introduceUrl.status !== 'uploading'"
                      ></div>
                      <div
                        class="tips_wrap"
                        v-if="upload.introduceUrl.status === 'uploading'"
                      >
                        <div class="tips_content">
                          <div class="file_loading el-icon-loading"></div>
                          <div class="loading_tips">上传中...</div>
                        </div>
                      </div>
                      <div
                        class="up_failed"
                        v-else-if="upload.introduceUrl.status === 'failed'"
                      >
                        <div class="tips_content">
                          <div class="failed_tips el-icon-warning"></div>
                          <div class="loading_tips">上传失败</div>
                        </div>
                      </div>
                      <div class="bitmap_img_local" v-fastClick>
                        <div
                          @click.stop="handleSeeImg(upload.introduceUrl)"
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
                        <img
                          :src="upload.introduceUrl.local_src"
                          alt=""
                          draggable=""
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="idNumber" style="margin-left: 268px">
            <span slot="label">
              <span style="color: red"></span>
              身份证号
            </span>
            <el-input
              placeholder="请先上传身份证正面"
              v-model.trim="addValue.idNumber"
              clearable
              maxlength="18"
            ></el-input>
          </el-form-item>
          <el-form-item prop="parentFlag" class="is_home">
            <el-checkbox v-model="addValue.parentFlag">家长</el-checkbox>
          </el-form-item>
          <el-form-item prop="linkName">
            <span slot="label">
              <span style="color: red">*</span>
              姓名
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.linkName"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <span slot="label">手机号</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.phone"
              clearable
              maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item prop="sex">
            <span slot="label">
              <span style="color: red">*</span>
              性别
            </span>
            <div style="width: 420px">
              {{ addValue.sex }}
            </div>
            <!-- <el-select
              v-model="addValue.sex"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in sexOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item prop="birthday">
            <span slot="label">
              <span style="color: red"></span>
              出生日期
            </span>
            <div style="width: 420px">{{ addValue.birthday }}</div>
          </el-form-item>

          <el-form-item prop="cameraNo">
            <span slot="label">
              <span style="color: red"></span>
              摄像头
            </span>
            <el-select
              @change="changeCamera"
              v-model="addValue.cameraNo"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in cameraList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="illustrate-text">
              说明：该摄像头用于录制入库和作业现场
            </div>
            <div v-if="addValue.cameraNo" class="illustrate-text">
              <span>说明：该摄像头</span>
              <span v-if="cameraSetting.remoteOpen == 1">不</span>
              <span>可远程传输，</span>
              <span v-if="cameraSetting.location == 1">不</span>
              <span>带定位。</span>
            </div>
          </el-form-item>

          <el-form-item prop="braceletNo">
            <span slot="label">手环/吊坠</span>
            <el-select
              v-model="addValue.braceletNo"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in driverGpsOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="illustrate-text">说明：该手环/吊坠用于轨迹跟踪</div>
          </el-form-item>
          <el-form-item prop="weekDays">
            <span slot="label">
              <span style="color: red">*</span>
              工作时间
            </span>
            <el-checkbox-group v-model="addValue.weekDays">
              <el-checkbox :label="1" key="1">周一</el-checkbox>
              <el-checkbox :label="2" key="2">周二</el-checkbox>
              <el-checkbox :label="3" key="3">周三</el-checkbox>
              <el-checkbox :label="4" key="4">周四</el-checkbox>
              <el-checkbox :label="5" key="5">周五</el-checkbox>
              <el-checkbox :label="6" key="6">周六</el-checkbox>
              <el-checkbox :label="7" key="7">周日</el-checkbox>
            </el-checkbox-group>
            <div class="time_picker_area">
              <div class="time_picker_box">
                <div
                  class="item"
                  v-for="(item, index) of addValue.clientWorkTimeList"
                  :key="index"
                >
                  <el-time-picker
                    is-range
                    format="HH:mm"
                    value-format="HH:mm"
                    v-model="addValue.clientWorkTimeList[index]"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                  ></el-time-picker>
                  <el-button
                    class="time_picker_delete"
                    v-if="addValue.clientWorkTimeList.length > 1"
                    type="primary"
                    @click="deletePickerItem(index)"
                    icon="el-icon-delete"
                  ></el-button>
                </div>
              </div>
              <el-button
                class="time_picker_add"
                v-if="addValue.clientWorkTimeList.length < 5"
                type="primary"
                @click="addPickerItem"
              >
                添加时间段
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <div class="button_blue" @click="handleSubmit">提交</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import md5 from "js-md5";

import Breadcrumb from "@/components/Breadcrumb.vue";
import { checkString, handlePhone } from "@/utils/util.js";
import { phoneValid, intValid, cardNum } from "@/utils/validate.js";

var OSS = require("ali-oss");
export default {
  name: "driverManege",
  components: { Breadcrumb },
  data() {
    return {
      cardNum,
      phoneValid,
      intValid,
      tabelHeigth: 420, // 表格初始化高度
      breadData: [
        { name: "收集管理", path: "" },
        { name: "小蓝之家管理", path: "/blueHouse" },
        { name: "成员管理" },
      ],

      // 搜索条件
      searchValue: {
        status: 1, // 启用状态
        name: "", //小蚂蚁姓名
      },

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      // 弹框
      dialogVisible: false,
      apiLoading: false,
      editeStatus: 1, //1: 新增  2：修改
      warseHouseId: "", //小蓝之家id
      clientNo: "", //编辑的小蚂蚁id
      addValue: {
        sex: "", //性别
        birthday: "", //年龄
        idNumber: "", //身份证号
        phone: "", //联系方式
        linkName: "", //小蚂蚁
        introduceUrl: "", //身份证
        cameraNo: "", //摄像头
        braceletNo: "", //手环系列号
        weekDays: [], // 工作时间
        clientWorkTimeList: [], // 工作时间范围
        parentFlag: false, // 是否家长
      },
      cameraSetting: {
        remoteOpen: "",
        location: "",
      },
      addValueRules: {
        linkName: [
          {
            validator: (rule, value, callback) => {
              checkString(rule, value, callback, null, null, 20, "请填写姓名");
            },
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          {
            message: "请填写正确的手机号",
            trigger: "blur",
            validator: phoneValid,
          },
        ],
        // birthday: [
        //   {
        //     required: true,
        //     trigger: ["blur", "change"],
        //     message: "请选择出生日期",
        //   },
        //   // { message: "请填写正确的年龄", trigger: "blur", validator: intValid },
        // ],
        idNumber: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请填写身份证号",
          },
          {
            message: "请填写正确的身份证号",
            trigger: ["blur", "change"],
            validator: cardNum,
          },
        ],
        weekDays: [
          {
            validator: (rule, value, callback) => {
              if (value.length > 0) {
                callback();
              } else {
                callback(new Error(`请选择工作时间`));
              }
            },
            trigger: ["change"],
          },
        ],
        // sex: [
        //     { required: true, message: "请选择性别", trigger: ["blur", "change"], },
        // ],
      },
      upload: {
        introduceUrl: {},
      },

      cameraList: [],
      driverGpsOption: [],
      showDeviceName: {}, // 手环名称拼接
      loading: false,

      // oss
      ossConfig: {
        region: "",
        accessKeyId: "",
        accessKeySecret: "",
        bucket: "",
        stsToken: "",
        secure: true, //配置是否为https请求true为https,false为http
      },
      ossClient: null,
      ossTimeStamp: null,
      preview_image: "",
    };
  },

  computed: {
    
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      this.tabelHeigth =
        document.querySelector("#driver_manage").offsetHeight -
        257 -
        searchHeight;
    });
    window.onresize = () => {
      let searchDom = document.querySelector(".search");
      let searchHeight = searchDom ? searchDom.offsetHeight || 51 : 51;
      let contentDom = document.querySelector("#driver_manage");
      let contentHeight = contentDom ? contentDom.offsetHeight || 0 : 0;
      if (contentHeight) {
        self.tabelHeigth = contentHeight - 257 - searchHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {};
  },
  created() {
    console.log(this.$route.query, "id");
    if (this.$route.query.companyNo) {
      this.warseHouseId = this.$route.query.companyNo;
      this.getCameraList();
      this.getDriverGps();
      this.getTableData();
    } else {
      this.$message.error("获取小蓝之家id失败");
      this.$router.go(-1);
    }
  },
  methods: {
    getTableData() {
      this.loading = true;
      let params = {
        companyNo: this.warseHouseId,
        status: this.searchValue.status == 1 ? 0 : 1, //
        clientName: this.searchValue.name || "",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      this.tableData = [];
      this.$http(this.GLOBALApi.getByPageAnts(), params)
        .then((res) => {
          console.log("xxx", res);
          if (res.code === 200 && res.data) {
            this.loading = false;
            this.total = res.data.total;

            let records = res.data.records || [];
            records.map((item, index) => {
              this.tableData.push(item);
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
    // deleteData(value) {
    //   this.$http(this.GLOBALApi.deleteAnt(), { id: value })
    //     .then(res => {
    //       if (res.code === 200 && res.data) {
    //         this.$message.success('删除成功')
    //         this.page = 1
    //         this.getTableData()
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //     .catch(error => {
    //       this.$message.error(error.msg)
    //     })
    // },
    handleOperateDialog(value, item) {
      let url = null;
      let operateSuccess = "";
      let params = {
        no: item.clientNo,
      };
      switch (value) {
        case "disable":
          url = this.GLOBALApi.disableAnts();
          operateSuccess = "禁用成功";
          this.$confirm("确认禁用此小蚂蚁吗?", "禁用确认")
            .then(() => {
              this.dealBtn(url, params, operateSuccess);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case "enable":
          url = this.GLOBALApi.enableAnts();
          operateSuccess = "启用成功";
          this.dealBtn(url, params, operateSuccess);
          break;
        case "delate":
          url = this.GLOBALApi.deleteAnts();
          operateSuccess = "删除成功";
          this.$confirm("确认删除此小蚂蚁吗?", "删除确认")
            .then(() => {
              this.dealBtn(url, params, operateSuccess);
            })
            .catch((error) => {
              console.log(error);
            });
          break;

        default:
          break;
      }
    },
    // 删除/禁用/启用
    dealBtn(url, params, operateSuccess) {
      this.$http(url, params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$message.success(operateSuccess);
            this.page = 1;
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    addData() {
      if (this.apiLoading) {
        return;
      }
      this.apiLoading = true;
      let clientWorkTimeList = [];
      this.addValue.clientWorkTimeList.forEach((item) => {
        if (item[0]) {
          clientWorkTimeList.push({
            startTime: item[0],
            endTime: item[1],
          });
        }
      });
      let params = JSON.parse(JSON.stringify(this.addValue));
      params.parentFlag = params.parentFlag ? 1 : 0;
      params["clientWorkTimeList"] = clientWorkTimeList;
      params["companyNo"] = this.warseHouseId;

      this.$http(this.GLOBALApi.addAnts(), params)
        .then((res) => {
          this.apiLoading = false;
          if (res.code === 200 && res.data) {
            this.dialogVisible = false;
            this.$message.success("新增成功");
            this.page = 1;
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.apiLoading = false;
          this.$message.error(error.msg);
        });
    },

    updateData() {
      if (this.apiLoading) {
        return;
      }
      this.apiLoading = true;
      let clientWorkTimeList = [];
      this.addValue.clientWorkTimeList.forEach((item) => {
        if (item[0]) {
          clientWorkTimeList.push({
            startTime: item[0],
            endTime: item[1],
          });
        }
      });
      let params = JSON.parse(JSON.stringify(this.addValue));
      params.parentFlag = params.parentFlag ? 1 : 0;
      params["clientWorkTimeList"] = clientWorkTimeList;
      params["companyNo"] = this.warseHouseId;
      params["clientNo"] = this.clientNo

      this.$http(this.GLOBALApi.editAnts(), params)
        .then((res) => {
          this.apiLoading = false;
          if (res.code === 200 && res.data) {
            this.dialogVisible = false;
            this.$message.success("修改成功");
            this.page = 1;
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.apiLoading = false;
          this.$message.error(error.msg);
        });
    },

    // 获取详情
    getDetailData() {
      this.$http(this.GLOBALApi.getByIdAnts(), { no: this.clientNo })
        .then((res) => {
          console.log("xxx", res);
          if (res.code === 200 && res.data) {
            let data = res.data;
            let addValue = {
              sex: data.sex, //性别
              birthday: data.birthDate, //年龄
              idNumber: data.idNumber, //身份证号
              phone: data.phone, //联系方式
              linkName: data.linkName, //小蚂蚁
              introduceUrl: data.introduceUrl, //身份证
              cameraNo: data.cameraNo, //摄像头
              braceletNo: data.braceletNo, //手环系列号
              weekDays: data.weekDays || [], // 工作时间
              clientWorkTimeList:
                data.clientWorkTimeList.map((item) => {
                  return [item.startTime, item.endTime];
                }) || [], // 工作时间范围
              parentFlag: data.parentFlag == 1 ? true : false, // 是否家长
            };
            this.changeCamera(data.cameraNo);
            if (data.introduceUrl) {
              this.upload.introduceUrl = {
                status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                local_src: data.introduceUrl,
                up_url: data.introduceUrl, //上传成功后用这个字段
              };
            }
            this.addValue = addValue;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    changeCamera(cVal) {
      let cItem = {};
      if (cVal) {
        cItem = this.cameraList.find((item) => {
          return item.value == cVal;
        });
      }
      this.cameraSetting.remoteOpen = cItem.remoteOpen;
      this.cameraSetting.location = cItem.location;
    },
    //获取摄像头
    getCameraList() {
      this.cameraList = [];
      this.$http(this.GLOBALApi.getDeviceGps(), {
        deviceType: 4,
        status: 0,
        // pageNum: 1,
        // pageSize: 9999999
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];
            records.map((item, index) => {
              this.cameraList.push({
                remoteOpen: item.remoteOpen,
                location: item.location,
                label: `${item.name}-${item.deviceCode}`,
                value: item.deviceNo,
              });
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    //获取手环数据
    getDriverGps() {
      this.driverGpsOption = [];
      this.$http(this.GLOBALApi.getDeviceGps(), {
        // pageNum: 1,
        // pageSize: 9999999,
        deviceType: 1,
        status: 0, // 0：开启 1：关闭
      })
        .then((res) => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || [];
            records.map((item, index) => {
              let temp = {
                label: `${item.name}-${item.deviceCode}`,
                value: item.deviceNo,
                ...item,
              };
              this.driverGpsOption.push(temp);
            });
            // 手环名称拼接
            for (let item of this.driverGpsOption) {
              this.$set(this.showDeviceName, item.value, item.label);
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    // 禁用
    disableStatus(value) {
      this.$http(this.GLOBALApi.disableDrive(), {
        id: value,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    // 启用
    openStatus(value) {
      this.$http(this.GLOBALApi.openDrive(), {
        id: value,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.getTableData();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    uploadImageHttp({ file }, field) {
      let self = this;
      let typeArray = file.type.split("/");
      let fileType = typeArray[1];
      let typeReg = "jpg|jpeg|png|gif|PNG|GPEG|GIF";
      if (typeReg.indexOf(fileType) < 0) {
        this.$message.warning(
          "上传文件格式仅限.jpg .jpeg .png .gif，请重新选择"
        );
        return false;
      }
      // if (file.size > 1024 * 1024) {
      // 	this.$message.warning('请上传小于1M的图片！');
      // 	return false;
      // }
      let reader = new FileReader(); //本地文件转base64数据流
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        let imgObj = new Image();
        imgObj.src = e.target.result;
        imgObj.onload = () => {
          if (imgObj.width != 0 && imgObj.height != 0) {
            let randomStr = "";
            for (var i = 0; i < 7; i++) {
              randomStr = randomStr + Math.floor(Math.random() * 10).toString();
            }
            let fileName =
              self.$store.state.filePrefix +
              "/image/" +
              new Date().getFullYear() +
              "/" +
              md5(self.$store.state.token + new Date().getTime() + randomStr) +
              "." +
              fileType;
            file.local_src = e.target.result; //图片用来本地预览base64文件
            this.initOssData(() => {
              this.upFixedFile(file, fileName, fileType, "image", field);
            });
          } else {
            this.$message.warning("图片源的宽高不存在！");
            return false;
          }
        };
        imgObj.onerror = () => {
          this.$message.warning("请勿修改文件尾缀名，或图片源的宽高不存在！");
          return false;
        };
      };
    },
    handleDeleteImage(field) {
      this.publicDelete();
      this.addValue[field] = "";
      this.upload[field] = {};
    },
    // oss删除
    publicDelete() {
      if (
        this.upload.introduceUrl.up_url &&
        this.upload.introduceUrl.up_url.length > 0
      ) {
        let dealUrl = this.upload.introduceUrl.up_url
          .replace("https://", "")
          .split("/");
        let folder =
          dealUrl[1] + "/" + dealUrl[2] + "/" + dealUrl[3] + "/" + dealUrl[4];
        let fileName = dealUrl[5];
        let params = {
          folder: folder, //文件名称  lsxh/pc/video/2022
          fileName: fileName, // a0d05e66b6195fd7cf39880b7bfc12e0.mp4
        };
        this.$http(this.GLOBALApi.ossDelete(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              // console.log("删除成功");
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
      }
    },
    handleSeeImg(arg) {
      console.log("handleSeeImg: ", arg);
      this.preview_image = arg.up_url;
      const viewerPreview = document.querySelector(".images_preview").$viewer;
      viewerPreview.show();
    },
    initOssData(callBack) {
      if (!this.ossTimeStamp) {
        this.getOssConfig(callBack);
      } else {
        let current_time = new Date().getTime();
        if (current_time - this.ossTimeStamp > 600000) {
          //五分钟更新一次oss配置
          this.getOssConfig(callBack);
        } else {
          callBack && callBack();
        }
      }
    },
    getOssConfig(callBack) {
      this.$http(this.GLOBALApi.getOssToken(), {})
        .then((res) => {
          if (res.code == 200) {
            this.ossConfig.region = this.$store.state.region;
            this.ossConfig.accessKeyId = res.data.accessKeyId;
            this.ossConfig.accessKeySecret = res.data.accessKeySecret;
            this.ossConfig.bucket = this.$store.state.bucket;
            this.ossConfig.stsToken = res.data.securityToken;
            this.ossClient = new OSS(this.ossConfig);
            this.ossTimeStamp = new Date().getTime();

            callBack && callBack();
          } else {
            this.$message({
              message: res.msg,
              type: "error",
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
    upFixedFile(file, fileName, suffix, type, field) {
      // console.log("upFixedFile");
      let temp_id = nanoid();
      this.nameCheckRepeat(file, temp_id, suffix, type, field, () => {
        this.ossClient
          .multipartUpload(fileName, file, {
            ContentType: file.type,
          })
          .then((param) => {
            let tempUrl = param.res.requestUrls[0].split("?")[0];
            // console.log("tempUrl: ", tempUrl);
            if (tempUrl && tempUrl.length) {
              //上传成功
              this.updateId(true, temp_id, type, tempUrl, field);
            } else {
              this.updateId(false, temp_id, type, "", field);
            }
          })
          .catch(() => {
            this.updateId(false, temp_id, type, "", field);
          });
      });
    },

    updateId(state, id, type, url, field) {
      this.upload[field].status = state ? "done" : "failed";
      if (state) {
        this.upload[field].up_url = url;
        this.addValue[field] = url;
        this.getNumber(field, url);
      }

      console.log("this.upload: ", this.upload);
    },
    nameCheckRepeat(file, id, suffix, type, field, callBack) {
      console.log("nameCheckRepeat");

      if (type === "image") {
        this.upload[field] = {
          file: file, //从桌面选中的文件
          id: id, //主键
          local_src: file.local_src || "",
          suffix: suffix, //文件后缀，因为图片比较的时候有多个格式，但是名称可以一样
          fileType: type, //文件类型
          status: "uploading", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
          message: "上传中...", //上传信息显示
          up_url: "", //上传成功后用这个字段
        };
      }
      callBack();
      return false;
    },

    // OCR识别
    getNumber(field, url) {
      if (field == "introduceUrl") {
        this.$http(this.GLOBALApi.recognizeIdcardByUrl(), { url: url })
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.addValue.idNumber = res.data.idNumber || "";
              this.addValue.linkName = res.data.name || "";
              this.addValue.birthday = res.data.birthDate || "";
              this.addValue.sex = res.data.sex || "";

              // //   性别
              // if (res.data.sex && res.data.sex.length > 0) {
              //   console.log(res.data.sex, '性别')
              //   if (res.data.sex == '男') {
              //     this.addValue.sex = '1'
              //   } else if (res.data.sex == '女') {
              //     this.addValue.sex = '0'
              //   } else {
              //     this.addValue.sex = ''
              //   }
              // }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
      }
    },

    // 搜索
    handleSearch() {
      console.log(this.searchValue);
      this.pageNum = 1;
      this.getTableData();
    },

    // 删除
    // handleDelete(value) {
    //   this.$confirm('确认删除此小蚂蚁吗？', '删除确认')
    //     .then(() => {
    //       this.deleteData(value.id)
    //     })
    //     .catch(() => {})
    // },

    // 分页
    handleSizeChange(value) {
      this.pageSize = value;
      this.getTableData();
    },
    handleCurrentChange(value) {
      this.pageNum = value;
      this.getTableData();
    },

    // 弹框
    handleOpenDialog(status, value) {
      this.editeStatus = status;
      for (let key of Object.keys(this.addValue)) {
        this.addValue[key] = "";
      }
      this.addValue["weekDays"] = [1, 2, 3, 4, 5];
      this.addValue["parentFlag"] = false;
      this.addValue["clientWorkTimeList"] = [["08:00", "17:00"]];
      this.upload = {
        introduceUrl: {},
      };
      this.dialogVisible = true;

      this.$nextTick(() => {
        this.$refs.addValue.resetFields();
        if (status == 2) {
          this.clientNo = value.clientNo
          this.getDetailData();
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    addPickerItem() {
      let checkIndex = this.checkPickerItem();
      if (checkIndex !== -1) {
        this.$message.warning("请设置完时间段");
      } else {
        this.addValue.clientWorkTimeList.push(["00:00", "23:59"]);
      }
    },
    deletePickerItem(index) {
      this.addValue.clientWorkTimeList.splice(index, 1);
    },
    checkPickerItem() {
      let index = this.addValue.clientWorkTimeList.findIndex((item) => {
        return item[0] == "";
      });
      return index;
    },
    handleSubmit() {
      this.$refs.addValue.validate((valid) => {
        if (valid) {
          let ready = this.checkUpload();
          if (!ready) return;
          if (!this.addValue.parentFlag && !this.addValue.braceletNo) {
            this.$message.warning("请选择手环/吊坠");
            return false;
          }
          if (
            this.addValue.clientWorkTimeList.length &&
            this.addValue.clientWorkTimeList[0] &&
            this.addValue.clientWorkTimeList[0][0]
          ) {
            if (this.editeStatus === 2) {
              this.$confirm("确认修改此小蚂蚁吗？", "修改确认")
                .then(() => {
                  this.updateData();
                })
                .catch(() => {});
            } else {
              this.addData();
            }
          } else {
            this.$message.warning("请设置完时间段");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    checkUpload() {
      if (!Object.keys(this.upload.introduceUrl).length) {
        this.$message.error("请上传身份证正面");
        return false;
      }
      for (let key of Object.keys(this.upload)) {
        let value = this.upload[key];
        if (value.status == "uploading") {
          this.$message.error("图片上传中，请稍后");
          return false;
        } else if (value.status == "failed") {
          this.$message.error("图片上传失败，请重新上传");
          return false;
        }
      }
      return true;
    },

    handleOffStatus(value) {
      let msg =
        value.statusMsg === "启用"
          ? "禁用"
          : value.statusMsg === "禁用"
          ? "启用"
          : "";
      if (msg === "禁用") {
        this.$confirm(`确认${msg}此小蚂蚁吗？`, `${msg}确认`)
          .then((_) => {
            this.disableStatus(value.id);
          })
          .catch((error) => {});
      } else {
        this.openStatus(value.id);
      }
    },

    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1;
      } else {
        return index + 1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.driver_manage {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.content {
  margin-top: 16px;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.1);
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
  min-width: 200px;
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
}

.button_white:hover {
  background-color: #ecf5ff;
  cursor: pointer;
}

.button_blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  width: 60px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
}

.button_blue:hover {
  background-color: #66b1ff;
  border: solid 1px #66b1ff;
  cursor: pointer;
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

.green {
  color: green;
}
.red {
  color: red;
}

// 弹窗
.dialog_content {
  color: #303133;
  font-size: 14px;

  /deep/ .el-input.el-input--small.el-input--suffix {
    width: 420px;
  }

  /deep/ .el-input.el-input--small.is-disabled {
    width: 420px;
  }
  /deep/ .el-form--inline .el-form-item {
    margin-right: 53px;
  }
}

/deep/ .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-form-item__content {
  position: relative;
}

#loading_api {
  position: absolute;
  right: 0px;
}

.upload {
  display: flex;
  align-items: stretch;
}
.upload_pic {
  width: 136px;
  height: 136px;
  margin-right: 10px;
  border-radius: 5px;
  border: dotted 1px #333;
  position: relative;
  .tips {
    position: absolute;
    width: 100%;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  i.el-icon-plus {
    font-size: 30px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}

.file_list {
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-right: 10px;

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
    margin-right: 0px;
  }

  .file_preview {
    position: relative;
    width: 136px;
    height: 136px;
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
    background: url("~@/assets/img/preview.png") center center no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
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
  .illustrate-text {
    color: #606266;
    font-size: 12px;
  }
}
.is_home {
  width: 400px;
  position: absolute;
  right: 169px;
  top: 150px;
  z-index: 2;
}
.time_picker_area {
  overflow: hidden;
  .time_picker_box {
    float: left;
    .item {
      margin-bottom: 10px;
    }
    .time_picker_delete {
      margin-left: 10px;
    }
  }
  .time_picker_add {
    float: right;
  }
}
</style>
