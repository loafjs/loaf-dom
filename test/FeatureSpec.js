import L from '../loaf-dom';
import Mock from './sampleHTML';

const newElement = document.createElement("div");
      newElement.innerHTML = Mock;

describe('Additional features', () => {

  document.getElementsByTagName('body')[0].appendChild(newElement);

  it('removeAllChild', () => {
    expect(L('#remove-container').el().children.length).toEqual(2);
    L('#remove-container').removeAllChild();
    expect(L('#remove-container').el().children.length).toEqual(0);
  });

});