<template>
	<div class="cl-prj-tree">
		<div class="cl-prj-tree__header">
			<div>项目架构</div>

			<ul class="cl-prj-tree__op">
				<li>
					<el-tooltip content="刷新">
						<i class="el-icon-refresh" @click="refresh()"></i>
					</el-tooltip>
				</li>

				<li v-if="drag && !isMini">
					<el-tooltip content="拖动排序">
						<i class="el-icon-s-operation" @click="isDrag = true"></i>
					</el-tooltip>
				</li>

				<li v-show="isDrag" class="no">
					<el-button type="text" size="mini" @click="treeOrder(true)">保存</el-button>
					<el-button type="text" size="mini" @click="treeOrder(false)">取消</el-button>
				</li>
			</ul>
		</div>

		<div class="cl-prj-tree__container" @contextmenu.stop.prevent="openCM">
			<el-tree
				v-loading="loading"
				node-key="id"
				highlight-current
				default-expand-all
				:data="list"
				:props="{
					label: 'name'
				}"
				:draggable="isDrag"
				:allow-drag="allowDrag"
				:allow-drop="allowDrop"
				:expand-on-click-node="false"
				@node-contextmenu="openCM"
			>
				<template #default="{ node, data }">
					<div class="cl-prj-tree__node">
						<span class="cl-prj-tree__node-label" @click="rowClick(data)">{{
							node.label
						}}</span>
						<span
							v-if="isMini"
							class="cl-prj-tree__node-icon"
							@click="openCM($event, data, node)"
						>
							<i class="el-icon-more"></i>
						</span>
					</div>
				</template>
			</el-tree>
		</div>

		<!-- 打开树形穿梭框 -->
		<cl-dialog title="项目文档" v-model="docTreeDialog" width="1000px">
			<!-- <transfer-tree-box :treelist="list"></transfer-tree-box> -->
		</cl-dialog>

		<cl-form :ref="setRefs('form')" />
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ContextMenu } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { deepTree, isArray, revDeepTree, isPc } from "/@/cool/utils";
// import TransferTreeBox from '../transferTree/index.vue';

