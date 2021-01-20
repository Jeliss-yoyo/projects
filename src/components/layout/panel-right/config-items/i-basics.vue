<template>
	<!-- 基础属性配置 -->
	<div class="i-basics">
		<el-collapse value="['1']" accordion>
			<el-collapse-item title="基础属性" name="1">
				<el-form ref="form" :model="element" label-width="90px">
					<el-form-item label="组件尺寸">
						<el-col :span="11">
							<el-form-item>
								<el-input type="number" v-model="element.attribute.width"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"> x </el-col>
						<el-col :span="11">
							<el-form-item>
								<el-input type="number" v-model="element.attribute.height"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="组件位置坐标">
						<el-col :span="11">
							<el-form-item>
								<el-input type="number" v-model="element.attribute.left"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"> , </el-col>
						<el-col :span="11">
							<el-form-item>
								<el-input type="number" v-model="element.attribute.top"></el-input>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="背景颜色">
						<el-col :span="20">
							<el-form-item>
								<el-input type="text" v-model="element.attribute.bgClr"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item>
								<el-color-picker show-alpha color-format="rgb" v-model="element.attribute.bgClr" size="mini"></el-color-picker>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="背景图片">
						<el-input type="text" v-model="element.attribute.bgImage"></el-input>
						<img :src="element.attribute.bgImage" alt="" width="120px">
					</el-form-item>
					<el-form-item label="背景平铺方式">
						<el-select placeholder="请选择平铺方式" v-model="element.attribute.bgSize">
						    <el-option value="100% 100%" label="拉伸"></el-option>
							<el-option value="cover" label="适应"></el-option>
							<el-option value="contain" label="填充"></el-option>
						  </el-select>
					</el-form-item>
					<el-form-item label="图层叠加顺序">
						<el-input type="number" v-model="element.attribute.zIndex"></el-input>
					</el-form-item>
					<el-form-item label="进场效果">
						<el-select v-model="element.effects.enter">
							<el-option v-for="ins in effectList" :key="ins" :label="ins" :value="ins + ''"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="退场效果">
						<el-select v-model="element.effects.exits">
							<el-option v-for="ots in effectList" :key="ots" :label="ots" :value="ots + ''"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="强调效果">
						<el-select v-model="element.effects.hover">
							<el-option v-for="ovs in effectList" :key="ovs" :label="ovs" :value="ovs + ''"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	
	export default {
		name: 'i-basics',
		data() {
			return {
				// 临时特效
				effectList: ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat'],
			}
		},
		computed: {
			element() {
				return this.$store.getters._element || { attribute: {}, effects: {} };
			},
		}
	}
</script>

<style>
	
</style>
