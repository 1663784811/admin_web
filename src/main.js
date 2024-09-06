import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import router from '@/router/index.js';
import 'view-ui-plus/dist/styles/viewuiplus.css'
import {
    Button,
    Checkbox,
    DatePicker,
    Divider,
    Drawer,
    Icon,
    Input,
    Modal,
    Option,
    Page,
    Select,
    Switch,
    Table,
    TabPane,
    Tabs,
    Tag,
    Upload,
    MenuItem,
    Menu,
    Submenu,
    DropdownItem,
    Tree,
    Carousel,
    CarouselItem,
    Image,
    Form,
    Steps,
    Step,
    Result,
    Scroll
} from 'view-ui-plus';


import SelectDataDrawer from '@/component/modal/SelectDataDrawer.vue'
import DataTable from '@/component/modal/DataTable.vue'
import ModalDataList from '@/component/modal/ModalDataList.vue'
import ModalMqttMsg from '@/component/modal/ModalMqttMsg.vue'
import ModalIcon from '@/component/modal/ModalIcon.vue'
import FormInput from '@/component/modal/FormInput.vue'


import {use} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import {PieChart, BarChart, LineChart} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    ToolboxComponent
} from 'echarts/components';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, ToolboxComponent, BarChart, LineChart]);


const pinia = createPinia();
pinia.use(piniaPluginPersist);


const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('Button', Button);
app.component('Table', Table);
app.component('Input', Input);
app.component('Upload', Upload);
app.component('Checkbox', Checkbox);
app.component('Option', Option);
app.component('Switch', Switch);
app.component('Select', Select);
app.component('Icon', Icon);
app.component('Modal', Modal);
app.component('TabPane', TabPane);
app.component('Tabs', Tabs);
app.component('Divider', Divider);
app.component('Page', Page);
app.component('Drawer', Drawer);
app.component('Tag', Tag);
app.component('DatePicker', DatePicker);
app.component('MenuItem', MenuItem);
app.component('Menu', Menu);
app.component('Submenu', Submenu);
app.component('DropdownItem', DropdownItem);
app.component('Tree', Tree);
app.component('Carousel', Carousel);
app.component('CarouselItem', CarouselItem);
app.component('Image', Image);
app.component('Form', Form);
app.component('Steps', Steps);
app.component('Step', Step);
app.component('Result', Result);
app.component('Scroll', Scroll);


// ================== 被组件调用的组件
app.component('modal-data-list', ModalDataList)
app.component('modal-mqtt-msg', ModalMqttMsg)
app.component('modal-icon', ModalIcon)
app.component('form-input', FormInput)


// =================== 组件
app.component('data-table', DataTable);
app.component('select-dataDrawer', SelectDataDrawer);


app.mount('#app');


