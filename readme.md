# Loaf-DOM [![npm](https://img.shields.io/npm/v/loaf-dom.svg)](https://www.npmjs.com/package/loaf-dom) [![npm](https://img.shields.io/npm/dm/loaf-dom.svg)](https://www.npmjs.com/package/loaf-dom)
A light and fast DOM script library for front-end development.
loaf-dom is written in ES6+ syntax. but many browsers do not yet support ES6+, so you have to use [Webpack](https://webpack.js.org/), [Babel](https://github.com/babel/babel) library.

## Notice
This is unstable because it is an early version.  
There are many disadvantages. I look forward to intellectual and code review. Thank you.

## Install
```
npm install --save loaf-dom
```

## Test
```
npm test
```

## Example
You can go to the 'example' directory, install the example source, and check the run.
```
cd ./example
```
```
npm install
```
```
npm start
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
import L from 'loaf-dom';

L('#wrap').addClass('show');
L('p').style('color', 'red');
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
import L from 'loaf-dom';

console.log(L('#wrap').el().hidden);
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
import L from 'loaf-dom';

console.log(L('p').el(1).innerText);
// 'target2'
```

## Use velocity.js library
Use the Velocity.js library for high-performance animation.  
```js
import L from 'loaf-dom';

L('#animation').animate({left: 500}, 2000);
```
#### Reference
* [Velocity.js](http://velocityjs.org)

## All methods
#### .el()
Returns the Select the dom element
```
// ex.
import L from 'loaf-dom';

L('#wrap').el(); 
// == document.getElementById('wrap');
```
#### .length()
Returns the number of currently selected elements

#### .eq()
Select the element of the selector in that sequence.

#### .addClass()
Add a class to the selected element.

#### .removeClass()
Clears the corresponding class of selector

#### .attr()
Invoke or set the property value
```
// ex.
import L from 'loaf-dom';

// set
L('#wrap').attr('set-attr', 'attr-value');
// invoke
console.log(L('#wrap').attr('set-attr'));
// 'attr-value'
```

#### .style()
Gives or reads style attributes to the element.

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

#### .animate()
It gives dynamic change.

#### .stop()
Stops all animation effects on the selected element.

#### .event()
Add a event.
```
// ex.
import L from 'loaf-dom';

L('#wrap').event('click', () => console.log('click'));
// == document.getElementById('wrap').addEventListener('click', () => console.log('click'));
```
#### .scroll()
Add a scroll event.
```
// ex.
import L from 'loaf-dom';

L('#wrap').scroll(() => console.log('scroll'));
// == document.getElementById('wrap').addEventListener('scroll', () => console.log('scroll'));
```

#### .click()
Add a click event.

#### .trigger()
Event trigger.

#### .offset()
Returns the offset value.
```
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
```
// ex.
import L from 'loaf-dom';

L('#wrap').html('<p>insert html</p>');
// == document.getElementById('wrap').innerHTML = '<p>insert html</p>';
```

#### .text()
The text of the html element is imported or injected into the element.

## License
[MIT](https://github.com/loafjs/loaf-dom/blob/master/LICENSE)