import L from '../src';
import Mock from './sampleHTML';

const newElement = document.createElement("div");
			newElement.innerHTML = Mock;

describe('Test DOM elements with selectors', () => {

	document.getElementsByTagName('body')[0].appendChild(newElement);

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

  it('eq Selector', () => {
  	const loafSelector = L('span').eq(2).el();
  	const domSelector = document.querySelectorAll('span')[2];

  	expect(loafSelector).toEqual(domSelector);
  });

  it('next Selector', () => {
  	const loafSelector = L('main').next().el();
  	const domSelector = document.getElementsByTagName('main')[0].nextElementSibling;

  	expect(loafSelector).toEqual(domSelector);
  });

  it('prev Selector', () => {
  	const loafSelector = L('main').prev().el();
  	const domSelector = document.getElementsByTagName('main')[0].previousElementSibling;

  	expect(loafSelector).toEqual(domSelector);
  });

  it('parent Selector', () => {
  	const loafSelector = L('main').parent().el();
  	const domSelector = document.getElementsByTagName('main')[0].parentElement;

  	expect(loafSelector).toEqual(domSelector);
  });

  it('parents Selector', () => {
  	const loafSelector = L('a').parents('body').el();
  	const domSelector = document.getElementsByTagName('body')[0];

  	expect(loafSelector).toEqual(domSelector);
  });

  it('children Selector', () => {
  	const loafSelector = L('header').children().el();
  	const domSelector = document.getElementsByTagName('header')[0].children[0];

  	expect(loafSelector).toEqual(domSelector);
  });

});