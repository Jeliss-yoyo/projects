<template>
	<!-- 数据配置组件 -->
	<div class="data-setting">
		<el-form v-show="!isGeneral" ref="form" :model="dataSource" label-width="100px">
			<table class="field-config" cellspacing="5">
				<tr>
					<th>字段</th>
					<th>映射</th>
					<th>状态</th>
				</tr>
				<tr>
					<td align="left">legend</td>
					<td><el-input class="custom-field" type="text" placeholder="可自定义"></el-input></td>
					<td><i class="el-icon-success isActive"></i></td>
				</tr>
				<tr>
					<td align="left">xAxis</td>
					<td><el-input class="custom-field" type="text" placeholder="可自定义"></el-input></td>
					<td><i class="el-icon-success isActive"></i></td>
				</tr>
				<tr>
					<td align="left">series</td>
					<td><el-input class="custom-field" type="text" placeholder="可自定义"></el-input></td>
					<td><i class="el-icon-success isActive"></i></td>
				</tr>
			</table>
			
			<el-form-item label="数据源类型">
				<el-select v-model="dataSource.type">
					<el-option label="静态数据" :value="0"></el-option>
					<el-option label="接口数据" :value="1"></el-option>
				</el-select>
			</el-form-item>
			
			<!-- 接口数据 -->
			<div v-show="dataSource.type == 1" class="data-wrap">
				<el-form-item label="接口地址">
					<el-input type="text" v-model="dataSource.srcUrl"></el-input>
				</el-form-item>
				<el-form-item label="请求方式">
					<el-select v-model="dataSource.method">
						<el-option label="POST" value="post"></el-option>
						<el-option label="GET" value="get"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="自动更新请求">
					<el-switch v-model="dataSource.autoUpdate" active-text="启用" inactive-text="禁用"></el-switch>
				</el-form-item>
				<el-form-item v-show="dataSource.autoUpdate" label="请求间隔(s)">
					<el-input type="number" v-model="dataSource.interval"></el-input>
				</el-form-item>
			</div>
			
			<!-- 静态数据 -->
			<div v-show="dataSource.type == 0" class="data-wrap">
				<el-input class="temp-data" type="textarea" :rows="20" v-model="tempData"></el-input>
				<!-- 按钮 -->
				<span class="custom-button" @click="jsonFormatter()"> 数据美化 </span>
			</div>
			
			<!-- 按钮 -->
			<span class="custom-button" @click="updateData()"> 刷新 & 应用 </span>
		</el-form>
	</div>
</template>

<script>
	import VueEvent from '@/assets/design/js/vue-event.js';
	import $tools from '@/assets/design/js/tools.js';
	export default {
		data() {
			return {
				// 数据源
				dataSource: {
					// 0 表示静态数据; 1 表示接口数据
					type: 0, 
					method: 'post',
					srcUrl: '',
					autoUpdate: false,
					interval: 30,
					data: ''
				},
				isGeneral: false,
				// 临时数据存储
				tempData: '',
				// 图表类型
				chartType: '',
				// echarts 属性对象
				elemEcOpts: {},
				// 激活元素的ID
				elemID: ''
			}
		},
		created() {
			// 请求接口数据
			this.requestData();
		},
		mounted() {
			VueEvent.$on('$webppt-data', webppt => {
				let active = $tools.afxGetActiveElem.call(this, webppt);
				this.isGeneral = active.elemCpntType === 'general';
				if(!active || this.isGeneral) return;
				
				this.elemID = active.elemID;
				this.elemEcOpts = active.elemEcOpts;
				this.dataSource = active.elemDataSrc;
				let ecData = $.echartsData[this.elemID];
				this.dataSource.data = ecData;
				this.chartType = active.slide.context[this.elemID].chartType;
				this.tempData = JSON.stringify(ecData, null, '	');
			});
		},
		methods: {
			// 刷新数据
			updateData() {
				// 获取 echarts 工具类
				let $et = $tools.echartsTools();
				// 当前静态数据对象
				let staticData = JSON.parse(this.tempData);
				// 手动更新echarts数据仓库
				$.echartsData[this.elemID] = staticData;
				// 获取当前图表对象
				let echart = $.ecInitObjs[this.elemID];
				// 数据处理方法
				const fn = d => {
					$.echartsData[this.elemID] = d;
					// 属性与数据绑定
					let $opts = $et.dataFilling(this.chartType, this.elemEcOpts, d);
					// 缓存当前 echarts 的属性对象
					this.elemEcOpts = $opts;
					// 图表渲染
					$et.render(echart, $opts);
				}
				// 接口数据刷新 & 静态数据刷新
				this.dataSource.type ? this.requestData($data => fn($data)) : fn(staticData)
			},
			// 接口数据请求方法
			async requestData(callback) {
				const res = null,
					srcUrl = this.dataSource.srcUrl,
					method = this.dataSource.method || 'post',
					type   = this.dataSource.type;
				if(type && srcUrl) {
					const { data } = await this.$http[method](srcUrl);
					const $data = data.dataInfo.data;
					this.dataSource.data = $data;
					this.tempData = JSON.stringify($data, null, '	');
					callback && callback($data);
				}
			},
			// json 美化
			jsonFormatter() {
				this.tempData = JSON.stringify(JSON.parse(this.tempData), null, '	');
			}
		},
		
	}
</script>

<style lang="scss">
	.field-config {
		font-size: 14px;
		color: #ccc;
		margin-bottom: 20px;
		.custom-field {
			width: 80%;
		}
		tr {
			line-height: 1.8;
		}
	}
	.isActive {
		color: #00bef7;
	}
	.temp-data {
		margin: 20px 0 20px 0;
	}
	/* 自定义按钮 */
	.custom-button {
	    display: inline-block;
	    width: 80%;
	    cursor: pointer;
	    margin: 10px auto;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    font-size: 14px;
	    color: #00adff;
	    border: 1px #00adff solid;
	}
	
</style>
