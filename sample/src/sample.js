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
console.log('#content "new-attr" value: ' + L('#content').attr('new-attr'));

// set style
L('#content').style('background', 'red');
// get style
console.log('#content background style: ' + L('#content').style('background'));


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
L('#animation').animate({left: 500}, 2000, 'easeInCubic', () => console.log('callback'));

L('#animation-scroll').animate({scrollLeft: 200}, 2000);

// scroll
L('#wrap').scroll(() => console.log('scroll'));

// click
L('.click-target').click(() => console.log('click'));

// el
console.log(L('#el-method-target p').el(1).innerText);

// click()
L('#click-event').click(() => console.log('click ok'));
L('#click-event').click();

// trigger
L('#click-event').trigger('click');

// offset
console.log('offset top value: ' + L('#click-event').offset().top);

// innerText
L('#inner-text').text('insert text');
console.log('inner text value: ' + L('#inner-text').text());

// innerHTML
L('#inner-html').html('<p>insert html</p>');
console.log('inner html value: ' + L('#inner-html').html());

