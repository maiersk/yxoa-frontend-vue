<template>
  <div class="cl-point-list">

    <div class="cl-point-list__header">
      <div>施工任务</div>
    </div>

    <div class="cl-point-list__container">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "cl-yx-point-list",
  setup() {

    return {

    }
  }
})
</script>

<style lang="scss" scoped>
.cl-point-list {
	height: 100%;
	width: 100%;

	&__header {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 10px;
		background-color: #fff;
		letter-spacing: 1px;
		position: relative;

    div {
      font-size: 14px;
			flex: 1;
			white-space: nowrap;
		}
  }

  &__op {
		display: flex;

		li {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			margin-left: 5px;
			padding: 5px;
			cursor: pointer;

			&:not(.no):hover {
				background-color: #eee;
			}
		}
	}

  &__container {
		height: calc(100% - 40px);
		overflow-y: auto;
		overflow-x: hidden;

		.el-tree-node__content {
			height: 36px;
			margin: 0 5px;
		}
	}
}
</style>