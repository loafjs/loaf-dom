import L from 'loaf-dom';

// addClass
L('#wrap').addClass('add-class');
L('.color-blue').addClass('add-class');

// removeClass
L('.color').removeClass('color-red');
L('.color').removeClass('color');

// eq
L('.color').eq(2).addClass('eq2-add-class');

// set attr
L('#content').attr('new-attr', 'attrValue');
// get attr
console.log(L('#content').attr('new-attr'));

// set style
L('#content').style('background', 'red');
// get style
console.log(L('#content').style('background'));


// multiple selectors
L('h1, .color-blue').style('color', 'blue');