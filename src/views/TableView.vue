<script>
import TableComponent from "../components/TableComponent.vue";
export default {
	name: 'TableView',
  components: {
    TableComponent,
  },
};
</script>

<template>
	<KeepAlive>
		<TableComponent/>
	</KeepAlive>
</template>
