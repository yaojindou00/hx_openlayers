//获取所有图层
const getAllLayers = () => {
  let players = window.$olMap.getLayers().getArray();
  return players;
};
//根据图层id获取相应的图层
export const getLayerByid = (layerid) => {
  let players = getAllLayers();
  let player = null;
  try {
    for (let i = 0; i < players.length; i++) {
      if (players[i].values_.id === layerid) {
        player = players[i];
        break;
      }
    }
  } catch (error) {
    console.log("获取" + layerid + "图层出错");
  }
  return player;
};
//根据图层id隐藏图层
export const hiddenLayerById = (layerid) => {
  let player=getLayerByid(layerid)
  if(player){
    player.setVisible(false)
  }
};
//根据id显示图层
export const showLayerById = (layerid) => {
  let player=getLayerByid(layerid)
  if(player){
    player.setVisible(true)
  }
};
//根据图层id移除图层
export const reMoveLayerById = (layerId) => {
  let player = getLayerByid(layerId);
  try {
    if (player) {
      window.$olMap.removeLayer(player);
    }
  } catch (error) {
    console.log("移除" + layerId + "图层出错");
  }
};
