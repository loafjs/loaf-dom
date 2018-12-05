# Loaf-DOM [![npm](https://img.shields.io/npm/v/loaf-dom.svg)](https://www.npmjs.com/package/loaf-dom) [![npm](https://img.shields.io/npm/dm/loaf-dom.svg)](https://www.npmjs.com/package/loaf-dom)
A light and fast DOM script library for front-end development.
loaf-dom is written in ES6+ syntax. but many browsers do not yet support ES6+, so you have to use [Webpack](https://webpack.js.org/), [Babel](https://github.com/babel/babel) library.

## Notice
This is unstable because it is an early version.

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

## Use easing value in animation
i use jQuery Easing as a plugin, and I can use some easing values. (default: easeOutSine)
(However, the animate function is still lacking.)
```
easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine, easeInExpo, easeOutExpo, easeInOutExpo, easeInCirc, easeOutCirc, easeInOutCirc
```

```js
import L from 'loaf-dom';

L('#animation').animate({left: 500}, 2000, 'easeInCubic', () => console.log('callback'));
```

#### Reference
* [jQuery Easing Plugin](http://gsgd.co.uk/sandbox/jquery/easing/)
* [Easing functions](https://easings.net/en)

## License
[MIT](https://github.com/loafjs/loaf-dom/blob/master/LICENSE)