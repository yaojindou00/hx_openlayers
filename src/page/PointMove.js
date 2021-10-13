import Overlay from "ol/Overlay"
import Feature from "ol/Feature";

import { Point, LineString } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import {Icon,Stroke,Style} from "ol/style";
import {getDistance} from 'ol/sphere';
//移动车辆图标layer

var carOverLay;

//移动车辆图标路径

var carImageUrl = require("@/assets/cl.png");

//移动车辆速度

var moveSpeed = 30;//移动速度

//所有移动的坐标

var allMovePoints;

//所有移动的坐标索引

var allMovePointsIndex = 0;
var moving=null
var styles={
    route: new Style({
      // 线的样式
      stroke: new Stroke({
        width: 6,
        color: [237, 212, 0, 0.8]
      })
    }),
    start: new Style({
      // 设置开始标记样式
      image: new Icon({
        anchor: [0.5, 1],
        src: require("@/assets/jcc1.png")
      }),
      zIndex:10
    }),
    end: new Style({
      // 设置结束标记样式
      image: new Icon({
        anchor: [0.5, 1],
        src: require("@/assets/jcc2.png")
      }),
      zIndex:10
    }),
    
    work: new Style({
      // 设置结束标记样式
      image: new Icon({
        anchor: [0.5, 1],
        src: require("@/assets/jcc4.png")
      })
    })
  }




const createCarIcon=(x1,y1,x2,y2)=>{
	var carDiv = document.createElement('img');
	
	carDiv.id = "carImage";
	carDiv.src=carImageUrl
	
	// carDiv.innerHTML = html;
	
	document.body.appendChild(carDiv);
	
	carOverLay = new Overlay({
        id:"carpoint",
        position: [x1,y1],
        positioning: 'center',
        offset:[-12,-22],
        element:document.getElementById('carImage')
	});
	
  window.$olMap.addOverlay(carOverLay);

}

/**

* 根据坐标获取角度数，以正上方为0度作为参照

*/

function getAngle(lng_a,lat_a, lng_b, lat_b){
	var a = (90 - lat_b) * Math.PI / 180;
	
	var b = (90 - lat_a) * Math.PI / 180;
	
	var AOC_BOC = (lng_b - lng_a) * Math.PI / 180;
	
	var cosc = Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.cos(AOC_BOC);
	
	var sinc = Math.sqrt(1 - cosc * cosc);
	
	var sinA = Math.sin(a) * Math.sin(AOC_BOC) / sinc;
	
	var A = Math.asin(sinA) * 180 / Math.PI;
	
	var res = 0;
	
	if (lng_b > lng_a && lat_b > lat_a) res = A;
	
	else if (lng_b > lng_a && lat_b < lat_a) res = 180 - A;
	
	else if (lng_b < lng_a && lat_b < lat_a) res = 180 - A;
	
	else if (lng_b < lng_a && lat_b > lat_a) res = 360 + A;
	
	else if (lng_b > lng_a && lat_b == lat_a) res = 90;
	
	else if (lng_b < lng_a && lat_b == lat_a) res = 270;
	
	else if (lng_b == lng_a && lat_b > lat_a) res = 0;
	
	else if (lng_b == lng_a && lat_b < lat_a) res = 180;
	
	
	
	//res = res ;//减去图片默认角度
	
	return res;

}

const formatLength=(pointArray)=>{
	var length = 0;
	for (var i = 0, ii = pointArray.length - 1; i < ii; ++i) {
        var c1 = pointArray[i];
        
        var c2 =pointArray[i+1];
        
        length += getDistance(c1, c2);
	
	}
	return length;

}


const getCenterPoint=(pointDoubleArray,cell)=>{
	cell = cell == undefined ? 50 : cell;
	
	var twolength = formatLength(pointDoubleArray);
	
	var rate = twolength/cell; //比例 默认5m/点
	
	var step = Math.ceil(rate); //步数(向上取整)
	
	var arr = new Array(); //定义存储中间点数组
	
	var c1 = pointDoubleArray[0];//头部点
	
	var c2 = pointDoubleArray[1];//尾部点
	
	var x1 = c1[0],y1 = c1[1];
	
	var x2 = c2[0],y2 = c2[1];
	
	for (var i = 1;i<step;i++){
	
		var coor = {};
		
		coor.x = (x2-x1)*i/rate+x1;
		
		coor.y = (y2-y1)*i/rate+y1;
		
		arr.push(coor); //此时arr为中间点的坐标
	
	}

	arr.push(c2);
	
	return arr;

}


