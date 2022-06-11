<template>
  <el-card class="operator-card">
    <template #header>
      <span>
        <slot name="title">标题</slot>
      </span>
      <div class="operator">
        <slot name="operator"></slot>
        <el-button type="text"
          @click="showorhide = !showorhide">
          <span v-if="showorhide">
            收起
          </span>
          <span v-else>
            展开
          </span>
        </el-button>
      </div>
    </template>
    <template #default>
      <div class="context"
        :ref="setRefs('context')"
        :class="{
          'is-show': showorhide 
        }"
      >
        <slot></slot>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useCool } from '/@/cool';
import { ElCard, ElButton } from 'element-plus';

export default {
  name: 'yx-proj-opcard',
  props: {
    hide: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElCard,
    ElButton
  },
  setup(props: any) {
    const { refs, setRefs } = useCool();
    const showorhide = ref<boolean>(props.hide)

    watch(
      () => showorhide,
      (val: any) => {
        if (val) {
          console.log(val, refs)
          refs.value.context.style.display = 'none';
        } else {
          refs.value.context.style.display = 'block';
        }
      }
    )

    return {
      refs,
      setRefs,
      showorhide
    }
  }
}
</script>

<style lang="scss">
	.operator-card {
		margin: 0;
		padding: 0;
	}
	.operator-card::before,
	.operator-card::after {
    display: table;
		content: "";
	}
	.operator-card::after {
    clear: both;
	}
  .operator {
    float: right;
    > button {
      min-height: 0;
      padding: 0;
    }
  }

  .el-card__body {
    padding: 0 !important;
  }

  .operator-card {
    .context {
      overflow: hidden;
      height: 0;
    }
    .is-show {
      height: calc(100% - 10px);
      > * {
        margin: 10px;
      }
    }
  }
</style>