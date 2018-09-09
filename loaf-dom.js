class LoafDom {

	constructor(element) {
		this.version = '0.0.6';
		this._select(element);
	}

	_select(element) {
		if(typeof element === 'string') {
			switch(element[0]) {
				case '#' :
					this.element = document.getElementById(element.substring(1));
					break;
				case '.' :
					this.element = document.getElementsByClassName(element.substring(1));
					break;
				default :
					this.element = document.getElementsByTagName(element);
			}
		}
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
		const El = this._oneSelect();
		El.className = this._compactSplit(El.className, ' ').concat(...className).join(' ');
		return this;
	}

	removeClass(className) {
		const arrayClassName = this._compactSplit(className, ' ');
		let baseElementLen = this.element.length;
		let leftIdx = 0;
		this._roof(this.element, (i) => {
			const newLen = this.element.length;
			if(baseElementLen > newLen) {
				leftIdx += 1;
				i -= leftIdx;
				baseElementLen = newLen;
			}

			const El = this.element[i];
			El.className = this._compactSplit(El.className, ' ').filter((str) => arrayClassName.indexOf(str) === -1).join(' ');
		});
		return this;
	}

}

export default (element) => {
	return new LoafDom(element);
}