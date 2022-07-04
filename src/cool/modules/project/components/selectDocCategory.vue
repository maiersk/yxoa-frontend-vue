<template>
  <el-select v-model="value" v-bind="props" multiple @change="onChange">
    <el-option v-for="(item, i) in list" :key="i" :value="item.id" :label="item.name" />
  </el-select>
</template>

<script lang="ts">
import { inject, ref, onMounted, watch, defineComponent } from 'vue';
import { isEmpty } from '/@/cool/core/utils';
import { isArray } from '/@/cool/utils';

export default defineComponent({
  name: "cl-doccategory-select",

  props: {
    modelValue: [String, Number, Array],
    props: Object,
    cloneValue: [String, Number]
  },

  emits: ["update:modelValue"],

  setup(props: any, { emit }) {
    const service = inject<any>("service");

    const list = ref<any[]>([]);
    const value = ref<any>();

    function onChange(idxs: any) {
      if (!isEmpty(idxs)) {
        if (props.props.multipleLimit === 1) {
          emit("update:modelValue", idxs[0]);
        } else {
          emit("update:modelValue", idxs);
        }
      }
    }

		// 解析值
		watch(
			() => props.modelValue,
			(val: any) => {
				value.value = (isArray(val) ? val : [val]).filter(Boolean);
			},
			{
				immediate: true
			}
		);

    onMounted(async () => {
      list.value = await service.project.doccategory.list();
      if (props.props.value) {
        value.value = (isArray(props.props.value) ? props.props.value : [props.props.value]).filter(Boolean);
        emit("update:modelValue", value.value[0]);
      }
    });

    return {
      list,
      value,
      onChange
    }
  }
})
</script>
