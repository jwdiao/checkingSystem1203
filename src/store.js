import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseDataPerson: []
  },
  mutations: {
    getBaseDataMut (state,res) {
      state.baseDataPerson = res
    }
  },
  actions: {
    //获取 人员异常和人员考勤信息
    getBaseDataAction (context) {
      axios.post('/sanyAttendanceData/getAttendanceData', {
        centername: ''
      })
      .then((response) => {
        var res = response.data
        if (res.ret == 200) {
          var info = res.titledata
          context.commit('getBaseDataMut',info)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
})
