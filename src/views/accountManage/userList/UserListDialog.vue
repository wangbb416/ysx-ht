<template>
  <div class="userListDialog_page">
    <el-dialog
      :title="editeStatus === 1 ? '新增' : editeStatus === 2 ? '修改' : ''"
      :visible.sync="dialogVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      width="1200px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="20vh"
    >
      <div class="dialog_content">
        <el-form
          :model="userInfo"
          :rules="addValueRules"
          label-width=""
          size="small"
          ref="userInfo"
          :inline="true"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入用户名"
              v-model.trim="userInfo.name"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="20"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" label-width="150px">
            <el-input
              placeholder="请输入手机号"
              v-model.trim="userInfo.phone"
              clearable
              :maxlength="11"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            label="重置密码"
            prop="password"
            v-if="editeStatus == 2"
            label-width="150px"
          >
            <el-input
              v-if="isShowPassWord"
              placeholder="字母,数字,不少于6位"
              v-model.trim="userInfo.password"
              onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
              clearable
              :maxlength="20"
              :minlength="6"
              type="text"
            >
            </el-input>
            <el-input
              v-else
              placeholder="字母,数字,不少于6位"
              v-model.trim="userInfo.password"
      
              clearable
              :maxlength="20"
              :minlength="6"
              type="password"
            >
            </el-input>
            <div v-if="isShowPassWord" class="eye">
              <img
                src="@/assets/img/usually/yeaClose.png"
                alt=""
                @click="dealPassWord"
              />
            </div>
            <div v-else class="eye">
              <img
                src="@/assets/img/usually/yeaOpen.png"
                alt=""
                @click="dealPassWord"
              />
            </div>
          </el-form-item>
        </el-form>
        <div class="content_box">
          <div style="width:700px">
            <el-table
            ref="selectTable"
            :data="roleTableList"
            v-loading="loading"
            border
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            empty-text="暂未设置角色"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="roleName"
              label="组织类型"
               width="120"
              show-overflow-tooltip
            >
             <template slot-scope="scope">
                <div>{{scope.row.organizationName}}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="roleName"
              label="角色名称"
               width="120"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
                <div>{{scope.row.roleName}}</div>
              </template>
             
            </el-table-column>
            <el-table-column prop="company" label="关联组织">
               <template slot-scope="scope">
                <div>{{scope.row.relevanceOrganizationName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="company" label="关联人员">
               <template slot-scope="scope">
                <div>{{scope.row.relevancePeopleName}}</div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="50">
              <template slot-scope="scope">
                <el-button
                  @click="deleteRole(scope.row)"
                  type="text"
                  size="small"
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          </div>
          <div class="creatRole">
            <el-form
              :model="creatRoleInfo"
              :rules="creatRoleValueRules"
              label-width="100px"
              size="small"
              ref="creatRole"
            >
              <el-form-item label="组织类型" prop="formOrganizationId">
                <el-select
                  v-model="creatRoleInfo.formOrganizationId"
                  placeholder="请选择组织类型"
                >
                  <el-option
                    v-for="(item,index) in organizationList"
                    :key="index"
                    :label="item.name"
                    :value="item.deptNo"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色名称" prop="formRoleId">
                <el-select
                  v-model="creatRoleInfo.formRoleId"
                  placeholder="请选择角色名称"
                >
                  <el-option
                    v-for="(item,index) in roleListData"
                    :key="index"
                    :label="item.roleName"
                    :value="item.roleNo"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="multiple && isShowRelevanceSelect">
                <span slot="label"><span style="color: #F56C6C">* </span>关联组织</span>
                <el-select
                  v-model="creatRoleInfo.formMoreSelectVal"
                  placeholder="请选择关联组织"
                  :multiple="true"    
                >
                  <el-option
                    v-for="(item,index) in relevanceListData"
                    :key="index"
                    :label="item.name"
                    :value="item.no"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="!multiple && isShowRelevanceSelect">
                <span slot="label"><span style="color: #F56C6C">* </span>关联人员</span>
                <el-select
                  filterable
                  ref="select"
                  v-model="creatRoleInfo.formOneSelectVal"
                  placeholder="请选择关联人员"
                  :multiple="false"   
                >
                  <el-option
                    v-for="(item,index) in relevanceListData"
                    :key="index"
                    :label="item.dealName"
                    :value="item.no"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item>
                <div class="button_blue" v-fastClick @click="creatRoleBtn">分配角色</div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <span slot="footer">
        <div class="search-bt">
          <div class="button-blue" v-fastClick @click="handleSubmit">提交</div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
var checkPassWord = (rule, value, callback) => {
  let str = value+''
  if (str.length<6) {
    callback(new Error('字母,数字,不少于6位'));
  } else {
    let reg = /^[0-9a-zA-Z]+$/
    if (!reg.test(value) && value != '') {
        callback(new Error('字母,数字,不少于6位'));
    } else {
        callback();
    }
  }
  
};
import {cheackMobile} from "@/utils/validate";
import {organizationData,xlData,zzcData,ywData} from "./userConfig.js"
export default {
  name: "UserDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    //1新增,2编辑
    editeStatus: {
      type: Number,
      require: true,
    },
    userId: {
      type: [String, Number],
      require: true,
      default:""
    }
  },
  watch: {
    dialogVisible(n){
      if(n && this.editeStatus == 2){
        this.getDetail()
        this.getDeptList()
      }
      if (n && this.editeStatus == 1) {
        this.roleTableList = []
        this.InitFormUser()
        this.InitFormRole()
      }
    },
    // 监听组织
    "creatRoleInfo.formOrganizationId": {
      handler(newVal) {
        this.$nextTick(()=>{
          this.roleListData = []
          this.relevanceListData = []
          this.creatRoleInfo.formRoleId = null
          this.creatRoleInfo.formMoreSelectVal = [];
          this.creatRoleInfo.formOneSelectVal = []
        })
        
        if (!newVal) {
          return;
        } else {
          this.$refs.creatRole.clearValidate();
          //若运输公司7,就单选
          if (newVal == this.transportCompanyId) {
            this.multiple = false
          } else {
            this.multiple = true
          }

          // 如果是运营平台,就不显示关联那一栏
          if (newVal == this.operationId) {
            this.isShowRelevanceSelect = false
          } else {
            this.isShowRelevanceSelect = true
          }

          // 角色列表 根据组织改变
          this.organizationList.map(item=>{
            if (item.deptNo == this.creatRoleInfo.formOrganizationId) {
              // console.log("匹配",item)
              this.$nextTick(()=>{
                this.roleListData = item.roleBizResList
              })
            }
          })
        }
      }
    },
    // 监听角色
    "creatRoleInfo.formRoleId": {
      handler(newVal){
        // console.log("newVal",newVal);
        this.$nextTick(()=>{
          this.relevanceListData = []
          this.creatRoleInfo.formMoreSelectVal = [];
          this.creatRoleInfo.formOneSelectVal = []
        })
        if(newVal){
          // 找到角色对象下的关联列表
          this.roleListData.map(item=>{
            if (item.roleNo == newVal) {
              this.$nextTick(()=>{
                  //若 运输公司7
                  if (this.creatRoleInfo.formOrganizationId == this.transportCompanyId) {
                    item.organList.map(roleItem=>{
                      // 姓名,身份证号拼接
                      let obj = {
                        dealName:roleItem.workerName+'-'+roleItem.workerIdNumber,
                        no:roleItem.no,
                        ...roleItem
                      }
                      this.relevanceListData.push(obj)
                    })
                    // console.log("公司",this.relevanceListData);
                  }else{
                      this.relevanceListData = item.organList
                  }
              })
            }
          })          
        }
        
      }
    }
  },
  data() {
    return {
      bulueHouseId:"1598189503825174529",//小蓝之家
      transportCompanyId:"1598191426703745026",//运输公司
      operationId:"1598191508589236226",//平台运营

      cheackMobile,
      multiple:true,//关联组织/人员 是否多选
      isShowRelevanceSelect:true,//关联组织/人员 是否显示

      roleListData:[],//角色列表
      relevanceListData:[],//关联组织/人员list
      creatRoleInfo: {
        formOrganizationId:null,
        formRoleId: null,
        formMoreSelectVal: [],
        formOneSelectVal: [],
      },

      loading: false,
      isShowPassWord: true,
      userInfo: {
        id: null,
        name: "",
        phone: "",
        password: "",
      },
      
      roleTableList: [],//table表格数据
      
      addValueRules: {
        name: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        phone: [{ required: true, message: "请填写正确的手机号", trigger: "blur",validator:cheackMobile}],
        password: [{required: false, message: "字母,数字,不少于6位", trigger: "blur",validator: checkPassWord}],
      },
      creatRoleValueRules: {
        formOrganizationId: [
          { required: true, message: "请选择组织类型", trigger: "blur" },
        ],
        formRoleId: [
          { required: true, message: "请选择角色名称", trigger: "blur" },
        ],
      },

      organizationList:[]
    };
  },

  methods: {
    // 组织列表
    getDeptList() {
      this.organizationList = []
      this.$http(this.GLOBALApi.getRoleCompanyList())
          .then((res) => {
            if (res.code === 200 && res.data) {
              let records = res.data || [];
              records.map((item, index) => {
                this.organizationList.push({
                  ...item
                });
              });
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    // 组织change
    deptChange(){
      this.roleListData = []
      this.organizationList.map(item=>{
        if (item.deptNo == this.creatRoleInfo.formOrganizationId) {
          //  console.log("匹配",item)
          this.$nextTick(()=>{
            this.roleListData = item.roleBizResList
          })
        }
      })
    },
    InitFormUser(){
      this.userInfo.id = null
      this.userInfo.name = ''
      this.userInfo.phone = ''
      this.userInfo.password = ''
      setTimeout(() => {
        this.$refs.userInfo.clearValidate();
      }, 10);
    },
    InitFormRole(){
      this.creatRoleInfo.formOrganizationId = null
      this.creatRoleInfo.formRoleId = null
      this.creatRoleInfo.formMoreSelectVal = []
      this.creatRoleInfo.formOneSelectVal = []
      setTimeout(() => {
        this.$refs.creatRole.clearValidate();
      }, 10);
      this.getDeptList()
    },

    // 查看详情
    getDetail() {
      this.$http(this.GLOBALApi.userGetById(),{no:this.userId})
          .then((res) => {
            if (res.code === 200 && res.data) {
              let data = res.data
              this.$nextTick(() => {
                this.userInfo.id = data.userNo
                this.userInfo.name = data.realName
                this.userInfo.phone = data.loginName
                this.userInfo.password = data.password
                this.roleTableList = []

                // 组织类型
                if (data.roleDeptBizList && data.roleDeptBizList.length>0) {
                  // 组织遍历
                  data.roleDeptBizList.forEach(deptItem=>{
                    if (deptItem.roleBizResList && deptItem.roleBizResList.length>0) {
                      // 角色遍历
                      deptItem.roleBizResList.map(roleItem=>{ 
                        let role = {
                          companyList:[],
                          organizationId:deptItem.deptNo,//组织
                          organizationName:deptItem.name,
                          roleId:roleItem.roleNo || '',//角色
                          roleName:roleItem.roleName || '',
                          relevanceOrganizationName:"",
                          relevancePeopleName:""
                        }

                        // 处理关联组织和人员的回显
                        let relevanceOrganizationName = []
                        let relevancePeopleName = []
                        
                        // console.log("roleItem",roleItem);
                        if (roleItem.organList && roleItem.organList.length>0) {
                          // 关联组织
                          roleItem.organList.map(organItem=>{
                            if(organItem.workerName && organItem.workerName.length>0){
                              relevancePeopleName.push(organItem.workerName)//关联人员
                            }
                            role.companyList.push({no:organItem.no})//关联组织的id
                            relevanceOrganizationName.push(organItem.name)//关联组织
                            role.relevanceOrganizationName = relevanceOrganizationName.join(",")
                            role.relevancePeopleName = relevancePeopleName.join(",")
                            
                          })
                        }
                        this.roleTableList.push(role)
                      })
                      
                    }
                  })
                }
                //  console.log(this.roleTableList,"-----------------");
              })
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    creatRoleBtn() {
      this.$refs.creatRole.validate((valid,error) => {
        if (valid) {
          // 校验 关联组织/人员
          let ready = this.checkSelect()
          // console.log("校验----",(this.creatRoleInfo.formOneSelectVal+'').length);
          // console.log(JSON.stringify(this.creatRoleInfo),"creatRoleInfo");

          if (!ready) return;

          // 默认未创建该角色
          let flag = false

          if (this.roleTableList && this.roleTableList.length>0) {
            this.roleTableList.forEach(item=>{
              if (item.roleId == this.creatRoleInfo.formRoleId) {//说明已存在
                flag = true
                return
              }
            })
          }

          if (!flag) {
            let companyList = []

             // 如果是小蓝之家2或运输公司7,则需要回显关联组织
            let isCompany = false

            // 如果是运输公司,则单选
            if(this.creatRoleInfo.formOrganizationId==this.transportCompanyId){
                isCompany = true
                companyList.push({no:this.creatRoleInfo.formOneSelectVal})
            }else{
                this.creatRoleInfo.formMoreSelectVal.map(item=>{
                  companyList.push({
                    no:item
                  })
                })
                // companyList = [...this.creatRoleInfo.formMoreSelectVal]
            }
            
            let obj = {
              // 存id
              organizationId:this.creatRoleInfo.formOrganizationId,
              roleId:this.creatRoleInfo.formRoleId,
              companyList:companyList,
              // 处理名称显示
              organizationName:this.findOrganizationName(this.organizationList,this.creatRoleInfo.formOrganizationId),
              roleName:this.findRoleName(this.roleListData,this.creatRoleInfo.formRoleId),
              relevanceOrganizationName:this.findRelevanceOrganizationName(this.relevanceListData,companyList,isCompany),
              relevancePeopleName:this.findRelevancePeopleName(this.relevanceListData,companyList,isCompany),
            }
            this.$nextTick(()=>{
              this.roleTableList.push(obj)
            })
            this.$message.success('添加成功')
            // console.log(this.roleTableList,"角色");
            this.InitFormRole()
          } else {
            this.$message.warning('此角色已存在,请删除后重试');
            this.InitFormRole()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    
    // 数据提交
    handleSubmit() {
      //  console.log(this.roleTableList,"list");
      
      // return
      // 移除对创建角色的校验
      this.$refs.creatRole.clearValidate();

      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          let roleDeptBizList = []
          this.roleTableList.map(item=>{
            let obj = {
              deptNo:item.organizationId,//组织id
              roleBizResList:[]
            }
            obj['roleBizResList'].push({
              roleNo:item.roleId,//角色id
              organList:item.companyList//关联组织
            })

            roleDeptBizList.push(obj)
          })
          console.log("处理好的数据",roleDeptBizList);
          if (this.editeStatus == 2) {
            this.$confirm("确认修改此用户吗?", "修改确认").then(() => {
              console.log("---------------------------------");
               let params = {
                no: this.userInfo.id,
                name: this.userInfo.name,
                mobile: this.userInfo.phone,
                // password: this.userInfo.password,
                password: this.userInfo.password?md5(this.userInfo.password):'',
                roleDeptBizList: roleDeptBizList,
              };
              // console.log(params,"参数");
              this.$http(this.GLOBALApi.userEdit(), params)
                .then((res) => {
                  if (res.code === 200 && res.data) {
                    this.$message.success("修改成功");
                   this.handleClose()
                  } else {
                    this.$message.error(res.msg);
                  }
                })
                .catch((error) => {
                  this.$message.error(error.msg);
                });
            });
          }else{
            this.addDataFun(roleDeptBizList)
          }
        } else {
          console.log("校验不通过");
          return false;
        }
      });
    },
    // 新增
    addDataFun(roleDeptBizList) {
      let params = {
        name: this.userInfo.name,
        mobile: this.userInfo.phone,
        roleDeptBizList: roleDeptBizList,
      };
      // console.log(params,"参数");
      this.$http(this.GLOBALApi.userAdd(), params)
        .then((res) => {
          if (res.code === 200 && res.data) {
            this.$message.success("新增成功");
           this.handleClose()
          } else {
            this.$message.error(res.msg);
          }  
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },

    // 处理密码
    dealPassWord() {
      this.isShowPassWord = !this.isShowPassWord;
    },
    deleteRole(item) {
      this.$confirm("确认删除此角色吗?", "删除确认")
        .then(() => {
          if (item && item.roleId) {
            this.roleTableList.forEach((ele,index)=>{
              if (ele.roleId == item.roleId) {
                this.roleTableList.splice(index,1);
              }
            })
          }else{
            this.$message.error('此角色不存在')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 组织名
    findOrganizationName(parent,sonId){
      let name = ''
      if (parent && parent.length>0) {
        parent.map(item=>{
          if(item.deptNo == sonId){
            name = item.name
          }
        })
      }
      return name
    },
    // 角色名
    findRoleName(parent,sonId){
      let name = ''
      if (parent && parent.length>0) {
        parent.map(item=>{
          if(item.roleNo == sonId){
            name = item.roleName
          }
        })
      }
      return name
    },

    // 关联组织
    findRelevanceOrganizationName(parent,companyList,isCompany){
      console.log("关联组织---",parent,companyList);
      // 正常的关联组织
      if (!isCompany) {
        if (parent && parent.length>0) {
          let name = []
          parent.map(item=>{
            companyList.map(companyItem=>{
              if(item.no == companyItem.no){
                name.push(item.name)
              }
            })
            
          })
          return name.join(",")
        }
        
      }else{
        if (parent && parent.length>0) {
          let name = []
          parent.map(item=>{
            companyList.map(companyItem=>{
              if(item.no == companyItem.no && item.name.length>0){
                name.push(item.name)
              }
            })
          })
          return name.join(",")
        }
        
      }
    },
    // 关联人员名称
    findRelevancePeopleName(parent,companyList,isCompany){
      if (!isCompany) {
        return ''
      }else{
        if (parent && parent.length>0) {
          let name = []
          parent.map(item=>{
            companyList.map(companyItem=>{
              if(item.no == companyItem.no && item.workerName.length>0){
                name.push(item.workerName)
              }
            })
          })
          return name.join(",")
        }
      }
    },
    // 校验
    checkSelect(){
      // console.log("校验",this.creatRoleInfo);
      // console.log("校验",this.creatRoleInfo.formOneSelectVal);
      if (this.multiple && this.isShowRelevanceSelect && this.creatRoleInfo.formMoreSelectVal.length<1) {
        this.$message.error("请选择关联组织")
        return false;
      }
      
      if (!this.multiple && this.isShowRelevanceSelect && (this.creatRoleInfo.formOneSelectVal+'').length<1) {
        this.$message.error("请选择关联人员")
        return false;
      }
      return true;
    },
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
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
.button-blue {
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
}

.button-blue:hover {
  background-color: #66b1ff;
  border: solid 1px #66b1ff;
}
.button_blue {
  margin-left: 20px;
  background-color: #0052d9;
  border: solid 1px #0052d9;
  color: #fff;
  width: 70px;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
}
.dialog_content {
  .content_box{
    display:flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
  }
  .creatRole {
    padding-top: 30px;
    min-height: 150px;
    width: 350px;
    border: solid rgb(235, 229, 229) 1px;
    margin-right: 50px;
  }
  /deep/ .el-select.el-select--small {
    width: 220px;
    .el-input.el-input--small.el-input--suffix {
      width: 220px !important;
    }
  }

  /deep/ .el-input.el-input--small.el-input--suffix {
    width: 220px !important;
  }
  /deep/ .el-range-editor--small.el-input__inner {
    width: 220px;
  }
}
.eye {
  display: inline-block;
  width: 22px;
  height: 22px;
  img {
    width: 100%;
    position: relative;
    top: 5px;
    cursor: pointer;
    left: 10px;
  }
}
</style>