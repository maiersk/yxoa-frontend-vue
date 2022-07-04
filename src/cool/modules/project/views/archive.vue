<template>
	<cl-crud :ref="setRefs('crud')" @load="onLoad">
		<el-row type="flex" align="middle">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key
				field="name"
				:field-list="[
					{
						label: '名称',
						value: 'name'
					},
					{
						label: '建设单位',
						value: 'builderName'
					},
					{
						label: '监理单位',
						value: 'supervisionName'
					},
					{
						label: '承建单位',
						value: 'undertookName'
					}
				]"
			/>
			<cl-yx-adv-search/>
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table :ref="setRefs('table')" v-bind="table">
				<template #slot-detail="{ scope }">
					<el-button type="text" size="mini" @click="toDetail(scope.row.id)">详细</el-button>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert :ref="setRefs('upsert')" v-bind="upsert" />
	</cl-crud>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "view-archive",
	setup() {
		const { refs, setRefs, service, router } = useCool();

		function toDetail(id: string) {
			router.push(`/archive/detail/?id=${id}`)
		}

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "项目全称",
					prop: "fullName",
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "建设项目名称",
					prop: "name",
					required: true,
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "建设单位名称",
					prop: "builderName",
					required: true,
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "监理单位名称",
					prop: "supervisionName",
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "承建单位名称",
					prop: "undertookName",
					required: true,
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "采购人",
					prop: "purchaser",
					required: true,
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "采购人联系电话",
					prop: "pur_phone",
					required: true,
					component: { name: "el-input" },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "总价",
					prop: "totalPrice",
					required: true,
					component: { name: "el-input-number", props: { min: 0 } },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "归档日期",
					prop: "archiveDate",
					required: true,
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
					},
					props: {
						labelWidth: "130px"
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "项目全称", prop: "fullName" },
				{ label: "建设项目名称", prop: "name" },
				{ label: "建设单位名称", prop: "builderName" },
				{ label: "监理单位名称", prop: "supervisionName" },
				{ label: "承建单位名称", prop: "undertookName" },
				{ label: "采购人", prop: "purchaser" },
				{ label: "采购人联系电话", prop: "pur_phone" },
				{ label: "总价", prop: "totalPrice" },
				{ label: "归档日期", prop: "archiveDate" },
				{ type: "op", buttons: ["slot-detail", "edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.project.archive).done();
			app.refresh();
		}

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad,
			toDetail
		};
	}
});
</script>

<style lang="scss" scoped>

</style>