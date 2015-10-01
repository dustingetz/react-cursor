import _ from 'underscore';
import App from './App';


window.stateAtom = atom.createAtom({
  very: {
    deeply: {
      nested: {
        counts: _.range(400).map(function () { return 0; })
      }
    }
  }
});

function queueRender(key, ref, prevVal, curVal) {
  var cur = ReactCursor.Cursor.build(stateAtom.deref(), stateAtom.swap);
  window.app = React.render(<App cursor={cur} />, document.getElementById('root'));
}

stateAtom.addWatch('react-renderer', queueRender);
queueRender('react-renderer', stateAtom, undefined, stateAtom.deref());
