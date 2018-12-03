import index from "../store";
<template>
  <div class="maching-center">
    <div class="home_head-btn" @click="bostmachcenter">加工中心</div>
    <div class="home_container" :class="{off:flag}">
      <header class="home_container_title">三一集团</header>
      <span class="close" @click="close"> X </span>
      <ul class="home_container_list">
        <li v-for="(centerItem,index) in centername" :key="index" :ref="index" @click="getCenterInfo(centerItem)">{{centerItem}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MachingCenter",
    data(){
      return{
        flag:true,  // 加工中心显示
        centername:['组装工作中心','钻具工作中心','机加工作中心','变幅工作中心','备料工作中心','桅杆工作中心','调试工作中心','设备工作中心','仓储配送工作中心','部件涂装工作中心']
      }
    },
    methods: {
      bostmachcenter(){
        this.flag = false
      },
      close(){
        this.flag = true
      },
      getCenterInfo(item){
        this.flag = true
        //调用发请求
        console.log("item:", item)
        this.$emit('selectName',item)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .maching-center{
    /*position: relative;*/
    width:25%;
    .home_head-btn{
      position: fixed;right:24px;top:35px;width:150px;height:44px;text-align: center;line-height: 44px;
      background-color:#1578cf;color:#fff;font-size:24px;border-radius: 5px;cursor: pointer;
    }
    .home_container{
      width: 25%;
      height: 900px;
      background-color: #032046;
      opacity: 0.9;
      position: absolute;
      top:90px;
      right: 0;
      z-index:100;
      text-align: center;
      &.off{
        display: none;
        transition: 1s;
      }
      &_title{
        color: yellow;
        font-size: 24px;
        margin-top: 60px;
      }
      .close{
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 30px;
        color: #1578CF;
        &:hover{
          cursor: pointer;
        }
      }
      &_list{
        width: 80%;
        margin: 0 auto;
        &>li{
          background-color:darkblue;
          height: 40px;line-height: 40px;border: 1px solid #3780E6;
          margin-top: 20px;
          color: deepskyblue;
          &:hover{
            border: 1px solid #00ffff;
            background-color: #3a8ee6;
            color: #fff;
            cursor: pointer;
          }
        }
      }
    }
  }

</style>
