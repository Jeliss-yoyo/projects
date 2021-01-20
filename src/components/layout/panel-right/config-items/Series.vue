<template>
	<!-- 数据系列 -->
	<div class="ec-series">
		<el-collapse accordion>
			<el-collapse-item title="数据系列" name="vt-series">
				<el-form ref="form" :model="formListener()" label-width="100px">
					
					<!-- 数据系列属性结构解析 -->
					<div v-for="(ser, idx) in data.series" :key="idx" class="ec-series-item">
						<el-form-item v-show="data.series.length > 1" class="el-form-item-title" 
							:label="'第 ' + (idx + 1) + ' 系列'"></el-form-item>
						<!-- 以下属性，仅在 pie 图中有效 -->
						<div v-if="ser.type == 'pie'">
							<el-form-item label="中心坐标">
								<el-col :span="11">
									<el-form-item>
										<el-input type="text" @input="dataListener" v-model="forChangePie(ser, 'center')[0]"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="2"> , </el-col>
								<el-col :span="11">
									<el-form-item>
										<el-input type="text" @input="dataListener" v-model="forChangePie(ser, 'center')[1]"></el-input>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="内外环半径">
								<el-col :span="11">
									<el-form-item>
										<el-input type="text" @input="dataListener" v-model="forChangePie(ser, 'radius')[0]"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="2"> , </el-col>
								<el-col :span="11">
									<el-form-item>
										<el-input type="text" @input="dataListener" v-model="forChangePie(ser, 'radius')[1]"></el-input>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="南丁格尔图">
								<el-select v-model="ser.roseType" @change="dataListener">
									<el-option label="不启用" :value="false"></el-option>
									<el-option label="radius" value="radius"></el-option>
									<el-option label="area" value="area"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="起始角度">
								<el-input type="number" @input="dataListener" v-model="ser.startAngle"></el-input>
							</el-form-item>
							<el-form-item label="最小扇区角度">
								<el-input type="number" @input="dataListener" v-model="ser.minAngle"></el-input>
							</el-form-item>
						</div>
							
						<!-- line 图 & bar 图 -->
						<div v-if="ser.type != 'pie'">
							<el-form-item label="系列名称">
								<el-input type="text" v-model="ser.name" readonly></el-input>
							</el-form-item>
							<el-form-item label="图表类型">
								<el-select v-model="ser.type" @change="dataListener">
									<el-option label="折线图" value="line"></el-option>
									<el-option label="柱状图" value="bar"></el-option>
									<el-option label="散点图" value="scatter"></el-option>
								</el-select>
							</el-form-item>
							
							<!-- 以下属性，仅在 line 图中有效 -->
							<div v-if="ser.type === 'line'">
								<el-form-item label="面积图">
									<el-switch :value="!!ser.areaStyle" @change="changeArea(ser)" @input="dataListener" 
										active-text="启用" inactive-text="禁用"></el-switch>
								</el-form-item>
								<!-- <el-form-item label="y轴索引">
									<el-input type="number" v-model="ser.yAxisIndex" @input="dataListener"></el-input>
								</el-form-item> -->
							</div>
							
							<!-- 以下属性，仅在 bar 图中有效 -->
							<div v-if="ser.type === 'bar'">
								<!-- <el-form-item label="y轴索引">
									<el-input type="number" v-model="ser.yAxisIndex" @input="dataListener"></el-input>
								</el-form-item> -->
								<el-form-item label="柱子最小宽度">
									<el-input type="number" v-model="ser.barMinWidth" @input="dataListener"></el-input>
								</el-form-item>
								<el-form-item label="柱子最大宽度">
									<el-input type="number" v-model="ser.barMaxWidth" @input="dataListener"></el-input>
								</el-form-item>
								<el-form-item label="不同系列间距">
									<el-input type="text" v-model="ser.barGap" @input="dataListener"></el-input>
								</el-form-item>
							</div>
							
							<el-form-item v-show="data.series.length > 1" label="堆叠模式">
								<el-switch :value="useStack" @change="changeStack" @input="dataListener"
								active-text="启用" inactive-text="禁用"></el-switch>
							</el-form-item>
						</div>
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
					series: []
				},
				useStack: false,
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
				this.data.series = active.elemEcOpts.series;
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
			// 是否启用面积图
			changeArea(ser) {
				if(!!ser.areaStyle) {
					delete ser.areaStyle;
				}else{
					ser.areaStyle = {};
				}
			},
			// 是否启用堆叠模式
			changeStack(ok) {
				this.useStack = ok;
				this.data.series.forEach(v => {
					v.stack = ok ? 'total' : '';
				});
			},
			// 表单数据监听，手动重绘
			dataListener() {
				this.$forceUpdate()
			},
			// 针对切换饼图时，数组不存在问题的处理
			forChangePie(ser, prop) {
				if(!ser[prop]) ser[prop] = [0, 0];
				return ser[prop];
			}
		}
	}
</script>

<style>
	.el-form-item-title .el-form-item__label {
		color: #ff0 !important;
	}
</style>
