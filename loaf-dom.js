// version. 0.0.9

class LoafDom {

	constructor(element) {
		this.element = [];
		this._multiSelector(element);
	}

	_multiSelector(element) {
		if(typeof element === 'string') {
			const el = element.split(',');
			el.forEach((selectName) => {
				const select = this._select(selectName.trim());
				if(select.length) {
					this._roof(select, (i) => {
						this.element = Array.prototype.concat.call(this.element, select[i]);
					});
				} else {
					this.element = Array.prototype.concat.call(this.element, select);
				}
			});
		}
	}

	_select(element) {
		switch(element[0]) {
			case '#' :
				element = document.getElementById(element.substring(1));
				break;
			case '.' :
				element = document.getElementsByClassName(element.substring(1));
				break;
			default :
				element = document.getElementsByTagName(element);
		}
		return element;
	}

	_oneSelect() {
		return this.element.length > 0 ? this.element[0] : this.element;
	}

	_roof(arr, fnc) {
		const len = arr.length;
		let i;
		for(i=0; i<len; i++) {
			fnc(i);
		}
	}

	_compactSplit(str, value) {
		return str.split(value).filter(Boolean);
	}

	eq(idx) {
		this.element = this.element[idx];
		return this;
	}

	addClass(...className) {
		const el = this._oneSelect();
		el.className = this._compactSplit(el.className, ' ').concat(...className).join(' ');
		return this;
	}

	removeClass(className) {
		const arrayClassName = this._compactSplit(className, ' ');
		this._roof(this.element, (i) => {
			const el = this.element[i];
			el.className = this._compactSplit(el.className, ' ').filter((str) => arrayClassName.indexOf(str) === -1).join(' ');
		});
		return this;
	}

	attr(key, value = false) {
		if(!value) return this._oneSelect().getAttribute(key);
		this._oneSelect().setAttribute(key, value);
		return this;
	}

	style(key, value = false) {
		if(!value) return this._oneSelect().style[key];
		this._roof(this.element, (i) => {
			this.element[i].style[key] = value;
		});
		return this;
	}

}

export default (element) => {
	return new LoafDom(element);
}