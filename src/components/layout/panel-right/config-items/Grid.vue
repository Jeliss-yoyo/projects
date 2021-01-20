<template>
	<!-- grid配置 -->
	<div class="ec-grid">
		<el-collapse accordion>
			<el-collapse-item title="绘图网格" name="vt-grid">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<el-form-item label="区域计算方式">
						<el-select v-model="grid.containLabel">
							<el-option label="包含坐标轴的刻度标签" :value="true"></el-option>
							<el-option label="不包含坐标轴的刻度标签" :value="false"></el-option>
						</el-select>
					</el-form-item>
					<el-collapse accordion>
						<el-collapse-item title="网格边距" name="vt-grid-position">
							<el-form-item label="顶部">
								<el-input type="text" v-model="grid.top"></el-input>
							</el-form-item>
							<el-form-item label="底部">
								<el-input type="text" v-model="grid.bottom"></el-input>
							</el-form-item>
							<el-form-item label="左侧">
								<el-input type="text" v-model="grid.left"></el-input>
							</el-form-item>
							<el-form-item label="右侧">
								<el-input type="text" v-model="grid.right"></el-input>
							</el-form-item>
						</el-collapse-item>
					</el-collapse>
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
				grid: {},
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
				this.grid = active.elemEcOpts.grid || {};
				this.elemID = active.elemID;
			});
		},
		methods: {
			// 表单监听
			formListener() {
				if(!this.elemID) return {};
				// 获取 echarts 工具类
				let $ec = $tools.echartsTools();
				// 获取当前元素的 echarts 初始化对象
				let ecInitObj = $.ecInitObjs[this.elemID];
				// echarts 图表重绘
				$ec.render(ecInitObj, this.elemEcOpts);
				return this.grid;
			}
		}
	}
</script>

<style>
	
</style>
