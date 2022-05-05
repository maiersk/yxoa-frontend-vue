<template>
	<div class="project-list">
		<div class="__header">
			<span>工程列表</span>
		</div>
		<div class="__body">
			<ul class="project-ul">
				<li v-for="(item, i) in list" :key="i">
					<el-card class="project-card" shadow="hover">
						<template #header>
							<div class="card_title" style="margin: 0; padding: 0;">
								<span>{{ item.name }}</span>

								<div class="operator">
									<el-button type="text" size="mini" @click="toDetail(item.id)">
										详细
									</el-button>
								</div>
							</div>
						</template>
						<div class="card_body">
							<el-descriptions title="项目信息" direction="vertical" border>
								<el-descriptions-item label="建设项目名称:">
									<el-tag size="small">{{ item.name }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="建设单位名称:">
									<el-tag size="small">{{ item.builderName }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="监理单位名称:">
									<el-tag size="small">{{ item.supervisionName }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="承建单位名称:">
									<el-tag size="small">{{ item.undertookName }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="进度:">
									<el-tag size="small">{{ item.process }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="总价:">
									<el-tag size="small">{{ item.totalPrice }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="计划开工日期:">
									<el-tag size="small">{{ item.startDate }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="计划竣工日期:">
									<el-tag size="small">{{ item.planDate }}</el-tag>
								</el-descriptions-item>
								<el-descriptions-item label="收款日:">
									<el-tag size="small">{{ item.payDate }}</el-tag>
								</el-descriptions-item>
							</el-descriptions>
						</div>
					</el-card>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { useCool } from "/@/cool";

export default {
	props: {
		list: {
			type: Array,
			default() {
				return [
					{ id: "1", name: "test" },
					{ id: "2", name: "test2" }
				];
			}
		}
	},
	setup(props: any, ctx: any) {
		const { router } = useCool();

		function toDetail(id: string) {
			router.push(`/proj/detail/?id=${id}`);
		}
		return {
			toDetail
		};
	}
};
</script>

<style lang="scss" scoped>
.project-list {

	.__header {
		height: 40px;
		width: 100vw;
		line-height: 40px;
		padding: 0 1rem;
		background-color: white;
	}

	.__body {

	}
	.project-ul {
		list-style: none;

		> li {
			margin: 1rem;

			.card_title::before,
			.card_title::after {
				display: table;
				content: "";
			}
			.card_title::after {
				clear: both;
			}

			.card_body {
				font-size: 14px;
				margin-bottom: 18px;
			}
		}
	}
}

.project-card {
	margin: 0;
	padding: 0;
}
.project-card::before,
.project-card::after {
	display: table;
	content: "";
}
.project-card::after {
	clear: both;
}

.operator {
	float: right;
	> button {
		min-height: 0;
		padding: 0;
	}
}
</style>