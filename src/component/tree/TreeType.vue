<template>
  <div class="menuBox" :style="style" v-if="setting.queryObj">
    <Tree :data="state.objConfig.data" @on-contextmenu="handleContextMenu" @on-check-change="selectTreeFn"
          show-checkbox>
      <template #contextMenu>
        <DropdownItem @click="handleContextMenuSave(false)">添加</DropdownItem>
        <DropdownItem v-if="state.objConfig.showMainMenu" @click="handleContextMenuSave(true)">编辑</DropdownItem>
        <DropdownItem v-if="state.objConfig.showMainMenu" @click="handleContextMenuDelete" style="color: #ed4014">删除
        </DropdownItem>
      </template>
    </Tree>
    <modal-data-list v-model="setting.addObj.show" :modalSetting="setting.addObj" @event="addEventFn"/>
    <modal-data-list v-model="setting.updateObj.show" :modalSetting="setting.updateObj" @event="updateEventFn"/>
  </div>
</template>

<script setup>

import {onMounted, reactive, watch} from "vue"
import {commonRequest} from "@/api/api.js"
import {pageConfig} from '@/store/pageConfig.js'
import {Message, Modal} from "view-ui-plus"
import {getParameter} from '../ModalUtils.js'

const emits = defineEmits(['event', 'selectChange']);

const usePageConfig = pageConfig();

const props = defineProps({
  setting: {
    type: Object,
    default: {
      addObj: {
        show: false
      },
      updateObj: {
        show: false
      },
      queryObj: {}
    },
    required: false
  },
  style: {
    type: Object,
    default: {},
    required: false
  },
  asTitle: {
    type: String,
    default: null,
    required: false
  },
  editer: {
    type: Boolean,
    default: false,
    required: false
  },
  selectData: {}
});

const state = reactive({
  objConfig: {
    showMainMenu: false,
    data: [
      {
        title: '全部',
        expand: true,
        contextmenu: props.editer,
        children: []
      }
    ]
  }
})
// ======================================================

onMounted(() => {
  initFn();
});
const initFn = async () => {
  loadData();
}


// ======================================================
/**
 * 加载数据
 */
const loadData = () => {
  state.loading = true;
  const {setting} = props;
  if (setting.queryObj) {
    commonRequest(
        setting.queryObj.url,
        {
          ...setting.queryObj.parameter,
          ...setting.queryObj.pm,
        }
    ).then((rest) => {
      const {data} = rest;
      const arr = [];
      if (data && data.root && data.root.length > 0) {
        arr.push(...reTree(data.root));
      } else if (data) {
        arr.push(...reTree(data));
      }
      state.objConfig.data[0].children = arr;
    }).catch(err => {
      state.objConfig.data = [];
    }).finally(() => {
      state.objConfig.loading = false;
    })
  }
}
// ======================================================

/**
 * 处理树结构
 */
const reTree = (list) => {
  for (let i = 0; i < list.length; i++) {
    let itemObj = list[i];
    itemObj.expand = true;
    itemObj.contextmenu = props.editer;
    if (props.asTitle) {
      itemObj.title = itemObj[props.asTitle]
    }
    if (itemObj.children && itemObj.children.length > 0) {
      itemObj.children = reTree(itemObj.children);
    }
  }
  return list;
}

/**
 * 点击右键菜单
 */
const handleContextMenu = (data, event, position) => {
  if (data.nodeKey === 0) {
    state.objConfig.showMainMenu = false;
  } else {
    state.objConfig.showMainMenu = true;
  }
  state.selectData = data.data;
  console.log()
}
/**
 * 编辑
 */
const handleContextMenuSave = (isEditor) => {
  const {updateObj, addObj} = props.setting;
  if (isEditor) {
    updateObj.data = state.selectData;
    updateObj.show = true;
  } else {
    const selectData = state.selectData;
    if (selectData) {
      addObj.data = {
        pid: selectData.tid
      }
    } else {
      addObj.data = {}
    }
    addObj.show = true;
  }
}

/**
 * 删除
 */
const handleContextMenuDelete = () => {
  const {setting} = props;
  const {url, parameter, isCommonUrl} = setting.delObj;
  const data = state.selectData;
  Modal.confirm({
    title: '是否删除?',
    okText: '删除',
    loading: true,
    onOk: () => {
      commonRequest(url, getParameter(data, parameter, isCommonUrl), 'post').then((res) => {
        Message.success({content: `${rest.msg ? rest.msg : rest}`})
      }).catch(err => {
        Message.error({
          content: `${err.msg ? err.msg : err}`,
        })
      }).finally(() => {
        setTimeout(() => {
          loadData();
          Modal.remove();
        }, 500)
      })
    },
  });

}

const addEventFn = (ev, itemData) => {
  if ('ok' === ev) {
    const {url, parameter, isCommonUrl, data} = props.setting.addObj;
    commonRequest(url, getParameter(itemData, parameter, isCommonUrl), 'post').then((rest) => {
      props.setting.addObj.data = rest.data;
      Message.success({
        content: `${rest.msg}`,
        onClose: () => {
          props.setting.addObj.show = false;
          loadData();
        }
      })
    }).catch((err) => {
      Message.error({
        content: `${err}`
      })
      props.setting.addObj.loading = false;
      setTimeout(() => {
        props.setting.addObj.loading = true;
      })
    })
  } else if ('cancel' === ev) {

  }
}


const updateEventFn = (ev, itemData) => {
  if ('ok' === ev) {
    const {url, parameter, isCommonUrl, data} = props.setting.updateObj;
    commonRequest(url, getParameter(itemData, parameter, isCommonUrl), 'post').then((rest) => {
      props.setting.updateObj.data = rest.data;
      Message.success({
        content: `${rest.msg}`,
        onClose: () => {
          props.setting.updateObj.show = false;
          loadData();
        }
      })
    }).catch((err) => {
      Message.error({
        content: `${err}`
      })
      props.setting.updateObj.loading = false;
      setTimeout(() => {
        props.setting.updateObj.loading = true;
      })
    })
  } else if ('cancel' === ev) {

  }
}


/**
 * 选择树
 */
const selectTreeFn = (arr, obj) => {
  const tempArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title !== '全部') {
      tempArr.push(arr[i].data)
    }
  }
  emits('selectChange', tempArr, obj);
}

watch(() => props.setting, () => {
  initFn();
})


</script>

<style lang="less" scoped>
.menuBox {
  padding: 20px;
  width: 400px;
  background: #fff;
}
</style>