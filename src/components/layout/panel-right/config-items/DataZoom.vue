<template>
	<!-- datazoom配置 -->
	<div class="ec-datazoom">
		<el-collapse accordion>
			<el-collapse-item title="缩放工具" name="vt-datazoom">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<el-form-item label="是否启用">
						<el-switch v-model="data.dataZoom[1].show" active-text="启用" inactive-text="禁用"></el-switch>
					</el-form-item>
					<el-form-item v-if="data.dataZoom[1].show" label="默认缩放范围">
						<el-slider :value="forDataZoomValue()" @input="onChange" range></el-slider>
					</el-form-item>
				</el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	import VueEvent from '@/assets/design/js/vue-event.js';
	import $tools from '@/assets/design/js/tools.js';
	export default {
		data() {
			return {
				data: {
					dataZoom: [{}, {}]
				},
				// echarts 属性对象
				elemEcOpts: {},
				// 当前激活元素的ID
				elemID: ''
			}
		},
		mounted() {
			VueEvent.$on('$webppt-data', webppt => {
				let active = $tools.afxGetActiveElem.call(this, webppt);
				if(!active) return;
				this.elemEcOpts = active.elemEcOpts;
				this.data.dataZoom = active.elemEcOpts.dataZoom || [{}, {}];
				this.elemID = active.elemID;
			});
		},
		methods: {
			// 表单监听
			formListener() {
				if(!this.elemID) return this.data;
				// 获取 echarts 工具类
				let $ec = $tools.echartsTools();
				// 获取当前元素的 echarts 初始化对象
				let ecInitObj = $.ecInitObjs[this.elemID];
				// echarts 图表重绘
				$ec.render(ecInitObj, this.elemEcOpts);
				return this.data;
			},
			// 数据窗口范围
			forDataZoomValue() {
				let start = this.data.dataZoom[0].start,
					end   = this.data.dataZoom[0].end;
				return [start, end];
			},
			// 数值改变监听
			onChange(val) {
				this.data.dataZoom[0].start = val[0];
				this.data.dataZoom[1].start = val[0];
				this.data.dataZoom[0].end   = val[1];
				this.data.dataZoom[1].end   = val[1];
			}
		}
	}
</script>

<style>
	
</style>
