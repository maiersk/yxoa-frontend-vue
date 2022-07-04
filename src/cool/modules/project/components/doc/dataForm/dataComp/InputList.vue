<template>
  <el-row>
    <el-col class="opation">
      <el-input v-model="currentInput" />
      <el-button type="primary" @click="handelAdd()">添加</el-button>
    </el-col>
    <ul class="text-list">
      <li v-for="(v, i) in data" :key="i">
        <div class="item">
          <span class="text">
            {{ v }}
          </span>
          <div>
            <el-button type="text" @click="handelDel(i)">删除</el-button>
          </div>
        </div>
      </li>
    </ul>
  </el-row>
</template>

<script lang="ts">
import { ElInput, ElRow, ElTable, ElTableColumn } from 'element-plus';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import _ from "lodash";

export default defineComponent({
  name: "cl-df-inputlist",
  components: {
    ElInput,
    ElRow,
    ElTable,
    ElTableColumn
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['update:modelValue'],
  setup(props: any, { emit }: any) {
    const currentInput = ref<string>("");
    const data = reactive<any[]>(props.modelValue === "" ? [] : props.modelValue.split(','));

    const handelAdd = () => {
      if (!_.isEmpty(currentInput.value)) {
        data.push(currentInput.value);
        emit('update:modelValue', data);
      }
    }
    const handelDel = (i: number) => {
      data.splice(i, 1);
      emit('update:modelValue', data);
    }

    return {
      currentInput,
      data,
      handelAdd,
      handelDel
    }
  }
})
</script>

<style lang="scss" scoped>
  .opation {
    display: flex;
    > .el-input {
      padding-right: 0.5rem;
    }
  }

  .text-list {
    width: 100%;
    margin-top: 1rem;
    list-style: none;

    > li {
      height: auto;
      line-height: auto;
      border: 1px solid #ccc;
      
      > .item {
        display: flex;
        justify-content: space-between;

        > span, button {
          padding: 0 0.5rem;
        }
      }
    }
  }

</style>
