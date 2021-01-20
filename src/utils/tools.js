/**
 * 这里可以定义一些工具方法
 * */

// 幻灯片
class _Slide {
	constructor(opts = {}) {
		this.slideId = 'i-slide-' + Date.now();
		this.slideName = opts.slideName || '幻灯片';
		this.bgClr = opts.bgClr || 'rgba(255, 255, 255, 0.2)';
		this.bgImage = opts.bgImage || '';
		this.bgSize = opts.bgSize || '100% 100%';
		this.effects = {
			enter: opts.effectIn || '',
			exits: opts.effectOut || ''
		};
		// 幻灯片内的元素集合
		this.elements = {};
	}
};

// 元素
// https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2665243646,354451675&fm=26&gp=0.jpg
class _Element {
	constructor(opts = {}) {
		this.eleId = 'i-elem-' + Date.now();
		this.eleName = opts.eleName;
		this.component = opts.component;
		this.option = opts.option || {};
		this.attribute = {
			width: opts.width || 200,
			height: opts.height || 200,
			left: opts.left || 0,
			top: opts.top || 0,
			zIndex: opts.zIndex || 0,
			bgClr: opts.bgClr || 'rgba(0, 0, 0, 0)',
			bgImage: opts.bgImage || '',
			bgSize: opts.bgSize || '100% 100%'
		},
		this.effects = {
			enter: opts.effectIn || '',
			exits: opts.effectOut || '',
			hover: opts.effectHover || ''
		};
	}
}

export const iTools = {
	_Slide,
	_Element
};
