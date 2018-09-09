import L from 'loaf-dom';

L('#wrap').addClass('add-class');
L('.color-blue').addClass('add-class');
L('.color').removeClass('color-red');
L('.color').eq(2).addClass('eq2-add-class');
L('.color').removeClass('color');