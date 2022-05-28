<template>
	<div class="project-detail scroller1">
		<project-tabs>
		</project-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue";
import { useCool } from "/@/cool";
import ProjectTabs from "../components/project/tabs.vue";

export default defineComponent({
	name: "project-detail",

	components: {
		ProjectTabs
	},
	// cool: {
	// 	// 注入视图路由中
	// 	route: {
	// 		path: "/proj/detail", // 路由地址
	// 		meta: {
	// 			keepAlive: true, // 是否缓存路由
	// 			label: "项目详细" // 路由名称
	// 		}
	// 	}
	// },
	setup() {
		const { route, service, store } = useCool();
		const project = ref<any>({
			value: {
				name: "",
				builderName:"",
				supervisionName:"",
				undertookName:"",
				process:"",
				purchaser:"",
				pur_phone:"",
				totalPrice: 0,
				tcDate:"",
				payDate:""
			}
		});
		provide('project', project);

		onMounted(async () => {
			const id = route.query?.id ?? 0;

			if (id !== 0) {
				project.value = await service.project.project.info({ id });
			}

			const index = store.getters.processList.findIndex((e: any) => {
				return e.value.split("?")[0] === `/proj/detail/?id=${id}`.split("?")[0]
			});
			const { active, keepAlive, value } = store.getters.processList[index];
			const processList = [...store.getters.processList];
			processList[index] = {
				active, keepAlive,
				label: project?.value?.name ?? '项目详细',
				value: value
			};
			store.commit('SET_PROCESS', processList);
		})

		return {
			route,
			service,
			project,
			onMounted
		};
	}
});
</script>

<style lang="scss" scoped>
.project-detail {
	// .header {
	// 	h3 {
	// 		margin: 0.5rem 0;
	// 	}
	// }
	// .header::after {
	// 	content: "";
	// 	position: absolute;
	// 	left: 0;
	// 	bottom: 0;
	// 	width: 100%;
	// 	height: 2px;
	// 	background-color: var(--el-border-color-light);
	// 	z-index: var(--el-index-normal);
	// }

	// background-color: white;
}
</style>