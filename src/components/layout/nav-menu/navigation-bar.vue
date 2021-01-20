<template>
	<!-- 顶部导航栏 -->
	<div id="navigation-bar">
		<el-menu mode="horizontal" text-color="#ccc" background-color="#212528" default-active="1">
			<!-- 图表类 -->
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-s-data"></i>
					<span slot="title">图表</span>
				</template>
				<div v-cloak class="menu-panel">
					<charts-items :navigation="'chart'"></charts-items>
				</div>
			</el-submenu>
			<!-- 地图类 -->
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-s-help"></i>
					<span slot="title">地图</span>
				</template>
				<div v-cloak class="menu-panel">
					<!-- <img src="@/assets/design/imgs/menu-map.png"> -->
				</div>
			</el-submenu>
			<!-- 媒体类 -->
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-video-camera-solid"></i>
					<span slot="title">媒体</span>
				</template>
				<div v-cloak class="menu-panel">
					<!-- <img src="@/assets/design/imgs/menu-img.png"> -->
				</div>
			</el-submenu>
			<!-- 文本、表格类 -->
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-s-unfold"></i>
					<span slot="title">文本</span>
				</template>
				<div v-cloak class="menu-panel">
					<!-- <charts-items :navigation="'text'"></charts-items> -->
				</div>
			</el-submenu>
			<!-- 组件类 -->
			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-s-platform"></i>
					<span slot="title">组件</span>
				</template>
				<div v-cloak class="menu-panel">
					<!-- <img src="@/assets/design/imgs/menu-ele.png"> -->
				</div>
			</el-submenu>
			<!-- 背景类 -->
			<el-submenu index="6">
				<template slot="title">
					<i class="el-icon-picture"></i>
					<span slot="title">背景</span>
				</template>
				<div v-cloak class="menu-panel">
					<!-- <img src="@/assets/design/imgs/menu-bg.png"> -->
				</div>
			</el-submenu>
		</el-menu>
		<!-- 右上角按钮组 -->
		<el-row class="right-btns">
			<el-tooltip v-for="(item, idx) in buttonItems" :key="idx" effect="light" :content="item.name" placement="bottom">
				<el-button :type="item.type" size="small" :icon="item.icon" @click="execute(item.code)" circle></el-button>
			</el-tooltip>
		</el-row>
	</div>
</template>

<script>
	
	import chartsItems from './charts-items';
	
	export default {
		components: {
			chartsItems
		},
		data() {
			return {
				buttonItems: [
					{
						name: '返回',
						code: 'back',
						type: 'info',
						icon: 'el-icon-back'
					},
					{
						name: '保存',
						code: 'save',
						type: 'success',
						icon: 'el-icon-folder-checked'
					},
					{
						name: '预览',
						code: 'preview',
						type: 'warning',
						icon: 'el-icon-view'
					},
					{
						name: '发布',
						code: 'emit',
						type: 'primary',
						icon: 'el-icon-s-promotion'
					},
					{
						name: '删除',
						code: 'delete',
						type: 'danger',
						icon: 'el-icon-delete'
					}
				]
			}
		},
		methods: {
			execute(code) {
				// 发送操作指令
				if (code === 'back') {
					this.$router.push('/');
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.right-btns {
		position: absolute;
		right: 10px;
		top: 0;
	}
	.el-button--mini, 
	.el-button--small {
		font-size: 10px;
	}
	.el-menu.el-menu--horizontal {
		border-bottom: none;
	}
</style>
