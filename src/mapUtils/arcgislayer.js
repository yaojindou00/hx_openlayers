import 'ol/ol.css';
import EsriJSON from 'ol/format/EsriJSON';
import VectorSource from 'ol/source/Vector';
import {Stroke, Style} from 'ol/style';
import { Vector as VectorLayer} from 'ol/layer';
import axios from 'axios'

export function loadArcgisFlayer(){
  let serviceUrl ="http://10.61.5.60:6080/arcgis/rest/services/YA/YA_CreatRiver/FeatureServer/0";
  let  esrijsonFormat = new EsriJSON();
  let vectorSource = new VectorSource({
    loader: function (extent, resolution, projection) {
      let url =
            serviceUrl +
            '/query/?f=json&where=1%3D1&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            '&geometryType=esriGeometryEnvelope&inSR=4326&outFields=*' +
            '&outSR=4326';
      axios.get(url).then(res=>{
        let features = esrijsonFormat.readFeatures(res.data, {
          featureProjection: projection,
        });
        if (features.length > 0) {
          vectorSource.addFeatures(features);
        }
      })
    }
  })
  let vector = new VectorLayer({
    id:"cc",
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: '#ff6688',//颜色
        width: 3,//宽度
        lineCap: 'round',//线帽样式
        lineJoin: 'round'//线条连接处样式

      })
    }),
          
  });
  window.$olMap.addLayer(vector)
}