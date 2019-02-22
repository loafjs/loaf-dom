import L from 'loaf-dom';
import '../styles/main.scss';


L('#wrap').width('500px');

L('h1').style('text-align', 'center');

L('h1').next().style('padding', '10px 20px');

L('span').addClass('point-color');

L('p + p').style('margin-top', '10px').animate({ 'marginTop': 50 }, 5000,);

L(document).event('click', () => {
	L('p + p').stop();
});