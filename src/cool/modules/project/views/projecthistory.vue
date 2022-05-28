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
			<cl-search-key field="name" />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table :ref="setRefs('table')" v-bind="table" />
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
	// cool: {
	// 	// 注入视图路由中
	// 	route: {
	// 		path: "/proj/admin/list", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "项目列表" // 路由名称
	// 		}
	// 	}
	// },
	setup() {
		const { refs, setRefs, service } = useCool();

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
					label: "进度",
					prop: "process",
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
					label: "计划开工日期",
					prop: "startDate",
					required: true,
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
					},
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "计划竣工日期",
					prop: "planDate",
					required: true,
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
					},
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "工期(天)",
					prop: "dateCount",
					required: true,
					component: { name: "el-input-number", props: { min: 0 } },
					props: {
						labelWidth: "130px"
					}
				},
				{
					label: "收款日",
					prop: "payDate",
					component: {
						name: "el-date-picker",
						props: { type: "date", valueFormat: "YYYY-MM-DD" }
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
				{ label: "进度", prop: "process" },
				{ label: "采购人", prop: "purchaser" },
				{ label: "采购人联系电话", prop: "pur_phone" },
				{ label: "总价", prop: "totalPrice" },
				{ label: "计划开工日期", prop: "startDate" },
				{ label: "工期", prop: "dateCount" },
				{ label: "计划竣工日期", prop: "planDate" },
				{ label: "收款日", prop: "payDate" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
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
			onLoad
		};
	}
});
</script>

<style lang="scss" scoped>

</style>