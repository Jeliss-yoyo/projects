<template>
	<!-- y轴配置 -->
	<div class="ec-yaxis">
		<el-collapse accordion>
			<el-collapse-item title="y 轴" name="vt-yaxis">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<div v-for="(yaxis, idx) in data.yaxis" :key="idx" class="ec-yaxis-item">
						<el-form-item v-if="data.yaxis.length > 1" class="el-form-item-title" 
							:label="'第 ' + (idx + 1) + ' 坐标轴'"></el-form-item>
						<el-form-item label="坐标轴名称">
							<el-input type="text" v-model="yaxis.name"></el-input>
						</el-form-item>
						<el-form-item label="坐标轴类型">
							<el-select v-model="yaxis.type">
								<el-option label="数值轴" value="value"></el-option>
								<el-option label="类目轴" value="category"></el-option>
								<el-option label="时间轴" value="time"></el-option>
								<el-option label="对数轴" value="log"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="坐标轴位置">
							<el-select v-model="yaxis.position">
								<el-option label="左侧" value="left"></el-option>
								<el-option label="右侧" value="right"></el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="所在索引">
							<el-input type="number" v-model="yaxis.gridIndex"></el-input>
						</el-form-item> -->
						<el-form-item label="位置偏移量">
							<el-input type="number" v-model="yaxis.offset"></el-input>
						</el-form-item>
						<el-collapse accordion>
							<el-collapse-item title="轴刻度标签" name="vt-yaxisLabel">
								<el-form-item label="字体系列">
									<el-input type="text" v-model="yaxis.axisLabel.fontFamily"></el-input>
								</el-form-item>
								<el-form-item label="字体大小">
									<el-input type="number" v-model="yaxis.axisLabel.fontSize"></el-input>
								</el-form-item>
								<el-form-item label="字体粗细">
									<el-select v-model="yaxis.axisLabel.fontWeight">
										<el-option v-for="fw in fontWeightArr" :key="fw" :label="fw" :value="fw"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="字体颜色">
									<el-col :span="20">
										<el-form-item>
											<el-input type="text" v-model="yaxis.axisLabel.color"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="4">
										<el-form-item>
											<el-color-picker v-model="yaxis.axisLabel.color" size="mini"></el-color-picker>
										</el-form-item>
									</el-col>
								</el-form-item>
								<el-form-item label="标签显示间隔">
									<el-input type="text" v-model="yaxis.axisLabel.interval"></el-input>
								</el-form-item>
								<el-form-item label="标签旋转角度">
									<el-input type="number" v-model="yaxis.axisLabel.rotate"></el-input>
								</el-form-item>
							</el-collapse-item>
						</el-collapse>
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
				data: {
					yaxis: [ { axisLabel: {} } ]
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
				this.data.yaxis = active.elemEcOpts.yAxis || [ { axisLabel: {} } ];
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
				return this.data;
			},
		}
	}
</script>

<style>
	.el-form-item-title .el-form-item__label {
		color: #ff0 !important;
	}
</style>
