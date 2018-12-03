<template>
	<div class="home_abnormal">
		<div class="home_abnormal-item">
			<p class="home_title">人员考勤日统计</p>
			<div class="day" id="statistics-day-echarts"></div>
		</div>
		<div class="home_abnormal-item">
			<p class="home_title">人员考勤月统计</p>
			<div class="month" id="statistics-mouth-echarts">

			</div>
		</div>
		<div class="home_abnormal-item">
			<p class="home_title">人员考勤年统计</p>
			<div class="year" id="statistics-year-echarts">

			</div>
		</div>
	</div>
</template>

<script>
	var echarts = require('echarts');
	export default {
    name: 'Attendance',
    props: ['dayInfo','monthInfo','yearInfo'],
    watch: {
      // 人员考勤日统计数据
      dayInfo (val) {
        // 如果从后台返回数据成功开始渲染数据
        if (this.dayInfo && this.dayInfo.ret == 200) {
          // 日echarts图
          var dayEchartsRight = echarts.init(document.getElementById("statistics-day-echarts"));
          this.dayEchartsRightData = {
            time: val.xAxis,
            shangganglv: val.practicalVal,
            shanggangren: val.practical,
            max: val.max,
            interval: val.interval,
            maxRight: this.max(val.practicalVal),
            xAxisLabelInterval: 3
          }
          this.renderEcharts(dayEchartsRight, this.dayEchartsRightData)
        }
      },
      // 人员考勤月统计数据
      monthInfo (val) {
        if (this.monthInfo && this.monthInfo.ret == 200) {
          // 月echarts图
          var monthEchartsRight = echarts.init(document.getElementById("statistics-mouth-echarts"));
          this.monthEchartsRightData = {
            time: val.xAxis,
            shangganglv: val.practicalVal,
            shanggangren: val.practical,
            max: val.max,
            interval: val.interval,
            maxRight: this.max(val.practicalVal),
            xAxisLabelInterval: 3
          }
          this.renderEcharts(monthEchartsRight, this.monthEchartsRightData)
        }
      },
      // 人员考勤年统计数据
      yearInfo (val) {
        if (this.yearInfo && this.yearInfo.ret == 200) {
          // 年echarts图
          var yearEchartsRight = echarts.init(document.getElementById("statistics-year-echarts"));
          this.yearEchartsRightData = {
            time: val.xAxis,
            shangganglv: val.practicalVal,
            shanggangren: val.practical,
            max: val.max,
            interval: val.interval,
            maxRight: this.max(val.practicalVal),
            xAxisLabelInterval: 0
          }
          this.renderEcharts(yearEchartsRight, this.yearEchartsRightData)
        }
      }
    },
	  data () {
      return {
        arr: [
          {
            name: '考勤率',
            icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAMAAACDi47UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjQ3NjZBN0JGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjQ3NjZBN0NGNDY5MTFFOEJCNjM4QzFDNjc4NzQyM0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNDc2NkE3OUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNDc2NkE3QUY0NjkxMUU4QkI2MzhDMUM2Nzg3NDIzRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po8SnNMAAAA/UExURf/LF//NF//eHP/KFv/SGf/OGP/aG//UGf/WGv/jHv/rIP/IFv/QGP/YGv/lHv/pH//cHP/nH//hHf/tIP///9HlZOcAAAAVdFJOU///////////////////////////ACvZfeoAAAAqSURBVHjaYhDBAhiIFxTm4hfk4xRiEmDj5WBn4WFlZGDmplSQMicBBBgAF/kMWUwXodQAAAAASUVORK5CYII='
          },
          '考勤人数（人）'
        ],

        // 日统计
        dayEchartsRightData: {
          time: '',
          shangganglv: '',
          shanggangren: '',
          max: '',
          interval: '',
          maxRight: '',
          xAxisLabelInterval: 3
        },

        // 月统计
        monthEchartsRightData:{
          time: '',
          shangganglv: '',
          shanggangren: '',
          max: '',
          interval: '',
          maxRight: '',
          xAxisLabelInterval: 3
        },

        //年统计
        yearEchartsRightData:{
          time: '',
          shangganglv: '',
          shanggangren: '',
          max: '',
          interval: '',
          maxRight: '',
          xAxisLabelInterval: 3
        }
      }
    },
	  methods:{
      renderEcharts(myChart,data){
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data:this.arr,
            show:true,
            itemWidth:20,  //设置图例的宽高
            itemHeight:10,
            textStyle: {
              fontWeight: "normal",              //标题颜色
              color: "#fff"
            }
          },
          grid:{
            x:30,
            y:30,
            x2:42,
            y2:40
          },

          xAxis: [
            {
              type: 'category',
              data:data.time,
              // data:this.dayXTime,
              axisLine: {  // 控制x轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#56affb',
                  width:'1' }
              },
              axisPointer: {
                type: 'shadow'
              },
              axisTick: { // 控制x轴坐标刻度不显示
                show: false
              },
              axisLabel : {
                formatter: '{value}',
                textStyle: {
                  color: '#2DD7EC'
                },
                interval: data.xAxisLabelInterval,
                showMaxLabel: true, //是否显示最大 tick 的 label
              },
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '',
              // min: 0,
              max: data.max,
              interval: data.interval,
              axisLine: {  // 控制y轴线的样式
                lineStyle: {
                  type: 'solid',
                  color: '#56AFFB',
                  width:'1' }
              },
              axisLabel: {
                formatter: '{value} ',
                textStyle: {
                  color: '#556BA2'
                }
              },
              splitLine: { //网格线
                show: false,
                lineStyle:{
                  color: ['#56AFFB'],
                  width: 1,
                  type: 'dotted'
                }
              }
            },
            {
              type: 'value',
              name: '',
              min: 0,
              max: data.maxRight,
              smooth:true,
              axisLabel: {
                formatter: '{value} %',
                textStyle: {
                  color: '#556BA2'
                }
              },
              axisLine: {  // 控制y轴线%的样式
                lineStyle: {
                  type: 'solid',
                  color: '#23BBEC',
                  width:'1' }
              },
              splitLine: {
                show: false,
                lineStyle:{
                  color: ['#56AFFB'],
                  width: 1,
                  type: 'dotted'
                }
              }
            },
          ],
          series: [
            {
              name: '考勤率',
              icon:'rect',
              type: 'line',
              yAxisIndex: 1,
              smooth: true,
              symbol: 'none',
              data:data.shangganglv,
              itemStyle: {
                normal: {
                  color: 'rgba(255,235,12, 1)',//这里修改了柱子的颜色以及透明度，注意如果要修改透明度，一定要配置在itemStyle里面，直接写在外面不起作用。
                  lineStyle: {        // 系列级个性化折线样式
                    width: 3,
                    type: 'solid',
                  }
                }
              }
            },
            {
              name: '考勤人数（人）',
              type: 'bar',
              radius: '10%',
              data: data.shanggangren,
              itemStyle: {
                normal: {
                  barBorderRadius: [4, 4, 4, 4],
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2cd3ec'},
                      {offset: 0.5, color: '#32a6e9'},
                      {offset: 1, color: '#387de6'}
                    ])
                }
              },
              barWidth: 8, // 控制柱子的宽度
              barGap:'50%', // 控制柱子的间隔
            }
          ]
        };
        myChart.setOption(option, true);

      },
      // 获取数组中最大值
      max (arr) {
        var max = parseInt(arr[0])
        for(var i=1;i<arr.length;i++){
          if(parseInt(arr[i])>max){
            max = arr[i]
          }
        }
        return max
      }
	  },
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/home';
</style>
