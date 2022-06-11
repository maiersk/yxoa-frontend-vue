<template>
	<div class="project-doctdetail scroller1">
		<div class="pane">
			<!-- 文档架构 -->
			<div class="project" :class="[isExpand ? '_expand' : '_collapse']">
				<prj-tree
					ref="prj_treeRef"
					@row-click="onNodeRowClick"
					@list-change="ondoctreeListChange"
				/>
			</div>

			<!-- 文档预览 -->
			<div class="doc">
				<div class="header">
					<div class="icon" @click="projectExpand">
						<i class="el-icon-arrow-left" v-if="isExpand"></i>
						<i class="el-icon-arrow-right" v-else></i>
					</div>

					<span v-if="selectNode.type === 1">文档预览</span>
					<span v-else>目录预览</span>
				</div>

				<div class="container">
					<tree-context @treeRefresh="reqRefresh"></tree-context>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, provide, ref, watch } from "vue";
import { useCool } from "/@/cool";
import PrjTree from "../project/tree.vue";
import TreeContext from "../doc/treeContext/index.vue";

export default defineComponent({
	name: "yx-proj-tab-doc",
	components: {
		PrjTree,
		TreeContext
	},
	setup() {
		const { refs, setRefs, store, service } = useCool();

		const projectObj: any = inject("project");
		const docObj	= ref<Object>({
			id: 0,
			data: "",
			templateFile: ""
		});
		const selectNode = ref<Object>({
			id: 0,
			type: 0,
		});
		const prj_treeRef = ref<any>();
		provide('select-node', selectNode);
    provide('doc', docObj);

		//刷新树和树内容组件
		//	treeContext 提交请求刷新，tree实现原本node方法获取新旧node。
		//	执行选中节点使用刷新后的node数据
		const reqRefresh = async () => {
			const selected = await prj_treeRef.value.getCurrentNode();
		  await	prj_treeRef.value.refresh();
			const nowSelect = await prj_treeRef.value.getNode(selected);
			await	onNodeRowClick({ item: nowSelect.data });
		}

		// 是否展开
		const isExpand = ref<boolean>(false);

		// 文档树列表
		const doctree = ref<any[]>([]);

		// 浏览器信息
		const browser = computed(() => store.getters.browser);

		// 监听屏幕大小变化
		watch(
			() => browser.value.isMini,
			(val: boolean) => {
				isExpand.value = !val;
			},
			{
				immediate: true
			}
		);

		// 节点选中监听
		function onNodeRowClick({ item, ids }: any) {
			selectNode.value = item

			if (item?.docId ?? false) {
				service.project.doc.info({
					id: item.docId
				}).then((data: any) => {
					docObj.value = data; 
				})
			}

			// 收起
			if (browser.value.isMini) {
				isExpand.value = false;
			}
		}

		// 文档树列表监听
		function ondoctreeListChange(list: any[]) {
			doctree.value = list;
		}

		// 是否显示文档树
		function projectExpand() {
			isExpand.value = !isExpand.value;
		}

		return {
			prj_treeRef,
			service,
			refs,
			isExpand,
			projectObj,
			browser,
			docObj,
			selectNode,
			setRefs,
			onNodeRowClick,
			ondoctreeListChange,
			projectExpand,
			reqRefresh
		};
	}
});
</script>

<style lang="scss" scoped>
.project-doctdetail {
	margin: 0.5rem;
	padding: 1rem;
	background-color: white;
	box-shadow: 0 2px 4px 0 rgb(54 58 80 / 32%);

	.pane {
		display: flex;
		height: 100%;
		width: 100%;
		position: relative;
	}

	.project {
		height: 100%;
		width: 300px;
		max-width: calc(100% - 50px);
		background-color: #fff;
		transition: width 0.3s;
		margin-right: 10px;
		flex-shrink: 0;

		&._collapse {
			margin-right: 0;
			width: 0;
		}
	}

	.doc {
		width: calc(100% - 310px);
		height: 100%;
		flex: 1;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			position: relative;
			background-color: #fff;
			margin-bottom: 1rem;

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

		.container {
			height: 100%;
		}
	}

	@media only screen and (max-width: 768px) {
		.project {
			width: calc(100% - 100px);
		}
	}
}
</style>
