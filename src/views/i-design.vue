<template>
	<div id="i-design">
		<el-container class="ex-container">
			<!-- 顶部导航：组件列表 & 操作列表 -->
			<el-header>
				<navigation-bar />
			</el-header>
			<el-container  class="in-container">
				<!-- 左侧：幻灯片列表 -->
				<el-aside width="180px">
					<slide-list />
				</el-aside>
				<!-- 可视化设计区域 -->
				<el-main>
					<custom-made />
				</el-main>
				<!-- 右侧：属性 & 数据 & 交互 -->
				<el-aside width="240px">
					{{ isElement.isElemChecked }}
					<slide-config v-show="!isElement" />
					<element-config v-show="isElement" />
				</el-aside>
			</el-container>
			<el-footer></el-footer>
		</el-container>
	</div>
</template>

<script>
	import navigationBar from '@/components/layout/nav-menu/navigation-bar';
	import slideList from '@/components/layout/panel-left/slide-list';
	import customMade from '@/components/layout/custom-made';
	import slideConfig from '@/components/layout/panel-right/slide-config';
	import elementConfig from '@/components/layout/panel-right/element-config';
	
	
	export default {
		name: 'i-design',
		components: {
			navigationBar,
			slideList,
			slideConfig,
			customMade,
			elementConfig
		},
		computed: {
			slide() {
				return this.$store.getters._slide;
			},
			isElement() {
				return this.$store.state.active.isElemChecked;
			},
			currentEleId() {
				return this.$store.state.active.eleId;
			},
			_counter() {
				return this.$store.state.counter;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "./../assets/layout/i-design.less";
</style>
