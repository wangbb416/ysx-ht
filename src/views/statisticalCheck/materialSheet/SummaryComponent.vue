<!--汇总信息-->
<template>
  <div class="summaryComponent_page" id="summaryComponent_page">
    <div class="main">
      <el-table
        :data="tableData"
        style="margin-bottom:20px"
        :height="tabelHeigth+72"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column
          prop="collectNumber"
          label="期初库存"
          width="startState"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <div v-if="scope.$index==0">
                汇总: {{scope.row.startState.packageWeight||'0'}}kg,{{scope.row.startState.packageNumber||'0'}}包
              </div>
              <div v-else>
                 <div v-for="(item,index) in scope.row.startState.packageList" :key="index">
                  {{item.typeName}}: {{item.packageWeight}}kg,{{item.packageNumber}}包;
                </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="入库"
          width=""
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <div v-if="scope.$index==0">
                汇总: {{scope.row.innerState.packageWeight||'0'}}kg,{{scope.row.innerState.packageNumber||'0'}}包
              </div>
              <div v-else>
                 <div v-for="(item,index) in scope.row.innerState.packageList" :key="index">
                  {{item.typeName}}: {{item.packageWeight}}kg,{{item.packageNumber}}包;
                </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="盘点(赢)"
          width=""
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <div v-if="scope.$index==0">
                汇总: {{scope.row.profitState.packageWeight||'0'}}kg,{{scope.row.profitState.packageNumber||'0'}}包
              </div>
              <div v-else>
                 <div v-for="(item,index) in scope.row.profitState.packageList" :key="index">
                  {{item.typeName}}: {{item.packageWeight}}kg,{{item.packageNumber}}包;
                </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="盘点(亏)"
          width=""
          show-overflow-tooltip
        >
        <template slot-scope="scope">
              <div v-if="scope.$index==0">
                汇总: {{scope.row.lossesState.packageWeight||'0'}}kg,{{scope.row.lossesState.packageNumber||'0'}}包
              </div>
              <div v-else>
                 <div v-for="(item,index) in scope.row.lossesState.packageList" :key="index">
                  {{item.typeName}}: {{item.packageWeight}}kg,{{item.packageNumber}}包;
                </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="出库"
          width=""
          show-overflow-tooltip
        >
        <template slot-scope="scope">
              <div v-if="scope.$index==0">
                汇总: {{scope.row.outerState.packageWeight||'0'}}kg,{{scope.row.outerState.packageNumber||'0'}}包
              </div>
              <div v-else>
                 <div v-for="(item,index) in scope.row.outerState.packageList" :key="index">
                  {{item.typeName}}: {{item.packageWeight}}kg,{{item.packageNumber}}包;
                </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="期末库存"
          width=""
          show-overflow-tooltip
        >
        <template slot-scope="scope">
              <div v-if="scope.$index==0">
                汇总: {{scope.row.endState.packageWeight||'0'}}kg,{{scope.row.endState.packageNumber||'0'}}包
              </div>
              <div v-else>
                 <div v-for="(item,index) in scope.row.endState.packageList" :key="index">
                  {{item.typeName}}: {{item.packageWeight}}kg,{{item.packageNumber}}包;
                </div>
              </div>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>

export default {
  name: "videoRate",
  props:{
    tableData:{
        type:Array,
        require: true,
        default:[]
    },
    tabelHeigth:{
        type:Number,
        require: true,
        default:500
    },
    loading:{
        type:true,
        require: true,
        default:false
    },
  },
  data() {
    return {
      
    };
  },

  components: { },
  computed: {},
  created() {

  },
  mounted() {

  },

  methods: {
  },
};
</script>

<style lang="less" scoped>
.summaryComponent_page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
