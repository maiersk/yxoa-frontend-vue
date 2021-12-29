<template>
	<div class="wlog-upsert">
		<cl-upsert ref="upsertRef" :items="items" :dialog="dialog"></cl-upsert>
	</div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { useRefs } from "/@/cool";
import { UpsertItem, UpsertRef } from "@cool-vue/crud/types";

export default {
	conponents: {},
	setup() {
		const { refs, setRefs } = useRefs();
		const upsert = ref<any>([]);

		const upsertRef = ref<UpsertRef>();

		const dialog = {
			props: {
				fullscreen: false,
				width: "900px"
			}
		};

		const items = reactive<UpsertItem[]>([
			{
				prop: "title",
				label: "标题",
				span: 24,
				component: {
					name: "el-input"
				}
			},
			{
				prop: "category",
				label: "类别",
				span: 24,
				component: {
					name: "cl-category-select",
					props: {
						multipleLimit: 1
					}
				}
			},
			{
				prop: "context",
				label: "内容",
				component: {
					name: "cl-editor-quill"
				}
			}
		]);

		return {
			refs,
			setRefs,
			upsert,
			items,
			upsertRef,
			dialog
		};
	}
};
</script>

<style>
</style>