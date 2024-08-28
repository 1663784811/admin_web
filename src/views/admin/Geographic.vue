<template>
  <div class="mapContainer">
    地理位置


    <div class="aMap" id="aMap"></div>


  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from "vue";
import AMapLoader, {AMap} from "@amap/amap-jsapi-loader";

let map = null;

onMounted(() => {

  AMapLoader.load({
    key: "", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale","AMap.ToolBar"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    map = new AMap.Map("aMap", {
      // 设置地图容器id
      viewMode: "2D", // 是否为3D地图模式
      //mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
      zoom: 10, // 初始化地图级别
      center: [116.397428, 39.90923], // 初始化地图中心点位置
    });

    var toolbar = new AMap.ToolBar(); //创建工具条插件实例
    map.addControl(toolbar); //添加工具条插件到页面


  }).catch((e) => {
    console.log(e);
  });


});

onUnmounted(() => {
  map?.destroy();
});

</script>

<style scoped lang="less">
.mapContainer {
  height: 100%;

  .aMap {
    height: 100%;
  }

}

</style>