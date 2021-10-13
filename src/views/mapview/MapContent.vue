<template>
<div  id='content'> 
  <MapView></MapView>
  <MapTools></MapTools>   
  <MapPoup></MapPoup> 
 
  <div class="bnts" style="position: absolute;top: 0;">
     <button @click="removeEcharts">echart隐藏</button>
      <button @click="addEcharts">echart显示</button>
      <button @click="startyd">start</button>
      <button @click="stop">stop</button>
      <button @click="goon">goon</button>
      <button @click="back">back</button>
      <button @click="clean">clean</button>
      <button @click="addpoints">添加</button>
      <button @click="removepoints">删除</button>
  </div>
</div>
</template>
<script>
import MapView from "../mapview/MapView.vue"
import MapTools from "./MapTools.vue"
import MapPoup from "./MapPoup.vue"
import {loadEchartLayer,removeOverlays} from "../../page/echartLayer"
import {move,stopMove,goOn,back,clean} from '../../page/PointMove'
import * as layersManger from '../../page/layersManger'
import {reMoveLayerById} from '../../mapUtils/baselayer'
export default {
  components: {
    MapView,
     MapTools,
    MapPoup
  },
  mounted(){

  },
  methods: {
    startyd(){
        move()
    },
    stop(){
      stopMove()
    },
    goon(){
      goOn()
    },
    back(){
        back()
    },
    clean(){
        clean()
    },
    removeEcharts(){
      removeOverlays("echart")
      
    },
    addEcharts(){
        loadEchartLayer()
    },
    addpoints(){
      //  layersManger.loadLayer()
    // layersManger.loadArcgisFlayer()
     layersManger.addLayerBySearch({layerName:"cun_sx",isReturnGeometry:true,spatialRel:"INTERSECTS"},"aa",require('@/assets/16.png'))
    //layersManger.addLayerByBufferSearch({},"","")
    // layersManger.addLayerByNameOrCodeSearch({},"","")
    },
    removepoints(){
       reMoveLayerById("aa")
       reMoveLayerById("bb")
    // reMoveLayerById("cc")
    }
}
}
</script>
<style>
#content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0px;
  margin: 0px;
}
</style>