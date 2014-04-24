define([
    'lodash'
], function (_) {
    'use strict';

    function Cursor(state, path, commit, clone) {
        this.value = getRefAtPath(state, path);

        this.onChange = function (nextValue) {
            var nextState;
            nextValue = clone(nextValue); // because the call site might retain the reference and mutate

            if (path.length > 0) {
                nextState = clone(state); // defensive clone before mutate
                var scoped = getRefAtPath(nextState, _.initial(path));
                scoped[_.last(path)] = nextValue;
            }
            else if (path.length === 0) {
                nextState = nextValue;
            }
            commit(nextState);
        };

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, _.flatten(arguments));
            return new Cursor(state, nextPath, commit, clone);
        };
    }

    Cursor.build = function (state, commit, clone) {
        return new Cursor(state, [], commit, clone);
    };

    function getRefAtPath(tree, paths) {
        function deref(obj, key) { return obj[key]; }

        return _.reduce(paths, deref, tree);
    }

    return Cursor;

//    Example usages:
//    Cursor.build(this.state, this.setState.bind(this), _.cloneDeep);
//    Cursor.build(this.notState, function (nextState) { merge(this.notReactState, nextState); }.bind(this), _.identity);
});
