<template>
	<div id="e-base-bar">
		<IEcharts :option="option" :loading="loading" :resizable="true" @ready="onReady" @click="onClick" />
	</div>
</template>

<script>
	import _cf from './common/config-items.js';
	
	export default {
		name: 'e-base-bar',
		props: {
			eleId: {
				type: String
			}
		},
		data() {
			return {
				loading: true,
				option: {
					title: _cf.title(),
					tooltip: _cf.tooltip(),
					legend: _cf.legend(),
					grid: _cf.grid(),
					xAxis: _cf.xAxis(),
					yAxis: _cf.yAxisSingle(),
					series: [
						{
							type: 'bar',
							stack: '',
							yAxisIndex: 0,
							barMinWidth: 20,
							barMaxWidth: 50,
							barGap: '30%',
							data: [59, 20, 36, 10, 10, 20]
						}
					]
				}
			}
		},
		created() {
			// 发送属性对象
			this.$emit('options', this.eleId, this.option);
		},
		methods: {
			onReady(instance, ECharts) {
				this.loading = false;
			},
			onClick(event, instance, ECharts) {
				//console.log(arguments);
			}
		}
	}
</script>

<style scoped>
	#e-base-bar {
		width: 100%;
		height: 100%;
	}
</style>
