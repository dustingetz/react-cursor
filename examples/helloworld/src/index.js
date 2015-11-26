import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import atom from 'js-atom';
import { Cursor } from 'react-cursor';
import { default as App } from './App';


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
  var cur = Cursor.build(stateAtom.deref(), stateAtom.swap);
  window.app = ReactDOM.render(<App cursor={cur} />, document.getElementById('root'));
}

stateAtom.addWatch('react-renderer', queueRender);
queueRender('react-renderer', stateAtom, undefined, stateAtom.deref());
