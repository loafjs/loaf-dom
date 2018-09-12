// version. in progress.. 0.0.10

class LoafDom {

	constructor(element) {
		this.element = [];
		this._multiSelector(element);
	}

	_inheritSelector(selector) {
		const el = selector.split(' ');
		const len = el.length

		if(len === 1) return this.element = this._arrayElement(this.element, el[0]);

		if(len > 1) {
			let cacheParent;
			this._roof(len-1, (i) => {
				const parent = this._arrayElement([], el[len-2-i]); // [div]
				const children = typeof cacheParent === 'undefined' ? this._arrayElement([], el[len-1-i]) : cacheParent; // [p, p, p]
				this._roof(children.length, (i) => {
					cacheParent = this._findInParents(parent, children[i]);
				});
				// ing..
				if(cacheParent) return this.element = this._arrayElement(this.element, el[len-1]);
			});
		}
	}

	_findInParents(parent, children) {
		let cacheParent = children.parentNode;
		while(cacheParent !== null) {
			if(parent.indexOf(cacheParent) !== -1) return cacheParent;
			cacheParent = cacheParent.parentNode;
		}
		return null;
	}

	_arrayElement(store, element) {
		const select = this._select(element);
		if(select.length) {
			this._roof(select.length, (i) => {
				store = Array.prototype.concat.call(store, select[i]);
			});
		} else {
			store = Array.prototype.concat.call(store, select);
		}
		return store;
	}

	_multiSelector(element) {
		if(typeof element === 'string') {
			const el = element.split(',');
			el.forEach((selectorStr) => {
				const trimSelector = selectorStr.trim();
				this._inheritSelector(trimSelector);
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

	_roof(len, fnc) {
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
		this._roof(this.element.length, (i) => {
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
		this._roof(this.element.length, (i) => {
			this.element[i].style[key] = value;
		});
		return this;
	}

}

export default (element) => {
	return new LoafDom(element);
}