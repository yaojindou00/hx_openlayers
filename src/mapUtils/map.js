import { Map, View } from 'ol';
import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest';
import { mapConfig } from "../config/mapConfig"
import VectorSource from 'ol/source/Vector'
import VectorTileSource from 'ol/source/VectorTile'

import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import VectorTileLayer from 'ol/layer/VectorTile'
import Image from 'ol/layer/Image'
import MVT from 'ol/format/MVT'
import TileGrid from 'ol/tilegrid/TileGrid'
import Projection from 'ol/proj/Projection'
import XYZ from 'ol/source/XYZ'
// import WMTS from 'ol/source/WMTS'
// import { ScaleLine, ZoomToExtent } from 'ol/control';
import VectorLayer from 'ol/layer/Vector'
import { Circle as CircleStyle, Fill, Style, Stroke } from 'ol/style'
import { defaults as defaultControls } from 'ol/control';
export const intMap = (mapid) => {
  let map = new Map({
    target: mapid,
    view: new View({
       
       projection: "EPSG:4326",
       center: [109.08, 35.6],//陝西中心點
      //  projection: "EPSG:3857",   
      //  center: [1.2083385693702523E7,  4311609.339217023],//陝西中心點
      zoom: 5,//7.3
      minZoom: 7.3,
      maxZoom: 18
    }),
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false
    })
  });
  // map.addControl(new ScaleLine());
  // map.addControl(new ZoomToExtent({
  //   extent: [108.40180097765179, 31.7315884712111, 112.84578930830199, 40.09306852305697],
  //   label: ""
  // }));
  window.$olMap = map;

  // loadIntLayer()//自定义底图
  loadIntGdLayer()//高德底图
 // loadVectTileLayer()//矢量切片3857
}
//自定义底图
export const loadIntLayer = () => {
  //加載电子底图
  let dzdtlayer = new TileLayer({
    source: new TileArcGISRest({
      url: mapConfig.dtVectorhx
    }),
    id: "dzdt",
    visible: true
  })
  window.$olMap.addLayer(dzdtlayer)

  //加載影像底图
  let yxdtlayer = new TileLayer({
    source: new TileArcGISRest({
      url: mapConfig.imgVectorhx
    }),
    id: "yxdt",
    visible: false
  })
  window.$olMap.addLayer(yxdtlayer)

  //工具图层
  let drawLayer = new VectorLayer({
    key: "draw",
    zIndex: 1000,
    source: new VectorSource(),
    style: new Style({
      fill: new Fill({
        color: [238, 118, 0, 0.3]
      }),
      stroke: new Stroke({
        color: '#ff8000',
        width: 3
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'white',
          width: 1
        }),
        fill: new Fill({
          color: 'red'
        })
      })
    })

  });
  window.$olMap.addLayer(drawLayer)


}
//底图
export const loadIntTestLayer = () => {
  var ggdzlayer = new TileLayer({
    id: "dzdt",
    visible: true,
    source: new XYZ({
      url: 'https://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=577a653bbf02141362a1895e19fe5b04'
    })
  });
  var ggdzlayer2 = new TileLayer({
    id: "dzdt",
    visible: true,
    source: new XYZ({
      url: 'https://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=577a653bbf02141362a1895e19fe5b04'
    })
  });
  window.$olMap.addLayer(ggdzlayer)
  window.$olMap.addLayer(ggdzlayer2)
}


//高德底图
export const loadIntGdLayer = () => {
  var gddzlayer = new TileLayer({
    id: "dzdt",
    visible: true,
    source: new XYZ({
      url: 'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
      // url: 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
      //腾讯矢量  url: 'http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0'
    })
  });
  var gdyxlayer = new TileLayer({
    id: "yxdt",
    visible: false,
    source: new XYZ({
      url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
      //url: 'http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}'
    })
  });
  var gdyxbzlayer = new TileLayer({
    id: "yxdtbz",
    visible: false,
    source: new XYZ({
      url: 'http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
      /// url:'https://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8&ltype=11'
    })
  });
  window.$olMap.addLayer(gddzlayer)
  window.$olMap.addLayer(gdyxlayer)
  window.$olMap.addLayer(gdyxbzlayer)
  //工具图层
  let drawLayer = new VectorLayer({
    key: "draw",
    zIndex: 1000,
    source: new VectorSource(),
    style: new Style({
      fill: new Fill({
        color: [238, 118, 0, 0.3]
      }),
      stroke: new Stroke({
        color: '#ff8000',
        width: 3
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'white',
          width: 1
        }),
        fill: new Fill({
          color: 'red'
        })
      })
    })

  });
  window.$olMap.addLayer(drawLayer)
  var arcgiswmschina = new Image({   
    source: new ImageArcGISRest({
      ratio: 1,
      params: {}, 
      url: " http://10.61.5.60:6080/arcgis/rest/services/yjd/MapServer"  

    })
  });
  window.$olMap.addLayer(arcgiswmschina)
 
}
//矢量切片3857
export const loadVectTileLayer = () => {
  var topResolution = 2 * 6378137 * Math.PI / 512;
  var resolutions = [];
  for (var zoom = 0; zoom < 9; zoom++) {
    resolutions.push(topResolution / Math.pow(2, zoom));
  }
  var origin = [-2.0037508342787E7, 2.0037198342787E7];
  var projection3857 = new Projection({
    code: 'EPSG:3857',
    units: 'm',
    maxZoom: 17,
    minZoom: 1
  });
  var tileGrid = new TileGrid({
    tileSize: 512,
    origin: origin,
    resolutions: resolutions
  });

  let mvtVectorTileSource = new VectorTileSource({
    format: new MVT(),
    url: "/vectapi/rest/hxgis//tile/city/{z}/{x}/{y}",//"/jhtile/50/50/cun/{z}/{x}/{y}",  //请求后台地址,
    crossOrigin: 'Anonymous',
    projection: projection3857,
    // tilePixelRatio:1,
    params: {
      version: "6.2.0"
    },
    maxZoom: 17,
    minZoom: 1
    ,
    tileGrid: tileGrid

  });


  let stylep = new Style({
    image: new CircleStyle({
      radius: 5,//半径
      fill: new Fill({//填充样式
        color: '#ff6688',
      })
    }),
    stroke: new Stroke({//边界样式
      color: '#555555',
      width: 1
    }),
    //填充色
    fill: new Fill({
      color: 'red',
    })


  });
  let MVTVectorTileLayer = new VectorTileLayer({
    declutter: true,
    visible: true,
    source: mvtVectorTileSource,
    projection: projection3857,
    // extent:extent,
    style: stylep,
    maxZoom: 20,
    minZoom: 0

  })
  window.$olMap.addLayer(MVTVectorTileLayer)
  var arcgiswmschina = new Image({   // = new ol.layer.Image
    source: new ImageArcGISRest({
      ratio: 1,
      params: {}, //object.<string, *>
      url: "http://10.61.5.60:6080/arcgis/rest/services/yjd2/MapServer"  //地图服务或图像服务的ArcGIS Rest服务URL。url应该包含/MapServer或/ImageServer。

    })
  });
  window.$olMap.addLayer(arcgiswmschina)
}


