<template>
	<div class="chart-config">
		<!-- 自定义标签按钮组 -->
		<ul class="tabs-btn-group">
			<li 
				v-for="o in tabsBtnGroup.lis" 
				:class="{ 'tab-li-active': tabsBtnGroup.chk === o.code }" 
				@click="tabsBtnGroupClick(o.code)"
			>
				<el-tooltip class="item" :content="o.name" placement="bottom">
					<i :class="o.icon"></i>
				</el-tooltip>
			</li>
		</ul>
		<!-- 当前元素名称 -->
		<el-divider content-position="left">{{ element.eleName }}</el-divider>
		<!-- 内容区域 -->
		<div class="afx-panel-container">
			<!-- 1. 属性面板 -->
			<div v-show="tabsVisible(0)" class="prop-setting">
				<!-- 基础属性（针对所有组件） -->
				<i-basics />
				<!-- echarts 组件的属性 -->
				<i-title v-show="cfgItemVisible('title')" />
				<i-xaxis v-show="cfgItemVisible('xAxis')" />
			</div>
			<!-- 2. 数据面板 -->
			<div v-show="tabsVisible(1)" class="prop-setting">
				
			</div>
			<!-- 3. 交互面板 -->
			<div v-show="tabsVisible(2)" class="prop-setting">
				
			</div>
		</div>
	</div>
</template>

<script>
	import IBasics from './config-items/i-basics';
	import ITitle from './config-items/i-title';
	import IXaxis from './config-items/i-xaxis';
	
	export default {
		components: {
			IBasics,
			ITitle,
			IXaxis
		},
		data() {
			return {
				// tabs 标签按钮组
				tabsBtnGroup: {
					lis: [
						{
							code: 'options',
							name: '属性',
							icon: 'el-icon-s-operation'
						},
						{
							code: 'data',
							name: '数据',
							icon: 'el-icon-sort'
						},
						{
							code: 'interaction',
							name: '交互',
							icon: 'el-icon-thumb'
						}
					],
					chk: 'options'
				}
			};
		},
		computed: {
			element() {
				return this.$store.getters._element || {};
			},
			option() {
				return this.element.option || {};
			}
		},
		methods: {
			// tabs 标签按钮组显示状态
			tabsVisible(k) {
				const t = ['options', 'data', 'interaction'];
				return this.tabsBtnGroup.chk === t[k];
			},
			// tabs 标签按钮组点击事件
			tabsBtnGroupClick(code) {
				this.tabsBtnGroup.chk = code;
			},
			// 是否显示指定配置项
			cfgItemVisible(t) {
				return !!this.option[t];
			}
		},
	}
</script>

<style lang="less">
	@import '../../../assets/layout/i-element-config.less';
</style>
