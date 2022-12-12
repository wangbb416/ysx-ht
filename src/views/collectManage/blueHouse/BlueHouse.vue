<!--收集管理-小蓝之家管理-->
<template>
  <div id="blueHouse" class="blue_house_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="content">
      <div class="search" id="search">
        <div class="search_input">
          <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item label="">
              <el-input
                placeholder="请输入小蓝之家名称查找"
                v-model="searchValue.name"
                @keyup.enter.native="handleSearch"
                clearable
                @clear="handleSearch"
              >
                <!--<div slot="suffix" class="el-input-slot__icon">-->
                <!--<img src="@/assets/img/home/search.png" alt=""/>-->
                <!--</div>-->
              </el-input>
            </el-form-item>

            <el-form-item label="">
              <el-input
                placeholder="请输入管理员名称查找"
                v-model="searchValue.linkPersonName"
                @keyup.enter.native="handleSearch"
                clearable
                @clear="handleSearch"
              ></el-input>
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
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="search_bt">
          <div class="button_white" @click="handleSearch" v-fastClick>查询</div>
          <div class="button_blue" v-fastClick @click="handleOpenDialog(1)" v-if="MenuBtnValid('/blueHouse','新增')">
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
            width="50"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="小蓝之家"
            show-overflow-tooltip
            width="180"
          ></el-table-column>
          <el-table-column
            prop="companyNo"
            label="小蓝之家代码"
            show-overflow-tooltip
            width="110"
          ></el-table-column>
          <el-table-column
            prop="linkPersonName"
            label="管理员"
            show-overflow-tooltip
            width="90"
          ></el-table-column>
          <el-table-column
            prop="linkPersonPhone"
            label="联系方式"
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            prop="regionStr"
            label="所在地区"
            show-overflow-tooltip
            width="250"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip
            width="350"
          ></el-table-column>
          <el-table-column
            prop="deviceCode"
            label="摄像头ID"
            width="120"
          ></el-table-column>
          <el-table-column label="类型" width="90">
            <template slot-scope="scope">
              <div>{{ statusDict[scope.row.islandType] }}</div>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="70">
            <template slot-scope="scope">
              <div
                :class="[
                  scope.row.status == '0'
                    ? 'green'
                    : scope.row.status == '1'
                    ? 'red'
                    : ''
                ]"
              >
                {{ onOffDict[scope.row.status] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                @click="handleOpenDialog(2, scope.row)"
                type="text"
                size="small"
                class="blue"
                v-if="MenuBtnValid('/blueHouse','编辑')"
              >
                编辑
              </el-button>
              <el-button
                @click="handleOffStatus(scope.row)"
                type="text"
                size="small"
                class="blue"
                v-if="MenuBtnValid('/blueHouse','启用/禁用')"
              >
                {{
                  scope.row.status == '0'
                    ? '禁用'
                    : scope.row.status == '1'
                    ? '启用'
                    : ''
                }}
              </el-button>
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                class="blue"
                v-if="MenuBtnValid('/blueHouse','删除')"
              >
                删除
              </el-button>
              <el-button
              v-if="MenuBtnValid('/blueHouse','添加成员')"
                @click="handleAdd(scope.row)"
                type="text"
                size="small"
                class="blue"
              >
                添加成员
              </el-button>
              <el-button
              v-if="MenuBtnValid('/blueHouse','查看合影')"
                @click="handlePreview(scope.row.companyUrl)"
                :disabled="!scope.row.companyUrl"
                type="text"
                size="small"
                class="blue"
              >
                查看合影
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <div class="data_total">共{{ total }}项数据</div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            layout="sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="size"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 查看图片 -->
      <div
        v-show="isShowPreview"
        class="preview"
        style="width: 100%; height: 100%; position: fixed; z-index: 9"
        v-viewer="{ movable: false }"
      >
        <img
          v-if="preview_image"
          style="
            width: 0px;
            height: 0px;
            opacity: 0;
            position: fixed;
            top: -10px;
            left: -10px;
          "
          :data-source="preview_image"
          :src="preview_image"
          alt=""
        />
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
            <span slot="label">
              <span style="color: red">*</span>
              小蓝之家名称
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.name"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item prop="companyCode" class="right_item">
            <span slot="label">
              <span style="color: red">*</span>
              小蓝之家代码
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.companyCode"
              :disabled="editeStatus !== 1"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item prop="postcode">
            <span slot="label">
              <span style="color: red">*</span>
              邮编
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.postcode"
              @input="value => handleNumber(value, addValue, 'postcode', 6)"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item prop="linkPersonName" class="right_item">
            <span slot="label">
              <span style="color: red">*</span>
              管理员姓名
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.linkPersonName"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item prop="linkPersonPhone">
            <span slot="label">
              <span style="color: red">*</span>
              联系方式
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.linkPersonPhone"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="city_select" prop="street">
            <span slot="label">
              <span style="color: red">*</span>
              所在地区
            </span>
            <el-select
              v-model="addValue.province"
              @change="changeAddressProvince"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select v-model="addValue.city" @change="changeAddressCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select v-model="addValue.area" @change="changeAddressArea">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select v-model="addValue.street" @change="changeAddressStreet">
              <el-option
                v-for="item in streetOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="long_input" prop="address">
            <span slot="label">
              <span style="color: red">*</span>
              详细地址
            </span>
            <el-input
              placeholder="请输入详细地址"
              v-model.trim="addValue.address"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item prop="lon">
            <span slot="label">
              <span style="color: red">*</span>
              经度
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.lon"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item prop="lat" class="right_item">
            <span slot="label">
              <span style="color: red">*</span>
              纬度
            </span>
            <el-input
              placeholder="请输入"
              v-model.trim="addValue.lat"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item class="long_input" prop="businessScopes">
            <span slot="label">
              <span style="color: red">*</span>
              经营范围
            </span>
            <div @click="handleSubmitTreeOpen" style="cursor: pointer">
              <el-input
                placeholder="请选择经营范围"
                v-model.trim="addValue.businessScopesStr"
                onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                clearable
                readonly
                :maxlength="50"
              ></el-input>
            </div>
          </el-form-item>

          <el-form-item prop="deviceNo">
            <span slot="label">
              <span style="color: red">*</span>
              摄像头
            </span>
            <el-select
              v-model="addValue.deviceNo"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in deviceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div v-if="editeStatus !== 3" class="tips">
              说明：该摄像头用于录制入库和作业现场
            </div>
          </el-form-item>

          <el-form-item prop="landType" class="right_item">
            <span slot="label">
              <span style="color: red">*</span>
              类型
            </span>
            <el-select
              v-model="addValue.landType"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div v-if="editeStatus !== 3" class="tips">
              说明：需要船舶运输至中转仓的小蓝之家为海岛类型，其余为沿海类型
            </div>
          </el-form-item>
          <el-form-item label="小蓝之家合影" prop="upImageList" class="upImg">
            <el-upload
              :disabled="upImageList.length >= 1"
              action=""
              :show-file-list="false"
              :http-request="uploadImageHttp"
              accept=".jpg,.jpeg,.png,.gif"
            >
              <div
                class="up_file"
                :class="[upImageList.length >= 1 ? 'up_file_dis' : '']"
              >
                点击上传
              </div>
            </el-upload>

            <div class="file_list">
              <template v-if="upImageList.length">
                <div
                  class="file_group"
                  v-for="(item, index) in upImageList"
                  :key="item.id"
                >
                  <div class="file_preview">
                    <div
                      @click.stop="handleDeleteImage(index, item)"
                      class="file_delete el-icon-close"
                      v-if="item.status !== 'uploading'"
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
                          v-if="preview_image.length"
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
                      <img :src="item.local_src" alt="" draggable="" />
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="empty_box">暂无图片</div>
              </template>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <div class="button_blue" @click="handleSubmit">提交</div>
      </span>
    </el-dialog>
    <el-dialog
      title="选择经营范围"
      :visible.sync="dialogVisible2"
      :modal-append-to-body="true"
      :append-to-body="true"
      width="800px"
      @close="dialogVisible2 = false"
      :close-on-click-modal="false"
      top="10vh"
    >
      <div class="dialog_content">
        <el-tree
          :data="allAddressData"
          show-checkbox
          ref="businessScopesTree"
          node-key="id"
          :props="defaultProps"
        ></el-tree>
        <div slot="footer" style="padding-top: 24px; text-align: center">
          <div
            style="display: inline-block"
            class="button_blue"
            @click="handleSubmitTree"
          >
            确定
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import md5 from 'js-md5'
import { nanoid } from 'nanoid'
import region from "@/utils/region.json"
var OSS = require('ali-oss')

import {
  checkString,
  checkNumber,
  handlePhone,
  handleNumber
} from '@/utils/util.js'
import { lonCheck, latCheck } from '@/utils/validate'
import { Loading } from 'element-ui'

export default {
  name: 'blueHouse',
  components: { Breadcrumb },
  data() {
    return {
      tabelHeigth: 420, // 表格初始化高度
      breadData: [{ name: '收集管理', path: '' }, { name: '小蓝之家管理' }],
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
      preview_image: '', //图片预览

      // 公用方法
      // handlePhone,
      handleNumber,
      lonCheck,
      latCheck,

      // 搜索条件
      searchValue: {
        name: '', //小蓝之家
        linkPersonName: '', //家长名称
        status: null //0：启用  1：禁用
      },
      offOptions: [], //启用，禁用

      // 表格
      page: 1,
      size: 10,
      total: 0,
      tableData: [],

      // 弹框
      dialogVisible: false,
      dialogVisible2: false,
      apiLoading: false,
      editeStatus: 1, //1：新增  2:修改
      id: '',
      addValue: {
        name: '', //小蓝之家名称
        companyCode: '', //小蓝之家代码
        postcode: '', //邮编
        linkPersonName: '', //家长姓名
        linkPersonPhone: '', //联系方式
        address: '', //地址
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        area: '',
        areaCode: '',
        street: '',
        streetCode: '',
        businessScopesStr: '',
        businessScopes: [],
        deviceNo: '', //摄像头
        lon: '', //经度
        lat: '',
        landType: '', //类型
        upImageList: []
      },
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      streetOptions: [],
      casData: [],
      allAddressData: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      upImageList: [],
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
                '请填写小蓝之家名称'
              )
            },
            trigger: ['blur', 'change']
          }
        ],
        street: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error(`请选择地区地址`))
              }
            },
            trigger: ['change']
          }
        ],
        businessScopes: [
          {
            validator: (rule, value, callback) => {
              if (value && value.length) {
                callback()
              } else {
                callback(new Error(`请选择经营范围`))
              }
            },
            trigger: ['change']
          }
        ],
        address: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                50,
                '请填写详细地址'
              )
            },
            message: '请填写详细地址',
            trigger: ['blur']
          }
        ],
        companyCode: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                '请填写小蓝之家代码'
              )
            },
            trigger: ['blur', 'change']
          }
        ],
        postcode: [
          {
            validator: (rule, value, callback) => {
              checkNumber(rule, value, callback, null, null, 6, '请填写邮编')
            },
            trigger: ['blur', 'change']
          }
        ],
        linkPersonName: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                '请填写管理员姓名'
              )
            },
            trigger: ['blur', 'change']
          }
        ],
        linkPersonPhone: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                20,
                '请填写联系方式'
              )
            },
            trigger: ['blur', 'change']
          }
        ],
        landType: [
          {
            validator: (rule, value, callback) => {
              checkString(rule, value, callback, null, null, null, '请选择类型')
            },
            trigger: ['blur', 'change']
          }
        ],
        deviceNo: [
          {
            validator: (rule, value, callback) => {
              checkString(
                rule,
                value,
                callback,
                null,
                null,
                null,
                '请选择摄像头'
              )
            },
            trigger: ['blur', 'change']
          }
        ],
        lon: [
          { message: '请填写正确的经度', trigger: 'blur', validator: lonCheck }
        ],
        lat: [
          { message: '请填写正确的纬度', trigger: 'blur', validator: latCheck }
        ],
        upImageList: [
          { required: true, message: '请上传图片', trigger: 'change' }
        ]
      },

      deviceOption: [], //摄像头
      parentOptions: [],
      statusOptions: [],
      statusDict: {},
      onOffDict: {},
      loadingParent: false, //是否成功获取家人动态数据
      loadingInstance: null, //loading对象
      loading: false,
      isShowPreview: false //是否显示预览
    }
  },

  computed:{
    
  },
  created() {
    this.getTableData()
    this.getDictionary()
    // this.getParentData();
  },
  mounted() {
    // console.log("region",region);
    let self = this
    this.$nextTick(() => {
      this.tabelHeigth = document.querySelector('#blueHouse').offsetHeight - 257  - document.querySelector("#search").offsetHeight;
    })
    window.onresize = () => {
      if (document.querySelector("#blueHouse") && document.querySelector("#blueHouse").offsetHeight && document.querySelector("#search") && document.querySelector("#search").offsetHeight) {
        self.tabelHeigth = document.querySelector("#blueHouse").offsetHeight - 257 - document.querySelector("#search").offsetHeight;
      }
    };
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {}
  },
  activated() {},
  methods: {
    handleSubmitTreeOpen() {
      if (!this.allAddressData.length) {
        // 重新获取市级数据
        this.allAddressData = region
        if (this.addValue.businessScopes.length) {
          this.setCheckedKeysAction()
        }
      }
      this.dialogVisible2 = true
    },
    setCheckedKeysAction() {
      let startList = JSON.parse(JSON.stringify(this.addValue.businessScopes))
      let endList = []
      startList.forEach(item => {
        if (item.streetCode) {
          endList.push(item.streetCode)
        } else if (item.areaCode) {
          endList.push(item.areaCode)
          let list3 = this.allAddressData
            .find(cItem => {
              return cItem.id == item.provinceCode
            })
            .children.find(cItem => {
              return cItem.id == item.cityCode
            })
            .children.find(cItem => {
              return cItem.id == item.areaCode
            }).children
          list3.forEach(cItem => {
            endList.push(cItem.id)
          })
        } else if (item.cityCode) {
          endList.push(item.cityCode)
          let list2 = this.allAddressData
            .find(cItem => {
              return cItem.id == item.provinceCode
            })
            .children.find(cItem => {
              return cItem.id == item.cityCode
            }).children
          list2.forEach(cItem => {
            endList.push(cItem.id)
            if (cItem.children && cItem.children.length) {
              cItem.children.forEach(ccItem => {
                endList.push(ccItem.id)
              })
            }
          })
        } else {
          endList.push(item.provinceCode)
          let list = this.allAddressData.find(cItem => {
            return cItem.id == item.provinceCode
          }).children
          list.forEach(cItem => {
            endList.push(cItem.id)
            if (cItem.children && cItem.children.length) {
              cItem.children.forEach(ccItem => {
                endList.push(ccItem.id)
                if (ccItem.children && ccItem.children.length) {
                  ccItem.children.forEach(cccItem => {
                    endList.push(cccItem.id)
                  })
                }
              })
            }
          })
        }
      })
      endList = [...new Set(endList)]
      setTimeout(() => {
        this.$refs.businessScopesTree.setCheckedKeys(endList)
      }, 100);
    },
    handleSubmitTree() {
      // 选中的数组
      // console.log('xxxxxx', )
      let list = JSON.parse(
        JSON.stringify(this.$refs.businessScopesTree.getCheckedNodes())
      ).map(item => {
        return {
          level: item.level,
          pid: item.pid,
          id: item.id,
          name: item.name
        }
      })
      // 半选中的数组
      let halfList = JSON.parse(
        JSON.stringify(this.$refs.businessScopesTree.getHalfCheckedNodes())
      ).map(item => {
        return {
          level: item.level,
          pid: item.pid,
          id: item.id,
          name: item.name
        }
      })
      let listProvince = list.filter(item => {
        return item.level == 1
      })
      let listCity = list.filter(item => {
        return item.level == 2
      })
      let listArea = list.filter(item => {
        return item.level == 3
      })
      let listStreet = list.filter(item => {
        return item.level == 4
      })
      let pList = []
      let cList = []
      let aList = []
      let newList = []
      listProvince.forEach(item => {
        pList.push(item.id)
        newList.push({
          ...item
        })
      })
      listCity.forEach(item => {
        cList.push(item.id)
        if (!pList.includes(item.pid)) {
          newList.push({
            ...item
          })
        }
      })
      listArea.forEach(item => {
        aList.push(item.id)
        if (!cList.includes(item.pid)) {
          newList.push({
            ...item
          })
        }
      })
      listStreet.forEach(item => {
        if (!aList.includes(item.pid)) {
          newList.push({
            ...item
          })
        }
      })
      let returnList = newList.map(item => {
        let obj = {}
        let pObj = {}
        let cObj = {}
        let aObj = {}
        switch (item.level) {
          case 1:
            obj.province = item.name
            obj.provinceCode = item.id
            break
          case 2:
            pObj = halfList.find(hItem => {
              return hItem.id === item.pid
            })
            obj.province = pObj.name
            obj.provinceCode = pObj.id
            obj.city = item.name
            obj.cityCode = item.id
            break
          case 3:
            cObj = halfList.find(hItem => {
              return hItem.id === item.pid
            })
            pObj = halfList.find(hItem => {
              return hItem.id === cObj.pid
            })
            obj.province = pObj.name
            obj.provinceCode = pObj.id
            obj.city = cObj.name
            obj.cityCode = cObj.id
            obj.area = item.name
            obj.areaCode = item.id
            break
          default:
            aObj = halfList.find(hItem => {
              return hItem.id === item.pid
            })
            cObj = halfList.find(hItem => {
              return hItem.id === aObj.pid
            })
            pObj = halfList.find(hItem => {
              return hItem.id === cObj.pid
            })
            obj.province = pObj.name
            obj.provinceCode = pObj.id
            obj.city = cObj.name
            obj.cityCode = cObj.id
            obj.area = aObj.name
            obj.areaCode = aObj.id
            obj.street = item.name
            obj.streetCode = item.id
            break
        }
        return obj
      })
      this.addValue.businessScopes = returnList
      let businessScopesStr = ''
      returnList.forEach((item, index) => {
        if (index == returnList.length - 1) {
          businessScopesStr += `${item.province || ''}${item.city || ''}${
            item.area || ''
          }${item.street || ''}`
        } else {
          businessScopesStr += `${item.province || ''}${item.city || ''}${
            item.area || ''
          }${item.street || ''}、`
        }
      })
      this.addValue.businessScopesStr = businessScopesStr
      this.dialogVisible2 = false
    },
    changeAddressProvince(itemData) {
      this.changeAddress(1, itemData)
    },
    changeAddressCity(itemData) {
      this.changeAddress(2, itemData)
    },
    changeAddressArea(itemData) {
      this.changeAddress(3, itemData)
    },
    changeAddressStreet(itemData) {
      this.changeAddress(4, itemData)
    },
    changeAddress(leave, itemData) {
      switch (leave) {
        case 1:
          this.addValue.province = itemData.name
          this.addValue.provinceCode = itemData.id
          this.addValue.city = ''
          this.addValue.cityCode = ''
          this.cityOptions = []
          this.addValue.area = ''
          this.addValue.areaCode = ''
          this.areaOptions = []
          this.addValue.street = ''
          this.addValue.streetCode = ''
          this.streetOptions = []
          this.cityOptions = itemData.children||[]
          break
        case 2:
          this.addValue.city = itemData.name
          this.addValue.cityCode = itemData.id
          this.addValue.area = ''
          this.addValue.areaCode = ''
          this.areaOptions = []
          this.addValue.street = ''
          this.addValue.streetCode = ''
          this.streetOptions = []
          // 重新获取区级数据
          this.areaOptions = itemData.children||[]
          break
        case 3:
          this.addValue.area = itemData.name
          this.addValue.areaCode = itemData.id
          this.addValue.street = ''
          this.addValue.streetCode = ''
          this.streetOptions = []
          // 重新获取街道级数据
          this.streetOptions = itemData.children||[]
          break
        case 4:
          this.addValue.street = itemData.name
          this.addValue.streetCode = itemData.id
          break
        default:
          break
      }
    },
    getTableData() {
      this.loading = true

      let params = {
        pageNum: this.page,
        pageSize: this.size
      }
      for (let key of Object.keys(this.searchValue)) {
        if (
          this.searchValue[key] ||
          (!this.searchValue[key] && this.searchValue[key] === 0)
        ) {
          params[key] = this.searchValue[key]
        }
      }

      this.tableData = []
      this.$http(this.GLOBALApi.blueHouseGetByPage(), params)
        .then(res => {
          // console.log("res: ", res);
          if (res.code === 200 && res.data) {
            this.loading = false

            this.total = res.data.total || 0
            let records = res.data.records || []
            records.map((item, index) => {
              item.index = index + 1
              // TODO
              // item.statusMsg = "启用";
              // item.statusMsg = "禁用";
            })
            this.tableData = records
          } else {
            this.loading = false
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.loading = false
          this.$message.error(error.msg)
        })
    },
    // getParentData() {
    //   setTimeout(() => {
    //     this.parentOptions = [
    //       { id: 1, name: '张三', linkPersonPhone: '12345678945' },
    //       { id: 2, name: '李四', linkPersonPhone: '15478963254' }
    //     ]
    //     this.loadingParent = true
    //     if (this.loadingInstance) {
    //       this.loadingInstance.close()
    //     }
    //   }, 5000)
    //   this.$http(this.GLOBALApi.getParentData())
    //     .then(res => {
    //       if (res.code === 200 && res.data) {
    //         this.loadingParent = true
    //         if (this.loadingInstance) {
    //           this.loadingInstance.close()
    //         }

    //         let records = res.data.records || []
    //         records.map((item, index) => {
    //           this.parentOptions.push({
    //             id: item.id,
    //             name: item.name,
    //             linkPersonPhone: item.linkPersonPhone
    //           })
    //         })
    //       } else {
    //         this.$message.error(res.msg)
    //       }
    //     })
    //     .catch(error => {
    //       this.$message.error(error.msg)
    //     })
    // },
    getStatusDict() {
      for (let item of this.statusOptions) {
        this.$set(this.statusDict, item.value, item.label)
      }
      for (let item of this.offOptions) {
        this.$set(this.onOffDict, item.value, item.label)
      }
    },
    // 获取字典
    getDictionary() {
      this.offOptions = []
      this.statusOptions = []
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ['common_status', 'land_type']
      })
        .then(res => {
          if (res.code === 200 && res.data) {
            let records = res.data || []
            records.map((item, index) => {
              item.dictList = item.dictList || []
              if (item.dictType === 'common_status') {
                for (let temp of item.dictList) {
                  this.offOptions.push({
                    label: temp.dictValueDesc,
                    value: temp.dictValue ? Number(temp.dictValue) : ''
                  })
                }
              } else if (item.dictType === 'land_type') {
                for (let temp of item.dictList) {
                  this.statusOptions.push({
                    label: temp.dictValueDesc,
                    value: temp.dictValue ? Number(temp.dictValue) : ''
                  })
                }
              }
            })
            this.getStatusDict()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    // 获取摄像头
    getDevice() {
      this.deviceOption = []
      this.$http(this.GLOBALApi.getDeviceGps(), {
        // pageNum: 1,
        // pageSize: 9999999,
        deviceType: 4,
        status: 0 // 0：开启 1：关闭 
      })
        .then(res => {
          if (res.code === 200 && res.data && Array.isArray(res.data)) {
            let records = res.data || []
            records.map((item, index) => {
              let temp = {
                label: `${item.name}-${item.deviceCode}`,
                value: item.deviceNo,
                ...item
              }
              this.deviceOption.push(temp)
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    // 获取详情
    getDetailData() {
      // console.log("-------");
      this.$http(this.GLOBALApi.getHomeDetail(), { 
        no: this.id
      })
        .then(res => {
          if (res.code === 200 && res.data) {
            let record = res.data || {}
            this.addValue = {
              name: record.name, //小蓝之家名称
              companyCode: record.companyCode, //小蓝之家代码
              postcode: record.postcode, //邮编
              linkPersonName: record.linkPersonName, //管理员姓名
              linkPersonPhone: record.linkPersonPhone, //联系方式
              address: record.address, //地址
              province: record.region ? record.region.province : '',
              provinceCode: record.region ? record.region.provinceCode : '',
              city: record.region ? record.region.city : '',
              cityCode: record.region ? record.region.cityCode : '',
              area: record.region ? record.region.area : '',
              areaCode: record.region ? record.region.areaCode : '',
              street: record.region ? record.region.street : '',
              streetCode: record.region ? record.region.streetCode : '',
              businessScopes: record.businessScopes || [],
              deviceNo: record.deviceCode, //摄像头
              lon: record.lon || '', //
              lat: record.lat || '',
              landType: record.islandType, //类型
              upImageList: record.companyUrl ? record.companyUrl : '',
              ...record
            }
            let businessScopesStr = ''
            this.addValue.businessScopes.forEach((item, index) => {
              if (index == this.addValue.businessScopes.length - 1) {
                businessScopesStr += `${item.province || ''}${item.city || ''}${
                  item.area || ''
                }${item.street || ''}`
              } else {
                businessScopesStr += `${item.province || ''}${item.city || ''}${
                  item.area || ''
                }${item.street || ''}、`
              }
            })
            this.addValue.businessScopesStr = businessScopesStr
            if (this.addValue.provinceCode) {
              region.map(item => {
                if (item['id'] ==  this.addValue.provinceCode) {
                   this.cityOptions = item.children
                }
              })

              this.cityOptions.map(item => {
                if (item['id'] ==  this.addValue.cityCode) {
                   this.areaOptions = item.children
                }
              })
              this.areaOptions.map(item => {
                if (item['id'] ==  this.addValue.areaCode) {
                   this.streetOptions = item.children
                }
              })
            }

            if (this.allAddressData.length) {
              this.setCheckedKeysAction()
            }
            // this.preview_image = record.companyUrl?record.companyUrl:''
            if (record.companyUrl) {
              this.upImageList.push({
                fileType: 'image', //文件类型
                status: 'done', //上传状态、uploading：上传中，done：上传成功。failed：上传失败
                message: '上传成功', //上传信息显示
                local_src: record.companyUrl,
                up_url: record.companyUrl
              })
            }
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
          this.apiLoading = false
          this.$message.error(error.msg)
        })
    },
    addData() {
      // console.log(this.upImageList[0].up_url,"this.upImageList");
      if (this.apiLoading) {
        return
      }
      this.apiLoading = true
      let copyAddValue = {
        region: {}
      }
      let includeItems = [
        'province',
        'provinceCode',
        'city',
        'cityCode',
        'area',
        'areaCode',
        'street',
        'streetCode',
        'businessScopesStr'
      ]
      // console.log("-----------",this.addValue);
      for (const key in this.addValue) {
        if (includeItems.includes(key)) {
          if (key != 'businessScopesStr') {
            copyAddValue.region[key] = this.addValue[key]
          }
        } else {
          copyAddValue[key] = this.addValue[key]
        }
      }
      let params = {
        ...copyAddValue,
        // upImageList: '',
        companyUrl: this.upImageList[0].up_url
        //  companyUrl:this.addValue.upImageList[0].up_url
      }
      this.$http(this.GLOBALApi.addBlueHouse(), params)
        .then(res => {
          this.apiLoading = false
          if (res.code === 200 && res.data) {
            this.dialogVisible = false
            this.$message.success('新增成功')
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.apiLoading = false
          this.$message.error(error.msg)
        })
    },
    updateDate() {
      if (this.apiLoading) {
        return
      }
      this.apiLoading = true
      this.addValue.companyNo = this.id
      let copyAddValue = {
        region: {}
      }
      let includeItems = [
        'province',
        'provinceCode',
        'city',
        'cityCode',
        'area',
        'areaCode',
        'street',
        'streetCode',
        'businessScopesStr'
      ]
      for (const key in this.addValue) {
        if (includeItems.includes(key)) {
          if (key != 'businessScopesStr') {
            copyAddValue.region[key] = this.addValue[key]
          }
        } else {
          copyAddValue[key] = this.addValue[key]
        }
      }
      let params = {
        ...copyAddValue,
        upImageList: '',
        companyUrl: this.upImageList[0].up_url
      }
      this.$http(this.GLOBALApi.updateHome(), params)
        .then(res => {
          this.apiLoading = false
          if (res.code === 200 && res.data) {
            this.dialogVisible = false
            this.$message.success('修改成功')
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
          this.apiLoading = false
          this.$message.error(error.msg)
        })
    },

    // 禁用
    disableStatus(value) {
      this.$http(this.GLOBALApi.disableHome(), {
        no: value
      })
        .then(res => {
          console.log("-----",res);
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    // 启用
    openStatus(value) {
      this.$http(this.GLOBALApi.enableBlueHouse(), {
        no: value
      })
        .then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    deleteData(value) {
      this.$http(this.GLOBALApi.deleteBlueHouse(), {
        no: value
      })
        .then(res => {
          if (res.code === 200) {
            this.$message.success('操作成功')
            this.page = 1
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },

    // 分页
    handleSizeChange(value) {
      // console.log(value);
      this.size = value
      this.getTableData()
    },
    handleCurrentChange(value) {
      // console.log(value);
      this.page = value
      this.getTableData()
    },

    // 搜索
    handleSearch() {
      this.page = 1
      this.getTableData()
    },

    // 弹框
    handleOpenDialog(status, value) {
      if (!this.provinceOptions.length) {
        this.provinceOptions = region
      }
      this.upImageList = []
      this.dialogVisible = true
      this.editeStatus = status
      
      for (let key of Object.keys(this.addValue)) {
        this.addValue[key] = ''
      }
      
      this.addValue.businessScopes = []
      this.cityOptions = []
      this.areaOptions = []
      this.streetOptions = []
      this.casData = []
      this.getDevice()
      
      try {
        this.$refs.businessScopesTree.setCheckedKeys([])
      } catch (error) {}
      if (status == 2) {
        this.id = value.companyNo
        this.getDetailData()
      }
      this.$nextTick(() => {
        this.$refs.addValue.resetFields()
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleParentChange(value) {
      // console.log(value);
      let temp = this.parentOptions.filter(item => item.id === value)[0]
      this.addValue.linkPersonName = temp.name
      this.addValue.linkPersonPhone = temp.linkPersonPhone
    },
    handleSubmit() {
      console.log('上传图片', this.upImageList)
      this.$refs.addValue.validate(valid => {
        if (valid) {
          // console.log('addValue: ', this.addValue)
          if (this.editeStatus === 2) {
            this.$confirm('确认修改此小蓝之家吗？', `修改确认`)
              .then(_ => {
                this.updateDate()
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.addData()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleOffStatus(value) {
      let msg =
        value.status == '0'
          ? '禁用'
          : value.status == '1'
          ? '启用'
          : ''
      if (msg === '禁用') {
        this.$confirm(`确认${msg}此小蓝之家吗？`, `${msg}确认`)
          .then(_ => {
            this.disableStatus(value.companyNo)
          })
          .catch(error => {})
      } else {
        this.openStatus(value.companyNo)
      }
    },
    handleDelete(value) {
      this.$confirm('确认删除？', `删除确认`)
        .then(_ => {
          this.deleteData(value.companyNo)
        })
        .catch(error => {})
    },
    uploadImageHttp({ file }) {
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
            this.$message.warning('图片源的this.upImageList宽高不存在！')
            return false
          }
        }
        imgObj.onerror = () => {
          this.$message.warning('请勿修改文件尾缀名，或图片源的宽高不存在！')
          return false
        }
      }
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
      if (type === 'image') {
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

      if (type === 'image') {
        if (this.upImageList.length <= 0) {
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
          this.addValue.upImageList = this.upImageList
        }
      }
      callBack && callBack()
      return false
    },
    handleSeeImg(arg) {
      this.preview_image = arg.up_url
      const viewerPreview = document.querySelector('.images_preview').$viewer
      viewerPreview.show()
    },
    handleDeleteImage(index, item) {
      this.addValue.upImageList = ''
      this.upImageList.splice(index, 1)
      this.publicDelete(index, item)
    },
    publicDelete(index, item) {
      if (item.up_url && item.up_url.length > 0) {
        let dealUrl = item.up_url.replace('https://', '').split('/')
        let folder =
          dealUrl[1] + '/' + dealUrl[2] + '/' + dealUrl[3] + '/' + dealUrl[4]
        let fileName = dealUrl[5]
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
    handlePreview(arg) {
      this.preview_image = arg
      const viewerPreview = document.querySelector('.preview').$viewer
      viewerPreview.show()
      this.isShowPreview = true
    },
    // 添加成员
    handleAdd(value) {
      this.$router.push({ path: '/memberManage', query: { companyNo: value.companyNo } })
    },
    // 序号
    getIndex(index) {
      if (this.page) {
        return index + (this.page - 1) * this.size + 1
      } else {
        return index + 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.blue_house_page {
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
.green {
  color: green;
}
.red {
  color: red;
}

// 分页
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

/deep/ .el-dialog__footer {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-loading-spinner {
  i.el-icon-loading {
    font-size: 20px;
    line-height: 40px;
  }
}

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}

.tips {
  color: #666;
  font-size: 12px;
  line-height: 12px;
  margin-top: 5px;
}

// 图片上传
.upImg {
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

  .up_file_dis {
    background: #b1b1b1;
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
  }
}
// 弹窗
.dialog_content {
  color: #303133;
  font-size: 14px;
  /deep/ .el-input.el-input--small.el-input--suffix {
    width: 300px;
  }
  /deep/ .el-select.el-select--small {
    width: 300px;
    .el-input.el-input--small.el-input--suffix {
      width: 300px !important;
    }
  }
  .right_item {
    margin-left: 120px;
  }
  .city_select {
    margin-left: 120px;
    /deep/ .el-select.el-select--small {
      width: 100px;
      .el-input.el-input--small.el-input--suffix {
        width: 100px !important;
      }
    }
  }
  .long_input {
    /deep/ .el-input.el-input--small.el-input--suffix {
      width: 850px !important;
    }
  }
  .nature_of_business {
    height: 34px;
    line-height: 34px;
    width: 850px;
    border: solid 1px #dcdfe6;
    padding: 0 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    cursor: pointer;
  }
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
</style>
