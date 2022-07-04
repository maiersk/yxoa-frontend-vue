<template>
	<div class="project-detail scroller1">
		<archive-tabs>
		</archive-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref } from 'vue';
import { useCool } from '/@/cool';
import ArchiveTabs from "../components/archive/tabs.vue";

export default defineComponent({
  name: 'yx-archive-detail',
	cool: {
    // 注入视图路由中
		route: {
      path: "/archive/detail", // 路由地址
			meta: {
        keepAlive: true, // 是否缓存路由
				label: "详细页" // 路由名称
			}
		}
	},
	components: {
		ArchiveTabs
	},
	setup() {
		const { route, service, store } = useCool();
		const archive = ref<any>({
			value: {
				name: "",
				builderName:"",
				supervisionName:"",
				undertookName:"",
				process:"",
				purchaser:"",
				pur_phone:"",
				totalPrice: 0,
				tcDate:"",
				payDate:""
			}
		});
		provide('archive', archive);

		onMounted(async () => {
			const id = route.query?.id ?? 0;

			if (id !== 0) {
				archive.value = await service.project.archive.info({ id });
			}

			const index = store.getters.processList.findIndex((e: any) => {
				return e.value.split("?")[0] === `/archive/detail/?id=${id}`.split("?")[0]
			});
			const { active, keepAlive, value } = store.getters.processList[index];
			const processList = [...store.getters.processList];
			processList[index] = {
				active, keepAlive,
				label: `${archive?.value?.name ?? '项目详细'} 详细页`,
				value: value
			};
			store.commit('SET_PROCESS', processList);
		})

		return {
			route,
			service,
			archive,
			onMounted
		};
  }
})
</script>

<style>

</style>