<!-- 中转仓-中转仓管理 -->
<template>
  <div class="transferManage_page" id="transferManage_page">
    <Breadcrumb :breadData="breadData"></Breadcrumb>

    <div class="main">
      <div class="search" id="search">
        <div class="search-input">
          <el-form :inline="true" size="small">
            <el-form-item label="">
              <el-input
                placeholder="请输入中转仓名称查找"
                v-model.trim="formData.companyName"
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
          <div class="button-blue" @click="handleOpenDialog('add')" v-if="MenuBtnValid('/transferManage','新增')">新增</div>
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
          label="中转仓名称"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column
          prop="linkPersonName"
          label="负责人"
          show-overflow-tooltip
          width="120"
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
          prop="gps"
          label="GPS"
          show-overflow-tooltip
          width=""
        ></el-table-column>
        <el-table-column prop="statusMsg" label="状态" width="100">
          <template slot-scope="scope">
            <div :style="{ color: scope.row.status == 0 ? 'green' : 'red' }">
              {{ scope.row.statusMsg }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click="handleOpenDialog('edit', scope.row)"
              type="text"
              size="small"
             v-if="MenuBtnValid('/transferManage','编辑')"
            >
              编辑
            </el-button>
            <el-button
              v-if="scope.row.status == 0 && MenuBtnValid('/transferManage','启用/禁用')"
              @click="handleOperateDialog('disable', scope.row)"
              type="text"
              size="small"
            >
              禁用
            </el-button>
            <el-button
              v-if="scope.row.status != 0 && MenuBtnValid('/transferManage','启用/禁用')"
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
              v-if="MenuBtnValid('/transferManage','删除')"
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
          :model="addData"
          :rules="addValueRules"
          label-width="120px"
          label-position="left"
          size="small"
          ref="addData"
          inline
        >
          <el-form-item label="中转仓名称" prop="name">
            <el-input
              placeholder="请输入中转仓名称"
              v-model.trim="addData.name"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>

          <el-form-item label="负责人" prop="linkPersonName" class="right_item">
            <el-input
              placeholder="请输入负责人"
              v-model.trim="addData.linkPersonName"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="20"
            ></el-input>
          </el-form-item>

          <el-form-item label="联系方式" prop="linkPersonPhone">
            <el-input
              :maxlength="11"
              placeholder="请输入联系方式"
              v-model.trim="addData.linkPersonPhone"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="city_select" prop="street">
            <span slot="label">
              <span style="color: red">*</span>
              所在地区
            </span>
            <el-select
              v-model="addData.province"
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
            <el-select v-model="addData.city" @change="changeAddressCity">
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select v-model="addData.area" @change="changeAddressArea">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            -
            <el-select v-model="addData.street" @change="changeAddressStreet">
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
              v-model.trim="addData.address"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="经度" prop="lon">
            <el-input
              placeholder="请输入经度"
              v-model.trim="addData.lon"
              clearable
              :maxlength="20"
              onkeyup="value=value.replace(/[^\d^\.]+/g,'')"
            ></el-input>
            <!-- <span class="example">(例:116.20)</span> -->
          </el-form-item>
          <el-form-item label="纬度" prop="lat" class="right_item">
            <el-input
              placeholder="请输入纬度"
              v-model.trim="addData.lat"
              clearable
              :maxlength="20"
              onkeyup="value=value.replace(/[^\d^\.]+/g,'')"
            ></el-input>
            <!-- <span class="example">(例:39.56)</span> -->
          </el-form-item>
          <el-form-item class="long_input" prop="businessScopes">
            <span slot="label">
              <span style="color: red">*</span>
              经营范围
            </span>
            <div @click="handleSubmitTreeOpen" style="cursor: pointer">
              <el-input
                placeholder="请选择经营范围"
                v-model.trim="addData.businessScopesStr"
                onkeyup="this.value=this.value.replace(/[, ]/g,'')"
                clearable
                readonly
                :maxlength="50"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="接收摄像头" prop="receivingCamera">
            <el-select
              v-model="addData.receivingCamera"
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
            <div class="d">说明：该摄像头用于录制出入库</div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" v-if="isEdit || addData.id == null">
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
import region from "@/utils/region.json"
import {
  decimalCheck,
  lonCheck,
  latCheck,
  cheackMobile
} from '@/utils/validate'
export default {
  name: 'transferManage',
  data() {
    return {
      decimalCheck,
      lonCheck,
      latCheck,
      cheackMobile,
      tabelHeigth: 420,
      breadData: [{name: "中转管理", path: ""}, {name: "中转仓管理"}],
      formData: {
        companyName: null,
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
      addData: {
        id: null,
        name: '',
        linkPersonName: '',
        linkPersonPhone: '',
        lon: '',
        lat: '',
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
        receivingCamera: ''
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
        name: [
          { required: true, message: '请填写中转仓名称', trigger: 'blur' }
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
        linkPersonName: [
          { required: true, message: '请填写负责人', trigger: 'blur' }
        ],
        linkPersonPhone: [
          {
            required: true,
            message: '请填写正确的联系方式',
            trigger: 'blur',
            validator: cheackMobile
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
              // console.log("vale*----",value);
              if (value) {
                callback()
              } else {
                callback(new Error(`请选择摄像头`))
              }
            },
            trigger: ['change']
          }
        ],
        lon: [
          {
            required: true,
            message: '请填写正确格式的经度',
            trigger: 'blur',
            validator: lonCheck
          }
        ],
        lat: [
          {
            required: true,
            message: '请填写正确格式的纬度',
            trigger: 'blur',
            validator: latCheck
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
        document.querySelector('#transferManage_page').offsetHeight -
        257 -
        document.querySelector('#search').offsetHeight
    })
    window.onresize = () => {
      if (
        document.querySelector('#transferManage_page') &&
        document.querySelector('#transferManage_page').offsetHeight &&
        document.querySelector('#search') &&
        document.querySelector('#search').offsetHeight
      ) {
        self.tabelHeigth =
          document.querySelector('#transferManage_page').offsetHeight -
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
      let params = {
        provinceId: '',
        level: 1
      }
      if (!this.allAddressData.length) {
        // 重新获取市级数据
        this.getAddressData(params, data => {
          if (data) {
            this.allAddressData = data
            if (this.addData.businessScopes.length) {
              this.setCheckedKeysAction()
            }
          } else {
            this.allAddressData = []
          }
        })
      }
      this.dialogVisible2 = true
    },
    setCheckedKeysAction() {
      let startList = JSON.parse(JSON.stringify(this.addData.businessScopes))
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
      this.$refs.businessScopesTree.setCheckedKeys(endList)
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
            console.log("755------",halfList);
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
      this.addData.businessScopes = returnList
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
      this.addData.businessScopesStr = businessScopesStr
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
    getAddressData(params, callback) {
      // this.$http(this.GLOBALApi.getRegion(), params)
      //   .then(res => {
      //     console.log('xxx', res)
      //     callback(res)
      //     console.log('xxx', res)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //     this.$message.error(error.msg)
      //   })
      if (region && region.length>0) {
        let arr = []
        switch (params.level) {
          case 1:
            callback(region)
            break;
          case 4:
            region.map(item=>{
              if(item.id == params.provinceId){
                arr = item
              }
            })
            callback(arr)
            break;
          default:
            break;
        }
      }else{
        this.$message.error("获取地区数据失败")
      }
    },
    changeAddress(leave, itemData) {
      switch (leave) {
        case 1:
          this.addData.province = itemData.name
          this.addData.provinceCode = itemData.id
          this.addData.city = ''
          this.addData.cityCode = ''
          this.cityOptions = []
          this.addData.area = ''
          this.addData.areaCode = ''
          this.areaOptions = []
          this.addData.street = ''
          this.addData.streetCode = ''
          this.streetOptions = []
          let params = {
            provinceId: itemData.id,
            level: 4
          }
          // 重新获取市级数据
          this.getAddressData(params, data => {
            if (data) {
              this.casData = data.children
              this.cityOptions = this.casData.map(item => {
                return {
                  id: item.id,
                  name: item.name
                }
              })
            } else {
              this.casData = []
            }
          })
          break
        case 2:
          this.addData.city = itemData.name
          this.addData.cityCode = itemData.id
          this.addData.area = ''
          this.addData.areaCode = ''
          this.areaOptions = []
          this.addData.street = ''
          this.addData.streetCode = ''
          this.streetOptions = []
          // 重新获取区级数据
          this.areaOptions = this.casData
            .find(item => {
              return item.id == itemData.id
            })
            .children.map(item => {
              return {
                id: item.id,
                name: item.name
              }
            })
          break
        case 3:
          this.addData.area = itemData.name
          this.addData.areaCode = itemData.id
          this.addData.street = ''
          this.addData.streetCode = ''
          this.streetOptions = []
          // 重新获取街道级数据
          this.streetOptions = this.casData
            .find(item => {
              return item.id == this.addData.cityCode
            })
            .children.find(item => {
              return item.id == itemData.id
            })
            .children.map(item => {
              return {
                id: item.id,
                name: item.name
              }
            })
          break
        case 4:
          this.addData.street = itemData.name
          this.addData.streetCode = itemData.id
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
    // 新增
    addDataFun() {
      // console.log(this.addData,"this.addData");
      let params = {
        name: this.addData.name,
        linkPersonName: this.addData.linkPersonName,
        linkPersonPhone: this.addData.linkPersonPhone,
        address: this.addData.address,
        lon: this.addData.lon,
        lat: this.addData.lat,
        region: {
          province: this.addData.province,
          provinceCode: this.addData.provinceCode,
          city: this.addData.city,
          cityCode: this.addData.cityCode,
          area: this.addData.area,
          areaCode: this.addData.areaCode,
          street: this.addData.street,
          streetCode: this.addData.streetCode
        }, //所在地区
        businessScopes: this.addData.businessScopes, //经营范围
        deviceNo: this.addData.receivingCamera
      }
      this.$http(this.GLOBALApi.warehouseAdd(), params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.$message.success('新增成功')
            this.dialogVisible = false
            this.getTableData()
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
        name: this.formData.companyName,
        status: this.formData.status
      }
      this.tableData = []
      this.$http(this.GLOBALApi.warehouseGetByPage(), params)
        .then(res => {
          if (res.code === 200 && res.data) {
            this.loading = false

            this.total = res.data.total || 0
            let records = res.data.records || []
            records.map((item, index) => {
              this.tableData.push({
                name: item.name, //入库单id
                linkPersonName: item.linkPersonName,
                linkPersonPhone: item.linkPersonPhone,
                address: item.address,
                lon: item.lon,
                lat: item.lat,
                regionStr: item.regionStr,
                // gps:"经度:"+item.lon+"经度:"+item.lat,
                gps: item.lonLat,
                status: item.status,
                statusMsg: item.statusMsg,
                id: item.id,
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
    // 查看详情
    getDetail(item) {
      this.$http(this.GLOBALApi.warehouseDetail(), { no: item.companyNo })
        .then(res => {
          if (res.code === 200 && res.data) {
            let data = res.data
            this.$nextTick(() => {
              let item = this.productionCameraOption.find(item => {
                return item.deviceCode == data.deviceCode
              })
              let receivingCamera = ''
              if (item) {
                receivingCamera = item.deviceNo
              }
              this.addData = {
                id: data.companyNo,
                name: data.name,
                linkPersonName: data.linkPersonName,
                linkPersonPhone: data.linkPersonPhone,
                address: data.address,
                province: data.region ? data.region.province : '',
                provinceCode: data.region ? data.region.provinceCode : '',
                city: data.region ? data.region.city : '',
                cityCode: data.region ? data.region.cityCode : '',
                area: data.region ? data.region.area : '',
                areaCode: data.region ? data.region.areaCode : '',
                street: data.region ? data.region.street : '',
                streetCode: data.region ? data.region.streetCode : '',
                businessScopes: data.businessScopes || [],
                lon: data.lon || '',
                lat: data.lat || '',
                receivingCamera: receivingCamera
              }
              let businessScopesStr = ''
              this.addData.businessScopes.forEach((item, index) => {
                if (index == this.addData.businessScopes.length - 1) {
                  businessScopesStr += `${item.province || ''}${
                    item.city || ''
                  }${item.area || ''}${item.street || ''}`
                } else {
                  businessScopesStr += `${item.province || ''}${
                    item.city || ''
                  }${item.area || ''}${item.street || ''}、`
                }
              })
              this.addData.businessScopesStr = businessScopesStr
              if (this.addData.provinceCode) {
                let params = {
                  provinceId: this.addData.provinceCode,
                  level: 4
                }
                this.getAddressData(params, data => {
                  if (data.length) {
                    this.casData = data[0].children
                    this.cityOptions = this.casData.map(item => {
                      return {
                        id: item.id,
                        name: item.name
                      }
                    })
                    this.areaOptions = this.casData
                      .find(item => {
                        return item.id == this.addData.cityCode
                      })
                      .children.map(item => {
                        return {
                          id: item.id,
                          name: item.name
                        }
                      })
                    this.streetOptions = this.casData
                      .find(item => {
                        return item.id == this.addData.cityCode
                      })
                      .children.find(item => {
                        return item.id == this.addData.areaCode
                      })
                      .children.map(item => {
                        return {
                          id: item.id,
                          name: item.name
                        }
                      })
                  } else {
                    this.casData = []
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
    // 关闭弹窗
    closeDialogVisible() {
      this.$nextTick(() => {
        for (let key of Object.keys(this.addData)) {
          this.addData[key] = ''
        }
        this.addData.id = null
        this.addData.businessScopes = []
        this.cityOptions = []
        this.areaOptions = []
        this.streetOptions = []
        this.casData = []
      })
      this.$refs.addData.resetFields()
    },
    // 判断是新建或修改
    handleOpenDialog(type, val) {
      console.log(this.isEdit, this.addData.id)
      if (!this.productionCameraOption.length) {
        this.getDevice()
      }
      if (!this.provinceOptions.length) {
        let params = {
          provinceId: '',
          level: 1
        }
        this.getAddressData(params, data => {
          if (data && data.length) {
            this.provinceOptions = data.map(item => {
              return {
                id: item.id,
                name: item.name
              }
            })
          }
        })
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
    handleOperateDialog(value, item) {
      // console.log("----------",item);
      let url = null
      let operateSuccess = ''
      let params = {
        no: item.companyNo
      }
      switch (value) {
        case 'disable':
          url = this.GLOBALApi.warehouseDisable()
          operateSuccess = '禁用成功'
          this.$confirm('确认禁用此中转仓吗?', '禁用确认')
            .then(() => {
              this.dealBtn(url, params, operateSuccess)
            })
            .catch(error => {
              console.log(error)
            })
          break
        case 'enable':
          url = this.GLOBALApi.warehouseEnable()
          operateSuccess = '启用成功'
          this.dealBtn(url, params, operateSuccess)
          break
        case 'delate':
          url = this.GLOBALApi.warehouseDelete()
          operateSuccess = '删除成功'
          this.$confirm('确认删除此中转仓吗?', '删除确认')
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
            // this.formData.status = null
            // this.formData.companyName = null
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
      this.$refs.addData.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.$confirm('确认修改此中转仓吗?', '修改确认').then(() => {
              let data = {
                name: this.addData.name,
                linkPersonName: this.addData.linkPersonName,
                linkPersonPhone: this.addData.linkPersonPhone,
                address: this.addData.address,
                lon: this.addData.lon,
                lat: this.addData.lat,
                companyNo: this.addData.id,
                region: {
                  province: this.addData.province,
                  provinceCode: this.addData.provinceCode,
                  city: this.addData.city,
                  cityCode: this.addData.cityCode,
                  area: this.addData.area,
                  areaCode: this.addData.areaCode,
                  street: this.addData.street,
                  streetCode: this.addData.streetCode
                }, //所在地区
                businessScopes: this.addData.businessScopes, //经营范围
                deviceNo: this.addData.receivingCamera
              }
              this.$http(this.GLOBALApi.warehouseEdit(), data)
                .then(res => {
                  if (res.code === 200 && res.data) {
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                    this.getTableData()
                  } else {
                    this.$message.error(res.msg)
                  }
                 
                })
                .catch(error => {
                  this.$message.error(error.msg)
                })
            })
          } else {
            this.addDataFun()
          }
        } else {
          console.log('error submit!!')
          return false
        }
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
      } else if (this.addData.id != null) {
        return '查看'
      } else {
        return '新增'
      }
    },
    
  }
}
</script>

<style lang="less" scoped>
.transferManage_page {
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
