import axios from 'axios'
// *表名layerName
// *isReturnGeometry默认true
//spatialFilter空间过滤数据wkt
//spatialRel空间位置关系INTERSECTS,CONTAINS,DISJOINT,TOUCHES,CROSSES,WITHIN,OVERLAPS
//filter属性过滤条件
// outFields 属性字段，默认全部
// orderByFields 排序语句
// current 当前页，默认1
// limit每页记录数，默认100
export const search = (params) => {
    return axios({
      url: '/vectapi/rest/api/search',
      params 
    })
}
//*表名layerName 
//*isReturnGeometry默认true
//缓冲距离buffDis,默认0
//spatialFilter要缓冲的空间数据wkt，为空则显示全部
//filter属性过滤条件
// outFields 属性字段，默认全部
// orderByFields 排序语句
// current 当前页，默认1
// limit每页记录数，默认100
export const bufferSearch = (params) => {
    return axios({
      url: '/postgisapi/rest/bufferSearch',
      params 
    })
}
//*表名layerName
//*行政区表cityLayerName 
//*isReturnGeometry默认true
//行政区cityname名称条件语句 name='延安市'
//或citycode编码条件语句citycode='600061000'
//where属性过滤条件
// outFields 属性字段，默认全部
// orderByFields 排序语句
// current 当前页，默认1
// limit每页记录数，默认100
export const getDataByNameOrCode = (params) => {
    return axios({
      url: '/postgisapi/rest/getDataByNameOrCode',
      params 
    })
}
// 城市数据统计
// *layername要统计表名"cun_sx"
// *citytablename城市表"city_gz"
// outFields城市表字段cityname,citycode
// *type统计格式 数量"count(*)",求和"sum(length)",平均"avg(length)"
export const getGroupData = (params) => {
  return axios({
    url: '/postgisapi/rest/getGroupData',
    params 
  })
}
//批量新增
//例{tablename:"test",list:[
//   {name:"讨厌",descrape:"规划",geom:'POINT(109.28 37.75)'},
//   {name:"讨厌22",descrape:"规划2",geom:'POINT(109.38 36.75)'}
//  ]}
export const insertData = (params) => {
  return axios({
    method: 'post',
    url: '/postgisapi/rest/insertData',
    data:params
  })
}
//批量更新
//例{tablename:"test",list:[
//   {name:"讨厌00",descrape:"规划0",geom:'POINT(109.28 37.75)',wheres:{gid:20}},
//   {name:"讨厌0",descrape:"规划0",geom:'POINT(109.38 35.75)',wheres:{gid:21}}
//  ]}
export const updateData = (params) => {
  return axios({
    method: 'post',
    url: '/postgisapi/rest/updateData',
    data:params
  })
}
// 批量删除
// 例{tablename:"test",filedid:"gid", list:[2,6]}
export const deleteData = (params) => {
  return axios({
    method: 'post',
    url: '/postgisapi/rest/deleteData',
    data:params
  })
}