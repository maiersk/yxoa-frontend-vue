<template>
	<div class="project-detail">
		<project-tabs>
		</project-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue";
import { useCool } from "/@/cool";
import ProjectTabs from "../components/project/tabs.vue";

export default defineComponent({
	components: {
		ProjectTabs
	},
	cool: {
		// 注入视图路由中
		route: {
			path: "/project/detail", // 路由地址
			meta: {
				keepAlive: true, // 是否缓存路由
				label: "项目详细" // 路由名称
			}
		}
	},
	setup() {
		const { route, service } = useCool();
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
				tableName:"",
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
	.header {
		h3 {
			margin: 0.5rem 0;
		}
	}
	.header::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: var(--el-border-color-light);
		z-index: var(--el-index-normal);
	}

	// background-color: white;
}
</style>

<style lang="scss" scoped>

</style>