<template>
<div class="tools">
  
      <div v-if="gjbShow" class="tool"> 
          <img src="../../assets/tool/bag_0.png" @click="Draw('Point')" />
          <img src="../../assets/tool/bag_1.png" @click="Draw('LineString')" />
          <img src="../../assets/tool/bag_2.png" @click="Draw('Polygon')" />
          <img src="../../assets/tool/bag_3.png"  @click="Draw('del')"/>
      </div>
       <div class="item1" @click="changToolShow" > 
            <img  src="../../assets/tool/bag.png"  style="width:20px;height:19px" />
      </div>
    
    <div class="item item1" @click="changeGisShow">
        <img v-if="gisShow" src="../../assets/tool/gis2.png" alt="" srcset="" style="width:26px" />
        <img v-else src="../../assets/tool/gis1.png" alt="" srcset="" style="width:26px" />
    </div>
  </div>
</template>
<script>
import {measure}  from "../../mapUtils/Measure"
 import {showLayerById,hiddenLayerById}  from "../../mapUtils/baselayer"

export default {
 
mounted(){
 
},
data(){
  return{
    gisShow:true,
    gjbShow: false}
},
methods: {
   changeGisShow (){
      this.gisShow = !this.gisShow
      if (this.gisShow) {
        this.vectorClick()
      } else {
        this.imageClick()
      }
    },
    imageClick ()  {
      showLayerById("yxdt")
       showLayerById("yxdtbz")
      hiddenLayerById("dzdt")
   
    },
     vectorClick  ()  {
        showLayerById("dzdt")
       
        hiddenLayerById("yxdt")
         hiddenLayerById("yxdtbz")
    
    },
    changToolShow() {
      this.gjbShow=!this.gjbShow
    },
    Draw(type) {
      measure(window.$olMap,type)
    }
  }
}
</script>

<style>
.tools{
      position: absolute;
    top: 0;
    right: 10px;
        width: 40px;
}
.tool{

    width: 165px;
    background-color: #2690ec;
    height: 35px;
    border-radius: 5px;
        position: absolute;
    top: 13px;
    right: 43px;

}
.tool img{
      margin: 8px 10px;
      width: 20px;
      height: 19px;
        cursor: pointer;
}
.item1{ 
         float: right;
         background-color: white;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 2px 3px 5px 0px rgb(138 138 138 / 20%);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 10px;
} 
</style>