<template>
	<el-card class="wlog-card">
		<template #header class="crad-header">
			<div class="header-body">
				<span class="title">{{ wlog.title }}</span>

				<span class="operator">
					<a @click="delWlog()">删除</a>
				</span>
			</div>
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
		const delWlog = () => {
			ctx.emit('delWlog', props.wlog.id)
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
	.header-body {
		display: flex;
		justify-content: space-between;	
		.title {
			display: block;
		}
		.operator {
			display: block;
			a {
				text-decoration: none;
				color: rgb(180, 0, 0);
			}
			a:hover {
				cursor: pointer;
				color: red;
			}
		}
	}

</style>
