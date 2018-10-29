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

  it('set width()', () => {
    const target = document.getElementById('wrap');
    const width = '100px';
    L('#wrap').width(width);

    expect(L('#wrap').width()).toEqual(target.clientWidth);
  });

  it('set width() - function value', () => {
    const target = document.getElementById('wrap');
    const width = '200px';
    L('#wrap').width(() => width);

    expect(L('#wrap').width()).toEqual(target.clientWidth);
  });

  it('height()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').height()).toEqual(target.clientHeight);
  });

  it('set height()', () => {
    const target = document.getElementById('wrap');
    const height = '100px';
    L('#wrap').width(height);

    expect(L('#wrap').height()).toEqual(target.clientHeight);
  });

  it('set height() - function value', () => {
    const target = document.getElementById('wrap');
    const height = '200px';
    L('#wrap').width(() => height);

    expect(L('#wrap').height()).toEqual(target.clientHeight);
  });

  it('scrollTop()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollTop()).toEqual(target.scrollTop);
  });

  it('set scrollTop()', () => {
    const scrollMoveValue = 100;
    L('main').style('height', '5000px');
    L('#wrap').style('position', 'absolute').style('height', '100%').style('overflow', 'scroll');
    L('#wrap').scrollTop(scrollMoveValue);

    expect(L('#wrap').scrollTop()).toEqual(scrollMoveValue);
  });

  it('set scrollTop() - function value', () => {
    const scrollMoveValue = 100;
    L('main').style('height', '5000px');
    L('#wrap').style('position', 'absolute').style('height', '100%').style('overflow', 'scroll');
    L('#wrap').scrollTop(() => scrollMoveValue);

    expect(L('#wrap').scrollTop()).toEqual(scrollMoveValue);
  });

  it('scrollLeft()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollLeft()).toEqual(target.scrollLeft);
  });

  it('set scrollLeft()', () => {
    const scrollMoveValue = 100;
    L('main').style('width', '5000px');
    L('#wrap').style('position', 'absolute').style('width', '100%').style('overflow', 'scroll');
    L('#wrap').scrollLeft(scrollMoveValue);

    expect(L('#wrap').scrollLeft()).toEqual(scrollMoveValue);
  });

  it('set scrollLeft() - function value', () => {
    const scrollMoveValue = 100;
    L('main').style('width', '5000px');
    L('#wrap').style('position', 'absolute').style('width', '100%').style('overflow', 'scroll');
    L('#wrap').scrollLeft(() => scrollMoveValue);

    expect(L('#wrap').scrollLeft()).toEqual(scrollMoveValue);
  });

  it('scrollWidth()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollWidth()).toEqual(target.scrollWidth);
  });

  it('scrollHeight()', () => {
    const target = document.getElementById('wrap');

    expect(L('#wrap').scrollHeight()).toEqual(target.scrollHeight);
  });

});