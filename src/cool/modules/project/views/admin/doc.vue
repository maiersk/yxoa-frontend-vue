<template>
	<div class="doc-lib">
		<div class="left-category">
			<category v-model="selectCategory" @change="refresh()" />
		</div>

		<div class="right-docs">
			<div class="header">
				<div class="icon" @click="onExpand">
					<i class="el-icon-arrow-left" v-if="visible"></i>
					<i class="el-icon-arrow-right" v-else></i>
				</div>

				<span>文档模板列表</span>
			</div>
			<div class="container">  
				<cl-crud :ref="setRefs('crud')" @load="onLoad">
					<el-row type="flex" align="middle">
						<!-- 刷新按钮 -->
						<cl-refresh-btn />
						<!-- 新增按钮 -->
						<cl-add-btn />
						<!-- 删除按钮 -->
						<cl-multi-delete-btn />
						<!-- v-permission="service.base.sys.user.permission.move" -->
						<el-button
							size="mini"
							type="success"
							:disabled="selects.ids.length == 0"
							@click="toMove()"
						>
							转移
						</el-button>
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
									label: '类型',
									value: 'type'
								}
							]"
						/>
					</el-row>

					<el-row>
						<!-- 数据表格 -->
						<cl-table
							:ref="setRefs('table')"
							v-bind="table"
							@selection-change="onSelectionChange"
						>
							<!-- 测试模板文档 -->
							<template #slot-build="{ scope }">
								<el-button type="text" size="mini" @click="openBuildDialog(scope.row)">
									文档设置
								</el-button>
							</template>
						</cl-table>
					</el-row>

					<el-row type="flex">
						<cl-flex1 />
						<!-- 分页控件 -->
						<cl-pagination />
					</el-row>

					<!-- 测试生成模板文档 -->
					<cl-dialog title="文档设置" v-model="buildDialog" width="1000px">
						<build-doc v-if="buildDialog" :test-mode="true"></build-doc>
					</cl-dialog>

					<!-- 新增、编辑 -->
					<cl-upsert :ref="setRefs('upsert')" v-bind="upsert">
						<template #doc-perview>
							<doc-perview></doc-perview>
						</template>
					</cl-upsert>
				</cl-crud>
			</div>
		</div>

		<!-- 分类移动 -->
		<category-move :ref="setRefs('category-move')" @success="refresh({ page:1 })"></category-move>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive, ref } from "vue";
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { useRefs } from "/@/cool";
import BuildDoc from "../../components/doc/buildDoc.vue";
import Category from "../../components/doc/category/category.vue";
import CategoryMove from "../../components/doc/category/move.vue";

export default defineComponent({
  name: 'public-doclib',
	// cool: {
	// 	// 注入视图路由中
	// 	route: {
	// 		path: "/proj/admin/doc", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "文档模板" // 路由名称
	// 		}
	// 	}
	// },
	components: {
		BuildDoc,
		Category,
		CategoryMove
	},
	setup(props, ctx) {
		const { refs, setRefs } = useRefs();
		const service = inject<any>("service");
		const buildDialog = ref<boolean>(false);
		const buildDocObj = ref<any>({});
		provide('doc', buildDocObj);

		// 打开生成对话框 
		function openBuildDialog(scope: any) {
			buildDocObj.value = scope;
			buildDialog.value = true;
		}

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "名称",
					prop: "name",
					required: true,
					component: { name: "el-input" }
				},
				{
					prop: "type",
					label: "类型",
					span: 24,
					value: 0,
					component: {
						name: "el-radio-group",
						options: [
							{
								label: "模板文档",
								value: 0
							},
							{
								label: "补充文档",
								value: 1
							}
						]
					}
				},
				{
					prop: "category",
					label: "选择分类",
					value: null,
					span: 24,
					component: {
						name: "cl-doccategory-select",
						props: {
							multipleLimit: 1,
							filterable: true,
							placeholder: "默认全部文件分类"
						}
					}
				},
				{
					label: "备注",
					prop: "remark",
					component: {
						name: "el-input",
						props: {
							type: "textarea",
							rows: 4
						}
					}
				},
				{
					label: "模板数据",
					prop: "data",
					value: "{}",
					component: {
						name: "cl-codemirror",
						props: {
							height: 200
						}
					}
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
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "名称", prop: "name" },
				{
					label: "类型",
					prop: "type",
					dict: [
						{
							label: "模板文档",
							value: 0
						},
						{
							label: "补充文档",
							value: 1
						}
					]
				},
				{ label: "文件", prop: "templateFile", component: { name: "cl-yx-file-link" } },
				{ label: "备注", prop: "remark", showOverflowTooltip: true },
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

		// 多选监听
		function onSelectionChange(selection: any[]) {
			selects.ids = selection.map((e) => e.id);
		}

		const selects = reactive<any>({
			ids: []
		});
		const selectCategory = ref<number>();

		function toMove(e: any) {
			let ids = [];

			if (!e) {
				ids = selects.ids;
			} else {
				ids = [e.id];
			}
			refs.value["category-move"].toMove(ids);
		}

		// 是否可见
		const visible = ref<boolean>(true);

		// 类目数据
		const category = reactive<any>({
			id: "",
			visible,
		});

		// 打开
		function open() {
			visible.value = true;
		}

		// 关闭
		function close() {
			visible.value = false;
		}

		function onExpand() {
			visible.value = !visible.value;
		}

		async function refresh(params: any = {}) {
			refs.value.crud.refresh({
				...params,
				category: selectCategory.value 
			})
		}

		provide("space", {
			category
		});

		return {
			refs,
			setRefs,
			upsert,
			table,
			onLoad,
			openBuildDialog,
			onSelectionChange,
			toMove,
			selects,
			buildDialog,
			buildDocObj,
			selectCategory,
			refresh,
			open,
			close,
			onExpand,
			visible,
		};
	}
});
</script>

<style lang="scss" scoped>
.doc-lib {
	display: flex;

	.left-category {

	}

	.right-docs {
		width: calc(100% - 310px);
		flex: 1;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			position: relative;
			background-color: #fff;

			span {
				font-size: 14px;
				white-space: nowrap;
				overflow: hidden;
			}

			.icon {
				position: absolute;
				left: 0;
				top: 0;
				font-size: 18px;
				cursor: pointer;
				background-color: #fff;
				height: 40px;
				width: 80px;
				line-height: 40px;
				padding-left: 10px;
			}
		}
	}

	.left-category,
	.right-docs {
		overflow: hidden;
		.container {
			height: calc(100% - 40px);
		}
	}
}
</style>