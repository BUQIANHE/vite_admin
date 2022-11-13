<script lang="ts" name="index" setup>
import * as echarts from 'echarts'
import { useAppStore } from '@/pinia'

const appStore = useAppStore()

const { userName, nickName } = appStore.userInfo
const name = computed(() => (userName ? userName : nickName ? nickName : '游客'))

let theme = ref<string>('light')
watchEffect(() => {
  const { isDark } = appStore.golbalSettings
  if (isDark) {
    theme.value = 'dark'
  } else {
    theme.value = 'light'
  }
})

const timerInfo = reactive({
  greetings: '',
  dateTime: ''
})
const timer = () => {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth()
  const day = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  if (hour >= 0 && hour < 12) {
    timerInfo.greetings = '上午好'
  } else if (hour >= 12 && hour <= 18) {
    timerInfo.greetings = '下午好'
  } else {
    timerInfo.greetings = '晚上好'
  }

  const Mon = month < 9 ? `0${month + 1}` : month + 1
  const Min = minute < 10 ? `0${minute}` : minute
  const Sec = second < 10 ? `0${second}` : second
  timerInfo.dateTime = `${year}-${Mon}-${day} ${hour}:${Min}:${Sec}`
}

const salesData = reactive({
  name: '总销售额',
  total: '￥126,560',
  desc: '日均销售额',
  descNum: '￥234.56',
  bodyClassName: 'jfs'
})

const accessData = reactive({
  name: '访问量',
  total: '8,846',
  desc: '日访问量',
  descNum: '1,234'
})

const payData = reactive({
  name: '支付笔数',
  total: '6,560',
  desc: '转化率',
  descNum: '60%'
})

const effectData = reactive({
  name: '运营活动效果',
  total: '78%'
})

const memberList: any[] = [
  {
    size: 60,
    leftPic: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    name: '史努比',
    desc: '35分钟前加入了我们',
    rightIcon: 'ArrowRightBold'
  },
  {
    size: 60,
    leftPic: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    name: '史努比',
    desc: '35分钟前加入了我们',
    rightIcon: 'ArrowRightBold'
  },
  {
    size: 60,
    leftPic: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    name: '史努比',
    desc: '35分钟前加入了我们',
    rightIcon: 'ArrowRightBold'
  },
  {
    size: 50,
    leftIcon: 'UserFilled',
    name: '史努比',
    desc: '31分钟前加入了我们'
  },
  {
    size: 50,
    name: '史努比',
    desc: '31分钟前加入了我们'
  },
  {
    size: 50,
    name: '史努比',
    desc: '31分钟前加入了我们'
  }
]

const accessNum = () => {
  const myDom = document.getElementById('access')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  myChart.setOption({
    backgroundColor: 'transparent',
    grid: {
      top: 0,
      left: -30,
      right: -30,
      bottom: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: [120, 932, 411, 649, 190, 360, 820],
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#80ffa5'
            },
            {
              offset: 1,
              color: '#01bfec'
            }
          ])
        }
      }
    ]
  })
}

const payNum = () => {
  const myDom = document.getElementById('pay')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  myChart.setOption({
    backgroundColor: 'transparent',
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      show: false,
      data: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: [120, 932, 401, 563, 190, 360, 820, 1120, 450, 562],
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#f2c94c'
            },
            {
              offset: 1,
              color: '#cc5333'
            }
          ])
        }
      }
    ]
  })
}

const effectRatio = () => {
  const myDom = document.getElementById('effect')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  const bgColor = theme.value === 'light' ? '#eee' : 'rgba(51, 51, 51, 0.4)'

  myChart.setOption({
    backgroundColor: 'transparent',
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    xAxis: { show: false, name: 'value', max: 100 },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        barWidth: 20,
        data: [78],
        showBackground: true,
        backgroundStyle: {
          color: bgColor
        },
        label: {
          show: true,
          position: 'right',
          offset: [-13, -20],
          color: '#0052d4',
          fontSize: 16,
          formatter: () => {
            return '▼'
          }
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#9cecfb'
            },
            {
              offset: 1,
              color: '#0052d4'
            }
          ])
        }
      }
    ]
  })
}

