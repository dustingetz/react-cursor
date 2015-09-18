import React from 'react';
import _ from 'underscore';
import App from './App';


var state = {
    very: {
        deeply: {
            nested: {
                counts: _.range(400).map(function () { return 0; })
            }
        }
    }
};

function swapper(f) {
    state = f(state);
    queueRender();
}

function queueRender() {
    var cur = ReactCursor.Cursor.build(state, swapper);
    React.render(<App cursor={cur} />, document.getElementById('root'));
}

queueRender();
