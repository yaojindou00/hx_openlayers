import {Feature} from 'ol';
import axios from 'axios'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import {Point} from 'ol/geom';
// import EsriJSON from 'ol/format/EsriJSON';MultiPolygon
import GeoJSON from 'ol/format/GeoJSON';
import { Style,Icon,Fill, Stroke} from 'ol/style'//Circle as CircleStyle, Fill,
import * as postgis from '../api/postgis'
import * as baselayer from '../mapUtils/baselayer'
export  const loadLayer=()=>{
  let featurelayer=new VectorLayer({
    id:"aa",
    source: new VectorSource({
      features: [new Feature( {attributes: {name:"dsd",type:1},id:"aa",geometry: new Point([108.98407938526289, 35.65879524975873])}),
                 new Feature( {attributes: {name:"gfh",type:2},id:"aa",geometry: new Point([109.28407938526289, 35.65879524975873])}),
                 new Feature( {attributes: {name:"sfr",type:3},id:"aa",geometry: new Point([109.08407938526289, 35.95879524975873])}),
                 new Feature( {attributes: {name:"dgtr",type:4},id:"aa",geometry: new Point([108.28407938526289, 35.65879524975873])})
               ]  
    }),
    style:new Style({
       image: new Icon({
         src:require('@/assets/15.png'),
         scale:[0.8,0.8]
       })

      })

  })
  window.$olMap.addLayer(featurelayer)
  let featurelayer2=new VectorLayer({
    id:"bb",
    source: new VectorSource({
      features: [new Feature( {attributes: {name:"规划",type:1},id:"bb",geometry: new Point([108.98407938526289, 36.65879524975873])}),
                 new Feature( {attributes: {name:"的风格",type:2},id:"bb",geometry: new Point([109.28407938526289, 36.65879524975873])}),
                 new Feature( {attributes: {name:"的",type:3},id:"bb",geometry: new Point([109.08407938526289, 36.95879524975873])}),
                 new Feature( {attributes: {name:"给",type:4},id:"bb",geometry: new Point([108.28407938526289, 36.65879524975873])})
               ]  
    }),
    style:new Style({
      image: new Icon({
        src:require('@/assets/16.png'),
         scale:[0.8,0.8]
      })

     })
  })
  window.$olMap.addLayer(featurelayer2)
}
// 矢量创建图层
const createVectLayerByFeatures=(layerid,img,datas)=>{
      var features=[]
     var geogson=new GeoJSON()
      datas.forEach(item => {
        var geo=JSON.parse(item.geoJson);
        if(geo.type==="MultiPolygon"){
          var f=geogson.readFeature(geo);
          features.push(new Feature( {attributes: item.attributes,id:layerid,geometry:f.getGeometry() }))
        }else if(geo.type==="Point"){
          features.push(new Feature( {attributes: item.attributes,id:layerid,geometry: new Point(geo.coordinates)}))
        }
        
      }); 
      let featurelayer=new VectorLayer({
        id:layerid,
        source: new VectorSource({
          features:features
        }),
        style:function(feature) {
          if(feature.getGeometry().getType()==="Point"){
            return  new Style({
                image: new Icon({
                  src:img,
                  scale:[0.8,0.8]
                })
            });
          }else {
            return  new Style({
              fill: new Fill({
                  color:  'red',
              }),
              stroke: new Stroke({
                  color:  '#b9d83c',
                  width: 3
              }) 
          });
          }
        }
      })
    window.$olMap.addLayer(featurelayer)
}
//图层查询
export  const addLayerBySearch=(param,layerid,img)=>{
  // param={layerName:"countypt_sx",isReturnGeometry:true,
  // spatialRel:"INTERSECTS",
  // spatialFilter:'MULTIPOLYGON(((108.2 34.3,110.2 34.3,110.2 37.3,108.2 37.3,108.2 34.3)))'}
  //  layerid="cc"
  //  img=require('@/assets/16.png')
  baselayer.reMoveLayerById(layerid)
  postgis.search(param).then(res => {
    if(res.data.data.features&&res.data.data.features.length>0){
      createVectLayerByFeatures(layerid,img,res.data.data.features)
    }
 })
}

//图层缓冲区过滤查询
export  const addLayerByBufferSearch=(param,layerid,img)=>{
   param={layerName:"countypt_sx",buffDis:20000,isReturnGeometry:true,spatialFilter:'POINT(108.930671102 34.341838499)'}
   layerid="cc"
   img=require('@/assets/16.png')
  baselayer.reMoveLayerById(layerid)
  postgis.bufferSearch(param).then(res => {
    if(res.data.data.features&&res.data.data.features.length>0){
      createVectLayerByFeatures(layerid,img,res.data.data.features)
    }
 })
}
//图层行政区过滤查询
export  const addLayerByNameOrCodeSearch=(param,layerid,img)=>{
   param={layerName:"countypt_sx",cityLayerName:"city",isReturnGeometry:true,cityname:"name='延安市'"}
   layerid="cc"
   img=require('@/assets/16.png')
  baselayer.reMoveLayerById(layerid)
  postgis.getDataByNameOrCode(param).then(res => {
    if(res.data.data.features&&res.data.data.features.length>0){
      createVectLayerByFeatures(layerid,img,res.data.data.features)
    }
 })
}
//统计
export  const addLayerByGroupData=(param,layerid,img)=>{
  param={layername:"cun_sx",citytablename:"city_gz",outFields:"cityname",type:"count(*)"}
  layerid="ffc"
  img=require('@/assets/16.png')
 baselayer.reMoveLayerById(layerid)
 postgis.getGroupData(param).then(res => {
   if(res.data.data.features&&res.data.data.features.length>0){
     createVectLayerByFeatures(layerid,img,res.data.data.features)
   }
})
}
export function loadArcgisFlayer(serviceUrl,layerid,img){
   layerid="dd"
   serviceUrl ="http://10.61.5.60:6080/arcgis/rest/services/YA/YA_YJlist/FeatureServer/1";
   img=require('@/assets/16.png')
   baselayer.reMoveLayerById(layerid)
  // let  esrijsonFormat = new EsriJSON();
  let vectorSource = new VectorSource({
    loader: function (extent, resolution, projection) {
      let url =serviceUrl +'/query/?f=json&where=1%3D1&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            '&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*' +
            '&outSR=4326';
      axios.get(url).then(res=>{
        // let features = esrijsonFormat.readFeatures(res.data, {
        //   featureProjection: projection
        // });
        let features=[]
        res.data.features.forEach(item => {
          features.push(new Feature( {attributes: item.attributes ,id:layerid,geometry: new Point([item.geometry.x,item.geometry.y])})) 
        });
        if (features.length > 0) {
          vectorSource.addFeatures(features);
        }
      })
    }
  })
  let vector = new VectorLayer({
    id:layerid,
    source: vectorSource,
    style: new Style({
      image: new Icon({
        src:img,
        scale:[0.8,0.8]
      })
    })
          
  });
  window.$olMap.addLayer(vector)
}