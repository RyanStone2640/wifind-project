import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ECharts from 'vue-echarts'
import { use } from "echarts/core"

import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
 	PieChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
	TitleComponent,
	LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
	LegendComponent
])

createApp(App).use(router).use(store).component('v-chart', ECharts)
.mount("#app");
