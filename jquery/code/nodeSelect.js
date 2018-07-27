// 元素选择模块

const idSelect = (id) => {
	return document.querySelectorAll(id)[0];
};

const classSelect = (cla) => {
    return document.querySelectorAll(cla);
}
export default nodeSelect = (selector) => {
	if (selector.charAt(0) === '#') {
		idSelect(selector.replace(/^#/, ''));
    }
    
    if(selector.charAt(0) === '.') {
        classSelect(selector.replace(/^./, ''));
    }
};
