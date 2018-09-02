class LoafDom {
	constructor(element) {
		this.element = '';
		if(typeof element === 'string') {
			if(element[0] === '#') {
				this.element = document.getElementById(element.substring(1));
			}
			if(element[0] === '.') {
				this.element = document.getElementsByClassName(element.substring(1));
			}
		}
	}

	roof(array, fnc) {
		const len = array.length;
		let i;
		for(i=0; i<len; i++) {
			fnc(i);
		}
	}

	eq(index) {
		this.element = this.element[index];
		return this;
	}

	addClass(className) {
		this.element.className += ' ' + className;
		return this;
	}

	removeClass(className) {
		const regClassName = new RegExp(className, 'g');
		this.roof(this.element, () => {
			this.element[0].className = this.element[0].className.replace(regClassName, '');
		});
		return this;
	}
}

export default LoafDom;