<template>
	<div class="wlog-view">
		<div class="box scroller1">
			<cl-crud @load="onLoad">
				<el-row>
					<cl-refresh-btn />
					<cl-add-btn />
					<cl-flex1 />
					<cl-search-key
						field="title"
						:field-list="[
							{ label: '标题', value: 'title' },
							{ label: '类别', value: 'category' }
						]"
					/>
				</el-row>

				<el-row>
					<wlog-list :data="data" />
				</el-row>

				<wlog-upsert />
			</cl-crud>
		</div>
	</div>
</template>

<script lang="ts">
import { inject, onMounted, reactive } from "vue";
import { useRefs } from "/@/cool";
import WlogUpsert from "../components/wlogcard/upsert.vue";
import WlogList from "../components/wlogcard/wloglist";
import { CrudLoad } from "@cool-vue/crud/types";

export default {
	name: "wlog",

	components: {
		WlogList,
		WlogUpsert
	},
	setup() {
		const { refs, setRefs } = useRefs();
		const service = inject<any>("service");
		const data = reactive<any>([]);

		onMounted(async () => {
			const res = await service.worklog.wlog.page();
			data.value = res.list
			console.log(res)
			// service.worklog.category.wlogs({ id: 1 }).then((res: any) => {
			// 	console.log(res);
			// })
		});

		function onLoad({ ctx, app }: CrudLoad) {
			ctx.service(service.worklog.wlog).done();
			app.refresh();
		}

		return {
			refs,
			setRefs,
			data,
			onLoad
		};
	}
};
</script>

<style lang="scss">
.wlog-view {
	background-color: white;
}
</style>
