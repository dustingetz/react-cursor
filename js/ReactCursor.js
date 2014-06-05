define(['react', 'underscore', 'CursorFunctions'], function (ReactWithAddons, _, cf) {
    'use strict';


    function Cursor(state, pendingGetter, path, commit) {
        // Please treat values as read-only
        this.value = cf.getRefAtPath(state, path); // value to put in the DOM, use from render()

        // Please treat pending values as read-only
        this.pendingValue = function () {
            return cf.getRefAtPath(pendingGetter(), path); // the current value right now, use in event handlers
        };

        // Cursors sharing a path also share an onChange handler - so that we can do meaningful reference equality
        // comparisons for onChange handlers passes as react props in shouldComponentUpdate
        this.onChange = partialMemoized(onChange, state, pendingGetter, path, commit);

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, cf.flatten(arguments));
            return new Cursor(state, pendingGetter, nextPath, commit);
        };
    }

    function onChange (state, pendingGetter, path, commit, nextValue) {
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
        return new Cursor(state, pendingGetter, path, commit);
    }

    /**
     * Given all of the arguments of a memoized onChange function, the only discriminator is the path.
     * An onChange closing over different state values but having the same path is effectively the same
     * onChange for the purposes of effecting change in a reference-equality-sensitive manner.
     */
    function memoHasher (onChange, state, pendingGetter, path, commit) {
        return cf.hashRecord(path);
    }

    /**
     * Return existing partial functions for arguments we've seen before - the memoHasher will provide us the hash keys
     */
    var partialMemoized = _.memoize(_.partial, memoHasher);

    Cursor.build = function (state, pendingGetter, commit) {
        return new Cursor(state, pendingGetter, [], commit);
    };

    return Cursor;
});
