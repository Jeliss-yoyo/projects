<template>
	<!-- 通用文本配置 -->
	<div class="gl-text">
		<el-collapse accordion>
			<el-collapse-item title="文本" name="vt-text">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<el-form-item label="文本内容">
						<el-input type="text" v-model="text.content"></el-input>
					</el-form-item>
					<el-form-item label="字体系列">
						<el-input type="text" v-model="text.fontFamily"></el-input>
					</el-form-item>
					<el-form-item label="字体大小">
						<el-input type="text" v-model="text.fontSize"></el-input>
					</el-form-item>
					<el-form-item label="字体粗细">
						<el-select v-model="text.fontWeight">
							<el-option v-for="fw in fontWeightArr" :key="fw" :label="fw" :value="fw"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="字体颜色">
						<el-col :span="20">
							<el-form-item>
								<el-input type="text" v-model="text.color"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item>
								<el-color-picker v-model="text.color" size="mini"></el-color-picker>
							</el-form-item>
						</el-col>
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
				// 文本对象
				text: {},
				// 字体粗细可选值
				fontWeightArr: ['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900],
				// 当前激活元素的ID
				elemID: ''
			}
		},
		mounted() {
			VueEvent.$on('$webppt-data', webppt => {
				let active = $tools.afxGetActiveElem.call(this, webppt);
				if(!active) return;
				this.text = active.elemBaseStyle;
				this.elemID = active.elemID;
			});
		},
		methods: {
			// 表单监听
			formListener() {
				if(!this.elemID) return {};
				// 激活元素即时更新
				$tools.elemUpdateForGlText(this.elemID, this.text);
				return this.text;
			}
		}
	}
</script>

<style>
	
</style>
