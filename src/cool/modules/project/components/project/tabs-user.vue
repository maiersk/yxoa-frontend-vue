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
import { useCool } from "/@/cool";

export default defineComponent({
	name: "yx-proj-tab-user",
	props: {},
	setup(props: any) {
		const { refs, setRefs, service } = useCool();
		const project = inject<any>("project");

		// 新增、编辑配置
		const upsert = reactive<Upsert>({
			items: [
				{
					label: "选择用户",
					prop: "userId",
					required: true,
					component: {
						name: "cl-user-select",
						props: {
							multipleLimit: 1
						}
					}
				},
				{
					label: "工作内容",
					prop: "workCtx",
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
				{ label: "头像", prop: "headImg" },
				{ label: "姓名", prop: "name" },
				{ label: "昵称", prop: "nickName" },
				{ label: "手机", prop: "phone" },
				{ label: "工作内容", prop: "workCtx" }
			]
		});

		onMounted(async () => {

		});

		// crud 加载
		async function onLoad({ ctx, app }: CrudLoad) {
			ctx.service({
				async page() {
					return service.project.users.page({
						projectId: project.value.id
					});
				},
				list() {
					return service.project.users.list();
				},
				add(data) {
					return service.project.users.add({
						projectId: project.value.id,
						...data
					});
				},
				delete(data) {
					return service.project.users.delete(data);
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