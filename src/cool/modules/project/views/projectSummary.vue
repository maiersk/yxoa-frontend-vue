<template>
	<div class="project-summary scroller1">
		<div class="project-title">
			<span></span>
		</div>
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