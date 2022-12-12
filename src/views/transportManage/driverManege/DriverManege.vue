<!--运输管理-司机管理-->
<template>
  <div class="driver_manage" id="driver_manage">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="content">
      <div class="search">
        <div class="search_input">
          <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="运输公司">
              <el-select
                v-model="searchValue.companyNo"
                placeholder="请选择"
                clearable
                filterable
                @change="handleSearch"
              >
                <el-option
                  v-for="item in companyOptions"
                  :key="item.companyNo"
                  :label="item.name"
                  :value="item.companyNo"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="">
              <el-input
                placeholder="请输入司机姓名查找"
                v-model="searchValue.clientName"
                @keyup.enter.native="handleSearch"
                clearable
                @clear="handleSearch"
              >
                <!--<div slot="suffix" class="el-input-slot__icon">-->
                <!--<img src="@/assets/img/home/search.png" alt=""/>-->
                <!--</div>-->
              </el-input>
            </el-form-item>

            <el-form-item label="状态">
              <el-select
                clearable
                v-model="searchValue.status"
                placeholder="请选择"
                @change="handleSearch"
              >
                <el-option
                  v-for="item in offOptions"
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
          <div class="button_blue" @click="handleOpenDialog(1)" v-if="MenuBtnValid('/driverManege','新建')">新建</div>
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
            <el-table-column prop="name" label="司机姓名"></el-table-column>
            <el-table-column
              prop="companyName"
              label="所属运输公司"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="linkPhone" label="联系方式"></el-table-column>
            <el-table-column
              prop="deviceCode"
              label="手环序列号"
            ></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <div
                  :class="[
                    scope.row.statusMsg === '启用'
                      ? 'green'
                      : scope.row.statusMsg === '禁用'
                      ? 'red'
                      : '',
                  ]"
                >
                  {{ scope.row.statusMsg }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="handleOpenDialog(2, scope.row)"
                  v-if="MenuBtnValid('/driverManege','编辑')"
                  >编辑
                </el-button>

                <el-button
                v-if="MenuBtnValid('/driverManege','启用/禁用')"
                  @click="handleOffStatus(scope.row)"
                  type="text"
                  size="small"
                  class="blue"
                >
                  {{
                    scope.row.statusMsg === "启用"
                      ? "禁用"
                      : scope.row.statusMsg === "禁用"
                      ? "启用"
                      : ""
                  }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDelete(scope.row)"
                  v-if="MenuBtnValid('/driverManege','删除')"
                  >删除
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
        >
        </el-pagination>
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
          <el-form-item prop="name">
            <span slot="label"><span style="color: red">* </span>司机姓名</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.name"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="companyNos">
            <span slot="label"
              ><span style="color: red">* </span>所属运输公司</span
            >
            <el-select
              v-model="addValue.companyNos"
              placeholder="请选择"
              clearable
              multiple
            >
              <el-option
                v-for="item in transportCompanyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="linkPhone">
            <span slot="label"><span style="color: red">* </span>联系方式</span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.linkPhone"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="deviceNo">
            <span slot="label">手环序列号(常用)</span>
            <el-select
              v-model="addValue.deviceNo"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in driverGpsOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="licenseNum">
            <span slot="label"
              ><span style="color: red">* </span>驾驶证编号</span
            >
            <el-input
              placeholder="请先上传驾驶证"
              v-model.trim="addValue.licenseNum"
              clearable
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <span slot="label"><span style="color: red">* </span>驾驶证</span>
            <div class="upload">
              <div class="upload_opt">
                <el-upload
                  v-if="!Object.keys(upload.licenseHomepage).length"
                  action=""
                  :multiple="true"
                  :show-file-list="false"
                  :http-request="
                    (file) => uploadImageHttp(file, 'licenseHomepage')
                  "
                  accept=".jpg,.jpeg,.png,.gif"
                >
                  <div class="upload_pic">
                    <i class="el-icon-plus"></i>
                    <div class="tips">驾驶证主页</div>
                  </div>
                </el-upload>

                <div v-else class="file_list">
                  <template>
                    <div class="file_preview">
                      <div
                        @click.stop="handleDeleteImage('licenseHomepage')"
                        class="file_delete el-icon-close"
                        v-if="upload.licenseHomepage.status !== 'uploading'"
                      ></div>
                      <div
                        class="tips_wrap"
                        v-if="upload.licenseHomepage.status === 'uploading'"
                      >
                        <div class="tips_content">
                          <div class="file_loading el-icon-loading"></div>
                          <div class="loading_tips">上传中...</div>
                        </div>
                      </div>
                      <div
                        class="up_failed"
                        v-else-if="upload.licenseHomepage.status === 'failed'"
                      >
                        <div class="tips_content">
                          <div class="failed_tips el-icon-warning"></div>
                          <div class="loading_tips">上传失败</div>
                        </div>
                      </div>
                      <div class="bitmap_img_local" v-fastClick>
                        <div
                          @click.stop="handleSeeImg(upload.licenseHomepage)"
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
                          :src="upload.licenseHomepage.local_src"
                          alt=""
                          draggable=""
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="upload_opt">
                <el-upload
                  v-if="!Object.keys(upload.licenseSidePage).length"
                  action=""
                  :multiple="true"
                  :show-file-list="false"
                  :http-request="
                    (file) => uploadImageHttp(file, 'licenseSidePage')
                  "
                  accept=".jpg,.jpeg,.png,.gif"
                >
                  <div class="upload_pic">
                    <i class="el-icon-plus"></i>
                    <div class="tips">驾驶证副页</div>
                  </div>
                </el-upload>

                <div v-else class="file_list">
                  <template>
                    <div class="file_preview">
                      <div
                        @click.stop="handleDeleteImage('licenseSidePage')"
                        class="file_delete el-icon-close"
                        v-if="upload.licenseSidePage.status !== 'uploading'"
                      ></div>
                      <div
                        class="tips_wrap"
                        v-if="upload.licenseSidePage.status === 'uploading'"
                      >
                        <div class="tips_content">
                          <div class="file_loading el-icon-loading"></div>
                          <div class="loading_tips">上传中...</div>
                        </div>
                      </div>
                      <div
                        class="up_failed"
                        v-else-if="upload.licenseSidePage.status === 'failed'"
                      >
                        <div class="tips_content">
                          <div class="failed_tips el-icon-warning"></div>
                          <div class="loading_tips">上传失败</div>
                        </div>
                      </div>
                      <div class="bitmap_img_local" v-fastClick>
                        <div
                          @click.stop="handleSeeImg(upload.licenseSidePage)"
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
                          :src="upload.licenseSidePage.local_src"
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
import { checkString } from "@/utils/util.js";

var OSS = require("ali-oss");
export default {
  name: "driverManege",
  components: { Breadcrumb },
  data() {
    return {
      tabelHeigth: 420, // 表格初始化高度
      breadData: [{ name: "运输管理", path: "" }, { name: "司机管理" }],

      // 公共方法

      // 搜索条件
      searchValue: {
        clientName: "", //司机姓名
        companyNo: "", //运输公司
        status: "", //状态
      },
      companyOptions: [],
      offOptions: [],

      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],

      // 弹框
      dialogVisible: false,
      apiLoading: false,
      editeStatus: 1, //1: 新增  2：修改
      id: "",
      addValue: {
        name: "", //司机
        companyNos: "", //所属运输公司
        linkPhone: "", //联系方式
        deviceNo: "", //手环系列号
        licenseNum: "", //驾驶证编号
        licenseHomepage: "", //驾驶证主页
        licenseSidePage: "", //驾驶证附页
      },
      addValueRules: {
        name: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                "请输入司机姓名"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
        linkPhone: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                "请输入联系方式"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
        licenseNum: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                null,
                "请上传驾驶证主页或输入驾驶证编号"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
        companyNos: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                null,
                "请选择运输公司"
              );
            },
            trigger: ["blur", "change"],
          },
        ],
      },
      upload: {
        licenseHomepage: {},
        licenseSidePage: {},
      },

      transportCompanyOption: [],
      driverGpsOption: [],
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

  computed:{
    
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
  created() {
    this.getCompanyOptions();
    this.getOffOptions();
    this.getTableData();
  },
  methods: {
    // 运输公司列表
    getCompanyOptions() {
      this.companyOptions = []

      let params = {
        // pageNum: this.pageNum,
        // pageSize: 999999,
      };
      this.$http(this.GLOBALApi.getTransportCompany(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.companyOptions = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    getTableData() {
      this.loading = true;

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      for (let key of Object.keys(this.searchValue)) {
        if (
          this.searchValue[key] ||
          (!this.searchValue[key] && this.searchValue[key] === 0)
        ) {
          params[key] = this.searchValue[key];
        }
      }

      this.tableData = []
      this.$http(this.GLOBALApi.getTransportDriver(), params)
        .then((res) => {
          // console.log("-----",res);
          if (res.code === 200 && res.data) {
            this.loading = false;
            this.total = res.data.total;
            // this.tableData = res.data.records;

            // TODO
            let records = res.data.records || [];
            records.map((item, index) => {
              item.index = index + 1;
              // item.statusMsg = "禁用";
              // item.statusMsg = "启用";
            });

            this.tableData = records;
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

    // 获取字典
    getOffOptions() {
      this.offOptions = [];
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ["common_status"],
      })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];
            records.map((item, index) => {
              if (item.dictType === "common_status") {
                for (let temp of item.dictList) {
                  this.offOptions.push({
                    label: temp.dictValueDesc,
                    value: temp.dictValue ? Number(temp.dictValue) : "",
                  });
                }
              }
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    deleteData(value) {
      this.$http(this.GLOBALApi.deleteDrive(), { no: value })
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$message.success("删除成功");
            this.page = 1
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

      this.$http(this.GLOBALApi.addDrive(), this.addValue)
        .then((res) => {
          this.apiLoading = false;
          if (res.code === 200 && res.data) {
            this.dialogVisible = false;
            this.$message.success("新增成功");
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

      this.addValue.clientNo = this.id;
      this.$http(this.GLOBALApi.updateDrive(), this.addValue)
        .then((res) => {
          this.apiLoading = false;
          if (res.code === 200 && res.data) {
            this.dialogVisible = false;
            this.$message.success("修改成功");
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
      this.$http(this.GLOBALApi.getDriverDetail(), { no: this.id })
        .then((res) => {
          if (res.code === 200 && res.data) {
            let record = res.data || {};
            this.addValue = {
              name: record.name || "", //司机
              companyNos: record.companyNos || "", //所属运输公司
              linkPhone: record.linkPhone || "", //联系方式
              deviceNo: record.deviceNo || "", //手环系列号
              licenseNum: record.licenseNum || "", //驾驶证编号
              licenseHomepage: record.licenseHomepage || "", //驾驶证主页
              licenseSidePage: record.licenseSidePage || "", //驾驶证附页
            };

            if (record.licenseHomepage) {
              this.upload.licenseHomepage = {
                status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                local_src: record.licenseHomepage,
                up_url: record.licenseHomepage, //上传成功后用这个字段
              };
            }

            if (record.licenseSidePage) {
              this.upload.licenseSidePage = {
                status: "done", //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                local_src: record.licenseSidePage,
                up_url: record.licenseSidePage, //上传成功后用这个字段
              };
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((error) => {
          this.apiLoading = false;
          this.$message.error(error.msg);
        });
    },

    //获取运输公司
    getTransferCompany() {
      this.transportCompanyOption = [];
      this.$http(this.GLOBALApi.getEnableTransferCompany())
        .then((res) => {
          if (res.code === 200 && res.data) {
            let records = res.data || [];
            records.map((item, index) => {
              this.transportCompanyOption.push({
                label: item.name,
                value: item.companyNo,
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
        no: value,
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
        no: value,
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
              md5(self.$store.state.tokenValue + new Date().getTime() + randomStr) +
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
      this.addValue[field] = "";
      this.upload[field] = {};
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
      console.log("upFixedFile");
      let temp_id = nanoid();
      this.nameCheckRepeat(file, temp_id, suffix, type, field, () => {
        this.ossClient
          .multipartUpload(fileName, file, {
            ContentType: file.type,
          })
          .then((param) => {
            let tempUrl = param.res.requestUrls[0].split("?")[0];
            console.log("tempUrl: ", tempUrl);
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
      if (field == "licenseHomepage") {
        this.$http(this.GLOBALApi.recognizeDrivingLicenseByUrl(), { url: url })
          .then((res) => {
            if (res.code === 200 && res.data) {
              this.addValue.licenseNum = res.data.licenseNumber || ""
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
      // console.log(this.searchValue);
      this.pageNum = 1;
      this.getTableData();
    },

    // 删除
    handleDelete(value) {
      this.$confirm("确认删除此司机吗？", "删除确认")
        .then(() => {
          this.deleteData(value.clientNo);
        })
        .catch(() => {});
    },

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
      this.dialogVisible = true;
      this.editeStatus = status;
      for (let key of Object.keys(this.addValue)) {
        this.addValue[key] = "";
      }
      this.upload = {
        licenseHomepage: {},
        licenseSidePage: {},
      };

      this.getTransferCompany();
      this.getDriverGps();

      this.$nextTick(() => {
        this.$refs.addValue.resetFields();
        if (status == 2) {
          this.id = value.clientNo;
          this.getDetailData();
        }
      });
      // console.log("this.addValue: ", this.addValue);
    },
    handleClose() {
      this.dialogVisible = false;
    },

    handleSubmit() {
      this.$refs.addValue.validate((valid) => {
        if (valid) {
          let ready = this.checkUpload();
          if (!ready) return;
          console.log("addValue: ", this.addValue);
          if (this.editeStatus === 2) {
            this.$confirm("确认修改此司机吗？", "修改确认")
              .then(() => {
                this.updateData();
              })
              .catch(() => {});
          } else {
            this.addData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    checkUpload() {
      console.log("this.upload: ", this.upload)
      if (!Object.keys(this.upload.licenseHomepage).length) {
        this.$message.error("请上传驾驶证主页");
        return false;
      }
      if (!Object.keys(this.upload.licenseSidePage).length) {
        this.$message.error("请上传驾驶证副页");
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
        this.$confirm(`确认${msg}此司机吗？`, `${msg}确认`)
          .then((_) => {
            this.disableStatus(value.clientNo);
          })
          .catch((error) => {});
      } else {
        this.openStatus(value.clientNo);
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
  /deep/ .el-form-item--small:nth-child(2n + 2) {
    .el-form-item__label {
      margin-left: 90px;
    }
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
}
</style>
