<template>
	<div class="wlog-upsert">
		<cl-upsert ref="upsertRef" :items="items" :dialog="dialog"></cl-upsert>
	</div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import { useRefs } from "/@/core";
import { UpsertItem, UpsertRef } from "cl-admin-crud-vue3/types";

export default {
  setup() {
    const { refs, setRefs } = useRefs(); 
    const upsert = ref<any>([]);

    const upsertRef = ref<UpsertRef>()

    const dialog = {
			props: {
				fullscreen: false,
				width: "1200px"
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
					name: "el-select",
          props: {
						placeholder: "请选择日志分组",
						multiple: false
          },
          options: [
            {
              label: 'test',
              value: 1
            },
            {
              label: 'test2',
              value: 2
            }
          ]
				}
			},
			{
				prop: "context",
				label: "内容",
				component: {
					name: "cl-editor-quill"
				}
			},
			{
				prop: "author",
				label: "发送人",
				span: 24,
				component: {
					name: "el-input"
				}
			},
			{
				prop: "receive",
				label: "接收人",
				span: 24,
				component: {
					name: "el-input"
				}
			}
		])

    return {
      refs,
      setRefs,
      upsert,
      items,
      upsertRef,
      dialog
    }
  }
}
</script>

<style>
</style>