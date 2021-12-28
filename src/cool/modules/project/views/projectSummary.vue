<template>
	<div class="project-summary scroller1">
		<project-list />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectList from "../components/project/list.vue";

export default defineComponent({
	name: "projectDetail",
	components: {
		ProjectList
	},
	setup() {
		return {};
	}
});
</script>

<style lang="scss" scoped>
</style>