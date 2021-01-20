<template>
	<!-- 标题配置 -->
	<div class="i-title">
		<el-collapse accordion>
			<el-collapse-item title="标题" name="vt-title">
				<el-form ref="form" :model="ecOpts" label-width="90px">
					<el-form-item label="主标题名">
						<el-input type="text" v-model="ecOpts.text"></el-input>
					</el-form-item>
					<el-collapse accordion>
						<el-collapse-item title="主标题字体" name="vt-title-font1">
							<el-form-item label="字体系列">
								<el-input type="text" v-model="ecOpts.textStyle.fontFamily"></el-input>
							</el-form-item>
							<el-form-item label="字体大小">
								<el-input type="text" v-model="ecOpts.textStyle.fontSize"></el-input>
							</el-form-item>
							<el-form-item label="字体粗细">
								<el-select v-model="ecOpts.textStyle.fontWeight">
									<el-option v-for="fw in fontWeightArr" :key="fw" :label="fw" :value="fw"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="字体颜色">
								<el-col :span="20">
									<el-form-item>
										<el-input type="text" v-model="ecOpts.textStyle.color"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item>
										<el-color-picker v-model="ecOpts.textStyle.color" size="mini"></el-color-picker>
									</el-form-item>
								</el-col>
							</el-form-item>
						</el-collapse-item>
						<el-collapse-item title="主标题边距" name="vt-title-position">
							<el-form-item label="顶部">
								<el-input type="text" v-model="ecOpts.top"></el-input>
							</el-form-item>
							<el-form-item label="底部">
								<el-input type="text" v-model="ecOpts.bottom"></el-input>
							</el-form-item>
							<el-form-item label="左侧">
								<el-input type="text" v-model="ecOpts.left"></el-input>
							</el-form-item>
							<el-form-item label="右侧">
								<el-input type="text" v-model="ecOpts.right"></el-input>
							</el-form-item>
						</el-collapse-item>
					</el-collapse>
					<el-form-item label="次标题名">
						<el-input type="text" v-model="ecOpts.subtext"></el-input>
					</el-form-item>
					<el-collapse accordion>
						<el-collapse-item title="次标题字体" name="vt-title-font2">
							<el-form ref="form" :model="ecOpts" label-width="90px">
								<el-form-item label="字体系列">
									<el-input type="text" v-model="ecOpts.subtextStyle.fontFamily"></el-input>
								</el-form-item>
								<el-form-item label="字体大小">
									<el-input type="number" v-model="ecOpts.subtextStyle.fontSize"></el-input>
								</el-form-item>
								<el-form-item label="字体粗细">
									<el-select v-model="ecOpts.subtextStyle.fontWeight">
										<el-option v-for="fw in fontWeightArr" :key="fw" :label="fw" :value="fw"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="字体颜色">
									<el-col :span="20">
										<el-form-item>
											<el-input type="text" v-model="ecOpts.subtextStyle.color"></el-input>
										</el-form-item>
									</el-col>
									<el-col :span="4">
										<el-form-item>
											<el-color-picker v-model="ecOpts.subtextStyle.color" size="mini"></el-color-picker>
										</el-form-item>
									</el-col>
								</el-form-item>
							</el-form>
						</el-collapse-item>
					</el-collapse>	
				</el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	export default {
		name: 'i-title',
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
				const def = {
					textStyle: {},
					subtextStyle: {}
				};
				const option = this.element.option || {};
				return option.title || def;
			}
		}
	}
</script>

<style></style>
