//间接更新状态

import {reqhour} from '../api'

import {
  RECEIVE_HOUR,
} from '../store/mutation-types'



export default {

  async getHourData({commit},{centername}){
    const result = await reqhour({centername})
    if(result.ret === '200'){
      const {xAxis,dateStr,dateStrval} = result.data
      commit(RECEIVE_HOUR,{xAxis,dateStr,dateStrval})
    }
  }
}
