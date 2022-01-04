<template>
	<el-row class="project-doc">
		<el-col class="form-data">
			<data-table v-model="form.data" @submit="setDocData($event)"></data-table>
		</el-col>
		<el-col class="doc-perview">
			<doc-perview :url="fileurl"></doc-perview>
		</el-col>
	</el-row>
</template>

<script lang='ts'>
import { reactive, toRefs } from "vue";
import DocPerview from "../doc/perview.vue";
import DataTable from "../doc/dataTable.vue";

export default {
	components: {
		DocPerview,
		DataTable
	},
	props: {
		project: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	setup() {
		const data = reactive<any>({
			form: {
				data: {}
			}
		});

		function setDocData(value: any) {
			console.log(value);
		}

		return {
			...toRefs(data),
			setDocData
		};
	}
};
</script>

<style lang="scss" scoped>
.project-doc {
	height: 100%;
	display: flex;
	flex-direction: row;

	> .form-data {
		flex: 0 1 auto !important;
		width: 500px;
		margin-right: 20px;
	}
	> .doc-perview {
		flex: 2 1 auto !important;
		width: auto;
	}
}
</style>