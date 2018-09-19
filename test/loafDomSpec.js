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

});