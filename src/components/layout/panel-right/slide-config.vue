<template>
	<!-- 幻灯片属性配置 -->
	<div id="slides-config">
		<div class="afx-panel-title t-center">
			{{ slide.slideName || '幻灯片' }}
		</div>
		<el-form ref="form" label-width="70px">
			<el-form-item label="屏幕大小">
				{{ projectSize[0] }} x {{ projectSize[1] }}
			</el-form-item>
			<el-form-item label="缩放方式">
				{{ zoomWay }}
			</el-form-item>
			<el-form-item label="背景颜色">
				<el-col :span="20">
					<el-form-item>
						<el-input type="text" v-model="slide.bgClr"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item>
						<el-color-picker show-alpha color-format="rgb" v-model="slide.bgClr" size="mini"></el-color-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="背景图片">
				<el-input type="text" placeholder="请指定图片地址" v-model="slide.bgImage"></el-input>
				<img :src="slide.bgImage" alt="" width="150px">
			</el-form-item>
			<el-form-item label="平铺方式">
				<el-select placeholder="请选择平铺方式" v-model="slide.bgSize">
				    <el-option value="100% 100%" label="拉伸"></el-option>
					<el-option value="cover" label="适应"></el-option>
					<el-option value="contain" label="填充"></el-option>
				  </el-select>
			</el-form-item>
			<el-form-item label="进场效果">
				<el-select v-model="slide.effects.enter">
					<el-option v-for="ins in effectList" :key="ins" :label="ins" :value="ins + ''"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="退场效果">
				<el-select v-model="slide.effects.exits">
					<el-option v-for="outs in effectList" :key="outs" :label="outs" :value="outs + ''"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 临时特效
				effectList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat']
			}
		},
		computed: {
			project() {
				return this.$store.getters._project;
			},
			projectSize() {
				return this.project.resolution;
			},
			slide() {
				return this.$store.getters._slide;
			},
			zoomWay() {
				return '等比缩放' + (this.projectSize[0] > this.projectSize[1] ? '宽度' : '高度') + '铺满';
			},
			_counter() {
				return this.$store.state.counter;
			}
		}
	}
</script>

<style lang="less">
	@import '../../../assets/layout/i-style.less';
	@import '../../../assets/layout/i-slide-config.less';
</style>
