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
			<cl-search-key />
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
	name: "projcet-list",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			props: {
				labelWidth: "180px"
			},
			items: [
				{
					label: "建设项目名称",
					prop: "name",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "建设单位名称",
					prop: "builderName",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "监理单位名称",
					prop: "SupervisionName",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "承建单位名称",
					prop: "UndertookName",
					required: true,
					component: { name: "el-input" }
				},
				{ label: "进度", prop: "process", required: true, component: { name: "el-input" } },
				{
					label: "采购人",
					prop: "purchaser",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "采购人联系电话",
					prop: "pur_phone",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "总价",
					prop: "totalPrice",
					component: {
						name: "el-input-number",
						props: {
							min: 0
						}
					},
					required: true
				},
				{
					label: "目标竣工日",
					prop: "tcDay",
					required: true,
					component: {
						name: "el-date-picker"
					}
				},
				{
					label: "收款日",
					prop: "payDay",
					required: true,
					component: {
						name: "el-date-picker"
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "建设项目名称", prop: "name", width: 130 },
				{ label: "建设单位名称", prop: "builderName", width: 130 },
				{ label: "监理单位名称", prop: "SupervisionName", width: 130 },
				{ label: "承建单位名称", prop: "UndertookName", width: 130 },
				{ label: "进度", prop: "process" },
				{ label: "采购人", prop: "purchaser" },
				{ label: "采购人联系电话", prop: "pur_phone" },
				{ label: "总价", prop: "totalPrice" },
				{ label: "目标竣工日", prop: "tcDay" },
				{ label: "收款日", prop: "payDay" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.project.projcet).done();
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
