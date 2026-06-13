import * as echarts from 'echarts'

// 时间显示
const timeEl = document.getElementById('time')
function updateTime() {
  timeEl.textContent = new Date().toLocaleString('zh-CN', { hour12: false })
}
updateTime()
setInterval(updateTime, 1000)

// KPI 数字滚动
const targets = { k1: 128549, k2: 38421, k3: 8732, k4: 1280392 }
Object.keys(targets).forEach((id) => {
  const el = document.getElementById(id)
  let cur = 0
  const target = targets[id]
  const step = target / 80
  const t = setInterval(() => {
    cur += step
    if (cur >= target) {
      cur = target
      clearInterval(t)
    }
    el.textContent = Math.floor(cur).toLocaleString()
  }, 25)
})

// 暗色主题
const dark = {
  textStyle: { color: '#c9d6ff' },
  axisLine: { lineStyle: { color: 'rgba(0,180,255,0.4)' } },
  splitLine: { lineStyle: { color: 'rgba(0,180,255,0.1)' } },
}

// 1. 用户增长折线
echarts.init(document.getElementById('c1')).setOption({
  grid: { top: 20, left: 40, right: 20, bottom: 24 },
  textStyle: dark.textStyle,
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    axisLine: dark.axisLine,
  },
  yAxis: { type: 'value', axisLine: dark.axisLine, splitLine: dark.splitLine },
  series: [
    {
      type: 'line',
      smooth: true,
      data: [820, 932, 901, 1334, 1290, 2300],
      itemStyle: { color: '#00e5ff' },
      areaStyle: { color: 'rgba(0,229,255,0.25)' },
    },
  ],
})

// 2. 设备饼图
echarts.init(document.getElementById('c2')).setOption({
  textStyle: dark.textStyle,
  legend: { bottom: 0, textStyle: { color: '#c9d6ff' } },
  series: [
    {
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '45%'],
      data: [
        { value: 1048, name: 'iOS' },
        { value: 735, name: 'Android' },
        { value: 380, name: 'Web' },
        { value: 200, name: '其他' },
      ],
      label: { color: '#c9d6ff' },
    },
  ],
})

// 3. 中央散点（模拟地理分布）
echarts.init(document.getElementById('c3')).setOption({
  textStyle: dark.textStyle,
  grid: { top: 20, left: 40, right: 20, bottom: 24 },
  tooltip: {},
  xAxis: { axisLine: dark.axisLine, splitLine: dark.splitLine },
  yAxis: { axisLine: dark.axisLine, splitLine: dark.splitLine },
  series: [
    {
      type: 'scatter',
      symbolSize: (v) => Math.sqrt(v[2]) * 4,
      data: Array.from({ length: 30 }, () => [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 60 + 10,
      ]),
      itemStyle: { color: '#00e5ff', opacity: 0.7, shadowBlur: 10, shadowColor: '#00e5ff' },
    },
  ],
})

// 4. 销售排行
echarts.init(document.getElementById('c4')).setOption({
  textStyle: dark.textStyle,
  grid: { top: 10, left: 60, right: 30, bottom: 20 },
  xAxis: { axisLine: dark.axisLine, splitLine: dark.splitLine },
  yAxis: {
    type: 'category',
    data: ['北京', '上海', '广州', '深圳', '杭州'],
    axisLine: dark.axisLine,
  },
  series: [
    {
      type: 'bar',
      data: [820, 932, 701, 1234, 990],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#0072ff' },
            { offset: 1, color: '#00e5ff' },
          ],
        },
      },
    },
  ],
})

window.addEventListener('resize', () => {
  ;['c1', 'c2', 'c3', 'c4'].forEach((id) =>
    echarts.getInstanceByDom(document.getElementById(id))?.resize(),
  )
})
