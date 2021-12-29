<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

const craeteFormItem = function (h: Function, k: string, item: any) {

};

export default defineComponent({
	props: {
		value: {
			type: String,
			default: "{}"
		}
	},
	setup() {
		const data = reactive<any>({
			form: {},
			json: null,
			showOPerator: false
		});

		return {
			...toRefs(data)
		};
	}
});
</script>

<style lang="css" scoped>

</style>