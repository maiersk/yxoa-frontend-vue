<template>
	<div class="project-doctdetail scroller1">
		<div class="pane">
			<!-- 文档架构 -->
			<div class="project" :class="[isExpand ? '_expand' : '_collapse']">
				<prj-tree
					@row-click="onprojectRowClick"
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

					<span>文档预览</span>
				</div>

				<build-doc />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, provide, reactive, ref, watch } from "vue";
import { useCool } from "/@/cool";
import { isEmpty } from "/@/cool/utils";
import PrjTree from "../project/tree.vue";
import BuildDoc from "../doc/buildDoc.vue";

export default defineComponent({
	name: "sys-doc",
	components: {
		PrjTree,
		BuildDoc
	},
	setup() {
		const { refs, setRefs, store, service } = useCool();

		const projectObj: any = inject("project");
		const buildDialog = ref<boolean>(false);
		const buildDocObj	= ref<Object>({
			id: 0,
			type: 0,
			data: "",
			templateFile: ""
		});
		const selectNode = ref<Object>({});
		provide('select-node', selectNode);
    provide('doc', buildDocObj);

		// 打开生成对话框
		function openBuildDialog(scope: any) {
			service.project.doctree.info({id : scope.docId}).then((data: any) => {
				buildDocObj.value = data;
				buildDialog.value = true;
			})
		}

		// 是否展开
		const isExpand = ref<boolean>(true);

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

		// 刷新监听
		async function onRefresh(params: any, { next, render }: any) {
			const { list } = await next(params);

			render(
				list.map((e: any) => {
					if (e.roleName) {
						e.roleNameList = e.roleName.split(",");
					}

					e.status = Boolean(e.status);

					return e;
				})
			);
		}

		// 目录选择监听
		function onprojectRowClick({ item, ids }: any) {
			selectNode.value = item

			if (isEmpty(item.docId)) { return }

			service.project.doctree.prjdocinfo({
				projectId: projectObj.value.id,
				id: item.id
			}).then((data: any) => {
				buildDocObj.value = data; 
			})

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
			service,
			refs,
			isExpand,
			projectObj,
			buildDocObj,
			browser,
			setRefs,
			onRefresh,
			onprojectRowClick,
			ondoctreeListChange,
			projectExpand,
			openBuildDialog
		};
	}
});
</script>

<style lang="scss" scoped>
.project-doctdetail {
	height: auto;
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
	}

	.project,
	.doc {
		overflow: hidden;
		height: 100%;

		.container {
			height: calc(100% - 10px);
		}
	}

	@media only screen and (max-width: 768px) {
		.project {
			width: calc(100% - 100px);
		}
	}
}
</style>