const salesChart = () => {
  const myDom = document.getElementById('salesChart')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  myChart.setOption({
    backgroundColor: 'transparent',
    grid: {
      top: 30,
      left: 30,
      right: 30,
      bottom: 40
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params: any) {
        return params[0].name + ': ' + params[0].value
      }
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      data: [
        '点',
        '击',
        '柱',
        '子',
        '或',
        '者',
        '两',
        '指',
        '在',
        '触',
        '屏',
        '上',
        '滑',
        '动',
        '能',
        '够',
        '自',
        '动',
        '缩',
        '放'
      ]
    },
    yAxis: {
      type: 'value',
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: [
          220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123,
          125, 220
        ],
        smooth: true,
        lineStyle: {
          width: 0
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#667eea'
            },
            {
              offset: 1,
              color: '#764ba2'
            }
          ])
        }
      }
    ]
  })
}

const addChart = () => {
  const myDom = document.getElementById('addChart')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  const areaThemeStyle = theme.value === 'dark' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'
  const textColor = theme.value === 'dark' ? '#fff' : '#666'

  myChart.setOption({
    backgroundColor: 'transparent',
    color: ['#00c2ff', '#f9cf67', '#e92b77'],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    legend: {
      orient: 'vertical',
      top: 0,
      right: 0,
      data: ['分配预算', '实际支出'],
      textStyle: {
        fontSize: 14
      }
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '销售', max: 6500 },
        { name: '管理', max: 16000 },
        { name: '信息技术', max: 30000 },
        { name: '客户支持', max: 38000 },
        { name: '发展', max: 52000 },
        { name: '市场营销', max: 25000 }
      ],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['transparent', 'transparent']
        }
      },
      axisLine: {
        lineStyle: {
          color: textColor
        }
      },
      splitLine: {
        lineStyle: {
          color: textColor,
          width: 1
        }
      }
    },
    series: [
      {
        name: '预算vs支出',
        type: 'radar',
        emphasis: {
          itemStyle: {
            lineStyle: {
              width: 3
            }
          }
        },
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '分配预算',
            label: {
              show: true,
              position: 'top',
              distance: 2,
              color: textColor,
              textBorderColor: 'transparent',
              formatter: function (params: any) {
                return params.value
              }
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#00c2ff'
                },
                {
                  offset: 0.5,
                  color: areaThemeStyle
                },
                {
                  offset: 1,
                  color: '#00c2ff'
                }
              ])
            }
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '实际支出',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#f9cf67'
                },
                {
                  offset: 0.5,
                  color: areaThemeStyle
                },
                {
                  offset: 1,
                  color: '#f9cf67'
                }
              ])
            }
          }
        ]
      }
    ]
  })
}

