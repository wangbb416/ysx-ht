<template>
  <div id="app" v-cloak>
    <router-view></router-view>
  </div>
</template>

<script>
import {_cacheData, _vueStoreSessionStorage} from "@/utils/util.js";

export default {
  name: "App",
  created() {
    //保存状态管理里的数据
    this.initStore();
  },
  watch: {
    $route(to, from) {
      document.getElementsByTagName('body')[0].className = 'otherSystemLogin'
      // this.$router.options.routes.map(item => {
      // 	if(item.path === to.path){
      // 		let breadcrumb= item.breadcrumb || []
      // 		this.$store.commit('setBreadcrumb',breadcrumb)
      // 	}
      // });
      if (this.$store.state.routerList && this.$store.state.routerList.length) {
        if (this.$store.state.routerList.indexOf(to.path) < 0) {
          this.$router.push({path: this.$store.state.routerList[0]})
        }
      }
    }
  },
  mounted() {
    let self = this;
    window.addEventListener("beforeunload", (e) => {
      Object.keys(self.$store.state).map((val) => {
        _cacheData(self.$store.state[val], val);
      });
    });
  },
  methods: {
    //保存状态管理里的数据
    initStore() {
      let storage = window.sessionStorage;
      for (let i = 0, len = storage.length; i < len; i++) {
        let key = storage.key(i);
        let value = storage.getItem(key);
        let tempDate = _vueStoreSessionStorage(key, value);
        if (tempDate) {
          if (this.$store._mutations["set" + tempDate.capitalize_key]) {
            this.$store.commit("set" + tempDate.capitalize_key, tempDate.value);
            this.$nextTick(() => {
              sessionStorage.removeItem(key);
            });
          }
        }
      }
    },
  },
  components: {},
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 100%;
  min-width: 1020px;
  height: 100%;
}

[v-cloak] {
  display: none;
}

//滚动条
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: #ebeef5;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #ccc;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
</style>
