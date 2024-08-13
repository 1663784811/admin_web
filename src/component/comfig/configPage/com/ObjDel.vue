<template>
  <div>

    <div class="headerBox">
      <div></div>
      <div>
        <Button class="dataBtn" type="primary" icon="md-cloud-upload" @click="showCodeFn">查看代码</Button>
      </div>
    </div>

    <ObjRequest :setting="setting" title="删除地址"/>
  </div>
</template>

<script setup>
import ObjRequest from './ObjRequest.vue'
import {useWinModal} from "@/store/winModal";

const {winIcon, winCode} = useWinModal();



const props = defineProps({
  setting: {
    type: Object,
    default: {},
    required: false
  }
});



const showCodeFn = () => {
  winCode.show = true;
  winCode.data = JSON.stringify(props.setting, null, "  ");
  winCode.callBack = (data) => {
    for (const dataKey in props.setting) {
      delete props.setting[dataKey]
    }
    const obj = JSON.parse(data);
    for (const objKey in obj) {
      props.setting[objKey] = obj[objKey]
    }
  }
}

</script>

<style scoped>
.headerBox{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>