<template>
	<!-- 可视化管理页面，包含模板，项目，项目创建等 -->
	<div class="i-datavm">
		<div class="title">
			<h2>可视化管理页面，包含模板，项目，项目创建等</h2>
		</div>
		<router-link to="/i-design">
			<div class="create-project"></div>
		</router-link>
	</div>
</template>

<script>
	import { myTools } from '@/utils/tools.js';
	export default {
		name: 'i-datavm',
		data() {
			return {
				msg: 'hello'
			}
		},
		methods: {
			open() {
				
			}
		}
	}
</script>

<style scoped>
	.i-datavm {
		height: 100vh;
		position: relative;
	}
	.title {
		margin-top: 30px;
		text-align: center;
	}
	.create-project {
		width: 262px;
		height: 182px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-image: url(../assets/img/design/ds-create-project.png);
		cursor: pointer;
	}
</style>
