<template>
	<!-- tooltip配置 -->
	<div class="ec-tooltip">
		<el-collapse accordion>
			<el-collapse-item title="提示框" name="vt-tooltip">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<el-form-item label="是否启用">
						<el-switch v-model="tooltip.show" active-text="启用" inactive-text="禁用"></el-switch>
					</el-form-item>
					<div v-if="tooltip.show">
						<el-form-item label="触发类型">
							<el-select v-model="tooltip.trigger">
								<el-option label="坐标轴触发" value="axis"></el-option>
								<el-option label="数据项图形触发" value="item"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="内容格式器">
							<el-input type="textarea" placeholder="提示框浮层内容格式器，支持字符串模板和回调函数两种形式" 
								v-model="tooltip.formatter"></el-input>
						</el-form-item>
					</div>
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
				tooltip: {
					show: true,
					trigger: 'axis',
					axisPointer : {
						type : 'shadow'
					},
					formatter: ''
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
				this.tooltip = active.elemEcOpts.tooltip;
				this.elemID = active.elemID;
			});
		},
		methods: {
			// 表单监听
			formListener() {
				if(!this.elemID) return this.tooltip;
				// 获取 echarts 工具类
				let $ec = $tools.echartsTools();
				// 获取当前元素的 echarts 初始化对象
				let ecInitObj = $.ecInitObjs[this.elemID];
				// echarts 图表重绘
				$ec.render(ecInitObj, this.elemEcOpts);
				return this.tooltip;
			}
		}
	}
</script>

<style>
	
</style>
