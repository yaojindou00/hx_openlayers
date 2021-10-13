import Draw from 'ol/interaction/Draw';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import {unByKey} from 'ol/Observable.js';
import Overlay from 'ol/Overlay';
import {getArea,getLength} from 'ol/sphere.js';
import {LineString,Polygon} from 'ol/geom.js';
import {Circle as CircleStyle,Fill,Stroke,Style} from 'ol/style.js';
var sketch;
var measureTooltipElement;
var measureTooltip;
var overlaytip=[]
var draw;
var doubleClickZoom
export const measure=(map, measureType)=>{
    createMeasureTooltip();
    var pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }
      
    };
    map.on('pointermove', pointerMoveHandler);
   
    var formatLength = function (line) {
      // var length2 = getLength(line);
      var length = getLength(line,{ projection: "EPSG:4326"});
      var output;
      if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km';
      } else {
        output = (Math.round(length * 100) / 100) +
          ' ' + 'm';
      }
      return output;
    };
    var formatArea = function (polygon) {
      var area = getArea(polygon,{ projection: "EPSG:4326"});
      var output;
      if (area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) +
          ' ' + 'km<sup>2</sup>';
      } else {
        output = (Math.round(area * 100) / 100) +
          ' ' + 'm<sup>2</sup>';
      }
      return output;
    };
    var layer;
    var source;//= drawLayer.getSource();
    for(let layerTmp of map.getLayers().getArray()){
      if(layerTmp.get("key")==="draw"){
         layer = layerTmp;
        source= layerTmp.getSource();
      }
    }
    function addInteraction() {//Point
      var type = measureType;
      draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: [238,118, 0,0.3]
          }),
          stroke: new Stroke({
            color:  '#ff8000',
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
      map.addInteraction(draw);
       doubleClickZoom= map.getInteractions().getArray().find(
        interaction => {
          return interaction instanceof DoubleClickZoom;
        }
      );
      var listener;
      draw.on('drawstart',
        function (evt) {
          // set sketch
          sketch = evt.feature;
 
          /** @type {module:ol/coordinate~Coordinate|undefined} */
          var tooltipCoord = evt.coordinate;
          map.removeInteraction(doubleClickZoom);
          listener = sketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            var output;
            if (geom instanceof Polygon) {
              output = formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
              measureTooltipElement.innerHTML = output;
              measureTooltip.setPosition(tooltipCoord);
            } else if (geom instanceof LineString) {
              output = formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
              measureTooltipElement.innerHTML = output;
              measureTooltip.setPosition(tooltipCoord);
            }
           
          });
        }, this);
 
      draw.on('drawend',
        function () {
          measureTooltipElement.className = 'tooltip tooltip-static';
          measureTooltip.setOffset([0, -7]);
          // unset sketch
          sketch = null;
          // unset tooltip so that a new one can be created
          measureTooltipElement = null;
          createMeasureTooltip();
          unByKey(listener);
          map.un('pointermove', pointerMoveHandler);
          map.removeInteraction(draw);
          setTimeout(function(){
            map.addInteraction(doubleClickZoom);
          },100);
       
        }, this);
    }
 
 
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.style.fontSize="18px"
      measureTooltipElement.style.fontWeight=600
      measureTooltipElement.className = 'tooltip tooltip-measure';
      measureTooltip = new Overlay({
        id:"draw",
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
      });
      map.addOverlay(measureTooltip);
      overlaytip.push(measureTooltip)
    }
    if(measureType!=='del'){
      addInteraction();
    }else{
      layer.getSource().clear();
      measureTooltipElement = null;
          map.un('pointermove', pointerMoveHandler);
          map.removeInteraction(draw);
          setTimeout(function(){
            if(doubleClickZoom){
              map.addInteraction(doubleClickZoom);
            }
           
          },100);
      if(overlaytip.length>0){
        overlaytip.forEach(overlayTmp => {
          if(overlayTmp.getId()==="draw"){
            map.removeOverlay(overlayTmp)
          }
        });
        overlaytip=[]
      }
   
    }
    
  }
