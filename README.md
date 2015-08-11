react-cursor
===============

> Functional state management abstraction for use with Facebook React 0.13

`react-cursor` helps you write stateless React components, and achieve optimizied React rendering. react-cursor allows us to store the entire application state in a single immutable value, and allows for generic `shouldComponentUpdate` as a mixin. The cursor concept was first seen in [Om](https://github.com/swannodette/om/wiki/Cursors).

### Installation
`npm install --save react-cursor`

## Why react-cursor?

react-cursor exists because back in 2013 I was working on a very large app in react, it got really really slow, so we profiled it and wrote react-cursor to speed it up.


### Functional state management philosophy

react-cursor makes it easy to store the entire application state in a single immutable value. We found ourselves asking questions like, "stateful components seem to be where all the bugs and bad code is in our app, what are my options now?" react-cursor is designed to be straightforward to integrate with an existing react codebase that already uses react state.

Cursors do not make an app stateless, but they let an app keep all its state in a single place - thus the root view is stateful, and all downtree views are stateless. So cursors are a tool for reducing the surface area of code that is stateful.

### get shouldComponentUpdate for free

react-cursor yields optimized react rendering for free out of the box. We found ourselves with a large and slow React application, and to speed it up we needed to implement shouldComponentUpdate in 50 different places, and each implementation was different and bug prone. React-cursor provides a way to abstract this without forcing you to rewrite your app using proper immutable datstructures.

If you are already using immutable datastructures (like ImmutableJS), react-cursor is not for you. react-cursor uses regular javascript datastructures (just like React does), and leans heavily on [React's Immutability Helpers](https://facebook.github.io/react/docs/update.html) to provide efficient immutable operations.

## What about flux?

Flux is about uni-directional data flow, and cursors are about state-at-top. You can structure your app using one or both or neither, they are separate concerns.


## features

`react-cursor` offers the following benefits:

 * O(1) deep equality checks (like Om), fastest possible react performance
 * Decouple your application state from the shape of the DOM, allowing application state to be normalized

## tutorial

Given a React component with state like this:

```js
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
```

Construct a cursor:

```js
var Cursor = require('path/to/react-cursor').Cursor;

var cursor = Cursor.build(this) // `this` is the React component's this pointer
                                // or the return value of React.render
```

Cursors have `refine`, `value` and expose methods for all commands in [React.addons.update](http://facebook.github.io/react/docs/update.html#available-commands). `set` is the method used most often.

```js
cursor.refine('a').value            //=> 10
cursor.refine('a').set(11);
cursor.refine('b').refine('foo').value      //=> { 'bar': 42, 'baz': ['red', 'green'] }
cursor.refine('b').refine('foo').set({ 'bar': 43, 'baz': ['red', 'green'] })
cursor.refine('b', 'foo', 'baz', 1).set('blue')
```

If two cursors are equivalent as far as React rendering is concerned, they are ===. This lets us implemenet `React.shouldComponentUpdate` trivially and fast:

```js
shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.cursor !== nextProps.cursor;
}
```

Since the whole point of using cursors is to allow us to store all the app state in a single value, React needs to re-render the entire app from the top with every state change. This means that providing proper implementation of `shouldComponentUpdate` is critical to maintain smooth performance. `react-cursor` provides this optimization as a mixin. Props listed in `refFields` will compare old and new with a reference check, and other props will be compared with a value check, unless they are listed in `ignoreFields` which is necessary under rare circumstances.

Cursors also have `pendingValue()` for use in event handlers. This mechanically solves the [double setState bug](https://github.com/facebook/react/issues/122).

## example app

Cursors make it trivial to implement a React JSON editor:

[![live demo](https://raw.githubusercontent.com/dustingetz/react-json-editor/master/docs/_assets/json-editor.png)](http://react-json-editor.bitballoon.com/examples/react-state-editor/webapp/)

## Contributors

The initial prototypes and thought work for `react-cursor` was pair programmed by [Dustin Getz](https://github.com/dustingetz) and [Daniel Miladinov](https://github.com/danielmiladinov).

## License

_`react-cursor` is governed under the MIT License._
