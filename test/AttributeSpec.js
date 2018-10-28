import L from '../loaf-dom';
import Mock from './sampleHTML';

const newElement = document.createElement("div");
			newElement.innerHTML = Mock;

describe('Test DOM elements with selectors', () => {

	document.getElementsByTagName('body')[0].appendChild(newElement);

  it('addClass(), removeClass()', () => {
    const className = 'add-class';

  	L('#wrap').addClass(className);
  	const domAddClassName = document.getElementById('wrap').className;

  	expect(domAddClassName).toEqual(className);

    L('#wrap').removeClass(className);
    const domRemoveClassName = document.getElementById('wrap').className;

    expect(domRemoveClassName).toEqual('');
  });

  it('get, set attr()', () => {
    const key = 'key';
    const value = 'value';
    L('#wrap').attr(key, value);

    expect(L('#wrap').attr(key)).toEqual(value);
  });

  it('get, set style()', () => {
    const key = 'background';
    const value = 'blue';
    L('#wrap').style(key, value);

    expect(L('#wrap').style(key)).toEqual(value);
  });

  it('get, set text()', () => {
    const text = 'add text';
    L('h1').text(text);

    expect(L('h1').text()).toEqual(text);
  });

  it('get, set html()', () => {
    const html = '<span>add html</span>';
    L('h1').html(html);

    expect(L('h1').html()).toEqual(html);
  });
});