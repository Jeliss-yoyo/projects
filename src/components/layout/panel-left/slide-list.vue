<template>
	<!-- 左侧面板 幻灯片列表 -->
	<div id="slide-list">
		<div class="afx-panel-title t-center">
			幻灯片列表
			<el-tooltip effect="light" content="新建幻灯片" placement="right">
				<i class="el-icon-plus icon-button create-slide" @click="addSlide(1)"></i>
			</el-tooltip>
		</div>
		<!-- 幻灯片列表 -->
		<div class="afx-panel-container">
			<el-menu 
				text-color="#ccc" 
				background-color="#212528" 
				active-text-color="#409EFF"
				unique-opened 
				@open="handleOpen" 
				@select="handleSelect" 
				:default-openeds="defaultOpeneds()"
			>
				<el-submenu v-for="(item, k, idx) in slideList" :index="k" :key="k">
					<template slot="title">
						<i class="el-icon-video-camera-solid" :class="active.slideId === k ? 'clr-active' : ''"></i>
						{{ item.slideName + ' ' + (idx + 1) }}
					</template>
					<!-- 幻灯片内容列表 -->
					<el-menu-item v-for="(ele, p) in item.elements" :id="p" :index="p" :key="p">
						{{ ele.eleName }}
					</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
	</div>
</template>

<script>
	import { iTools } from '@/utils/tools';
	
	export default {
		name: 'slide-list',
		data() {
			return {
				
			}
		},
		watch: {
			_counter: {
				handler(n, o){
					//console.log('幻灯片列表更新');
					this.$forceUpdate();
				}
			}
		},
		created() {
			// 第一个幻灯片会自动创建
			!this.slideCount && this.addSlide(0);
			// 默认选中第一个幻灯片
			this.defaultOpenFirstSlide();
		},
		computed: {
			// 当前状态
			active() {
				return this.$store.getters._active;
			},
			// 当前项目的幻灯片列表
			slideList() {
				return this.$store.getters._slideList;
			},
			// 当前已创建的幻灯片数量
			slideCount() {
				return Object.keys(this.slideList).length;
			},
			_counter() {
				return this.$store.state.counter;
			}
		},
		methods: {
			// 默认选中第一个幻灯片
			defaultOpenFirstSlide() {
				const slideId = Object.keys(this.slideList)[0];
				//console.log('默认选中第一个幻灯片');
				this.$store.commit('_active', { slideId });
			},
			// 添加幻灯片
			addSlide(c) {
				const msg = [
					'第一个幻灯片已自动创建，开始你的设计吧！',
					'恭喜你！又创建了一个幻灯片！'
				];
				// 实例化对象
				const newSlide = new iTools._Slide();
				// 添加到数据中心
				this.$store.commit('_addSlide', newSlide);
				this.$message.success(msg[c]);
			},
			// 幻灯片菜单切换
			handleOpen(slideId) {
				this.$store.commit('_active', { slideId });
			},
			// 幻灯片内容选中
			handleSelect(eid) {
				
			},
			// 二级菜单（元素） 选中/取消 样式设置
			setSubMenuStyle() {
				
			},
			// 默认打开的菜单项
			defaultOpeneds() {
				return [this.active.slideId];
			}
		}
	}
</script>

<style lang="less">
	@import '../../../assets/layout/i-style.less';
	
	#slide-list {
		height: 100%;
	}
	.afx-panel-container {
		height: 85vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.create-slide {
		float: right;
		position: relative;
		top: 9px;
		left: -10px;
	}
	.is-opened > .el-submenu__title {
		color: #ff0 !important;
	}
	.clr-active {
		color: #409EFF;
	}
</style>
