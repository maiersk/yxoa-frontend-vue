<template>
	<div class="project-consttab scroller1">
		<div class="pane">
			<!-- 点位任务 -->
			<div class="point-flow" :class="[isExpand ? '_expand' : '_collapse']">
				<cl-yx-point-list></cl-yx-point-list>
			</div>

			<!-- 点位表 -->
			<div class="point">
				<div class="header">
					<div class="icon" @click="clickExpand">
						<i class="el-icon-arrow-left" v-if="isExpand"></i>
						<i class="el-icon-arrow-right" v-else></i>
					</div>

					<span>点位表</span>
				</div>

				<div class="container">
					<cl-crud :ref="setRefs('crud')" :on-refresh="onRefresh" @load="onLoad">
						<el-row type="flex">
							<cl-refresh-btn />
							<cl-add-btn />
							<cl-multi-delete-btn />
							<cl-import-btn :columns="table.columns" :on-import="onImport" />
							<cl-flex1 />
							<cl-search-key />
						</el-row>

						<el-row>
							<cl-table :ref="setRefs('table')" v-bind="table"> </cl-table>
						</el-row>

						<el-row type="flex">
							<cl-flex1 />
							<cl-pagination />
						</el-row>

						<cl-upsert :ref="setRefs('upsert')" v-bind="upsert" />
					</cl-crud>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import { useCool } from "/@/cool/core";
import { CrudLoad, Upsert, Table } from "@cool-vue/crud/types";
import { ElMessage } from "element-plus";

export default defineComponent({
	name: "yx-proj-tab-consttab",
	setup() {
		const { refs, setRefs, service, store } = useCool();
		const project: any = inject("project");

		const isExpand = ref<boolean>(false);
		// 浏览器信息
		const browser: any = computed(() => store.getters.browser);

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

		function clickExpand () {
			isExpand.value = !isExpand.value;
		};

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "所属辖区",
					prop: "jurisdiction",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "地址名称",
					prop: "address",
					required: true,
					component: { name: "el-input" }
				},
				{
					label: "经度",
					prop: "lng",
					component: { name: "el-input" }
				},
				{
					label: "纬度",
					prop: "lat",
					component: { name: "el-input" }
				},
				{
					label: "图纸数量",
					prop: "drawCount",
					component: { name: "el-input" }
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "所属辖区", prop: "jurisdiction", showOverflowTooltip: true },
				{ label: "地址名称", prop: "address", showOverflowTooltip: true },
				{ label: "经度", prop: "lng" },
				{ label: "纬度", prop: "lat" },
				{ label: "图纸数量", prop: "drawCount" },
				{ type: "op", buttons: ["edit", "delete"] }
			]
		});

		// 刷新监听
		async function onRefresh(params: any, { next, render }: any) {
			const { list } = await next(params);

			render(
				list.map((e: any) => {
					return e;
				})
			);
		}

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.project.point).done();
			app.refresh();
		}

		async function onImport(data: Array<any> = []) {
			data.map((item) => {
				service.project.point
					.add({
						projectId: project.value.id,
						...item
					})
					.then(() => {
						ElMessage.success("导入成功");
					})
					.catch(() => {
						ElMessage.error("导入出错，可能导入了不完整数据");
					});
			});
		}

		return {
			refs,
			setRefs,
			isExpand,
			table,
			upsert,
			onRefresh,
			onLoad,
			clickExpand,
			onImport
		};
	}
});
</script>

<style lang="scss" scoped>
.project-consttab {
	min-height: 600px;
	height: 100%;
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

	.point-flow {
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

	.point {
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
			> .cl-crud {
				min-height: 600px;
			}
		}
	}

	@media only screen and (max-width: 768px) {
		.point-flow {
			width: calc(100% - 100px);
		}
	}
}
</style>