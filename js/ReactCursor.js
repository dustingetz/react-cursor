define(['react', 'underscore', 'CursorFunctions'], function (ReactWithAddons, _, cf) {
    'use strict';


    function Cursor(state, pendingGetter, path, commit, partialMemoized) {
        // Please treat values as read-only
        this.value = cf.getRefAtPath(state, path); // value to put in the DOM, use from render()

        // Please treat pending values as read-only
        this.pendingValue = function () {
            return cf.getRefAtPath(pendingGetter(), path); // the current value right now, use in event handlers
        };

        // Cursors sharing a path also share an onChange handler - so that we can do meaningful reference equality
        // comparisons for onChange handlers passes as react props in shouldComponentUpdate
        this.onChange = partialMemoized(onChange, state, pendingGetter, path, commit, partialMemoized);

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, cf.flatten(arguments));
            return new Cursor(state, pendingGetter, nextPath, commit, partialMemoized);
        };
    }

    function onChange(state, pendingGetter, path, commit, partialMemoized, nextValue) {
        var nextState;

        if (path.length > 0) {
            nextState = ReactWithAddons.addons.update(
                pendingGetter(),
                path.concat('$set').reduceRight(cf.unDeref, nextValue)
            );
        }
        else if (path.length === 0) {
            nextState = nextValue;
        }
        commit(nextState);
        return new Cursor(state, pendingGetter, path, commit, partialMemoized);
    }

    Cursor.build = function (cmp) {
        function pendingGetter () { return cmp._pendingState || cmp.state; }

        // Maintain a per-cursor cache of partially applied onChange functions - paths are not global, they are specific
        // to an initial call to Cursor.build
        var cache = {};

        function memoize(func, resolver) {
            return function () {
                var key = resolver ? resolver.apply(this, arguments) : arguments[0];
                return hasOwnProperty.call(cache, key)
                    ? cache[key]
                    : (cache[key] = func.apply(this, arguments));
            };
        }

        /**
         * Given all of the arguments of a memoized onChange function, the only discriminator is the path.
         * An onChange closing over different state values but having the same path is effectively the same
         * onChange for the purposes of effecting change in a reference-equality-sensitive manner.
         */
        function memoHasher(onChange, state, pendingGetter, path, commit) {
            return cf.hashRecord(path);
        }

        return new Cursor(cmp.state, pendingGetter, [], cmp.setState.bind(cmp), memoize(_.partial, memoHasher));
    };

    return Cursor;
});
