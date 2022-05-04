<template>
	<div class="scope">
		<div class="h">
			<span>cl-project</span>
			工程
		</div>
		<div class="c">
			<router-link to="/proj">传送门</router-link>
		</div>
		<div class="f">
      
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		};
	},

	methods: {
		onSuccess() {
      this.$message.success("成功");
		}
	}
};
</script>

<style lang="scss" scoped>
.scope {
	.label {
		display: inline-block;
		font-size: 12px;
		padding-bottom: 10px;
	}
}
</style>
