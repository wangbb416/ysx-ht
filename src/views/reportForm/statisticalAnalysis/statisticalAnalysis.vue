<!-- 统计分析 -->
<template>
  <div class="pelletizing_page" id="statistical_analysis">
    <div class="title_bar">
      <img
        src="../../../assets/img/statisticalAnalysis/icon.png"
        alt=""
        class="icon"
      />
      <span class="tit">数据统计</span>
    </div>
    <div class="main_con_box">
      <div class="right">
        <div class="r_tit">海洋塑料垃圾减少总量</div>
        <div class="statistics_data">
          <div class="num">{{ plasticBlockWeight }}</div>
          <div class="desc">吨</div>
        </div>
        <div class="data_area scroll_bar">
          <div
            v-for="(item, index) of plasticProportionRes"
            :key="index"
            class="item"
          >
            <div class="top">
              <div class="num">{{ item.value }}</div>
              <div class="val">吨</div>
            </div>
            <div class="desc">{{ item.name }}</div>
          </div>
        </div>
        <div class="r_sub_tit">海洋塑料垃圾减少占比图</div>
        <div class="chart_area">
          <div class="c_left" ref="pieRef"></div>
          <div class="c_right">
            <div
              class="item"
              v-for="(item, index) in plasticProportionRes"
              :key="index"
            >
              <span class="dot" :style="{ background: item.color }"></span>
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="left">
        <div class="l_list">
          <div class="item">
            <div class="i_tit">现已建设小蓝之家</div>
            <div class="con">
              <div class="con_left">
                <div class="i_pic">
                  <img
                    src="../../../assets/img/statisticalAnalysis/xlzj.png"
                    alt=""
                    class="pic"
                  />
                </div>
              </div>
              <div class="con_right">
                <div class="bar">
                  <span class="tit">现已建设小蓝之家</span>
                  <span class="num">{{ leftTopData.homeSum }}个</span>
                </div>
                <div class="bar">
                  <span class="tit">累计收集</span>
                  <span class="num">{{ leftTopData.totalAmount }}吨</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="i_tit">参与再生企业</div>
            <div class="con">
              <div class="con_left">
                <div class="i_pic">
                  <img
                    src="../../../assets/img/statisticalAnalysis/zsqy.png"
                    alt=""
                    class="pic"
                  />
                </div>
              </div>
              <div class="con_right">
                <div class="bar">
                  <span class="tit">参与再生企业</span>
                  <span class="num">{{ leftTopData.handleCompany }}个</span>
                </div>
                <div class="bar">
                  <span class="tit">处置总量</span>
                  <span class="num">{{ leftTopData.handleWeight }}吨</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="i_tit">
              <span>现已建设中转仓</span>
              <span class="it_num">{{ leftTopData.warehouse }}个</span>
            </div>
            <div class="con">
              <div class="con_left">
                <div class="i_pic">
                  <img
                    src="../../../assets/img/statisticalAnalysis/zzc.png"
                    alt=""
                    class="pic"
                  />
                </div>
                <div class="b_bar">
                  其中{{ leftTopData.cloudWarehouse }}个为蓝色云仓
                </div>
              </div>
              <div class="con_right">
                <div class="bar">
                  <span class="tit">入库</span>
                  <span class="num">{{ leftTopData.inputWeight }}吨</span>
                </div>
                <div class="bar">
                  <span class="tit">出库</span>
                  <span class="num">{{ leftTopData.transferWeight }}吨</span>
                </div>
                <div class="bar">
                  <span class="tit">暂存</span>
                  <span class="num">{{ leftTopData.residueWeight }}吨</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="i_tit">
              <span>参与运输企业</span>
              <span class="it_num">{{ leftTopData.transportCompany }}个</span>
            </div>
            <div class="con">
              <div class="con_left">
                <div class="i_pic">
                  <img
                    src="../../../assets/img/statisticalAnalysis/ysqy.png"
                    alt=""
                    class="pic"
                  />
                </div>
              </div>
              <div class="con_right">
                <div class="bar">
                  <span class="tit">转运车辆数</span>
                  <span class="num">{{ leftTopData.transportVehicle }}辆</span>
                </div>
                <div class="bar">
                  <span class="tit">转运次数</span>
                  <span class="num">{{ leftTopData.transportNumber }}次</span>
                </div>
                <div class="bar">
                  <span class="tit">转运重量</span>
                  <span class="num">{{ leftTopData.transferWeight }}吨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title_bar">
      <img
        src="../../../assets/img/statisticalAnalysis/icon.png"
        alt=""
        class="icon"
      />
      <span class="tit">各区域海洋塑料治理进度</span>
    </div>
    <div class="list_box">
      <div class="list_area scroll_bar">
        <div
          class="item"
          v-for="(item, index) of cityStatisticalAnalysisReqs"
          :key="index"
        >
          <div class="i_tit">{{ item.city }}</div>
          <div class="l_bar">
            <div class="bar">
              <div class="tit">现有小蓝之家</div>
              <div class="desc">{{ item.homeSum }}个</div>
            </div>
            <div class="bar">
              <div class="tit">累计收集</div>
              <div class="desc">{{ item.totalAmount }}吨</div>
            </div>
            <div class="bar">
              <div class="tit">累计转运</div>
              <div class="desc">{{ item.transferWeight }}吨</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '@/utils/echarts.js'
