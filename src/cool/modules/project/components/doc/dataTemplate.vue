<template>
	<op-card>
		<template #title>
			<span>数据模板</span>
    </template>
    <template #operator>
      <el-button type="text" @click="saveHandel">保存</el-button>
		</template>
		<template #default>
      <cl-codemirror height="300" class="cl-code" v-model="code"></cl-codemirror>
    </template>
	</op-card>
</template>

<script lang="ts">
import { ElForm, ElFormItem, ElMessage } from "element-plus";
import { inject, ref, watch } from "vue";
import OpCard from "./opCard.vue";
import { useCool } from '/@/cool/core';
import beautifyJs from "js-beautify";

export default {
  name: 'yx-proj-doc-datatemplate',
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
    projectId: {
      type: Number,
      default: 0
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
        code.value = val;
      }
    )

    // watch(
    //   () => code.value,
    //   (val: any) => {
    //     emit('update:modelValue', val);
    //   }
    // )

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
            projectId: props.projectId,
            data: code.value.trim()
          })
        ).then((res: any) => {
          ElMessage.success('保存成功');
        })
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