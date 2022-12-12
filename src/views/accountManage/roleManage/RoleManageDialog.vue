<template>
  <div class="roleManageDialog_page">
    <el-dialog
      :title="editeStatus === 1 ? '新增' : editeStatus === 2 ? '修改' : ''"
      :visible.sync="dialogVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      width="1200px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="5vh"
      :destroy-on-close="true"
    >
      <div class="dialog_content">
        <el-form
          :model="userInfo"
          :rules="addValueRules"
          label-width="100px"
          label-position="left"
          size="small"
          ref="userInfo"
          :inline="false"
        >
          <el-form-item label="组织类型" prop="organizingType" style="margin-right:50px">
            <el-select @change="organizingTypeChange" v-model="userInfo.organizingType" placeholder="请选择" :disabled="editeStatus == 2">
              <el-option
                  v-for="item in deptList"
                  :key="item.deptNo"
                  :label="item.name"
                  :value="item.deptNo"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色名称" prop="name">
            <el-input
              placeholder="请输入"
              v-model.trim="userInfo.name"
              onkeyup="this.value=this.value.replace(/[, ]/g,'')"
              clearable
              :maxlength="20"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div class="content_box">
            <div class="content_title">功能权限</div>
            <div class="content_list">
                <div v-for="(item,index) in content_list" :key="item.id" :class="['content_li',selectTab==item.id?'selectTab':'']" @click="selectTabHandle(item,index)">{{item.name}}</div>
            </div>
        </div>
        <div class="permission_box">
          <Tree1 v-show="selectTab==1"></Tree1>
          <Tree2 v-show="selectTab==2" :organizingType="userInfo.organizingType"></Tree2>
          <Tree3 v-show="selectTab==3"></Tree3>
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
import Tree1 from "./cpns/tree1.vue"
import Tree2 from "./cpns/tree2.vue"
import Tree3 from "./cpns/tree3.vue"
export default {
  name: "roleManageDialog",
  components:{
    Tree1,
    Tree2,
    Tree3
  },
  props: {
    dialogVisible: {
      type: Boolean,
      require: false,
    },
    //1新增,2编辑
    editeStatus: {
      type: Number,
      require: true,
    },
    // 当前编辑的角色数据
    roleVal: {
      type: [Object],
      require: true,
    },
    // 组织类型数据
    deptList: {
      type: Array,
      require: true,
    },
  },
  watch: {
    dialogVisible:{
      handler(n){
        if (n) {
          // 编辑
          if(this.editeStatus == 2){
            this.userInfo.organizingType = this.roleVal["deptNo"]
            this.userInfo.name = this.roleVal["roleName"]
          }
          // 新增
          if (this.editeStatus == 1) {
            this.init()
          }

          if (this.deptList && this.deptList.length>0) {
            this.getTreeData()
          }
        }
      },
      // deep:true,
      // immediate:false
    },
  },
  data() {
    return {
      selectTab:1,//tab
      content_list:[
        {id:1, name:"后台管理"},
        {id:2, name:"小程序"},
        {id:3, name:"驾驶舱"},
      ],

      userInfo: {
        organizingType: '',//组织类型
        name: "",//角色名称
      },
      addValueRules: {
        organizingType: [{ required: true, message: "请选择组织类型", trigger: "change" }],
        name: [{ required: true, message: "请填写角色名称", trigger: "blur" }],
      },

      pcTreeData:[],//pc端的原始树形数据
      res_pcBtn:[],//用户选择后的按钮
      res_pcMenu:[],//用户选择后的菜单

      appletTreeData:[],//小程序端的原始树形数据
      res_appletBtn:[],//用户选择后的按钮
      res_appletMenu:[],//用户选择后的菜单

      jscTreeData:[],
      res_jscBtn:[],
      res_jscMenu:[],

    };
  },
  mounted(){
    this.$bus.on("res_pcTreeData",(menuList,btnList)=>{
      this.res_pcMenu = menuList
      this.res_pcBtn = btnList
    })
    this.$bus.on("res_appletTreeData",(menuList,btnList)=>{
      this.res_appletMenu = menuList
      this.res_appletBtn = btnList
    })
    this.$bus.on("res_jscTreeData",(menuList,btnList)=>{
      this.res_appletMenu = menuList
      this.res_appletBtn = btnList
    })
  },

  methods: {
    init(){
      this.userInfo.name = ''
      this.selectTab = this.content_list[0].id,
      this.userInfo.organizingType = this.deptList[0]["deptNo"]
      setTimeout(() => {
        this.$refs.userInfo.clearValidate();
      }, 100);
    },

    // 获取菜单路由列表
    getTreeData() {
      let params = {}
      if(this.editeStatus == 2){
        params = {
          deptNo:this.roleVal.deptNo,
          roleNo:this.roleVal.roleNo
        }
      }else{
        params = {
          deptNo:this.userInfo.organizingType//组织类型编号
        };
      }
      
      this.pcTreeData = []
      this.appletTreeData = []
      this.jscTreeData = []
      this.$http(this.GLOBALApi.menuList(), params)
          .then((res) => {
            if (res.code === 200 && res.data) {
              if (res.data.length>0) {
                res.data.map(item=>{
                  if (item.systemType == 1) {
                    this.pcTreeData = item.menuTreeList || []
                  }
                  if (item.systemType == 2) {
                    this.appletTreeData = item.menuTreeList || []
                  }
                  if (item.systemType == 3) {
                    this.appletTreeData = item.menuTreeList || []
                  }
                })
                this.$bus.$emit("pcParams", this.pcTreeData,this.getCheckBtnData( this.pcTreeData),this.getCheckMenuData( this.pcTreeData))
                this.$bus.$emit("appletParams",this.appletTreeData,this.getCheckBtnData(this.appletTreeData),this.getCheckMenuData(this.appletTreeData))
                this.$bus.$emit("jscParams",this.jscTreeData,this.getCheckBtnData(this.jscTreeData),this.getCheckMenuData(this.jscTreeData))
              } else {
                this.$message.warning("该组织类型权限为空");
              }
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },

    // 根据路由数组,获取所有勾选菜单
    getCheckMenuData(routerData){
      let result = []
      let that = this
      // console.log("1");
      dealEvery(routerData)
      function dealEvery(data){
        data.map((item,index)=>{
          // 如果一级状态为0,并且他的所有二级状态也为0
          if (item.status != 1) {
            if (item.children && item.children.length>0) {

                //若 勾选的二级菜单数组 全部被勾选,则 该一级菜单为勾选
                let isStatus = item.children.every((sonItem=>{
                  return sonItem.status != 1
                }))
                if(isStatus){
                  that.$set(data[index],"status",0)
                }
                
            }else{
              result.push(item.menuNo)
            }


            // console.log(item.name);
            
          }
          // 若有 子数据
          if (item.children && item.children.length>0) {
              dealEvery(item.children)
          }
        })
      } 
      console.log("选中的菜单",result);
      return result
    },
    // 根据路由数组,扁平处理数组下所有按钮
    getCheckBtnData(routerData){
      // console.log("-----",routerData);
      let result = []
      dealEvery(routerData)
      function dealEvery(data){
        data.map(item=>{
          if (item.buttonList && item.buttonList.length>0) {
            let obj = {
              pid:item.menuNo,
              value:item.buttonList
            }
            result.push(obj)
          }
          // 若有 子数据
          if (item.children && item.children.length>0) {
              dealEvery(item.children)
          }
        })
      } 
      console.log("按钮",result);
      return result
    },

    // tab切换
    selectTabHandle(item,index){
      this.selectTab = item.id
    },

    // 数据提交
    handleSubmit() {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          // 至少选择1个权限
          let onlySelectOne = false

          let that = this
          dealEvery(this.pcTreeData,this.res_pcMenu,this.res_pcBtn)
          dealEvery(this.appletTreeData,this.res_appletMenu,this.res_appletBtn)

          function dealEvery(data,resMenu,resBtn){
            if (data.length>0) {
              data.forEach((item,index)=>{
                 // 若 勾选的菜单数组 包括 该菜单id ,该菜单为勾选
                if (resMenu.indexOf(item.menuNo) != -1) {
                  that.$set(data[index],"status",0)
                  // 接下来是按钮,找到勾选的按钮数组中 == 当前的菜单的按钮,直接把赋值
                  resBtn.forEach(btnItem=>{
                    if (btnItem.pid == item.menuNo) {
                      item.buttonList = btnItem.value
                    }
                  })

                  onlySelectOne = true

                }else{
                  // 若 勾选的菜单数组 不包括 该菜单id ,该菜单为不勾选,其下按钮则也为不勾选
                  that.$set(data[index],"status",1)
                  item.buttonList.forEach(btnItem=>{
                    that.$nextTick(()=>{
                      btnItem.status = 1
                    })
                  })
                }

                // 若有 子数据
                if (item.children && item.children.length>0) {
                    dealEvery(item.children,resMenu,resBtn)

                    //若 勾选的二级菜单数组 有被勾选,则 该一级菜单为勾选
                    item.children.map((sonItem=>{
                      if(resMenu.indexOf(sonItem.menuNo) != -1){
                        that.$set(data[index],"status",0)
                         onlySelectOne = true
                      }
                    }))
                    
                }

                
              })

              
            }
          }

          //  console.log("最终",this.pcTreeData);
          //  return
          //  console.log("this.editeStatus",this.editeStatus);
          if (!onlySelectOne) {
            this.$message.error("请至少选择1个权限")
            return
          }
          
          if (this.editeStatus == 1) {
            let url = this.GLOBALApi.roleAdd()
            let message = "新增成功"
            let params = {
                deptNo:this.userInfo.organizingType,
                roleName:this.userInfo.name,
                permissionList:[
                  {
                    systemType:1,
                    menuTreeList:this.pcTreeData
                  },
                  {
                    systemType:2,
                    menuTreeList:this.appletTreeData
                  },
                  // {
                  //   systemType:3,
                  //   menuTreeList:this.jscTreeData
                  // }
                ],
              };
            this.tjFun(url,message,params)
            
          }else{
            
            let url = this.GLOBALApi.roleEdit()
            let message = "修改成功"
            let params = {
                roleNo:this.roleVal["roleNo"],
                deptNo:this.userInfo.organizingType,
                roleName:this.userInfo.name,
                permissionList:[
                  {
                    systemType:1,
                    menuTreeList:this.pcTreeData
                  },
                  {
                    systemType:2,
                    menuTreeList:this.appletTreeData
                  },
                  // {
                  //   systemType:3,
                  //   menuTreeList:this.jscTreeData
                  // }
                ],
              };
            this.$nextTick(()=>{
              this.tjFun(url,message,params)
            })
          }
        } else {
          console.log("校验不通过");
          return false;
        }
      });
    },
    // 新增,编辑
    tjFun(url,message,params) {
      // console.log("this.pcTreeData",this.pcTreeData);
      //  console.log("canshu",params.permissionList[0].menuTreeList);
      this.$http(url, params)
          .then((res) => {
            if (res.code === 200) {
             this.$message.success(message);
             this.handleClose()
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
          });
    },
    handleClose() {
      this.$emit("close");
    },
    organizingTypeChange(){
      this.getTreeData()
    }
  },
  beforeDestroy(){
    this.$bus.off("res_pcTreeData")
    this.$bus.off("res_appletTreeData")
    this.$bus.off("res_jscTreeData")
  }
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
.content_box{
  display:flex;
  // justify-content: center;
  align-items: center;
  margin-top: 0;
  .content_title{
    margin-left: 10px;
    margin-right: 40px;
    position: relative;
  }
  .content_list{
    display: flex;
    align-items: center;
    .content_li{
      box-sizing: border-box;
      margin-right: 100px;
      cursor: pointer;
      padding-bottom: 5px;
    }
    .selectTab{
      color: #0052d9;
      border-bottom: solid 2px #0052d9;
      
    }
  }
  .content_title::before{
    content: '*';
    color: #F56C6C;
    position: absolute;
    left: -10px;
    top: 0px;
  }
}
.permission_box{
      height: 50vh;
      overflow-y: auto;
      // border: solid 1px red;
      width: 86%;
      margin-top: 20px;
      margin-left: 100px;
  }
.dialog_content {
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

</style>