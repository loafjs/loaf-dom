import L from 'loaf-dom';

// addClass
L('#wrap').addClass('add-class');
L('.color-blue').addClass('add-class');

// removeClass
L('.color').removeClass('color-red');
L('.color').removeClass('color');

// eq
L('p').eq(2).addClass('eq2-add-class');

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

// inheritance element
L('#content p').eq(1).style('paddingLeft', '100px');

// next
L('#next-target-p').next().style('background', 'black');

// prev
L('#prev-target-div').prev().style('color', 'green');

// parent
L('#prev-target-div p').parent().style('background', 'yellow');

// children
L('#children-choice').children().style('background', 'green');
L('#children-choice').children('.target-children').style('color', 'yellow');

// parents
L('.target-children').parents('#children-choice').style('lineHeight', '40px');


// animate
L('#animation').animate({left: 500}, 2000);

L('#animation-scroll').animate({scrollLeft: 200}, 2000);