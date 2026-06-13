import * as echarts from 'echarts'

echarts.init(document.getElementById('line')).setOption({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 132, 101, 134, 90, 230, 210], type: 'line', smooth: true }],
})

echarts.init(document.getElementById('bar')).setOption({
  tooltip: {},
  xAxis: { data: ['手机', '电脑', '平板', '耳机', '手表'] },
  yAxis: {},
  series: [{ type: 'bar', data: [220, 180, 150, 320, 240], itemStyle: { color: '#1890ff' } }],
})

echarts.init(document.getElementById('pie')).setOption({
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
    },
  ],
})

echarts.init(document.getElementById('radar')).setOption({
  tooltip: {},
  radar: {
    indicator: [
      { name: '销售', max: 6500 },
      { name: '管理', max: 16000 },
      { name: '信息技术', max: 30000 },
      { name: '客服', max: 38000 },
      { name: '研发', max: 52000 },
      { name: '市场', max: 25000 },
    ],
  },
  series: [
    {
      type: 'radar',
      data: [
        { value: [4200, 3000, 20000, 35000, 50000, 18000], name: '预算' },
        { value: [5000, 14000, 28000, 26000, 42000, 21000], name: '实际' },
      ],
    },
  ],
})

window.addEventListener('resize', () => {
  ;['line', 'bar', 'pie', 'radar'].forEach((id) =>
    echarts.getInstanceByDom(document.getElementById(id))?.resize(),
  )
})
