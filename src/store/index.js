import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 计数器
		counter: 0,
		// 项目信息
		project: {
			projectId: 0,
			projectName: 'My First DataV',
			// 屏幕分辨率
			resolution: [1920, 1080],
			// 网址
			projectUrl: ''

		},
		// 幻灯片列表。为方便查找，这里是用 Object 而非 Array。
		slideItems: {
			"i-slide-1610611457503": {
				"slideId": "i-slide-1610611457503",
				"slideName": "幻灯片",
				"bgClr": "rgba(255, 255, 255, 0.2)",
				"bgImage": "",
				"bgSize": "100% 100%",
				"effects": {
					enter: '',
					exits: ''
				},
				"elements": {
					'i-elem-1610611458910': {
						eleId: 'i-elem-1610611458910',
						eleName: '基本柱状图',
						component: 'eBaseBar',
						option: {},
						"effects": {
							enter: '',
							exits: '',
							hover: ''
						},
						attribute: {
							width: 300,
							height: 200,
							left: 810,
							top: 440,
							zIndex: 1,
							bgClr: '#ff0',
							bgImage: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2665243646,354451675&fm=26&gp=0.jpg',
							bgSize: '100% 100%'
						}
						
					}
				}
			}
		},
		// 当前状态对象
		active: {
			// 项目ID
			projectId: 0,
			// 幻灯片ID
			slideId: 0,
			// 组件ID
			eleId: 0,
			// 是否元素被选中
			isElemChecked: false
		}
	},
	getters: {
		// 获取当前状态
		_active(state, getters) {
			return state.active;
		},
		// 获取项目信息
		_project(state, getters) {
			return state.project;
		},
		// 获取幻灯片列表
		_slideList(state, getters) {
			return state.slideItems;
		},
		// 获取当前幻灯片对象
		_slide(state, getters) {
			const currentSlideId = state.active.slideId;
			return state.slideItems[currentSlideId];
		},
		// 获取当前组件对象
		_element(state, getters) {
			const currentEleId = state.active.eleId;
			return getters._slide.elements[currentEleId];
		}
	},
	mutations: {
		// 提交当前状态
		_active(state, opts) {
			state.active.isElemChecked = !!opts.eleId;
			Object.assign(state.active, opts);
			state.counter ++;
		},
		// 提交项目信息
		_project(state, opts) {
			Object.assign(state.project, opts);
			state.counter ++;
		},
		// 添加幻灯片对象
		_addSlide(state, opts) {
			const slideId = opts.slideId;
			state.active.slideId = slideId;
			state.slideItems[slideId] = opts;
			state.counter ++;
		},
		// 更新当前幻灯片对象
		_updateSlide(state, opts) {
			const currentSlideId = state.active.slideId;
			Object.assign(state.slideItems[currentSlideId], opts);
			state.counter ++;
		},
		// 添加组件元素到当前幻灯片
		_addElement(state, opts) {
			const currentSlideId = state.active.slideId;
			const eleId = opts.eleId;
			state.slideItems[currentSlideId].elements[eleId] = opts;
			state.counter ++;
		},
		// 更新当前组件对象
		_updateElement(state, opts) {
			const currentSlideId = state.active.slideId;
			const currentEleId = state.active.eleId;
			Object.assign(state.slideItems[currentSlideId].elements[currentEleId], opts);
			state.counter ++;
  		},
		// 更新组件的内容属性数据，比如 echarts 组件的 option
		_updateElementOption(state, { eleId, opts }) {
			const currentSlideId = state.active.slideId;
			const ele = state.slideItems[currentSlideId].elements[eleId];
			Object.assign(ele.option, opts);
		},
		// 更新组件位置数据
		_resizeElement(state, opts) {
			const currentSlideId = state.active.slideId;
			const currentEleId = state.active.eleId;
			const ele = state.slideItems[currentSlideId].elements[currentEleId];
			Object.assign(ele.attribute, opts);
		}
	},
	actions: {},
	modules: {}
});
