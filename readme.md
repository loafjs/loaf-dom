# Loaf-DOM [![npm](https://img.shields.io/npm/v/loaf-dom.svg)](https://www.npmjs.com/package/loaf-dom) [![npm](https://img.shields.io/npm/dm/loaf-dom.svg)](https://www.npmjs.com/package/loaf-dom)
Light and fast DOM script library for front end development.

## Install
```
npm install --save loaf-dom
```

## Test
```
npm test
```

## Introduction
```html
<body>
  <div id="wrap">
    <p>Hello world!</p>
  </div>
</body>
```

```js
import $ from 'loaf-dom';

$('#wrap').addClass('show');
$('p').style('color', 'red');
```

if you run the above method after all of dom is loaded, you can see the following results.

```html
<body>
  <div id="wrap" class="show">
    <p style="color: red;">Hello world!</p>
  </div>
</body>
```

## Using the default dom property
you can use the el() method to select the element to use the default properties.
```js
import $ from 'loaf-dom';

console.log($('#wrap').el().hidden);
// false
```

if more than one selector is selected, the first is the default and you can select the element as a parameter.
```html
<body>
  <div class="target">
    <p>target1</p>
    <p>target2</p>
  </div>
</body>
```

```js
import $ from 'loaf-dom';

console.log($('p').el(1).innerText);
// 'target2'
```

## All methods
#### .el()
Returns the Select the dom element
```js
// ex.
import $ from 'loaf-dom';

$('#wrap').el();
// == document.getElementById('wrap');
```
#### .length()
Returns the number of currently selected elements

#### .eq()
Select the element of the selector in that sequence.

#### .addClass()
Add a class to the selected element.
```js
//ex.
import L from 'loaf-dom';

L('#wrap').addClass('class1', 'class2');
// L('#wrap').el().className = 'class1 class2';
```

#### .removeClass()
Clears the corresponding class of selector
```js
//ex.
import $ from 'loaf-dom';

$('#wrap').removeClass('class1', 'class2');
// L('#wrap').el().className = '';
```

#### .hasClass()
Whether the selected element has a received class name

#### .attr()
Invoke or set the property value
```js
// ex.
import $ from 'loaf-dom';

// set
$('#wrap').attr('set-attr', 'attr-value');
// invoke
console.log(L('#wrap').attr('set-attr'));
// 'attr-value'
```

#### .style()
Gives or reads style attributes to the element.

#### .styles()
Gives various style attributes input as an object to the element.
```js
// ex.
import $ from 'loaf-dom';

$('#wrap').styles({ background: 'red', color: 'blue' });
```

#### .next()
Selects the next element of the selected element.

#### .prev()
Selects the prev element of the selected element.

#### .parent()
Select the parent of the selected element.

#### .children()
Select any of the child elements.

#### .parents()
Selecting an input element among the parent elements

#### .event()
Add a event.
```js
// ex.
import $ from 'loaf-dom';

$('#wrap').event('click', () => console.log('click'));
// == document.getElementById('wrap').addEventListener('click', () => console.log('click'));
```
#### .scroll()
Add a scroll event.
```js
// ex.
import $ from 'loaf-dom';

$'#wrap').scroll(() => console.log('scroll'));
// == document.getElementById('wrap').addEventListener('scroll', () => console.log('scroll'));
```

#### .click()
Add a click event.

#### .trigger()
Event trigger.

#### .offset()
Returns the offset value.
```js
// {top: 0, right: 0, bottom: 0, left: 0}
```

#### .width()
Returns or injects the width value of the element.

#### .height()
Returns or injects the height value of the element.

#### .scrollTop()
Responds to or injects the value of the element's top scroll position.

#### .scrollLeft()
Responds to or injects the value of the element's left scroll position.

#### .scrollHeight()
Returns the height value of the scroll.

#### .scrollWidth()
Returns the width value of the scroll.

#### .html()
The html element is imported or injected into the element.
```js
// ex.
import $ from 'loaf-dom';

$('#wrap').html('<p>insert html</p>');
// == document.getElementById('wrap').innerHTML = '<p>insert html</p>';
```

#### .text()
The text of the html element is imported or injected into the element.

#### .removeAllChild()
Remove all child elements.

#### .animate()
```js
// ex.
import $ from 'loaf-dom';

$('#wrap').animate({ 'marginTop': 50 }, 3000, 'easeOutCubic');
```

#### .forEach()
```js
// ex.
import $ from 'loaf-dom';

$('.box').forEach(target => {
  console.log(target.width());
});
```

## License
[MIT](https://github.com/loafjs/loaf-dom/blob/master/LICENSE)