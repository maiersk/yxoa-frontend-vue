<template>
	<el-card class="wlog-card">
		<template #header class="crad-header">
			{{ wlog.title }}
		</template>
		<div v-html="wlog.context">
		</div>
	</el-card>
</template>

<script lang="ts">

export default {
	props: {
		wlog: {
			type: Object,
			default() {
				return { title: 'none', context: '' }
			}
		}
	},
  setup() {
		return {

		}
  }
}
</script>

<style lang="scss" scoped>
	.wlog-card {
		width: 15rem;
		min-width: 10rem;
		min-height: 10rem;
		margin-right: 0.5rem;
	}
</style>
