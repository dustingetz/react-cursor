react-cursor
===============

> Functional state management abstraction for use with Facebook React

`react-cursor` is an opinionated javascript implementation of the Cursor concept first seen in [Om](https://github.com/swannodette/om/wiki/Cursors), and inspired by functional zippers.

Cursors makes it easy for us work with deeply nested immutable values that are backed by React state. This
means we can store our entire application state in a single nested immutable value, allowing completely stateless React
views.

One of the React [maintainers wrote](https://news.ycombinator.com/item?id=6937921):

> [React is] there when you want to treat state as an implementation detail of a subcomponent. This is only because
> we don't have a good way of externalizing state changes, while simultaneously keeping the nature of them private.

Cursors solve this problem.

## features

`react-cursor` offers the following benefits:

 * single mutable ref to app state
 * cursors for encapsulation and modularity
 * O(1) deep equality checks (like Om)
 * fastest possible react performance
 * Manipulate deeply nested immutable values backed by React state
 * Decouple your application state from the shape of the DOM, allowing application state to be normalized
 * Mechanically eliminates [React's double setState issue](https://github.com/facebook/react/issues/122).

## tutorial

Given a React component with state like this:

    var App = React.createClass({
        getInitialState: function () {
            return {
                "a": 10,
                "b": {
                    "foo": {
                        "bar": 42,
                        "baz": ['red', 'green']
                    }
                }
            };
        },
        render: function () {
            return <pre>{JSON.stringify(this.state, undefined, 2)}</pre>;
        }
    });

Construct a cursor:

    var Cursor = require('path/to/react-cursor').Cursor;

    var cursor = Cursor.build(this) // `this` is the React component's this pointer
                                    // or the return value of React.renderComponent

Cursors have `refine`, `value` and `onChange`:

    cursor.refine('a').value            //=> 10
    cursor.refine('a').onChange(11);
    cursor.refine('b').refine('foo').value      //=> { 'bar': 42, 'baz': ['red', 'green'] }
    cursor.refine('b').refine('foo').onChange({ 'bar': 43, 'baz': ['red', 'green'] })
    cursor.refine('b', 'foo', 'baz', 1).onChange('blue')

Cursors are heavily memoized to preserve reference equality between equivalent cursors, such that we can implement
`React.shouldComponentUpdate` trivially and O(1):

    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.cursor !== nextProps.cursor;
    }

Due to the nature of React, this is a critical optimization when your application grows large. `react-cursor` provides this optimization as a mixin which can be used like so:

`var ImmutableOptimizations = require('path/to/react-cursor').ImmutableOptimizations`

see [ImmutableOptimizations.js](https://github.com/dustingetz/react-cursor/blob/master/src/ImmutableOptimizations.js).

Cursors also have `pendingValue()` for use in event handlers. This solves the [double setState bug](https://github.com/facebook/react/issues/122).

## example app

Cursors make it trivial to implement a React JSON editor:

[![live demo](https://raw.githubusercontent.com/dustingetz/react-json-editor/master/docs/_assets/json-editor.png)](http://react-json-editor.bitballoon.com/examples/react-state-editor/webapp/)

## Comparisons to similar libraries

There exist several similar libraries (most notably [Cortex](https://github.com/mquan/cortex)) 
that tackle exactly the same problem. `react-cursor` has one distinguishing 
feature: the ability to trivially implement a correct shouldComponentUpdate. Note that to do this correctly, not only do
equivalent values at equal paths need to be `===`, but `onChange` handlers at equal paths also need to be `===`. (If the 
path changes, the DOM event handlers may need to be updated as well, requiring a render.) 

I also believe `react-cursor` is the only library that attempts to address [React's double setState issue](https://github.com/facebook/react/issues/122).

## notes

`value` and `onChange` are the chosen nomenclature to directly line up with React's value/onChange convention.

Cursors are implemented in terms of [React.addons.update](http://facebook.github.io/react/docs/update.html).

`react-cursor` currently depends on underscore, but this will be factored out (sooner if someone asks me for it).

Please email the maintainer (dustin.getz@gmail.com) with questions, discussion or feature requests.

## Contributors

The initial prototypes of `react-cursor` were pair programmed by [Dustin Getz](https://github.com/dustingetz) and [Daniel Miladinov](https://github.com/danielmiladinov). 

## License

_`react-cursor` is governed under the MIT License._
