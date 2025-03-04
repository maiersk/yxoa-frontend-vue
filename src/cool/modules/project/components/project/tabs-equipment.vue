<template>
	<cl-crud class="project-crud-user scroller1" :ref="setRefs('crud')" @load="onLoad">
		<el-row type="flex" align="middle">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 导入按钮 -->
			<cl-import-btn filename="设备导入模板" :columns="XLSXcolumns" :on-import="onImport" />
			<!-- 导出按钮 -->
			<cl-export-btn filename="设备" :columns="XLSXcolumns" />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table :ref="setRefs('table')" v-bind="table" style="max-height: 700px">
				<!-- 头像 -->
				<template #column-headImg="{ scope }">
					<cl-avatar
						shape="square"
						size="medium"
						:src="scope.row.headImg"
						:style="{ margin: 'auto' }"
					/>
				</template>
			</cl-table>
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
import { defineComponent, onMounted, reactive, inject } from "vue";
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { ElMessage } from "element-plus";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "yx-proj-tab-equipment",
	props: {},
	setup(props: any) {
		const { refs, setRefs, service } = useCool();
		const project = inject<any>("project");

		const XLSXcolumns = reactive<any>([
			{ label: "货物名称", prop: "name" },
			{ label: "品牌", prop: "brand" },
			{ label: "型号", prop: "model" },
			{ label: "规格", prop: "norm" },
			{ label: "制作商名称", prop: "manufacturer" },
			{ label: "国籍", prop: "country" },
			{ label: "单位", prop: "unit" },
			{ label: "数量", prop: "count" },
			{ label: "含税单价", prop: "price" },
			{ label: "投标总价", prop: "totalprice" },
			{ label: "备注", prop: "remark" }
		]);

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "货物名称",
					prop: "name",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "品牌",
					prop: "brand",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "型号",
					prop: "model",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "规格",
					prop: "norm",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "制作商名称",
					prop: "manufacturer",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "国籍",
					prop: "country",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "数量",
					prop: "count",
					required: true,
					component: {
						name: "el-input-number",
						props: {
							placeholder: "请输入数量"
						}
					}
				},
				{
					label: "单位",
					prop: "unit",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "含税单价",
					prop: "price",
					required: true,
					component: {
						name: "el-input-number",
						props: {
							placeholder: "请输入含税单价"
						}
					}
				},
				{
					label: "投标总价",
					prop: "totalprice",
					required: true,
					component: {
						name: "el-input-number",
						props: {
							placeholder: "请输入投标总价"
						}
					}
				},
				{
					label: "备注",
					prop: "remark",
					component: {
						name: "el-input",
						props: {
							placeholder: "请输入备注"
						}
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "货物名称", prop: "name" },
				{ label: "品牌", prop: "brand" },
				{ label: "型号", prop: "model" },
				{ label: "规格", prop: "norm" },
				{ label: "制作商名称", prop: "manufacturer" },
				{ label: "国籍", prop: "country" },
				{ label: "单位", prop: "unit" },
				{ label: "数量", prop: "count" },
				{ label: "含税单价", prop: "price" },
				{ label: "投标总价", prop: "totalprice" },
				{ label: "备注", prop: "remark" }
			]
		});

		onMounted(async () => {});

		// crud 加载
		async function onLoad({ ctx, app }: CrudLoad) {
			ctx.service({
				page(data) {
					return service.project.equipments.page({
						projectId: project.value.id,
						...data
					});
				},
				list() {
					return service.project.equipments.list();
				},
				info(data) { 
					return service.project.equipments.info(data);
				},
				update(data) {
					return service.project.equipments.update(data);
				},
				add(data) {
					return service.project.equipments.add({
						projectId: project.value.id,
						...data
					});
				},
				delete(data) {
					return service.project.equipments.delete(data);
				}
			}).done();
			app.refresh();
		}

		async function onImport(data: Array<any> = []) {
			data.map((item) => {
				service.project.equipments
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
			upsert,
			table,
			onLoad,
			setRefs,
			project,
			onImport,
			XLSXcolumns
		};
	}
});
</script>

<style lang="scss" scoped>
.project-crud-user {
	display: flex;
	min-height: 600px;
	height: 100%;
	width: 100%;
	position: relative;
	margin: 0.5rem;
	padding: 1rem;
	background-color: white;
	box-shadow: 0 2px 4px 0 rgb(54 58 80 / 32%);
}
</style>