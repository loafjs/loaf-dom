# Loaf-DOM ![loaf-dom version](https://img.shields.io/badge/version-v0.1.1-green.svg)
A light and fast DOM Script library for clients.
many browsers do not yet support ES6 +, so you should use it with a compiler such as ['Babel'](https://github.com/babel/babel).
You can see the sample code using 'Webpack' and 'Babel' in `/sample`.

## Minimum version
![minimum node version](https://img.shields.io/badge/node-v6.0.0-orange.svg) ![minimum npm version](https://img.shields.io/badge/npm-v3.8.6-orange.svg)

## Install
```
npm install --save loaf-dom
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

## Test
```
npm test
```

## ChangeLog

#### v0.1.1
* add method
(trigger, offset, width, height, scrollTop, scrollLeft, scrollHeight, scrollWidth, html, text)

#### v0.1.0
* init beta version