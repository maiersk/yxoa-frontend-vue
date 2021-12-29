<template>
	<div class="prj-detail">
		<el-descriptions class="prj-desc" title="项目信息">
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
			<el-descriptions-item label="目标竣工日:">
				<el-tag size="small">{{ project.tcDate }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item label="收款日:">
				<el-tag size="small">{{ project.payDate }}</el-tag>
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script lang='ts'>
export default {
	props: {
		project: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	setup() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
	.prj-detail {

	}
</style>