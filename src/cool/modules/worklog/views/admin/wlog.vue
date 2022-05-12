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
import { defineComponent, inject, onMounted, reactive } from "vue";
import { CrudLoad, Upsert, Table } from "@cool-vue/crud/types";
import { useRefs } from "/@/cool";

export default defineComponent({
	components: {

	},
	// cool: {
	// 	// 注入视图路由中
	// 	route: {
	// 		path: "/wlog/admin/worklog", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "日志列表" // 路由名称
	// 		}
	// 	}
	// },
	setup() {
		const { refs, setRefs } = useRefs();
		// 请求服务
		const service = inject<any>("service");

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			width: "1000px",
			items: [
				{
					prop: "title",
					label: "标题",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "category",
					label: "类别",
					span: 24,
					value: [],
					component: {
						name: 'cl-category-select',
						props: {
							multipleLimit: 1,
							filterable: true
						}
					}
				},
				{
					prop: "context",
					label: "内容",
					component: {
						name: "cl-editor-quill"
					}
				},
				{
					prop: "author",
					label: "发送人",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "receive",
					label: "接收人",
					span: 24,
					component: {
						name: "el-input"
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{
					type: "selection",
					width: 60
				},
				{
					prop: "title",
					label: "标题",
					width: 200
				},
				{
					prop: "context",
					label: "内容",
					width: 300
				},
				{
					prop: "categoryName",
					label: "日志类型",
					width: 300
				},
				{
					prop: "author",
					label: "发布人",
					width: 80
				},
				{
					prop: "receive",
					label: "接收人",
					width: 80
				},
				{
					prop: "pv",
					label: "阅读数",
					width: 80
				},
				{
					label: "操作",
					type: "op"
				}
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.worklog.wlog).done();
			app.refresh();
		}

		onMounted(() => {
			
		})

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
