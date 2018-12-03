//更新状态


import Vue from 'Vue'

import {RECEIVE_HOUR} from './mutation-types'

export default {
  [RECEIVE_HOUR](state,{xAxis,dateStr,dateStrval}){
    state.xAxis = xAxis
    state.dateStr = dateStr
    state.dateStrval = dateStrval
  }
}
