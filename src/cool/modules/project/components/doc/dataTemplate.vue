<template>
	<op-card>
		<template #title>
			<span>数据模板</span>
    </template>
    <template #operator>
      <el-button type="text" @click="saveHandel">保存</el-button>
		</template>
		<template #default>
      <cl-codemirror class="cl-code" v-model="code"></cl-codemirror>
    </template>
	</op-card>
</template>

<script lang="ts">
import { ElForm, ElFormItem } from "element-plus";
import { inject, ref, watch } from "vue";
import OpCard from "./opCard.vue";
import { useCool } from '/@/cool/core';
import beautifyJs from "js-beautify";

export default {
  components: {
    ElForm,
    ElFormItem,
    OpCard
  },
  props: {
    docId: {
      type: Number,
      default: -1
    },
    tableName: {
      type: String,
      default: ""
    },
    testMode: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(props: any, { emit }: any) {
    const { service } = useCool();
    const code = ref<string>(props.modelValue);
    const selectNode: any = inject('select-node');

    watch(
      () => props.modelValue,
      (val:any) => {
        code.value = ``+beautifyJs(val);
      }
    )

    watch(
      () => code.value,
      (val: any) => {
        emit('update:modelValue', val);
      }
    )

    const saveHandel = () => {
      emit('update:modelValue', code.value);

      // 在文档调试模式下，保存模板内容到doc对象里，否则保存到项目文档节点内
      if (props.testMode) {
        service.project.doc.update({
          id: props.docId,
          data: code.value.trim()
        })
      } else {
        delete selectNode.value.updateTime;
        delete selectNode.value.createTime;
        service.project.doctree.prjdocupdate(
          Object.assign(selectNode.value, {
            tableName: props.tableName,
            data: code.value.trim()
          })
        )
      }
    }

    return {
      saveHandel,
      code
    }
  }
};
</script>

<style lang="scss" scoped>

</style>