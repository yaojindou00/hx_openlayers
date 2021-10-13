<template>
  <div id="mapid"></div>
</template>

<script>
import "ol/ol.css";
import  {intMap} from "../../mapUtils/map";

export default {
  mounted(){
    intMap("mapid");
    
  }
}
</script>

<style>
#mapid{
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    background-color: #deecf9;
}
.ol-scale-line{
  background-color: inherit;
}
.ol-scale-line-inner{
    border: 1px solid black;
    border-top: none;
    color: black;
}
.ol-zoom {
    top: inherit;
    left: .5em;
    bottom: 2.5em;
}
.ol-zoom-extent button{
  background-color: #7f9dc3;
  background-image: url(../../assets/home.png);
  background-repeat: no-repeat; 
background-size:cover;
} 
.ol-zoom-extent{
    top: initial;
    left: .5em;
    bottom: 6em;
} 

.ol-rotate.ol-hidden {
    opacity: 1;
    visibility: inherit;
   
}
.ol-rotate {
    top: inherit;
    right: inherit;
    bottom: 8em;
    left: .5em;
  
}
</style>