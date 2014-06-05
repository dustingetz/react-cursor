define(['react', 'CursorFunctions'], function (ReactWithAddons, cf) {
    'use strict';


    function Cursor(state, pendingGetter, path, commit) {
        // Please treat values as read-only
        this.value = cf.getRefAtPath(state, path); // value to put in the DOM, use from render()

        // Please treat pending values as read-only
        this.pendingValue = function () {
            return cf.getRefAtPath(pendingGetter(), path); // the current value right now, use in event handlers
        };

        this.onChange = function (nextValue) {
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
        };

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, cf.flatten(arguments));
            return new Cursor(state, pendingGetter, nextPath, commit);
        };
    }

    Cursor.build = function (state, pendingGetter, commit) {
        return new Cursor(state, pendingGetter, [], commit);
    };

    return Cursor;
});
