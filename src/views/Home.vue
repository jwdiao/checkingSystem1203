<template>
  <div class="home">
    <div class="home_head">
      <img src="../assets/images/logo.png" alt="logo">
      <p>三现数据制造体系人员管理系统-北京三一桩机</p>
      <!--<div class="home_head-btn" @click="bostmachcenter">加工中心</div>-->

    </div>
    <div class="home_layout">
        <AbnormalStatistics :info="baseInfo" :monthYearData="monthYearDataLeft" />

      <div class="home_con">

         <!--<Checking />-->
        <!-- <Checking /> -->
        <Checking :info="baseInfo" :hourEchartsDataBetween="hourEchartsDataBetween" />
      </div>
      <attendance :dayInfo="dayEchartsDataRight" :monthInfo="monthEchartsDataRight" :yearInfo="yearEchartsDataRight" />

    </div>
    <MachingCenter @selectName="selectedCenterName" />

  </div>
</template>

<script>
import echarts from 'echarts'
import AbnormalStatistics from '@/components/AbnormalStatistics'
import Attendance from '@/components/Attendance'
import Checking from '@/components/checking'
import http from '../api/http'
export default {
  name: 'home',
  components:{
	AbnormalStatistics,
    Attendance,
    Checking
  },
  data () {
    return {
      centername: '',
      baseInfo: {}, //基本信息
      monthYearDataLeft: {}, // 左侧异常年和月数据
      dayEchartsDataRight: {}, // 右侧日echarts图
      monthEchartsDataRight: {}, // 右侧月echarts图
      yearEchartsDataRight: {}, // 右侧年echarts图
      hourEchartsDataBetween: {}, // 中间一小时考勤
      timerId: ''
    }
  },
  created () {
    // this.$store.dispatch('getBaseDataAction')
    // setInterval(()=>{
    //   this.$store.dispatch('getBaseDataAction')
    // },10000)
  },
  mounted () {
    // 基本信息顶部
    this.getBaseInfoData(this.centername)

    // 左侧异常月和异常年
    this.getMonthYearLeftData (this.centername)

    // 右侧日/月/年统计
    this.getDayMonthYearRightData(this.centername, 'DAY')
    this.getDayMonthYearRightData(this.centername, 'MON')
    this.getDayMonthYearRightData(this.centername, 'YEAR')

    // 中间一小时echart图
    this.HourBetweenData(this.centername)

    // 定时器刷新
    this.timerId = setInterval(() =>{
      this.getBaseInfoData(this.centername)
      this.getMonthYearLeftData (this.centername)
      this.getDayMonthYearRightData(this.centername, 'DAY')
      this.getDayMonthYearRightData(this.centername, 'MON')
      this.getDayMonthYearRightData(this.centername, 'YEAR')
    },10000)
    this.timerIdHour = setInterval(() =>{
      this.HourBetweenData(this.centername)
    }, 30000)
  },
  methods: {
    // 基本信息顶部
    async getBaseInfoData (centername) {
      const res = await http.post('/sanyAttendanceData/getAttendanceData', {centername: centername})
      if (res.data && res.data.ret == 200) {
        this.baseInfo = res.data.titledata
      }
    },
    // 左侧异常月和异常年
    async getMonthYearLeftData (centername) {
      const res = await http.post('/sanyUserPushRecord/getLateEchartsData', {centername: centername})
      if (res.data && res.data.ret == 200) {
        this.monthYearDataLeft = res.data
      }
    },
    // 右侧人员考勤日/月/年统计
    async getDayMonthYearRightData (centername, querySign) {
      const res = await http.post('/sanyUserPushRecord/getWorkEchartsData', {centername: centername, querySign: querySign})
      if (res.data && res.data.ret == 200) {
        if (querySign === 'DAY') {
          this.dayEchartsDataRight = res.data
        }
        if (querySign === 'MON') {
          this.monthEchartsDataRight = res.data
        }
        if (querySign === 'YEAR') {
          this.yearEchartsDataRight = res.data
        }


      }
    },
    // 中间一小时echart图
    async HourBetweenData (centername) {
      const res = await http.post('/sanyAttendanceData/getWorkIngEchartsData', {centername: centername})
      if (res.data && res.data.ret == 200) {
        // console.log('between:',res.data)
        this.hourEchartsDataBetween = res.data
      }
    },
    selectedCenterName (centername) {
      // console.log('uu:',centername)
      this.centername = centername
      // 重新加载数据
      this.getBaseInfoData(this.centername)
      this.getMonthYearLeftData (this.centername)
      this.getDayMonthYearRightData(this.centername, 'DAY')
      this.getDayMonthYearRightData(this.centername, 'MON')
      this.getDayMonthYearRightData(this.centername, 'YEAR')
      this.HourBetweenData(this.centername)
    }
  },
  destroyed () {
    clearInterval(this.timerId)
    clearInterval(this.timerIdHour)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/css/home';
.home{
  background-image: url(../assets/images/BJ.png);
}
</style>
