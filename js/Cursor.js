define([], function () {
    'use strict';


    // this constructor is private
    function Cursor(state, path, commit, clone) {
        state = clone(state); // defensive clone right away so we can't close over a stale state reference
        this.value = getRefAtPath(state, path);

        this.onChange = function (nextValue) {
            var nextState;
            nextValue = clone(nextValue); // because the call site might retain the reference and mutate

            if (path.length > 0) {
                nextState = state;
                var scoped = getRefAtPath(nextState, initial(path));
                scoped[last(path)] = nextValue;
            }
            else if (path.length === 0) {
                nextState = nextValue;
            }
            commit(nextState);
            return nextState;
        };

        this.refine = function (/* one or more paths through the tree */) {
            var nextPath = [].concat(path, flatten(arguments));
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


    function getRefAtPath(tree, paths) {
        return reduce(paths, deref, tree);
    }

    function deref(obj, key) {
        return obj[key];
    }

    function initial(array) {
        return array.slice(0, array.length-1);
    }

    function last(array) {
        return array[array.length-1];
    }

    function reduce(array, f, mzero) {
        return array.reduce(f, mzero);
    }

    function flatten(listOfLists) {
        return [].concat.apply([], listOfLists);
    }


    return Cursor;
});
