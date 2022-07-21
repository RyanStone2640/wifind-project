<script>
import ChartComponent from "../components/ChartComponent.vue";
export default {
	name: 'ChartView',	
  components: {
    ChartComponent,
  },
};
</script>

<template>
	<KeepAlive>
		<ChartComponent/>
	</KeepAlive>
</template>
