<template>
  <div>
    archive detail page
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCool } from '/@/cool';

export default defineComponent({
  name: 'yx-archive-detail',
	cool: {
    // 注入视图路由中
		route: {
      path: "/archive/detail", // 路由地址
			meta: {
        keepAlive: true, // 是否缓存路由
				label: "项目列表" // 路由名称
			}
		}
	},
  setup() {

    return {

    }
  }
})
</script>

<style>

</style>