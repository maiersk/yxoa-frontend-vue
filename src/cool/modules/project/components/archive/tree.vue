<template>
	<div class="cl-archive-tree">
		<div class="cl-archive-tree__header">
			<div>项目文档结构</div>

			<ul class="cl-archive-tree__op">
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

		<div class="cl-archive-tree__container" @contextmenu.stop.prevent="openCM">
			<el-tree
				:ref="setRefs('treeRef')"
				:data="list"
				:props="{
					label: 'orderName'
				}"
				:draggable="isDrag"
				:allow-drag="allowDrag"
				:allow-drop="allowDrop"
				:expand-on-click-node="false"
				v-loading="loading"
				@node-contextmenu="openCM"
				highlight-current
				default-expand-all
				node-key="id"
			>
				<template #default="{ node, data }">
					<div class="cl-archive-tree__node">
						<span class="cl-archive-tree__node-label"
							@click="rowClick(data)"
							:class="{
								'cl-archive-tree__node-label-wait': node.data.type === 1 && node.data?.status === 'wait',
								'cl-archive-tree__node-label-success': node.data?.status === 'success'
							}"
						>
							{{ node.label }}
						</span>
						<span
							v-if="isMini"
							class="cl-archive-tree__node-icon"
							@click="openCM($event, data, node)"
						>
							<i class="el-icon-more"></i>
						</span>
					</div>
				</template>
			</el-tree>
		</div>

		<cl-form :ref="setRefs('form')" />
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ContextMenu } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { isArray, revDeepTree, isPc } from "/@/cool/utils";
import { deepTree } from '../../utils/';

export default defineComponent({
	name: "yx-archive-tree",

	components: {

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

	emits: ["list-change", "row-click"],

	setup(props: any, { emit }) {
		const { refs, setRefs, service } = useCool();

		const archiveObj: any = inject("archive");

		// 树形列表
		const list = ref<any[]>([]);
		const toTree = ref<any[]>([]);

		// 加载中
		const loading = ref<boolean>(false);

		// 是否能拖动
		const isDrag = ref<boolean>(false);

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

			await service.project.archivedoc.list(archiveObj.value.id).then((res: any[]) => {
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
			const method = e.id ? "update" : "add";

			// 编辑和新增标题切换
			const title = method === "update" ? "编辑" : "新增";
			
			let itemsOptions: any = [
				{
					label: "目录",
					value: 0
				},
				{
					label: "文档",
					value: 1
				}
			]

			refs.value.form.open({
				title,
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
							options: itemsOptions
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
                ser: 'archivedoc',
								projectId: archiveObj.value.id
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
            prop: "file",
            label: "上传文件",
            hidden: ({ scope }: any) => scope.type == 0,
            value: "",
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
						prop: "remark",
						label: "备注",
						hidden: ({ scope }: any) => scope.type == 0,
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
						let docNodes = data.docNodes;			
						if (!data.root && data.docNodes) {
							if (data.docNodes[0]?.children ?? false) {
								docNodes.shift();
							}
						}

						service.project.archivedoc[method]({
							id: data.id,
							type: data.type,
							archiveId: archiveObj.value.id,
							name: data.name,
              file: data.file,
							remark: data.remark,
							parentId: data.parentId,
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

		// 复制
		async function rowCopy(data: any) {
			const nodes: any = [];
			nodes.push(data.id);
			const addNodeinList = (n: any) => {
				if (n.children) {
					n.children.forEach((child: any) => {
						nodes.push(child.id);
						addNodeinList(child);
					})
				}
			}
			await addNodeinList(data);

			await service.project.archivedoc.copy({
				id: data.id,
				type: 2,
				docId: data.docId,
				archiveId: archiveObj.value.id,
				nodeIds: nodes,
				name: data.name,
				remark: data.remark,
				parentId: data.parentId,
				orderNum: data.orderNum
			}).then((res: any) => {
				console.log(res);
				refresh();
			})
		}

		// 删除
		function rowDel(e: any) {
			const del = async (f: boolean) => {
				await service.project.archivedoc
					.delete({
						archiveId: archiveObj.value.id,
						ids: [e.id]
					}).then(() => {
						if (f) {
							ElMessage.success("删除成功");
						}
					});

				refresh();
			};

			ElMessageBox.confirm(`该操作会删除 “${e.name}” 的所有文档，是否确认？`, "提示", {
				type: "warning",
				confirmButtonText: "直接删除",
				cancelButtonText: "取消",
				distinguishCancelAndClose: true
			}).then(() => {
				del(true);
			})
		}

		// 排序
		function treeOrder(f: boolean) {
			if (f) {
				ElMessageBox.confirm("结构已发生改变，是否保存？", "提示", {
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

						await service.project.archivedoc
							.order({
								archiveId: archiveObj.value.id,
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
							rowEdit({
								name: "",
								parentName: d.name,
								parentId: d.id
							});
							done();
						}
					},
					{
						label: "复制",
						"suffix-icon": "el-icon-copy-document",
						hidden: !service.project.doctree._permission.prjdoccopy,
						callback: (_: any, done: Function) => {
							rowCopy(d);
							done();
						}
					},
					{
						label: "编辑",
						"suffix-icon": "el-icon-edit",
						hidden: !service.project.doctree._permission.prjdocupdate,
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
				]
			});
		}

		onMounted(function () {
			refresh();
		});

		function getCurrentNode() {
			return refs.value.treeRef.getCurrentNode();
		}

		function getNode(node: any) {
			return refs.value.treeRef.getNode(node);
		}

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
			toTree,
			getNode,
			getCurrentNode
		};
	}
});
</script>

<style lang="scss">
.cl-archive-tree {
	height: 100%;
	min-height: 500px;
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

			&-wait {
				color: #e6a23c;
			}
			&-success {
				color: green;
			}
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
