<template>
  <div class="tree_page">
      <div class="btn" v-show="treeData && treeData.length>0">
          <div @click="allSelect" v-fastClick>全选</div>
          <div @click="inverSelect" v-fastClick>反选</div>
      </div>
      <div class="custom-tree-container">
        <div class="block">
          <el-tree
            :data="treeData"
            show-checkbox
            ref="tree"
            node-key="menuNo"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
            :default-expanded-keys="[]"
            :default-checked-keys="checkedMenu"
            @check-change="checkChange"
            @check="nodeClick"
          >
            
          </el-tree>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:{
    
  },
  data() {
    return {
      selectTab:null,

      treeData:[],
      checkedMenu:[],
      checkedBtn:[],
    };
  },
  watch: {
    
  },
  mounted(){
    this.$bus.on("jscParams",(treeData,btnList,menuList)=>{
      this.treeData = treeData
      this.checkedMenu = menuList
      this.checkedBtn = btnList
    })
  },
  beforeDestroy(){
    this.$bus.off("jscParams")
  },
  methods: {
    // 数据存储
    handleStore(){
      this.$bus.$emit("res_jscTreeData",this.checkedMenu,this.checkedBtn)
    },
    // 菜单变化---(更新最新的checkedMenu)
    checkChange(data,status,sonStatus){
      // console.log("checkChange",data,status,sonStatus);
      this.checkedMenu = this.$refs.tree.getCheckedKeys()
      this.handleStore()
      
    },

    // 左侧菜单节点点击,主要是针对按钮处理-----(由于无法获取该节点是勾选还是取消,只能通过checkedKeys判断)
    nodeClick(data){
      console.log("左侧菜单节点点击",data);

      // 当前节点 不存在,说明是取消,同时需要取消对应的按钮勾选---------(若是当前节点勾选,不需要选中按钮)
      if (this.checkedMenu.indexOf(data.menuNo)==-1) {
        var that = this;
          this.checkedBtn.map(btnItem=>{
            if (data.menuNo == btnItem.pid) {
              this.$nextTick(()=>{
                btnItem.value.forEach(btn=>{
                  btn.status = 1
                })
              })
            }
          })
        // 对其下所有子元素的按钮取消处理
        if (data.children && data.children.length>0) {
          dealEvery(data.children)
        }
        this.handleStore()

        function dealEvery(sonData){
          sonData.map((sonItem)=>{
            that.checkedBtn.forEach(btnItem=>{
              if (sonItem.menuNo == btnItem.pid) {
                that.$nextTick(()=>{
                  btnItem.value.forEach(btn=>{
                    btn.status = 1
                  })
                })
              }
            })

            if (sonItem.children && sonItem.children.length>0) {
              dealEvery(sonItem.children)
            }
          })
          
        }
      }
    },

    // 全选,包括按钮
    allSelect(){
      //已勾选的菜单
      let needStore = this.$refs.tree.getCheckedKeys() || []
      let that = this
      dealEvery(this.treeData)
 
      function dealEvery(data){
        data.map(item=>{
          //菜单: 判断到没有勾选,则勾选上
          if (needStore.indexOf(item.menuNo)==-1) {
            needStore.push(item.menuNo)
          }
          that.checkedBtn.map(btnItem=>{
            if (item.menuNo == btnItem.pid) {
              that.$nextTick(()=>{
                btnItem.value.forEach(btn=>{
                  btn.status = 0
                })
              })
            }
          })
          //若有 子数据
          if (item.children && item.children.length>0) {
              dealEvery(item.children)
          }
        })
      }
      this.$refs.tree.setCheckedKeys(needStore);
      this.checkedMenu = needStore
      this.handleStore()
    },

    // 反选
    inverSelect(){
      let that = this
      dealEvery(this.treeData)
      // 清除菜单勾选
      this.$refs.tree.setCheckedKeys([]);

      function dealEvery(data){
        data.map(item=>{
          that.checkedBtn.map(btnItem=>{
            if (item.menuNo == btnItem.pid) {
              that.$nextTick(()=>{
                btnItem.value.forEach(btn=>{
                  btn.status = 1
                })
              })
            }
          })

          if (item.children && item.children.length>0) {
              dealEvery(item.children)
          }
        })
      }
      this.handleStore()
    },

    // 自定义内容
    renderContent(h, { node, data, store }) {
      // console.log("获取到的基础数据",data);
      if (data.buttonList && data.buttonList.length>0) {
        let currentBtnVal = []
        this.checkedBtn.map(btnItem=>{
          if (data.menuNo == btnItem.pid) {
            currentBtnVal = btnItem.value
          }
        })
        // console.log("currentBtnVal",currentBtnVal);
        return (
            <span class="my-tree-node">
                <span>{data.name}</span>
                <span class="right_box">
                        {
                          currentBtnVal.map((item,index)=>{
                            return <div class={item.status==0?'select':'no_select'} on-click={ (e) => this.checkHandle(item.status==0?true:false,node,item)}>{item.name}</div>
                          })
                        }
                </span>
            </span>
        );
      } else {
        return (
            <div>{data.name}</div>
        );
      }
    },

    // 按钮事件
    checkHandle(e,data,currentBtnVal){
        // 按钮选中
        if (!e) {
           this.$set(currentBtnVal,"status",0)
            //若按钮选中, 把菜单也勾选
            if (this.checkedMenu.indexOf(data.data.menuNo)==-1) {
              this.checkedMenu.push(data.data.menuNo)
              this.$refs.tree.setCheckedKeys(this.checkedMenu);
            }
        } else {
          // 取消
          this.$set(currentBtnVal,"status",1)
        }
        this.handleStore()
    },
  
  }
};
</script>

<style lang="less" scoped>
.tree_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.btn{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  &>div{
    font-size: 14px;
    margin-right: 30px;
    cursor: pointer;
    padding: 4px 10px;
    border: solid 1px #eee;
    border-radius: 4px;
  }
}




</style>
