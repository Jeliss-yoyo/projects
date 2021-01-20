<template>
	<!-- x轴配置 -->
	<div class="i-xaxis">
		<el-collapse accordion>
			<el-collapse-item title="x 轴" name="vt-xaxis">
				<el-form ref="form" :model="ecOpts" label-width="100px">
					<el-form-item label="坐标轴名称">
						<el-input type="text" v-model="ecOpts.name"></el-input>
					</el-form-item>
					<el-form-item label="坐标轴类型">
						<el-select v-model="ecOpts.type">
							<el-option label="数值轴" value="value"></el-option>
							<el-option label="类目轴" value="category"></el-option>
							<el-option label="时间轴" value="time"></el-option>
							<el-option label="对数轴" value="log"></el-option>
						</el-select>
					</el-form-item>
					<el-collapse accordion>
						<el-collapse-item title="轴刻度标签" name="vt-xaxisLabel">
							<el-form-item label="字体系列">
								<el-input type="text" v-model="ecOpts.axisLabel.fontFamily"></el-input>
							</el-form-item>
							<el-form-item label="字体大小">
								<el-input type="number" v-model="ecOpts.axisLabel.fontSize"></el-input>
							</el-form-item>
							<el-form-item label="字体粗细">
								<el-select v-model="ecOpts.axisLabel.fontWeight">
									<el-option v-for="fw in fontWeightArr" :key="fw" :label="fw" :value="fw"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="字体颜色">
								<el-col :span="20">
									<el-form-item>
										<el-input type="text" v-model="ecOpts.axisLabel.color"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item>
										<el-color-picker v-model="ecOpts.axisLabel.color" size="mini"></el-color-picker>
									</el-form-item>
								</el-col>
							</el-form-item>
							<el-form-item label="标签显示间隔">
								<el-input type="text" v-model="ecOpts.axisLabel.interval"></el-input>
							</el-form-item>
							<el-form-item label="标签旋转角度">
								<el-input type="number" v-model="ecOpts.axisLabel.rotate"></el-input>
							</el-form-item>
						</el-collapse-item>
					</el-collapse>
				</el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	export default {
		name: 'i-xaxis',
		data() {
			return {
				// 字体粗细可选值
				fontWeightArr: ['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900],
			}
		},
		computed: {
			element() {
				return this.$store.getters._element || {};
			},
			ecOpts() {
				const def = { axisLabel: {} };
				const option = this.element.option || {};
				return option.xAxis || def;
			}
		}
	}
</script>

<style></style>
