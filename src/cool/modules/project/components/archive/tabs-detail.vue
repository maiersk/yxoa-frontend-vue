<template>
	<div class="container scroller1">
		<div class="prj-detail card">
			<el-descriptions class="prj-desc" title="项目概要" direction="vertical" :column="4" border>
				<el-descriptions-item label="建设项目名称:">
					<el-tag size="small">{{ archive.name }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="建设单位名称:">
					<el-tag size="small">{{ archive.builderName }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="监理单位名称:">
					<el-tag size="small">{{ archive.supervisionName }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="承建单位名称:">
					<el-tag size="small">{{ archive.undertookName }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="采购人:">
					<el-tag size="small">{{ archive.purchaser }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="采购人联系电话:">
					<el-tag size="small">{{ archive.pur_phone }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="总价:">
					<el-tag size="small">{{ archive.totalPrice }}</el-tag>
				</el-descriptions-item>
			</el-descriptions>
		</div>
	</div>
</template>

<script lang='ts'>
import { inject } from 'vue';

export default {
	name: "yx-proj-tab-detail",
	setup() {
		const archive: any = inject('archive')

		return {
			archive,
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
	.project-contacts {
		> h3 {
			padding: 10px;
		}

		.contacts-tab {
			width: 100%;
		}
	}
</style>