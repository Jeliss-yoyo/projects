<template>
	<!-- 图例配置 -->
	<div class="ec-legend">
		<el-collapse accordion>
			<el-collapse-item title="图例" name="vt-legend">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<el-form-item label="类型">
						<el-select v-model="legend.type">
							<el-option label="普通图例" value="plain"></el-option>
							<el-option label="滚动翻页图例" value="scroll"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="布局朝向">
						<el-select v-model="legend.orient">
							<el-option label="水平" value="horizontal"></el-option>
							<el-option label="垂直" value="vertical"></el-option>
						</el-select>
					</el-form-item>
					<el-collapse accordion>
						<el-collapse-item title="图例字体" name="vt-legend-font1">
							<el-form-item label="字体系列">
								<el-input type="text" v-model="legend.textStyle.fontFamily"></el-input>
							</el-form-item>
							<el-form-item label="字体大小">
								<el-input type="number" v-model="legend.textStyle.fontSize"></el-input>
							</el-form-item>
							<el-form-item label="字体粗细">
								<el-select v-model="legend.textStyle.fontWeight">
									<el-option v-for="fw in fontWeightArr" :key="fw" :label="fw" :value="fw"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="字体颜色">
								<el-col :span="20">
									<el-form-item>
										<el-input type="text" v-model="legend.textStyle.color"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item>
										<el-color-picker v-model="legend.textStyle.color" size="mini"></el-color-picker>
									</el-form-item>
								</el-col>
							</el-form-item>
						</el-collapse-item>
						<el-collapse-item title="图例边距" name="vt-legend-position">
							<el-form-item label="顶部">
								<el-input type="text" v-model="legend.top"></el-input>
							</el-form-item>
							<el-form-item label="底部">
								<el-input type="text" v-model="legend.bottom"></el-input>
							</el-form-item>
							<el-form-item label="左侧">
								<el-input type="text" v-model="legend.left"></el-input>
							</el-form-item>
							<el-form-item label="右侧">
								<el-input type="text" v-model="legend.right"></el-input>
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
				legend: {
					textStyle: {}
				},
				// 字体粗细可选值
				fontWeightArr: ['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900],
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
				this.legend = active.elemEcOpts.legend;
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
				return this.legend;
			}
		}
	}
</script>

<style>
	
</style>
