<template>
	<el-card class="preview-card scroller1" body-style="height: 100%;">
		<template #header>
			<span>预览模板</span>
		</template>

		<iframe :src="getUrl" />
	</el-card>
</template>

<script lang='ts'>
import { computed, onMounted, ref } from "vue-demi";
import { useCool } from "/@/cool/core";
import ViewUrl from "../../utils/viewFile";

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

		const getUrl = computed(() => ViewUrl`test${props.url}`);

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
    min-height: calc(100vh);
  }
}
</style>