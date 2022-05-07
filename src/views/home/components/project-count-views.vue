<template>
	<div class="project-count">
		<div class="card">
			<div class="card__header">
				<span class="label">总项目数</span>
        <span class="value">1</span>
			</div>

			<div class="card__container">
				<ul class="project-count__cop">
					<li>
						<span>已完成</span>

						<div class="success">
							<span>0</span>
						</div>
					</li>

					<li>
						<span>进行中</span>

						<div class="progress">
							<span>1</span>
						</div>
					</li>
				</ul>
			</div>

			<div class="card__footer">
				<!-- <span class="label">投标项目</span>
				<span class="value">0</span> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
.project-count {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;

		li {
			display: flex;
			list-style: none;
			flex: 1;
			color: #8b8b8b;

			.success,
			.progress {
				display: flex;
				align-items: center;
				margin-left: 10px;
			}

			.success {
				color: #13ae7c;
			}

			.progress {
				color: #ffc628;
			}
		}
	}
}
</style>