const payChart = () => {
  const myDom = document.getElementById('payChart')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  const pathSymbols = {
    reindeer:
      'path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z',
    plane:
      'path://M1.112,32.559l2.998,1.205l-2.882,2.268l-2.215-0.012L1.112,32.559z M37.803,23.96 c0.158-0.838,0.5-1.509,0.961-1.904c-0.096-0.037-0.205-0.071-0.344-0.071c-0.777-0.005-2.068-0.009-3.047-0.009 c-0.633,0-1.217,0.066-1.754,0.18l2.199,1.804H37.803z M39.738,23.036c-0.111,0-0.377,0.325-0.537,0.924h1.076 C40.115,23.361,39.854,23.036,39.738,23.036z M39.934,39.867c-0.166,0-0.674,0.705-0.674,1.986s0.506,1.986,0.674,1.986 s0.672-0.705,0.672-1.986S40.102,39.867,39.934,39.867z M38.963,38.889c-0.098-0.038-0.209-0.07-0.348-0.073 c-0.082,0-0.174,0-0.268-0.001l-7.127,4.671c0.879,0.821,2.42,1.417,4.348,1.417c0.979,0,2.27-0.006,3.047-0.01 c0.139,0,0.25-0.034,0.348-0.072c-0.646-0.555-1.07-1.643-1.07-2.967C37.891,40.529,38.316,39.441,38.963,38.889z M32.713,23.96 l-12.37-10.116l-4.693-0.004c0,0,4,8.222,4.827,10.121H32.713z M59.311,32.374c-0.248,2.104-5.305,3.172-8.018,3.172H39.629 l-25.325,16.61L9.607,52.16c0,0,6.687-8.479,7.95-10.207c1.17-1.6,3.019-3.699,3.027-6.407h-2.138 c-5.839,0-13.816-3.789-18.472-5.583c-2.818-1.085-2.396-4.04-0.031-4.04h0.039l-3.299-11.371h3.617c0,0,4.352,5.696,5.846,7.5 c2,2.416,4.503,3.678,8.228,3.87h30.727c2.17,0,4.311,0.417,6.252,1.046c3.49,1.175,5.863,2.7,7.199,4.027 C59.145,31.584,59.352,32.025,59.311,32.374z M22.069,30.408c0-0.815-0.661-1.475-1.469-1.475c-0.812,0-1.471,0.66-1.471,1.475 s0.658,1.475,1.471,1.475C21.408,31.883,22.069,31.224,22.069,30.408z M27.06,30.408c0-0.815-0.656-1.478-1.466-1.478 c-0.812,0-1.471,0.662-1.471,1.478s0.658,1.477,1.471,1.477C26.404,31.885,27.06,31.224,27.06,30.408z M32.055,30.408 c0-0.815-0.66-1.475-1.469-1.475c-0.808,0-1.466,0.66-1.466,1.475s0.658,1.475,1.466,1.475 C31.398,31.883,32.055,31.224,32.055,30.408z M37.049,30.408c0-0.815-0.658-1.478-1.467-1.478c-0.812,0-1.469,0.662-1.469,1.478 s0.656,1.477,1.469,1.477C36.389,31.885,37.049,31.224,37.049,30.408z M42.039,30.408c0-0.815-0.656-1.478-1.465-1.478 c-0.811,0-1.469,0.662-1.469,1.478s0.658,1.477,1.469,1.477C41.383,31.885,42.039,31.224,42.039,30.408z M55.479,30.565 c-0.701-0.436-1.568-0.896-2.627-1.347c-0.613,0.289-1.551,0.476-2.73,0.476c-1.527,0-1.639,2.263,0.164,2.316 C52.389,32.074,54.627,31.373,55.479,30.565z',
    rocket:
      'path://M-244.396,44.399c0,0,0.47-2.931-2.427-6.512c2.819-8.221,3.21-15.709,3.21-15.709s5.795,1.383,5.795,7.325C-237.818,39.679-244.396,44.399-244.396,44.399z M-260.371,40.827c0,0-3.881-12.946-3.881-18.319c0-2.416,0.262-4.566,0.669-6.517h17.684c0.411,1.952,0.675,4.104,0.675,6.519c0,5.291-3.87,18.317-3.87,18.317H-260.371z M-254.745,18.951c-1.99,0-3.603,1.676-3.603,3.744c0,2.068,1.612,3.744,3.603,3.744c1.988,0,3.602-1.676,3.602-3.744S-252.757,18.951-254.745,18.951z M-255.521,2.228v-5.098h1.402v4.969c1.603,1.213,5.941,5.069,7.901,12.5h-17.05C-261.373,7.373-257.245,3.558-255.521,2.228zM-265.07,44.399c0,0-6.577-4.721-6.577-14.896c0-5.942,5.794-7.325,5.794-7.325s0.393,7.488,3.211,15.708C-265.539,41.469-265.07,44.399-265.07,44.399z M-252.36,45.15l-1.176-1.22L-254.789,48l-1.487-4.069l-1.019,2.116l-1.488-3.826h8.067L-252.36,45.15z',
    train:
      'path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z',
    ship: 'path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z'
  }

  myChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },

      formatter: function (params: any) {
        return params[0].name + ': ' + params[0].value
      }
    },
    xAxis: {
      data: ['支付宝', '微信', '云闪付', '信用卡', '数字人民币'],
      axisTick: { show: false },
      axisLine: { show: false }
    },
    yAxis: {
      show: false
    },
    color: ['#667eea'],
    series: [
      {
        name: 'hill',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
          opacity: 0.5
        },
        emphasis: {
          itemStyle: {
            opacity: 1
          }
        },
        data: [123, 60, 25, 18, 12],
        z: 10
      },
      {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolSize: 50,
        symbolOffset: [0, '-120%'],
        data: [
          {
            value: 123,
            symbol: pathSymbols.reindeer,
            symbolSize: [60, 60]
          },
          {
            value: 60,
            symbol: pathSymbols.rocket,
            symbolSize: [50, 60]
          },
          {
            value: 25,
            symbol: pathSymbols.plane,
            symbolSize: [65, 35]
          },
          {
            value: 18,
            symbol: pathSymbols.train,
            symbolSize: [50, 30]
          },
          {
            value: 12,
            symbol: pathSymbols.ship,
            symbolSize: [50, 35]
          }
        ]
      }
    ]
  })
}

