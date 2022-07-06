<template>
	<cl-crud class="project-crud-contacts scroller1" :ref="setRefs('crud')" @load="onLoad">
		<el-row type="flex" align="middle">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-import-btn filename="各方联系人导入模板" :columns="table.columns" :on-import="onImport" />
			<!-- 导出按钮 -->
			<cl-export-btn filename="各方联系人" :columns="table.columns" />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table :ref="setRefs('table')" v-bind="table" style="max-height: 700px">
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
import { useCool } from "/@/cool";
import { ElMessage } from "element-plus";

export default defineComponent({
	name: "yx-proj-tab-contacts",
	props: {},
	setup(props: any) {
		const { refs, setRefs, service } = useCool();
		const project = inject<any>("project");

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "描述",
					prop: "name",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "代表设备/项目性质",
					prop: "device",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "生产商",
					prop: "manufacturer",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "职位",
					prop: "jobs",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "联系人",
					prop: "person",
					required: true,
					component: {
						name: "el-input"
					}
				},
				{
					label: "联系电话",
					prop: "phone",
					required: true,
					component: {
						name: "el-input"
					}
				}
			]
		});

		// 表格配置
		const table = reactive<Table>({
			columns: [
				{ type: "selection" },
				{ label: "描述", prop: "name" },
				{ label: "代表设备/项目性质", prop: "device" },
				{ label: "生产商", prop: "manufacturer" },
				{ label: "职位", prop: "jobs" },
				{ label: "联系人", prop: "person" },
				{ label: "联系电话", prop: "phone" }
			]
		});

		onMounted(async () => {

		});

		// crud 加载
		async function onLoad({ ctx, app }: CrudLoad) {
			ctx.service({
				page(data) {
					return service.project.contacts.page({
						projectId: project.value.id,
						...data
					});
				},
				list() {
					return service.project.contacts.list();
				},
				info(data) { 
					return service.project.contacts.info(data);
				},
				update(data) {
					return service.project.contacts.update(data);
				},
				add(data) {
					return service.project.contacts.add({
						projectId: project.value.id,
						...data
					});
				},
				delete(data) {
					return service.project.contacts.delete(data);
				}
			}).done();
			app.refresh();
		}

		async function onImport(data: Array<any> = []) {
			data.map((item) => {
				service.project.contacts
					.add({
						projectId: project.value.id,
						...item
					})
					.then(() => {
						ElMessage.success("导入成功");
						refs.value.crud.refresh();
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
			onImport
		};
	}
});
</script>

<style lang="scss" scoped>
.project-crud-contacts {
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