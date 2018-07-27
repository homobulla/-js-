// 模块化jq ,暂时不考虑IE兼容以及node环境的兼容等问题，使用ES6来实现模块封装
const idSelect = (id) => {
	return document.querySelectorAll(id)[0];
};
const nodeSelect = (selector) => {
	if (selector.charAt(0) === '#') {
		idSelect(selector.replace(/^#/, ''));
	}
};

// import nodeSelect from "./nodeSelect";
export default $ = (selector) => {
	if (typeof selector !== 'string' || !selector) return this;
	selector = selector.trim();
	return nodeSelect(selector);
};