const operateChart = () => {
  const myDom = document.getElementById('operateChart')
  if (myDom === null) return
  echarts.dispose(myDom)

  const myChart = echarts.init(myDom!, theme.value, { renderer: 'svg' })
  const placeHolderStyle =
    theme.value === 'dark'
      ? {
          borderRadius: 0,
          color: '#fff',
          opacity: 0.1
        }
      : {
          borderRadius: 0,
          color: '#000',
          opacity: 0.1
        }

  myChart.setOption({
    backgroundColor: 'transparent',
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    legend: {
      orient: 'vertical',
      top: 0,
      right: 0,
      data: ['内容运营', '用户运营', '活动运营', '渠道运营'],
      textStyle: {
        fontSize: 14
      }
    },
    series: [
      {
        name: '内容运营',
        type: 'pie',
        radius: ['20%', '26%'],
        label: false,
        startAngle: 90,
        clockwise: true,
        itemStyle: {
          borderRadius: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#57FF86'
            },
            {
              offset: 1,
              color: '#3AA5C7'
            }
          ])
        },
        data: [
          { value: 1078 },
          {
            value: 400,
            emphasis: {
              scale: false
            },
            itemStyle: placeHolderStyle
          }
        ]
      },
      {
        name: '用户运营',
        type: 'pie',
        radius: ['36%', '42%'],
        label: false,
        startAngle: 270,
        clockwise: true,
        itemStyle: {
          borderRadius: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#A568FF'
            },
            {
              offset: 1,
              color: '#006CFF'
            }
          ])
        },
        data: [
          { value: 981 },
          {
            value: 900,
            emphasis: {
              scale: false
            },
            itemStyle: placeHolderStyle
          }
        ]
      },
      {
        name: '活动运营',
        type: 'pie',
        radius: ['52%', '58%'],
        label: false,
        startAngle: 180,
        clockwise: true,
        itemStyle: {
          borderRadius: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FFEA4F'
            },
            {
              offset: 1,
              color: '#F89212'
            }
          ])
        },
        data: [
          { value: 877 },
          {
            value: 500,
            emphasis: {
              scale: false
            },
            itemStyle: placeHolderStyle
          }
        ]
      },
      {
        name: '渠道运营',
        type: 'pie',
        radius: ['68%', '74%'],
        label: false,
        startAngle: 0,
        clockwise: true,
        itemStyle: {
          borderRadius: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#FF7671'
            },
            {
              offset: 1,
              color: '#A14AFF'
            }
          ])
        },
        data: [
          { value: 939 },
          {
            value: 200,
            emphasis: {
              scale: false
            },
            itemStyle: placeHolderStyle
          }
        ]
      }
    ]
  })
}

onMounted(() => {
  setInterval(() => timer(), 1000)
  nextTick(() => {
    accessNum()
    payNum()
    effectRatio()

    salesChart()
    addChart()
    payChart()
    operateChart()
  })
})

watch(
  () => theme.value,
  () => {
    nextTick(() => {
      accessNum()
      payNum()
      effectRatio()

      salesChart()
      addChart()
      payChart()
      operateChart()
    })
  }
)
</script>

