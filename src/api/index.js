//接口请求函数

import ajax from 'ajax'

//获取1小时显示的数据
export const reqhour = ({centername}) =>ajax('/sanyAttendanceData/getWorkIngEchartsData',{centername},type="POST")
