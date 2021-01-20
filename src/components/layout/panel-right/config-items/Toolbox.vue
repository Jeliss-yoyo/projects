<template>
	<!-- toolbox配置 -->
	<div class="ec-toolbox">
		<el-collapse accordion>
			<el-collapse-item title="工具栏" name="vt-toolbox">
				<el-form ref="form" :model="formListener()" label-width="100px">
					<el-form-item label="图片保存">
						<el-switch v-model="toolbox.feature.saveAsImage.show" active-text="启用" inactive-text="禁用"></el-switch>
					</el-form-item>
					<el-form-item label="状态还原">
						<el-switch v-model="toolbox.feature.restore.show" active-text="启用" inactive-text="禁用"></el-switch>
					</el-form-item>
					<el-form-item label="数据视图">
						<el-switch v-model="toolbox.feature.dataView.show" active-text="启用" inactive-text="禁用"></el-switch>
					</el-form-item>
					<el-form-item label="x轴区域缩放">
						<el-switch v-model="toolbox.feature.dataZoom.show" active-text="启用" inactive-text="禁用"></el-switch>
					</el-form-item>
					<el-collapse accordion>
						<el-collapse-item title="动态类型切换" name="vt-magicType">
							<el-form-item label="是否启用">
								<el-switch v-model="toolbox.feature.magicType.show" active-text="启用" inactive-text="禁用"></el-switch>
							</el-form-item>
							<!-- 动态类型切换的选项 -->
							<div v-if="toolbox.feature.magicType.show">
								<el-form-item label="折线图">
									<el-switch :value="isExist('line')" @change="forMagicType('line')" active-text="启用" inactive-text="禁用"></el-switch>
								</el-form-item>
								<el-form-item label="柱状图">
									<el-switch :value="isExist('bar')" @change="forMagicType('bar')" active-text="启用" inactive-text="禁用"></el-switch>
								</el-form-item>
								<el-form-item label="堆叠模式">
									<el-switch :value="isExist('stack')" @change="forMagicType('stack')" active-text="启用" inactive-text="禁用"></el-switch>
								</el-form-item>
								<el-form-item label="平铺模式">
									<el-switch :value="isExist('tiled')" @change="forMagicType('tiled')" active-text="启用" inactive-text="禁用"></el-switch>
								</el-form-item>
							</div>
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
				toolbox: {
					feature: {
						saveAsImage: {},
						restore: {},
						dataView: {},
						dataZoom: {},
						magicType: {}
					}
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
				this.toolbox = active.elemEcOpts.toolbox;
				this.elemID = active.elemID;
			});
		},
		methods: {
			// 动态类型切换的数据处理
			forMagicType(t) {
				let mtype = this.toolbox.feature.magicType.type,
					isok = mtype.includes(t);
				let set = new Set(mtype);
				isok ? set.delete(t) : set.add(t);
				this.toolbox.feature.magicType.type = Array.from(set);
				this.$forceUpdate();
			},
			// 动态类型切换数组中是否含有 xx 类型
			isExist(t) {
				return this.toolbox.feature.magicType.type.includes(t);
			},
			// 表单监听
			formListener() {
				if(!this.elemID) return this.toolbox;
				// 获取 echarts 工具类
				let $ec = $tools.echartsTools();
				// 获取当前元素的 echarts 初始化对象
				let ecInitObj = $.ecInitObjs[this.elemID];
				// echarts 图表重绘
				$ec.render(ecInitObj, this.elemEcOpts);
				return this.toolbox;
			}
		}
	}
</script>

<style>
	
</style>
