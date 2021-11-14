<template>
	<el-card class="wlog-card">
		<template #header class="crad-header">
			{{ wlog.title }}
			<cl-flex1></cl-flex1>
			<span class="operator">
				<button @click="delWlog(wlog.id)">删除</button>
			</span>
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
	emits: ['delWlog'],
  setup(props: any, ctx: any) {
		const delWlog = (id: number) => {
			ctx.emit('delWlog')
		}
		return {
			delWlog
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
	.operator {
		display: block;
	}
</style>
