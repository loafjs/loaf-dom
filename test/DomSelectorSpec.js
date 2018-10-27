import L from '../loaf-dom';
import Mock from './sampleHTML';

const newElement = document.createElement("div");
			newElement.innerHTML = Mock;

document.getElementsByTagName('body')[0].appendChild(newElement);

describe('Test DOM elements with selectors', () => {

  it('ID Selector', () => {
  	const loafSelector = L('#id-selector').el();
  	const domSelector = document.getElementById('id-selector');

  	expect(loafSelector).toEqual(domSelector);
  });

  it('Class Selector', () => {
  	const loafSelectorLangth = L('.container').length();
  	const domSelectorLangth = document.getElementsByClassName('container').length;

  	expect(loafSelectorLangth).toEqual(domSelectorLangth);
  });

  it('TagName Selector', () => {
  	const loafSelectorLangth = L('span').length();
  	const domSelectorLangth = document.getElementsByTagName('span').length;

  	expect(loafSelectorLangth).toEqual(domSelectorLangth);
  });

  it('CSS Selector', () => {
  	const loafSelector = L('section > .container figure').el();
  	const domSelector = document.querySelector('section > .container figure');

  	expect(loafSelector).toEqual(domSelector);
  });

});