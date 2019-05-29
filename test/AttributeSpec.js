import L from '../loaf-dom';
import Mock from './sampleHTML';

const newElement = document.createElement("div");
			newElement.innerHTML = Mock;

describe('Test DOM elements with selectors', () => {

	document.getElementsByTagName('body')[0].appendChild(newElement);

  it('addClass(), removeClass()', () => {
    const className = 'add-class';
    const className2 = 'add-class2';

  	L('#wrap').addClass(className, className2);
  	const domAddClassName = document.getElementById('wrap').className;

  	expect(domAddClassName).toEqual(className + ' ' + className2);

    L('#wrap').removeClass(className, className2);
    const domRemoveClassName = document.getElementById('wrap').className;

    expect(domRemoveClassName).toEqual('');
  });

  it('hasClass()', () => {
    const className = 'add-class';
    document.getElementById('wrap').className += 'add-class';
    expect(L('#wrap').hasClass(className)).toEqual(true);
  });

  it('get, set attr()', () => {
    const key = 'key';
    const value = 'value';
    L('#wrap').attr(key, value);

    expect(L('#wrap').attr(key)).toEqual(value);
  });

  it('get, set attr() - function value', () => {
    const key = 'key';
    const value = 'value';
    L('#wrap').attr(key, () => value);

    expect(L('#wrap').attr(key)).toEqual(value);
  });

  it('get, set style()', () => {
    const key = 'background';
    const value = 'blue';
    L('#wrap').style(key, value);

    expect(L('#wrap').style(key)).toEqual(value);
  });

  it('get, set style() - function value', () => {
    const key = 'background';
    const value = 'blue';
    L('#wrap').style(key, () => value);

    expect(L('#wrap').style(key)).toEqual(value);
  });

  it('get, set text()', () => {
    const text = 'add text';
    L('h1').text(text);

    expect(L('h1').text()).toEqual(text);
  });

  it('get, set text() - function value', () => {
    const text = 'add text';
    L('h1').text(() => text);

    expect(L('h1').text()).toEqual(text);
  });

  it('get, set html()', () => {
    const html = '<span>add html</span>';
    L('h1').html(html);

    expect(L('h1').html()).toEqual(html);
  });

  it('get, set html() - function value', () => {
    const html = '<span>add html</span>';
    L('h1').html(() => html);

    expect(L('h1').html()).toEqual(html);
  });
});