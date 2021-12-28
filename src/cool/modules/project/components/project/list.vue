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
							<div class="card_title" style="margin: 0; padding: 0">
								<span>{{ item.name }}</span>

								<a style="float: right;">
									<router-link :to="`/project/detail/?id=${item.id}`">
									  详细
									</router-link>
								</a>
								<!-- <el-button type="text" @click="toDetail(item.id)"
                  style="float: right; padding: 3px 0; min-height:0px;"
                >
                  详细
                </el-button> -->
							</div>
						</template>
						<div v-for="o in 4" :key="o" class="card_body">
							{{ "列表内容 " + o }}
						</div>
					</el-card>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { useCool } from "/@/cool/core";
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
			router.push(`/project/detail/${id}`);
		}
		return {
			toDetail
		};
	}
};
</script>

<style lang="scss" scoped>
.project-list {
	padding: 1rem;
	background-color: white;
	border-radius: 5px;

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
</style>