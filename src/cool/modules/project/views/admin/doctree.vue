<template>
	<cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
		<el-row type="flex">
			<cl-refresh-btn />
			<cl-add-btn />
		</el-row>

		<el-row>
			<cl-table :ref="setRefs('table')" v-bind="table" @row-click="onRowClick">
				<!-- 生成模板文档 -->
				<template #slot-build="{ scope }">
					<el-button
						v-if="scope.row.type != 0"
						type="text"
						size="mini"
						@click="openBuildDialog(scope.row)"
						>文档配置</el-button
					>
				</template>

				<!-- 行新增 -->
				<template #slot-add="{ scope }">
					<el-button
						v-if="scope.row.type != 1"
						type="text"
						size="mini"
						@click="upsertAppend(scope.row)"
						>新增</el-button
					>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<cl-pagination :props="{ layout: 'total' }" />
		</el-row>

		<!-- 测试生成模板文档 -->
		<cl-dialog title="测试" v-model="buildDialog"
			width="1000px"
		>
			<build-doc :test-mode="true"></build-doc>
		</cl-dialog>

		<!-- 编辑 -->
		<cl-upsert v-bind="upsert" />
	</cl-crud>
</template>

<script lang="ts">
import { useCool } from "/@/cool";
import { deepTree } from "/@/cool/utils";
import { defineComponent, h, provide, reactive, ref } from "vue";
import { CrudLoad, Table, Upsert, RefreshOp } from "@cool-vue/crud/types";
import BuildDoc from "../../components/doc/buildDoc.vue";

export default defineComponent({
  components: {
		BuildDoc
	},
	// cool: {
	// 	// 注入视图路由中
	// 	route: {
	// 		path: "/proj/admin/doctree", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "文档模板" // 路由名称
	// 		}
	// 	}
	// },
	setup() {
		const { refs, setRefs, service, router } = useCool();
		const buildDialog = ref<boolean>(false);
		const buildDocObj	= ref<any>({});
    provide('doc', buildDocObj);

		// 打开生成对话框
		function openBuildDialog(scope: any) {
      service.project.doc.info({id: scope.docId}).then((data: any) => {
        buildDocObj.value = data
			  buildDialog.value = true
      })
		}

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			ctx.service(service.project.doctree).done();
			app.refresh();
		}

		// 刷新监听
		function onRefresh(_: any, { render }: RefreshOp) {
			service.project.doctree.list().then((list: any[]) => {

				render(deepTree(list), {
					total: list.length
				});
			});
		}

		// 行点击展开
		function onRowClick(row: any, column: any) {
			if (column.property && row.children) {
				refs.value.table.toggleRowExpansion(row);
			}
		}

		// 子集新增
		function upsertAppend({ type, id }: any) {
			refs.value.crud.rowAppend({
				parentId: id,
				type: type + 1
			});
		}

		// 跳转
		function toUrl(url: string) {
			router.push(url);
		}

		// 表格配置
		const table = reactive<Table>({
			props: {
				"row-key": "id"
			},
			"context-menu": [
				(row: any) => {
					return {
						label: "新增",
						hidden: row.type == 1,
						callback: (_: any, done: Function) => {
							upsertAppend(row);
							done();
						}
					};
				},
				"update",
				"delete"
			],
			columns: [
				{
					prop: "name",
					label: "名称",
					align: "left",
					width: 200
				},
				{
					prop: "type",
					label: "类型",
					width: 100,
					dict: [
						{
							label: "目录",
							value: 0
						},
						{
							label: "文档",
							value: 1
						}
					]
				},
				{
					prop: "docId",
					label: "文档Id",
					minWidth: 100
				},
				{
					prop: "count",
					label: "数量",
					width: 100
				},
				{
					prop: "remark",
					label: "备注",
					minWidth: 200,
					showOverflowTooltip: true
				},
				{
					prop: "orderNum",
					label: "排序号",
					width: 90
				},
				{
					prop: "updateTime",
					label: "更新时间",
					sortable: "custom",
					width: 150
				},
				{
					type: "op", buttons: ["slot-add", "slot-build", "edit", "delete"] 
				}
			]
		});

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			dialog: {
				width: "800px"
			},
			items: [
				{
					prop: "type",
					value: 0,
					label: "节点类型",
					span: 24,
					component: {
						name: "el-radio-group",
						options: [
							{
								label: "目录",
								value: 0
							},
							{
								label: "文档",
								value: 1
							}
						]
					}
				},
				{
					prop: "name",
					label: "节点名称",
					span: 24,
					hidden: ({ scope }: any) => scope.type != 0,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入节点名称"
						}
					},
					required: true
				},
				{
					prop: "parentId",
					label: "上级节点",
					span: 24,
					component: {
						name: "cl-prj-select-tree"
					}
				},
				{
					prop: "docId",
					label: "文档",
					span: 24,
					hidden: ({ scope }: any) => scope.type != 1,
					component: {
						name: "cl-doc-select",
						props: {
              cloneValue: "remark",
							multipleLimit: 1,
							filterable: true,
							placeholder: "请选择模板文档"
						}
					}
				},
				{
					prop: "count",
					label: "数量",
					span: 24,
					hidden: ({ scope }: any) => scope.type != 1,
					component: {
						name: "el-input-number",
						props: {
							placeholder: "请填写数量",
							min: 1,
							max: 99,
							"controls-position": "right"
						}
					}
				},
				{
					prop: "remark",
					label: "备注",
					span: 24,
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入备注"
						}
					}
				},
				{
					prop: "orderNum",
					label: "排序号",
					span: 24,
					component: {
						name: "el-input-number",
						props: {
							placeholder: "请填写排序号",
							min: 0,
							max: 99,
							"controls-position": "right"
						}
					}
				}
			]
		});

		return {
			refs,
			table,
			upsert,
			setRefs,
			onLoad,
			onRefresh,
			onRowClick,
			upsertAppend,
			openBuildDialog,
			buildDialog,
			toUrl
		};
	}
});
</script>

<style lang="scss" scoped>

</style>