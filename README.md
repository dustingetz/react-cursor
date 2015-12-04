react-cursor
===============

> Functional state management abstraction for use with Facebook React

`react-cursor` helps you write stateless React components, and achieve optimizied React rendering. react-cursor allows us to store the entire application state in a single immutable value, and allows for generic `shouldComponentUpdate` as a mixin. The cursor concept was first seen in [Om](https://github.com/swannodette/om/wiki/Cursors).

## Project Maturity
[1.2 branch](https://github.com/dustingetz/react-cursor/tree/1.2) is used in production in several large "enterprise" projects and lots of smaller projects. This branch supports React 0.13.

master is currently under heavy development for pending 2.0 release which may have API changes. I am running master in production, there is a full test suite, the docs lag a bit so you may need to read a little bit of code.

## Why react-cursor?
Cursors give you direct access to state-at-root without going full-on Flux (Action/Store/Dispatcher). Since all state writes are funneled through the cursor, cursors can use structure-sharing so we achieve optimized rendering through shouldComponentUpdate "for free".

Cursors do not make an app stateless, but they let an app keep all its state in a single place - thus the root view is stateful, and all downtree views are stateless. So cursors are a tool for reducing the surface area of code that is stateful.

If you are already using immutable datastructures (like ImmutableJS), react-cursor is not for you. react-cursor uses regular javascript datastructures (just like React does), and leans heavily on [React's Immutability Helpers](https://facebook.github.io/react/docs/update.html) to provide efficient immutable operations.

## features
State-at-root pattern via `react-cursor` offers the following benefits:

 * O(1) deep equality checks (like Om), fastest possible react performance
 * Decouple your application state from the shape of the DOM, allowing application state to be normalized
 * Work with recursive or deeply nested data

## tutorial
New tutorial coming soon. for now see examples/helloworld.

## API
`Cursor` has these methods:
 * value() - return the value in the cursor (cursors have value semantics, for compatibility with React lifecycle methods)
 * refine(key, ...keys) - return a new cursor nested inside the root cursor at some path
 * swap(f) - apply f with the refined value and puts returned value into the backing store

We also have these non-core convienence methods which might be removed
 * set(v), merge(v), push(xs), unshift(xs), splice([[splices]]) - convenience wrappers for swap for common updates

There are two constructors
 * build(reactCmpReference) - construct cursor backed by react state
 * build(rootValue, rootSwap) - construct cursor backed by state stored somewhere else

Cursors are not themselves stateful, they are backed by state stored somewhere else, here are some examples:
 * in a stateful react component at the top level of react view-tree
 * in an [atom](https://github.com/cjohansen/js-atom) - works in large hybrid legacy apps like Rails with Turbolinks
 * in a javascript var - like an atom, but stupid-simple for demonstration purposes

The atom approach is the most flexible and powerful.

*state is stored in a stateful react component at the top level of react view-tree*
```javascript
var Store = React.createClass({
  getInitialState () { return {a: {b: 0}}; },
  render () {
    var cur = Cursor.build(this);
    return <App cursor={cur} />;
  }
});

React.render(<Store />, domEl);
```
This is the most common use case and the easiest migration path if you're already using react component local state and just want to hoist all your state to the root and not change any other code.

*state is stored in an [atom](https://github.com/cjohansen/js-atom) - works in large hybrid legacy apps like Rails with Turbolinks*
```javascript
var store = atom.createAtom({ a: { b: 0 } });

function render(key, ref, prevVal, curVal) {
  var cur = Cursor.build(curVal, store.swap);
  React.render(<App cursor={cur} />, domEl);
}

store.addWatch('react-renderer', render);
render('react-renderer', store, undefined, store.deref()); // Render the first time
store.removeWatch('react-renderer');
```
This works great in legacy page based apps that aren't pure React, since we can start and stop react rendering without losing state. This is important when our app uses more than one rendering technology. Our state is decoupled from React, so different parts of app can be coded differently but still share application state. For example, rails with TurboLinks where only one of the pages renders with React and the rest use Rails views.

*state is stored in a javascript var (like an atom but dumber)*
```javascript
var store = { a: { b: 0 } }; // store is just a var

function swap (f) {
  var prev = store;
  store = f(prev);
  render(prev, store); // render if the var changes
}

function render(prevVal, curVal) {
  var cur = Cursor.build(curVal, swap);
  React.render(<App cursor={cur} />, domEl);
}

render(undefined, store); // Render the first time
```
Don't do this, it's just a demonstration for understanding.

We provide a mixin `ImmutableOptimizations` to achieve optimized rendering (yes, we also work with PureRenderMixin if you prefer that). See the react-cursor examples directory for usage.

## demo app

Cursors are a recursive data structure, so we can implement recursive things like a JSON editor:

[![live demo](https://raw.githubusercontent.com/dustingetz/react-json-editor/master/docs/_assets/json-editor.png)](http://react-json-editor.bitballoon.com/examples/react-state-editor/webapp/)

## Warnings, gotchas, more details, FAQ
 * don't mutate values that come out of a cursor, treat the values as immutable and use the cursor interface for updates
 * only store associative data structures in cursors (arrays, maps, values) - no functions (see issue #19)

Advantages of react-cursor over immutable-js, baobab, cortex:
 * Cursors are immutable and have value semantics; they can be used directly in react lifecycle methods
 * simpler types: use regular js data structures, don't need to convert back and forth between special data structures
 * easy to integrate with your existing large codebase already using react state
 * simpler implementation: tiny api, not much code

## Contributors

The initial prototypes and thought work for `react-cursor` was pair programmed by [Dustin Getz](https://github.com/dustingetz) and [Daniel Miladinov](https://github.com/danielmiladinov).

## License

_`react-cursor` is governed under the MIT License._
