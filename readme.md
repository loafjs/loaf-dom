# Loaf-DOM ![loaf-dom version](https://img.shields.io/badge/version-v0.0.9-green.svg) ![minimum node version](https://img.shields.io/badge/node-v6.0.0-orange.svg) ![minimum npm version](https://img.shields.io/badge/npm-v3.8.6-orange.svg)
A simple and fast DOM script library for clients.
many browsers do not yet support ES6 +, so you should use it with a compiler such as ['Babel'](https://github.com/babel/babel).
You can see the sample code using 'Webpack' and 'Babel' in `/sample`

## Install
```
npm install --save loaf-dom
```

## Intro
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


## ChangeLog
#### v0.0.9
* fix minimum node version 4.0.0 > 6.0.0
* update readme

#### v0.0.8
* code cleanup

#### v0.0.7
* add attr()
* add style()
* add multiple selectors

#### v0.0.6
* removeClass selector Error correction

#### v0.0.4
* modify a typo

#### v0.0.3
* add sample code
* add selector(tagName)
* edit structure

#### v0.0.2
* selector
* eq()
* addClass()
* removeClass()

#### v0.0.1
* init