/* ECharts 配置项 */
const _assign = Object.assign;

export default {
	// 文本
	afxTextStyle() {
		return {
			color: '#fff',
			fontFamily: '微软雅黑',
			fontSize: 12,
			fontWeight: 'normal'
		};
	},
	// 坐标轴
	afxAxis() {
		return {
			name: '',
			axisLabel: _assign({}, {
				interval: 'auto',
				rotate: 0
			}, this.afxTextStyle())
		};
	},
	// 位置
	afxPosition(t, l, r, b) {
		return {
			top: t || 'auto',
			left: l || 'auto',
			right: r || 'auto',
			bottom: b || 'auto'
		};
	},
	// 标题
	title() {
		return _assign({}, {
			text: 'title',
			subtext: 'subtitle',
			subtextStyle: this.afxTextStyle(),
			textStyle: this.afxTextStyle()
		}, this.afxPosition(0, 'center'));
	},
	// 图例
	legend() {
		return _assign({}, {
			orient: 'vertical',
			type: 'scroll',
			textStyle: this.afxTextStyle()
		}, this.afxPosition());
	},
	// 绘图网格
	grid() {
		return _assign({}, {
			containLabel: false
		}, this.afxPosition('10%', '10%', '10%', '10%'));
	},
	// X轴
	xAxis() {
		return _assign({}, {
			type: 'category'
		}, this.afxAxis());
	},
	// Y轴 - 单轴
	yAxisSingle() {
		return [
			_assign({}, {
				type: 'value'
			}, this.afxAxis())
		];
	},
	// Y轴 - 双轴
	yAxisDouble() {
		return [
			_assign({}, {
				type: 'value',
				position: 'left'
			}, this.afxAxis()),
			_assign({}, {
				type: 'value',
				position: 'right'
			}, this.afxAxis())
		];
	},
	// 缩放工具
	dataZoom() {
		return [
			{
				type: 'inside',
				start: 0,
				end: 100,
			},
			{
				type: 'slider',
				show: true,
				height: 20,
				start: 0,
				end: 100,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '70%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}
		];
	},
	// 内置工具
	toolbox() {
		return {
			show: true,
			feature: {
				dataZoom: { show: false },
				dataView: { show: false },
				magicType: { show: false, type: [], },
				restore: { show: false },
				saveAsImage: { show: true }
			}
		};
	},
	// 提示框
	tooltip() {
		return {
			show: true,
			trigger: 'axis',
			axisPointer : {
				type : 'shadow'
			},
			formatter: ''
		};
	}
};