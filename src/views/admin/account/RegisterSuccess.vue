<template>
  <div>&nbsp;</div>
  <div class="registerContainer">
    <div class="title">企业注册</div>
    <div class="registerBox">
      <div class="inputBox">
        <Result type="success" title="注册成功">
          <template #desc>
            <div>注册成功,您的后台登录地址</div>
            <div>{{ registerData.successData.enterprise.url }}</div>
            <div>正在为您跳转... 【 10秒 】</div>
          </template>
        </Result>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {enterpriseRegister} from "@/api/api.js"

const registerData = ref({
  successData: {
    admin: {},
    enterprise: {
      url: ''
    }
  }
});

onMounted(()=>{
  console.log('aaaaaa')
})



</script>
<style scoped lang="less">
.registerContainer {
  background: #fff;
  max-width: 1200px;
  margin: 100px auto auto;
  padding: 60px 0;

  .title {

    text-align: center;
    font-size: 20px;
    padding: 60px 0 20px 0;
  }


  .registerBox {
    max-width: 800px;
    margin: auto;

  }

}
</style>
