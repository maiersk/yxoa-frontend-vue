<template>
	<div class="project-doc">
		<div class="header">
			<h3>{{ project.value?.name ?? "" }}</h3>
		</div>
		<div class="pane">
			<project-tabs>
				<template #detail>
					<tabs-detail :project="project.value"></tabs-detail>
				</template>
				<template #doc>
					<tabs-doc></tabs-doc>
				</template>
				<template #user>
					<tabs-user></tabs-user>
				</template>
			</project-tabs>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import ProjectTabs from "../components/tabs.vue";
import TabsDetail from "../components/project/tabs-detail.vue";
import TabsDoc from "../components/project/tabs-doc.vue";
import TabsUser from "../components/project/tabs-user.vue";
import { useCool } from "/@/cool";

export default defineComponent({
	components: {
		ProjectTabs,
		TabsDetail,
		TabsDoc,
		TabsUser
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
		const project = reactive<any>({});

		onMounted(async () => {
			const id = route.query?.id ?? 0;

			if (id !== 0) {
				project.value = await service.project.project.info({ id });
			}
		});

		return {
			project,
			onMounted
		};
	}
});
</script>

<style lang="scss" scoped>
.project-doc {
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

	background-color: white;
	padding: 1rem;
}
</style>