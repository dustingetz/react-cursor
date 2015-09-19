import React from 'react';
import _ from 'underscore';
import App from './App';
import { Cursor } from '../../..';

var state = {
    very: {
        deeply: {
            nested: {
                counts: _.range(400).map(function () { return 0; })
            }
        }
    }
};

Cursor.render(
  state,
  cur => React.render(<App cursor={cur} />, document.getElementById('root')));