/*得到所有要移动的点位*/

const getAllMovePoint=(pointArray,cell)=>{
	cell = cell ==undefined ? 50 :cell;
	var brr = new Array();
	brr.push({x:pointArray[0][0],y:pointArray[0][1]}); //添加起点
	for (var i = 0;i < pointArray.length-1; i++) {
		var coor1 = pointArray[i];
		var coor2 = pointArray[i + 1];
		var crr = getCenterPoint([coor1,coor2],cell);
		for(var a=0;a<crr.length;a++){
			brr.push(crr[a]);
		}
	
	}
	
	return brr;

}



const showPoint=()=>{
//每次移动，根据两点坐标，图标旋转角度
	if(allMovePointsIndex+1 != allMovePoints.length){
      var  firstPoint = allMovePoints[allMovePointsIndex];
      var  secondPoint = allMovePoints[allMovePointsIndex+1];
        var transRotate = getAngle(firstPoint.x,firstPoint.y,secondPoint.x,secondPoint.y);
        document.getElementById('carImage').style.transform="rotate("+transRotate+"deg)"
        carOverLay.setPosition([allMovePoints[allMovePointsIndex].x,allMovePoints[allMovePointsIndex].y]); //设置小车位置
        allMovePointsIndex++;
	}

}
//添加车辆点线起始点
const addPointLine=(pointArray)=>{
    var route = new LineString(pointArray);
    var routeFeature = new Feature({
      type: "route",
      geometry: route
    });
    var startMarker = new Feature({
        type: "start",
        geometry: new Point(pointArray[0])
      });
    var endMarker = new Feature({
        type: "end",
        geometry: new Point(pointArray[pointArray.length - 1])
    });
    var  vectorLayer = new VectorLayer({
          id:"carlineandpoint",
          source: new VectorSource({
          features: [routeFeature,startMarker,endMarker]
        }),
        style: function(feature) {
          
          return styles[feature.get("type")];
        }
      });
     
      pointArray.forEach((item,index) => {
         if(index!==0&&index!==pointArray.length-1){
         vectorLayer.getSource().addFeature(new Feature({
                  type: "work",
                  geometry: new Point(item)
              })) 
         }
      });
      window.$olMap.addLayer(vectorLayer)

}

export const move=()=>{
  var  pointArray= [
    
        [108.83476768752418, 34.08385299388422],
        [108.83476768752418, 34.28385299388422],
          [108.90476768752418, 34.38385299388422],
           [108.93476768752418, 34.08385299388422], 
           [108.96476768752418, 34.08385299388422],
            [108.83476768752418, 34.08385299388422],
        [109.23491813875425, 35.18394894013734],
        [109.43504349233812, 35.28408332210981]
    ]
   
    addPointLine(pointArray)

   //创建汽车初始点位,首先传2个坐标，为了将图标按照轨迹路线，进行旋转，让车头与路线对齐
    createCarIcon(pointArray[0][0],pointArray[0][1],pointArray[1][0],pointArray[1][1]);
	//获取所有点位
    allMovePoints = getAllMovePoint(pointArray,50);
	//进行移动
	moving =setInterval(showPoint, moveSpeed);
}

const removeOverlays=(id) => {
  var overs=window.$olMap.getOverlays().getArray();
       for(let i = 0;i < overs.length;i++){
          if(overs[i].getId()===id){
            window.$olMap.removeOverlay(overs[i])
             i--
          }
       }
}
const removeLayer=(id) => {
   for(let layerTmp of window.$olMap.getLayers().getArray()){
    if(layerTmp.get("id")===id){
      window.$olMap.removeLayer(layerTmp)
    }
  }
}
  // 车辆暂停
export const stopMove = () => {
    clearInterval(moving)
}
  // 车辆继续
  export const goOn = () => {
    if (moving !== undefined) {
      clearInterval(moving) // 清除移动
    }
    moving =setInterval(showPoint, moveSpeed);
  }
  // 车辆返回
  export const back = () => {
    if (moving != null) {
      clearInterval(moving) // 清除移动
    }
    clean()
    allMovePointsIndex=0
    move()
  }

   // 清除
   export const clean = () => {
    if (moving != null) {
      clearInterval(moving) // 清除移动
    }
    allMovePointsIndex=0
    removeOverlays("carpoint")
    removeLayer("carlineandpoint")

  }