<template>
  <div class="pages">
    <ul class="home_grid_container grid_list">
      <li class="item grid_item-3 welcome">
        <div class="welcome_pic">
          <img src="@/assets/welcome.svg" alt="welcome" />
        </div>
        <div class="welcome_info">
          <div class="title_box flex jsb aic">
            <h2 class="title">{{ name }}，{{ timerInfo.greetings }}！欢迎回来！</h2>
            <span class="dateTime">{{ timerInfo.dateTime }}</span>
          </div>
          <p class="desc">
            开源等于互助；开源需要大家一起来支持，支持的方式有很多种，比如使用、推荐、写教程、保护生态、贡献代码、回答问题、分享经验、打赏赞助等；欢迎您加入我们！
          </p>
        </div>
      </li>
      <li class="item grid_item-1 no_bg flex aic jcc wrap">
        <div class="coffee flex aic jcc">
          <img src="@/assets/coffee.svg" alt="coffee" />
        </div>
        <span>小憩片刻！</span>
      </li>

      <li class="item grid_item-1 sales_num">
        <SmallCard v-bind="salesData">
          <template #body>
            <p class="info">
              周同比<span class="num top">12%</span><span class="icon top">↑</span>
            </p>
            <p class="info">
              日同比<span class="num down">11%</span><span class="icon down">↓</span>
            </p>
          </template>
        </SmallCard>
      </li>
      <li class="item grid_item-1 access_num">
        <SmallCard v-bind="accessData">
          <template #body>
            <div id="access" style="width: 100%; height: 80px" />
          </template>
        </SmallCard>
      </li>
      <li class="item grid_item-1 pay_num">
        <SmallCard v-bind="payData">
          <template #body>
            <div id="pay" style="width: 100%; height: 80px" />
          </template>
        </SmallCard>
      </li>
      <li class="item grid_item-1 effect_num">
        <SmallCard v-bind="effectData">
          <template #body>
            <div id="effect" style="width: 100%; height: 80px" />
          </template>
          <template #footer>
            <p class="info">
              周同比<span class="num top">12%</span><span class="icon top">↑</span> 日同比<span
                class="num down"
                >80%</span
              ><span class="icon down">↓</span>
            </p>
          </template>
        </SmallCard>
      </li>

      <li class="item grid_item-1-1 no_padding">
        <Card title="销售额增长情况">
          <template #chart>
            <div id="salesChart" style="width: 100%; height: 500px"></div>
          </template>
        </Card>
      </li>
      <li class="item grid_item-1-1 no_padding">
        <Card title="访问增长情况">
          <template #chart>
            <div id="addChart" style="width: 100%; height: 500px"></div>
          </template>
        </Card>
      </li>

      <li class="item grid_item-1 no_padding">
        <Card title="刚刚加入的会员">
          <template #body>
            <List :list="memberList" :height="540" />
          </template>
        </Card>
      </li>

      <li class="item grid_item-2 no_padding">
        <Card title="支付来源">
          <template #chart>
            <div id="payChart" style="width: 100%; height: 500px"></div>
          </template>
        </Card>
      </li>
      <li class="item grid_item-2 no_padding">
        <Card title="运营情况">
          <template #chart>
            <div id="operateChart" style="width: 100%; height: 500px"></div>
          </template>
        </Card>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.grid_item-1 {
  grid-column-start: span 6;
}

.grid_item-1-1 {
  grid-column-start: span 9;
}

.grid_item-2 {
  grid-column-start: span 12;
}

.grid_item-3 {
  grid-column-start: span 18;
}

.grid_item-4 {
  grid-column-start: span 24;
}

.grid_list {
  padding: 0 0 20px;
  margin: 0;

  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 20px;

  .item {
    background: var(--el-bg-color-overlay);
    border-radius: var(--el-border-radius-base);
    padding: var(--el-menu-level-padding);
    transition: var(--el-transition-all);
    .welcome_info {
      .title {
        margin: 0;
        padding: var(--el-menu-level-padding);
      }
    }
    &.no_padding {
      padding: 0;
    }
    &.sales_num {
      :deep(.total) {
        color: var(--el-color-success);
      }

      .info {
        margin-right: var(--el-menu-level-padding);
      }

      .num {
        margin: 0 10px;
      }
      .top {
        color: var(--el-color-danger);
      }

      .down {
        color: var(--el-color-success);
      }

      .icon {
        font-weight: 600;
      }
    }
    &.access_num {
      :deep(.total) {
        background: linear-gradient(to right, #80ffa5, #01bfec);
        -webkit-background-clip: text;
      }
    }
    &.pay_num {
      :deep(.total) {
        background: linear-gradient(to right, #f2c94c, #cc5333);
        -webkit-background-clip: text;
      }
    }
    &.effect_num {
      :deep(.total) {
        background: linear-gradient(to right, #9cecfb, #0052d4);
        -webkit-background-clip: text;
      }

      .info {
        margin: 0;

        span {
          color: var(--el-color-success);
        }

        .num {
          margin: 0 10px;
        }

        .top {
          color: var(--el-color-danger);
        }

        .down {
          color: var(--el-color-success);
        }

        .icon {
          font-weight: 600;
        }
      }
    }
    &:hover {
      box-shadow: var(--el-box-shadow);
    }
  }

  .welcome {
    display: flex;
    justify-content: flex-start;
    align-content: center;

    &_pic {
      width: 180px;
      margin-right: var(--el-menu-level-padding);

      img {
        width: inherit;
      }
    }

    .title {
      color: var(--el-color-primary);
    }
  }

  .no_bg {
    background: transparent;

    .coffee {
      width: 100%;

      img {
        width: 100px;
      }
    }
  }
}
</style>
