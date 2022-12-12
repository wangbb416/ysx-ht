// 小蓝之家类型
export const statusOptions = [
  { label: '沿海', value: 1 },
  { label: '海岛', value: 2 }
]

// 清运单状态
export const transportStatusOptions = [
  { label: '待发车', value: 1 },
  { label: '运输中', value: 2 },
  { label: '已完成', value: 3 }
]

// 清运单调度状态
export const transportDispatchStatusOptions = [
  { label: '待发车', value: 1 },
  { label: '收集中', value: 2 },
  { label: '运输中', value: 3 },
  { label: '已结束', value: 4 },
  { label: '异常', value: 5 }
]

// 海塑种类
// export const seaPlasticType = [
//     {label: "透明PET", value: 101},
//     {label: "绿色PET", value: 102},
//     {label: "蓝色PET", value: 103},
//     {label: "杂色PET", value: 109},
// ]

// 清运状态
export const clearTransportStatus = [
  { label: '待申请清运', value: 1 },
  { label: '清运待审核', value: 2 },
  { label: '清运已通过', value: 3 },
  { label: '清运已驳回', value: 4 },
]
// 审核状态
export const applyStatus = [
  { label: '待审核', value: 1 },
  { label: '已通过', value: 2 },
  { label: '未通过', value: 3 }
  // {label: "完成收集", value: 4},
]

// 日期选择
export const dateOptions = [
  { label: '本周', value: 1 },
  { label: '本月', value: 2 },
  { label: '本季度', value: 3 }
]

/* ----------------- 状态事件 --------------- */

// 建议三个选项以上
export function datafiltering(value, arr) {
  // console.log(arr.find(item => item.value == value));
  let res = arr.find(item => item.value == value)
  return res ? res : {}
}
