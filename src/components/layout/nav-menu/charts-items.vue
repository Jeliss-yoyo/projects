<template>
	<!-- 导航面板 -->
	<div id="charts-items">
		<el-container>
			<!-- 左侧导航 -->
			<el-aside width="56px">
				<el-menu text-color="#fff" background-color="#2a2e35" active-text-color="#ffd04b" :default-active="active.menu" collapse>
					<!-- 垂直导航按钮 -->
					<el-menu-item v-for="(c, i) in formatterBtns" :index="i" :key="i" @click="menuChange(i)">
						<i :class="'iconfont ' + c.icon"></i>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<!-- 图表内容区域 -->
			<el-main>
				<!-- 一行三列展示 -->
				<el-row v-for="(row, ridx) in formatData" :gutter="10" :key="ridx">
					<el-col v-for="(col, cidx) in row" :span="8" :key="cidx">
						<el-card shadow="hover" :body-style="{ padding: '5px', display: col.name ? 'block' : 'none' }">
							<img src="../../../assets/img/thumbnail/bar-01.png" class="image" 
								@click="addElement({ name: col.name, component: col.component })">
							<div class="chart-name">{{ col.name }}</div>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import { iTools } from '@/utils/tools';
	
	export default {
		props: {
			navigation: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				// 图片映射
				picMap: {},
				// 当前激活的菜单
				active: {
					menu: '',
					data: []
				},
				// 资源仓库
				resource: {},
				// 配置数据
				itemData: {}
			}
		},
		created() {
			// 获取菜单项数据
			this.getMenuItems();
		},
		computed: {
			// 当前项目信息
			project() {
				return this.$store.getters._project;
			},
			// 将数据格式化为一个二维数组, 方便以一行三列展示
			formatData() {
				let curData = this.itemData[this.navigation];
				if(!curData) return {};
				const menu = this.active.menu;
				if(this.resource[menu]){
					return this.resource[menu];
				}else{
					let data = curData[menu].item,
						rows = Math.ceil(data.length / 3),
						res = [];
					for(let i=0; i<rows; i++) {
						let o = data.splice(0, 3);
						res.push(o.length < 3 ? o.concat([{}, {}]).splice(0, 3) : o);
					}
					this.resource[menu] = res;
					return res;
				}
			},
			formatterBtns() {
				return this.itemData[this.navigation] || {};
			}
		},
		methods: {
			// 获取菜单项数据
			async getMenuItems() {
				const { data } = await this.$axios.get('nav-charts-data.json');
				this.itemData = data;
				this.active.menu = Object.keys(this.itemData[this.navigation])[0];
			},
			// 菜单切换
			menuChange(m) {
				this.active.menu = m;
			},
			// 向当前幻灯片的元素列表中添加一个组件（图表）
			addElement(item) {
				// 项目尺寸
				const [pw, ph] = this.project.resolution;
				// 实例化一个元素
				const newElement = new iTools._Element({
					eleName: item.name,
					component: item.component,
					left: (pw - 200) / 2,
					top: (ph - 200) / 2
				});
				// 添加元素
				this.$store.commit('_addElement', newElement);
				this.$message.success(`成功！添加了一个元素：【${ item.name }】`);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import './../../../assets/font-icon/iconfont.css';
	
	.el-container {
		min-height: 240px;
	}
	.el-aside {
		overflow-x: hidden;
	}
	.el-main {
		margin: 0;
		padding: 0;
		background-color: #1b1f24;
	}
	.el-menu {
		width: 56px;
		height: 100%;
		border: none !important;
		.el-menu-item {
			height: 56px !important;
			line-height: 56px !important;
		}
	}
	.el-row {
		margin: 5px 0 5px 0 !important;
	}
	.el-card {
		background-color: #282a30;
		border: none;
		width: 170px;
		cursor: pointer;
		.image {
			width: 160px;
			height: 90px;
		}
		.chart-name {
			color: #ccc;
			font-size: 12px;
		}
	}
</style>
