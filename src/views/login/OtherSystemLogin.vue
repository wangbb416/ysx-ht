<template>
  <div class="otherSystemLogin_page"></div>
</template>

<script>
export default {
  name: "otherSystemLogin",
  components: {},
  data() {
    return {
      adminPower: [],//菜单权限
      adminRouteList: ['/login', '/videoRateDetail', "/memberManage"],//所有路由
    };
  },
  created() {
    console.log("驾驶舱登录");
    const query = this.$route.query;
    // const username = query.username || false;
    // const password = query.password || false;
    const backUrl = query.backUrl || false;
    const routerKey = query.routerKey || false;
    const token = query.token || ''
    if(token && backUrl){
      this.$store.commit("setBackUrl",backUrl);
      if(routerKey){
        this.$store.commit("setRouterKey",routerKey);
      }

      this.$store.commit('setTokenName', 'mc-token')//token的key
      this.$store.commit('setTokenPrefix', 'BC')
      this.$store.commit('setTokenValue', token)
      this.getUserInfo()
      // 获取菜单路由
      this.$nextTick(() => {
        this.getResourceTreeList()
      })
    }else{
      this.$router.push({path:"/login"})
    }
    
  },
  methods: { 
    getUserInfo() {
      this.$http(this.GLOBALApi.getUserInfoByToken())
        .then(res => {
          if (res.code == 200) {
            this.$store.commit('setUserInfo', {...res.data})
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
    // 获取菜单路由列表
    getResourceTreeList() {
      this.$http(this.GLOBALApi.getResourceTreeList())
          .then(res => {
            if (res.code == 200) {
              if (res.data && res.data.length > 0) {
                this.setTreeData(res.data)
              } else {
                this.$message({
                  message: '该账号暂无任何权限，请联系管理员!',
                  type: 'warning',
                  duration: 1500
                })
                this.loginState = false
                this.$store.commit('setTokenValue', '')
              }

            } else {
              this.$message.error(res.msg);
              this.loginState = false
              this.$store.commit('setTokenValue', '')
            }
          })
          .catch((error) => {
            this.$message.error(error.msg);
            this.loginState = false
            this.$store.commit('setTokenValue', '')
          });
    },
    // 处理路由数据
    setTreeData(data) {
      let cloneData = JSON.parse(JSON.stringify(data))
      this.adminPower = cloneData.filter(item=>{
        return item.name != "顶部菜单栏"
      })
      let that = this
      let validBtn = []
      this.adminRouteList = ['/login', '/videoRateDetail', "/memberManage"]
      dealEvery(cloneData)

      // 扁平化所有按钮
      function dealEvery(cloneData) {
        cloneData.map(item => {
          that.adminRouteList.push(item.routPath)
          if (item.level==2 && item.buttonList && item.buttonList.length > 0) {
            validBtn.push({
              path: item.routPath,//其父亲的路由
              btnList: item.buttonList
            })
          }

          // 驾驶舱按钮
          if(item.name =="顶部菜单栏" && item.buttonList.length>0 && item.buttonList[0].name == '驾驶舱'){
            that.$store.commit('setIsJscBtn',true)
          }

          if (item.children && item.children.length > 0) {
            dealEvery(item.children)
          }
        })
      }

      // console.log("adminRouteList",this.adminRouteList);
      this.$store.commit("setValidBtn", validBtn)
      this.$store.commit('setMenuList', this.adminPower)
      this.$store.commit('setRouterList', this.adminRouteList)
      // console.log("routerList-------------------", this.$store.state.routerList);
      // console.log("menuList------------------", this.$store.state.menuList);
      this.$router.replace(this.$store.state.menuList[0].children[0].routPath)
      // this.loginState = false
    }
  },
};
</script>

<style lang="less" scoped>
</style>
