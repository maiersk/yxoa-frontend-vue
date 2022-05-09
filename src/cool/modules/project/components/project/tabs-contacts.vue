<template>
	<cl-crud class="project-crud-user scroller1" :ref="setRefs('crud')" @load="onLoad">
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

export default defineComponent({
	name: "project-contacts",
	props: {},
	setup(props: any) {
		const { refs, setRefs, service } = useCool();
		const project = inject<any>("project");

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "选择联系人",
					prop: "contactsId",
					required: true,
					component: {
						name: "cl-contacts-select",
						props: {
							multipleLimit: 1
						}
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
				page() {
					return service.project.contacts.page({
						projectId: project.value.id
					});
				},
				list() {
					return service.project.contacts.list();
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

		return {
			refs,
			upsert,
			table,
			onLoad,
			setRefs,
			project
		};
	}
});
</script>

<style lang="scss" scoped>
.project-crud-user {
	height: calc(100% - 30%);
	margin: 0.5rem;
	padding: 1rem;
	background-color: white;
	box-shadow: 0 2px 4px 0 rgb(54 58 80 / 32%);
}
</style>