<template>
  <el-select v-model="selectSomeOne">
    <el-option v-for="(v, i) in list" :key="i" :label="v.name" :value="v.id"></el-option>
  </el-select>
</template>

<script lang="ts">
import { ElSelect, ElOption } from 'element-plus';
import { defineComponent, onMounted, ref } from 'vue';
import { useCool } from '/@/cool';

export default defineComponent({
  name: 'cl-df-select',
  components: {
    ElSelect,
    ElOption
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    moduleValue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props: any, ctx: any) {
    const { service } = useCool();
    const selectSomeOne = ref<any>([]);
    const list = ref<any[]>([]);

    onMounted(() => {
      service.request({
        url: props.url
      }).then((res: any) => {
        list.value = res;
      })
    })

    return{
      selectSomeOne,
      list
    }
  }
})
</script>

<style>

</style>