<template>
	<div class="project-summary scroller1">
		<div class="project-list">
			<el-row type="flex" align="middle" class="__listhead">
				<div class="__opations">
					<el-button
						v-permission="service.project.project.permission.add"
						type="primary"
						size="mini"
						@click="openForm()"
					>
						工程立项
					</el-button>
					<cl-flex1 />

					<cl-yx-search-key
						field="name"
						:field-list="[
							{
								label: '名称',
								value: 'name'
							},
							{
								label: '建设单位',
								value: 'builderName'
							},
							{
								label: '监理单位',
								value: 'supervisionName'
							},
							{
								label: '承建单位',
								value: 'undertookName'
							}
						]"
					/>
				</div>
			</el-row>
			<project-list @delProject="delProject" :list="list"></project-list>
		</div>

		<cl-form ref="formRef">
		</cl-form>
	</div>
</template>

<script lang="ts">
import { useCool } from "/@/cool";
import { defineComponent, onMounted, reactive, ref, toRefs, provide } from "vue";
import { FormItem, FormRef } from "@cool-vue/crud/types";
import { ElMessage, ElMessageBox } from "element-plus";
import ProjectList from "../components/project/list.vue";

export default defineComponent({
	name: "projectDetail",
	components: {
		ProjectList
	},
	// cool: {
	// 	// 注入视图路由中
	// 	route: {
	// 		path: "/proj", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "项目" // 路由名称
	// 		}
	// 	}
	// },
	setup() {
		const { service } = useCool()

		const data = reactive<any>({
			list: []
		})

		const formRef = ref<FormRef>()

		async function refresh(query={}) {
			const res = await service.project.project.page(query);
			data.list = res.list
		}
		provide('refresh', refresh)

		onMounted(async () => {
			refresh();
		})

		const items: FormItem[] = [
			{
				label: "项目全称",
				prop: "fullName",
				component: { name: "el-input" },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "建设项目名称",
				prop: "name",
				required: true,
				component: { name: "el-input" },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "建设单位名称",
				prop: "builderName",
				required: true,
				component: { name: "el-input" },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "监理单位名称",
				prop: "supervisionName",
				component: { name: "el-input" },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "承建单位名称",
				prop: "undertookName",
				required: true,
				component: { name: "el-input" },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "进度",
				prop: "process",
				component: { name: "el-input" },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "总价",
				prop: "totalPrice",
				required: true,
				component: { name: "el-input-number", props: { min: 0 } },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "计划开工日期",
				prop: "startDate",
				required: true,
				component: {
					name: "el-date-picker",
					props: { type: "date", valueFormat: "YYYY-MM-DD" }
				},
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "计划竣工日期",
				prop: "planDate",
				required: true,
				component: {
					name: "el-date-picker",
					props: { type: "date", valueFormat: "YYYY-MM-DD" }
				},
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "工期(天)",
				prop: "dateCount",
				required: true,
				component: { name: "el-input-number", props: { min: 0 } },
				props: {
					labelWidth: "130px"
				}
			},
			{
				label: "收款日",
				prop: "payDate",
				component: {
					name: "el-date-picker",
					props: { type: "date", valueFormat: "YYYY-MM-DD" }
				}
			}
		]

		const openForm = () => {
			formRef.value?.open({
				title: "工程立项",
				width: "1000px",
				props: {
					labelWidth: "140px"
				},
				items,
				on: {
					submit(data, { done, close }) {
						service.project.project.add(data).then((res: any) => {
							ElMessage.success("操作成功");
							refresh();
							close();
						}).catch((err: any) => {
							ElMessage.error(err);
							close();
						});
						done();
					}
				}
			});
		}

		const delProject = (id: any) => {
			const pid = data.list.findIndex((item: any) => item.id === id);
			const project = data.list[pid];
			ElMessageBox.confirm(`该操作会删除 “${project.name}” 工程所有内容，是否确认？`, "提示", {
				type: "warning",
				confirmButtonText: "删除",
				cancelButtonText: "取消",
				distinguishCancelAndClose: true
			}).then(() => {
				service.project.project.delete({ ids: [id] }).then((res: any) => {
					ElMessage.success("删除成功");
					refresh();
				});
			})
		}

		return {
			service,
			formRef,
			refresh,
			openForm,
			delProject,
			...toRefs(data),
		}
	}
});
</script>

<style lang="scss" scoped>
.project-list {
	.__listhead {
		display: flex;
		height: 40px;
		width: 100%;
		line-height: 40px;
		padding: 0 1rem;
		background-color: white;

		.__opations {
			display: flex;
			width: 100%;
			align-items: center;
		}
	}

	margin-top: 10px;
}
</style>