function fun_Chart_MonthCount(year,data,dataLastYear){
    var myChart = echarts.init(document.getElementById('chart_line'));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        color:['#0040FF','#F7D358'],
        legend: {
            data:['今年','去年'],
            selected: {
               '今年': true,
               '去年': false 
            }

        },
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            type: 'value',
            splitLine:{
               lineStyle:{
                   color:"#eee"
               } 
            },
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            }
        },
        grid: {
            // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
            left: '6%', // 默认10%，给24就挺合适的。
            top: '8%', // 默认60
            right: '15%', // 默认10%
            bottom: 60, // 默认60
            width:'95%', // grid 组件的宽度。默认自适应。
            height:'80%', 
          },
        series: [{
                name:"去年",
                smooth: true,
                data: [820, 932, 901, 934, 1290, 1330, 1320, 934, 1290, 1330, 1320,25],
                type: 'line',
                symbol: "none",
                itemStyle: {
                    normal: {
                        color:'rgba(127,213,33,1)',
                        lineStyle: {
                            color: "rgba(127,213,33,1)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(127,213,33,0.35)'
                            }, {
                                offset: 1,
                                color: 'rgba(127,213,33,0.8)'
                            }]),
                        }
                    }
                },
            },
            {
                name:"今年",
                smooth: true,
                data: [720, 932, 61, 434, 1890, 1530, 1620, 1890, 1530, 1620, 1530, 1620],
                type: 'line',
                symbol: "none",
                itemStyle: {
                    normal: {
                        color:'rgba(69,130,255,1)',
                        lineStyle: {
                            color: "rgba(69,130,255,1)",
                            width:1
                        },
                        areaStyle: { 
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(69,130,255,0.35)'
                            }, {
                                offset: 1,
                                color: 'rgba(69,130,255,0.8)'
                            }]),
                        }
                    }
                },
            }
        ]
    };
    myChart.setOption(option);
}
function fun_Chart_DeptCount(year,data,dataLastYear){
    var myChart = echarts.init(document.getElementById('chart_orgs'));
    var index = 0;
    var colorList = ['#f36c6c', '#e6cf4e', '#20d180', '#0093ff'];
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            show: false
        },
        grid: {
            left: 50,
            top:0,
            bottom:0
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'value',

            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            }

        },
        yAxis: {
            type: 'category',
            inverse: true,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisPointer: {
                label: {
                    show: true,
                    margin: 30
                }
            },
            data: ['东营市', '垦利区', '广饶县', '东营区', '利津区'],
            axisLabel: {
                margin: 50, 
                fontSize: 14,
                align: 'left',
                color: '#333'
                 
            }
        },
        series: [{
                z: 2,
                name: '本月发布量',
                type: 'bar',
                barMaxWidth : 30,//柱图宽度
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 27
                    },
                    normal: {
                        barBorderRadius: 27
                    }
                },
                data: [3.66, 2.86, 1.82, 1.8, 1.53].map((item, i) => {
                    itemStyle = {
                        color: i > 3 ? colorList[3] : colorList[i]
                    }
                    return {
                        value: item,
                        itemStyle: itemStyle
                    };
                }),
                label: {
                    show: true,
                    position: 'right',
                    color: '#333333',
                    fontSize: 14,
                    offset: [10, 0]
                }
            }

        ]
    };
    myChart.setOption(option);
}
$(function(){
    fun_Chart_MonthCount()
    fun_Chart_DeptCount()
})