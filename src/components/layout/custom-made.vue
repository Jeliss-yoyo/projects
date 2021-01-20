<template>
	<!-- 可视化定制区域 -->
	<div id="custom-made">
		<!-- 虚拟大屏 -->
		<div id="virtual-screen" :style="vScreenStyle" @click.self="onClickVScreen">
			<vueResiable
				v-for="(ele, k) in slide.elements" 
				:key="k"
				:scaleRatio="vScale"
				:eleId="k"
				@resizing="getBoxInfo"
				@onSelectElement="onClickBox"
				:w="+ele.attribute.width"
				:h="+ele.attribute.height"
				:x="+ele.attribute.left"
				:y="+ele.attribute.top"
				:z="+ele.attribute.zIndex"
				:bgClr="ele.attribute.bgClr"
				:bgImage="ele.attribute.bgImage"
				:bgSize="ele.attribute.bgSize"
			>
				<component :is="ele.component" :eleId="k" @options="getOptions" />
			</vueResiable>
		</div>
	</div>
</template>

<script>
	import vueResiable from '@/components/resizable/vue-resizable';
	import { $components } from '@/components/elements/components';
	$components.vueResiable = vueResiable;
	export default {
		name: 'custom-made',
		components: $components,
		data() {
			return {
				// 当前项目信息
				project: this.$store.state.project,
				// custom-made 容器尺寸
				wrapSize: [],
				// 虚拟大屏的尺寸
				vScreenSize: [],
				// 当前缩放比例
				vScale: 1,
				
			}
		},
		watch: {
			_counter: {
				handler(n, o){
					//console.log('设计中心更新');
					this.$forceUpdate();
				}
			}
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
			vScreenStyle() {
				return `
					background-color: ${ this.slide.bgClr };
					background-image: url(${ this.slide.bgImage });
					background-size: ${ this.slide.bgSize };
				`;
			},
			_counter() {
				return this.$store.state.counter;
			}
		},
		mounted() {
			this.getWrapSize();
			this.setVirtualScreen();
			window.$store = this.$store;
		},
		methods: {
			// 获取 custom-made 容器尺寸
			getWrapSize() {
				const wrap = document.querySelector('#custom-made');
				const style = window.getComputedStyle(wrap, null);
				this.wrapSize = [parseFloat(style.width), parseFloat(style.height)];
			},
			// 设置虚拟大屏（根据项目分辨率，以一定的系数进行等比缩放）
			setVirtualScreen() {
				const [pw, ph] = this.project.resolution;
				const [rw, rh] = this.wrapSize;
				let vsw, vsh, scale;
				// 计算最佳的虚拟大屏尺寸以及缩放系数
				if (rw / rh <= pw / ph) {
					vsw = rw;
					vsh = vsw * ph / pw;
				} else {
					vsh = rh;
					vsw = vsh * pw / ph;
				}
				scale = vsw / pw;
				this.vScale = scale;
				const vScreen = document.querySelector('#virtual-screen');
				vScreen.style.cssText = `
					width: ${ vsw / scale }px; 
					height: ${ vsh / scale }px;
					transform: translate(-50%, -50%) scale(${ scale });
				`;
			},
			// 点击元素
			onClickBox(eleId) {
				// 两次点击的是否为同一元素
				const isSame = this.currentEleId === eleId;
				// 不同则更新
				(!this.isElement || !isSame) && this.$store.commit('_active', { eleId });
			},
			// 点击幻灯片
			onClickVScreen() {
				this.isElement && this.$store.commit('_active', {});
			},
			// 目标元素平移变换，属性更新
			getBoxInfo(left, top, width, height) {
				const attr = { width, height, left, top };
				this.$store.commit('_resizeElement', attr);
			},
			// 组件加载成功后，取得该组件相关属性，提交到 vuex
			getOptions(eleId, opts) {
				this.$store.commit('_updateElementOption', { eleId, opts });
			}
		}
	}
</script>

<style scoped>
	#custom-made {
		position: relative;
		height: 100%;
		overflow: hidden;
	}
	#virtual-screen {
		background-color: rgba(255, 255, 255, 0.2);
		position: absolute;
		top: 50%;
		left: 50%;
		background-size: 100% 100%;
	}
	
	.bounce-enter-active {
	  animation: bounce-in 5s;
	}
	.bounce-leave-active {
	  animation: bounce-in 5s reverse;
	}
	@keyframes bounce-in {
	  0% {
	    transform: translateX(30);
	  }
	  50% {
	    transform: translateX(60);
	  }
	  100% {
	    transform: translateX(0);
	  }
	}
</style>
