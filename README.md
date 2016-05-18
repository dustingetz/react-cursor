react-cursor
===============

> Functional state management abstraction for use with Facebook React

[react-cursor hello-world in a fiddle](https://jsfiddle.net/dustingetz/n9kfc17x/)

`react-cursor` helps you write stateless React components, and achieve optimizied React rendering.

 * Decouple your application state from the shape of the DOM, allowing application state to be normalized
 * easy shouldComponentUpdate implemented using reference equality
 * Designed for recursive or deeply nested data

Cursors do not make an app stateless, but they let an app keep all its state in a single place at the root -- thus the root is stateful, and all downtree views are stateless. So cursors are a tool for reducing the surface area of code that is stateful.

If you are already using immutable datastructures (like ImmutableJS), react-cursor is not for you. react-cursor uses regular javascript datastructures, and leans on [React's Immutability Helpers](https://facebook.github.io/react/docs/update.html) (sugared by [update-in](https://github.com/dustingetz/update-in/) to provide efficient immutable operations and structure sharing.

## Project Maturity
master is stable, there is a full test suite. See package.json for latest published snapshot and *npm install it with explicit version*. 2.0 is fully backwards compatible with 1.x.

## tutorial
New tutorial coming soon. for now see [react-cursor hello-world in a fiddle](https://jsfiddle.net/dustingetz/n9kfc17x/).

## API
`Cursor` has these methods:
 * value() - return the value in the cursor (cursors have value semantics, for compatibility with React lifecycle methods)
 * refine(key, ...keys) - return a new cursor nested inside the root cursor at some path
 * swap(f) - apply f with the refined value and puts returned value into the backing store

Cursor has non-core convienence methods:
 * set(v), merge(v), assoc(k, v), dissoc(k), push(xs), unshift(xs), splice([[splices]]) - convenience wrappers for swap for common updates

There is a mixin `ImmutableOptimizations()` to achieve optimized rendering (yes, we also work with PureRenderMixin if you prefer that). See examples/helloworld for usage.

There are two constructors
 * build(reactCmpReference) - construct cursor backed by react state
 * build(rootValue, rootSwap) - construct cursor backed by state stored somewhere else

**state is stored in a stateful react component at the top level of react view-tree**
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

**state is stored in an [atom](https://github.com/cjohansen/js-atom) - works in large hybrid legacy apps like Rails with Turbolinks**
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

**state is stored in a javascript var**
This is like using an atom but dumber - just a thought experiment to demonstrate the interface. Don't do this.
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

## demo app

Cursors are a recursive data structure, so we can implement recursive things like a JSON editor:

[![live demo](screenshot.png?raw=true)](http://master-xmc9sn4ypn.elasticbeanstalk.com/app/)

Here is the [live demo](http://master-xmc9sn4ypn.elasticbeanstalk.com/app/) (includes webpack sourcemaps), and [source code to the live demo](https://github.com/prognostic-llc/react-json-editor-example).


## Warnings, gotchas, more details, FAQ
 * don't mutate values that come out of a cursor, treat the values as immutable and use the cursor interface for updates
 * only store associative data structures in cursors (arrays, maps, values) - no functions (see issue #19)

Advantages of react-cursor over immutable-js, baobab, cortex:
 * Cursors are immutable and have value semantics; they can be used directly in react lifecycle methods
 * simpler types: use regular js data structures, don't need to convert back and forth between special data structures
 * easy to integrate with your existing large codebase already using react state
 * simpler implementation: tiny api, not much code

## License

_`react-cursor` is governed under the MIT License._
