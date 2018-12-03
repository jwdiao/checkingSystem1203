<template>
      <div class="home_abnormal">
        <div class="home_abnormal-item">
          <p class="home_title">人员考勤异常情况</p >
          <ul class="day">
            <li>
              <p class="chidao" v-if="info && info.lateNum" v-text="info.lateNum"></p >
              <div><img src="../assets/images/abnormal.png" /></div>
              <span>迟到人数</span>
            </li>
            <li>
              <p class="zaotui" v-if="info && info.leaveNum" v-text="info.leaveNum"></p >
              <div><img src="../assets/images/abnormal.png" /></div>
              <span>早退人数</span>
            </li>
            <li>
              <p class="kuanggong" v-if="info && info.absentNum" v-text="info.absentNum"></p >
              <div><img src="../assets/images/abnormal.png" /></div>
              <span>旷工人数</span>
            </li>
            <li>
              <p class="ligang" v-if="info && info.outNum" v-text="info.outNum">866</p >
              <div><img src="../assets/images/abnormal.png" /></div>
              <span>离岗人数</span>
            </li>
          </ul>
        </div>
        <div class="home_abnormal-item">
          <p class="home_title">人员考勤异常月统计</p >
          <div class="month" id="month">

          </div>
        </div>
        <div class="home_abnormal-item">
          <p class="home_title">人员考勤异常年统计</p >
          <div class="year" id="year"></div>
        </div>
      </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'AbnormalStatistics',
  props: ['info','monthYearData'],
  data () {
    return {
	    chartsAData: {
        xData:[],
        cidao: [],
        zaotui: []
      },
	    chartsBData: {
        xData: [],
        cidao: [],
        zaotui: []
      }
    }
  },
  created () {
    
  },
  watch: {
    monthYearData (val) {
      // 如果从后台返回数据成功开始渲染数据
      if (this.monthYearData.ret == 200) {
        // 异常月echarts图
        var myEChartsMonth = echarts.init(document.getElementById('month'))
        this.chartsAData.xData = val.xAxis // X轴
        this.chartsAData.cidao = val.lateArr // 迟到
        this.chartsAData.zaotui = val.leaveNumArr // 早退

        // 异常年echarts图
        var myEChartsYear = echarts.init(document.getElementById('year'))
        this.chartsBData.xData = val.xxAxis // X轴
        this.chartsBData.cidao = val.xxlateArr // 迟到
        this.chartsBData.zaotui = val.xxleaveNumArr // 早退

        // 渲染echarts图
        this.renderEcharts(myEChartsMonth, this.chartsAData)
        this.renderEchartsB(myEChartsYear, this.chartsBData)
      }
    }
  },
  mounted () {},
  methods: {
    renderEcharts (myChart, data) {
      var option = {
        legend: {
          data: ['迟到', '早退'],
          show: true,
          itemWidth: 20, // 设置图例的宽高
          itemHeight: 10,
          textStyle: { // 标题颜色
            color: '#fff'
          },
          top: 10,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: { top: '25%', left: '12%', right: '2%', bottom: 40 },
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            axisLine: { // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#56aefb',
                width: '1'
              }
            },
            axisLabel : {
              formatter: '{value}',
              textStyle: {
                color: '#2fdaeb'
              }
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel: {
              interval: 3,
              showMaxLabel: true, //是否显示最大 tick 的 label
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: data.maxY,
            // interval: data.intervalY,
            axisLine: { // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#55aefb',
                width: '1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#556BA2'
              },
              showMinLabel: true, // 是否显示最小 tick 的 label
              showMaxLabel: true, // 是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { // 网格线
              show: false,
              lineStyle: {
                color: ['#2DD7EC'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '迟到',
            type: 'bar',
            data: data.cidao,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#fd87a7'},
                    {offset: 0.5, color: '#e45a88'},
                    {offset: 1, color: '#c82867'}
                  ]
                ),
				        barBorderRadius: 4
              }
            },
            barWidth: 4, // 控制柱子的宽度
            barGap:'10%' // 控制柱子的间隔
          },
          {
            name: '早退',
            type: 'bar',
            data: data.zaotui,
            itemStyle: {
              normal: {
				        color: new echarts.graphic.LinearGradient(
                  0,0,0,1,
                  [
                    {offset: 0,color: '#e8e31a'},
                    {offset: 0.5,color: '#fbbd07'},
                    {offset: 1,color: '#f8920e'}
                  ]
                ),
				        barBorderRadius: 4
              }
            },
            barWidth: 8, // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          }
        ]
      };
      myChart.setOption(option)
    },
	  renderEchartsB (myChart,data) {
      var option = {
        legend: {
          data: ['迟到','早退'],
          show: true,
          itemWidth: 20, //设置图例的宽高
          itemHeight: 10,
          textStyle: { //标题颜色
            color: "#fff"
          },
          top: 10,
          bottom: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {top: '25%',left: '12%',right: '2%',bottom: 40},
        xAxis: [
          {
            type: 'category',
            data: data.xData,
            axisLine: {  // 控制x轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#56aefb',
                width: '1' }
            },
            axisLabel : {
              formatter: '{value}',
              textStyle: {
                color: '#2fdaeb'
              }
            },
            axisTick: { // 控制x轴坐标刻度不显示
              show: false
            },
            axisLabel: {
              interval: 0,
              showMaxLabel: true, //是否显示最大 tick 的 label
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: data.maxY,
            // interval: data.intervalY,
            axisLine: {  // 控制y轴线的样式
              lineStyle: {
                type: 'solid',
                color: '#55aefb',
                width:'1'
              }
            },
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#556BA2'
              },
              showMinLabel: true, //是否显示最小 tick 的 label
              showMaxLabel: true, //是否显示最大 tick 的 label
              verticalAlign: 'middle'
            },
            splitLine: { //网格线
              show: false,
              lineStyle:{
                color: ['#2DD7EC'],
                width: 1,
                type: 'dotted'
              }
            }
          }
        ],
        series: [
          {
            name: '迟到',
            type: 'bar',
            data: data.cidao,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,0,0,1,
                  [
                    {offset: 0,color: '#fd87a7'},
                    {offset: 0.5,color: '#e45a88'},
                    {offset: 1,color: '#c82867'}
                  ]
                ),
                barBorderRadius: 8,
              }
            },
            barWidth: 8, // 控制柱子的宽度
            barGap:'10%' // 控制柱子的间隔
          },
          {
            name:'早退',
            type:'bar',
            data:data.zaotui,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,0,0,1,
                  [
                    {offset: 0,color: '#e4aa00'},
                    {offset: 0.5,color: '#dd9000'},
                    {offset: 1,color: '#d67600'}
                  ]
                ),
                barBorderRadius: 8
              }
            },
            barWidth: 8, // 控制柱子的宽度
            barGap: '20%' // 控制柱子的间隔
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/home';
</style>
