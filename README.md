react-cursor
===============

> Functional state management abstraction for use with Facebook React 0.13

`react-cursor` helps you write stateless React components, and achieve optimzied React rendering. react-cursor allows us to store the entire application state in a single immutable value, and allows for generic `shouldComponentUpdate` as a mixin. The cursor concept was first seen in [Om](https://github.com/swannodette/om/wiki/Cursors).

## Why react-cursor?

react-cursor exists because back in 2013 I was working on a very large app in react, it got really really slow, so we profiled it and wrote react-cursor to speed it up.

react-cursor is designed to be easy to integrate with an existing react codebase that already uses react state, where the developers are starting to realize "well, using react state seems to be causing a lot of bugs and bad code, what are my options now?", or "well my app is really big now and I am implementing shouldComponentUpdate in 50 different places, and each implementation is different and thus bug prone, surely this can be abstracted?" React-cursor provides this abstraction without forcing you to rewrite your app using proper immutable datstructures.

If you are already using immutable datastructures (like ImmutableJS), react-cursor is not for you. react-cursor uses regular javascript datastructures (just like React does), and leans heavily on [React's Immutability Helpers](https://facebook.github.io/react/docs/update.html) to provide efficient immutable operations.

## What about flux?

Flux and react-cursor are orthogonal. Idiomatic React allows stateful components. react-cursor makes it easy to remove all application state out of your React components and into one place. The decision of stateful vs stateless components is orthogonal to Flux architecture.

## features

`react-cursor` offers the following benefits:

 * O(1) deep equality checks (like Om), fastest possible react performance
 * Decouple your application state from the shape of the DOM, allowing application state to be normalized

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

Cursors have `refine`, `value` and expose methods for all commands in [React.addons.update](http://facebook.github.io/react/docs/update.html#available-commands):

* `push(array)`  all the items in array on the target.
* `unshift(array)` all the items in array on the target.
* `splice(array of arrays)` for each item in array() call splice() on the target with the parameters provided by the item.
* `set(any)` replace the target entirely.
* `merge(object)` merge the keys of object with the target.
* `apply(function)` passes in the current value to the function and updates it with the new returned value.


Example:

    cursor.refine('a').value            //=> 10
    cursor.refine('a').set(11);
    cursor.refine('b').refine('foo').value      //=> { 'bar': 42, 'baz': ['red', 'green'] }
    cursor.refine('b').refine('foo').set({ 'bar': 43, 'baz': ['red', 'green'] })
    cursor.refine('b', 'foo', 'baz', 1).set('blue')

Cursors are heavily memoized to preserve reference equality between equivalent cursors, such that we can implement
`React.shouldComponentUpdate` trivially and O(1):

    shouldComponentUpdate: function (nextProps, nextState) {
        return this.props.cursor !== nextProps.cursor;
    }

Since the whole point of using cursors is to allow us to store all the app state in a single value, React needs to re-render the entire app from the top with every state change. This means that providing proper implementation of `shouldComponentUpdate` is critical to maintain smooth performance. `react-cursor` provides this optimization as a mixin.

Props listed in `refFields` will compare old and new with a reference check, and other props will be compared with a value check, unless they are listed in `ignoreFields` which is useful under rare circumstances.

Cursors also have `pendingValue()` for use in event handlers. This mechanically solves the [double setState bug](https://github.com/facebook/react/issues/122).

## example app

Cursors make it trivial to implement a React JSON editor:

[![live demo](https://raw.githubusercontent.com/dustingetz/react-json-editor/master/docs/_assets/json-editor.png)](http://react-json-editor.bitballoon.com/examples/react-state-editor/webapp/)

## Contributors

The initial prototypes and thought work for `react-cursor` was pair programmed by [Dustin Getz](https://github.com/dustingetz) and [Daniel Miladinov](https://github.com/danielmiladinov).

## License

_`react-cursor` is governed under the MIT License._
