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
	cool: {
		// 注入视图路由中
		route: {
			path: "/project/admin/equipment", // 路由地址
			meta: {
				keepAlive: true, // 是否缓存路由
				label: "项目设备" // 路由名称
			}
		}
	},
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
					label: "货物名称",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "brand",
					label: "品牌",
					span: 24,
					value: [],
					component: {
						name: 'el-input'
					}
				},
				{
					prop: "model",
					label: "型号",
					component: {
						name: "el-input"
					}
				},
				{
					prop: "norm",
					label: "规格",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "manufacturer",
					label: "制造商名称",
					span: 24,
					component: {
						name: "el-input"
					}
				},
				{
					prop: "country",
					label: "国籍",
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
					label: "货物名称",
					width: 300
				},
				{
					prop: "brand",
					label: "品牌",
					width: 200
				},
				{
					prop: "model",
					label: "型号",
					width: 300
				},
				{
					prop: "norm",
					label: "规格",
					width: 200
				},
				{
					prop: "manufacturer",
					label: "制造商名称",
					width: 200
				},
				{
					prop: "country",
					label: "国籍",
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
			ctx.service(service.project.equipment).done();
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

<style lang="scss" scoped>

</style>