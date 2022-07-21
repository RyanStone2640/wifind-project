<script>
import TableComponent from "../components/TableComponent.vue";
export default {
	name: 'table',
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