export default defineComponent({
	name: "cl-prj-tree",

	components: {
		// TransferTreeBox
	},

	props: {
		drag: {
			type: Boolean,
			default: true
		},
		level: {
			type: Number,
			default: 99
		}
	},

	emits: ["list-change", "row-click", "doc-add"],

	setup(props: any, { emit }) {
		const { refs, setRefs, service } = useCool();

		const projectObj: any = inject("project");

		// 树形列表
		const list = ref<any[]>([]);
		const toTree = ref<any[]>([]);

		// 加载中
		const loading = ref<boolean>(false);

		// 是否能拖动
		const isDrag = ref<boolean>(false);

		const docTreeDialog = ref<boolean>(false);

		function openDocTreeDialog() {
			docTreeDialog.value = true;
		}

		// 允许托的规则
		function allowDrag({ data }: any) {
			return data.parentId;
		}

		// 允许放的规则
		function allowDrop(_: any, dropNode: any) {
			return dropNode.data.parentId;
		}

		// 刷新
		async function refresh() {
			isDrag.value = false;
			loading.value = true;

			await service.project.doctree.prjdoclist(projectObj.value.id).then((res: any[]) => {
				// console.log(res);
				list.value = deepTree(res);
				emit("list-change", list.value);
			});

			loading.value = false;
		}

		// 获取 ids
		function rowClick(e: any) {
			const ids = e.children ? revDeepTree(e.children).map((e) => e.id) : [];
			ids.unshift(e.id);
			emit("row-click", { item: e, ids });
		}

		// 编辑
		function rowEdit(e: any) {
			const method = e.id ? "prjdocupdate" : "prjdocadd";

			refs.value.form.open({
				title: "编辑",
				width: "550px",
				props: {
					labelWidth: "100px"
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
						prop: "docId",
						label: "文档",
						span: 24,
						hidden: ({ scope }: any) => scope.type != 1,
						component: {
							name: "cl-doc-select",
							props: {
								cloneValue: "remark,name",
								multipleLimit: 1,
								filterable: true,
								placeholder: "请选择模板文档"
							}
						},
						required: true
					},
					{
						prop: "parentId",
						label: "上级节点",
						span: 24,
						component: {
							name: "cl-prj-select-tree",
							props: {
								listStr: "prjdoclist",
								projectId: projectObj.value.id
							}
						},
						require: true
					},
					{
						prop: "name",
						label: "节点名称",
						span: 24,
						value: '',
						component: {
							name: "el-input",
							props: {
								placeholder: "请输入节点名称"
							}
						},
						required: true
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
						value: 0,
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
				],
				form: e,
				on: {
					submit: (data: any, { done, close }: any) => {
						service.project.doctree[method]({
							id: data.id,
							type: data.type,
							docId: data.docId,
							projectId: projectObj.value.id,
							name: data.name,
							remark: data.remark,
							parentId: e.parentId,
							orderNum: data.orderNum
						})
							.then(() => {
								ElMessage.success(`新增成功`);
								close();
								refresh();
							})
							.catch((err: string) => {
								ElMessage.error(err);
								done();
							});
					}
				}
			});
		}

		// 删除
		function rowDel(e: any) {
			const del = async (f: boolean) => {
				await service.project.doctree
					.prjdocdelete({
						projectId: projectObj.value.id,
						ids: [e.id],
						deleteUser: f
					})
					.then(() => {
						if (f) {
							ElMessage.success("删除成功");
						} else {
							ElMessageBox.confirm(
								`“${e.name}” 的文档已成功转移到 “${e.parentName}” 。`,
								"删除成功"
							);
						}
					});

				refresh();
			};

			ElMessageBox.confirm(`该操作会删除 “${e.name}” 的所有文档，是否确认？`, "提示", {
				type: "warning",
				confirmButtonText: "直接删除",
				cancelButtonText: "保留文档",
				distinguishCancelAndClose: true
			})
				.then(() => {
					del(true);
				})
				.catch((action: string) => {
					if (action == "cancel") {
						del(false);
					}
				});
		}

		// 排序
		function treeOrder(f: boolean) {
			if (f) {
				ElMessageBox.confirm("架构已发生改变，是否保存？", "提示", {
					type: "warning"
				})
					.then(async () => {
						const ids: any[] = [];

						const deep = (list: any[], pid: any) => {
							list.forEach((e) => {
								e.parentId = pid;
								ids.push(e);

								if (e.children && isArray(e.children)) {
									deep(e.children, e.id);
								}
							});
						};

						deep(list.value, null);

						await service.project.doctree
							.prjdocorder({
								projectId: projectObj.value.id,
								ids: ids.map((e, i) => {
									return {
										id: e.id,
										parentId: e.parentId,
										orderNum: i
									};
								})
							})
							.then(() => {
								ElMessage.success("更新排序成功");
							})
							.catch((err: string) => {
								ElMessage.error(err);
							});

						refresh();
						isDrag.value = false;
					})
					.catch(() => null);
			} else {
				refresh();
			}
		}

		// 右键菜单
		function openCM(e: any, d?: any, n?: any) {
			if (!d) {
				d = list.value[0] || {};
			}

			ContextMenu.open(e, {
				list: [
					{
						label: "新增",
						"suffix-icon": "el-icon-plus",
						hidden:
							(n && n.level >= props.level) ||
							!service.project.doctree._permission.prjdocadd,
						callback: (_: any, done: Function) => {
							// openDocTreeDialog()
							rowEdit({
								name: "",
								parentName: d.name,
								parentId: d.id
							});
							done();
						}
					},
					{
						label: "编辑",
						"suffix-icon": "el-icon-edit",
						hidden: !service.project.doctree._permission.update,
						callback: (_: any, done: Function) => {
							rowEdit(d);
							done();
						}
					},
					{
						label: "删除",
						"suffix-icon": "el-icon-delete",
						hidden: !service.project.doctree._permission.prjdocdelete,
						callback: (_: any, done: Function) => {
							rowDel(d);
							done();
						}
					}
					// {
					// 	label: "新增文档",
					// 	"suffix-icon": "el-icon-user",
					// 	hidden: !service.project.doc._permission.add,
					// 	callback: (_: any, done: Function) => {
					// 		emit("doc-add", d);
					// 		done();
					// 	}
					// }
				]
			});
		}

		onMounted(function () {
			console.log(projectObj);
			refresh();
		});

		return {
			refs,
			list,
			loading,
			isDrag,
			isMini: !isPc(),
			setRefs,
			openCM,
			allowDrag,
			allowDrop,
			refresh,
			rowClick,
			rowEdit,
			rowDel,
			treeOrder,
			docTreeDialog,
			toTree
		};
	}
});
</script>

<style lang="scss">
.cl-prj-tree {
	height: 100%;
	width: 100%;

	&__header {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 10px;
		background-color: #fff;
		letter-spacing: 1px;
		position: relative;

		div {
			font-size: 14px;
			flex: 1;
			white-space: nowrap;
		}

		i {
			font-size: 18px;
			cursor: pointer;
		}
	}

	&__op {
		display: flex;

		li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			margin-left: 5px;
			padding: 5px;
			cursor: pointer;

			&:not(.no):hover {
				background-color: #eee;
			}
		}
	}

	&__container {
		height: calc(100% - 40px);
		overflow-y: auto;
		overflow-x: hidden;

		.el-tree-node__content {
			height: 36px;
			margin: 0 5px;
		}
	}

	&__node {
		display: flex;
		align-items: center;
		height: 100%;
		width: 100%;
		box-sizing: border-box;

		&-label {
			display: flex;
			align-items: center;
			flex: 1;
			height: 100%;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&-icon {
			height: 28px;
			width: 28px;
			line-height: 28px;
			text-align: center;
			margin-right: 5px;
		}
	}
}
</style>
