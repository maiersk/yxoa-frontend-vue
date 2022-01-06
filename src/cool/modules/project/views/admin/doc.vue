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
			<cl-table :ref="setRefs('table')" v-bind="table" >
				<!-- 测试模板文档 -->
				<template #slot-build="{ scope }">
					<el-button
						type="text"
						size="mini"
						@click="testBuild(scope.row)"
						>测试</el-button
					>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert :ref="setRefs('upsert')" v-bind="upsert">
			<template #doc-perview>
				<doc-perview></doc-perview>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script lang="ts">
import { defineComponent, inject, reactive } from "vue";
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { useRefs } from "/@/cool";
import DocPerview from "../../components/doc/perview.vue";

export default defineComponent({
	name: "project-doc",
	cool: {
		// 注入视图路由中
		route: {
			path: "/project/admin/doc", // 路由地址
			meta: {
				keepAlive: true, // 是否缓存路由
				label: "文档模板" // 路由名称
			}
		}
	},
	components: {
		DocPerview
	},
	setup() {
		const { refs, setRefs } = useRefs();
		const service = inject<any>("service");

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{ label: "名称", prop: "name", required: true, component: { name: "el-input" } },
				{ label: "格式", prop: "format", required: true, component: { name: "el-input" } },
				{
					label: "数量",
					prop: "count",
					required: true,
					value: 1,
					component: {
						name: "el-input-number",
						props: {
							min: 1,
							max: 99
						}
					}
				},
				{
					label: "备注",
					prop: "remark",
					component: { name: "el-input", props: { type: "textarea", rows: 4 } },
				},
				{
					label: "文件",
					prop: "templateFile",
					component: {
						name: "cl-upload",
						props: {
							listType: "text",
							limit: 1,
							accept: ".doc,.docx"
						}
					},
					required: true
				},
				{
					label: "数据模板",
					prop: "data",
					component: {
						name: "cl-codemirror"
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "ID", prop: "id" },
				{ label: "名称", prop: "name" },
				{ label: "格式", prop: "format" },
				{ label: "文件", prop: "templateFile", component: { name: "cl-link" } },
				{ label: "数量", prop: "count" },
				{ label: "留言", prop: "remark", showOverflowTooltip: true },
				{ label: "创建时间", prop: "createTime" },
				{ label: "更新时间", prop: "updateTime" },
				{ type: "op", buttons: ["slot-build", "edit", "delete"] }
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.project.doc).done();
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
