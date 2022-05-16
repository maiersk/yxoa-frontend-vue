import "./index.scss";
import { computed, defineComponent } from "vue";
import ViewUrl from "../../../utils/viewFile";

export default defineComponent({
	props: {
		url: {
			type: String,
			default: ""
		},
		docId: {
			type: Number,
			default: 0
		}
	},
	name: "doc-perview",
	setup(props: any, ctx: any) {
		const getUrl = computed(() => ViewUrl`test${props.url}`);

		return {
			getUrl,
		};
	},
	render(ctx: any) {
		return (
			<div class="preview-card">
			{/* <div class="header">
				<span>预览模板</span>
			</div> */}
	
			<div class="container">
				<iframe class="preview-iframe" src={ctx.getUrl} ref="iframeRef" height={ctx.height}/>
			</div>
		</div>
		)
	}
});