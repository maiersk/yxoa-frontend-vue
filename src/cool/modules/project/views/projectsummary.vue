<template>
	<div class="project-summary scroller1">
		<project-list :list="list"></project-list>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import ProjectList from "../components/project/list.vue";
import { useCool } from "/@/cool/core";

export default defineComponent({
	name: "projectDetail",
	components: {
		ProjectList
	},
	cool: {
		// 注入视图路由中
		route: {
			path: "/project/", // 路由地址
			meta: {
				keepAlive: true, // 是否缓存路由
				label: "项目" // 路由名称
			}
		}
	},
	setup() {
		const { service } = useCool()
		const data = reactive<any>({
			list: []
		})

		onMounted(async () => {
			const res = await service.project.project.page();
			data.list = res.list
		})

		return {
			...toRefs(data)
		}
	}
});
</script>

<style lang="scss" scoped>
</style>