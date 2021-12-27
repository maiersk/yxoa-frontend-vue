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
	name: "project-projectdoc_tree",

	setup() {
		const { refs, setRefs, service } = useCool();

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "项目Id",
					prop: "projectId",
					required: true,
					component: { name: "el-input" }
				},
				{ label: "文档Id", prop: "docId", required: true, component: { name: "el-input" } }
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "项目Id", prop: "projectId" },
				{ label: "文档Id", prop: "docId" },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.project.projectdoc_tree).done();
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
