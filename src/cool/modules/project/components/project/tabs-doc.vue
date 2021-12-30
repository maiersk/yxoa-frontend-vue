<template>
	<div class="project-doc">
		<el-row>
			<el-col>
				<data-table></data-table>
			</el-col>
			<el-col>
        <doc-perview></doc-perview>
      </el-col>
		</el-row>
	</div>
</template>

<script lang='ts'>
import {} from "vue";
import DocPerview from "../doc/perview.vue";
import DataTable from "../doc/dataTable.vue";

export default {
	components: {
		DocPerview,
		DataTable
	},
	setup() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.project-doc {
}
</style>