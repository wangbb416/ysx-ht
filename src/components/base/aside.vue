<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      :default-active="onRoutes"
      background-color="#1D2021"
      text-color="#fff"
      unique-opened
      @select="select"
      @open="firstMenuHandle"
      @close="firstMenuHandle"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }} </span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.index">
              <!-- 如果还有三级： -->
              <el-submenu v-if="subItem.subs" :index="subItem.index"
                          @click="jumpPage(subItem.index)">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index"
                              @click="jumpPage(threeItem.index)"> {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <!-- 二级： -->
              <el-menu-item v-else :index="subItem.index" @click="jumpPage(subItem.index)">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index" @click="jumpPage(item.index)">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/utils/bus'
import {mapState} from 'vuex'
import asideLiBg from '@/assets/imgs/common/selectli_bg.png'

export default {
  // name:'aside',
  data() {
    return {
      collapse: false,
      items: [],
    }
  },
  computed: {
    // ...mapState(['items', 'onRoutes'])
    ...mapState(['onRoutes']),
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })

    this.getMenu()
  },
  methods: {
    jumpPage(url) {
      if (url == '') return

      if (url.indexOf('http') != -1) {
        window.open(url)
      } else {
        this.$router.push({path: url})
      }
    },
    async getMenu() {
      var {
        data: {data, code},
      } = await this.$api.getUserMenus.http(this.$api.getUserMenus.url)
      // console.log('data', data)
      // 330000
      if (code === 200) {
        var items = []
        let regionCode = localStorage.getItem("regionCode")
        data.forEach((val, i) => {
          if (["330000", "331081"].includes(regionCode) || (!["330000", "331081"].includes(regionCode) && val.webUrl != '/vehicleAccount')) {
            var obj = {
              menuId: val.menuId,
              menuPid: val.menuPid,
              sort: val.sort,
              index: val.webUrl || 'noWeburl' + i,
              title: val.name,
              icon: 'el-icon-s-home',
            }
            items.push(obj)
          }
        })
        console.log('items', items)
        // items.push({ icon: 'el-icon-s-home', index: '/vehicleAccount', menuId: 16, menuPid: 9, sort: 99, title: '载具台账' })
        items = this.setTreeData(items)
        // console.log('this.items' , this.items);
        // (items).reverse();
        // this.$store.dispatch('changeItemsByActions', items);
        this.items = items
        // console.log('items', this.items);

        this.select()
      }
    },
    select(index) {
      // console.log(index);
      // this.onRoutes = index;
      index && this.$store.dispatch('changeOnRoutesByActions', index)
      setTimeout(() => {
        // console.log($('.sidebar>.sidebar-el-menu.el-menu').children().children().eq(0));
        // console.log($('.el-submenu__title'));
        $('.el-submenu__title').css({
          backgroundImage: 'none',
        })
        $('.sidebar .el-menu-item.is-active').parent().prev().removeAttr('style')
        $('.sidebar-el-menu.el-menu').children().css({
          paddingBottom: '0',
        })
        $('.el-submenu.is-active').children().css({
          paddingBottom: '10px',
        })
        $('.el-menu--inline').css({
          marginBottom: '22px',
        })
      }, 0)
    },
    firstMenuHandle(index) {
      // console.log(index);
      // 如果二级页面需要跳转而且当前页面非目标页面

      if (index.indexOf('noWeburl') == -1 && this.$route.path !== index) {
        this.$router.push({path: index})
      }
    },
    setTreeData(data) {
      let cloneData = JSON.parse(JSON.stringify(data)) // 对源数据深度克隆
      function compare(prop) {
        return function (a, b) {
          var v1 = a[prop]
          var v2 = b[prop]
          return v1 - v2
        }
      }

      let tree = cloneData.filter(father => {
        //循环所有项
        let branchArr = cloneData.filter(child => {
          return father.menuId === child.menuPid //返回每一项的子级数组
        })
        branchArr.sort(compare('sort'))
        if (branchArr.length > 0) {
          father.subs = branchArr //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.menuPid === 0 //返回第一层
      })

      tree.sort(compare('sort'))
      const icon = {
        0: 'icon-yunyingguanli iconfont',
        1: 'icon-jianguan iconfont',
        2: 'icon-danweiguanli iconfont',
        3: 'icon-tongji iconfont',
        4: 'icon-qiyeguanli iconfont',
        5: 'icon-shebeiguanli iconfont',
        6: 'icon-erweimaguanli iconfont',
        7: 'icon-yunyingguanli1 iconfont',
        8: 'icon-yuanshujumianban iconfont',
      }
      for (let i = 0; i < tree.length; i++) {
        tree[i].icon = icon[i]
      }

      return tree //返回树形数据
    },
    MakeChain(arr) {
      var result = {}
      var chains = {}
      var parent = null
      for (var i = 0; i < arr.length; i++) {
        parent = chains[arr[i].level - 1] || result // i=0 parent = result = {}
        parent.subs = parent.subs || [] // i = 0  parent.subs = []
        parent.subs.push(arr[i])
        chains[arr[i].level] = arr[i]
      }
      // console.log('result' , result)
      return result.subs
    },
  },
  mounted() {
    this.select()
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: block;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}

.el-submenu .el-menu-item {
  min-width: auto;
}

.sidebar > ul {
  height: 100%;
}
</style>
