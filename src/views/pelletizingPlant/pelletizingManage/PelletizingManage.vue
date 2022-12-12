<!-- 造粒厂-造粒厂管理 -->
<template>
  <div class="pelletizing_page" id="pelletizing_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="">
              <el-input
                placeholder="请输入造粒公司名称查找"
                v-model.trim="formData.search"
                onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                @keyup.enter.native="searchFn"
                clearable
                @clear="searchFn"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                clearable
                v-model="formData.status"
                placeholder="请选择"
                filterable
                @change="searchFn"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="search-bt">
          <div class="button-white" @click="searchFn" v-fastClick>查询</div>
          <div class="button-blue" @click="handleOpenDialog('add')" v-if="MenuBtnValid('/pelletizingManage','新增')">新增</div>
        </div>
      </div>
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
          width="80"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="造粒公司名称"
          show-overflow-tooltip
          width="320"
        ></el-table-column>
        <el-table-column
          prop="linkPersonName"
          label="负责人"
          show-overflow-tooltip
          width=""
        ></el-table-column>
        <el-table-column
          prop="linkPersonPhone"
          label="联系方式"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="regionStr"
          label="所在地区"
          show-overflow-tooltip
          width=""
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip
          width=""
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="年度海塑总量（吨）"
          width="180"
        ></el-table-column>
        <el-table-column prop="statusMsg" label="状态" width="120">
          <template slot-scope="scope">
            <div :style="{ color: scope.row.status == 0 ? 'green' : 'red' }">
              {{ scope.row.statusMsg }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <el-button
              @click="handleOpenDialog('edit', scope.row)"
              type="text"
              size="small"
              v-if="MenuBtnValid('/pelletizingManage','编辑')"
            >
              编辑
            </el-button>
            <el-button
              v-if="scope.row.status == 0 && MenuBtnValid('/pelletizingManage','启用/禁用')"
              @click="handleOperateDialog('disable', scope.row)"
              type="text"
              size="small"
            >
              禁用
            </el-button>
            <el-button
              v-if="scope.row.status != 0 && MenuBtnValid('/pelletizingManage','启用/禁用')"
              @click="handleOperateDialog('enable', scope.row)"
              type="text"
              size="small"
            >
              启用
            </el-button>
            <el-button
              @click="handleOperateDialog('delate', scope.row)"
              type="text"
              size="small"
              v-if="MenuBtnValid('/pelletizingManage','删除')"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <div class="data-total">共{{ total }}项数据</div>
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
    <!-- 新建 编辑-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      width="1232px"
      @close="closeDialogVisible"
      :close-on-click-modal="false"
      top="10vh"
    >
      <div class="dialog_content">
        <el-form
          :model="companyInfo"
          :rules="addValueRules"
          label-width="120px"
          label-position="left"
          size="small"
          inline
          ref="companyInfo"
        >
          <el-form-item label="造粒公司名称" prop="company">
            <el-input
              :disabled="!isEdit && companyInfo.id != null"
              placeholder="请输入"
              v-model.trim="companyInfo.company"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>

          <el-form-item label="负责人" prop="leader" class="right_item">
            <el-input
              :disabled="!isEdit && companyInfo.id != null"
              placeholder="请输入"
              v-model.trim="companyInfo.leader"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>

          <el-form-item label="联系方式" prop="phone">
            <el-input
              :maxlength="11"
              :disabled="!isEdit && companyInfo.id != null"
              placeholder="请输入"
              v-model.trim="companyInfo.phone"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="city_select" prop="street">
            <span slot="label">
              <span style="color: red">*</span>
              所在地区
            </span>
            <el-select
              v-model="companyInfo.province"
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
            <el-select v-model="companyInfo.city" @change="changeAddressCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select v-model="companyInfo.area" @change="changeAddressArea">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select
              v-model="companyInfo.street"
              @change="changeAddressStreet"
            >
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
              v-model.trim="companyInfo.address"
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
              v-model.trim="companyInfo.lon"
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
              v-model.trim="companyInfo.lat"
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
                v-model.trim="companyInfo.businessScopesStr"
                onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                clearable
                readonly
                :maxlength="50"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="接收摄像头" prop="receivingCamera">
            <el-select
              v-model="companyInfo.receivingCamera"
              placeholder="请选择接收摄像头"
              clearable
            >
              <el-option
                v-for="item in productionCameraOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="d">说明：该摄像头用于造粒厂接收海塑时录制</div>
          </el-form-item>
          <el-form-item
            label="生产摄像头"
            prop="productionCamera"
            class="right_item"
          >
            <el-select
              v-model="companyInfo.productionCamera"
              placeholder="请选择生产摄像头"
              @change="bindChange"
              multiple
              clearable
            >
              <el-option
                v-for="item in productionCameraOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <div class="d">说明：该摄像头用于生产粒子过程视频录制</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" v-if="isEdit || companyInfo.id == null">
        <div class="search-bt">
          <div class="button-blue" @click="handleSubmit">提交</div>
        </div>
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
import { checkString } from '@/utils/util.js'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { cheackMobile } from '@/utils/validate'
import { lonCheck, latCheck } from '@/utils/validate'
import region from "@/utils/region.json"
export default {
  name: 'pelletizingManage',
  data() {
    return {
      lonCheck,
      latCheck,
      cheackMobile,
      tabelHeigth: 420,
      breadData: [{name: "再生造粒", path: ""}, {name: "造粒厂管理"}],
      formData: {
        search: null,
        status: null
      },
      tableData: [],
      // 表格
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 新建
      dialogVisible: false,
      dialogVisible2: false,
      isEdit: false,
      companyInfo: {
        id: null,
        company: '',
        leader: '',
        phone: '',
        province: '',
        provinceCode: '',
        city: '',
        cityCode: '',
        area: '',
        areaCode: '',
        street: '',
        streetCode: '',
        address: '',
        businessScopesStr: '',
        businessScopes: [],
        lon: '', //
        lat: '', //
        receivingCamera: '',
        productionCamera: []
      },
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      streetOptions: [],
      casData: [],
      productionCameraOption: [],
      allAddressData: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      addValueRules: {
        company: [
          { required: true, message: '请填写造粒公司名称', trigger: 'blur' }
        ],
        leader: [{ required: true, message: '请填写负责人', trigger: 'blur' }],
        phone: [
          {
            required: true,
            message: '请填写正确的联系方式',
            trigger: 'blur',
            validator: cheackMobile
          }
        ],
        lon: [
          { message: '请填写正确的经度', trigger: 'blur', validator: lonCheck }
        ],
        lat: [
          { message: '请填写正确的纬度', trigger: 'blur', validator: latCheck }
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
        receivingCamera: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error(`请选择接收摄像头`))
              }
            },
            trigger: ['change']
          }
        ],
        productionCamera: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value.length > 0) {
                callback()
              } else {
                callback(new Error(`请选择生产摄像头`))
              }
            },
            trigger: ['change']
          }
        ]
      },

      loading: false,
      statusList: [
        // {id:1,name:"开启"},
        // {id:2,name:"禁用"},
      ]
    }
  },
  components: { Breadcrumb },
  created() {
    this.getStatusList()
    this.pageNum = 1
    this.tableData = []
    this.getTableData()
  },
  mounted() {
    let self = this
    this.$nextTick(() => {
      this.tabelHeigth =
        document.querySelector('#pelletizing_page').offsetHeight -
        257 -
        document.querySelector('#search').offsetHeight
    })
    window.onresize = () => {
      if (
        document.querySelector('#pelletizing_page') &&
        document.querySelector('#pelletizing_page').offsetHeight &&
        document.querySelector('#search') &&
        document.querySelector('#search').offsetHeight
      ) {
        self.tabelHeigth =
          document.querySelector('#pelletizing_page').offsetHeight -
          257 -
          document.querySelector('#search').offsetHeight
      }
    }
  },
  beforeDestroy() {
    //清理页面onresize事件
    window.onresize = () => {}
  },
  activated() {},
  methods: {
    bindChange(e) {
      if (e.length > 5) {
        this.$message.warning('最多只可添加5个摄像头')
        this.companyInfo.productionCamera.splice(-1)
      }
    },
    searchFn() {
      this.pageNum = 1
      this.tableData = []
      this.getTableData()
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
            let list = records.map(item => {
              return {
                ...item,
                label: `${item.name}-${item.deviceCode}`,
                value: item.deviceNo
              }
            })
            this.productionCameraOption = list
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    handleSubmitTreeOpen() {
      if (!this.allAddressData.length) {
        // 重新获取市级数据
        this.allAddressData = region
        if (this.companyInfo.businessScopes.length) {
          this.setCheckedKeysAction()
        }
      }
      this.dialogVisible2 = true
    },
    setCheckedKeysAction() {
      let startList = JSON.parse(
        JSON.stringify(this.companyInfo.businessScopes)
      )
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
      this.companyInfo.businessScopes = returnList
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
      this.companyInfo.businessScopesStr = businessScopesStr
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
          this.companyInfo.province = itemData.name
          this.companyInfo.provinceCode = itemData.id
          this.companyInfo.city = ''
          this.companyInfo.cityCode = ''
          this.cityOptions = []
          this.companyInfo.area = ''
          this.companyInfo.areaCode = ''
          this.areaOptions = []
          this.companyInfo.street = ''
          this.companyInfo.streetCode = ''
          this.streetOptions = []
          this.cityOptions = itemData.children||[]
          break
        case 2:
          this.companyInfo.city = itemData.name
          this.companyInfo.cityCode = itemData.id
          this.companyInfo.area = ''
          this.companyInfo.areaCode = ''
          this.areaOptions = []
          this.companyInfo.street = ''
          this.companyInfo.streetCode = ''
          this.streetOptions = []
          // 重新获取区级数据
          this.areaOptions = itemData.children||[]
          break
        case 3:
          this.companyInfo.area = itemData.name
          this.companyInfo.areaCode = itemData.id
          this.companyInfo.street = ''
          this.companyInfo.streetCode = ''
          this.streetOptions = []
          // 重新获取街道级数据
          this.streetOptions = itemData.children||[]
          break
        case 4:
          this.companyInfo.street = itemData.name
          this.companyInfo.streetCode = itemData.id
          break
        default:
          break
      }
    },
    // 获取字典
    getStatusList() {
      this.$http(this.GLOBALApi.queryDictDataByTypes(), {
        nos: ['common_status']
      })
        .then(res => {
          if (res.code === 200 && res.data) {
            let records = res.data || []
            records.map((item, index) => {
              if (item.dictType === 'common_status') {
                for (let temp of item.dictList) {
                  this.statusList.push({
                    name: temp.dictValueDesc,
                    id: temp.dictValue ? Number(temp.dictValue) : ''
                  })
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

    // 获取table列表
    getTableData() {
      this.loading = true

      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: this.formData.search,
        status: this.formData.status
      }
      this.tableData = []
      this.$http(this.GLOBALApi.plantGetByPage(), params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.loading = false

            this.total = res.data.total || 0
            let records = res.data.records || []
            records.map((item, index) => {
              this.tableData.push({
                regionStr: item.regionStr,
                name: item.name,
                linkPersonName: item.linkPersonName,
                linkPersonPhone: item.linkPersonPhone,
                address: item.address,
                // weight: item.weight?Number(item.weight*10000)/10000000:'',
                weight: item.totalYear,
                id: item.id,
                status: item.status,
                statusMsg: item.statusMsg,
                ...item
              })
            })
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

    // 关闭弹窗
    closeDialogVisible() {
      this.$nextTick(() => {
        for (let key of Object.keys(this.companyInfo)) {
          this.companyInfo[key] = ''
        }
        this.isEdit = false
        this.companyInfo.id = null
        this.companyInfo.businessScopes = []
        this.companyInfo.productionCamera = []
        this.cityOptions = []
        this.areaOptions = []
        this.streetOptions = []
        this.casData = []
      })
      this.$refs.companyInfo.resetFields()
    },
    // 新建,修改
    handleOpenDialog(type, val) {
      if (!this.productionCameraOption.length) {
        this.getDevice()
      }
      if (!this.provinceOptions.length) {
        this.provinceOptions = region
      }
      try {
        this.$refs.businessScopesTree.setCheckedKeys([])
      } catch (error) {}
      if (type == 'add') {
        this.isEdit = false
        this.dialogVisible = true
      } else if (type == 'edit') {
        this.isEdit = true
        this.getDetail(val)
      }
    },
    // 查看详情
    getDetail(item) {
      this.$http(this.GLOBALApi.plantDetail(), { no: item.companyNo })
        .then(res => {
          if (res.code === 200 && res.data) {
            let data = res.data
            this.$nextTick(() => {
              let item = this.productionCameraOption.find(item => {
                return item.deviceCode == data.receiveDeviceCode
              })
              let receivingCamera = ''
              let productionCamera = []
              if (item) {
                receivingCamera = item.deviceNo
              }
              let items = this.productionCameraOption.filter(item => {
                return data.produceDeviceCodes.includes(item.deviceCode)
                // return item.deviceCode == data.receiveDeviceCode
              })
              if (items.length) {
                productionCamera = items.map(item => {
                  return item.deviceNo
                })
              }
              this.companyInfo = {
                id: data.companyNo,
                leader: data.linkPersonName,
                phone: data.linkPersonPhone,
                address: data.address,
                company: data.name,
                province: data.region ? data.region.province : '',
                provinceCode: data.region ? data.region.provinceCode : '',
                city: data.region ? data.region.city : '',
                cityCode: data.region ? data.region.cityCode : '',
                area: data.region ? data.region.area : '',
                areaCode: data.region ? data.region.areaCode : '',
                street: data.region ? data.region.street : '',
                streetCode: data.region ? data.region.streetCode : '',
                businessScopes: data.businessScopes || [],
                lon: data.lon || '', //
                lat: data.lat || '', //
                receivingCamera: receivingCamera,
                productionCamera: productionCamera
              }
              let businessScopesStr = ''
              this.companyInfo.businessScopes.forEach((item, index) => {
                if (index == this.companyInfo.businessScopes.length - 1) {
                  businessScopesStr += `${item.province || ''}${
                    item.city || ''
                  }${item.area || ''}${item.street || ''}`
                } else {
                  businessScopesStr += `${item.province || ''}${
                    item.city || ''
                  }${item.area || ''}${item.street || ''}、`
                }
              })
              this.companyInfo.businessScopesStr = businessScopesStr
              if (this.companyInfo.provinceCode) {
                region.map(item => {
                  if (item['id'] ==  this.companyInfo.provinceCode) {
                    this.cityOptions = item.children
                  }
                })

                this.cityOptions.map(item => {
                  if (item['id'] ==  this.companyInfo.cityCode) {
                    this.areaOptions = item.children
                  }
                })
                this.areaOptions.map(item => {
                  if (item['id'] ==  this.companyInfo.areaCode) {
                    this.streetOptions = item.children
                  }
                })
              }
              if (this.allAddressData.length) {
                this.setCheckedKeysAction()
              }
              this.dialogVisible = true
            })
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    handleOperateDialog(value, item) {
      // console.log(item,"详情");
      let url = null
      let operateSuccess = ''
      let params = {
        no: item.companyNo
      }
      switch (value) {
        case 'disable':
          url = this.GLOBALApi.plantDisable()
          operateSuccess = '禁用成功'
          this.$confirm('确认禁用此造粒公司吗?', '禁用确认')
            .then(() => {
              this.dealBtn(url, params, operateSuccess)
            })
            .catch(error => {
              console.log(error)
            })
          break
        case 'enable':
          url = this.GLOBALApi.plantEnable()
          operateSuccess = '启用成功'
          this.dealBtn(url, params, operateSuccess)
          break
        case 'delate':
          url = this.GLOBALApi.plantDelete()
          operateSuccess = '删除成功'
          this.$confirm('确认删除此造粒公司吗?', '删除确认')
            .then(() => {
              this.dealBtn(url, params, operateSuccess)
            })
            .catch(error => {
              console.log(error)
            })
          break

        default:
          break
      }
    },
    // 删除/禁用
    dealBtn(url, params, operateSuccess) {
      this.$http(url, params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.$message.success(operateSuccess)
            // this.formData.search = null
            // this.formData.status = null
            this.getTableData()
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.tableData = []
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.tableData = []
      this.getTableData()
    },

    // 数据提交
    handleSubmit() {
      this.$refs.companyInfo.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.$confirm('确认修改此造粒公司吗?', '修改确认').then(() => {
              let data = {
                companyNo: this.companyInfo.id,
                name: this.companyInfo.company, //中转仓名称
                linkPersonName: this.companyInfo.leader, //负责人姓名
                linkPersonPhone: this.companyInfo.phone, //联系方式
                address: this.companyInfo.address, // 详细地址
                receiveDeviceNo: this.companyInfo.receivingCamera, //接收设备ID
                produceDeviceNos: this.companyInfo.productionCamera, //生产设备ID
                lon: this.companyInfo.lon, //经度
                lat: this.companyInfo.lat, //纬度
                region: {
                  province: this.companyInfo.province,
                  provinceCode: this.companyInfo.provinceCode,
                  city: this.companyInfo.city,
                  cityCode: this.companyInfo.cityCode,
                  area: this.companyInfo.area,
                  areaCode: this.companyInfo.areaCode,
                  street: this.companyInfo.street,
                  streetCode: this.companyInfo.streetCode
                }, //所在地区
                businessScopes: this.companyInfo.businessScopes //经营范围
              }
              this.$http(this.GLOBALApi.plantEdit(), data)
                .then(res => {
                  if (res.code === 200 && res.data) {
                    this.$message.success('修改成功')
                  } else {
                    this.$message.error(res.msg)
                  }
                  this.dialogVisible = false
                  this.getTableData()
                })
                .catch(error => {
                  this.$message.error(error.msg)
                  this.dialogVisible = false
                  this.getTableData()
                })
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
    // 新增
    addData() {
      // console.log(this.companyInfo,"this.companyInfo");
      let params = {
        name: this.companyInfo.company, //中转仓名称
        linkPersonName: this.companyInfo.leader, //负责人姓名
        linkPersonPhone: this.companyInfo.phone, //联系方式
        address: this.companyInfo.address, // 详细地址
        receiveDeviceNo: this.companyInfo.receivingCamera, //接收设备ID
        produceDeviceNos: this.companyInfo.productionCamera, //生产设备ID
        lon: this.companyInfo.lon, //经度
        lat: this.companyInfo.lat, //纬度
        region: {
          province: this.companyInfo.province,
          provinceCode: this.companyInfo.provinceCode,
          city: this.companyInfo.city,
          cityCode: this.companyInfo.cityCode,
          area: this.companyInfo.area,
          areaCode: this.companyInfo.areaCode,
          street: this.companyInfo.street,
          streetCode: this.companyInfo.streetCode
        }, //所在地区
        businessScopes: this.companyInfo.businessScopes //经营范围
      }
      this.$http(this.GLOBALApi.plantAdd(), params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.$message.success('新增成功')
          } else {
            this.$message.error(res.msg)
          }
          this.dialogVisible = false
          this.getTableData()
        })
        .catch(error => {
          this.$message.error(error.msg)
          this.dialogVisible = false
          this.getTableData()
        })
    },
    // 序号
    getIndex(index) {
      if (this.pageNum) {
        return index + (this.pageNum - 1) * this.pageSize + 1
      } else {
        return index + 1
      }
    }
  },
  computed: {
    title() {
      if (this.isEdit) {
        return '编辑'
      } else if (this.companyInfo.id != null) {
        return '查看'
      } else {
        return '新增'
      }
    },
  }
}
</script>

<style lang="less" scoped>
.pelletizing_page {
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

  .source {
    cursor: pointer;
    display: inline-block;
    border-bottom: solid 1px;
    height: 22px;
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 82, 217, 0.9);
  }
}

// 搜索部分
.search {
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

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

  /deep/ .el-input.el-input--small.el-input--suffix {
    width: 448px;
  }
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

/deep/ .el-pagination.is-background {
  display: flex;
  justify-content: flex-end;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0052d9;
}

.data-total {
  font-size: 14px;
  color: #fff;
}

// 弹窗
.source_dialog_box {
  .first_title {
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #303133;
    line-height: 22px;
  }
}

// 时间线
.time_axis_box {
  margin-bottom: 5px;

  .time_axis_ul {
    display: flex;
    margin-top: 33px;

    .time_axis_li {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.9);
      position: relative;

      .title {
        display: flex;
        align-items: center;

        .title_val {
          margin: 0 12px;
        }

        .line {
          width: 110px;
          height: 2px;
          background: #0052d9;
          border-radius: 0px 0px 0px 0px;
          margin-right: 5px;
        }
      }

      .time {
        margin-left: 36px;
        margin-top: 4px;
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }
}

// 视频列表
.box {
  margin-top: 21px;

  .content {
    margin-top: 16px;

    .name {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #303133;
    }

    .list_ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .list_li {
      margin-top: 8px;
      margin-right: 80px;

      .li {
        width: 136px;
        height: 136px;
        // background: #ECF2FE;
        border-radius: 4px 4px 4px 4px;
        opacity: 1;
        background: url(~@/assets/img/home/videoBg.svg) center center no-repeat;
        cursor: pointer;
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
  }
}

.button-blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
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

// 操作按钮
/deep/ .el-button.el-button--text.el-button--small {
  color: #0052d9;
}

.example {
  color: rgb(160, 155, 155);
}

//个性化表格高度
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
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
</style>
