<template>
  <div class="appBox">
    <div class="titleBox">我的应用</div>
    <div class="appRowBox">
      <div class="rowItem" v-for="(item, index) in state.appList" :key="index">
        <div class="appLogo">
          <img :src="item.logo">
        </div>
        <div class="appTitle">{{ item.name }}</div>
      </div>
    </div>
  </div>

  <div class="dataBox">
    <div class="saleData">
      <TitleBox title="销售额"/>
      <div class="saleContent" style="height: 400px">
        <v-chart class="chart" :option="option" autoresize/>
      </div>
    </div>
    <div class="logBox">
      <TitleBox title="日志"/>
      <div class="logContent">
        ssss
      </div>
    </div>
  </div>

  <div class="userCount">
    <TitleBox title="用户统计IP"/>
    <div style="height: 400px">
      <v-chart class="chart" :option="ipOption" autoresize/>
    </div>
  </div>

</template>
<script setup>
import TitleBox from '@/component/TitleBox.vue'
import {onMounted, reactive, ref} from "vue";
import {commonRequest, commonQuery} from '@/api/api.js'
import {loginInfo} from "@/store/loginInfo.js"

import VChart, {THEME_KEY} from 'vue-echarts';


const loginInfoSt = loginInfo();


const state = reactive({
  appList: []
})


onMounted(() => {
  loadData();
})

const loadData = () => {
  commonQuery({
    code: 'select_e_application'
  }).then((rest) => {
    const {data} = rest;
    state.appList = data;
  })

}


const option = ref({
  title: {
    text: 'Traffic Sources',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        {value: 335, name: 'Direct'},
        {value: 310, name: 'Email'},
        {value: 234, name: 'Ad Networks'},
        {value: 135, name: 'Video Ads'},
        {value: 1548, name: 'Search Engines'},
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

const colors = ['#5470C6', '#91CC75', '#EE6666'];
const ipOption = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      dataView: {show: true, readOnly: false},
      magicType: {show: true, type: ['line', 'bar']},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  legend: {
    data: ['Evaporation', 'Precipitation', 'Temperature']
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' °C';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
})


</script>


<style scoped lang="less">
.appBox {
  .titleBox {
    padding: 10px;
    box-shadow: 0 0 6px #bdd3f5;
    background: #fff;
    border-bottom: 1px solid #efefef;
  }

  .appRowBox {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    background: #fff;
    padding: 10px 10px 0 10px;
    min-height: 120px;

    .rowItem {
      width: 100px;
      height: 100px;
      margin: 0 10px 10px 0;
      background: #f7f7f7;
      border-radius: 6px;

      &:hover {
        background: #d5d5d5;
        cursor: pointer;
      }

      .appLogo {
        width: 60px;
        height: 60px;
        margin: 10px auto auto;
        border-radius: 6px;
        overflow: hidden;

        img {
          max-width: 100%;
          height: 100%;
          width: 100%;
        }
      }

      .appTitle {
        text-align: center;
        overflow: hidden;
        font-size: 12px;
        margin-top: 6px;
        font-weight: bold;
      }
    }
  }
}

.dataBox {
  display: flex;

  .saleData {
    flex: 1;
    background: #fff;
  }

  .logBox {
    background: #fff;
    width: 600px;
    margin-left: 10px;

    .logContent {
      padding: 10px;

    }
  }
}

.userCount {
  background: #fff;
  margin-top: 10px;
  min-height: 400px;
}
</style>