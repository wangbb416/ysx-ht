import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tokenName:'',
        tokenPrefix:'',
        tokenValue: '',
        backUrl:"",//返回第三方地址
        routerKey:"",//第三方跳转的路由
        username: '',
        companyId:"",//对应账号本身业务id
        userInfo:{},//对应账号所有信息
        addTask:false,//是否能新增清运单
        filePrefix:'lsxh/pc',//oss文件路径前缀
        region: 'oss-cn-hangzhou',//阿里oss的regin
        bucket:process.env.NODE_ENV === 'production' ? 'lsxh-manage-prod':'lsxh-manage2',//阿里oss的bucket
        eventType: 1,
        isFullscreen: false,//是否为满屏
        editState: 'add',//add新增，edit编辑
        editData: {},
        menuList: [],
        routerList: [],
        roleIds:[],//当前账号的所有权限

        validBtn:[],//登录后有效的按钮级
        isJscBtn:false,//是否显示去驾驶舱按钮
    },
    mutations: {
        setTokenName(state, newVal) {
            state.tokenName = newVal
        },
        setTokenPrefix(state, newVal) {
            state.tokenPrefix = newVal
        },
        setTokenValue(state, newVal) {
            state.tokenValue = newVal
        },
        setBackUrl(state, newVal){
            state.backUrl = newVal
        },
        setRouterKey(state, newVal){
            state.routerKey = newVal
        },
        setUsername(state, newVal) {
            state.username = newVal
        },
        setCompanyId(state, newVal) {
            state.companyId = newVal
        },
        setUserInfo(state, newVal) {
            state.userInfo = newVal
        },
        setAddTask(state, newVal) {
            state.addTask = newVal
        },
        setIsFullscreen(state, newVal) {
            state.isFullscreen = newVal
        },
        setEditState(state, newVal) {
            state.editState = newVal;
        },
        setEditData(state, newVal) {
            state.editData = newVal;
        },
        setMenuList(state, newVal) {
            state.menuList = newVal;
        },
        setRouterList(state, newVal) {
            state.routerList = newVal;
        },
        setValidBtn(state, newVal) {
            state.validBtn = newVal;
        },
        setIsJscBtn(state, newVal) {
            state.isJscBtn = newVal;
        },
        // setRoleIds(state, newVal) {
        //     state.roleIds = newVal;
        // },


    }
});
export default store;
