import L from '../loaf-dom';
import Mock from './sampleHTML';

const newElement = document.createElement("div");
			newElement.innerHTML = Mock;

describe('Test DOM elements with selectors', () => {

	document.getElementsByTagName('body')[0].appendChild(newElement);

  it('offset()', () => {
    const target = document.getElementById('wrap');
    const offsetTop = target.offsetTop;
    const offsetLeft = target.offsetLeft;
    const offsetBottom = target.offsetBottom;
    const offsetRight = target.offsetRight;

    expect(L('#wrap').offset().top).toEqual(offsetTop);
    expect(L('#wrap').offset().left).toEqual(offsetLeft);
    expect(L('#wrap').offset().bottom).toEqual(offsetBottom);
    expect(L('#wrap').offset().right).toEqual(offsetRight);
  });

  it('width()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').width()).toEqual(target.clientWidth);
  });

  it('height()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').height()).toEqual(target.clientHeight);
  });

  it('scrollTop()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollTop()).toEqual(target.scrollTop);
  });

  it('scrollHeight()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollHeight()).toEqual(target.scrollHeight);
  });

  it('scrollWidth()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollWidth()).toEqual(target.scrollWidth);
  });

  it('scrollWidth()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollWidth()).toEqual(target.scrollWidth);
  });

});