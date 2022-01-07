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
			<cl-table :ref="setRefs('table')" v-bind="table" />
		</el-row>

		<!-- <el-row type="flex">
			<cl-flex1 /> -->
			<!-- 分页控件 -->
			<!-- <cl-pagination />
		</el-row> -->

		<!-- 新增、编辑 -->
		<cl-upsert :ref="setRefs('upsert')" v-bind="upsert" />
	</cl-crud>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { CrudLoad, Table, Upsert } from "@cool-vue/crud/types";
import { useCool } from "/@/cool";

export default defineComponent({
	name: "project-user",
	props: {
		project: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	setup(props: any) {
		const { refs, setRefs, service } = useCool();

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
				{ label: "部门", prop: "department" },
				{ label: "工作内容", prop: "workCtx" },
			]
		});

		// crud 加载
		function onLoad({ ctx, app }: CrudLoad) {
			// 绑定 service
			ctx.service(service.project.project)
				.set('dict', {
					api: {
						list: 'getusers',
						page: 'getusers',
						add: 'adduser',
						del: 'deluser'
					}
				})
				.done();
			app.refresh();
		}

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
.project-crud-user {
	min-height: 100%;
}
</style>