export default {
  name: 'statisticalAnalysis',
  data() {
    return {
      timeId: null,
      colorBg: [
        '#2A8BFD',
        '#BAFF7F',
        '#00FAC1',
        '#00CAFF',
        '#FDE056',
        '#4ED33C',
        '#FF8A26',
        '#FF5252',
        '#9689FF',
        '#CB00FF'
      ],
      leftTopData: {
        homeSum: 0, // 现已有小蓝之家
        totalAmount: 0, // 累计收集
        handleCompany: 0, // 再生企业
        handleWeight: 0, // 处置总量
        cloudWarehouse: 0, // 云仓库
        warehouse: 0, // 后台仓库数
        inputWeight: 0, // 入库重量
        transferWeight: 0, // 转用重量
        residueWeight: 0, // 暂存重量
        transportCompany: 0, // 运输企业
        transportVehicle: 0, // 运输车辆
        transportNumber: 0, // 运输次数
        distance: 0 // 运输里程数
      },
      plasticProportionRes: [],
      plasticBlockWeight: 0,
      cityStatisticalAnalysisReqs: []
    }
  },
  watch: {
    plasticProportionRes: {
      handler(val) {
        if (val && val.length) {
          this.$nextTick(() => {
            this.initChart(val)
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.setAreaView(window)
    })

    // window.onresize = () => {
    //   this.setAreaView(window)
    // }
  },
  methods: {
    getData() {
      this.$http(this.GLOBALApi.getStatisticalAnalysis(), {})
        .then(res => {
          if (res.code === 200 && res.data) {
            let data = res.data
            this.leftTopData = {
              homeSum: data.homeSum, // 现已有小蓝之家
              totalAmount: data.totalAmount, // 累计收集
              handleCompany: data.handleCompany, // 再生企业
              handleWeight: data.handleWeight, // 处置总量
              cloudWarehouse: data.cloudWarehouse, // 云仓库
              warehouse: data.warehouse, // 后台仓库数
              inputWeight: data.inputWeight, // 入库重量
              transferWeight: data.transferWeight, // 转用重量
              residueWeight: data.residueWeight, // 暂存重量
              transportCompany: data.transportCompany, // 运输企业
              transportVehicle: data.transportVehicle, // 运输车辆
              transportNumber: data.transportNumber, // 运输次数
              distance: data.distance // 运输里程数
            }
            this.cityStatisticalAnalysisReqs =
              data.cityStatisticalAnalysisReqs.map(item => {
                return {
                  ...item
                }
              })
            this.plasticProportionRes = data.plasticProportionRes.map(
              (item, index) => {
                return {
                  value: item.weight,
                  color: this.colorBg[index],
                  name: item.plasticName
                }
              }
            )
            this.plasticBlockWeight = data.plasticBlockWeight
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error(error.msg)
        })
    },
    setAreaView(win) {
      // 正常比例 width:1646   height:817
      // let newWidth = document.querySelector('.content_main').offsetWidth
      // let newHeight = document.querySelector('.content_main').offsetHeight
      // let scaleWidth = newWidth / 1646
      // let scaleHeight = newHeight / 817
      // let scale = 1
      // if (scaleWidth < scaleHeight) {
      //   scale = scaleWidth
      // } else {
      //   scale = scaleHeight
      // }
      // document
      //   .querySelector('#statistical_analysis')
      //   .setAttribute('style', `transform:scale(${scale});`)
      let bodyStyle = document.createElement('style')
      // 实际宽度：
      let tempWidth = document.querySelector('.content_main').offsetWidth
      // 实际高度：
      let tempHeight = document.querySelector('.content_main').offsetHeight

      bodyStyle.innerHTML = `#statistical_analysis{width:${
        tempWidth >= 1646 ? tempWidth : 1646
      }px; height:${tempHeight >= 817 ? tempHeight : 817}px !important;}`

      document.documentElement.firstElementChild.appendChild(bodyStyle)
      function refreshScale() {
        // 实际宽度：
        let baseWidth = document.querySelector('.content_main').offsetWidth
        // 实际高度：
        let baseHeight = document.querySelector('.content_main').offsetHeight
        let realRatio = baseWidth / baseHeight
        let designRatio = 1646 / 817
        let scaleRate = (baseWidth / 1646).toFixed(4)
        const DOM = document.getElementById('statistical_analysis')
        // if (realRatio > designRatio) {
        //   scaleRate = (baseHeight / 817).toFixed(4)
        // }
        // if (baseHeight >= 817) {
        //   scaleRate = (baseHeight / 817).toFixed(4)
        // } else {
        //   if (realRatio < designRatio) {
        //     scaleRate = (baseHeight / 817).toFixed(4)
        //   }
        // }
        DOM.style.transformOrigin = 'left top'
        DOM.style.width = `${baseWidth / scaleRate}px`
        DOM.style.transform = `scale(${scaleRate})` // transform只能设置一次。所以分别设置
      }
      refreshScale()
      win.addEventListener(
        'pageshow',
        function (e) {
          if (e.persisted) {
            // 浏览器后退的时候重新计算
            refreshScale()
          }
        },
        false
      )
      win.addEventListener('resize', refreshScale, false)
    },
    initChart(trafficWay) {
      let allVal = 0
      trafficWay.forEach(item => {
        allVal += Number(item.value)
      })
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.pieRef)
      let data = []
      let data2 = []
      let color = this.colorBg
      for (let i = 0; i < trafficWay.length; i++) {
        data.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            tooltip: {
              show: true
            },
            itemStyle: {
              shadowBlur: 60,
              borderRadius: 8,
              borderColor: trafficWay[i].name.color
            }
          },
          {
            value: 1,
            name: '',
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }
        )
        data2.push(
          {
            value: trafficWay[i].value,
            name: trafficWay[i].name
          },
          {
            value: 1,
            name: '',
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0,
              opacity: 0.2
            }
          }
        )
      }

      let angle = 0 //角度，用来做简单的动画效果的
      var option = {
        color: color,
        tooltip: {
          show: false,
          position: [20, 20],
          formatter: parmas => {
            let val = ((100 * parmas.value) / this.plasticBlockWeight).toFixed(
              2
            )
            return `<div class="rotate_pie">
            <span class="round" style="background-color: ${parmas.color}"></span>
            <span class="name">${parmas.name}：</span>
            <span class="value">${val}%</span>
            </div>`
          },
          extraCssText:
            'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); background-color: rgba(0, 0, 0, 0.6)'
        },
        series: [
          {
            //外线1
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //外线1
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //内线1
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //内线2
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180
                },
                style: {
                  stroke: '#4EE9E6',
                  fill: 'transparent',
                  lineWidth: 1.5
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //内点1
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75
              let point = getCirlPoint(x0, y0, r, 90 + -angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 2
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //内点2
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.75
              let point = getCirlPoint(x0, y0, r, 270 + -angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 2
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //外点3
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85
              let point = getCirlPoint(x0, y0, r, 90 + angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 2
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            //外点4
            name: 'ring5', //绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: function (params, api) {
              let x0 = api.getWidth() / 2
              let y0 = api.getHeight() / 2
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.85
              let point = getCirlPoint(x0, y0, r, 270 + angle)
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 2
                },
                style: {
                  stroke: '#66FFFF', //粉
                  fill: '#66FFFF'
                },
                silent: true
              }
            },
            data: [0]
          },
          {
            name: '',
            type: 'pie',
            clockwise: false,
            radius: ['130%', '120%'],
            minAngle: 15,
            emphasis: {
              scale: false
            },
            top: 'center',
            label: {
              show: false
            },
            data
          },
          {
            type: 'pie',
            top: 'center',
            radius: ['110%', '60%'],
            minAngle: 15,
            startAngle: 90,
            clockwise: false,
            legendHoverLink: false,
            emphasis: {
              scale: false
            },
            itemStyle: {
              opacity: 0.15
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: data2
          },
          {
            name: '',
            type: 'pie',
            clockwise: false,
            emphasis: {
              scale: false
            },
            radius: ['45%', '40%'],
            minAngle: 15,
            top: 'center',
            label: {
              show: false
            },
            data: data
          }
        ]
      }

      //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
        let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
        return {
          x: x1,
          y: y1
        }
      }

      function draw() {
        angle = angle + 3
        myChart.setOption(option)
        //window.requestAnimationFrame(draw);
      }
      clearInterval(this.timeId)
      this.timeId = setInterval(function () {
        //用setInterval做动画感觉有问题
        draw()
      }, 100)
    },
    beforeDestroy() {
      clearInterval(this.timeId)
    }
  }
}
</script>
<style lang="less">
.rotate_pie {
  display: flex;
  color: #b4b4b5;
  font-size: 14px;
  align-items: center;
  .round {
    display: block;
    width: 8px;
    height: 8px;
    margin-right: 5px;
  }
  .value {
    color: #ffffff;
    font-size: 16px;
    padding-right: 2px;
  }
}
</style>
<style lang="less" scoped>
.pelletizing_page {
  width: 1646px;
  height: 817px;
  padding: 20px 24px;
  background: #0a1b35;
  transform-origin: left top;
  overflow: hidden;
  box-sizing: border-box;
}
.title_bar {
  display: flex;
  align-items: center;
  line-height: 30px;
  .icon {
    width: 20px;
    height: 23px;
    margin-right: 9px;
  }
  .tit {
    font-size: 21px;
    font-weight: 500;
    color: #ffffff;
  }
}
.main_con_box {
  margin: 18px 0 12px;
  display: flex;
  .left {
    width: 985px;
    height: 432px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    flex-shrink: 0;
    margin-left: 24px;
    padding: 20px 0 0 25px;
    box-sizing: border-box;
  }
  .right {
    width: 589px;
    height: 432px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 18px 20px;
    box-sizing: border-box;
    .r_tit {
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      line-height: 25px;
      margin-bottom: 8px;
    }
    .r_sub_tit {
      padding-top: 13px;
      font-size: 18px;
      color: #b4b4b5;
      line-height: 25px;
    }
    .statistics_data {
      display: flex;
      align-items: flex-end;
      .num {
        font-size: 30px;
        font-weight: bold;
        color: #f7f7f7;
        line-height: 35px;
      }
      .desc {
        line-height: 21px;
        margin-left: 4px;
        font-size: 18px;
        color: #ffffff;
        line-height: 25px;
      }
    }
  }
}
.data_area {
  padding: 10px 0 17px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  .item {
    border-right: 1px solid #888888;
    padding-right: 26px;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
      border-right: none;
      padding-right: 0;
    }
    .top {
      display: flex;
      margin-bottom: 4px;
      align-items: flex-end;
      height: 27px;
    }
    .num {
      line-height: 27px;
      font-size: 23px;
      font-weight: bold;
      color: #f7f7f7;
      margin-right: 4px;
    }
    .val {
      line-height: 20px;
      font-size: 14px;
      color: #b4b4b5;
    }
    .desc {
      line-height: 20px;
      font-size: 14px;
      color: #ffffff;
      white-space: nowrap;
    }
  }
}
.l_list {
  overflow: hidden;
  .item {
    float: left;
    margin-right: 24px;
    margin-bottom: 16px;
    &:nth-child(n + 3) {
      margin-bottom: 0;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
  .i_tit {
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    line-height: 25px;
    margin-bottom: 16px;
    display: flex;
    .it_num {
      margin-left: 16px;
    }
  }
  .con {
    display: flex;
    .con_left {
      width: 180px;
      height: 142px;
      margin-right: 12px;
      position: relative;
      z-index: 1;
    }
    .b_bar {
      height: 48px;
      line-height: 48px;
      font-size: 18px;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      text-align: center;
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }
  .i_pic {
    width: 180px;
    height: 142px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
  }
  .pic {
    width: 135px;
    height: 110px;
  }
  .bar {
    display: flex;
    color: #fff;
    margin-bottom: 11px;
    line-height: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .tit {
    width: 142px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 16px;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .num {
    width: 122px;
    height: 40px;
    background: rgba(71, 71, 71, 0.6);
    font-size: 18px;
    text-align: center;
  }
}
.list_box {
  margin-top: 16px;
  .list_area {
    height: 240px;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    .item {
      width: 304px;
      padding: 19px 0 24px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      box-sizing: border-box;
      float: left;
      margin-right: 19px;
      &:last-child {
        margin-right: 0;
      }
      .i_tit {
        font-size: 18px;
        font-weight: 500;
        color: #ffffff;
        line-height: 25px;
        padding: 0 0 24px 16px;
      }
      .l_bar {
        padding: 0 20px;
      }
      .bar {
        height: 38px;
        line-height: 38px;
        display: flex;
        margin-bottom: 17px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .tit {
        background: rgba(255, 255, 255, 0.1);
        width: 167px;
        font-weight: 400;
        color: #c8c8c8;
        font-size: 16px;
        padding-left: 16px;
        box-sizing: border-box;
      }
      .desc {
        width: 96px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        background: rgba(71, 71, 71, 0.6);
      }
    }
  }
}
.chart_area {
  display: flex;
  padding-top: 14px;
  align-items: center;
  .c_left {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
  }
  .c_right {
    flex-grow: 1;
    margin-left: 20px;
    .item {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #b4b4b5;
      float: left;
      width: 150px;
      padding-left: 20px;
      box-sizing: border-box;
      margin-bottom: 23px;
    }
    .dot {
      width: 5px;
      height: 5px;
      margin-right: 5px;
    }
  }
}
.scroll_bar {
  scrollbar-color: #fff rgba(255, 255, 255, 0.2); /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
  /* 浏览器滚动条样式 */
  /* width */
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: none;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.2) !important;
    border-radius: 8px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #fff !important;
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #666 !important;
  }
}
</style>
