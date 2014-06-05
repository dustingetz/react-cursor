define(['CursorFunctions'], function (cf) {
    'use strict';


    // this constructor is private
    function Cursor(state, path, commit, clone) {
        state = clone(state); // defensive clone right away so we can't close over a stale state reference
        this.value = cf.getRefAtPath(state, path);

        this.onChange = function (nextValue) {
            var nextState;
            nextValue = clone(nextValue); // because the call site might retain the reference and mutate

            if (path.length > 0) {
                nextState = state;
                var scoped = cf.getRefAtPath(nextState, cf.initial(path));
                scoped[cf.last(path)] = nextValue;
            }
            else if (path.length === 0) {
                nextState = nextValue;
            }
            commit(nextState);
            return new Cursor(nextState, path, commit, clone);
        };

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, cf.flatten(arguments));
            return new Cursor(state, nextPath, commit, clone);
        };
    }


    /**
     * Example usages:
     * Cursor.build(this.state, this.setState.bind(this), _.cloneDeep);
     * Cursor.build(this.notState, function (nextState) { merge(this.notReactState, nextState); }.bind(this), _.identity);
     */
    Cursor.build = function (state, commit, clone) {
        return new Cursor(state, [], commit, clone);
    };

    return Cursor;
});
