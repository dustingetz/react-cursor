react-cursor
===============

> Immutable state for React.js

[react-cursor hello-world in a fiddle](https://jsfiddle.net/dustingetz/n9kfc17x/)

[![live demo](screenshot.png?raw=true)](http://demo-react-json-editor.s3-website-us-east-1.amazonaws.com/)

## What is react-cursor

Cursors are a tool for working with recursive or deeply nested data, immutably. react-cursor is a javascript port of an abstraction that I first saw in ClojureScript. Cursors let your app hold all its state at the root of the UI tree; thus the root is stateful, and all downtree views are stateless.

## Project Maturity

master is stable, there is a full test suite.

## API

`Cursor` interface has three methods: `value`, `swap` and `refine`.
 * `cur.value()` return the value in the cursor at some path.
 * `cur.refine(path, ...paths)` return a cursor nested inside another cursor
 * `cur.swap(f)` apply f to the value in the cursor value and puts returned value into the backing store

For frequently used swap functions, see the bundled `update-in` dependency: see [here](https://github.com/dustingetz/update-in). Cursor instances have optional syntax sugar for the swap fns provided by update-in; see [CursorOperations.js](https://github.com/dustingetz/react-cursor/blob/master/src/CursorOperations.js)

## FAQ
 * Cursors have value semantics, don't mutate values that come out of a cursor
 * Equal cursors are `===` for easy and efficient optimized rendering (see hello world jsfiddle for example)
 * You should read the source! The core cursor abstraction is 8 lines of code
 * There is an undocumented alternate implementation, `RefCursor`, which has reference semantics, this is only useful for working with legacy mutable code

## License

_`react-cursor` is governed under the MIT License._

## Attributions

react-cursor was built by Daniel Miladinov and Dustin Getz.
