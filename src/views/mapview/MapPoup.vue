<template>
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="contentId"></div>
  </div>
</template>

<script>
import Overlay from "ol/Overlay";
import poup1 from "../../components/poup/poup1.vue";
import { createApp, onMounted } from "vue";
export default {
  setup() {
    let mapPopup = null;
    onMounted(() => {
      addPopup();
    });

    const addPopup = () => {
      let container = document.getElementById("popup");
      //   let content = document.getElementById('popup-content');
      let closer = document.getElementById("popup-closer");
      var overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      overlay.setPosition(undefined);
      window.$olMap.addOverlay(overlay);

      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        mapPopup.unmount();
        return;
      };
      window.$olMap.on("click", function(evt) {
       if (mapPopup) {
          mapPopup.unmount();
          mapPopup=null;
        }
        var feature = window.$olMap.getFeaturesAtPixel(evt.pixel)[0];
        if (feature && feature.get("attributes") && feature.get("id")) {
          //
          if(feature.get("id")==="aa"||feature.get("id")==="bb"){
            mapPopup = createApp(poup1);
          }
          
          if (mapPopup) {
              mapPopup.config.globalProperties.$pValue = feature.get("attributes");
              mapPopup.mount("#contentId");
              var coordinate = evt.coordinate;
              overlay.setPosition(coordinate);
              window.$olMap.getView().animate({
                center: coordinate,
                duration: 1000,
              });
          }
        } else {
          overlay.setPosition(null);
        }
      });
      
    };
  },
};
</script>

<style lang="scss">
.ol-popup {
  min-width: 200px;
  min-height: 100px;
  border-radius: 6px;
  transform: translate(-50%, 20px);
  border: 1px solid #eee;
  background: #fff;
  padding: 16px;
  transition: all 1s ease;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
  display: none;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
  display: none;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
#poup-table {
  margin-top: 14px;
}
#poup-title {
  position: absolute;
  top: -1px;

  left: 16px;
  line-height: 35px;
  min-width: 233px;
}
</style>
