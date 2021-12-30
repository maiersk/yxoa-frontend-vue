<template>
	<el-card class="preview-card" body-style="height: 100%;">
		<template #header>
			<span>预览模板</span>
		</template>

		<iframe :src="getUrl" />
	</el-card>
</template>

<script lang='ts'>
import { computed, onMounted, ref } from "vue-demi";
import { useCool } from "/@/cool/core";
export default {
	props: {
		url: {
			type: String,
			default: ""
		},
		docId: {
			type: Number,
			default: 0
		}
	},
	name: "doc-perview",
	setup(props: any, ctx: any) {
		const { service } = useCool();
		const resUrl = ref<string>("");

		const getUrl = computed(() => resUrl.value);

		onMounted(() => {
			if (props.docId !== "") {
				service.project.doc.info({ id: props.id }).then((res: any) => {
					if (res?.data ?? undefined) {
						resUrl.value = res.data.templateFile;
					}
				});
			}
		});

		return {
			onMounted,
			getUrl
		};
	}
};
</script>

<style lang="scss" scoped>
.preview-card {
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>