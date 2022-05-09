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
	// 		path: "/proj/admin/contacts", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "各方联系人" // 路由名称
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
					prop: "name",
					label: "描述",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "device",
					label: "代表设备/项目性质",
					span: 24,
					value: [],
					component: {
						name: 'el-input'
					},
					props: {
						labelWidth: "130px"
					}
				},
				{
					prop: "manufacturer",
					label: "生产商",
					component: {
						name: "el-input"
					}
				},
				{
					prop: "jobs",
					label: "职位",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "person",
					label: "联系人",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "phone",
					label: "联系电话",
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
					prop: "name",
					label: "描述",
					width: 200
				},
				{
					prop: "device",
					label: "代表设备/项目性质",
					width: 350
				},
				{
					prop: "manufacturer",
					label: "生产商",
					width: 300
				},
				{
					prop: "jobs",
					label: "职位",
					width: 200
				},
				{
					prop: "person",
					label: "联系人",
					width: 80
				},
				{
					prop: "phone",
					label: "联系电话",
					width: 180
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
			ctx.service(service.project.contact).done();
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
