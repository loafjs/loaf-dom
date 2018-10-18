import L from '../loaf-dom';
let container;

describe('Loaf-DOM Library Test', function() {

  beforeEach(function() {
    if(container) return container.innerHTML = '';
    const containerArea = document.createElement("div");
    const dom = document.getElementsByTagName('body')[0];

    containerArea.innerHTML = '<div id="container"></div>';
    dom.appendChild(containerArea);
    container = document.getElementById('container');
  });

  it('selector', function() {
    container.innerHTML = `
      <article>article</article>
      <div id="id">id</div>
      <div class="class">class</div>
    `;

    expect(L('article').element[0].innerText).toEqual('article');
    expect(L('#id').element[0].innerText).toEqual('id');
    expect(L('.class').element[0].innerText).toEqual('class');
  });

  it('eq Selector', function() {
    container.innerHTML = `
      <p>First</p>
      <p>Second</p>
      <p>Third</p>
    `;

    expect(L('p').eq(1).element[0].innerText).toEqual('Second');
  });

  it('addClass', function() {
    container.innerHTML = `
      <div id="add-class">add-class</p>
    `;

    L('#add-class').addClass('add-class');
    expect(document.getElementById('add-class').className).toEqual('add-class');
  });

  it('removeClass', function() {
    container.innerHTML = `
      <div class="remove-class-choice remove-class">remove-class1</p>
      <div class="remove-class-choice remove-class">remove-class2</p>
    `;

    L('.remove-class-choice').removeClass('remove-class');
    expect(document.getElementsByClassName('remove-class-choice')[0].className).toEqual('remove-class-choice');
    expect(document.getElementsByClassName('remove-class-choice')[1].className).toEqual('remove-class-choice');
  });

  it('get/set attr', function() {
    container.innerHTML = `
      <div id="attr">attr</p>
    `;

    L('#attr').attr('key', 'value');
    const valueBykey = L('#attr').attr('key');
    expect(valueBykey).toEqual('value');
  });

  it('get/set style', function() {
    container.innerHTML = `
      <div id="style">style</p>
    `;

    L('#style').style('background', 'red');
    const bgColorByStyle = L('#style').style('background');
    expect(bgColorByStyle).toEqual('red');
  });


  it('nert', function() {
    container.innerHTML = `
      <p>First</p>
      <p>Second</p>
      <p>Third</p>
    `;

    expect(L('p').eq(0).next().element[0].innerText).toEqual('Second');
  });

  it('prev', function() {
    container.innerHTML = `
      <p>First</p>
      <p>Second</p>
      <p>Third</p>
    `;

    expect(L('p').eq(2).prev().element[0].innerText).toEqual('Second');
  });

  it('parent', function() {
    container.innerHTML = `
      <div id="parent">
        <p>First</p>
        <p>Second</p>
        <p>Third</p>
      </div>
    `;

    expect(L('p').parent().element[0].id).toEqual('parent');
  });

  it('children', function() {
    container.innerHTML = `
      <div id="parent">
        <p>children1</p>
        <p>children2</p>
        <p id="choice-children">choice-children</p>
      </div>
    `;

    expect(L('#parent').children().eq(1).element[0].innerText).toEqual('children2');
    expect(L('#parent').children('#choice-children').element[0].innerText).toEqual('choice-children');
  });

  it('parents', function() {
    container.innerHTML = `
      <div id="target-parent" class="target">
        <div id="parent">
          <p id="children">children1</p>
          <p>children2</p>
        </div>
      </div>
    `;

    expect(L('#children').parents('#target-parent').element[0].className).toEqual('target');
  });

  it('animation', function() {
    container.innerHTML = `
      <div>
        <div id="animation" style="position: absolute; width: 100px; height: 100px; left: 0; top: 0;"></div>
      </div>
    `;

    expect(L('#animation').style('left')).toEqual('0px');

    L('#animation').animate({left: 500}, 1000, () => {
      expect(L('#animation').style('left')).toEqual('500px');
    });
  });

  it('click + html', function() {
    container.innerHTML = `
      <p id="click"></p>
    `;

    L('#click').click(function() {
      L('#click').html('<span>test</span');
    });
    L('#click').click();

    expect(L('#click').html()).toEqual('<span>test</span>');
  });

  it('trigger + text', function() {
    container.innerHTML = `
      <p id="click"></p>
    `;

    let test = '';
    L('#click').click(function() {
      L('#click').text('test');
    });
    L('#click').trigger('click');

    expect(L('#click').text()).toEqual('test');
  });

  it('trigger + text', function() {
    container.innerHTML = `
      <p id="click"></p>
    `;

    let test = '';
    L('#click').click(function() {
      L('#click').text('test');
    });
    L('#click').trigger('click');

    expect(L('#click').text()).toEqual('test');
  });

  it('width + height', function() {
    container.innerHTML = `
      <p id="width-height" style="width: 50px; height: 20px;"></p>
    `;

    expect(L('#width-height').width()).toEqual(50);
    expect(L('#width-height').height()).toEqual(20);
  });

  it('width + height', function() {
    container.innerHTML = `
      <p id="width-height" style="width: 50px; height: 20px;"></p>
    `;

    expect(L('#width-height').width()).toEqual(50);
    expect(L('#width-height').height()).toEqual(20);
  });

  it('offset', function() {
    container.innerHTML = `
      <p id="position" style="position: fixed; top: 30px; left: 50px; margin: 0;"></p>
    `;

    expect(L('#position').offset().top).toEqual(30);
    expect(L('#position').offset().left).toEqual(50);
  });

  it('scrollTop', function() {
    container.innerHTML = `
      <div id="parent" style="height: 100px; overflow: scroll; position: relative;">
        <p id="position" style="height: 200px;"></p>
      </div>
    `;

    L('#parent').el().scrollTop = 100;
    expect(L('#parent').scrollTop()).toEqual(100);
  });

});