
import * as echart from 'echarts'
import Overlay from "ol/Overlay"
// 数据准备
var  regionpoints = [
    { name: '渭南市', postion: [109.867031474, 34.724323124], code: 610500, id: 1,
    data:[{name:'第一类',value:10},{name:'第二类',value:23},{name:'第三类',value:55},{name:'第四类',value:134},{name:'第五类',value:124}] },
    { name: '安康市', postion: [109.012492169, 32.681039469], code: 610900, id: 2 ,
    data:[{name:'第一类',value:50},{name:'第二类',value:3},{name:'第三类',value:85},{name:'第四类',value:54},{name:'第五类',value:104}]},
    { name: '汉中市', postion: [107.034850682, 33.071781185], code: 610700, id: 3,
    data:[{name:'第一类',value:2},{name:'第二类',value:23},{name:'第三类',value:45},{name:'第四类',value:34},{name:'第五类',value:14}] },
    { name: '商洛市', postion: [109.913558246, 33.873216406], code: 611000, id: 4,
    data:[{name:'第一类',value:20},{name:'第二类',value:23},{name:'第三类',value:45},{name:'第四类',value:84},{name:'第五类',value:54}]},
    { name: '宝鸡市', postion: [107.238082792, 34.351822526], code: 610300, id: 5, 
    data:[{name:'第一类',value:10},{name:'第二类',value:23},{name:'第三类',value:45},{name:'第四类',value:34},{name:'第五类',value:14}]},
    { name: '杨凌区', postion: [108.018105781, 34.293747797], code: 615000, id: 6, 
    data:[{name:'第一类',value:70},{name:'第二类',value:123},{name:'第三类',value:45},{name:'第四类',value:34},{name:'第五类',value:14}]},
    { name: '铜川市', postion: [108.942877875, 35.176298606], code: 610200, id: 7, 
    data:[{name:'第一类',value:20},{name:'第二类',value:23},{name:'第三类',value:45},{name:'第四类',value:34},{name:'第五类',value:14}]},
    { name: '韩城市', postion: [110.428889125, 35.594928718], code: 613000, id: 8, 
    data:[{name:'第一类',value:20},{name:'第二类',value:13},{name:'第三类',value:45},{name:'第四类',value:64},{name:'第五类',value:114}]},
    { name: '延安市', postion: [109.481793209, 36.645047056], code: 610600, id: 9, 
    data:[{name:'第一类',value:80},{name:'第二类',value:83},{name:'第三类',value:45},{name:'第四类',value:34},{name:'第五类',value:4}]},
    { name: '榆林市', postion: [109.728507393, 38.283560513], code: 610800, id: 10, 
    data:[{name:'第一类',value:20},{name:'第二类',value:3},{name:'第三类',value:45},{name:'第四类',value:34},{name:'第五类',value:14}]},
    { name: '咸阳市', postion: [108.400097282, 34.831968557], code: 610400, id: 11, 
    data:[{name:'第一类',value:20},{name:'第二类',value:23},{name:'第三类',value:5},{name:'第四类',value:74},{name:'第五类',value:14}]},
    { name: '西咸新区', postion: [108.809657576, 34.432135731], code: 612000, id: 12,
    data:[{name:'第一类',value:20},{name:'第二类',value:23},{name:'第三类',value:85},{name:'第四类',value:34},{name:'第五类',value:64}] },
    { name: '西安市', postion: [109.030671102,  34.141838499], code: 610100, id: 13, 
    data:[{name:'第一类',value:120},{name:'第二类',value:23},{name:'第三类',value:5},{name:'第四类',value:4},{name:'第五类',value:124}]}
  
  ];
// 数据组装
var option = {
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    toolbox:{
      show:true,
      feature : {
          mark : {show: true},
          magicType : {
              show: true,
              type: ['pie', 'funnel']
          },
      }
    },
    calculable: true,
    series: [{
        type: 'pie',
        radius: '60%',
        startAngle:'45',
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
                textStyle:{
                  color: '#000000',
                  fontWeight:'bold',
                  fontSize:16
                }
            }
        },
        lableLine: {
          normal: {
              show: false
          },
          emphasis: {
              show: false
          }
        },
        data:[]
    }]
};




//加载图层
export const loadEchartLayer=()=>{
    regionpoints.forEach(item => {
        var dom= document.createElement("div")
        dom.style="width:80px;height:80px"
        var chart = echart.init(dom);
        option.series[0].data=item.data;
        chart.setOption(option);
        
        var pie = new Overlay({
            id:"echart",
            position: item.postion,
            positioning: 'center-center',
            element: dom
        });
        window.$olMap.addOverlay(pie);
    })
}
//移除所有
export const removeOverlays=(id) =>{
    var overs=window.$olMap.getOverlays().getArray();
        for(let i = 0;i < overs.length;i++){
            if(overs[i].getId()===id){
                window.$olMap.removeOverlay(overs[i])
                i--
            }
        }
  }
