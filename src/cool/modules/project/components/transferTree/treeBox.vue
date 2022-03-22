<template>
	<div class="treeBox">
		<div class="__title">
			<el-checkbox type="text" size="mini" v-model="checked" @click="clickAllSelect">
        全选
      </el-checkbox>
		</div>

		<div class="__content" :ref="setRefs('treeRef')">
      <slot name="content">
      </slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue';
import { useCool } from '/@/cool';
import { deepTree } from '/@/cool/core/utils';

export default defineComponent({
  name: 'transfertree-treebox',

  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  setup(props: any, ctx: any) {
    const { refs, setRefs } = useCool();
    const checked = ref<boolean>(false);
    const defaultProps = reactive({
			children: "children",
			label: "name"
		});

    onMounted(() => {

    })

    // 点击全选
		const clickAllSelect = async () => {
			console.log(ctx.parent)

      if (checked.value) {
        nextTick(() => {
          refs.value.treeRef.setCheckedKeys([])
        })
      } else {
        nextTick(() => {
          refs.value.treeRef.setCheckedNodes(deepTree(props.treelist));
        })
      }
			// towardsRight();
		};

    return {
      refs,
      setRefs,
      checked,
      defaultProps,
      clickAllSelect
    }
  }
});
</script>

<style lang="scss" scoped>
	.treeBox {
		border: 1px solid #ccc;
		height: 400px;
		width: 330px;
		color: #fff;
		position: relative;

		.__title {
			height: 40px;
			background: #f5f7fa;
			margin: 0;
			padding-left: 15px;
			border-bottom: 1px solid #ebeef5;
			box-sizing: border-box;
			color: #000;
			cursor: pointer;

			.el-checkbox {
				height: 100%;
				width: 100%;
			}
		}

		.__content {
			width: 100%;
			height: calc(100% - 40px);
			overflow-y: auto;
			overflow-x: hidden;
			box-sizing: border-box;

			.el-tree {
				width: 100%;
			}
		}
	}
</style>