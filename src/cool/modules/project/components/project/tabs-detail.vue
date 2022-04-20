<template>
	<div class="container scroller1">
		<div class="prj-detail card">
			<el-descriptions class="prj-desc" title="项目概要" direction="vertical" :column="4" border>
				<el-descriptions-item label="建设项目名称:">
					<el-tag size="small">{{ project.name }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="建设单位名称:">
					<el-tag size="small">{{ project.builderName }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="监理单位名称:">
					<el-tag size="small">{{ project.supervisionName }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="承建单位名称:">
					<el-tag size="small">{{ project.undertookName }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="进度:">
					<el-tag size="small">{{ project.process }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="采购人:">
					<el-tag size="small">{{ project.process }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="采购人联系电话:">
					<el-tag size="small">{{ project.process }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="总价:">
					<el-tag size="small">{{ project.totalPrice }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="计划开工日期:">
					<el-tag size="small">{{ project.startDate }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="计划竣工日期:">
					<el-tag size="small">{{ project.planDate }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="收款日:">
					<el-tag size="small">{{ project.payDate }}</el-tag>
				</el-descriptions-item>
			</el-descriptions>
		</div>
		<div class="project-contacts card">
			<h3>项目各方联系人</h3>

		</div>
	</div>
</template>

<script lang='ts'>
import { inject } from 'vue-demi';

export default {
	setup() {
		const project = inject('project')

		return {
			project
		};
	}
};
</script>

<style lang="scss" scoped>
	.card {
		margin: 0.5rem;
		padding: 1rem;
		background-color: white;
	  box-shadow: 0 2px 4px 0 rgb(54 58 80 / 32%);
	}
</style>